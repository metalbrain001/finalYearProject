// hooks/useOnboardingGuard.ts
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

export function useOnboardingGuard({ role, hasPreferences }: { role: string | null, hasPreferences: boolean }) {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Wait for session to load
    if (status === "loading") return;

    if (role !== "superadmin" && !hasPreferences && pathname !== "/onboarding") {
      router.replace("/onboarding");
    }
  }, [status, role, hasPreferences, pathname, router]);
}
export default useOnboardingGuard;