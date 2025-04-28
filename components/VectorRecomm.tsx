"use client";

import React from "react";
import { useRecommendMoviesByVectorApi } from "@/hooks/use-recommbyvec";
import VectorRecommCard from "./VectorRecommCard";

const VectorRecommendation = ({ userId }: { userId: string }) => {
  const { recommendations, loading, error } = useRecommendMoviesByVectorApi(
    String(userId)
  );

  return (
    <div>
      <div className="mt-6">
        <h3 className="text-2xl font-bold font-poppins text-white mb-4">
          🎯 Recommended for you
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {Array.isArray(recommendations) && recommendations.length > 0 ? (
            recommendations.map((movie) => (
              <VectorRecommCard key={movie.id} movie={movie} />
            ))
          ) : (
            <p className="text-white">No recommendations found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VectorRecommendation;
