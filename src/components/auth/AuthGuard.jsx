"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUserRole } from "@/context/UserContext";
import api from "@/lib/axios";
import { connectSocket } from "@/services/socket";
import subscriptionAPI from "@/services/subscriptionAPI";
import { routesSubscriptionCancelled } from "@/constants/index";

export default function AuthGuard({ children }) {
  const { user, isSwitchProfile, isRoleSelected, userId, setUserId } = useUserRole();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const checkAuth = async () => {
      if (user === undefined) return;
      const response = await api.get({
        url: `/auth/user/me`,
        enableErrorMessage: false,
        enableSuccessMessage: false,
        activateLoader: false,
      });

      const isAuthorized = response?.data?.userId;
      const businessId = response?.data?.businessProfileId
      setUserId(businessId)

      const checkSubscriptionPurchased = await subscriptionAPI.checkSubscriptionExistence()
      const userRole = user?.role;

      if (isAuthorized) {
        const isCancelled =
          checkSubscriptionPurchased?.data?.subscriptionStatus === "canceled";
        const isRestrictedRoute =
          routesSubscriptionCancelled.includes(pathname) ||
          pathname.startsWith("/dashboard/business") ||
          pathname.startsWith("/dashboard/user");

        if (isCancelled && isRestrictedRoute) {
          return router.push("/onboarding/plans");
        }
      }

      if (!userRole) {
        if (checkSubscriptionPurchased?.data?.subscriptionStatus === "active" && checkSubscriptionPurchased?.data?.planName === "TRIAL" && pathname === "/onboarding/business-profile") {
          return router.push("/onboarding/role")
        }

        if (!response?.role && pathname === "/onboarding/plans" && checkSubscriptionPurchased?.data?.subscriptionStatus === "active") {
          return router.push("/onboarding/role")
        }
      }

      if (!user || response.statusCode !== 200) {
        // Not logged in, redirect to login
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      } else {
        // Optional: Verify user session validity with backend if token exists
        // This handles cases where a shared URL might have been used or token is expired
        setLoading(false);
        connectSocket();
      }
    };

    checkAuth();
  }, [user, router, pathname]);

  // Handle initialization delay
  if (loading || user === undefined) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-surface">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
}
