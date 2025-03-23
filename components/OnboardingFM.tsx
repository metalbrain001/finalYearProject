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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { onboardingSchema } from "@/lib/validations";
import { getSession } from "next-auth/react";
import { savePreferences } from "@/lib/actions/savePreferences";
import { useOnboardingForm } from "@/hooks/use-userOnboarding";
import { genreOptions, languageOptions, placeholder } from "@/constants";

interface Props {
  type: "create" | "update";
}

const OnboardForm = ({ type }: Props) => {
  const router = useRouter();
  const { data, toggleItem, updateField, submitPreferences, loading, success } =
    useOnboardingForm();
  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      actors: "",
      directors: "",
      content_types: "",
      mood_tags: "",
      age_rating: "",
      preferred_duration: "",
      interest_keywords: "",
      watch_frequency: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof onboardingSchema>) => {
    const session = await getSession();
    const userId = session?.user?.id;

    const embedding = new Array(1536).fill(0.01);
    if (session?.user?.id) {
      await submitPreferences(session.user.id, embedding);
      router.push("/"); // Redirect to homepage
    }

    if (!userId) {
      toast(`Error ${type === "create" ? "creating" : "updating"}`, {
        description: "User not authenticated.",
      });
      return;
    }
    const result = await savePreferences({
      user_id: userId,
      actors: data.actors || "",
      directors: data.directors || "",
      content_types: data.content_types || "",
      mood_tags: data.mood_tags || "",
      age_rating: data.age_rating || "",
      preferred_duration: data.preferred_duration || "",
      interest_keywords: data.interest_keywords || "",
      watch_frequency: data.watch_frequency || "",
      genres: data?.genres?.join(",") || "",
      languages: data.languages.join(","),
      embedding,
    });
    if (result.success) {
      toast(`Success ${type === "create" ? "creating" : "updating"}`, {
        description: result.success,
      });
      router.push(`/`);
    } else {
      toast(`Error ${type === "create" ? "creating" : "updating"}`, {
        description: result.success,
      });
    }
  };

  return (
    <div className="mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Tell us your movie preferences
      </h1>

      <div className="mb-4">
        <h2 className="font-semibold font-poppins text-lg">Select Genres</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {genreOptions.map((genre) => (
            <Button
              key={genre}
              className="movie-button_dark_5"
              variant={
                form.watch("genres")?.includes(genre) ? "default" : "outline"
              }
              onClick={(e) => {
                e.preventDefault();
                const currentGenres = form.getValues("genres") || [];
                const updated = currentGenres.includes(genre)
                  ? currentGenres.filter((g) => g !== genre)
                  : [...currentGenres, genre];

                form.setValue("genres", updated);
              }}
            >
              {genre}
            </Button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold font-poppins">Select Languages</h2>
        <div className="flex flex-wrap gap-2 font-poppins font-bold mt-2">
          {languageOptions.map((lang) => (
            <Button
              key={lang}
              className="movie-button_dark_5"
              variant={
                form.watch("languages")?.includes(lang) ? "default" : "outline"
              }
              onClick={(e) => {
                e.preventDefault();
                const currentLanguage = form.getValues("languages") || [];
                const updated = currentLanguage.includes(lang)
                  ? currentLanguage.filter((g) => g !== lang)
                  : [...currentLanguage, lang];

                form.setValue("languages", updated);
              }}
            >
              {lang}
            </Button>
          ))}
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name={"actors"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-light-1 font-semibold font-poppinsn text-lg">
                  Favorite Actors
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder="Enter favorite actors (e.g. Tom Cruise)"
                    autoComplete="on"
                    {...field}
                    className="movie-textarea"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"directors"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-light-1 font-semibold font-poppinsn text-lg">
                  Favorite Directors
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    type="text"
                    placeholder="Enter favorite directors( e.g. Christopher Nolan)"
                    autoComplete="on"
                    {...field}
                    className="movie-textarea"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"content_types"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-light-1 font-semibold font-poppinsn text-lg">
                  Content Type
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="TV Show, Movie, etc."
                    autoComplete="on"
                    {...field}
                    className="movie-textarea"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"mood_tags"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-light-1 font-semibold font-poppinsn text-lg">
                  Mood Tags
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    type="text"
                    placeholder="Enter mood tags (e.g. Happy, Sad)"
                    autoComplete="on"
                    {...field}
                    className="movie-textarea"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"age_rating"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-light-1 font-semibold font-poppinsn text-lg">
                  Age Rating
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    type="text"
                    placeholder="Enter age rating (e.g. PG-13)"
                    autoComplete="on"
                    {...field}
                    className="movie-textarea"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"preferred_duration"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-light-1 font-semibold font-poppinsn text-lg">
                  Prefered Duration
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter movie runtime (e.g. 120)"
                    autoComplete="on"
                    {...field}
                    className="movie-textarea"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"interest_keywords"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-light-1 font-semibold font-poppinsn text-lg">
                  Favorite Movie Keywords
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter movie keywords (e.g. Action, Comedy)"
                    autoComplete="on"
                    {...field}
                    className="movie-textarea"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"watch_frequency"}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-light-1 font-semibold font-poppinsn text-lg">
                  Watch Frequency
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter watch frequency (e.g. daily or weekly)"
                    autoComplete="on"
                    {...field}
                    className="movie-textarea"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="movie-form_btn text-white">
            {type === "create" ? "Add Preference" : "Update Preference"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default OnboardForm;
