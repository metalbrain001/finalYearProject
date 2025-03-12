import { UserRentedMovies } from "@/types";
import { useState, useEffect } from "react";

// Custom hook to fetch rented movies
export const useGetRentedMovies = (userId: string | null) => {
  const [rentedMovies, setRentedMovies] = useState<UserRentedMovies[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchRentedMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/movie/rented/${userId}`); // ✅ Match the correct API route
        const data = await response.json();

        if (data.success && data.data) {
          setRentedMovies(data.data);
        } else {
          throw new Error(data.message || "No rented movies found");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRentedMovies();
  }, [userId]);

  return { rentedMovies, loading, error };
};
