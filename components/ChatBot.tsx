"use client";

import React, { useEffect, useState } from "react";
import { useChatbot } from "@/hooks/use-chatbot";
import { Button } from "./ui/button";
import Link from "next/link";
import MoviePlaceH from "./icons/MoviePlaceH";
import { useMotion } from "@/hooks/use-motion";
import Icons from "./UseIcons";
import { set } from "zod";

const ChatBot = () => {
  const [message, setMessage] = useState(""); // ✅ User input
  const { response, sendMessage } = useChatbot(); // ✅ New Hook
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>(
    []
  ); // ✅ Chat history
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // ✅ Toggle chat window
  const { motion, animations } = useMotion();
  const { Bot, X } = Icons();

  console.log("🤖 ChatBot Response:", response);

  // ✅ Handle Sending Messages
  const handleSend = async () => {
    if (message.trim()) {
      setMessages((prev) => [...prev, { text: message, sender: "user" }]);
      setIsLoading(true);
      await sendMessage(message);
      setMessage("");
      setIsLoading(false);
    }
  };

  // ✅ Update Chat History with Bot Responses
  useEffect(() => {
    if (response) {
      setMessages((prev) => [
        ...prev,
        { text: response.text ?? "", sender: "bot" },
      ]);
    }
  }, [response]);

  return (
    <motion.div
      className="fixed bottom-4 right-4"
      initial="hidden"
      animate="visible"
      variants={animations.fadeIn}
    >
      {/* ✅ Chat Icon - Show when chat is closed */}
      <motion.div
        className="fixed bottom-4 right-4 items-end"
        initial="hidden"
        animate="visible"
        variants={animations.slideInFromRight}
      >
        {!isOpen && (
          <motion.div
            className="flex items-center gap-1"
            initial="hidden"
            animate="visible"
            variants={animations.slideInFromBottom}
          >
            <p className="chatbot_text">I can help you find movies! 🍿</p>
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-full shadow-lg transition"
            >
              <Bot size={82} color="gold" strokeWidth={3} />
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* ✅ Chat Window - Show when chat is open */}
      {isOpen && (
        <div className="chatbot_window">
          <div className="flex justify-between rounded-lg border-2 border-cyan-300 p-3">
            <div className="flex items-center justify-center gap-2">
              <Bot
                className="w-8 h-8 bg-gray-900 rounded-full object-cover"
                size={62}
                color="gold"
                strokeWidth={3}
              />
              <div className="items-center justify-center">
                <p className="text-sm text-green-500 font-bold animate-pulse">
                  (Online)
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X
                size={34}
                color="red"
                strokeWidth={3}
                className="hover:text-white"
              />
            </button>
          </div>

          {/* ✅ Chat Messages - Scrollable */}
          <div className="flex-1 p-3 space-y-2 overflow-y-auto h-64">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-xs ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {/* ✅ Display Movie Recommendations */}
            {response?.movies && response.movies && (
              <div className="p-2 rounded-lg text-white">
                <div className="flex items-center gap-2">
                  <Bot
                    className="w-8 h-8 bg-gray-900 rounded-full object-cover"
                    size={62}
                    color="gold"
                    strokeWidth={3}
                  />
                  <p className="font-semibold text-sm">
                    {`Here are some ${
                      response?.genres || "recommended"
                    } movies you might like:`}
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {response.movies.map((movie: any) => (
                    <Link
                      href={`/movie/${movie.movie_id}`}
                      key={movie.movie_id}
                      className="block"
                    >
                      <div className="flex gap-2 p-2 boder-1 rounded-lg">
                        {movie.poster_url && movie.poster_url !== "N/A" ? (
                          <img
                            src={movie.poster_url}
                            alt={movie.title}
                            className="w-24 h-24 rounded-lg object-cover"
                          />
                        ) : (
                          <MoviePlaceH /> // ✅ Show SVG Placeholder if no poster available
                        )}
                        <div className="flex flex-col">
                          <p className="text-sm font-semibold">{movie.title}</p>
                          <p className="text-xs text-gray-400">
                            {movie.genres}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* ✅ Typing Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2">
                <span className="animate-bounce">⏳</span>
                <p className="text-gray-400">Searching for movies...</p>
              </div>
            )}
          </div>

          {/* ✅ Input & Send Button */}
          <div className="mt-3 flex items-end gap-2">
            <input
              id="chatbot_input"
              type="text"
              className="flex-1 p-2 border-4 rounded-lg bg-gray-800 text-white border-cyan-300"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <Button
              className="p-2 h-full bg-blue-600 text-white rounded-lg"
              onClick={handleSend}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Send"}
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ChatBot;
