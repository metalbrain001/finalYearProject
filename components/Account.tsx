"use client";

import React from "react";
import { useProfile } from "@/hooks/use-profile";
import AccountForm from "@/components/AccountForm";
import { myAccountSchema } from "@/lib/validations";

const MyAccount = () => {
  const { user, loading } = useProfile();

  if (loading)
    return <p className="text-gray-500">Loading account details...</p>;
  if (!user)
    return <p className="text-red-500">Error: User profile not found.</p>;

  const handleAccountUpdate = async (data: any) => {
    console.log("Updated Data:", data);
    return { success: true, error: "" }; // TODO: Replace with actual API call
  };

  return (
    <section className="flex gap-10 mx-auto max-w-7xl px-6 py-8">
      {/* ✅ Main Content */}
      <div className="flex-1 space-y-6">
        {/* ✅ Use AccountForm instead of AuthForm */}
        <AccountForm
          schema={myAccountSchema}
          defaultValues={{
            fullName: user.fullName,
            email: user.email,
            password: "",
            role: user.role,
          }}
          onSubmit={handleAccountUpdate}
        />
      </div>
    </section>
  );
};

export default MyAccount;
