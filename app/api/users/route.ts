// app/api/admin/manage-users/route.ts

import { NextResponse, NextRequest } from "next/server";
import { getUsers, updateUserRole, deleteUser } from "@/lib/admin/actions/users";
import { protectedByAdmin } from "@/lib/admin/actions/protectedbyadmin"; // ✅ already adapted to app router

// Handle GET requests
export async function GET(req: NextRequest) {
  const error = await protectedByAdmin(req, ["superadmin"]);
  if (error) return error; // ❌ if not superadmin, return error

  const users = await getUsers();
  return NextResponse.json(users);
}

// Handle PUT requests
export async function PUT(req: NextRequest) {
  const error = await protectedByAdmin(req, ["superadmin"]);
  if (error) return error;

  const body = await req.json();
  const { userId, role } = body;

  if (!userId || role == "User") {
    return NextResponse.json({ message: "Missing userId or role" }, { status: 400 });
  }

  const result = await updateUserRole(userId, role);
  return NextResponse.json(result);
}

// Handle DELETE requests
export async function DELETE(req: NextRequest) {
  const error = await protectedByAdmin(req, ["superadmin"]);
  if (error) return error;

  const body = await req.json();
  const { requesterId, userId } = body;

  if (!requesterId || !userId) {
    return NextResponse.json({ message: "Missing requesterId or userId" }, { status: 400 });
  }

  const result = await deleteUser(requesterId, userId);
  return NextResponse.json(result);
}
