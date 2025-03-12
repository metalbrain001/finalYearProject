import React from "react";
import { formattedDate, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";

const ProfileCard = ({ user }: { user: any }) => {
  if (!user) return <p className="text-gray-400">User not found.</p>;

  return (
    <div className="p-4 bg-dark-3 text-white rounded-lg shadow-md">
      <div className="flex flex-col items-center justify-center">
        <div className="w-[120px] h-[120px] rounded-full overflow-hidden bg-amber-100 flex items-center justify-center">
          <Avatar className="w-full h-full">
            <AvatarFallback className="w-full h-full flex items-center justify-center text-amber-900 text-4xl font-bold">
              {getInitials(user?.fullName || "IN")}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
