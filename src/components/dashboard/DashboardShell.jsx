"use client";

import Footer from "@/components/landing/Footer";
import AuthNavbar from "@/components/dashboard/AuthNavbar";
import RoleGuard from "@/components/auth/RoleGuard";
import { usePathname } from "next/navigation";

const matchesHiddenRoute = (pathname, hiddenRoutes) => {
  return hiddenRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
};

export default function DashboardShell({
  children,
  allowedRoles,
  hiddenFooterRoutes = [],
}) {
  const pathname = usePathname();
  const shouldHideFooter = matchesHiddenRoute(pathname, hiddenFooterRoutes);

  return (
    <RoleGuard allowedRoles={allowedRoles}>
      <div className="flex min-h-screen flex-col">
        <AuthNavbar />
        <main className="flex-1">{children}</main>
        {!shouldHideFooter && <Footer />}
      </div>
    </RoleGuard>
  );
}
