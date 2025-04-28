import { NextResponse, NextRequest } from "next/server";
import { recommendMoviesForUser } from "@/lib/actions/recommendmv";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    if (!userId) {
      console.error("❌ Missing userId in request");
      return NextResponse.json(
        { success: false, message: "userId is required." },
        { status: 400 }
      );
    }

    const { success, data } = await recommendMoviesForUser(userId);

    return NextResponse.json({ success, data });
  } catch (error: any) {
    console.error("❌ API Error:", error.message);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
