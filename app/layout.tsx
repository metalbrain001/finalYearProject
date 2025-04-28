import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
// import { ThemeProvider } from "@/components/resources/ThemeProvider";

const ibmPlexsans = localFont({
  src: [
    {
      path: "/fonts/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "/fonts/Poppins-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "/fonts/Poppins-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "/fonts/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "/fonts/Poppins-BoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
  ],
});

const bebasNeue = localFont({
  src: [
    {
      path: "/fonts/BebasNeue-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--bebasNeue",
});

export const metadata: Metadata = {
  title: "Movie Recommender",
  description: "A movie recommender app",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body
          className={`${ibmPlexsans.className} ${bebasNeue.variable} bg-gray-950 text-light-1 antialiased`}
        >
          {children}
          <Toaster
            theme="dark"
            toastOptions={{
              className: "bg-light-1 text-dark-1",
            }}
          />
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
