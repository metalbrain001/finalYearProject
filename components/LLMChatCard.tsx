"use client";

import React, { useState } from "react";
import { useLLM } from "@/hooks/use-llm";
import { ChatMessage } from "@/types";
import { SendHorizonal, X } from "lucide-react";
import Icons from "@/components/UseIcons";

const LLMChatCard = () => {
  const { response, loading, error, generateResponse } = useLLM();
  const [input, setInput] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { BotMessageSquare } = Icons();

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const newMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: input.trim() },
    ];

    setMessages(newMessages);
    setInput("");
    await generateResponse(newMessages);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!showChat ? (
        <button
          className="bg-black flex flex-row items-center justify-center text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-900 transition"
          onClick={() => setShowChat(true)}
        >
          <span className="mr-2 font-poppins text-lg">Chat with Me</span>
          <BotMessageSquare className="w-12 h-12" color="gold" fill="black" />
        </button>
      ) : (
        <div className="w-80 bg-dark-3 rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-700">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-600 bg-dark-2">
            <h3 className="text-white font-semibold text-sm">
              Ask Me Anything
            </h3>
            <button onClick={() => setShowChat(false)}>
              <X className="text-white w-4 h-4" />
            </button>
          </div>

          {/* Message Area */}
          <div className="p-3 h-64 overflow-y-auto text-sm space-y-2 text-white">
            {messages.map((msg, idx) => (
              <div key={idx} className="mb-1">
                <span className="text-blue-400 font-medium">{msg.role}:</span>{" "}
                {msg.content}
              </div>
            ))}
            {loading && <p className="text-yellow-400">Thinking...</p>}
            {response && (
              <div className="bg-gray-800 p-2 rounded-md text-sm mt-2 text-green-300">
                {response}
              </div>
            )}
            {error && <div className="text-red-400 text-xs mt-2">{error}</div>}
          </div>

          {/* Input Area */}
          <div className="flex items-center px-3 py-2 border-t border-gray-700 bg-dark-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Ask about movies..."
              className="flex-1 bg-transparent border-none text-white placeholder:text-gray-400 text-sm focus:outline-none"
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="ml-2 p-1 hover:text-blue-400"
            >
              <SendHorizonal className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LLMChatCard;
