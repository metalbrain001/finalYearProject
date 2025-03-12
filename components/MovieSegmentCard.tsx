import React from "react";
import { MovieSegment } from "@/types";
import Link from "next/link";
import PaginationForm from "./PaginationForm";
import { usePagination } from "@/hooks/use-pagination";

interface MovieSegmentCardProps {
  title: string;
  movies: MovieSegment[];
}

const MovieSegmentCard: React.FC<MovieSegmentCardProps> = ({
  title,
  movies,
}) => {
  const backUpimg =
    "https://fakeimg.pl/600x400/d43333/f5e2e2?text=no+image&font=bebas";
  return (
    <div className="mb-8">
      {/* Section Title */}
      <h2 className="text-2xl font-semibold text-white mb-4">{title}</h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 group"
          >
            <Link
              key={movie.movieId || movie.movie_id}
              href={`/movie/${movie.movieId || movie.movie_id}`}
            >
              <img
                src={
                  movie.poster_url
                    ? movie.poster_url // ✅ Use this consistently
                    : movie.posterUrl
                    ? movie.posterUrl // ✅ Fallback to posterUrl if poster_url is missing
                    : backUpimg
                }
                alt={movie.title}
                className="w-full h-64 object-cover rounded-t-xl"
              />
            </Link>
            <div className="p-2 text-white">
              <h4 className="text-sm font-semibold truncate">{movie.title}</h4>
              {movie.genres && (
                <p className="text-xs text-gray-400 truncate">{movie.genres}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSegmentCard;
