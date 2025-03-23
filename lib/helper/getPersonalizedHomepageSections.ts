"use server";
// lib/helpers/getPersonalizedHomepageSections.ts
import { drizzledb } from "@/db/drizzle";
import { preferences } from "@/db/schema";
import { eq } from "drizzle-orm";

type HomepageSection =
  | { type: "genre"; title: string; filterBy: { genre: string } }
  | { type: "mood_tags"; title: string; filterBy: { mood: string } }
  | { type: "actor"; title: string; filterBy: { actor: string } };

export async function getPersonalizedHomepageSections(userId: string): Promise<HomepageSection[]> {
  const pref = await drizzledb
    .select()
    .from(preferences)
    .where(eq(preferences.user_id, userId));

  if (!pref.length) return [];

  const userPref = pref[0];

  const genres = userPref.genres.split(",").map((g) => g.trim());
  const moodTags = userPref.mood_tags.split(",").map((m) => m.trim());
  const actors = userPref.actors.split(",").map((a) => a.trim());

  const sections: HomepageSection[] = [];

  sections.push(
    ...genres.map((genre) => ({
      type: "genre" as const,
      title: genre,
      filterBy: { genre },
    }))
  );

  sections.push(
    ...moodTags.map((mood) => ({
      type: "mood_tags" as const,
      title: `Because you like ${mood} movies`,
      filterBy: { mood },
    }))
  );

  sections.push(
    ...actors.map((actor) => ({
      type: "actor" as const,
      title: `Movies featuring ${actor}`,
      filterBy: { actor },
    }))
  );

  return sections;
}
