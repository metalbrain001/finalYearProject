import { NextRequest, NextResponse } from "next/server";
import { drizzledb } from "@/db/drizzle";
import { coreMovie } from "@/database/schema";
import { eq, sql } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = Number(url.searchParams.get("page")) || 1;
    let limit = Number(url.searchParams.get("limit")) || 20;

    // ✅ Limit should not exceed 800
    limit = Math.min(limit, 800);

    // Calculate offset
    const offset = (page - 1) * limit;

    console.log(`Fetching movies - Page: ${page}, Limit: ${limit}`);

    // Fetch ratings for each movie and pass result as avg_rating to movies

    // ✅ Fetch movies with the enforced max limit
    const movies = await drizzledb
      .select({
        id: coreMovie.id,
        movieId: coreMovie.movieId,
        title: coreMovie.title,
        genres: coreMovie.genres,
        createdAt: coreMovie.createdAt,
        description: coreMovie.description,
        imdbId: coreMovie.imdbId,
        tmdbId: coreMovie.tmdbId,
        userId: coreMovie.userId,
        posterUrl: coreMovie.posterUrl,
      })
      .from(coreMovie)
      .limit(limit)
      .offset(offset)
      .execute();


    // ✅ Fetch total movie count for pagination
    const totalMovies = await drizzledb
      .select({ count: sql<number>`COUNT(*)` })
      .from(coreMovie)
      .execute();

    const totalPages = Math.ceil(totalMovies[0].count / limit);

    return NextResponse.json({
      success: true,
      data: movies,
      meta: {
        page,
        totalPages,
        totalMovies: totalMovies[0].count,
        limit,
      },
    });
  } catch (error: any) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { success: false, message: "Database error.", error: error.message },
      { status: 500 }
    );
  }
}
