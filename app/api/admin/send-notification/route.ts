// app/api/send-fcm/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getMessaging } from "@/lib/firebase-admin"; // ⬅️ from above
import { Message } from "firebase-admin/messaging";
import { drizzledb } from "@/db/drizzle";
import { fcmTokens, notifications } from "@/db/schema";
import { eq } from "drizzle-orm";
import { protectedByAdmin } from "@/lib/admin/actions/protectedbyadmin";

export async function POST(req: NextRequest) {
  const { token, title, message, link } = await req.json();
  const error = await protectedByAdmin(req, ["superadmin"]);
  if (error) return error;
  console.log("📱 Sending message to:", token);

  if (!token || !title || !message || typeof token !== "string" || typeof title !== "string" || typeof message !== "string") {
    return NextResponse.json(
      { success: false, message: "Token, title, and message are required." },
      { status: 400 }
    );
  }

  const payload: Message = {
    notification: {
      title,
      body: message,
    },
    webpush: {
      fcmOptions: {
        link: link || "/",
      },
    },
    token,
  };

  try {
    const response = await getMessaging().send(payload);
    // ✅ Find user by token
    const user = await drizzledb
      .select({ user_id: fcmTokens.user_id })
      .from(fcmTokens)
      .where(eq(fcmTokens.token, token))
      .limit(1) // 👈 Only get 1 result
      .execute();
    const userId = user[0]?.user_id;
    if (userId) {
      await drizzledb.insert(notifications).values({
        user_id: userId,
        content: message,
        read: false,
        createdAt: new Date(),
      });
    }
    return NextResponse.json({ success: true, response });
  } catch (error: any) {
    console.error("❌ Error sending message:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to send message", error: error.message },
      { status: 500 }
    );
  }
}
