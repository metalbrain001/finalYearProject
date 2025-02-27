"use server";

import { drizzledb } from "@/db/drizzle";
import { coreMovie } from "@/db/schema";
import { ilike } from "drizzle-orm";

/**
 * Fetch movies by genre from the database.
 * @param genre Genre name (case-insensitive).
 * @returns List of movies for the given genre.
 */
interface GetMoviesParams {
  genres: string;
}

export const getMoviesByGenre = async (params: GetMoviesParams) => {
  try {
    console.log(`🔍 Fetching movies for genre: ${params.genres}`);

    // ✅ Fetch movies directly (no transaction needed)
    const movies = await drizzledb
      .select({
        id: coreMovie.id,
        title: coreMovie.title,
        poster_url: coreMovie.posterUrl, // ✅ Use `poster_url`, not `poster_path`
        genres: coreMovie.genres,
        imdb_id: coreMovie.imdbId,
      })
      .from(coreMovie)
      .where(ilike(coreMovie.genres, `%${params.genres}%`)) // ✅ Case-insensitive search
      .limit(10)
      .execute();

    console.log(`✅ Found ${movies.length} movies for genre: ${params.genres}`);
    return movies; // ✅ Return movies directly (NOT an object)
  } catch (error) {
    console.error("🚨 Error fetching movies:", error);
    return []; // ✅ Return an empty array on error
  }
};
