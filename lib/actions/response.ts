// Server action for OpenAI chat response
import { OpenAIClient } from '@/lib/OpenAiClient';
import { ChatMessage } from '@/types';

export async function response({ messages }: { messages: ChatMessage[] }) {
  const client = new OpenAIClient();

  // ✅ generateResponse expects an array, not an object
  return await client.generateResponse(
    messages.map((message) => ({
      role: message.role,
      message: message.content,
    }))
  );
}
