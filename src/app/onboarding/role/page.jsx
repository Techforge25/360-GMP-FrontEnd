"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { RoleSelectionCard } from "@/components/ui/RoleSelectionCard";

export default function RoleSelectionPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("business");

  const handleContinue = () => {
    router.push(`/onboarding/plans?role=${selectedRole}`);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="fixed inset-0 -z-10">
        <img
          src="/assets/images/authBG.png"
          alt="Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <Card className="w-full max-w-2xl border-none shadow-xl bg-surface-elevated z-10 relative">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-brand-primary to-brand-primary-light bg-clip-text text-transparent">
            Welcome To 360 GMP
          </CardTitle>
          <CardDescription className="text-text-secondary">
            One Platform Many Solutions
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          <div className="space-y-4">
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
            className="w-full h-11 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-md font-medium transition-colors"
          >
            Continue
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
