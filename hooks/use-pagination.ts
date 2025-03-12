import { useState, useEffect } from "react";
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

export const usePagination = (limit: number = 20) => {
  const [movies, setMovies] = useState<MovieSegment[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/movie?page=${page}&limit=${limit}`);
      if (!res.ok) throw new Error("Failed to fetch movies");

      const data: ApiResponse = await res.json();
      if (data.success) {
        setMovies([...data.data]);
        setCurrentPage(data.meta.page);
        setTotalPages(data.meta.totalPages);
      } else {
        throw new Error("No movies found");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      fetchMovies(page);
    }
  };

  return { movies, currentPage, totalPages, loading, error, goToPage };
};

// import { useState, useEffect } from "react";
// import { Movie } from "@/types";



// interface ApiResponse {
//   success: boolean;
//   data: Movie[];
//   meta: {
//     page: number;
//     totalPages: number;
//     totalMovies: number;
//   };
// }

// export const usePagination = (limit: number = 20) => {
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [totalPages, setTotalPages] = useState<number>(1);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchMovies = async (page: number) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch(`/api/movie?page=${page}&limit=${limit}`);
//       if (!res.ok) throw new Error("Failed to fetch movies");

//       const data: ApiResponse = await res.json();
//       if (data.success) {
//         setMovies(data.data);
//         setCurrentPage(data.meta.page);
//         setTotalPages(data.meta.totalPages);
//       } else {
//         throw new Error("No movies found");
//       }
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMovies(currentPage);
//   }, [currentPage]);

//   const goToPage = (page: number) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//       fetchMovies(page);
//     }
//   };

//   return { movies, currentPage, totalPages, loading, error, goToPage };
// };
