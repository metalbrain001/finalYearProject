import { useState, useEffect } from "react";
import { VectorRecommendation } from "@/types";

export const useRecommendMoviesByVectorApi = (userId: string | null) => {
  const [recommendations, setRecommendations] = useState<VectorRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!userId) {
        setRecommendations([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`/api/movie/vector/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch vector recommendations");
        }

        const responseData = await response.json();
        console.log("🎯 Recommended Movies:", responseData);
        setRecommendations(responseData.data || []);
      } catch (err: any) {
        setError(err.message || "Failed to fetch vector recommendations");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [userId]);

  return { recommendations, loading, error };
};
