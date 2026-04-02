"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUserRole } from "@/context/UserContext";
import subscriptionAPI from "@/services/subscriptionAPI";

export default function RoleGuard({ children, allowedRoles }) {
  const { user, isRoleSelected } = useUserRole();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkRoleGuard = async () => {
      if (user === undefined) return;

      if (!user) {
        router.push("/login");
        return;
      }

      const userRole = user.role;
      const isAuthorized = allowedRoles.includes(userRole);



      const checkSubscriptionPurchased = await subscriptionAPI.checkSubscriptionExistence()

      if (!isRoleSelected && pathname === "/onboarding/business-profile" || !isRoleSelected && pathname === "/onboarding/user-profile" || !isRoleSelected && pathname === "/onboarding/plans") {
        return router.push("/onboarding/role")
      }

      if (checkSubscriptionPurchased?.data?.subscriptionStatus && checkSubscriptionPurchased?.data?.planName === "TRIAL" && pathname === "/onboarding/business-profile") {
        return router.push("/onboarding-role")
      }

      if (!userRole?.role && pathname === "/onboarding/plans" && checkSubscriptionPurchased?.data?.subscriptionStatus) {
        return router.push("/onboarding/role")
      }

      if (!isAuthorized) {
        // Redirect to unauthorized or their own dashboard
        if (userRole === "business") {
          router.push("/dashboard/business");
        } else if (
          userRole === "user" ||
          userRole === "paid_user" ||
          userRole === "free_trial"
        ) {
          router.push("/dashboard/user");
        } else {
          router.push("/unauthorized");
        }
      } else {
        setAuthorized(true);
      }
    }

    checkRoleGuard()

  }, [user, allowedRoles, router]);

  if (!authorized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-surface">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
}
