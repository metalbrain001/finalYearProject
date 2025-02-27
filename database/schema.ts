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
  boolean,
  doublePrecision,
  bigint,
  numeric,
  unique,
} from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// PostgreSQL connection setup
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

export const STATUS_ENUM = pgEnum("status", ["active", "inactive", "banned"]);
export const ROLE_ENUM = pgEnum("role", ["user", "admin", "superadmin"]);
export const GENRE_ENUM = pgEnum("genre", ["Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "Film-Noir", "History", "Horror", "Music", "Musical", "Mystery", "Romance", "Sci-Fi", "Sport", "Thriller", "War", "Western"]);

// Define the Registrations table schema
export const registrations = pgTable("registrations", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(), // Primary key
  fullName: varchar("full_name").notNull(), // Full name column
  username: varchar("username").notNull().unique(), // Unique username
  email: text("email")
    .notNull()
    .unique(), // Unique email
  password: text("password").notNull(), // Password column
  createdAt: timestamp("created_at").notNull().defaultNow(), // Default to now
});

// Infer types for inserting and selecting rows
export type InsertRegistration = typeof registrations.$inferInsert;
export type SelectRegistration = typeof registrations.$inferSelect;

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

export type InsertCoreUser = typeof coreUser.$inferInsert;
export type SelectCoreUser = typeof coreUser.$inferSelect;

// Core Movie Table
export const coreMovie = pgTable("core_movie", {
  id: serial("id").primaryKey(),
  movieId: integer("movie_id").notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  genres: varchar("genres", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  description: text("description"),
  imdbId: integer("imdb_id"),
  tmdbId: doublePrecision("tmdb_id"),
  userId: integer("user_id").notNull().references(() => coreUser.id, {
    onDelete: "cascade",
    onUpdate: "cascade"
  }),
  posterUrl: varchar("poster_url", { length: 200 })
});

export type InsertCoreMovie = typeof coreMovie.$inferInsert;
export type SelectCoreMovie = typeof coreMovie.$inferSelect;

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

export type InsertCoreRatings = typeof coreRatings.$inferInsert;
export type SelectCoreRatings = typeof coreRatings.$inferSelect;

// Core Links Table
export const coreLinks = pgTable("core_links", {
  id: bigint("id", { mode: "number" }).primaryKey(),
  imdbId: integer("imdb_id").notNull(),
  tmdbId: doublePrecision("tmdb_id").notNull(),
  movieId: integer("movie_id").notNull().references(() => coreMovie.movieId, {
    onDelete: "cascade",
    onUpdate: "cascade"
  })
});

export type InsertCoreLinks = typeof coreLinks.$inferInsert;
export type SelectCoreLinks = typeof coreLinks.$inferSelect;

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

export type InsertCoreTags = typeof coreTags.$inferInsert;
export type SelectCoreTags = typeof coreTags.$inferSelect;

