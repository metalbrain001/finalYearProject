import React, { useState } from "react";
import { Button } from "../ui/button";
import { updateUserRole, deleteUser } from "@/lib/admin/actions/users";
import { getSession } from "next-auth/react";
import { roleOptions, Role } from "@/constants"; // ✅ Import roleOptions
import { AllUsersParams } from "@/types";

const UserCard = ({
  id,
  fullName,
  username,
  email,
  role,
  createdAt,
}: AllUsersParams) => {
  const [selectedRole, setSelectedRole] = useState<Role>(role);
  const [loading, setLoading] = useState(false);

  // ✅ Handle Role Update
  const handleRoleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as Role;
    setSelectedRole(newRole);
    setLoading(true);

    // ✅ Fetch session
    const userSession = await getSession();
    if (!userSession?.user?.id) {
      console.error("🚨 Error: No authenticated user.");
      setLoading(false);
      return;
    }

    try {
      // ✅ Send role update request
      const response = await updateUserRole(id, newRole);
      console.log(response);
      if (response.success) {
        console.log(`✅ Role updated to ${newRole}`);
      }
    } catch (error) {
      console.error("🚨 Error updating role:", error);
    }

    setLoading(false);
  };

  // ✅ Handle User Deletion
  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${fullName}?`)) return;

    setLoading(true);
    const requesterId = "CURRENT_USER_ID"; // Replace with actual authenticated user ID

    const response = await deleteUser(requesterId, id);
    if (response.success) {
      console.log(`✅ Deleted user: ${fullName}`);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white border-b-gray-600 shadow-lg rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt=""
          />
          <div className="ml-2">
            <p className="text-lg font-semibold text-gray-800">{fullName}</p>
            <p className="text-sm font-semibold text-gray-600">@{username}</p>
          </div>
        </div>

        {/* ✅ Use roleOptions instead of raw strings */}
        <select
          className="border-dark-2 text-dark-1 bg-gray-200 p-1 rounded"
          value={selectedRole}
          onChange={handleRoleChange}
          disabled={loading}
          id={`role-${id}`}
        >
          {roleOptions.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-700">{email}</p>
        <p className="text-sm text-gray-700">
          {selectedRole !== "superadmin" &&
            selectedRole !== "admin" &&
            `Joined on ${createdAt}`}
        </p>
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          className="text-sm bg-red font-semibold text-white"
          onClick={() => handleDelete()}
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </div>
  );
};

export default UserCard;
