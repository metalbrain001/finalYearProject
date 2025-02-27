"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { movieSchema } from "@/lib/validations";
import ImageUpload from "@/components/ImageUploader";
import ColorPicker from "../ColorPicker";
import { createMovie } from "@/lib/admin/actions/movie";
import { getSession } from "next-auth/react";
import { Movies } from "@/types";

interface Props extends Partial<Movies> {
  type: "create" | "update";
}

const MovieForm = ({ type, ...movies }: Props) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof movieSchema>>({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      Title: "",
      Genre: "",
      Year: new Date().getFullYear(),
      Director: "",
      Plot: "",
      Poster_Path: "",
      Video_Path: "",
      Runtime: 1,
      Actors: "",
      Cast: [],
      Description: "",
      PosterColor: "",
    },
  });

  const { control, setValue } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "Cast",
  });

  const onSubmit = async (data: z.infer<typeof movieSchema>) => {
    const session = await getSession(); // ✅ Get user session
    const userId = session?.user?.id; // ✅ Get UUID from session

    if (!userId) {
      toast(`Error ${type === "create" ? "creating" : "updating"} movie`, {
        description: "User not authenticated.",
      });
      return;
    }
    const result = await createMovie({
      title: data.Title,
      genres: data.Genre,
      movie_year: data.Year,
      director: data.Director,
      movie_plot: data.Plot,
      poster_url: data.Poster_Path,
      movie_url: data.Video_Path,
      movie_runtime: data.Runtime,
      actors: data.Actors,
      cast: data.Cast,
      description: data.Description,
      userId: userId,
    });
    if (result.success) {
      toast(`Success ${type === "create" ? "creating" : "updating"} movie`, {
        description: result.message,
      });
      router.push(`/admin/movies/${result.data.id}`);
    } else {
      toast(`Error ${type === "create" ? "creating" : "updating"} movie`, {
        description: result.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name={"Title"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-4">
                Movie Title
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Enter movie title"
                  autoComplete="on"
                  {...field}
                  className="movie-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"Genre"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-4">
                Genre
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Enter movie genre (e.g. Action, Comedy)"
                  autoComplete="on"
                  {...field}
                  className="movie-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"Year"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-4">
                Movie Year
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1900}
                  max={new Date().getFullYear()}
                  placeholder="Enter movie year, (e.g, 2022)"
                  autoComplete="on"
                  {...field}
                  className="movie-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"Director"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-4">
                Director
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Enter director name"
                  autoComplete="on"
                  {...field}
                  className="movie-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"Plot"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-4">
                Movie Plot
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Enter movie plot"
                  autoComplete="on"
                  {...field}
                  className="movie-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"Poster_Path"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel
                className="text-base font-normal text-dark-4"
                id="poster_path"
              >
                Movie Poster
              </FormLabel>
              <FormControl>
                <ImageUpload
                  onFileChange={field.onChange}
                  type="image"
                  accept="image/*"
                  placeholder="Upload movie poster"
                  folder="movie/posters"
                  variant="light"
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"Video_Path"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel
                className="text-base font-normal text-dark-4"
                htmlFor="video_path"
              >
                Movie Trailer
              </FormLabel>
              <FormControl>
                <ImageUpload
                  onFileChange={field.onChange}
                  type="video"
                  accept="video/*"
                  placeholder="Upload movie trailer"
                  folder="movie/trailers"
                  variant="light"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"PosterColor"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel
                className="text-base font-normal text-dark-4"
                htmlFor="poster_color"
              >
                Primary Color
              </FormLabel>
              <FormControl>
                <ColorPicker
                  value={field.value}
                  onPickerChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"Runtime"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-4">
                Movie Runtime
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter movie runtime (e.g. 120)"
                  autoComplete="on"
                  {...field}
                  className="movie-form_input"
                  name="quantity"
                  min="1"
                  max="300"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"Actors"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-4">
                Actors
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Enter movie Actors (e.g. John Doe, Jane Doe)"
                  autoComplete="on"
                  {...field}
                  className="movie-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Cast Field */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Cast Members</h3>

          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-center">
              {/* Name Input */}
              <FormField
                control={control}
                name={`Cast.${index}.name`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-base font-poppins font-normal text-dark-3">
                      Cast Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter cast name"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Image Upload */}
              <FormField
                control={control}
                name={`Cast.${index}.image`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-base font-poppins font-normal text-dark-500">
                      Cast Image
                    </FormLabel>
                    <FormControl>
                      <ImageUpload
                        onFileChange={(imageUrl) =>
                          setValue(`Cast.${index}.image`, imageUrl)
                        }
                        type="image"
                        accept="image/*"
                        folder="movie/cast"
                        variant="light"
                        value={field.value}
                        placeholder="Upload cast image"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Remove Cast Button */}
              <Button
                type="button"
                className="bg-red text-white"
                onClick={() => remove(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          {/* Add Cast Member Button */}
          <Button
            type="button"
            className="bg-blue-500 text-white"
            onClick={() => append({ name: "", image: "" })}
          >
            + Add Cast Member
          </Button>
        </div>

        <FormField
          control={form.control}
          name={"Description"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-4">
                Movie Description
              </FormLabel>
              <FormControl>
                <Textarea
                  required
                  placeholder="Enter movie description"
                  autoComplete="on"
                  {...field}
                  rows={10}
                  className="movie-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="movie-form_btn text-white">
          {type === "create" ? "Create Movie" : "Update Movie"}
        </Button>
      </form>
    </Form>
  );
};

export default MovieForm;
