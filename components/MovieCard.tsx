import React from "react";
import { Movie } from "@/types";
import Link from "next/link";

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <div className="movie-card border rounded-md p-4 shadow-md">
      <Link href={`/movies/${movie.movieId}`}>
        <img
          src={
            movie.posterUrl ||
            "https://fakeimg.pl/600x400/d43333/f5e2e2?text=no+image&font=bebas"
          }
          alt={movie.title}
          style={{ width: "100%", height: "70%", objectFit: "cover" }}
        />
      </Link>
      <h3 className="text-lg font-semibold mt-2">{movie.title}</h3>
      <p className="text-gray-400 text-sm">{movie.genres}</p>
    </div>
  );
};

export default MovieCard;
