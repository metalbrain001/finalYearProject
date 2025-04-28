import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");

  if (session.user.role !== "superadmin" && session.user.role !== "admin") {
    redirect("/dashboard"); // ✅ Just use session.user.role
  }

  return (
    <main className="flex min-h-screen w-full flex-row">
      <div className="admin-container bg-dashboard">{children}</div>
    </main>
  );
};

export default layout;
