"use server";

import { drizzledb } from "@/db/drizzle";
import { coreMovie } from "@/db/schema";
import { sql } from "drizzle-orm";
import { fetchPosterFromTMDB } from "@/lib/metadata";

// 🎬 Get all movies in the database
export async function getAllMovies(limit: number = 12, page: number = 1) {
  try {
    const offset = (page - 1) * limit;

    const raw = await drizzledb
      .select({
        id: coreMovie.id,
        movie_id: coreMovie.movieId,
        title: coreMovie.title,
        poster_url: coreMovie.posterUrl,
        genres: coreMovie.genres,
        status: coreMovie.status,
        tmdb_id: coreMovie.tmdbId,
        imdb_id: coreMovie.imdbId,
        embeddings: coreMovie.embedding,
      })
      .from(coreMovie)
      .orderBy(sql`${coreMovie.createdAt} DESC`)
      .limit(limit)
      .offset(offset)
      .execute();

    const [{ total }] = await drizzledb
      .select({ total: sql<number>`COUNT(*)` })
      .from(coreMovie)
      .execute();

    const totalMovies: number = (total.toString() as unknown) as number;
    const totalPages = Math.ceil(totalMovies / limit);

    const movies = await Promise.all(
      raw.map(async (movie) => ({
        ...movie,
        poster_url:
          movie.poster_url || (await fetchPosterFromTMDB(movie.tmdb_id)),
      }))
    );

    return {
      success: true,
      data: movies,
      meta: {
        page,
        totalPages,
        totalMovies,
      },
    };
  } catch (error) {
    console.error("Error fetching all movies:", error);
    return {
      success: false,
      error: "Internal server error",
    };
  }
}