import React from "react";
import { Movie } from "@/types";
import Link from "next/link";

const Movies = ({ movies }: { movies: Movie[] }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {movies.map((movie) => (
        <div
          key={movie.movieId}
          className="p-4 rounded-lg border-2 border-dark-4 shadow-xl"
        >
          <Link key={movie.movieId} href={`/movie/${movie.movieId}`}>
            <img
              src={
                movie.posterUrl ||
                "https://fakeimg.pl/600x400/d43333/f5e2e2?text=no+image&font=bebas"
              }
              alt={movie.title}
              className="rounded-md w-full h-64 object-cover"
            />
          </Link>
          <h3 className="text-sm font-medium">{movie.title}</h3>
          <p className="text-xs text-gray-400">{movie.genres}</p>
        </div>
      ))}
    </div>
  );
};

export default Movies;
