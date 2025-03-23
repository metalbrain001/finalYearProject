// app/api/movie/togglelike/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { drizzledb } from '@/db/drizzle';
import { movieFeedback } from '@/db/schema';
import { and, eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { user_id, movie_id, imdb_id, currentFeedbackType, newFeedbackType } = body;

    if (!user_id || !movie_id || newFeedbackType === undefined || newFeedbackType === null || imdb_id === undefined || imdb_id === null) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    if (currentFeedbackType === newFeedbackType) {
      // Remove feedback (toggle off)
      await drizzledb
        .delete(movieFeedback)
        .where(and(
          eq(movieFeedback.user_id, user_id),
          eq(movieFeedback.movie_id, movie_id)
        ));
    } else {
      const existing = await drizzledb
        .select()
        .from(movieFeedback)
        .where(and(
          eq(movieFeedback.user_id, user_id),
          eq(movieFeedback.movie_id, movie_id)
        ));

      if (existing.length > 0) {
        await drizzledb
          .update(movieFeedback)
          .set({ feedback_type: newFeedbackType })
          .where(and(
            eq(movieFeedback.user_id, user_id),
            eq(movieFeedback.movie_id, movie_id)
          ));
      } else {
        await drizzledb.insert(movieFeedback).values({
          user_id,
          movie_id,
          imdb_id,
          feedback_type: newFeedbackType,
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[TOGGLE_FEEDBACK_ERROR]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
