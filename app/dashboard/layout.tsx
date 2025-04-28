import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React, { ReactNode, Suspense } from "react";
import "@/styles/admin.css";
import Header from "@/components/admin/Header";
import RegisterToken from "@/components/RegisterToken";
import SideBar from "@/components/admin/SideBar";
import { drizzledb } from "@/db/drizzle";
import { registrations } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ThemeProvider } from "@/components/resources/ThemeProvider";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");

  // Check if user has a role in the database
  const userRole = session?.user?.id
    ? await drizzledb
        .select({ role: registrations.role })
        .from(registrations)
        .where(eq(registrations.id, session.user.id))
        .limit(1)
        .then((res) => res[0]?.role || "user")
    : "user";

  const isSuperAdmin = await drizzledb
    .select({ role: registrations.role })
    .from(registrations)
    .where(eq(registrations.id, session.user.id))
    .limit(1)
    .then((res) => res[0]?.role === "superadmin");

  if (!isSuperAdmin && userRole !== "admin" && userRole !== "user") {
    redirect("/sign-in");
  }

  return (
    <main className="flex min-h-screen w-full flex-row">
      <SideBar session={session} userRole={userRole} />
      <div className="admin-container bg-dashboard">
        <RegisterToken userId={session.user.id} />
        <Header session={session} />
        {children}
      </div>
    </main>
  );
};

export default layout;
