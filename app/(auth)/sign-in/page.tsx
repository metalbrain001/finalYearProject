"use client";

import React from "react";
import AuthForm from "@/components/AuthForm";
import { signinSchema } from "@/lib/validations";
import { signInWithCredentials } from "@/lib/actions/auth";

const page = () => {
  return (
    <AuthForm
      type="SIGN_IN"
      schema={signinSchema}
      defaultValues={{ email: "", password: "" }}
      onSubmit={signInWithCredentials}
    />
  );
};

export default page;
