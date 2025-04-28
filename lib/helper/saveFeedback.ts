// utils/feedback.ts
import { drizzledb } from '@/db/drizzle'; // your drizzle db instance
import { movieFeedback } from '@/db/schema'; // your schema
import { eq, and } from 'drizzle-orm';
import { embeddings } from "@/lib/actions/embedding";
import { coreMovie } from '@/db/schema';

export enum FeedbackTypeEnum {
  Like = 'like',
  Dislike = 'dislike',
  None = 'none',
}

interface SaveFeedbackInput {
  user_id: string;
  movie_id: number;
  imdb_id: string;
  feedback_type: FeedbackTypeEnum;
}

export async function saveFeedback(input: SaveFeedbackInput) {
  const { user_id, movie_id, imdb_id, feedback_type } = input;

  if (feedback_type === FeedbackTypeEnum.None) {
    return await removeFeedback(user_id, movie_id);
  }

  // Check if feedback already exists for the user and movie
  const existing = await drizzledb
    .select()
    .from(movieFeedback)
    .where(and(
      eq(movieFeedback.user_id, user_id),
      eq(movieFeedback.movie_id, movie_id)
    ));

  let result;

  if (existing.length > 0) {
    // Update feedback
    result = await drizzledb
      .update(movieFeedback)
      .set({ feedback_type })
      .where(and(
        eq(movieFeedback.user_id, user_id),
        eq(movieFeedback.movie_id, movie_id)
      ))
      .execute();
  } else {

    // ✅ Only generate and save embedding if it's a "like"
    if (feedback_type === FeedbackTypeEnum.Like) {
      const movie = await drizzledb
        .select({
          id: coreMovie.id,
          title: coreMovie.title,
          genres: coreMovie.genres,
          description: coreMovie.description,
          embedding: coreMovie.embedding,
        })
        .from(coreMovie)
        .where(eq(coreMovie.id, movie_id))
        .limit(1)
        .execute();

      if (!movie.length) {
        console.error("❌ coreMovie not found for ID:", movie_id);
        return result;
      }

      if (movie[0].embedding) {
        console.log("⚠️ Embedding already exists for movie:", movie_id);
        return result;
      }

      const prompt = `${movie[0].title || ""} ${movie[0].genres || ""} ${movie[0].description || ""}`.trim();

      if (!prompt) {
        console.warn("⚠️ Cannot create prompt for movie:", movie_id);
        return result;
      }

      const vector = await embeddings({ text: prompt });

      if (!vector || !Array.isArray(vector)) {
        console.error("⚠️ Failed to generate embedding for movie:", movie_id);
        return result;
      }

      await drizzledb
        .update(coreMovie)
        .set({ embedding: vector })
        .where(eq(coreMovie.id, movie_id));

      console.log("✅ Embedding stored for movie:", movie_id);
    }

    // Insert new feedback
    result = await drizzledb.insert(movieFeedback).values({
      user_id,
      movie_id,
      imdb_id,
      feedback_type,
    }).execute();
  }

  return result;
}

export async function removeFeedback(user_id: string, movie_id: number) {
  return await drizzledb
    .delete(movieFeedback)
    .where(and(
      eq(movieFeedback.user_id, user_id),
      eq(movieFeedback.movie_id, movie_id)
    ))
    .execute();
}

// Get liked movies
export async function getUserLikes(user_id: string) {
  return await drizzledb
    .select()
    .from(movieFeedback)
    .where(and(
      eq(movieFeedback.user_id, user_id),
      eq(movieFeedback.feedback_type, 'like')
    ));
}