import { NextResponse, NextRequest } from "next/server";
import { drizzledb } from "@/db/drizzle";
import { coreMovie, coreLinks } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
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