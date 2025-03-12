// components/RecommendationCard.tsx
import React from "react";
import { RecommendedMovies } from "@/types";

const RecommendationCard = ({ movie }: { movie: RecommendedMovies }) => {
  return (
    <div className="p-4 rounded-xl shadow hover:scale-105 transition-transform duration-300">
      <img
        src={movie.poster_url || "/images/placeholder.jpg"}
        alt={movie.title}
        className="w-full h-64 object-cover rounded-lg mb-3"
      />
      <h4 className="text-lg font-semibold text-white">{movie.title}</h4>
      <p className="text-sm text-gray-400">{movie.genres}</p>
    </div>
  );
};

export default RecommendationCard;
