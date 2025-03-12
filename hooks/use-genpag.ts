// hooks/useGenrePagination.ts
import { useEffect, useState } from "react";
import { MovieSegment } from "@/types";

interface ApiResponse {
  success: boolean;
  data: MovieSegment[];
  meta: {
    page: number;
    totalPages: number;
    totalMovies: number;
  };
}

export const useGenrePagination = (genre: string, initialLimit = 12) => {
  const [movies, setMovies] = useState<MovieSegment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/movie/genre/${genre}?page=${page}&limit=${initialLimit}`);
      const data: ApiResponse = await res.json();
      if (data.success) {
        setMovies(data.data);
        setCurrentPage(data.meta.page);
        setTotalPages(data.meta.totalPages);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [genre, currentPage]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      fetchMovies(page);
    }
  };

  return { movies, currentPage, totalPages, loading, error, goToPage };
};
