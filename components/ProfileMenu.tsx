import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useMotion } from "@/hooks/use-motion";
import { AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Session } from "next-auth";
import { profileOptions } from "@/constants";
import { getInitials } from "@/lib/utils";
import { signOut } from "next-auth/react"; // ✅ Use this import

const ProfileMenu = ({ session }: { session: Session }) => {
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
          <div className="flex items-center gap-2">
            <ul className="flex flex-row items-center gap-8">
              <li className="flex items-center gap-2">
                <Link href="/my-profile">
                  <Avatar className="w-28 h-28">
                    <AvatarFallback className="bg-amber-100 rounded-full font-semibold text-amber-500 text-2xl">
                      {getInitials(session?.user?.name || "IN")}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </li>
            </ul>
          </div>
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
                  {session?.user?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {profileOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.label}
                    className="hover:bg-gray-700 text-gray-300 transition-colors"
                  >
                    <Link href={option.href}>{option.label}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem
                  className="hover:bg-gray-700 text-gray-300 transition-colors"
                  onClick={() => signOut()}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </motion.div>
          )}
        </AnimatePresence>
      </DropdownMenu>
    </motion.div>
  );
};

export default ProfileMenu;
