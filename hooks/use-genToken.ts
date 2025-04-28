"use client";
// your firebase app init
import { useEffect } from "react";
import { getMessaging, getToken } from "firebase/messaging";
import { getClientMessaging } from "@/firebase";
import config from "@/lib/config";

export const useRegisterFCMToken = (userId: string | null) => {
  useEffect(() => {
    if (!userId) return;

    const register = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          console.log("🚫 Notification permission denied");
          return;
        }

        const messaging = await getClientMessaging();
        if (!messaging) {
          console.error("FCM not supported");
          return;
        }

        const token = await getToken(messaging, {
          vapidKey: config.env.firebase.vapidKey,
        });

        console.log("📲 Token:", token);

        // ✅ Send to your server
        await fetch("/api/admin/save-token", {
          method: "POST",
          body: JSON.stringify({ token }),
        });
      } catch (error) {
        console.error("Error getting FCM token:", error);
      }
    };

    register();
  }, [userId]);
};

export default useRegisterFCMToken;
