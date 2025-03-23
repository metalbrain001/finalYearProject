// lib/actions/getMoviesByGenre.ts
"use server";

import { drizzledb } from "@/db/drizzle";
import { coreMovie } from "@/db/schema";
import { ilike } from "drizzle-orm";

interface GetMoviesParams {
  genres: string;
  page?: number;
  limit?: number;
}

export const getMoviesByGenre = async ({ genres, page = 1, limit = 12 }: GetMoviesParams) => {
  try {
    const offset = (page - 1) * limit;

    const movies = await drizzledb
      .select({
        id: coreMovie.movieId,
        title: coreMovie.title,
        poster_url: coreMovie.posterUrl,
        genres: coreMovie.genres,
        imdb_id: coreMovie.imdbId,
        status: coreMovie.status,
        tmdb_id: coreMovie.tmdbId,
      })
      .from(coreMovie)
      .where(ilike(coreMovie.genres, `%${genres}%`))
      .limit(limit)
      .offset(offset)
      .execute();

    return movies;
  } catch (error) {
    console.error("🚨 Error fetching paginated genre movies:", error);
    return [];
  }
};

