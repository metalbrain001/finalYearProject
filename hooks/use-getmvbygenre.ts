// hooks/useGenreMovies.ts
import { useEffect, useState } from "react";
import { MovieSegment } from "@/types";

export const useGenreMovies = (genre: string) => {
  const [movies, setMovies] = useState<MovieSegment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(`/api/movie/genre/${genre}`);
        const data = await res.json();
        if (data.success) {
          setMovies(data.data);
        } else {
          throw new Error(data.message || "Failed to load movies");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [genre]);

  return { movies, loading, error };
};
