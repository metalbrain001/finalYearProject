// lib/firebase-admin.ts
import { getApps, getApp, initializeApp, cert } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";
import * as admin from "firebase-admin";
import serviceAccount from "@/service_key.json"; // ✅ TS compatible import

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount as admin.ServiceAccount),
  });
}

export { getApp, admin, getMessaging };
