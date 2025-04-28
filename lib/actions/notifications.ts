"use server";

import { drizzledb } from "@/db/drizzle";
import { notifications } from "@/db/schema";
import { eq } from "drizzle-orm";

export const markNotificationAsRead = async (notificationId: string) => {
  await drizzledb
    .update(notifications)
    .set({ read: true })
    .where(eq(notifications.id, notificationId))
    .execute();
};