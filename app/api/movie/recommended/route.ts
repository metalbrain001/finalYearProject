import { NextRequest, NextResponse } from "next/server";
import { recommendMoviesForUser } from "@/lib/actions/recommendmv";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const recommendations = await recommendMoviesForUser(session.user.id);

  return NextResponse.json(recommendations);
}
