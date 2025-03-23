import { desc, sql } from "drizzle-orm";
import {
  integer,
  varchar,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  pgEnum,
  date,
  numeric,
  doublePrecision,
  boolean,
  bigint,
  unique,
  index, // FIXED: Added numeric type
  vector,
  primaryKey,
} from "drizzle-orm/pg-core";
import { stat } from "fs";
import { release } from "os";

export const ROLE_ENUM = pgEnum("role", ["user", "admin", "superadmin"]);

export const registrations = pgTable("registrations", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(), // Primary key
  fullName: varchar("full_name").notNull(), // Full name column
  username: varchar("username").notNull().unique(), // Unique username
  email: text("email")
    .notNull()
    .unique(), // Unique email
  password: text("password").notNull(), // Password column
  role: ROLE_ENUM("role").default("user"),
  createdAt: timestamp("created_at").notNull().defaultNow(), // Default to now
});

// Define movies table
// Core User Table
export const coreUser = pgTable("core_user", {
  id: serial("id").primaryKey(),
  password: varchar("password", { length: 128 }).notNull(),
  lastLogin: timestamp("last_login", { withTimezone: true }),
  isSuperuser: boolean("is_superuser").default(false),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 100 }),
  isActive: boolean("is_active").default(true),
  isStaff: boolean("is_staff").default(false),
  image: varchar("image", { length: 255 })
});

