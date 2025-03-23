// hooks/useOnboardingForm.ts
"use client";

import { useState } from "react";
import { OnboardingData } from "@/types";



export const useOnboardingForm = () => {
  const [data, setData] = useState<OnboardingData>({
    genres: [],
    actors: [],
    directors: [],
    languages: [],
    content_types: "",
    mood_tags: "",
    age_rating: "",
    preferred_duration: "",
    interest_keywords: "",
    watch_frequency: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const toggleItem = (field: keyof Pick<OnboardingData, 'genres' | 'actors' | 'directors' | 'languages'>, item: string) => {
    setData((prev) => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter((i) => i !== item)
        : [...prev[field], item],
    }));
  };

  const updateField = <K extends keyof OnboardingData>(field: K, value: OnboardingData[K]) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const submitPreferences = async (user_id: string, embedding: number[]) => {
    setLoading(true);
    try {
      const response = await fetch("/api/users/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          user_id,
          genres: data.genres.join(","),
          actors: data.actors.join(","),
          directors: data.directors.join(","),
          languages: data.languages.join(","),
          embedding,
        }),
      });

      if (!response.ok) throw new Error("Failed to save preferences");
      setSuccess(true);
    } catch (err) {
      console.error("Error submitting onboarding:", err);
    } finally {
      setLoading(false);
    }
  };

  return { data, toggleItem, updateField, submitPreferences, loading, success };
};
