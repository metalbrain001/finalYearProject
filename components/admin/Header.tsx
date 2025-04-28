"use client";

import { Session } from "next-auth";
import React from "react";
import { ThemeToggle } from "../resources/ToggleThemes";

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="admin-header">
      <div className="flex flex-col">
        <h2 className="text-2xl text-white font-poppins font-semibold">
          Welcome, {session.user?.name}
        </h2>
        <p className="text-white font-poppins text-sm">
          Monitor all of your movies here
        </p>
        <p className="text-sm text-slate-200 font-bold">
          {new Date().toDateString()}
        </p>
      </div>
    </header>
  );
};

export default Header;
