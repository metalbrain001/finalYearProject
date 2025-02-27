import React from "react";
import SearchMovieCard from "./SearchMovieCard";

export const SearchResults = ({ isSearching, searchedMovies }: any) => {
  if (!searchedMovies || searchedMovies.length === 0) {
    return (
      <p className="p-4 text-white">⚠️ No results found in SearchResults.</p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {searchedMovies.map((movie: any) => (
        <SearchMovieCard
          key={movie.movie_id}
          title={movie.title}
          genres={
            Array.isArray(movie.genres) ? movie.genres.join(", ") : movie.genres
          }
          poster_url={movie.poster_url}
          vote_average={movie.vote_average}
          year={movie.release_date}
          description={movie.overview}
          movie_id={movie.movie_id}
        />
      ))}
    </div>
  );
};

export default SearchResults;
