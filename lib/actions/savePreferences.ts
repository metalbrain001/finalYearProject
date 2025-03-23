"use server";

// lib/actions/savePreferences.ts
import { drizzledb } from "@/db/drizzle";
import { preferences } from "@/db/schema";
import { Preferences } from "@/types";
import { eq } from "drizzle-orm";

export async function savePreferences(data: Omit<Preferences, "id" | "createdAt">) {
  const existing = await drizzledb
    .select()
    .from(preferences)
    .where(eq(preferences.user_id, data.user_id));

  if (existing.length > 0) {
    // Optional: update instead of insert
    await drizzledb
      .update(preferences)
      .set({ ...data })
      .where(eq(preferences.user_id, data.user_id));
  } else {
    await drizzledb.insert(preferences).values({
      ...data,
    });
  }

  return { success: true };
}
