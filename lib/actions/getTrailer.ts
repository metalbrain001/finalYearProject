"use server";

import { drizzledb } from "@/db/drizzle";
import { coreMovie } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * Fetch movie metadata from the database.
 * @param movieId Movie ID.
 * @returns Movie metadata.
 */

interface GetMovieParams {
  movieId: string;
}

export const fetchTrailer = async (params: GetMovieParams) => {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || "";
  const baseUrl = "https://api.themoviedb.org/3";

  try {

    // Fetch Movie id from database to get the trailer
    const movies = await drizzledb
      .select({
        id: coreMovie.id,
        movieId: coreMovie.movieId,
        title: coreMovie.title,
        genres: coreMovie.genres,
        createdAt: coreMovie.createdAt,
        imdbId: coreMovie.imdbId,
        tmdbId: coreMovie.tmdbId,
        userId: coreMovie.userId,
        posterUrl: coreMovie.posterUrl,
      })
      .from(coreMovie)
      .where(eq(coreMovie.movieId, Number(params.movieId)))
      .limit(1)
      .execute();

    if (!movies || movies.length === 0) {
      console.error("❌ Movie not found in database for movieId:", params.movieId);
      return null;
    }

    const movie = movies[0];
    const tmdbId = movie.tmdbId;

    // Fetch movie trailer from TMDb API
    const tmdbResponse = await fetch(`${baseUrl}/movie/${tmdbId}/videos?api_key=${apiKey}&language=en US`);

    if (!tmdbResponse.ok) {
      throw new Error(`Failed to fetch movie trailer from TMDb. Status: ${tmdbResponse.status}`);
    }

    const data = await tmdbResponse.json();
    // Find an official YouTube trailer
    return (
      data.results.find(
        (video: { site: string; type: string }) =>
          video.site === "YouTube" && video.type === "Trailer"
      ) || null
    );
  } catch (error) {
    console.error("❌ Trailer Fetch Error:", error);
    return null;
  }
};
