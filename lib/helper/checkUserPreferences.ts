"use server";

// lib/helpers/checkUserPreferences.ts
import { preferences } from "@/db/schema";
import { drizzledb } from "@/db/drizzle";
import { eq } from "drizzle-orm";

export const hasPreferences = async (userId: string) => {
  const pref = await drizzledb
    .select()
    .from(preferences)
    .where(eq(preferences.user_id, userId));
  return pref.length > 0;
};
