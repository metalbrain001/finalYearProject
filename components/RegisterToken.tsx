"use client";
// Register Token component to save the token to the database:

import { useEffect } from "react";
import { useRegisterFCMToken } from "@/hooks/use-genToken";

interface Props {
  userId: string | null;
}

const RegisterToken = ({ userId }: Props) => {
  useRegisterFCMToken(userId);

  return null;
};

export default RegisterToken;
