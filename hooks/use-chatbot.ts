import { useState } from "react";

interface ChatBotResponse {
  message?: string;
  response?: string; // ✅ Ensure response can be a string
  movies?: { movie_id: number; title: string; poster_url: string }[]; // ✅ Ensure correct type
  text?: string;
  genres?: string;
}

export const useChatbot = () => {
  const [response, setResponse] = useState<ChatBotResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (message: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/movie/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        throw new Error("Failed to get a response from chatbot.");
      }

      const data: ChatBotResponse = await res.json();

      // ✅ Store the ENTIRE response object
      setResponse(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, sendMessage };
};
