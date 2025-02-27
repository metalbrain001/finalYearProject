"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import React from "react";
import { Session } from "next-auth";
import SearchInput from "./SearchInput";
import GenreMenu from "./GenreMenu";
import ProfileMenu from "./ProfileMenu";
import RecommenderMenu from "./RecommenderMenu";

const Header = ({ session }: { session: Session }) => {
  const pathname = usePathname();
  return (
    <header className="my-10 flex justify-between px-4 md:px-10 gap-10">
      <Link href="/">
        <Image
          src="/icons/logo1.svg"
          alt="Movie Recommender"
          width={40}
          height={40}
          priority
        />
      </Link>
      <div className="flex items-center gap-4">
        <SearchInput />
      </div>
      <ul className="flex flex-row items-center gap-14">
        <li className="hidden md:block">
          <Link
            href="/"
            className={cn(
              "text-base text-light-300 cursor-pointer capitalize",
              pathname === "/" ? "text-primary" : "text-light-100"
            )}
          >
            Home
          </Link>
        </li>
        <li>
          <RecommenderMenu />
        </li>
        <li>
          <GenreMenu />
        </li>
        <li className="flex items-center gap-2">
          <ProfileMenu session={session} />
        </li>
      </ul>
    </header>
  );
};

export default Header;
