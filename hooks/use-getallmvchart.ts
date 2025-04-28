// This hook fetches all MV chart data from the server and returns
"use client";
import { useEffect, useState } from "react";
import type { ChartData } from "@/types";

export function useGetAllMVChart() {
  const [data, setData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const res = await fetch("/api/dashboard/chart/allmovie");
        if (!res.ok) throw new Error("Failed to fetch all MV chart data");
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