import React from "react";
import { useMotion } from "@/hooks/use-motion";

const CloseIcon = () => {
  const { motion, containerControls, animations } = useMotion();
  return (
    <motion.div
      className="p-2 rounded-ful text-white"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1.5 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </motion.div>
  );
};

export default CloseIcon;
