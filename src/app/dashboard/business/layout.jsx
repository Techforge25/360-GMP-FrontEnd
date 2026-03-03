import DashboardShell from "@/components/dashboard/DashboardShell";

export default function BusinessDashboardLayout({ children }) {
  return (
    <DashboardShell
      allowedRoles={["business"]}
      hiddenFooterRoutes={[
        "/dashboard/business/profile",
        "/dashboard/business/products",
        "/dashboard/business/wallet",
        "/dashboard/business/orders",
        "/dashboard/business/support",
        "/dashboard/business/subscriptions",
        "/dashboard/orders/BusinessOrderDetailsPage",
      ]}
    >
      {children}
    </DashboardShell>
  );
}
