"use client";

import React from "react";
import { useProfile } from "@/hooks/use-profile";
import { formattedDate } from "@/lib/utils";
import { useGetRentedMovies } from "@/hooks/use-getrentedmv";
import { useSession } from "next-auth/react";
import RecommendedMovies from "./RecommendMv";
import VectorRecommendation from "./VectorRecomm";
import LLMChatWindow from "./LLMWindown";

const Profile = () => {
  const { data: session } = useSession();
  const { user, movies, loading } = useProfile();
  const { rentedMovies } = useGetRentedMovies(String(session?.user?.id));

  if (loading) return <p className="text-gray-500">Loading profile...</p>;
  if (!user)
    return <p className="text-red-500">Error: User profile not found.</p>;

  return (
    <section className="user-container">
      {/* ✅ Profile Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-white text-xl font-bold">
            {user.fullName?.charAt(0).toLocaleUpperCase()}
          </div>
        </div>
      </div>
      {/* ✅ Activity Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl text-white shadow-sm">
          <p className="text-sm text-gray-400">Total Rented Movies</p>
          <h3 className="text-2xl font-bold">{rentedMovies?.length || 0}</h3>
        </div>

        <div className="p-4 rounded-xl text-white shadow-sm">
          <p className="text-sm text-gray-400">Last Rental Date</p>
          <h3 className="text-lg">
            {rentedMovies?.length > 0
              ? formattedDate(
                  rentedMovies[rentedMovies.length - 1]?.rentedAt.toString()
                )
              : "No rentals yet"}
          </h3>
        </div>

        <div className="p-4 rounded-xl text-white shadow-sm">
          <p className="text-sm text-gray-400">Account Role</p>
          <h3 className="text-lg capitalize">{user.role}</h3>
        </div>
      </div>
      {/* ✅ Recent Rentals Preview */}
      {rentedMovies?.length > 0 && (
        <div className="p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-white mb-4">
            Recent Rentals
          </h3>
          <ul className="space-y-3">
            {rentedMovies.slice(0, 3).map((movie: any) => (
              <li
                key={movie.id}
                className="flex justify-between text-sm text-gray-300 border-b border-dark-4 gap-2 pb-2"
              >
                <span>🎬 {movie.movie_title}</span>
                <span>{formattedDate(movie.rentedAt)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Vector Recommendations */}
      {rentedMovies?.length > 0 && (
        <VectorRecommendation userId={String(session?.user?.id)} />
      )}
      {/* ✅ Recommendations */}
      {/* {rentedMovies?.length > 0 ? (
        <RecommendedMovies userId={String(session?.user?.id)} />
      ) : (
        <p className="text-gray-400 mt-6">
          Rent a few movies to see personalized recommendations here 📽️
        </p>
      )} */}
      <LLMChatWindow />
    </section>
  );
};

export default Profile;
