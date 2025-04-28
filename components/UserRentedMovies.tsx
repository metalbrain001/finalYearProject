"use client";

import React from "react";
import { useGetRentedMovies } from "@/hooks/use-getrentedmv";
import { useSession } from "next-auth/react";
import { daysUntilDue, formattedDate, getMovieStatus } from "@/lib/utils";

const UserRentedMovies = () => {
  const { data: session } = useSession();
  const { rentedMovies, loading, error } = useGetRentedMovies(
    String(session?.user?.id)
  );

  if (loading)
    return (
      <p className="text-center text-gray-400">Loading your rented movies...</p>
    );
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <section className="p-6">
      <h2 className="text-2xl font-semibold font-poppins text-white mb-4">
        Your Rented Movies
      </h2>

      {rentedMovies.length === 0 ? (
        <p className="text-gray-400 text-center">
          You haven't rented any movies yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {rentedMovies.map((movie: any) => (
            <div
              key={movie.id}
              className="bg-gray-900 rounded-lg p-3 shadow-lg transform hover:scale-105 transition duration-300"
            >
              <div className="relative w-full aspect-[2/3]">
                {" "}
                {/* ✅ Aspect Ratio for Posters */}
                <img
                  src={movie.poster_url}
                  alt={movie.movie_title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  className="rounded-md object-cover"
                />
              </div>
              <h3 className="text-sm font-semibold mt-2 text-white truncate">
                {movie.movie_title}
              </h3>
              <p
                className={`text-xs font-medium mt-1 px-2 py-1 rounded-full text-center ${
                  getMovieStatus(movie) === "Currently Rented"
                    ? "bg-yellow-500 text-black"
                    : getMovieStatus(movie) === "Overdue"
                    ? "bg-red-500 text-white"
                    : "bg-green-500 text-black"
                }`}
              >
                {getMovieStatus(movie)}
              </p>
            </div>
          ))}
        </div>
      )}
      {/* ✅ Render due date */}
      <div className="mt-6 space-y-4">
        {rentedMovies && rentedMovies.length > 0 ? (
          rentedMovies
            .filter((movie: any) => movie.status === "rented")
            .map((movie: any) => (
              <div
                key={movie.id}
                className="border border-gray-300 font-poppins p-4 rounded-xl shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-100">
                  🎬 {movie.movie_title}
                </h3>

                <p className="text-gray-500 font-poppins text-sm mt-1">
                  📅 Rented Date:{" "}
                  <span className="font-medium">
                    {formattedDate(movie?.rentedAt)}
                  </span>
                </p>
                <p className="text-gray-500 font-poppins text-sm">
                  ⏳ Due Date:{" "}
                  <span className="font-medium">
                    {formattedDate(movie.dueDate)}
                  </span>
                  <span className="ml-2 text-xs text-red-500">
                    ({daysUntilDue(movie.dueDate)})
                  </span>
                </p>
              </div>
            ))
        ) : (
          <p className="text-gray-400 font-poppins text-center mt-4">
            You have no rented movies at the moment.
          </p>
        )}
      </div>
    </section>
  );
};

export default UserRentedMovies;
