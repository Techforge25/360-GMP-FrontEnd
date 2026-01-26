"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserRole } from "@/context/UserContext";

export default function RoleGuard({ children, allowedRoles }) {
  const { user } = useUserRole();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (user === undefined) return; // Wait for context

    if (!user) {
      router.push("/login");
      return;
    }

    const userRole = user.role;
    const isAuthorized = allowedRoles.includes(userRole);

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
