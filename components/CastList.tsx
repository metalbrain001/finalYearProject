"use client";

import React, { useState } from "react";
import CastCard from "./CastCard";
import PaginationForm from "./PaginationForm";
import EmptyState from "./ui/emptystate";
import { Users } from "lucide-react";

interface CastListProps {
  cast: {
    name: string;
    character: string;
    profile_path: string | null;
  }[];
  itemsPerPage?: number;
}

const CastList: React.FC<CastListProps> = ({ cast, itemsPerPage = 6 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(cast.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedCast = cast.slice(startIndex, startIndex + itemsPerPage);

  if (!cast || cast.length === 0) {
    return (
      <EmptyState
        title="No Cast Available"
        message="Cast information for this movie is not available at the moment."
        // icon={<Users size={40} />}
        imageSrc="/images/casthead.svg" // Optional fallback image
      />
    );
  }

  return (
    <div className="flex flex-col items-center pt-10 w-full">
      {/* Cast Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
        {selectedCast.map((actor, index) => (
          <CastCard
            key={index}
            name={actor.name}
            character={actor.character}
            profile_path={actor.profile_path}
          />
        ))}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4">
          <PaginationForm
            currentPage={currentPage}
            totalPages={totalPages}
            goToPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default CastList;
