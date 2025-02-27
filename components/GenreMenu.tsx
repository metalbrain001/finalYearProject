import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { genres } from "@/constants";
import Link from "next/link";
import { useMotion } from "@/hooks/use-motion";
import { AnimatePresence } from "framer-motion";

const GenreMenu = () => {
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
          Genres
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
                  Browse Genres
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {genres.map((genre) => (
                  <DropdownMenuItem
                    key={genre}
                    className="hover:bg-gray-700 text-gray-300 transition-colors"
                  >
                    <Link
                      href={`/movie/genre/${genre
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {genre}
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

export default GenreMenu;
