// app/api/notifications/route.ts
import { drizzledb } from "@/db/drizzle";
import { notifications } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { auth } from "@/auth";
import { NextResponse } from "next/server";


export async function GET() {
  const session = await auth();
  const notifs = await drizzledb
    .select()
    .from(notifications)
    .where(eq(notifications.user_id, String(session?.user?.id)))
    .orderBy(desc(notifications.createdAt));

  return NextResponse.json(notifs);
}
