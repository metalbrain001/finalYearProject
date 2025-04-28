"use server";

// lib/helpers/checkUserPreferences.ts
import { pref } from "@/db/schema";
import { drizzledb } from "@/db/drizzle";
import { eq } from "drizzle-orm";

export const hasPreferences = async (userId: string) => {
  const preference = await drizzledb
    .select()
    .from(pref)
    .where(eq(pref.user_id, userId));
  return preference.length > 0;
};
