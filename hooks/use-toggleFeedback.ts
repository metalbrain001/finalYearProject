"use client";

import { useTransition } from 'react';
import { FeedbackTypeEnum } from '@/lib/helper/saveFeedback';

interface UseFeedbackToggleOptions {
  user_id: string;
  movie_id: number;
  imdb_id: string;
  currentFeedbackType: FeedbackTypeEnum | null;
}

export const useToggleFeedback = ({
  user_id,
  movie_id,
  imdb_id,
  currentFeedbackType,
}: UseFeedbackToggleOptions) => {
  const [isPending, startTransition] = useTransition();

  const handleToggle = async (newFeedbackType: FeedbackTypeEnum) => {
    startTransition(async () => {
      await fetch('/api/movie/togglelike', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user_id,
          movie_id: movie_id,
          imdb_id: imdb_id,
          currentFeedbackType,
          newFeedbackType,
        }),
      });
    });
  };

  return { handleToggle, isPending };
};
