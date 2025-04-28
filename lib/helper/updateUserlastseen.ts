// Update the user's last seen when they visit the site helper function
import { drizzledb } from "@/db/drizzle";
import { registrations } from "@/db/schema";
import { eq } from "drizzle-orm";

// get the user and see if the last activity is today
export const updateUserlastseen = async (userId: string) => {
  const user = await drizzledb
    .select()
    .from(registrations)
    .where(eq(registrations.id, userId))
    .limit(1);
  if (user[0].createdAt?.toDateString() === new Date().toDateString()) return;

  // Update user's last seen
  await drizzledb
    .update(registrations)
    .set({ createdAt: new Date() })
    .where(eq(registrations.id, userId));
};

export default updateUserlastseen;
