// app/api/movie/togglelike/route.ts
import { NextRequest, NextResponse } from "next/server";
import { drizzledb } from "@/db/drizzle";
import { coreMovie, movieFeedback } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { toggleSchema } from "@/lib/validations";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = toggleSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error }, { status: 400 });
    }

    const {
      user_id,
      movie_id,
      imdb_id,
      currentFeedbackType,
      newFeedbackType,
    } = parsed.data;

    console.log("togglelike received:", parsed.data);

    // ✅ Prevent invalid feedback_type from being saved
    if (currentFeedbackType === newFeedbackType) {
      return await drizzledb
        .delete(movieFeedback)
        .where(and(
          eq(movieFeedback.user_id, user_id),
          eq(movieFeedback.movie_id, movie_id)
        ))
        .then(() => NextResponse.json({ success: true, action: "removed-none" }));
    }

    // ✅ Remove if toggled off (like ➡️ like)
    if (currentFeedbackType === newFeedbackType) {
      await drizzledb
        .delete(movieFeedback)
        .where(and(
          eq(movieFeedback.user_id, user_id),
          eq(movieFeedback.movie_id, movie_id)
        ));
      return NextResponse.json({ success: true, action: "removed" });
    }

    // ✅ Ensure movie exists
    const movieExists = await drizzledb
      .select()
      .from(coreMovie)
      .where(eq(coreMovie.id, movie_id));

    if (movieExists.length === 0) {
      return NextResponse.json({ error: "Movie not found in core_movie" }, { status: 404 });
    }

    // ✅ Update or Insert Feedback
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

    return NextResponse.json({ success: true, action: "saved" });
  } catch (err) {
    console.error("[TOGGLE_FEEDBACK_ERROR]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
