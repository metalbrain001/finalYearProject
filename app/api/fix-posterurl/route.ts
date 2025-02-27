import { NextResponse } from "next/server";
import { drizzledb } from "@/db/drizzle"; // Ensure DB is correctly configured
import { sql } from "drizzle-orm";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || "";

// Fetch Poster URL from TMDB using IMDb ID
const fetchPosterUrl = async (imdbId: string): Promise<string | null> => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/find/${imdbId}?api_key=${TMDB_API_KEY}&external_source=imdb_id`
    );

    if (!response.ok) throw new Error(`TMDb API Error: ${response.status}`);

    const data = await response.json();
    if (data.movie_results.length > 0 && data.movie_results[0].poster_path) {
      return `https://image.tmdb.org/t/p/w500${data.movie_results[0].poster_path}`;
    }

    return null;
  } catch (error) {
    console.error(`❌ Error fetching poster for ${imdbId}:`, error);
    return null;
  }
};

// Update Posters for Missing Movies
export async function GET() {
  try {
    const movies = await drizzledb.execute(
      sql`SELECT movie_id, imdb_id FROM core_movie WHERE poster_url IS NULL LIMIT 50;`
    );

    if (movies.rows.length === 0) {
      return NextResponse.json({ message: "✅ No missing posters." });
    }

    let updatedCount = 0;
    for (const movie of movies.rows) {
      if (!movie.imdb_id) continue;

      const posterUrl = await fetchPosterUrl(movie.imdb_id.toString());
      if (posterUrl) {
        await drizzledb.execute(
          sql`UPDATE core_movie SET poster_url = ${posterUrl} WHERE movie_id = ${movie.movie_id};`
        );
        updatedCount++;
      }
    }

    return NextResponse.json({ message: `✅ Updated ${updatedCount} posters.` });
  } catch (error: any) {
    console.error("❌ API Error:", error.message);
    return NextResponse.json(
      { message: "Database error", error: error.message },
      { status: 500 }
    );
  }
}
