"use server";

import { drizzledb } from "@/db/drizzle";
import { registrations } from "@/db/schema";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";
import { headers } from "next/headers";
import ratelimit from "@/lib/ratelimit";
import { redirect } from "next/navigation";
import { workflowClient } from "../workflow";
import config from "../config";
import { AuthCredentials } from "@/types";

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params;

  const ip = (await headers()).get("x-real-ip") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);
  if (!success) return redirect("/too-many-request");

  if (!email || !password) {
    return { success: false, error: "Email and password are required" };
  }

  try {
    const user = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    if (user?.error) {
      return { success: false, error: user.error };
    }
    return { success: true, error: "" };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: "Sign-In Error" }; // Consistent return type
    } else {
      return { success: false, error: "An unknown error occurred" };
    }
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { fullName, username, email, password } = params;

  const ip = (await headers()).get("x-real-ip") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);
  if (!success) return redirect("/too-many-request");

  if (!fullName || !username || !email || !password) {
    return { success: false, error: "" };
  }

  if (!email.includes("@")) {
    return { success: false, error: "" };
  }

  const existingUser = await drizzledb
    .select()
    .from(registrations)
    .where(eq(registrations.email, email))
    .execute();
  if (existingUser.length > 0) {
    return { success: false, error: "" };
  }

  const hashedPassword = await hash(password, 10);
  if (!hashedPassword) {
    return { success: false, error: "" };
  }

  try {
    const newUser = await drizzledb
      .insert(registrations)
      .values({
        fullName,
        username,
        email,
        password: hashedPassword,
      })
      .execute();
    console.log("newUser", newUser);

    if (!newUser) {
      return { success: false, error: "Failed to create registration" };
    }

    await workflowClient.trigger({
      url: `${config.env.prodApiEndPoint}/api/workflows/onboarding`,
      body: {
        email,
        fullName,
      },
    });

    await signInWithCredentials({ email, password });
    return { success: true, error: "" };
  } catch (error) {
    if (error instanceof Error) {
      return { success: true, error: "" };
    } else {
      return { success: true, error: "" };
    }
  }
};