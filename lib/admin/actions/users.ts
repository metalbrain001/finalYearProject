"use server";

import { drizzledb } from "@/db/drizzle";
import { registrations, watchlist } from "@/db/schema";
import { eq } from "drizzle-orm";

// ✅ Fetch all users
export const getUsers = async () => {
  try {
    const users = await drizzledb
      .select({
        id: registrations.id,
        fullName: registrations.fullName,
        username: registrations.username,
        email: registrations.email,
        role: registrations.role,
        createdAt: registrations.createdAt,
      })
      .from(registrations)
      .execute();
    return { success: true, data: users };
  } catch (error) {
    console.error("🚨 Error fetching users:", error);
    return { success: false, message: "Error fetching users." };
  }
};

// ✅ Update user role
export const updateUserRole = async (userId: string, role: "user" | "admin" | "superadmin") => {
  try {
    await drizzledb
      .update(registrations)
      .set({ role })
      .where(eq(registrations.id, userId))
      .execute();

    return { success: true, message: "User role updated successfully." };
  } catch (error) {
    console.error("🚨 Error updating user role:", error);
    return { success: false, message: "Error updating user role." };
  }
};

// ✅ Delete user
export const deleteUser = async (requesterId: string, userId: string) => {
  try {
    // 🔹 Fetch requester's role
    const requester = await drizzledb
      .select({ role: registrations.role })
      .from(registrations)
      .where(eq(registrations.id, requesterId))
      .execute();
    // ❌ If requester is not found
    if (!requester.length) {
      return { success: false, message: "Requester not found. Unauthorized access." };
    }

    // ❌ If requester is not a superadmin, deny access
    if (requester[0].role !== "superadmin") {
      return { success: false, message: "You are not authorized to delete users." };
    }

    await drizzledb.delete(registrations).where(eq(registrations.id, userId)).execute();
    return { success: true, message: "User deleted successfully." };
  } catch (error) {
    console.error("🚨 Error deleting user:", error);
    return { success: false, message: "Error deleting user." };
  }
};


