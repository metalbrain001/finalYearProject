// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: "user" | "admin" | "superadmin"; // ✅ You can also keep it as string if you want
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: "user" | "admin" | "superadmin";
  }

  interface JWT {
    id: string;
    name: string;
    email: string;
    role: "user" | "admin" | "superadmin";
  }
}
