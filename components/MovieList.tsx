"use client";

import React, { useState } from "react";
import Movies from "./Movies";
import { usePagination } from "@/hooks/use-pagination";
import PaginationForm from "./PaginationForm";

const MovieList = () => {
  const { movies, currentPage, totalPages, loading, error, goToPage } =
    usePagination(20);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-poppins font-bold mb-4">Movies</h1>

      {/* ✅ Pass movies directly from `usePagination` */}
      <Movies movies={movies} />

      {/* ✅ Pagination controls */}
      <div className="flex justify-center mx-auto pt-20">
        <PaginationForm
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
        />
      </div>
    </div>
  );
};

export default MovieList;
