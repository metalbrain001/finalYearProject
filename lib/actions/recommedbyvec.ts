"use server";

import { and, not, eq, inArray, lt, isNotNull, sql } from "drizzle-orm";
import { drizzledb } from "@/db/drizzle";
import { coreMovie } from "@/db/schema";
import { VectorRecommendation } from "@/types";
import { fetchPosterFromTMDB } from "../metadata";

export const recommendMoviesByVector = async (
  embedding: number[],
  excludeMovieIds: number[] = [],
  limit: number = 10
): Promise<{ success: boolean; data: VectorRecommendation[] }> => {
  const sanitizedEmbedding = embedding.filter((n) => typeof n === "number" && !Number.isNaN(n));
  if (sanitizedEmbedding.length === 0) {
    throw new Error("Embedding is empty or invalid after sanitization.");
  }

  const embeddingLiteral = `'[${sanitizedEmbedding.join(",")}]'::vector`;
  if (embeddingLiteral.length === 0) {
    throw new Error("Embedding is empty or invalid after sanitization.");
  }

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
        excludeMovieIds.length ? not(inArray(coreMovie.id, excludeMovieIds)) : undefined
      )
    )
    .limit(200); // Pull more to sort by similarity manually

  // manually calculate cosine similarity
  const calculateSimilarity = (v1: number[], v2: number[]) => {
    const dot = v1.reduce((acc, val, i) => acc + val * v2[i], 0);
    const norm1 = Math.sqrt(v1.reduce((acc, val) => acc + val * val, 0));
    const norm2 = Math.sqrt(v2.reduce((acc, val) => acc + val * val, 0));
    return dot / (norm1 * norm2 || 1);
  };

  const moviesWithSimilarity = availableMovies
    .map((movie) => {
      const sim = calculateSimilarity(sanitizedEmbedding, movie.embedding || []);
      return { ...movie, similarity: sim, id: movie.id.toString() };
    })
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);

  // ✅ 3. Enrich missing posters
  const enrichedRecommendations = await Promise.all(
    moviesWithSimilarity.map(async (movie) => ({
      ...movie,
      poster_url: movie.poster_url || (await fetchPosterFromTMDB(movie.tmdb_id)),
    }))
  );

  return { success: true, data: enrichedRecommendations };
};
