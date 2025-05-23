import OpenAI from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";

/**
 * OpenAI Client Class for handling API requests.
 */
export class OpenAIClient {
  private client: OpenAI;
  private model: string;

  constructor(model: string = "gpt-4o") {
    if (!OPENAI_API_KEY) {
      throw new Error("❌ OpenAI API key must be set in environment variables.");
    }
    this.client = new OpenAI({ apiKey: OPENAI_API_KEY });
    this.model = model;
  }

  /**
   * Generates a chat completion from OpenAI API.
   */
  async chatCompletion(
    messages: { role: string; content: string }[], // ✅ Corrected Type
    maxTokens = 100,
    temperature = 0.7
  ): Promise<string> {
    try {
      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [{
          role: "system",
          content: "You are a movie chatbot. Extract the requested movie genres and number of movies. Always respond in JSON format with keys 'genres' and 'count'. Example response: {\"genres\": \"action\", \"count\": 5}."

        }, {
          role: "user",
          content: messages[1].content // ✅ User message
        }],
        max_tokens: maxTokens,
        temperature,
      });

      return response.choices[0].message?.content?.trim() || "I'm sorry, I couldn't process your request.";
    } catch (error) {
      console.error("❌ OpenAI Chat API Error:", error);
      return "I'm sorry, I couldn't process your request.";
    }
  }

  /**
   * Extract movie genres and count from user message using OpenAI.
   */
  async extractMovieQuery(userMessage: string): Promise<{ genres: string; count: number }> {
    const messages = [
      { role: "system", content: "You are a movie chatbot. Extract the requested movie genres and number of movies." },
      { role: "user", content: userMessage },
    ];

    console.log("📤 Sending to OpenAI:", messages);

    try {
      const extractedText = await this.chatCompletion(messages); // ✅ Fixed call
      console.log("📥 OpenAI Raw Response:", extractedText);

      // ✅ Ensure the response is valid JSON
      try {
        const parsedResponse = JSON.parse(extractedText.replace(/```json|```/g, "").trim());
        return {
          genres: parsedResponse.genres || "any",
          count: parsedResponse.count || 10,
        };
      } catch (error) {
        console.error("❌ JSON Parsing Error:", error);
        return { genres: "any", count: 10 };
      }
    } catch (error) {
      console.error("❌ Error extracting movie query:", error);
      return { genres: "any", count: 10 };
    }
  }

  // Embedding the chat completion function in the OpenAIClient class
  /**
   * Generate an embedding vector from a given text using OpenAI embeddings API.
   */
  async generateEmbedding(text: string, embeddingModel: string = "text-embedding-ada-002"): Promise<number[]> {
    try {
      const response = await this.client.embeddings.create({
        model: embeddingModel,
        input: text.replace(/\n/g, " "),
      });
      return response.data[0].embedding;
    } catch (error) {
      console.error("❌ OpenAI Embedding API Error:", error);
      throw new Error("Failed to generate embedding vector");
    }
  }

  // Response API for the OpenAI chat completion
  /**
   * Generate a response from the chat completion API.
   */

  // ✅ Add the response API method
  async generateResponse(
    messages: { role: "system" | "user" | "assistant"; message: string }[],
    maxTokens = 100,
    temperature = 0.7
  ): Promise<string> {
    try {
      const chatMessages: { role: "system" | "user" | "assistant"; content: string; }[] = messages.map((msg) => ({
        role: msg.role,
        content: msg.message,
      }));

      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: chatMessages,
        max_tokens: maxTokens,
        temperature,
      });

      return response.choices[0].message?.content?.trim() || "I'm sorry, I couldn't process your request.";
    } catch (error) {
      console.error("❌ OpenAI Chat API Error:", error);
      return "I'm sorry, I couldn't process your request.";
    }
  }
}


