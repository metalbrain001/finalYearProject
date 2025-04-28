import Header from "@/components/Header";
import React, { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { updateUserlastseen } from "@/lib/helper/updateUserlastseen";
import { ThemeProvider } from "@/components/resources/ThemeProvider";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  after(async () => {
    if (!session?.user?.id) return;
  });

  // Update the user's last seen
  await updateUserlastseen(session?.user?.id as string);

  return (
    <main className="root-container bg-dashboard">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <Header session={session} />
        <div className="mt-20 pb-20">
          <ThemeProvider>{children}</ThemeProvider>
        </div>
      </div>
    </main>
  );
};

export default layout;
