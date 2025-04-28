import { getGenreChartData } from "@/lib/actions/getgenrechart";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await getGenreChartData();
  return NextResponse.json(data);
}