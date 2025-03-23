"use server";

import { drizzledb } from "@/db/drizzle";
import { coreMovie, registrations, rentedMovies } from "@/db/schema";
import { eq, and, or } from "drizzle-orm";
import dayjs from "dayjs";
import { embeddings } from "./embedding";
import { getOrCreateMovieId } from "@/lib/helper/getMovieOrCreate";
import { flattenMovieMetadata } from "../helper/tmdbAPIMovie";


export const rentMovie = async (params: {
  movie_id: number;
  user_id: string;
  tmdbId: number;
  movie_title: string;
  poster_url: string;
  genres: string;
  production_companies: string;
  origin_countries: string;
  original_language: string;
  spoken_languages: string[];
  description: string;
  imdb_id: string;
  vote_average: number;
  release_date: string;
  revenue: number;
  runtime: number;
  tagline: string;
  embedding: number[];
}) => {
  const { movie_id, user_id, tmdbId, movie_title, poster_url, genres, production_companies, origin_countries, original_language, spoken_languages, description, imdb_id, vote_average, release_date, revenue, runtime, tagline } = params;

  try {

    // Guard clause – missing required ID
    if (!movie_id || !user_id) {
      throw new Error("Missing required parameters: movie_id or user_id");
    }

    // Use getOrCreateMovieId to insert movie if it doesn't exist
    const movieId = await getOrCreateMovieId(tmdbId, {
      title: movie_title,
      poster_url,
      genres,
      tmdb_id: tmdbId,
      imdb_id: "",
    });
    // Start transaction
    const result = await drizzledb.transaction(async (tx) => {
      // Fetch movie and check availability
      const movie = await tx
        .select()
        .from(coreMovie)
        // .where(eq(coreMovie.tmdbId, tmdbId))
        .where(eq(coreMovie.id, movieId))
        .limit(1)
        .execute();

      // 2. Check if it's available
      if (!movie.length) {
        throw new Error("Movie not found in the database.");
      }

      if (movie[0].status !== "available") {
        throw new Error("Movie is currently not available for rent.");
      }

      // Exising rental check
      const existingRental = await tx
        .select()
        .from(rentedMovies)
        .where(and(eq(rentedMovies.movie_id, movie_id), eq(rentedMovies.user_id, user_id), eq(rentedMovies.status, "rented"))
        )
        .limit(1)
        .execute();

      if (existingRental.length) {
        throw new Error("You have already rented this movie.");
      }

      // You already generated this
      const fields = [movie_title, genres, tagline, production_companies, origin_countries, original_language];
      const combinedText = fields.filter(Boolean).join(". ");

      console.log("🔍 Generating embedding for:", combinedText);

      const embedVector = await embeddings({ text: combinedText });

      // ✅ Validate embedding before use
      if (!Array.isArray(embedVector) || embedVector.length === 0 || embedVector.some((x) => isNaN(x))) {
        console.warn("⚠️ Invalid embedding. Skipping vector save.");
        throw new Error("Embedding generation failed.");
      }

      await tx.update(coreMovie).set({ embedding: embedVector }).where(eq(coreMovie.id, movie_id)).execute();

      // Calculate due date (3 days from now)
      const rentedAt = new Date();
      const dueDate = dayjs(rentedAt).add(3, "days").toDate();

      const production_countries = origin_countries.split(",").map((country) => ({ name: country.trim() }));
      const metadata = flattenMovieMetadata({
        movie_id: movieId,
        title: movie_title,
        poster_path: poster_url,
        production_countries,
        original_language,
        spoken_languages: spoken_languages.map((l) => ({ english_name: l.trim() })),
        imdb_id,
        tmdbId,
        vote_average,
        release_date,
        revenue,
        runtime,
        tagline,
        genres: genres.split(",").map((g) => ({ name: g.trim() })),
        production_companies: production_companies.split(",").map((c) => ({ name: c.trim() })),
        overview: description,
        status: "rented",
        vote_count: vote_average,
      });

      const insertedRental = await tx.insert(rentedMovies).values({
        movie_id: movieId,
        user_id,
        tmdbId,
        movie_title: movie_title,
        poster_url,
        rentedAt,
        dueDate: dueDate.toISOString(),
        status: "rented",
        genres: metadata.genres,
        production_companies: metadata.production_companies,
        origin_countries: metadata.origin_countries,
        original_language,
        spoken_languages: metadata.spoken_languages,
        imdbId: imdb_id,
        vote_average: metadata.vote_average,
        release_date: metadata.release_date,
        revenue: metadata.revenue,
        runtime: metadata.runtime,
        description: metadata.description,
        tagline,
        embedding: embedVector
      }).returning().execute();

      console.log(`✅ Movie rented successfully: ${insertedRental}`);



      // Update movie status to 'rented'
      await tx
        .update(coreMovie)
        .set({ status: "rented" })
        .where(eq(coreMovie.id, movie_id))
        .execute();

      return {
        success: true,
        message: `Movie rented successfully`,
        data: insertedRental,
      };
    });

    return result;

  } catch (error: any) {
    console.error("❌ Error renting movie:", error);
    return { success: false, message: error.message || "Error renting movie" };
  }
};

// Check rental movie function
export const getRentalStatus = async (movie_id: number, user_id: string) => {
  try {
    console.log("🔍 Checking rental status for movie:", movie_id, "user:", user_id);

    if (!movie_id || !user_id) {
      console.warn("⚠️ Invalid movie_id or user_id passed to getRentalStatus");
      return false;
    }

    const rental = await drizzledb
      .select()
      .from(rentedMovies)
      .where(
        and(
          eq(rentedMovies.movie_id, movie_id),
          eq(rentedMovies.user_id, user_id),
          eq(rentedMovies.status, "rented")
        )
      )
      .limit(1)
      .execute();

    console.log("🎬 Rental Query Result:", rental);
    return rental.length > 0; // ✅ Returns `true` only if a rental exists
  } catch (error) {
    console.error("❌ Error fetching rental status:", error);
    return false; // Prevents UI from breaking
  }
};


export const returnMovie = async (params: { movie_id: number; user_id: string }) => {
  const { movie_id, user_id } = params;

  try {
    // Start transaction
    return await drizzledb.transaction(async (tx) => {
      // Find the active rental
      const rental = await tx
        .select()
        .from(rentedMovies)
        .where(
          and(
            eq(rentedMovies.movie_id, movie_id),
            eq(rentedMovies.user_id, user_id),
            eq(rentedMovies.status, "rented")
          )
        )
        .limit(1)
        .execute();

      if (!rental.length) {
        throw new Error("No active rental found for this movie.");
      }

      // Update rental record - Mark as returned and set returnedAt timestamp
      await tx
        .update(rentedMovies)
        .set({ status: "returned", returnedAt: new Date() })
        .where(
          and(
            eq(rentedMovies.movie_id, movie_id),
            eq(rentedMovies.user_id, user_id),
            eq(rentedMovies.status, "rented")
          )
        )
        .execute();

      // Update movie status in core_movie to "available"
      await tx
        .update(coreMovie)
        .set({ status: "available" })
        .where(eq(coreMovie.id, movie_id))
        .execute();

      console.log("✅ Movie returned successfully!");
      return { success: true, message: "Movie returned successfully." };
    });
  } catch (error: any) {
    console.error("❌ Error returning movie:", error);
    return { success: false, message: error.message || "Error returning movie" };
  }
};