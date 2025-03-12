"use server";

import { drizzledb } from "@/db/drizzle";
import { coreMovie, coreRatings } from "@/db/schema";
import { desc, eq, ilike, sql, or, inArray, gte } from "drizzle-orm";
import { fetchPosterFromTMDB } from "@/lib/metadata";

const TODAY = new Date();

export const getHomepageMovies = async (limit: number = 12, offset: number = 0) => {
  try {
    // 1️⃣ TOP RATED — Use SQL aggregation to get average rating per movie
    const topRated = await drizzledb.execute(
      sql`
      SELECT
        m.id,
        m.movie_id,
        m.title,
        m.poster_url,
        m.imdb_id,
        m.tmdb_id,
        m.genres,
        m.status,
        AVG(r.rating)::FLOAT AS avg_rating
      FROM core_movie m
      JOIN core_ratings r ON m.movie_id = r.movie_id
      WHERE m.status = 'available'
      GROUP BY m.id, m.title, m.poster_url, m.tmdb_id, m.genres, m.status
      ORDER BY avg_rating DESC
      LIMIT ${limit} OFFSET ${offset};
    `
    );
    // Enrich missing posters
    const enrichedTopRated = await Promise.all(
      topRated.rows.map(async (movie) => ({
        ...movie,
        poster_url: movie.poster_url || (await fetchPosterFromTMDB(movie.tmdb_id as number | null)),
      }))
    );


    // 2️⃣ RECENT RELEASE (using created_at or release_date if available)
    const recentReleaseRaw = await drizzledb
      .select()
      .from(coreMovie)
      .where(
        or(
          gte(coreMovie.createdAt, new Date(TODAY.getFullYear(), TODAY.getMonth() - 3, TODAY.getDate())),
          eq(coreMovie.status, "available")
        )
      )
      .orderBy(desc(coreMovie.createdAt))
      .limit(12)
      .execute();

    const recentRelease = await Promise.all(
      recentReleaseRaw.map(async (movie) => ({
        ...movie,
        poster_url: movie.posterUrl || (await fetchPosterFromTMDB(movie.tmdbId)),
      }))
    );

    // 3️⃣ GENRE BASED SECTIONS
    const genres = ["Action", "Drama", "Comedy"];
    const genreSections = await Promise.all(
      genres.map(async (genre) => {
        const movieRaw = await drizzledb
          .select({
            id: coreMovie.id,
            title: coreMovie.title,
            poster_url: coreMovie.posterUrl,
            genres: coreMovie.genres,
            status: coreMovie.status,
            tmdb_id: coreMovie.tmdbId,
          })
          .from(coreMovie)
          .where(ilike(coreMovie.genres, `%${genre}%`))
          .orderBy(desc(coreMovie.createdAt))
          .limit(8)
          .execute();

        const movies = await Promise.all(
          movieRaw.map(async (movie) => ({
            ...movie,
            poster_url: movie.poster_url || (await fetchPosterFromTMDB(movie.tmdb_id)),
          }))
        );
        return { genre, movies };
      })
    );

    return {
      success: true,
      data: {
        topRated: enrichedTopRated, // ← SQL result is returned as `rows`
        recentRelease,
        genreSections,
      },
    };
  } catch (error: any) {
    console.error("❌ Homepage Fetch Error:", error.message);
    return { success: false, message: "Failed to load homepage movies", error: error.message };
  }
};