// Core Movie Table
export const coreMovie = pgTable("core_movie", {
  id: serial("id").primaryKey(),
  movieId: integer("movie_id").notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  genres: varchar("genres", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  imdbId: varchar("imdb_id", { length: 20 }),
  tmdbId: doublePrecision("tmdb_id"),
  userId: integer("user_id").notNull().references(() => coreUser.id, {
    onDelete: "cascade",
    onUpdate: "cascade"
  }),
  description: text("description"),
  posterUrl: varchar("poster_url", { length: 200 }),
  status: varchar("status", { length: 20 }).default("available"),
  embedding: vector("embedding", { dimensions: 1536 }),
});

// Core Ratings Table
export const coreRatings = pgTable("core_ratings", {
  id: bigint("id", { mode: "number" }).primaryKey(),
  rating: numeric("rating", { precision: 2, scale: 1 }).notNull(),
  timestamp: timestamp("timestamp", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  movieId: integer("movie_id").notNull().references(() => coreMovie.movieId, {
    onDelete: "cascade",
    onUpdate: "cascade"
  }),
  userId: bigint("user_id", { mode: "number" }).notNull().references(() => coreUser.id, {
    onDelete: "cascade",
    onUpdate: "cascade"
  })
}, (table) => ({
  uniqueRating: unique().on(table.userId, table.movieId) // Enforces UNIQUE(user_id, movie_id)
}));

// Core Links Table
export const coreLinks = pgTable("core_links", {
  id: bigint("id", { mode: "number" }).primaryKey(),
  imdbId: varchar("imdb_id", { length: 20 }).notNull(),
  tmdbId: doublePrecision("tmdb_id").notNull(),
  movieId: integer("movie_id").notNull().references(() => coreMovie.movieId, {
    onDelete: "cascade",
    onUpdate: "cascade"
  })
});

// Core Tags Table
export const coreTags = pgTable("core_tags", {
  id: bigint("id", { mode: "number" }).primaryKey(),
  tag: varchar("tag", { length: 255 }).notNull(),
  timestamp: timestamp("timestamp", { withTimezone: true }),
  movieId: integer("movie_id").notNull().references(() => coreMovie.movieId, {
    onDelete: "cascade",
    onUpdate: "cascade"
  }),
  userId: bigint("user_id", { mode: "number" }).notNull().references(() => coreUser.id, {
    onDelete: "cascade",
    onUpdate: "cascade"
  })
}, (table) => ({
  uniqueTag: unique().on(table.userId, table.movieId) // Enforces UNIQUE(user_id, movie_id)
}));

// Enum for status tracking
export const movieStatusEnum = pgEnum("movie_status", [
  "pending",
  "approved",
  "rejected",
]);

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

export const movieCast = pgTable("movie_cast", {
  id: serial("id").primaryKey(),
  movie_id: integer("movie_id").notNull().references(() => userUploadedMovies.id, {
    onDelete: "cascade",
    onUpdate: "cascade"
  }),

  cast_name: varchar("cast_name", { length: 255 }).notNull(),
  image: varchar("cast_image_url", { length: 255 }).notNull(),
});

export const watchlist = pgTable("watchlist", {
  id: uuid("id").defaultRandom().primaryKey(), // Unique Watchlist Entry
  user_id: uuid("user_id").notNull().references(() => registrations.id, { onDelete: "cascade" }), // Link to User
  imdb_id: varchar("imdb_id", { length: 20 }).notNull(), // IMDB ID
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const rentedMovies = pgTable("rented_movies", {
  id: uuid("id").defaultRandom().primaryKey(), // Unique Watchlist Entry
  user_id: uuid("user_id").notNull().references(() => registrations.id, { onDelete: "cascade" }),
  movie_id: integer("movie_id").notNull().references(() => coreMovie.movieId, { onDelete: "cascade" }),
  tmdbId: doublePrecision("tmdb_id"),
  imdbId: varchar("imdb_id", { length: 20 }),
  movie_title: varchar("movie_title", { length: 255 }).notNull(),
  poster_url: text("poster_url"),
  genres: text("genres"),
  production_companies: text("production_companies"),
  origin_countries: text("origin_countries"),
  original_language: varchar("original_language", { length: 10 }),
  spoken_languages: text("spoken_languages"),
  tagline: text("tagline"),
  release_date: date("release_date"),
  dueDate: date("due_date").notNull(),
  rentedAt: timestamp("rented_at").defaultNow().notNull(),
  returnedAt: timestamp("returned_at"),
  revenue: integer("revenue"),
  vote_average: doublePrecision("vote_average"),
  vote_count: integer("vote_count"),
  description: text("description"),
  runtime: integer("runtime"),
  status: varchar("status", { length: 20 }).default("rented"),
  embedding: vector("embedding", { dimensions: 1536 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("idx_user").on(table.user_id),  // ✅ Correct
  index("idx_movie").on(table.movie_id),  // ✅ Correct
  index("idx_tmdb").on(table.tmdbId),  // ✅ Correct
  index("idx_imdb").on(table.imdbId),  // ✅ Correct
  index("idx_status").on(table.status),  // ✅ Correct
  index("idx_rented").on(table.rentedAt),  // ✅ Correct
  index("idx_returned").on(table.returnedAt),  // ✅ Correct
]
);

export const preferences = pgTable("preferences", {
  id: uuid("id").defaultRandom().primaryKey(),
  user_id: uuid("user_id").notNull().references(() => registrations.id, { onDelete: "cascade" }),
  genres: text("genres").notNull(),
  actors: text("actors").notNull(),
  languages: text("languages").notNull(),
  directors: text("directors").notNull(),
  content_types: text("content_types").notNull(),
  mood_tags: text("mood_tags").notNull(),
  age_rating: text("age_rating").notNull(),
  preferred_duration: text("preferred_duration").notNull(),
  interest_keywords: text("interest_keywords").notNull(),
  watch_frequency: text("watch_frequency").notNull(),
  embedding: vector("embedding", { dimensions: 1536 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const feedbackTypeEnum = pgEnum('feedback_type', ['like', 'dislike']);

export const movieFeedback = pgTable("movie_feedback", {
  id: uuid("id").defaultRandom().primaryKey(),
  user_id: uuid("user_id").notNull().references(() => registrations.id, { onDelete: "cascade" }),
  movie_id: integer("movie_id").notNull().references(() => coreMovie.movieId, { onDelete: "cascade" }),
  imdb_id: varchar("imdb_id", { length: 20 }),
  feedback_type: feedbackTypeEnum('feedback_type').notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("idx_user").on(table.user_id),
  index("idx_movie").on(table.movie_id),
  index("idx_feedback").on(table.feedback_type),
]);