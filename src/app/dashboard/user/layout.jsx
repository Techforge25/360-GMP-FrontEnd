"use client";
import React from "react";
import Footer from "@/components/landing/Footer";
import AuthNavbar from "@/components/dashboard/AuthNavbar";
import RoleGuard from "@/components/auth/RoleGuard";
import { usePathname } from "next/navigation";

export default function UserDashboardLayout({ children }) {
  const pathname = usePathname();
    const hideFooterRoutes = [
      "/dashboard/user/profile",
      "/dashboard/user/products",
      "/dashboard/user/wallet",
      "/dashboard/user/orders",
      "/dashboard/user/support",
      "/dashboard/user/subscriptions",
    ];
  
    const shouldHideFooter = hideFooterRoutes.includes(pathname);
  
    return (
      <RoleGuard allowedRoles={["user", "paid_user", "free_trial"]}>
        <div className="flex flex-col">
          <AuthNavbar />
  
          <main className="flex-1">{children}</main>
  
          {!shouldHideFooter && <Footer />}
        </div>
      </RoleGuard>
    );
}
