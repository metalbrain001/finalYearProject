// components/recommended/RecommendedCard.tsx
"use client";

import React from "react";
import { defaultPoster } from "@/constants";

interface RecommendedCardProps {
  posterUrl: string;
  title: string;
  genres: string[];
}

const RecommendedCard: React.FC<RecommendedCardProps> = ({
  posterUrl,
  title,
  genres,
}) => {
  // Ensure genres is an array
  if (!Array.isArray(genres)) {
    genres = [genres];
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300">
      <img
        src={posterUrl || defaultPoster}
        alt={title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white truncate">{title}</h3>
        <p className="text-xs text-gray-400 mt-1">{genres.join(", ")}</p>
      </div>
    </div>
  );
};

export default RecommendedCard;
