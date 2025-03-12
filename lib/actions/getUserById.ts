"use server";

import { drizzledb } from "@/db/drizzle";
import { registrations } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";

/**
 * Fetch a single user by ID from the database.
 * @param userId User ID to fetch.
 * @returns User object if found, otherwise null.
 * @example getUserById("123")
 * @example getUserById("456")
  */

export const getUserById = async (userId: string) => {
  try {

    const session = await auth();
    if (!session?.user?.id) {
      console.log("🚨 User not authenticated");
      return null; // ✅ Return null if user is not authenticated
    }

    // ✅ Fetch user directly (no transaction needed)
    const user = await drizzledb
      .select({
        id: registrations.id,
        fullName: registrations.fullName,
        username: registrations.username,
        email: registrations.email,
        role: registrations.role,
        createdAt: registrations.createdAt,
      })
      .from(registrations)
      .where(eq(registrations.id, userId))
      .limit(1)
      .execute();

    if (!user.length) {
      console.log(`🚨 User not found for ID: ${userId}`);
      return null; // ✅ Return null if user not found
    }
    return { ...user[0] }; // ✅ Return user object
  } catch (error) {
    console.error("🚨 Error fetching user:", error);
    return null; // ✅ Return null on error
  }
}
