// app/(dashboard)/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import DashboardChartCard from "@/components/admin/card/DashboardChartCard";
import DashboardStatCard from "@/components/admin/card/StatCards";
import { useGetGenreChart } from "@/hooks/use-getgenrechart";
import { useGetFeedBackChart } from "@/hooks/getfdchart";
import { useGetAllMVChart } from "@/hooks/use-getallmvchart";
import { useGetRentedMoviesChart } from "@/hooks/use-getrentedmvchart";
import { useGetDashboardStats } from "@/hooks/use-getdashboardstat";
import { FilmIcon, StarIcon, User2, UsersIcon } from "lucide-react";

export default function DashboardPage() {
  const { data: dashboardStats, isloading } = useGetDashboardStats();
  const { data: genreData, loading, error } = useGetGenreChart();
  const {
    data: feedbackData,
    loading: feedbackLoading,
    error: feedbackError,
  } = useGetFeedBackChart();
  const {
    data: allMVData,
    loading: allMVLoading,
    error: allMVError,
  } = useGetAllMVChart();
  const {
    data: rentedMVData,
    loading: rentedMVLoading,
    error: rentedMVError,
  } = useGetRentedMoviesChart();

  return (
    <main className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        {isloading ? (
          <p>Loading...</p>
        ) : (
          <>
            {dashboardStats && (
              <>
                <DashboardStatCard
                  icon={<FilmIcon />}
                  label="Total Movies"
                  value={dashboardStats.totalMovies}
                />
                <DashboardStatCard
                  icon={<UsersIcon />}
                  label="Total Users"
                  value={dashboardStats.totalUsers}
                />
                <DashboardStatCard
                  icon={<StarIcon />}
                  label="Total Ratings"
                  value={dashboardStats.topMovie.count}
                  description={`Top Movie: ${dashboardStats.topMovie.title}`}
                />
                <DashboardStatCard
                  icon={<User2 />}
                  label="Total Users"
                  value={dashboardStats.totalRegisteredUsers || 0}
                  description={`Users: ${dashboardStats.totalRegisteredUsers}`}
                />
              </>
            )}
          </>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        {genreData && (
          <DashboardChartCard
            title="Movies by Genre"
            chartType="bar"
            data={genreData}
          />
        )}
        {feedbackData && (
          <DashboardChartCard
            title="Feedback"
            chartType="line"
            data={feedbackData}
          />
        )}
        {allMVData && (
          <DashboardChartCard
            title="All Movies"
            chartType="area"
            data={allMVData}
          />
        )}
        {rentedMVData && (
          <DashboardChartCard
            title="Rented Movies"
            chartType="bar"
            data={rentedMVData}
          />
        )}
      </div>
    </main>
  );
}
