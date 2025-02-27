import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React, { ReactNode, Suspense } from "react";
import "@/styles/admin.css";
import Header from "@/components/admin/Header";
import SideBar from "@/components/admin/SideBar";
import { drizzledb } from "@/db/drizzle";
import { registrations } from "@/db/schema";
import { eq } from "drizzle-orm";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");
  const isSuperAdmin = await drizzledb
    .select({ role: registrations.role })
    .from(registrations)
    .where(eq(registrations.id, session.user.id))
    .limit(1)
    .then((res) => res[0]?.role === "superadmin");

  if (!isSuperAdmin || isSuperAdmin !== true) {
    redirect("/sign-in");
  }

  return (
    <main className="flex min-h-screen w-full flex-row">
      <SideBar session={session} />
      <div className="admin-container">
        <Header session={session} />
        {children}
      </div>
    </main>
  );
};

export default layout;
