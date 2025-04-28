"use server";

// lib/actions/getGenreChartData.ts
import { drizzledb } from "@/db/drizzle";
import { coreMovie } from "@/database/schema";
import { sql } from "drizzle-orm";

export async function getGenreChartData() {
  const raw = await drizzledb
    .select({
      genre: coreMovie.genres,
      count: sql<number>`count(*)`,
    })
    .from(coreMovie)
    .groupBy(coreMovie.genres);

  const labels = raw.map((r: any) => r.genre);
  const counts = raw.map((r: any) => Number(r.count));

  return {
    labels,
    datasets: [
      {
        label: "Movies",
        data: counts,
        backgroundColor: "#38bdf8", // tailwind sky-400
        borderColor: "#0284c7",     // tailwind sky-600
        borderWidth: 2,
      },
    ],
  };
}
