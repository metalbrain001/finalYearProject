// This is a custom hook that uses the Response API for the OpenAI chat completion.
import { useState } from "react";
import { ChatMessage } from "@/types";

export const useLLM = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateResponse = async (messages: ChatMessage[]) => {
    setLoading(true);
    try {
      const response = await fetch("/api/users/llm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      });
      const json = await response.json();
      setResponse(json.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, generateResponse };
}
