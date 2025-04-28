// components/recommended/RecommendedList.tsx
"use client";

import React from "react";
import { useGetRecommendedMV } from "@/hooks/use-getrecommMV";
import RecommendedCard from "./RecommCard";
import { defaultPoster } from "@/constants";

const RecommendedList = () => {
  const { recommendedMV, loading, error } = useGetRecommendedMV();

  if (loading) {
    return (
      <p className="text-gray-400 text-center">Loading recommendations...</p>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!recommendedMV || recommendedMV.length === 0) {
    return (
      <p className="text-gray-400 text-center">
        No recommendations available yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {recommendedMV.map((movie) => (
        <RecommendedCard
          key={movie.id}
          posterUrl={movie.poster_url || defaultPoster}
          title={movie.title}
          genres={Array.isArray(movie.genres) ? movie.genres : [movie.genres]}
        />
      ))}
    </div>
  );
};

export default RecommendedList;
