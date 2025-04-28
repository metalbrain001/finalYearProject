// hooks/use-get-users-with-token.ts
import { useEffect, useState } from "react";

export interface UserToken {
  id: string;
  name: string;
  token: string;
}

export const useGetUsersWithToken = () => {
  const [users, setUsers] = useState<UserToken[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch("/api/admin/get-user-token");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users with tokens:", error);
      }
    };

    getUsers();
  }, []);

  return { users };
};
