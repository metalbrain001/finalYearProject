CREATE TYPE "public"."genre" AS ENUM('Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'Film-Noir', 'History', 'Horror', 'Music', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Sport', 'Thriller', 'War', 'Western');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('active', 'inactive', 'banned');--> statement-breakpoint
CREATE TYPE "public"."feedback_type" AS ENUM('like', 'dislike');--> statement-breakpoint
CREATE TYPE "public"."movie_status" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
CREATE EXTENSION IF NOT EXISTS vector;

--> statement-breakpoint
CREATE TABLE "fcmtokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "movie_cast" (
	"id" serial PRIMARY KEY NOT NULL,
	"movie_id" integer NOT NULL,
	"cast_name" varchar(255) NOT NULL,
	"cast_image_url" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "movie_feedback" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"movie_id" integer NOT NULL,
	"imdb_id" varchar(20),
	"feedback_type" "feedback_type" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"content" text NOT NULL,
	"read" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "pref" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"genres" text NOT NULL,
	"languages" text NOT NULL,
	"mood_tags" text NOT NULL,
	"age_rating" text NOT NULL,
	"embedding" vector(1536),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "registrations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar NOT NULL,
	"username" varchar NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "registrations_id_unique" UNIQUE("id"),
	CONSTRAINT "registrations_username_unique" UNIQUE("username"),
	CONSTRAINT "registrations_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "rented_movies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"movie_id" integer NOT NULL,
	"tmdb_id" double precision,
	"imdb_id" varchar(20),
	"movie_title" varchar(255) NOT NULL,
	"poster_url" text,
	"genres" text,
	"production_companies" text,
	"origin_countries" text,
	"original_language" varchar(10),
	"spoken_languages" text,
	"tagline" text,
	"release_date" date,
	"due_date" date NOT NULL,
	"rented_at" timestamp DEFAULT now() NOT NULL,
	"returned_at" timestamp,
	"revenue" integer,
	"vote_average" double precision,
	"vote_count" integer,
	"description" text,
	"runtime" integer,
	"status" varchar(20) DEFAULT 'rented',
	"embedding" vector(1536),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_uploaded_movies" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"movie_year" integer NOT NULL,
	"director" varchar(255) NOT NULL,
	"movie_plot" text NOT NULL,
	"genres" varchar(255) NOT NULL,
	"description" text,
	"user_id" uuid NOT NULL,
	"poster_url" varchar(255) NOT NULL,
	"movie_url" varchar(255) NOT NULL,
	"movie_runtime" integer,
	"actors" varchar(255) NOT NULL,
	"status" "movie_status" DEFAULT 'pending',
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "watchlist" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"imdb_id" varchar(20) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "core_links" ADD CONSTRAINT "core_links_movie_id_core_movie_movie_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."core_movie"("movie_id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "core_movie" ADD CONSTRAINT "core_movie_user_id_core_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."core_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "core_ratings" ADD CONSTRAINT "core_ratings_movie_id_core_movie_movie_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."core_movie"("movie_id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "core_ratings" ADD CONSTRAINT "core_ratings_user_id_core_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."core_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "core_tags" ADD CONSTRAINT "core_tags_movie_id_core_movie_movie_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."core_movie"("movie_id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "core_tags" ADD CONSTRAINT "core_tags_user_id_core_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."core_user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "fcmtokens" ADD CONSTRAINT "fcmtokens_user_id_registrations_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."registrations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "movie_cast" ADD CONSTRAINT "movie_cast_movie_id_user_uploaded_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."user_uploaded_movies"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "movie_feedback" ADD CONSTRAINT "movie_feedback_user_id_registrations_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."registrations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "movie_feedback" ADD CONSTRAINT "movie_feedback_movie_id_core_movie_movie_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."core_movie"("movie_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_registrations_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."registrations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pref" ADD CONSTRAINT "pref_user_id_registrations_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."registrations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rented_movies" ADD CONSTRAINT "rented_movies_user_id_registrations_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."registrations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rented_movies" ADD CONSTRAINT "rented_movies_movie_id_core_movie_movie_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."core_movie"("movie_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_uploaded_movies" ADD CONSTRAINT "user_uploaded_movies_user_id_registrations_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."registrations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "watchlist" ADD CONSTRAINT "watchlist_user_id_registrations_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."registrations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "fcmtokens_user_id_idx" ON "fcmtokens" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "movie_feedback_user_id_idx" ON "movie_feedback" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "movie_feedback_movie_id_idx" ON "movie_feedback" USING btree ("movie_id");--> statement-breakpoint
CREATE INDEX "movie_feedback_type_idx" ON "movie_feedback" USING btree ("feedback_type");--> statement-breakpoint
CREATE INDEX "notifications_user_id_idx" ON "notifications" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "pref_user_id_idx" ON "pref" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "rented_movies_user_id_idx" ON "rented_movies" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "rented_movies_movie_id_idx" ON "rented_movies" USING btree ("movie_id");--> statement-breakpoint
CREATE INDEX "rented_movies_tmdb_id_idx" ON "rented_movies" USING btree ("tmdb_id");--> statement-breakpoint
CREATE INDEX "rented_movies_imdb_id_idx" ON "rented_movies" USING btree ("imdb_id");--> statement-breakpoint
CREATE INDEX "rented_movies_status_idx" ON "rented_movies" USING btree ("status");--> statement-breakpoint
CREATE INDEX "rented_movies_rented_at_idx" ON "rented_movies" USING btree ("rented_at");--> statement-breakpoint
CREATE INDEX "rented_movies_returned_at_idx" ON "rented_movies" USING btree ("returned_at");--> statement-breakpoint
CREATE INDEX "user_uploaded_movies_user_id_idx" ON "user_uploaded_movies" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_uploaded_movies_title_idx" ON "user_uploaded_movies" USING btree ("title");