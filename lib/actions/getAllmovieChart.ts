"use server";

import { drizzledb } from "@/db/drizzle";
import { coreMovie } from "@/db/schema";
import { sql } from "drizzle-orm";

// 🎬 Get chart data for all movies in the database grouped by genre
export async function getAllMoviesChartData() {
  const raw = await drizzledb
    .select({
      genre: coreMovie.genres,
      count: sql<number>`count(*)`,
    })
    .from(coreMovie)
    .groupBy(coreMovie.genres)
    .orderBy(sql`count(*) DESC`)
    .limit(10); // top 10 genres by volume

  const labels = raw.map((r) => r.genre || "Unknown");
  const counts = raw.map((r) => Number(r.count));

  return {
    labels,
    datasets: [
      {
        label: "Movies in Database",
        data: counts,
        backgroundColor: "#34d399", // tailwind green-400
        borderColor: "#059669",     // tailwind green-600
        borderWidth: 2,
      },
    ],
  };
}
