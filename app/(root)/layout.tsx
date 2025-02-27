import Header from "@/components/Header";
import React, { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { eq } from "drizzle-orm";
import { registrations } from "@/db/schema";
import { drizzledb } from "@/db/drizzle";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session) redirect("/sign-in");

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
    <main className="root-container">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <Header session={session} />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default layout;
