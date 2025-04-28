// This hook fetches rented movies chart data from the server and returns it.
"use client";
import { useState, useEffect } from "react";
import type { ChartData } from "@/types";

export function useGetRentedMoviesChart() {
  const [data, setData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const res = await fetch("/api/dashboard/chart/rentedmv");
        if (!res.ok) throw new Error("Failed to fetch rented movies chart data");
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchChart();
  }, []);

  return { data, loading, error };
}