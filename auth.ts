import NextAuth, { CredentialsSignin, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { drizzledb } from "./db/drizzle";
import { registrations } from "./database/schema";
import { eq } from "drizzle-orm";
import { Role } from "./types";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new InvalidLoginError();
        }

        const user = await drizzledb
          .select()
          .from(registrations)
          .where(eq(registrations.email, credentials.email.toString()))
          .limit(1)
          .execute();
        if (user.length === 0) {
          return null;
        }


        const isPasswordValid = await compare(
          credentials.password.toString(),
          user[0].password
        );
        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user[0].id.toString(),
          email: user[0].email,
          name: user[0].fullName,
          role: user[0].role,
        } as User;
      },

    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as Role;
        return session;
      }
      return session;
    },
  },
});
