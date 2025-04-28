"use client";

import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface StarDisplayRatingProps {
  rating: number; // 0-10 scale
  totalStars?: number;
}

const StarDisplayRating: React.FC<StarDisplayRatingProps> = ({
  rating,
  totalStars = 5,
}) => {
  const scaledRating = (rating / 10) * totalStars;
  const fullStars = Math.floor(scaledRating);
  const hasHalfStar = scaledRating - fullStars >= 0.5;
  const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={`full-${index}`} size={24} color="gold" />
      ))}
      {hasHalfStar && <FaStarHalfAlt size={24} color="gold" />}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={`empty-${index}`} size={24} color="gray" />
      ))}
    </div>
  );
};

export default StarDisplayRating;
