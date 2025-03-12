"use client";

import React from "react";
import LLMChatCard from "@/components/LLMChatCard";
import { useMotion } from "@/hooks/use-motion";

const LLMChatWindow = () => {
  const { motion, animations } = useMotion();
  return (
    <motion.div
      className="relative z-50"
      initial="hidden"
      animate="visible"
      variants={animations.slideInFromBottom}
    >
      <LLMChatCard />
    </motion.div>
  );
};

export default LLMChatWindow;
