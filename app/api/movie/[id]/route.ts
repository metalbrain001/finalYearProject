import { NextRequest, NextResponse } from "next/server";
import { drizzledb } from "@/db/drizzle";
import { coreLinks } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }>; }) {
  try {
    const movieId = (await params)?.id;

    if (!movieId || isNaN(Number(movieId))) {
      console.error("❌ Invalid movieId in request:", movieId);
      return NextResponse.json({ success: false, message: "Invalid movieId provided." }, { status: 400 });
    }

    // 🔹 Fetch `tmdbId` and `imdbId` from database
    const result = await drizzledb
      .select({ tmdbId: coreLinks.tmdbId, imdbId: coreLinks.imdbId })
      .from(coreLinks)
      .where(eq(coreLinks.movieId, Number(movieId)))
      .limit(1)
      .execute();

    if (!result || result.length === 0) {
      console.error("❌ Movie not found in database for movieId:", movieId);
      return NextResponse.json({ success: false, message: "Movie not found in database." }, { status: 404 });
    }

    const { tmdbId, imdbId } = result[0];

    if (!tmdbId) {
      return NextResponse.json({
        success: false,
        message: `No TMDb ID found in database for movieId: ${movieId}`,
      }, { status: 400 });
    }

    // 🔹 Fetch metadata from TMDb API
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || "";
    const baseUrl = "https://api.themoviedb.org/3";

    const tmdbResponse = await fetch(`${baseUrl}/movie/${tmdbId}?api_key=${apiKey}&language=en-US`);
    if (!tmdbResponse.ok) {
      throw new Error(`Failed to fetch movie metadata from TMDb. Status: ${tmdbResponse.status}`);
    }
    const metadata = await tmdbResponse.json();


    return NextResponse.json({ success: true, data: { ...metadata, imdbId, tmdbId } });
  } catch (error: any) {
    console.error("❌ API Error:", error.message);
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
