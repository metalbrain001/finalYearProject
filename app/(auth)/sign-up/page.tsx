"use client";
import React from "react";
import AuthForm from "@/components/AuthForm";
import { signupSchema } from "@/lib/validations";
import { signUp } from "@/lib/actions/auth";

const page = () => {
  return (
    <AuthForm
      type="SIGN_UP"
      schema={signupSchema}
      defaultValues={{ fullName: "", username: "", email: "", password: "" }}
      onSubmit={signUp}
    />
  );
};

export default page;
