import React from "react";
import Link from "next/link";

export const SearchMovieCard = ({
  id,
  title,
  movie_id,
  poster_url,
  vote_average,
  genres,
  year,
}: any) => {
  return (
    <Link
      href={`/movie/${movie_id}`}
      className="flex flex-col items-start hover:shadow-lg transition-shadow duration-200"
    >
      <div className="flex flex-col rounded-lg">
        <img
          src={poster_url}
          alt={title}
          className="rounded-lg mb-4 w-32 object-cover"
        />
        <h3 className="text-xl font-bold text-off-white mb-2">{title}</h3>
        <div className="movie-info">
          <p className="movie-extra">
            Genre: <span className="font-bold text-off-white">{genres}</span>
          </p>
          <p className="movie-extra">
            Rating:{" "}
            <span className="font-bold text-off-white">{vote_average}</span>
          </p>
          <p className="movie-extra">
            Release Date:{" "}
            <span className="font-bold text-off-white">{year}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SearchMovieCard;
