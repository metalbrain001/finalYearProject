// components/GenreComponent.tsx
"use client";

import { useEffect, useState } from "react";
import GenreCard from "./GenreCard";
import { getMoviesByGenre } from "@/lib/actions/getMovieByGenre";

interface GenreComponentProps {
  genre: string;
  page?: number;
  limit?: number;
  showPagination?: boolean;
}

const GenreComponent = ({
  genre,
  page = 1,
  limit = 12,
  showPagination = true,
}: GenreComponentProps) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(page);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      const data = await getMoviesByGenre({
        genres: genre,
        page: currentPage,
        limit,
      });
      setMovies(data);
      setIsLoading(false);
    };
    fetchMovies();
  }, [genre, currentPage, limit]);

  const handleNext = () => setCurrentPage((prev) => prev + 1);
  const handlePrev = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <h2 className="text-xl font-bold text-white mb-2 capitalize">
        🎬 {genre} Movies
      </h2>

      {isLoading ? (
        <p className="text-gray-400">Loading movies...</p>
      ) : movies.length === 0 ? (
        <p className="text-gray-400">No movies found for {genre}.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <GenreCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster_url={movie.poster_url}
              status={movie.status}
              imdb_id={movie.imdb_id}
            />
          ))}
        </div>
      )}

      {showPagination && (
        <div className="flex justify-center items-center mt-6 gap-4">
          {currentPage > 1 && (
            <button
              onClick={handlePrev}
              className="px-4 py-2 border border-gray-600 rounded text-sm text-white hover:bg-gray-700"
            >
              Previous
            </button>
          )}
          {movies.length === limit && (
            <button
              onClick={handleNext}
              className="px-4 py-2 border border-gray-600 rounded text-sm text-white hover:bg-gray-700"
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default GenreComponent;
