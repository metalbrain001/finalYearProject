"use client";

import React, { useState } from "react";
import Icons from "./UseIcons";
import { FaStar } from "react-icons/fa";

interface StarRatingProps {
  totalStars?: number;
  onRatingSelect?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  totalStars = 5,
  onRatingSelect,
}) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const { Star } = Icons();

  const handleClick = (rating: number) => {
    setSelected(rating);
    if (onRatingSelect) {
      onRatingSelect(rating);
    }
  };

  return (
    <div className="flex gap-1 items-center justify-center">
      {[...Array(totalStars)].map((_, i) => {
        const ratingValue = i + 1;
        return (
          <FaStar
            key={i}
            size={28}
            strokeWidth={2}
            className="cursor-pointer transition-transform duration-200 hover:scale-110"
            color={
              (hovered !== null && ratingValue <= hovered) ||
              (selected !== null && ratingValue <= selected)
                ? "gold"
                : "gray"
            }
            onMouseEnter={() => setHovered(ratingValue)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleClick(ratingValue)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
