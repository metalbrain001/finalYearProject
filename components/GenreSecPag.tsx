"use client";

import React from "react";
import { useGenrePagination } from "@/hooks/use-genpag";
import MovieSegmentCard from "./MovieSegmentCard";
import PaginationForm from "./PaginationForm";

const GenreSectionWithPagination = ({ genre }: { genre: string }) => {
  const { movies, currentPage, totalPages, loading, error, goToPage } =
    useGenrePagination(genre, 12);

  if (loading) return <p className="text-gray-300">Loading {genre}...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section className="px-6 py-8 space-y-10 max-w-7xl mx-auto">
      <MovieSegmentCard title={`${genre} Movies`} movies={movies} />
      {totalPages > 1 && (
        <PaginationForm
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
        />
      )}
    </section>
  );
};

export default GenreSectionWithPagination;
