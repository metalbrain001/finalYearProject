import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import type { AllowedRoles } from "@/types";

export async function protectedByAdmin(req: NextRequest, allowedRoles: AllowedRoles[]) {
  const session = await auth();

  if (!session || !session.user?.id) {
    return NextResponse.json(
      { message: "Unauthorized: No session found" },
      { status: 401 }
    );
  }

  const userRole = session.user.role; // ✅ Now using cached role from session

  if (!allowedRoles.includes(userRole as AllowedRoles)) {
    console.error(`❌ Access denied. User role: ${userRole}`);
    return NextResponse.json(
      { message: "Forbidden: Insufficient access rights." },
      { status: 403 }
    );
  }

  return null; // ✅ Safe to proceed
}