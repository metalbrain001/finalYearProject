import { useEffect, useState, useCallback } from "react";
import { CastCardProps } from "@/types";

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || "";
const baseUrl = "https://api.themoviedb.org/3";

const useMovieCast = (movieId?: string, movie_id?: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cast, setCast] = useState<CastCardProps[]>([]);

  // ✅ Fetch Cast Data
  const fetchCast = useCallback(async () => {
    if (!movieId) return;

    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/movie/${movieId || movie_id}/credits?api_key=${apiKey}`);

      if (!response.ok) throw new Error("Failed to fetch cast data.");

      const data = await response.json();

      // ✅ Ensure cast array exists
      setCast(data.cast || []);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [movieId]);

  // ✅ Fetch Data on Component Mount
  useEffect(() => {
    fetchCast();
  }, [fetchCast]);

  return { cast, loading, error };
};

export default useMovieCast;
