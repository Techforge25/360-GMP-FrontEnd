"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserRole } from "@/context/UserContext";

export default function DashboardRedirect() {
  const { role } = useUserRole();
  const router = useRouter();

  useEffect(() => {
    if (role === "business") {
      router.push("/dashboard/business");
    } else {
      // 'paid_user' and 'free_trial' both go to the user dashboard flow, 
      // but 'free_trial' will see restricted content there.
      router.push("/dashboard/user");
    }
  }, [role, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-900"></div>
    </div>
  );
}
