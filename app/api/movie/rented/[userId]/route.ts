import { NextResponse, NextRequest } from "next/server";
import { drizzledb } from "@/db/drizzle";
import { rentedMovies } from "@/db/schema";
import { eq, desc } from "drizzle-orm";


export async function GET(req: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  try {
    const user_id = (await params)?.userId;

    if (!user_id) {
      console.error("❌ Missing user_id in request");
      return NextResponse.json({ success: false, message: "user_id is required." }, { status: 400 });
    }

    const movies = await drizzledb
      .select()
      .from(rentedMovies)
      .where(eq(rentedMovies.user_id, user_id))
      .orderBy(desc(rentedMovies.rentedAt))
      .execute();
    return NextResponse.json({ success: true, data: movies });
  } catch (error: any) {
    console.error("❌ API Error:", error.message);
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}