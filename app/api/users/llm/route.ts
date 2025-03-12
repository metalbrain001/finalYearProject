// app/api/chat-response/route.ts

import { NextRequest, NextResponse } from "next/server";
import { response as openAIResponse } from "@/lib/actions/response"; // Adjust path if needed
import { checkRateLimit } from "@/lib/ratelimit";

// Optional reusable type
type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export async function POST(req: NextRequest) {
  try {

    // Apply rate limiting
    // ✅ Apply Ratelimit
    const { success, limit, remaining, reset } = await checkRateLimit();

    if (!success) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }


    const body = await req.json();

    // ✅ Validate body structure
    if (!body?.messages || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { success: false, message: "Invalid request: 'messages' array is required." },
        { status: 400 }
      );
    }

    // ✅ Type guard for messages structure
    const isValid = body.messages.every(
      (msg: any) =>
        typeof msg.role === "string" &&
        typeof msg.content === "string" &&
        ["user", "system", "assistant"].includes(msg.role)
    );

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid message format. Each message must have role and content." },
        { status: 400 }
      );
    }

    // ✅ Call the server action
    const aiResponse = await openAIResponse({
      messages: body.messages as ChatMessage[],
    });

    const res = NextResponse.json({ success: true, data: aiResponse });
    res.headers.set("X-RateLimit-Limit", limit.toString());
    res.headers.set("X-RateLimit-Remaining", remaining.toString());
    res.headers.set("X-RateLimit-Reset", reset.toString());
    return res;
  } catch (error: any) {
    console.error("❌ Chat Response API Error:", error.message);
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
