// components/RecommendedMovies.tsx
"use client";

import React from "react";
import { useRecommendations } from "@/hooks/use-recommend";
import RecommendationCard from "./RecommendCard";

const RecommendedMovies = ({ userId }: { userId: string }) => {
  const { recommendations, loading, error } = useRecommendations(userId);

  if (loading)
    return <p className="text-gray-500">Loading recommendations...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!recommendations.length)
    return <p className="text-gray-400">No recommendations available.</p>;

  return (
    <div className="mt-6">
      <h3 className="text-2xl font-bold font-poppins text-white mb-4">
        🎯 Recommended for You
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {recommendations.map((movie) => (
          <RecommendationCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedMovies;
