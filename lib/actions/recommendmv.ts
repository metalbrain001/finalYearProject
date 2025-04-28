"use server";

import { and, eq, not, inArray, sql } from "drizzle-orm";
import { drizzledb } from "@/db/drizzle";
import { coreMovie, rentedMovies, movieFeedback } from "@/db/schema";
import { fetchPosterFromTMDB } from "../metadata";
import { VectorRecommendation } from "@/types";

// 📌 Average multiple vectors
const averageVectors = (vectors: number[][]): number[] => {
  if (vectors.length === 0) return [];
  const length = vectors[0].length;
  const sum = new Array(length).fill(0);

  for (const vec of vectors) {
    for (let i = 0; i < length; i++) {
      sum[i] += vec[i];
    }
  }

  return sum.map((value) => value / vectors.length);
};

export const recommendMoviesForUser = async (
  userId: string,
  limit: number = 10
): Promise<{ success: boolean; data: VectorRecommendation[] }> => {
  // ✅ 1. Fetch user's liked movie embeddings
  const likedEmbeddings = await drizzledb
    .select({ embedding: coreMovie.embedding, movie_id: coreMovie.id })
    .from(movieFeedback)
    .innerJoin(coreMovie, eq(coreMovie.id, movieFeedback.movie_id))
    .where(
      and(
        eq(movieFeedback.user_id, userId),
        eq(movieFeedback.feedback_type, "like"),
        sql`core_movie.embedding IS NOT NULL`
      )
    );

  if (!likedEmbeddings.length) {
    return { success: true, data: [] }; // No embedding data
  }

  const vectors = likedEmbeddings
    .map((row) => row.embedding)
    .filter((e) => Array.isArray(e) && e.length > 0) as number[][];

  if (!vectors.length) return { success: true, data: [] };

  const profileVector = averageVectors(vectors);

  // ✅ 2. Exclude movies already liked or disliked
  const interacted = await drizzledb
    .select({ movie_id: movieFeedback.movie_id })
    .from(movieFeedback)
    .where(eq(movieFeedback.user_id, userId));

  const excludeIds = interacted.map((r) => r.movie_id);

  // ✅ 3. Fetch movies with embeddings
  const availableMovies = await drizzledb
    .select({
      id: coreMovie.id,
      movie_title: coreMovie.title,
      genres: coreMovie.genres,
      poster_url: coreMovie.posterUrl,
      status: coreMovie.status,
      embedding: coreMovie.embedding,
      tmdb_id: coreMovie.tmdbId,
      imdb_id: coreMovie.imdbId,
    })
    .from(coreMovie)
    .where(
      and(
        sql`embedding IS NOT NULL`,
        excludeIds.length ? not(inArray(coreMovie.id, excludeIds)) : undefined
      )
    )
    .limit(500); // Pull more, then filter manually

  // ✅ 4. Compute cosine similarity
  const cosineSim = (v1: number[], v2: number[]) => {
    const dot = v1.reduce((sum, val, i) => sum + val * v2[i], 0);
    const norm1 = Math.sqrt(v1.reduce((sum, val) => sum + val * val, 0));
    const norm2 = Math.sqrt(v2.reduce((sum, val) => sum + val * val, 0));
    return dot / (norm1 * norm2 || 1);
  };

  const sortedMovies = availableMovies
    .map((movie) => ({
      ...movie,
      similarity: cosineSim(profileVector, movie.embedding || []),
      id: movie.id.toString(),
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);

  // ✅ 5. Enrich posters
  const enriched = await Promise.all(
    sortedMovies.map(async (movie) => ({
      ...movie,
      poster_url: movie.poster_url || (await fetchPosterFromTMDB(movie.tmdb_id)),
    }))
  );

  return { success: true, data: enriched };
};