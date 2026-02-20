"use client";
import React from "react";
import ProfileHeader from "@/components/dashboard/profile/ProfileHeader";
import AnalyticsSection from "@/components/dashboard/profile/AnalyticsSection";
import FeatureProduct from "@/components/dashboard/profile/FeatureProduct";
import ActivitySidebar from "@/components/dashboard/profile/ActivitySidebar";
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import ProductListContent from "@/components/dashboard/products/ProductListContent";
import BusinessJobsTab from "@/components/dashboard/profile/BusinessJobsTab";
import BusinessAboutTab from "@/components/dashboard/profile/BusinessAboutTab";
// import BusinessOrdersTab from "@/components/dashboard/profile/BusinessOrdersTab";
import BusinessCommunitiesTab from "@/components/dashboard/profile/BusinessCommunitiesTab";

export default function BusinessProfilePage() {
  const [activeTab, setActiveTab] = React.useState("Home");
  const [inventoryFilter, setInventoryFilter] = React.useState("");

  const handleInventoryUpdate = () => {
    setInventoryFilter("Low Stock");
    setActiveTab("Product");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Profile Header */}
      <ProfileHeader activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 mt-4 sm:mt-6 lg:mt-8 mb-6 sm:mb-8">
        {activeTab === "Home" ? (
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
            {/* Main Content Column */}
            <div className="flex-1 space-y-4 sm:space-y-6 lg:space-y-8">
              {/* Analytics Section */}
              <AnalyticsSection onUpdateInventory={handleInventoryUpdate} />

              {/* Feature Products */}
              <FeatureProduct onManageClick={() => setActiveTab("Product")} />
            </div>

            {/* Right Sidebar Column */}
            <div className="w-full lg:w-[350px] xl:w-[380px] space-y-4 sm:space-y-6 lg:space-y-8">
              <ActivitySidebar onUpdateInventory={handleInventoryUpdate} />
            </div>
          </div>
        ) : activeTab === "Product" ? (
          <div className="overflow-hidden p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl">
            <ProductListContent
              isProfileView={true}
              initialFilter={inventoryFilter}
              onFilterApplied={() => setInventoryFilter("")}
            />
          </div>
        ) : activeTab === "Jobs" ? (
          <div className="w-full">
            <BusinessJobsTab />
          </div>
        ) : activeTab === "About" ? (
          <div className="w-full">
            <BusinessAboutTab />
          </div>
        ) : // Disabled
          // : activeTab === "Orders" ? (
          //   <BusinessOrdersTab />
          // )
          activeTab === "Communities" ? (
            <div className="w-full">
              <BusinessCommunitiesTab />
            </div>
          ) : (
            <div className="bg-white p-6 sm:p-8 lg:p-12 rounded-lg sm:rounded-xl text-center text-gray-500 shadow-sm border border-gray-100 min-h-[300px] sm:min-h-[400px] flex flex-col items-center justify-center">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                {activeTab} content coming soon
              </h3>
              <p className="text-sm sm:text-base">
                This section is under development.
              </p>
            </div>
          )}
      </div>
      <DashboardFooter />
    </div>
  );
}
