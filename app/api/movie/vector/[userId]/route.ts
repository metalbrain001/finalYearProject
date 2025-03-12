import { NextResponse, NextRequest } from "next/server";
import { drizzledb } from "@/db/drizzle";
import { rentedMovies } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { recommendMoviesByVector } from "@/lib/actions/recommedbyvec";

export async function GET(req: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  try {
    const user_id = (await params)?.userId;

    if (!user_id) {
      console.error("❌ Missing user_id in request");
      return NextResponse.json({ success: false, message: "user_id is required." }, { status: 400 });
    }

    // Fetch most recent embedding from rented_movies table
    const rentals = await drizzledb
      .select({ embedding: rentedMovies.embedding, movie_id: rentedMovies.movie_id })
      .from(rentedMovies)
      .where(eq(rentedMovies.user_id, user_id))
      .orderBy(desc(rentedMovies.rentedAt))
      .limit(1)
      .execute();

    const latestRental = rentals[0];
    if (!latestRental || !latestRental.embedding) {
      return NextResponse.json({ success: true, data: [] });
    }

    const { data: recommendedMovies } = await recommendMoviesByVector(
      latestRental.embedding,
      [latestRental.movie_id]
    );

    let embeddingArray: number[] = [];

    if (typeof latestRental.embedding === "string") {
      embeddingArray = JSON.parse(latestRental.embedding);
    } else if (Array.isArray(latestRental.embedding)) {
      embeddingArray = latestRental.embedding;
    }

    return NextResponse.json({ success: true, data: recommendedMovies });
  } catch (error: any) {
    console.error("❌ API Error:", error.message);
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
