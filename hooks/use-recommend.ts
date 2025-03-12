// hooks/useRecommendations.ts
import { useState, useEffect } from "react";
import { getGenreBasedRecommendations } from "@/lib/actions/getsimilarmv";
import { RecommendedMovies } from "@/types";

export const useRecommendations = (userId: string) => {
  const [recommendations, setRecommendations] = useState<RecommendedMovies[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchRecommendations = async () => {
      try {
        const response = await getGenreBasedRecommendations(userId);
        if (response.success) {
          setRecommendations(response.data || []);
        } else {
          throw new Error(response.error || "Failed to fetch recommendations.");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [userId]);

  return { recommendations, loading, error };
};
