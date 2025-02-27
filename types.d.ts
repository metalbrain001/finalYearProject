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

export const userUploadedMovies = pgTable(
  "user_uploaded_movies",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    movie_year: integer("movie_year").notNull(),
    director: varchar("director", { length: 255 }).notNull(),
    movie_plot: text("movie_plot").notNull(),
    genres: varchar("genres", { length: 255 }).notNull(),
    description: text("description"),
    userId: uuid("user_id")
      .notNull()
      .references(() => registrations.id, { onDelete: "cascade" }),
    posterUrl: varchar("poster_url", { length: 255 }).notNull(),
    movie_url: varchar("movie_url", { length: 255 }).notNull(),
    movieRuntime: integer("movie_runtime"),
    actors: varchar("actors", { length: 255 }).notNull(),
    status: movieStatusEnum("status").default("pending"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("idx_user").on(table.userId),  // ✅ Correct
    index("idx_title").on(table.title),  // ✅ Correct
  ]
);

// export interface MovieDetails {
//   success: boolean;
//   data: {
//     adult: boolean;
//     backdrop_path: string;
//     belongs_to_collection?: {
//       id: number;
//       name: string;
//       poster_path: string;
//       backdrop_path: string;
//     };
//     budget: number;
//     genres: Genre[];
//     homepage: string;
//     id: number;
//     imdb_id: string;
//     origin_country: string[];
//     original_language: string;
//     original_title: string;
//     overview: string;
//     popularity: number;
//     poster_path: string;
//     production_companies: ProductionCompany[];
//     production_countries: ProductionCountry[];
//     release_date: string;
//     revenue: number;
//     runtime: number;
//     spoken_languages: SpokenLanguage[];
//     status: string;
//     tagline: string;
//     title: string;
//     video: boolean;
//     vote_average: number;
//     vote_count: number;
//     imdbId: string;
//   };
// }

// interface Genre {
//   id: number;
//   name: string;
// }

// interface ProductionCompany {
//   id: number;
//   logo_path: string | null;
//   name: string;
//   origin_country: string;
// }

// interface ProductionCountry {
//   iso_3166_1: string;
//   name: string;
// }

// interface SpokenLanguage {
//   english_name: string;
//   iso_639_1: string;
//   name: string;
// }
