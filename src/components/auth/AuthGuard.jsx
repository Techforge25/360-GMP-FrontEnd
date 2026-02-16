"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUserRole } from "@/context/UserContext";

export default function AuthGuard({ children }) {
  const { user } = useUserRole();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    // UserContext loads from localStorage on mount, so we might need a small delay
    // or rely on the state being null initially.

    const checkAuth = async () => {
      if (user === undefined) return; // Wait for context to initialize

      if (!user) {
        // Not logged in, redirect to login
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      } else {
        // Optional: Verify user session validity with backend if token exists
        // This handles cases where a shared URL might have been used or token is expired
        setLoading(false);
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
