import { useState, useEffect } from "react";

interface RentedMovie {
  movie_title: string;
  rented_month: string;
  total_rentals: number;
}

export const useGetRentedMovies = () => {
  const [rentedMovies, setRentedMovies] = useState<RentedMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRentedMovies = async () => {
      try {
        const res = await fetch("/api/dashboard/rented-movie");
        const data = await res.json();
        if (data.success) {
          setRentedMovies(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch rented movies");
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchRentedMovies();
  }, []);

  return { rentedMovies, loading, error };
};
