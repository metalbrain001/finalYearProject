// Route to handle notifications
// app/api/notifications/route.ts

import { NextResponse } from "next/server";
import { drizzledb } from "@/db/drizzle"; // Your drizzle instance
import { notifications } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { auth } from "@/auth"; // Your auth instance

// Middleware to check if the user is authenticated
async function isAuthenticated() {
  const session = await auth();
  if (!session || !session.user?.id) {
    return null;
  }
  return session.user.id;
}
// GET all notifications
export async function GET() {
  const userId = await isAuthenticated();
  if (!userId) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await drizzledb
      .select()
      .from(notifications)
      .where(eq(notifications.user_id, userId))
      .orderBy(notifications.createdAt, desc(notifications.createdAt))
      .execute();

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}