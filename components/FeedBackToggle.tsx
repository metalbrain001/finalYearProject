import { useToggleFeedback } from "@/hooks/use-toggleFeedback";
import { FeedbackTypeEnum } from "@/constants";
import Icons from "./UseIcons";
import { cn } from "@/lib/utils";

interface FeedbackToggleProps {
  user_id: string;
  movie_id: number;
  imdb_id: string;
  currentFeedbackType: FeedbackTypeEnum | null;
}

export const FeedbackToggle = ({
  user_id,
  movie_id,
  imdb_id,
  currentFeedbackType,
}: FeedbackToggleProps) => {
  const { handleToggle, isPending } = useToggleFeedback({
    user_id,
    movie_id,
    imdb_id,
    currentFeedbackType,
  });
  const { ThumbsUp, ThumbsDown } = Icons();

  return (
    <div className="flex mt-7 gap-4">
      <button
        onClick={() => handleToggle(FeedbackTypeEnum.Like)}
        disabled={isPending}
        className={cn(
          "p-2 rounded-xl border hover:bg-gray-100 transition",
          currentFeedbackType === FeedbackTypeEnum.Like && "bg-green-100"
        )}
      >
        <ThumbsUp size={22} color="green" />
      </button>
      <button
        onClick={() => handleToggle(FeedbackTypeEnum.Dislike)}
        disabled={isPending}
        className={cn(
          "p-2 rounded-xl border hover:bg-gray-100 transition",
          currentFeedbackType === FeedbackTypeEnum.Dislike && "bg-red-100"
        )}
      >
        <ThumbsDown size={22} color="red" />
      </button>
    </div>
  );
};
