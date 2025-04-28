import { drizzledb } from "@/db/drizzle";
import { fcmTokens } from "@/db/schema";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  const { token } = await req.json();

  if (!session?.user?.id || !token) {
    return NextResponse.json(
      { success: false, message: "Token is required." },
      { status: 400 }
    );
  }

  // ✅ Check if this token already exists globally
  const existing = await drizzledb
    .select()
    .from(fcmTokens)
    .where(eq(fcmTokens.token, token))
    .limit(1)
    .execute();

  if (existing.length > 0) {
    // ✅ Update token's user_id if token already exists
    await drizzledb
      .update(fcmTokens)
      .set({ user_id: session.user.id })
      .where(eq(fcmTokens.token, token))
      .execute();
  } else {
    // ✅ Insert new token if doesn't exist
    await drizzledb.insert(fcmTokens).values({
      user_id: session.user.id,
      token,
    });
  }

  return NextResponse.json({ success: true });
}