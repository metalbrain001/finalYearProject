import { drizzledb } from "@/db/drizzle";
import { coreMovie } from "@/db/schema";
import { eq } from "drizzle-orm";
import { embeddings } from "@/lib/actions/embedding";

export async function generateAndStoreMovieEmbedding(movieId: number) {
  const movie = await drizzledb
    .select({
      id: coreMovie.id,
      title: coreMovie.title,
      genres: coreMovie.genres,
      description: coreMovie.description,
      embedding: coreMovie.embedding, // ✅ use consistent field name
    })
    .from(coreMovie)
    .where(eq(coreMovie.id, movieId))
    .limit(1)
    .execute();

  if (!movie.length) {
    console.error("❌ Movie not found:", movieId);
    return;
  }

  // ✅ Check if embedding already exists
  if (movie[0].embedding) {
    console.log("⚠️ Embedding already exists for movie ID:", movieId);
    return;
  }

  const prompt = `${movie[0].title || ""} ${movie[0].genres || ""} ${movie[0].description || ""}`.trim();

  if (!prompt) {
    console.warn("⚠️ No valid prompt for embedding generation:", movieId);
    return;
  }

  const vector = await embeddings({ text: prompt });

  if (!vector || !Array.isArray(vector)) {
    console.error("⚠️ Failed to generate embedding for movie ID:", movieId);
    return;
  }

  console.log("🧠 Generated vector length:", vector.length);

  await drizzledb
    .update(coreMovie)
    .set({ embedding: vector })
    .where(eq(coreMovie.id, movieId));

  console.log("✅ Embedding stored for movie:", movieId);
}
