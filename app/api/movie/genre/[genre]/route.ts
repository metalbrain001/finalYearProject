import { NextRequest, NextResponse } from "next/server";
import { getMoviesByGenre } from "@/lib/actions/getmvbygenre";

export async function GET(req: NextRequest, { params }: { params: Promise<{ genre: string }>; }) {
  const genre = (await params).genre;
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "12", 10);

  const result = await getMoviesByGenre(genre, limit, page);
  return NextResponse.json(result);
}

