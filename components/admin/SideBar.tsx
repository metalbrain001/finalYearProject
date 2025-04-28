"use client";

import React from "react";
import Image from "next/image";
import { adminSideBarLinks } from "@/constants";
import Link from "next/link";
import { cn, getInitials } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Session } from "next-auth";

const SideBar = ({
  session,
  userRole,
}: {
  session: Session;
  userRole: string;
}) => {
  const pathname = usePathname();
  return (
    <div className="admin-sidebar bg-sidebar">
      <div className="logo">
        <Image
          src="/icons/admin/logo.svg"
          alt="logo"
          width={100}
          height={100}
        />
        <h1 className="">MovieRecommender</h1>
      </div>
      <div className="mt-10 flex flex-col gap-8">
        {adminSideBarLinks
          .filter((link) => link.roles.includes(userRole)) // Filter links based on user role
          .map((link) => {
            const isSelected =
              (link.route !== "/admin" &&
                pathname.includes(link.route) &&
                link.route.length > 1) ||
              (link.route === "/admin" && pathname === link.route);

            return (
              <Link key={link.route} href={link.route}>
                <div
                  className={`flex items-center gap-4 p-2 rounded-lg ${
                    isSelected
                      ? "bg-sidebar-accent text-white"
                      : "hover:bg-sidebar-surface text-muted-foreground"
                  }`}
                >
                  <div className="relative size-5">
                    <Image
                      src={link.img}
                      alt="icon"
                      fill
                      className={cn(isSelected && "brightness-0 invert")}
                    />
                  </div>
                  <p
                    className={cn(
                      "font-medium",
                      isSelected ? "text-white" : "text-light-1"
                    )}
                  >
                    {link.text}
                  </p>
                </div>
              </Link>
            );
          })}
      </div>
      <div className="user">
        <Avatar className="w-16 h-16">
          <AvatarFallback className="bg-white text-sidebar font-semibold text-lg">
            {getInitials(session?.user?.name || "IN")}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col max-md:hidden gap-2 items-center justify-center">
          <p className="text-white text-base font-poppins font-semibold">
            {session?.user?.name}
          </p>
          <p className="text-white font-poppins text-xs">
            {session?.user?.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
