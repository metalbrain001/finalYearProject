"use client";

import React from "react";
import Link from "next/link";

interface Movie {
  id: number;
  title: string;
  genres: string[];
  releaseDate: string;
  rating: number;
  posterUrl: string;
}

interface MovieTableProps {
  movies: Movie[];
}

const MovieTable: React.FC<MovieTableProps> = ({ movies }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="min-w-full bg-gray-900 text-white">
        <thead className="bg-gray-800">
          <tr>
            <th className="py-3 px-6 text-left">Poster</th>
            <th className="py-3 px-6 text-left">Title</th>
            <th className="py-3 px-6 text-left">Genres</th>
            <th className="py-3 px-6 text-left">Release Date</th>
            <th className="py-3 px-6 text-left">Rating</th>
            <th className="py-3 px-6 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr
              key={movie.id}
              className="border-b border-gray-700 hover:bg-gray-800 transition"
            >
              <td className="py-3 px-6">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-12 h-16 object-cover rounded-md"
                />
              </td>
              <td className="py-3 px-6">{movie.title}</td>
              <td className="py-3 px-6">{movie.genres.join(", ")}</td>
              <td className="py-3 px-6">{movie.releaseDate}</td>
              <td className="py-3 px-6">{movie.rating.toFixed(1)} / 10</td>
              <td className="py-3 px-6 text-center">
                <Link
                  href={`/admin/movies/edit/${movie.id}`}
                  className="text-blue-400 hover:underline"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieTable;
