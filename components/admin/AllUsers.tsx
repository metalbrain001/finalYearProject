import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { getUsers } from "@/lib/admin/actions/users";
import { AllUsersParams } from "@/types";

// ✅ Updated Interface to Match API Response

const AllUsers = () => {
  const [users, setUsers] = useState<AllUsersParams[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        if (response.success && response.data) {
          // ✅ Convert Date to String (Format to readable date)
          const formattedUsers = response.data.map((user: any) => ({
            ...user,
            createdAt: new Date(user.createdAt).toLocaleDateString(), // Convert Date to string
            role: user.role || "user", // Ensure role is never null
          }));

          setUsers(formattedUsers);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (users.length === 0) return <p>No users found.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map((user) => (
          <UserCard key={user.id} {...user} />
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
