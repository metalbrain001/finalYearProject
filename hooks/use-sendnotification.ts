// Send notification to all users hook
// This hook will send a notification to all users. It will be used in the admin dashboard.
// hooks/use-sendnotification.ts
"use client";

import { useState } from "react";

interface SendNotificationInput {
  token: string;
  title: string;
  message: string;
  link?: string;
}

export const useSendNotification = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const sendNotification = async ({
    token,
    title,
    message,
    link = "/",
  }: SendNotificationInput) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/admin/send-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, title, message, link }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to send notification.");
      }

      setSuccess(true);
      return { success: true };
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    sendNotification,
    loading,
    error,
    success,
  };
};

