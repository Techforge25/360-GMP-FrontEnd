import { MarketplaceRoutePage } from "@/components/dashboard/routes/SharedDashboardPages";
import { UserProvider } from "@/context/UserContext";

export default function MarketplacePage() {
  return (
    <UserProvider>
      <MarketplaceRoutePage />
    </UserProvider>
  );
}
