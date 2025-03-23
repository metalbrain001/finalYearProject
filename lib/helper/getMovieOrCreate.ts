"use server";

// lib/helpers/getOrCreateMovieId.ts
import { drizzledb } from "@/db/drizzle";
import { coreMovie } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";

interface MovieMetaData {
  title: string;
  poster_url: string;
  genres: string;
  tmdb_id: number;
  imdb_id: string;
}


export const getOrCreateMovieId = async (tmdbId: number, metadata: MovieMetaData) => {

  const session = await auth();
  const userId = session?.user?.id;
  if (!session) {
    throw new Error("Unauthorized");
  }


  const existing = await drizzledb
    .select()
    .from(coreMovie)
    .where(eq(coreMovie.tmdbId, tmdbId)) // Make sure this matches your DB schema
    .limit(1)
    .execute();

  if (existing.length) {
    return existing[0].id;
  }

  const inserted = await drizzledb
    .insert(coreMovie)
    .values({
      movieId: Number(tmdbId),
      createdAt: new Date(), // Replace new Date() with the appropriate value
      userId: Number(userId),
      ...metadata,
      tmdbId,
    })
    .returning();

  return inserted[0].id;
};

export default getOrCreateMovieId;
