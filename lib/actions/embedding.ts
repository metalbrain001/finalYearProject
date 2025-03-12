// Server action to generate embeddings from OpenAI API using the OpenAiClient class
import { OpenAIClient } from '@/lib/OpenAiClient';

export async function embeddings({ text, model = "text-embedding-ada-002" }: { text: string, model?: string }) {
  const client = new OpenAIClient();
  return await client.generateEmbedding(text, model);
}