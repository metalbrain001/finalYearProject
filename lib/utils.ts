import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { drizzledb } from "@/db/drizzle";
import { coreLinks } from "@/db/schema";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string): string =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

export const fetchMovieMetadata = async (tmdbId: string) => {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || "";
  const baseUrl = "https://api.themoviedb.org/3";
  const tmdbResponse = await fetch(`${baseUrl}/movie/${tmdbId}?api_key=${apiKey}&language=en-US`);

  if (!tmdbResponse.ok) {
    throw new Error("Failed to fetch movie metadata from TMDb.");
  }

  return tmdbResponse.json();

}

