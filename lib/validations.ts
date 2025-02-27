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