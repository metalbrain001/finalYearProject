import { NextResponse } from "next/server";
import { getLikesVsDislikes } from "@/lib/actions/getfdchart";

export async function GET(req: Request) {
  try {
    const data = await getLikesVsDislikes();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching feedback chart data:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}