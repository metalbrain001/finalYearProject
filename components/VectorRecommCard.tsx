// Code: Vector Recommendation Card Component
import React from "react";
import { VectorRecommendation } from "@/types";
import Icons from "@/components/UseIcons";

const VectorRecommCard = ({ movie }: { movie: VectorRecommendation }) => {
  const { PlayCircle, Plus } = Icons();
  return (
    <div className="relative group p-2 rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300">
      <img
        src={
          movie.poster_url ||
          "https://image.tmdb.org/t/p/w500${movie?.poster_url}"
        }
        alt={movie.movie_title}
        className="w-full h-64 object-cover rounded-xl"
      />

      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col items-center justify-center">
        <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm mb-3 font-medium hover:bg-gray-200 transition">
          <PlayCircle size={20} /> Play
        </button>
        <button className="flex items-center gap-1 bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition">
          <Plus size={20} />
          watchlist
        </button>
      </div>

      <div className="mt-2 text-white">
        <h4 className="font-semibold text-sm truncate">{movie.movie_title}</h4>
        <p className="text-xs text-gray-400 truncate">{movie.genres}</p>
        {/* Future: show similarity score or IMDb rating */}
      </div>
    </div>
  );
};

export default VectorRecommCard;
