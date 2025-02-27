import { drizzledb } from "@/db/drizzle";
import { userUploadedMovies } from "@/db/schema";
import { UploadedMovie } from "@/types";
import { eq, desc } from "drizzle-orm";

export const getUploadedMovies = async (userId: string): Promise<UploadedMovie[]> => {
  if (!userId) return [];

  try {
    return await drizzledb
      .select({
        id: userUploadedMovies.id,
        title: userUploadedMovies.title,
        movie_year: userUploadedMovies.movie_year,
        director: userUploadedMovies.director,
        movie_plot: userUploadedMovies.movie_plot,
        genres: userUploadedMovies.genres,
        description: userUploadedMovies.description,
        userId: userUploadedMovies.userId,
        posterUrl: userUploadedMovies.posterUrl,
        movie_url: userUploadedMovies.movie_url,
        movieRuntime: userUploadedMovies.movieRuntime,
        actors: userUploadedMovies.actors,
        status: userUploadedMovies.status,
        createdAt: userUploadedMovies.createdAt,
      })
      .from(userUploadedMovies)
      .limit(10)
      .orderBy(desc(userUploadedMovies.createdAt))
      .where(eq(userUploadedMovies.userId, userId))
      .execute();
  } catch (error) {
    console.error("🚨 Error fetching uploaded movies:", error);
    return [];
  }
};
