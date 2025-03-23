"use client";

// components/cards/GenreCard.tsx
import Link from "next/link";
import { defaultPoster } from "@/constants";
import { fetchPosterFromTMDB } from "@/lib/metadata";
import { useEffect, useState } from "react";

interface GenreCardProps {
  id: number;
  title: string;
  status: string | null;
  poster_url: string | null;
  imdb_id: string;
  tmdb_id?: number;
}

const GenreCard = ({
  id,
  title,
  status,
  poster_url,
  imdb_id,
  tmdb_id,
}: GenreCardProps) => {
  const [poster, setPoster] = useState<string>(poster_url || "");
  useEffect(() => {
    const fetchFallbackPoster = async () => {
      if (!poster_url && tmdb_id) {
        try {
          const fetchedPoster = await fetchPosterFromTMDB(tmdb_id);
          if (fetchedPoster) setPoster(fetchedPoster);
          else setPoster(defaultPoster);
        } catch (err) {
          console.error("📸 Fallback poster fetch failed:", err);
          setPoster(defaultPoster);
        }
      } else if (!poster_url) {
        setPoster(defaultPoster);
      }
    };

    fetchFallbackPoster();
  }, [poster_url, tmdb_id]);
  return (
    <div className="rounded-xl overflow-hidden text-white shadow-sm bg-gray-900">
      <Link href={`/movie/${id}`}>
        <img
          src={poster || defaultPoster}
          alt={title}
          className="w-full h-64 object-cover"
        />
      </Link>
      <div className="p-3">
        <h3 className="text-md font-semibold truncate">{title}</h3>
        <p className="text-sm text-gray-400">{status}</p>
      </div>
    </div>
  );
};

export default GenreCard;
