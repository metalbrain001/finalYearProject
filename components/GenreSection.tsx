"use client";

import React from "react";
import { useGenreMovies } from "@/hooks/use-getmvbygenre";
import MovieSegmentCard from "@/components/MovieSegmentCard";

const GenreSection = ({ genre }: { genre: string }) => {
  const { movies, loading, error } = useGenreMovies(genre);

  if (loading) return <p className="text-gray-300">Loading {genre}...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <section className="px-6 py-8 space-y-10 max-w-7xl mx-auto">
      <MovieSegmentCard title={`${genre} Movies`} movies={movies} />
    </section>
  );
};

export default GenreSection;
