import { Movie } from "@/types";
import { useState, useEffect } from "react";

// Custom hook to fetch movies
export const useMovies = (page: number = 1, limit: number = 20) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/movie?page=${page}&limit=${limit}`);
        if (!response.ok) throw new Error("Failed to fetch movies");

        const data = await response.json();
        if (data.success && data.data) {
          setMovies(data.data);
        } else {
          throw new Error(data.message || "No movies found");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, limit]);

  return { movies, loading, error };
};
