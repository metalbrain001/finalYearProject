// app/api/admin/get-user-tokens/route.ts
import { drizzledb } from "@/db/drizzle";
import { registrations, fcmTokens } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// Get only user tokens
export async function GET() {
  const data = await drizzledb
    .select({
      id: registrations.id,
      name: registrations.fullName,
      token: fcmTokens.token,
    })
    .from(registrations)
    .innerJoin(fcmTokens, eq(registrations.id, fcmTokens.user_id));

  return NextResponse.json(data); // [{ id, name, token }]
}
