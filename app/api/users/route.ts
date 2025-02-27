import { NextApiRequest, NextApiResponse } from "next";
import { getUsers, updateUserRole, deleteUser } from "@/lib/admin/actions/users";
import { protectedByAdmin } from "@/lib/admin/actions/protectedbyadmin";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return protectedByAdmin(req, res, async () => {
    switch (req.method) {
      case "GET":
        res.json(await getUsers());
        break;
      case "PUT":
        res.json(await updateUserRole(req.body.userId, req.body.role));
        break;
      case "DELETE":
        res.json(await deleteUser(req.body.requesterId, req.body.userId));
        break;
      default:
        res.status(405).json({ message: "Method Not Allowed" });
    }
  });
}
