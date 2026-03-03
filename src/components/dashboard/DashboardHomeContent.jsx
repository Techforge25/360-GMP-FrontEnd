import DashboardHero from "@/components/dashboard/DashboardHero";
import BusinessGrid from "@/components/dashboard/BusinessGrid";
import CommunitySection from "@/components/dashboard/CommunitySection";
import ProductSections from "@/components/dashboard/ProductSections";
import JobSection from "@/components/dashboard/JobSection";

export default function DashboardHomeContent() {
  return (
    <div className="bg-white">
      <DashboardHero />
      <BusinessGrid />
      <CommunitySection />
      <ProductSections />
      <JobSection />
    </div>
  );
}
