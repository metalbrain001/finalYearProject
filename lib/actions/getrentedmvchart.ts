// Get Rented movies chart data
"use server";

// lib/actions/getGenreChartData.ts
import { drizzledb } from "@/db/drizzle";
import { rentedMovies } from "@/database/schema";
import { sql } from "drizzle-orm";

export async function getRentedMoviesChartData() {
  const raw = await drizzledb
    .select({ genres: rentedMovies.genres })
    .from(rentedMovies)
    .where(sql`genres IS NOT NULL`);

  const genreCounts: Record<string, number> = {};

  for (const r of raw) {
    const genres = r.genres?.split(",").map(g => g.trim()) || [];
    for (const g of genres) {
      genreCounts[g] = (genreCounts[g] || 0) + 1;
    }
  }

  const labels = Object.keys(genreCounts);
  const counts = Object.values(genreCounts);

  return {
    labels,
    datasets: [
      {
        label: "Rented Genres",
        data: counts,
        backgroundColor: "#facc15", // yellow-400
        borderColor: "#eab308",     // yellow-600
        borderWidth: 2,
      },
    ],
  };

}
