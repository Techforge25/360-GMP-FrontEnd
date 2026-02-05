"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { RoleSelectionCard } from "@/components/ui/RoleSelectionCard";

import { useUserRole } from "@/context/UserContext";

export default function RoleSelectionPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("business");
  const { setOnboardingRole, user } = useUserRole();

  useEffect(() => {
    // Only redirect if user exists, is NOT new to platform, AND has a role
    if (user && !user.isNewToPlatform) {
      if (user.role === "business") router.push("/dashboard/business");
      else router.push("/dashboard/user");
    }
  }, [user, router]);

  const handleContinue = async () => {
    try {
      await setOnboardingRole(selectedRole);

      // If user is new, send to plans. Otherwise, send to dashboard.
      if (user?.isNewToPlatform) {
        router.push(`/onboarding/plans`);
      } else {
        const dashboardUrl =
          selectedRole === "business"
            ? "/dashboard/business"
            : "/dashboard/user";
        router.push(dashboardUrl);
      }
    } catch (e) {
      console.error("Navigation halted due to role sync error");
    }
  };

  return (
    <div className="flex w-full items-center justify-center p-3 xs:p-4 sm:p-6">
      <div className="fixed inset-0 -z-10">
        <img
          src="/assets/images/authBG.png"
          alt="Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <Card className="w-full max-w-[280px] xs:max-w-sm sm:max-w-md lg:max-w-2xl rounded-2xl xs:rounded-3xl border-none shadow-xl bg-surface-elevated z-10 relative">
        <CardHeader className="text-center pb-1 xs:pb-2 px-4 xs:px-6 pt-4 xs:pt-6 sm:pt-8">
          <CardTitle className="text-lg xs:text-xl sm:text-2xl font-bold bg-gradient-to-r from-brand-primary to-brand-primary-light bg-clip-text text-transparent leading-tight">
            Welcome To 360 GMP
          </CardTitle>
          <CardDescription className="text-xs xs:text-sm sm:text-base text-text-secondary mt-1">
            One Platform Many Solutions
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-3 xs:space-y-4 sm:space-y-6 px-4 xs:px-6 pb-4 xs:pb-6 sm:pb-8 pt-2 xs:pt-4 sm:pt-6">
          <div className="space-y-2 xs:space-y-3 sm:space-y-4">
            <RoleSelectionCard
              type="business"
              selected={selectedRole}
              onSelect={setSelectedRole}
            />
            <RoleSelectionCard
              type="user"
              selected={selectedRole}
              onSelect={setSelectedRole}
            />
          </div>

          <button
            onClick={handleContinue}
            className="w-full h-10 xs:h-11 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-lg font-medium transition-colors text-sm xs:text-base"
          >
            Continue
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
