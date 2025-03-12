"use client";

import MovieSegmentCard from "@/components/MovieSegmentCard";
import useMovieSegment from "@/hooks/use-segment";
import { usePagination } from "@/hooks/use-pagination";
import PaginationForm from "./PaginationForm";

const TopRatedMovies = () => {
  const { movies: topRated, loading: loadingTop } = useMovieSegment("topRated");
  const { movies: recentRelease, loading: loadingRecent } =
    useMovieSegment("recentRelease");
  const { movies, currentPage, totalPages, loading, error, goToPage } =
    usePagination(20);

  console.log({ topRated, recentRelease });

  if (loadingTop || loadingRecent)
    return <p className="text-white">Loading homepage...</p>;

  return (
    <div className="px-6 py-8 space-y-10 max-w-7xl mx-auto">
      <MovieSegmentCard title="🔥 Top Rated Movies" movies={topRated} />
      <MovieSegmentCard title="🆕 Recently Released" movies={recentRelease} />
      {/* ✅ Pagination controls */}
      <div className="flex justify-center mx-auto pt-20">
        <PaginationForm
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
        />
      </div>
    </div>
  );
};

export default TopRatedMovies;
