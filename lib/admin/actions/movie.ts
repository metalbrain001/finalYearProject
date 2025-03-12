"use server";

import { auth } from "@/auth";
import { drizzledb } from "@/db/drizzle";
import { movieCast, userUploadedMovies, watchlist } from "@/db/schema";
import { AddtoWatchProps, MovieParams } from "@/types";
import { sql } from "drizzle-orm";


export const createMovie = async (params: MovieParams) => {
  try {
    // Start a transaction to ensure atomicity
    await drizzledb.transaction(async (tx) => {
      // ✅ Step 1: Insert the movie into `user_uploaded_movies`
      const [newMovie] = await tx
        .insert(userUploadedMovies)
        .values({
          title: params.title,
          genres: params.genres,
          movie_year: params.movie_year,
          director: params.director,
          movie_plot: params.movie_plot,
          posterUrl: params.poster_url,
          movie_url: params.movie_url,
          movieRuntime: params.movie_runtime,
          actors: params.actors,
          description: params.description,
          status: "pending",
          userId: params.userId,
          createdAt: new Date(),
        })
        .returning({ id: userUploadedMovies.id });

      const movieId = newMovie.id;
      console.log(`✅ Movie inserted with ID: ${movieId}`);

      if (params.cast.length > 0) {
        await tx.insert(movieCast).values(
          params.cast.map((member) => ({
            movie_id: movieId,
            cast_name: member.name,
            image: member.image,
          }))
        );
        console.log(`✅ ${params.cast.length} cast members added.`);
      }
    });

    return {
      success: true,
      message: "Movie created successfully.",
      data: JSON.parse(JSON.stringify(params)),
    };
  } catch (error) {
    console.error("🚨 Movie creation error:", error);
    return {
      success: false,
      message: "An error occurred while creating the movie.",
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

export const getMovies = async () => {
  try {
    const movies = await drizzledb.execute(
      sql`SELECT movie_id, title, imdb_id, tmdb_id, user_id FROM core_movie ORDER BY RANDOM() LIMIT 10;`
    );
    return { success: true, data: movies };
  } catch (error) {
    console.error("🚨 Error fetching movies:", error);
    return { success: false, message: "Error fetching movies." };
  }
};


export const addMovieToWatchlist = async (params: AddtoWatchProps) => {
  if (!params.user_id) {
    const session = await auth();
    if (!session || !session.user?.id) {
      throw new Error("User not authenticated");
    }
    params.user_id = session.user.id;
  }
  try {
    console.log("🔍 Received user_id:", params.user_id);
    await drizzledb.transaction(async (tx) => {
      await tx
        .insert(watchlist)
        .values({
          user_id: params.user_id,
          imdb_id: params.imdb_id,
        })
        .execute();
    });
    // check if the movie is already in the watchlist
    return {
      success: true,
      message: "Movie added to watchlist",
    };

  } catch (error) {
    console.error("🚨 Error adding movie to watchlist:", error);
    return {
      success: false,
      message: "Failed to add movie to watchlist",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

// ✅ Remove a movie from the watchlist
export const removeMovieFromWatchlist = async (params: AddtoWatchProps) => {
  if (!params.user_id) {
    const session = await auth();
    if (!session || !session.user?.id) {
      throw new Error("User not authenticated");
    }
    params.user_id = session.user.id;
  }
  try {
    console.log(`🚀 Deleting movie with IMDb ID: ${params.imdb_id} for user: ${params.user_id}`);
    await drizzledb.transaction(async (tx) => {
      await tx
        .delete(watchlist)
        .where(
          sql`user_id = ${params.user_id} AND imdb_id = ${params.imdb_id}`
        )
        .execute();
    });
  } catch (error) {
    console.error("🚨 Error removing movie from watchlist:", error);
    return {
      success: false,
      message: "Failed to remove movie from watchlist",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}