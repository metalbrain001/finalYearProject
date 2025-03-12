import { NextResponse } from "next/server";
import { getUserById } from "@/lib/actions/getUserById";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }>; }) {
  try {
    const userId = (await params).id;
    const user = await getUserById(userId);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
