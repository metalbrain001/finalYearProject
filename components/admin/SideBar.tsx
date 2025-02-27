"use client";

import React from "react";
import Image from "next/image";
import { adminSideBarLinks } from "@/constants";
import Link from "next/link";
import { cn, getInitials } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Session } from "next-auth";

const SideBar = ({ session }: { session: Session }) => {
  const pathname = usePathname();
  return (
    <div className="admin-sidebar">
      <div className="logo">
        <Image
          src="/icons/admin/logo.svg"
          alt="logo"
          width={100}
          height={100}
        />
        <h1>MovieRecommender</h1>
      </div>
      <div className="mt-10 flex flex-col gap-8">
        {adminSideBarLinks.map((link) => {
          const isSelected =
            (link.route !== "/admin" &&
              pathname.includes(link.route) &&
              link.route.length > 1) ||
            (link.route === "/admin" && pathname === link.route);
          return (
            <Link key={link.route} href={link.route}>
              <div
                className={`flex items-center gap-4 p-2 rounded-lg ${
                  isSelected ? "bg-blue-500" : ""
                }`}
              >
                <div className="relative size-5">
                  <Image
                    src={link.img}
                    alt="icon"
                    fill
                    className={`${isSelected} ? "brightness-0 invert" : ""`}
                  />
                </div>
                <p className={cn(isSelected ? "text-white" : "text-dark-1")}>
                  {link.text}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="user">
        <Avatar className="w-16 h-16">
          <AvatarFallback className="bg-amber-100 rounded-full font-semibold text-amber-900 text-2xl">
            {getInitials(session?.user?.name || "IN")}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col max-md:hidden gap-2 items-center justify-center">
          <p className="text-dark-1 text-base font-poppins font-semibold">
            {session?.user?.name}
          </p>
          <p className="text-dark-4 font-poppins text-xs">
            {session?.user?.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
