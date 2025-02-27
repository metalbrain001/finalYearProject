import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { recommendationOptions } from "@/constants";
import Link from "next/link";
import { useMotion } from "@/hooks/use-motion";
import { AnimatePresence } from "framer-motion";

const RecommenderMenu = () => {
  const { motion, animatePresences, animations, isOpen, setIsOpen } =
    useMotion();
  return (
    <motion.div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      whileHover={{ scale: 1.05 }}
      whileFocus={{ scale: 1.05 }}
    >
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
        <DropdownMenuTrigger className="text-light-100">
          Recommendations
        </DropdownMenuTrigger>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={animations.dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <DropdownMenuContent className="bg-gray-900 text-white border border-gray-700 shadow-lg">
                <DropdownMenuLabel className="text-gray-300">
                  Quick Recommendations
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {recommendationOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    className="hover:bg-gray-700 text-gray-300 transition-colors"
                  >
                    <Link href={option.value} className="w-full">
                      {option.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </motion.div>
          )}
        </AnimatePresence>
      </DropdownMenu>
    </motion.div>
  );
};

export default RecommenderMenu;
