import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { differenceInDays, parseISO } from "date-fns";
import dayjs from "dayjs";

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

export const formattedDate = (date: string): string => {
  if (date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } else {
    return "Unknown";
  }
};


export const daysUntilDue = (dueDate: string) => {
  const diff = differenceInDays(parseISO(dueDate), new Date());
  return diff >= 0 ? `${diff} day(s) left` : `Overdue by ${Math.abs(diff)} day(s)`;
};

export const fetchMovieMetadata = async (tmdbId: string) => {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || "";
  const baseUrl = "https://api.themoviedb.org/3";
  const tmdbResponse = await fetch(`${baseUrl}/movie/${tmdbId}?api_key=${apiKey}&language=en-US`);


  if (!tmdbResponse.ok) {
    throw new Error("Failed to fetch movie metadata from TMDb.");
  }

  return tmdbResponse.json();

}

export const buildRentalPayload = ({
  movieData,
  user_id,
  movie_id,
  tmdbId,
  movie_title,
  poster_url,
}: {
  movieData: any;
  user_id: string;
  movie_id: number;
  tmdbId: number;
  movie_title: string;
  poster_url: string;
}) => {
  const rentedAt = new Date();
  const dueDate = dayjs(rentedAt).add(3, "days").toDate();

  return {
    movie_id,
    user_id,
    tmdbId,
    movie_title,
    poster_url,
    rented_at: rentedAt,
    due_date: dueDate.toISOString(),
    status: "rented",
    genres: movieData.genres?.map((g: any) => g.name).join(", ") || "",
    production_companies: movieData.production_companies?.map((c: any) => c.name).join(", ") || "",
    origin_countries: movieData.origin_country?.join(", ") || "",
    original_language: movieData.original_language || "",
    tagline: movieData.tagline || "",
  };
};

