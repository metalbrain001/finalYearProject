import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { hasPreferences } from "@/lib/helper/checkUserPreferences";
import Home from "./Home";
import { getUserRole } from "@/lib/helper/checkUserRole";

const page = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const role = await getUserRole(session.user.id);
  if (role !== "superadmin") {
    const hasPrefs = await hasPreferences(session.user.id);
    if (!hasPrefs) redirect("/onboarding");
  }
  return <Home />;
};

export default page;
