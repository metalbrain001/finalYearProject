import { useState, useEffect } from "react";
import { MovieDetails } from "@/types";

// Custom hook to fetch movie details by ID
export const useGetMovieById = (movieId: number | string | null) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log(`Fetching movie details for ID: ${movieId}`);
        const response = await fetch(`/api/movie/${movieId}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch movie. Status: ${response.status}`);
        }

        const result = await response.json();

        if (!result.success || !result.data) {
          throw new Error(result.message || "Movie details not found.");
        }

        setMovieDetails(result.data);
      } catch (err: any) {
        console.error("❌ Error fetching movie details:", err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return { movieDetails, loading, error };
};
