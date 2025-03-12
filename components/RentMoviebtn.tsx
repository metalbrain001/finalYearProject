"use client";

import React, { use, useEffect, useState } from "react";
import { Button } from "./ui/button";
import Icons from "@/components/UseIcons";
import { getRentalStatus, rentMovie, returnMovie } from "@/lib/actions/movie";
import { toast } from "sonner";
import { RentedMovies } from "@/types";

const RentMoviebtn = ({
  movie_id,
  user_id,
  movie_title,
  poster_url,
  tmdbId,
  genres,
  production_companies,
  origin_countries,
  original_language,
  tagline,
  isAlreadyRented,
}: RentedMovies) => {
  const { Play } = Icons();
  const [isRenting, setIsRenting] = useState(false);
  const [status, setStatus] = useState(
    isAlreadyRented ? "rented" : "available"
  ); // 🔹 Track rental status

  useEffect(() => {
    // 🔹 Fetch rental status on component mount
    const fetchRentalStatus = async () => {
      const isRented = await getRentalStatus(movie_id, user_id);
      if (isRented) {
        setStatus("rented");
      }
    };

    fetchRentalStatus();
  }, [movie_id, user_id]);

  const handleRentMovie = async () => {
    if (status === "rented") return;

    setIsRenting(true);
    try {
      const response = await rentMovie({
        movie_id,
        user_id,
        tmdbId,
        movie_title,
        poster_url: poster_url || "",
        genres: genres.map((g) => g.name).join(", "),
        production_companies: production_companies
          .map((c) => c.name)
          .join(", "),
        origin_countries,
        original_language,
        tagline,
        embedding: [],
      });

      console.log("🎉 Movie rented successfully:", response);

      if (response?.success) {
        console.log("🎉 Movie rented successfully:", response.success);
        setStatus("rented");
        toast(`Success renting movie`, {
          description: "You have successfully rented the movie.",
        });
      } else {
        toast(`Error renting movie`, {
          description:
            response?.message || "There was an error renting the movie.",
        });
      }
    } catch (error) {
      console.error("❌ Error renting movie:", error);
      toast(`Error renting movie`, {
        description: "There was an error renting the movie. Please try again.",
      });
    } finally {
      setIsRenting(false);
    }
  };

  // Handle return rented movie
  const handleReturnMovie = async () => {
    setIsRenting(true);
    try {
      const response = await returnMovie({ movie_id, user_id });
      if (response?.success) {
        setStatus("available");
        toast(`Success returning movie`, {
          description: "You have successfully returned the movie.",
        });
      } else {
        toast(`Error returning movie`, {
          description:
            response?.message || "There was an error returning the movie.",
        });
      }
    } catch (error) {
      console.error("❌ Error returning movie:", error);
      toast(`Error returning movie`, {
        description:
          "There was an error returning the movie. Please try again.",
      });
    } finally {
      setIsRenting(false);
    }
  };

  return (
    <div className="flex flex-row gap-4">
      <Button
        className="movie-overview_btn"
        onClick={handleRentMovie}
        disabled={isRenting || status === "rented"}
      >
        <Play size={62} strokeWidth={2} color="black" fill="black" />
        <p className="text-dark-1 text-sm font-poppins">
          {status === "rented"
            ? "Already Rented"
            : isRenting
            ? "Renting..."
            : "Rent Movie"}
        </p>
      </Button>
      {status === "rented" && (
        <Button
          className="movie-overview_btn"
          onClick={handleReturnMovie}
          disabled={isRenting}
        >
          <Play size={62} strokeWidth={2} color="black" fill="black" />
          <p className="text-dark-1 text-sm font-poppins">
            {isRenting ? "Returning..." : "Return Movie"}
          </p>
        </Button>
      )}
    </div>
  );
};

export default RentMoviebtn;
