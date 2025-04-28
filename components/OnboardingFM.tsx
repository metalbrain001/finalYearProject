"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { onboardingSchema } from "@/lib/validations";
import { getSession } from "next-auth/react";
import { savePreferences } from "@/lib/actions/savePreferences";
import { useOnboardingForm } from "@/hooks/use-userOnboarding";
import {
  genreOptions,
  languageOptions,
  placeholder,
  mood_tagOptions,
  ageRatingOptions,
} from "@/constants";
import { cn } from "@/lib/utils";

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
      genres: [],
      mood_tags: [],
      age_rating: "",
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
      mood_tags: data?.mood_tags?.join(",") || "",
      age_rating: data.age_rating || "",
      genres: data?.genres?.join(",") || "",
      languages: data.languages.join(","),
      embedding,
    });
    if (result.success) {
      toast(`Success ${type === "create" ? "creating" : "updating"}`, {
        description: result.success,
      });
      router.push("/"); // Redirect to homepage
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
      <div className="mb-4">
        <h2 className="font-semibold font-poppins text-lg">Select Mood Tags</h2>
        <div className="flex flex-wrap gap-2 font-poppins font-bold mt-2">
          {mood_tagOptions.map((mood) => (
            <Button
              key={mood}
              className="movie-button_dark_5"
              variant={
                form.watch("mood_tags")?.includes(mood) ? "default" : "outline"
              }
              onClick={(e) => {
                e.preventDefault();
                const currentMood = form.getValues("mood_tags") || [];
                const updated = currentMood.includes(mood)
                  ? currentMood.filter((m) => m !== mood)
                  : [...currentMood, mood];

                form.setValue("mood_tags", updated);
              }}
            >
              {mood}
            </Button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold font-poppins text-lg">
          Select Age Rating
        </h2>
        <div className="flex flex-wrap gap-2 font-poppins font-bold mt-2">
          {ageRatingOptions.map((age) => {
            const currentAge = form.watch("age_rating");
            const selected = currentAge === age;

            return (
              <Button
                key={age}
                className={cn(
                  "movie-button_dark_5 transition-all duration-150",
                  selected ? "scale-105 ring-2 ring-primary" : ""
                )}
                variant={selected ? "default" : "outline"}
                onClick={(e) => {
                  e.preventDefault();
                  form.setValue("age_rating", age); // ✅ Set single value
                }}
              >
                {age}
              </Button>
            );
          })}
        </div>
      </div>
      <Button
        type="submit"
        className="movie-button_dark_5 text-white"
        onClick={form.handleSubmit(onSubmit)}
      >
        {type === "create" ? "Add Preference" : "Update Preference"}
      </Button>
    </div>
  );
};

export default OnboardForm;
