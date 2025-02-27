import { useState, useEffect } from "react";

export const useSearchMovies = (query: string) => {
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setSearchResults(null);
      return;
    }

    const search = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/movie/search?query=${encodeURIComponent(query)}`);

        if (!response.ok) {
          throw new Error("Failed to fetch search results.");
        }

        const data = await response.json();
        console.log("✅ Search API Response:", data);

        setSearchResults(data.movies);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    search();
  }, [query]);

  return { searchResults, isLoading, error };
};
