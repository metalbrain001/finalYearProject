"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
}

const PaginationForm: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  goToPage,
}) => {
  const maxVisiblePages = 5; // ✅ Show only 5 pages max

  const generatePageNumbers = () => {
    let pages = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex justify-center bg-dark-100 rounded-lg w-fit">
      <Pagination>
        <PaginationContent className="flex gap-2">
          {/* Previous Page */}
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => goToPage(currentPage - 1)}
                className="text-light-200 font-semibold"
              />
            </PaginationItem>
          )}

          {/* First Page */}
          {currentPage > 3 && (
            <>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={() => goToPage(1)}
                  className="text-light-200 font-semibold"
                >
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem className="text-light-200 font-bold">
                <PaginationEllipsis />
              </PaginationItem>
            </>
          )}

          {/* Visible Page Numbers */}
          {generatePageNumbers().map((page) => (
            <PaginationItem key={page} className="text-light-200 font-semibold">
              <PaginationLink
                href="#"
                onClick={() => goToPage(page)}
                className={currentPage === page ? "bg-blue-600 text-white" : ""}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Last Page */}
          {currentPage < totalPages - 2 && (
            <>
              <PaginationItem className="text-light-200 font-semibold">
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem className="text-light-200 font-semibold">
                <PaginationLink href="#" onClick={() => goToPage(totalPages)}>
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          {/* Next Page */}
          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => goToPage(currentPage + 1)}
                className="text-light-200 font-semibold"
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationForm;
