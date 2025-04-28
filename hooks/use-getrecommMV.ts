// This hook fetches the recommended movies from the server
// and returns them in a format suitable for rendering.

import { useEffect, useState } from "react";

export function useGetRecommendedMV() {
  const [recommendedMV, setRecommendedMV] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendedMV = async () => {
      try {
        const res = await fetch("/api/movie/recommended");
        if (!res.ok) throw new Error("Failed to fetch recommended MV");
        const json = await res.json();
        setRecommendedMV(json.data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedMV();
  }, []);

  return { recommendedMV, loading, error };
}