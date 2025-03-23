import { z } from "zod";

export const signupSchema = z.object({
  fullName: z.string().min(3),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const searchSchema = z.object({
  query: z.string().min(3),
});

export const movieSchema = z.object({
  Title: z.string().trim().min(2).max(100),
  Genre: z.string().trim().min(2).max(50),
  Year: z.coerce.number().min(1900).max(new Date().getFullYear()),
  Director: z.string().trim().min(3).max(50),
  Plot: z.string().trim().min(3).max(500),
  Poster_Path: z.string().trim().nonempty(),
  Video_Path: z.string().trim().nonempty(),
  Runtime: z.coerce.number().min(1).max(300),
  Actors: z.string().trim().min(3).max(100),
  Cast: z.array(z.object({
    name: z.string().trim().min(3).max(50),
    image: z.string().trim().nonempty(),
  })),
  Description: z.string().trim().min(3).max(500),
  PosterColor: z.string().nonempty(),
});

export const castSchema = z.object({
  name: z.string().trim().min(3).max(50),
  character: z.string().trim().min(3).max(50),
  profile_path: z.string().trim().nonempty(),
});

export const myAccountSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  password: z.string().min(6).optional(),
  role: z.string().min(3).optional(),
});

export const onboardingSchema = z.object({
  genres: z.array(z.string()).min(1, "Select at least one genre"),
  languages: z.array(z.string()).min(1, "Select at least one language"),
  actors: z.string().optional(),
  directors: z.string().optional(),
  content_types: z.string().optional(),
  mood_tags: z.string().optional(),
  age_rating: z.string().optional(),
  preferred_duration: z.string().optional(),
  interest_keywords: z.string().optional(),
  watch_frequency: z.string().optional(),
});