"use client";
import React from "react";
import Footer from "@/components/landing/Footer";
import AuthNavbar from "@/components/dashboard/AuthNavbar";
import RoleGuard from "@/components/auth/RoleGuard";

import { usePathname } from "next/navigation";

export default function BusinessDashboardLayout({ children }) {
  const pathname = usePathname();
  const hideFooterRoutes = [
    "/dashboard/business/profile",
    "/dashboard/business/products",
    "/dashboard/business/wallet",
    "/dashboard/business/orders",
    "/dashboard/business/support",
    "/dashboard/business/subscriptions",
  ];

  const shouldHideFooter = hideFooterRoutes.includes(pathname);

  return (
    <RoleGuard allowedRoles={["business"]}>
      <div className="flex flex-col">
        <AuthNavbar />

        <main className="flex-1">{children}</main>

        {!shouldHideFooter && <Footer />}
      </div>
    </RoleGuard>
  );
}
