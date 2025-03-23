// lib/helpers/checkUserRole.ts
import { drizzledb } from "@/db/drizzle";
import { registrations } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getUserRole = async (userId: string) => {
  const result = await drizzledb
    .select({ role: registrations.role })
    .from(registrations)
    .where(eq(registrations.id, userId));
  return result[0]?.role || null;
};
