// components/OnboardingForm.tsx
"use client";

import { useOnboardingForm } from "@/hooks/use-userOnboarding";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const genreOptions = [
  "Action",
  "Drama",
  "Comedy",
  "Horror",
  "Thriller",
  "Sci-Fi",
];
const languageOptions = ["English", "Spanish", "French", "Hindi", "Korean"];

export default function OnboardingForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const { data, toggleItem, updateField, submitPreferences, loading, success } =
    useOnboardingForm();

  const handleSubmit = async () => {
    // Mocked embedding – you can replace this with real embedding logic
    const embedding = new Array(1536).fill(0.01);
    if (session?.user?.id) {
      await submitPreferences(session.user.id, embedding);
      router.push("/"); // Redirect to homepage
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Tell us your movie preferences
      </h1>

      <div className="mb-4">
        <h2 className="font-semibold">Select Genres</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {genreOptions.map((genre) => (
            <button
              key={genre}
              onClick={() => toggleItem("genres", genre)}
              className={`border-gray-500 px-3 py-1 rounded-full ${
                data.genres.includes(genre)
                  ? "bg-black text-white"
                  : "bg-gray-900"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold">Select Languages</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {languageOptions.map((lang) => (
            <button
              key={lang}
              onClick={() => toggleItem("languages", lang)}
              className={`border-gray-500 px-3 py-1 rounded-full ${
                data.languages.includes(lang)
                  ? "bg-black text-white"
                  : "bg-gray-900"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label id="director" className="block mb-1 font-semibold font-poppins">
          Favorite Directors
          <input
            id="director"
            type="text"
            placeholder="Christopher Nolan, Quentin Tarantino"
            className="movie-textarea"
            value={data.directors.join(", ")}
            onChange={(e) =>
              updateField("directors", e.target.value.split(","))
            }
          />
        </label>
      </div>

      {/* Add more input fields for mood_tags, content_types, age_rating, etc */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">
          Preferred Mood
          <input
            id="mood_tags"
            type="text"
            placeholder="Happy, Sad, Thrilling"
            className="movie-textarea"
            value={data.mood_tags}
            onChange={(e) => updateField("mood_tags", e.target.value)}
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">
          Preferred Content Types
          <input
            id="content_types"
            type="text"
            placeholder="Movies, TV Shows, Documentaries"
            className="movie-textarea"
            value={data.content_types}
            onChange={(e) => updateField("content_types", e.target.value)}
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">
          Preferred Age Rating
          <input
            id="age_rating"
            type="text"
            placeholder="G, PG, PG-13, R"
            className="movie-textarea"
            value={data.age_rating}
            onChange={(e) => updateField("age_rating", e.target.value)}
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">
          Preferred Movie duration
          <input
            id="preferred_duration"
            type="text"
            placeholder="90 mins, 2 hours"
            className="movie-textarea"
            value={data.preferred_duration}
            onChange={(e) => updateField("preferred_duration", e.target.value)}
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">
          Preferred interest_keywords
          <input
            id="interest_keywords"
            type="text"
            placeholder="Comedy, Action, Drama"
            className="movie-textarea"
            value={data.interest_keywords}
            onChange={(e) => updateField("interest_keywords", e.target.value)}
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">
          Preferred watch_frequency
          <input
            id="watch_frequency"
            type="text"
            placeholder="Daily, Weekly, Monthly"
            className="movie-textarea"
            value={data.watch_frequency}
            onChange={(e) => updateField("watch_frequency", e.target.value)}
          />
        </label>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded mt-4"
      >
        {loading ? "Saving..." : "Save Preferences"}
      </button>

      {success && (
        <p className="text-green-600 mt-4">Preferences saved successfully!</p>
      )}
    </div>
  );
}
