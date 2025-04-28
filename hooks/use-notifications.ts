// This hook fetches updated notifications from the server and returns them.
// It also provides a function to mark notifications as read.

import { useState, useEffect } from "react";
import { markNotificationAsRead } from "@/lib/actions/notifications";
import type { Notification } from "@/types";

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("/api/notifications");
        const json = await res.json();
        if (!json.success) throw new Error(json.message || "Failed");
        setNotifications(json.data); // 👈 make sure this matches
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (notificationIds: string[]) => {
    try {
      // Instead of looping server calls one by one (optional), you could:
      for (const id of notificationIds) {
        await markNotificationAsRead(id);
      }
      setNotifications((prev) =>
        prev.map((notif) =>
          notificationIds.includes(notif.id)
            ? { ...notif, read: true }
            : notif
        )
      );
    } catch (err: any) {
      setError(err.message || "Failed to mark as read");
    }
  };

  return { notifications, loading, error, markAsRead };
}
