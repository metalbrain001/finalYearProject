"use server";

import { and, desc, eq, ilike, inArray, not, or } from "drizzle-orm";
import { drizzledb } from "@/db/drizzle";
import { coreMovie, rentedMovies } from "@/db/schema";

// ✅ Server Action to fetch recommendations based on user's past rentals
export const getGenreBasedRecommendations = async (userId: string) => {
  try {
    // Step 1: Get past rented movie IDs
    const pastMovieIds = await drizzledb
      .select({ movie_id: rentedMovies.movie_id })
      .from(rentedMovies)
      .where(eq(rentedMovies.user_id, userId))
      .execute();

    const movieIds = pastMovieIds.map((m) => m.movie_id);
    if (!movieIds.length) return { success: true, data: [] };

    // Step 2: Get genres from rented movies
    const pastGenres = await drizzledb
      .select({ genres: coreMovie.genres })
      .from(coreMovie)
      .where(inArray(coreMovie.id, movieIds))
      .execute();

    const genreList = pastGenres
      .flatMap((g) => g.genres?.split("|").map((x) => x.trim()))
      .filter(Boolean);

    if (!genreList.length) return { success: true, data: [] };

    // Step 3: Create dynamic genre filters
    const genreFilters = genreList.map((genre) =>
      ilike(coreMovie.genres, `%${genre}%`)
    );

    // Step 4: Fetch similar movies excluding already rented
    const recommendations = await drizzledb
      .select({
        id: coreMovie.id,
        title: coreMovie.title,
        poster_url: coreMovie.posterUrl,
        genres: coreMovie.genres,
        imdb_id: coreMovie.imdbId,
        status: coreMovie.status,
      })
      .from(coreMovie)
      .where(
        and(
          or(...genreFilters),
          not(inArray(coreMovie.id, movieIds)),
          eq(coreMovie.status, "available")
        )
      )
      .limit(10)
      .execute();

    return { success: true, data: recommendations };
  } catch (error) {
    console.error("❌ Error fetching genre-based recommendations:", error);
    return { success: false, data: [], error: (error as any).message };
  }
};
