// utils/feedback.ts
import { drizzledb } from '@/db/drizzle'; // your drizzle db instance
import { movieFeedback } from '@/db/schema'; // your schema
import { eq, and } from 'drizzle-orm';

export enum FeedbackTypeEnum {
  Like = 'like',
  Dislike = 'dislike',
}

interface SaveFeedbackInput {
  user_id: string;
  movie_id: number;
  imdb_id: string;
  feedback_type: FeedbackTypeEnum;
}

export async function saveFeedback(input: SaveFeedbackInput) {
  const { user_id, movie_id, imdb_id, feedback_type } = input;

  // Check if feedback already exists for the user and movie
  const existing = await drizzledb
    .select()
    .from(movieFeedback)
    .where(and(
      eq(movieFeedback.user_id, user_id),
      eq(movieFeedback.movie_id, movie_id)
    ));

  if (existing.length > 0) {
    // Update feedback if it already exists
    return await drizzledb
      .update(movieFeedback)
      .set({ feedback_type })
      .where(and(
        eq(movieFeedback.user_id, user_id),
        eq(movieFeedback.movie_id, movie_id)
      ))
      .execute();
  }

  // Insert new feedback
  return await drizzledb.insert(movieFeedback).values({
    user_id,
    movie_id,
    imdb_id,
    feedback_type,
  }).execute();
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