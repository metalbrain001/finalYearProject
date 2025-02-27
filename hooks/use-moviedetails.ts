import { useState, useEffect } from "react";
import { fetchMovieMetadata } from "@/lib/utils";

interface MovieDetails {
  title: string;
  poster_path: string;
  overview: string;
  genres: { id: number; name: string }[];
  release_date: string;
  runtime: number;
  tagline: string;
  vote_average: number;
  production_companies: { id: number; name: string }[];
  budget: number;
  homepage: string;
  imdb_id: string;
  origin_country: string[];
}

export const useMovieDetails = (movieId: string | null) => {
  const [metadata, setMetadata] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovie = async () => {
      setLoading(true);
      try {
        // 🔹 Step 1: Fetch `tmdbId` and `imdbId` from the database using `movieId`
        const response = await fetch(`/api/movies/${movieId}`);
        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message || "Failed to fetch movie details.");
        }

        const { tmdbId, imdbId } = result.data;

        // 🔹 Step 2: Fetch metadata from TMDb API using `tmdbId`
        const metadata = await fetchMovieMetadata(tmdbId);
        setMetadata({ ...metadata, imdbId });

      } catch (err: any) {
        console.error("Error fetching movie details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  return { metadata, loading, error };
};
