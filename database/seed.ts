import ImageKit from "imagekit";
import { userUploadedMovies } from "../db/schema";
import { db } from "@/database/drizzle";
import { eq, isNull } from "drizzle-orm";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
});

const uploadToImageKit = async (url: string, fileName: string, folder: string) => {
  if (!url) return null; // Skip if URL is empty

  try {
    const response = await imagekit.upload({
      file: url,
      fileName,
      folder,
    });
    return response.filePath;
  } catch (error) {
    console.error(`Error uploading ${fileName} to ImageKit:`, error);
    return null; // Ensure the function doesn't return undefined
  }
};

const seed = async () => {
  try {
    // Fetch only movies where posterUrl or movie_url is NULL (avoids re-uploading)
    const movies = await db
      .select()
      .from(userUploadedMovies)
      .where(isNull(userUploadedMovies.posterUrl)) // Only fetch movies that need updates
      .execute();

    for (const movie of movies) {
      console.log(`Processing: ${movie.title}`);

      // Skip if already uploaded
      if (movie.posterUrl && movie.movie_url) {
        console.log(`Skipping ${movie.title} (already uploaded)`);
        continue;
      }

      // Upload only if missing
      const posterUrl = movie.posterUrl || (await uploadToImageKit(movie.posterUrl, movie.title, "posters"));
      const movieUrl = movie.movie_url || (await uploadToImageKit(movie.movie_url, movie.title, "movies"));

      if (!posterUrl || !movieUrl) {
        console.warn(`Skipping ${movie.title} due to upload failure.`);
        continue;
      }

      await db
        .update(userUploadedMovies)
        .set({ posterUrl, movie_url: movieUrl })
        .where(eq(userUploadedMovies.id, movie.id)) // Use unique ID instead of userId
        .execute();

      console.log(`✅ Successfully uploaded: ${movie.title}`);
    }
  } catch (error) {
    console.error("❌ Database seeding error:", error);
  }
};

// Run the script
seed().then(() => console.log("Seeding complete!"));
