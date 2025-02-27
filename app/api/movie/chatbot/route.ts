import { NextRequest, NextResponse } from "next/server";
import { OpenAIClient } from "@/lib/OpenAiClient";
import { drizzledb } from "@/db/drizzle";
import { sql } from "drizzle-orm";

const aiClient = new OpenAIClient();

/**
 * 🔹 Movie Chatbot API - Extracts user query & recommends movies
 */
export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    console.log("📥 User Input:", message);

    // ✅ Extract movie query (genre & count) from OpenAI
    const extractedQuery = await aiClient.extractMovieQuery(message);
    console.log("🔍 Extracted Query:", extractedQuery);

    const { genres, count } = extractedQuery; // ✅ Fixed: Use 'genre' (not 'genres')

    // ✅ Default to "recommended" if no genre is found
    const selectedGenre = genres && genres !== "unknown" ? genres : "recommended";

    // ✅ Fetch matching movies from the database
    const movies = await drizzledb.execute(
      sql`SELECT * FROM core_movie WHERE genres ILIKE ${"%" + selectedGenre + "%"} LIMIT ${count};`
    );

    if (movies.rows.length === 0) {
      return NextResponse.json({ message: `Sorry, no ${selectedGenre} movies found!` });
    }

    // ✅ Format movies with posters
    const movieList = movies.rows.map((movie: any) => ({
      movie_id: movie.movie_id,
      title: movie.title,
      poster_url: movie.poster_url || "https://fakeimg.pl/600x400/d43333/f5e2e2?text=no+image&font=bebas",
      genres: movie.genres,
      vote_average: movie.vote_average,
    }));

    // ✅ Generate chatbot response text
    const responseText = `Here are the top ${count} ${selectedGenre} movies:\n` +
      movieList.map(m => `- ${m.title}`).join("\n");

    return NextResponse.json({ response: responseText, genre: selectedGenre, movies: movieList }); // ✅ Include 'genre' in response
  } catch (error: any) {
    console.error("❌ API Error:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
