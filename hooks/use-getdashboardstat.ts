// This hook fetches dashboard statistics data from an API endpoint and returns the data.
"use client";
import { useEffect, useState } from "react";
import type { DashboardStatsCardProps } from "@/types";

export function useGetDashboardStats() {
  const [data, setData] = useState<DashboardStatsCardProps | null>(null);
  const [isloading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/dashboard/chart/stats");
        if (!res.ok) throw new Error("Failed to fetch dashboard stats");
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { data, isloading, error };
}

export default useGetDashboardStats;