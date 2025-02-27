import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "@/auth";
import { drizzledb } from "@/db/drizzle";
import { registrations } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function protectedByAdmin(req: NextApiRequest, res: NextApiResponse, next: Function) {
  // ✅ Get session data
  const session = await auth();

  // ❌ If no session, deny access
  if (!session || !session.user?.id) {
    return res.status(401).json({ message: "Unauthorized: No session found" });
  }

  // 🔹 Fetch user role from database
  const user = await drizzledb
    .select({ role: registrations.role })
    .from(registrations)
    .where(eq(registrations.id, session.user.id))
    .execute();

  // ❌ If user role is not superadmin, deny access
  if (!user.length) {
    return res.status(403).json({ message: "Forbidden: Superadmin access required" });
  }

  if (user[0].role !== "superadmin") {
    console.error("❌ Access denied. User is not a superadmin.");
    return res.status(403).json({ message: "Forbidden: Superadmin access required." });
  }

  // ✅ User is a "superadmin", proceed with request
  return next();
}
