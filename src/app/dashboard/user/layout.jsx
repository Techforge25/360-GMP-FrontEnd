"use client";
import React from "react";
import Footer from "@/components/landing/Footer";
import AuthNavbar from "@/components/dashboard/AuthNavbar";
import RoleGuard from "@/components/auth/RoleGuard";

export default function UserDashboardLayout({ children }) {
  return (
    <RoleGuard allowedRoles={["user", "paid_user", "free_trial"]}>
      <div className="flex flex-col">
        <AuthNavbar />

        <main className="flex-1">{children}</main>

        <Footer />
      </div>
    </RoleGuard>
  );
}
