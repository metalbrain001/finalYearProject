"use server";

import { drizzledb } from "@/db/drizzle";
import { coreMovie, registrations } from "@/db/schema";
import { sql, eq } from "drizzle-orm";

export async function getDashboardStats() {
  // ✅ Total movies
  const totalMoviesResult = await drizzledb
    .select({ count: sql<number>`COUNT(*)` })
    .from(coreMovie);
  const totalMovies = totalMoviesResult[0]?.count || 0;

  // ✅ Total unique users (from core_movie)
  const uniqueUsersResult = await drizzledb.execute(
    sql`SELECT COUNT(DISTINCT user_id) FROM core_movie`
  );
  const totalUsers = uniqueUsersResult.rows?.[0]?.count || 0;

  // Total Users from User Table
  const totalRegisteredUsersResult = await drizzledb
    .select({ count: sql<number>`COUNT(*)` })
    .from(registrations);
  const totalRegisteredUsers = totalRegisteredUsersResult[0]?.count || 0;


  // ✅ Optimized: get top-rated movie_id + count from core_ratings
  const topRatedIdResult = await drizzledb.execute(sql`
    SELECT movie_id, COUNT(*) as count
    FROM core_ratings
    GROUP BY movie_id
    ORDER BY count DESC
    LIMIT 1;
  `);

  const topRatedRow = topRatedIdResult.rows?.[0];

  let topMovie = { title: "N/A", count: 0 };

  if (topRatedRow?.movie_id) {
    const movieResult = await drizzledb
      .select({ title: coreMovie.title })
      .from(coreMovie)
      .where(eq(coreMovie.id, topRatedRow.movie_id as number))
      .limit(1)
      .execute();

    topMovie = {
      title: movieResult[0]?.title || "Unknown",
      count: Number(topRatedRow.count),
    };
  }

  return {
    totalMovies,
    totalUsers,
    topMovie,
    totalRegisteredUsers,
  };
}

