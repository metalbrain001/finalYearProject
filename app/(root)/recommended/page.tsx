// app/(root)/recommended/page.tsx
import React from "react";
import RecommendedList from "@/components/RecommendedList";

const RecommendedPage = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-white mb-4">
        Recommended for You
      </h1>
      <p className="text-lg text-gray-400 mb-8">
        Here are some movies based on your likes or dislikes.
      </p>

      <RecommendedList />
    </section>
  );
};

export default RecommendedPage;
