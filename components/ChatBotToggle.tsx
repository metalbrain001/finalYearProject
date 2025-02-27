import React, { useState } from "react";
import ChatBotIcon from "@/components/icons/ChatBotIcon";
import Icons from "./UseIcons";
import { Chat } from "openai/resources/index.mjs";

const ChatBotToggle = () => {
  const [isOpen, setIsOpen] = useState(false); // ✅ Toggle state
  const { Bot } = Icons();

  return (
    <div className="fixed bottom-4 right-4 items-end">
      {/* ✅ Chat Icon - Shown when chat is closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 transition"
        >
          <ChatBotIcon />
        </button>
      )}

      {/* ✅ Chat Window - Shown when chat is open */}
      {isOpen && (
        <div className="w-96 bg-gray-900 text-white rounded-lg shadow-lg p-4">
          {/* Chat Header with Close Button */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-300">🤖 ChatBot</h2>
          </div>

          {/* Chat Content (Replace with chat messages) */}
          <div className="flex-1 h-64 bg-gray-800 rounded-lg p-3 overflow-y-auto">
            <p className="text-gray-300">Hello! How can I assist you today?</p>
          </div>

          {/* Chat Input */}
          <div className="mt-3 flex gap-2">
            <input
              type="text"
              className="flex-1 p-2 border rounded-lg bg-gray-700 text-white"
              placeholder="Type a message..."
            />
            <button className="p-2 bg-blue-600 text-white rounded-lg">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBotToggle;
