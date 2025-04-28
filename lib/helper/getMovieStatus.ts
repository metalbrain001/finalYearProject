"use server";

// lib/helpers/getOrCreateMovieId.ts
import { drizzledb } from "@/db/drizzle";
import { coreMovie } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";

// Get Movie Status, if rented, if not rented, if not found
export const getMovieStatus = async (tmdbId: number) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!session) {
    throw new Error("Unauthorized");
  }

  const existing = await drizzledb
    .select()
    .from(coreMovie)
    .where(eq(coreMovie.tmdbId, tmdbId))
    .limit(1)
    .execute();

  if (existing.length) {
    return existing[0].status;
  }

  return "not found";
};

export default getMovieStatus;