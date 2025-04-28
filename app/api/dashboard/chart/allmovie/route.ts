import { NextResponse } from "next/server";
import { getAllMoviesChartData } from "@/lib/actions/getAllmovieChart";

export async function GET() {
  try {
    const data = await getAllMoviesChartData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching all movies chart data:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}