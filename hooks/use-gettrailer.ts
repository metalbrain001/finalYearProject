import { useState, useEffect } from "react";

interface Trailer {
  key: string;
  name: string;
  site: string;
  type: string;
}

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || "";
const baseUrl = "https://api.themoviedb.org/3";

const useMovieTrailer = (movieId?: string) => {
  const [trailer, setTrailer] = useState<Trailer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) return; // ✅ Ensure a valid movieId is available

    const fetchTrailer = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`
        );

        if (!response.ok) throw new Error("Failed to fetch trailers.");

        const data = await response.json();
        console.log("🎬 Trailer API Data:", data);

        // ✅ Find the official YouTube trailer
        const officialTrailer = data.results.find(
          (video: Trailer) =>
            video.site === "YouTube" && video.type === "Trailer"
        );

        setTrailer(officialTrailer || null);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrailer();
  }, [movieId]);

  return { trailer, loading, error };
};

export default useMovieTrailer;
