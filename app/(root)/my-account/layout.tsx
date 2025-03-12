import React, { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { eq } from "drizzle-orm";
import { registrations } from "@/db/schema";
import { drizzledb } from "@/db/drizzle";
import SideBar from "@/components/SideBar";
import dayjs from "dayjs";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  after(async () => {
    if (!session?.user?.id) return;

    // get the user and see if the last activity is today
    const user = await drizzledb
      .select()
      .from(registrations)
      .where(eq(registrations.id, session?.user.id))
      .limit(1);
    if (user[0].createdAt.toDateString() === new Date().toDateString()) return;

    // Update user's last seen
    await drizzledb
      .update(registrations)
      .set({ createdAt: new Date() })
      .where(eq(registrations.id, session?.user.id));
  });
  return (
    <main className="flex min-h-screen w-full flex-row">
      <SideBar />
      <div className="user-container">
        <div className="welcome-message">
          <div className="text-sm text-gray-100">
            <h1>Welcome {session?.user?.name}</h1>
          </div>
          <div className="text-sm text-gray-100">
            📅 {dayjs().format("MMMM D, YYYY h:mm A")}
          </div>
        </div>
        {children}
      </div>
      {/* Render welcome message with user's name */}
    </main>
  );
};

export default layout;
