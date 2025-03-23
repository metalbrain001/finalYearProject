import { NextRequest, NextResponse } from "next/server";
import { savePreferences } from "@/lib/actions/savePreferences";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const result = await savePreferences(body);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Onboarding API error:", error);
    return NextResponse.json({ message: "Failed to save preferences" }, { status: 500 });
  }
}
