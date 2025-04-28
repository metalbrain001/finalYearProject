"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { useGetRentedMovies } from "@/hooks/use-getallrentmv";
import DashboardChartCard from "@/components/admin/card/DashboardChartCard";

const Page = () => {
  const { rentedMovies, loading, error } = useGetRentedMovies();

  const chartData = {
    labels: rentedMovies.map((movie) => movie.movie_title),
    datasets: [
      {
        label: "Total Rentals",
        data: rentedMovies.map((movie) => movie.total_rentals),
        backgroundColor: rentedMovies.map(
          (_, idx) =>
            ["#60A5FA", "#34D399", "#FBBF24", "#F87171", "#A78BFA", "#F472B6"][
              idx % 6
            ]
        ),
      },
    ],
  };

  return (
    <section className="w-full rounded-2xl bg-dashboard p-6">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <h1 className="text-xl text-white font-poppins font-semibold">
          Rented Movies Report
        </h1>
        <Button className="create_movie_btn" asChild>
          <Link href="/admin/movies/new" className="text-dark-1">
            + Create a new Movie
          </Link>
        </Button>
      </div>

      <div className="mt-7 w-full">
        {loading && <p className="text-white">Loading rented movies...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {!loading && !error && rentedMovies.length > 0 && (
          <DashboardChartCard
            title="Rented Movies Over Time"
            chartType="line"
            data={chartData as any} // Type assertion to avoid TypeScript error
            options={{}}
          />
        )}

        {!loading && !error && rentedMovies.length === 0 && (
          <p className="text-gray-500 text-center mt-10">
            No rented movies data available.
          </p>
        )}
      </div>
    </section>
  );
};

export default Page;
