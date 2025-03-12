// hooks/useMovieSegment.ts
import { useEffect, useState } from "react";
import { MovieSegment } from "@/types";

const useMovieSegment = (segment: "topRated" | "recentRelease" | string) => {
  const [movies, setMovies] = useState<MovieSegment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/movie/segment`);
        const raw = await response.json();

        const segmentData = raw?.data?.data?.[segment]; // 🔥 FIXED HERE

        if (!segmentData || segmentData.length === 0) {
          throw new Error("No movies found.");
        }

        setMovies(segmentData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    // useEffect(() => {
    //   const fetchMovies = async () => {
    //     setLoading(true);
    //     try {
    //       const response = await fetch(`/api/movie/segment`);
    //       const json = await response.json();

    //       if (!json.success || !json.data || !json.data[segment]) {
    //         throw new Error("No movies found for this segment.");
    //       }

    //       setMovies(json.data[segment]);
    //       console.log("🎬 Movies:", json.data[segment]);
    //     } catch (error: any) {
    //       setError(error.message || "Failed to load movies");
    //     } finally {
    //       setLoading(false);
    //     }
    //   };

    fetchMovies();
  }, [segment]);

  return { movies, loading, error };
};

export default useMovieSegment;
