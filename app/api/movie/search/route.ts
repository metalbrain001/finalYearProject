import { NextRequest, NextResponse } from "next/server";
import { drizzledb } from "@/db/drizzle";
import { sql } from "drizzle-orm";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || "";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const DEFAULT_POSTER = "https://fakeimg.pl/600x400/d43333/f5e2e2?text=no+image&font=bebas"; // ✅ Fallback Poster

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get("query");

    if (!query) {
      return NextResponse.json({ success: false, message: "Query parameter is required." }, { status: 400 });
    }

    // ✅ First, search movies in the database (title contains query)
    const movies = await drizzledb.execute(
      sql`SELECT * FROM core_movie WHERE title ILIKE ${"%" + query + "%"} LIMIT 10;`
    );

    if (movies.rows.length > 0) {
      const moviesWithPosters = movies.rows.map((movie: any) => ({
        ...movie,
        poster_url: movie.poster_url ? movie.poster_url : DEFAULT_POSTER,
      }));

      return NextResponse.json({ success: true, movies: moviesWithPosters });
    }

    // ✅ If not found in DB, search in TMDb API
    const apiUrl = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
      query
    )}&language=en-US`;

    const response = await fetch(apiUrl, { cache: "no-store" });

    if (!response.ok) {
      console.error(`❌ TMDb search request failed: ${response.status}`);
      return NextResponse.json({ success: false, message: "Failed to fetch from TMDb" }, { status: 500 });
    }

    const data = await response.json();

    // ✅ Extract movie data
    const tmdbMovies = data.results.map((movie: any) => ({
      movieId: movie.id,
      title: movie.title,
      genres: movie.genre_ids?.join(", ") || "Unknown",
      poster_url: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : DEFAULT_POSTER,
      overview: movie.overview,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
    }));

    return NextResponse.json({ success: true, movies: tmdbMovies });
  } catch (error: any) {
    console.error("❌ API Error:", error.message);
    return NextResponse.json({ success: false, message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}
