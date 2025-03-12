"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { userSideBarLinks } from "@/constants";
import { Session } from "next-auth";
import ProfileCard from "./ProfileCard";
import { useProfile } from "@/hooks/use-profile";

const Sidebar = () => {
  const pathname = usePathname(); // ✅ Get current route
  const { user, movies, loading } = useProfile();

  return (
    <aside className="user-sidebar">
      <nav className="space-y-4">
        <ProfileCard user={user} />
        {userSideBarLinks.map((link) => (
          <div key={link.href}>
            <Link
              href={link.href}
              className={`flex items-center space-x-3 p-2 rounded-lg ${
                pathname.startsWith(link.href)
                  ? "bg-gray-700"
                  : "hover:bg-gray-800"
              }`}
            >
              <img
                src={
                  pathname.startsWith(link.href) ? link.selectedImg : link.img
                }
                alt={link.label}
                className="w-8 h-8"
              />
              <span>{link.label}</span>
            </Link>

            {/* ✅ Render subLinks if they exist */}
            {link.subLinks && pathname.startsWith("/settings") && (
              <div className="pl-6 mt-2 space-y-2">
                {link.subLinks.map((subLink) => (
                  <Link
                    key={subLink.href}
                    href={subLink.href}
                    className={`block text-sm p-2 rounded-lg ${
                      pathname === subLink.href
                        ? "bg-gray-700"
                        : "hover:bg-gray-800"
                    }`}
                  >
                    {subLink.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
