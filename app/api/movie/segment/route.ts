import { NextResponse, NextRequest } from "next/server";
import { getHomepageMovies } from "@/lib/actions/getmovierate";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get("limit")) || 12;
    const offset = Number(searchParams.get("offset")) || 0;

    // Fetch top movies from the database
    const topMovies = await getHomepageMovies(limit, offset);

    return NextResponse.json({ success: true, data: topMovies });
  } catch (error: any) {
    console.error("❌ API Error:", error.message);
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}