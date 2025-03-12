"use client";

import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { Users } from "@/types";

export const useProfile = () => {
  const [user, setUser] = useState<Users | null>(null);
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const session = await getSession();
      if (!session?.user?.id) {
        setLoading(false);
        return;
      }

      try {
        // ✅ Fetch user data from API route
        const userResponse = await fetch(`/api/users/${session.user.id}`);
        if (!userResponse.ok) throw new Error("Failed to fetch user");

        const userData = await userResponse.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { user, movies, loading };
};
