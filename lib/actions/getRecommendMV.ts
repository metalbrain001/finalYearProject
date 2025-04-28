"use server";

import { drizzledb } from "@/db/drizzle";
import { movieFeedback, coreMovie } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import { auth } from "@/auth";

export async function getRecommendedMovies() {
  const session = await auth();
  if (!session?.user?.id) return [];

  // Step 1: Fetch user's feedback
  const userFeedback = await drizzledb
    .select({ movie_id: movieFeedback.movie_id })
    .from(movieFeedback)
    .where(eq(movieFeedback.user_id, session.user.id))
    .execute();

  let movieIds: number[] = [];

  if (userFeedback.length > 0) {
    movieIds = userFeedback.map((f) => f.movie_id);
  } else {
    // Step 2: If no feedback, fallback to most liked movies globally
    const popularMovies = await drizzledb
      .select({ movie_id: movieFeedback.movie_id })
      .from(movieFeedback)
      .where(eq(movieFeedback.feedback_type, "like"))
      .execute();

    const distinctMovieIds = [...new Set(popularMovies.map((m) => m.movie_id))];

    movieIds = distinctMovieIds.slice(0, 20);
  }

  if (!movieIds.length) {
    return [];
  }

  // Step 3: Fetch movie details from core_movie by movie_id
  const recommendedMovies = await drizzledb
    .select()
    .from(coreMovie)
    .where(inArray(coreMovie.movieId, movieIds))
    .execute();

  return recommendedMovies;
}