// Description: This code defines an API route in a Next.js application that fetches rented movies chart data.
import { getRentedMoviesChartData } from "@/lib/actions/getrentedmvchart";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getRentedMoviesChartData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching genre chart data:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}