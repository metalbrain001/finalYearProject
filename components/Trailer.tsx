"use client";

import React, { useState } from "react";
import useMovieTrailer from "@/hooks/use-gettrailer";
import { useParams } from "next/navigation";
import Image from "next/image";

const Trailer = () => {
  const { id } = useParams();
  const { trailer, loading } = useMovieTrailer(String(id));
  const [isPlaying, setIsPlaying] = useState(false);

  if (loading) return <p>Loading trailer...</p>;
  if (!trailer) return <p className="text-gray-400">No trailer available</p>;

  // ✅ Construct the YouTube thumbnail URL
  const thumbnailUrl = `https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`;

  return (
    <div className="w-full max-w-2xl">
      {isPlaying ? (
        // ✅ Show Embedded YouTube Video when playing
        <iframe
          className="w-full h-[300px] md:h-[500px] rounded-lg"
          src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
          title={trailer.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        // ✅ Show YouTube Thumbnail when not playing
        <div
          className="relative cursor-pointer"
          onClick={() => setIsPlaying(true)}
        >
          <Image
            src={thumbnailUrl}
            alt="Trailer Thumbnail"
            width={1280}
            height={720}
            className="w-full h-auto rounded-lg"
            priority
          />
          {/* ✅ Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-70 transition duration-300 rounded-lg">
            <svg
              className="w-16 h-16 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z"></path>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trailer;
