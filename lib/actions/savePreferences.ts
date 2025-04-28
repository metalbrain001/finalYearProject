"use server";

// lib/actions/savePreferences.ts
import { drizzledb } from "@/db/drizzle";
import { pref } from "@/db/schema";
import { Pref } from "@/types";
import { eq } from "drizzle-orm";

export async function savePreferences(data: Omit<Pref, "id" | "createdAt">) {
  const existing = await drizzledb
    .select()
    .from(pref)
    .where(eq(pref.user_id, data.user_id));

  if (existing.length > 0) {
    // Optional: update instead of insert
    await drizzledb
      .update(pref)
      .set({ ...data })
      .where(eq(pref.user_id, data.user_id));
  } else {
    await drizzledb.insert(pref).values({
      ...data,
    });
  }

  return { success: true };
}
