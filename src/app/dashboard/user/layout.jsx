import DashboardShell from "@/components/dashboard/DashboardShell";

export default function UserDashboardLayout({ children }) {
  return (
    <DashboardShell
      allowedRoles={["user", "paid_user", "free_trial"]}
      hiddenFooterRoutes={[
        "/dashboard/user/profile",
        "/dashboard/user/products",
        "/dashboard/user/wallet",
        "/dashboard/user/orders",
        "/dashboard/user/support",
        "/dashboard/user/subscriptions",
        "/dashboard/user/checkout",
      ]}
    >
      {children}
    </DashboardShell>
  );
}
