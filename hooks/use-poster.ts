import { useState, useEffect } from "react";

interface Poster {
  tmdbId: string;
  imdbId: string;
  movieId: number;
  posterUrl?: string;
}

export const usePoster = (imdbId: string | null) => {
  const [poster, setPoster] = useState<Poster | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!imdbId) {
      setPoster({
        tmdbId: "placeholder",
        imdbId: "placeholder",
        movieId: 0,
        posterUrl: "/placeholder.jpg",
      });
      setLoading(false);
      return;
    }

    const fetchPoster = async () => {
      setLoading(true);
      try {
        // 🔹 Step 1: Fetch tmdbId from the Next.js API (`/api/link`)
        const linkResponse = await fetch(`/api/link?imdbId=${imdbId}`);
        const linkData = await linkResponse.json();

        if (!linkData.success || !linkData.data || linkData.data.length === 0) {
          throw new Error("No matching TMDb ID found in database.");
        }

        const { tmdbId, movieId } = linkData.data[0];

        // 🔹 Step 2: Fetch poster from TMDb API
        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || "";
        const tmdbResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${apiKey}`
        );
        const tmdbData = await tmdbResponse.json();

        if (!tmdbData.poster_path) {
          throw new Error("No poster found.");
        }

        const posterUrl = `https://image.tmdb.org/t/p/w500${tmdbData.poster_path}`;

        // 🔹 Step 3: Update state with poster data
        setPoster({
          tmdbId,
          imdbId,
          movieId,
          posterUrl,
        });

      } catch (err: any) {
        console.error("Error fetching poster:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPoster();
  }, [imdbId]);

  return { poster, loading, error };
};
