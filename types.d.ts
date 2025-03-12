interface AuthCredentials {
  fullName: string;
  username: string;
  email: string;
  password: string;
}


interface ToastOptions {
  title: string;
  description: string;
}

export interface Movie {
  id?: number;
  movieId: number;
  title: string;
  genres: string;
  createdAt: Date;
  description?: string | null;
  imdbId: string | null;
  tmdbId?: number | null;
  userId: number;
  posterUrl?: string | null;
}

export interface MovieDetails {
  success: boolean;
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  imdbId: string;
  cast: CastCardProps[];
  videoKey: string;
  videoTitle: string;
}

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface TrailerParams {
  videoKey: string;
  videoTitle: string;
  isOpen: boolean,
  onClose: () => void;
}

interface CastCardProps {
  name: string;
  character: string;
  profile_path: string | null;
}
export type Role = "user" | "admin" | "superadmin";

interface AllUsersParams {
  id: string;
  fullName: string;
  username: string;
  email: string;
  role: Role;
  createdAt: Date;
}

interface MovieParams {
  title: string;
  genres: string;
  movie_year: number;
  director: string;
  movie_plot: string;
  poster_url: string;
  movie_url: string;
  movie_runtime: number;
  actors: string;
  cast: Cast[];
  description: string;
  userId: string;
}

interface AddtoWatchProps {
  id?: string;
  imdb_id: string;
  user_id: string;
  created_at?: string;
}

interface Movies {
  id: number;
  imdbId: string;
  title: string;
  genres: string;
  director: string;
  plot: string;
  actors: string;
  posterUrl: string;
  videoUrl: string;
  vote_average: number;
  description: string;
  release_date: string;
  runtime: number;
  tagline: string;
  production_companies: string;
  cast: Cast[];
}

interface Cast {
  name: string;
  image: string;
}

export type Role = "user" | "admin" | "superadmin";

interface UploadedMovie {
  id: number;
  title: string;
  movie_year: number;
  director: string;
  movie_plot: string;
  genres: string;
  description: string | null;
  userId: string;
  posterUrl: string;
  movie_url: string;
  movieRuntime: number | null;
  actors: string | null;
  status: string | null;
  createdAt: Date;
}

interface Users {
  id: string;
  fullName: string;
  username: string;
  email: string;
  role: Role | null;
  createdAt: Date;
}

interface RentalProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface RentedMovies {
  id?: string;
  user_id: string;
  movie_id: number;
  tmdbId: number;
  movie_title: string;
  poster_url: string | null;
  genres: Genre[];
  origin_countries: string;
  original_language: string;
  tagline: string;
  rentedAt?: Date;
  returnedAt?: Date | null;
  status?: string;
  isAlreadyRented?: boolean;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
}

interface UserRentedMovies {
  id: string;
  user_id: string;
  movie_id: number;
  tmdbId: number;
  movie_title: string;
  poster_url: string;
  rentedAt: Date;
  dueDate: Date;
  returnedAt: Date | null;
  status: string;
  createdAt: Date;
  embedding: number[];

}

interface SaveRentalMovieDetails {
  id?: string;
  user_id: string;
  genres: Genre[];
  movie_id: number;
  tmdbId: number;
  movie_title: string;
  poster_url: string | null;
  rentedAt?: Date;
  dueDate: Date;
  returnedAt?: Date | null;
  origin_countries: string[];
  original_language: string;
  production_companies: ProductionCompany[];
  status?: string;
  tagline: string;
  embedding: number[];
  isAlreadyRented?: boolean;
}


interface RecommendedMovies {
  id: number;
  title: string;
  genres: string;
  description: string;
  poster_url: string | null;
  description?: string;
}

export interface VectorRecommendation extends Record<string, unknown> {
  id: string;
  movie_title: string;
  user_id?: string;
  genres: string;
  poster_url: string | null;
  status: string | null;
  similarity: number;
}

export interface MovieSegment {
  id: number;
  movieId: number;
  movie_id: number;
  title: string;
  genres: string;
  createdAt: Date;
  imdbId: string | null;
  tmdbId: number | null;
  userId: number;
  posterUrl: string;
  status: string | null;
  embedding: number[];
  poster_url: string;
  avg_rating: number;
}

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export const imageKitUrl = "https://ik.imagekit.io/metalbrainimage";
