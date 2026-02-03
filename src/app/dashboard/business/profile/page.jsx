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

  return (
    <div className="bg-gray-50">
      {/* Profile Header */}
      <ProfileHeader activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-8">
        {activeTab === "Home" ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content Column */}
            <div className="flex-1 space-y-8">
              {/* Analytics Section */}
              <AnalyticsSection />

              {/* Feature Products */}
              <FeatureProduct />
            </div>

            {/* Right Sidebar Column */}
            <div className="w-full lg:w-[350px] space-y-8">
              <ActivitySidebar />
            </div>
          </div>
        ) : activeTab === "Product" ? (
          <div className=" overflow-hidden p-4  rounded-xl">
            <ProductListContent isProfileView={true} />
          </div>
        ) : activeTab === "Jobs" ? (
          <BusinessJobsTab />
        ) : activeTab === "About" ? (
          <BusinessAboutTab />
        ) 
        // Disabled
        // : activeTab === "Orders" ? (
        //   <BusinessOrdersTab />
        // ) 
        : activeTab === "Communities" ? (
          <BusinessCommunitiesTab />
        ) : (
          <div className="bg-white p-12 rounded-xl text-center text-gray-500 shadow-sm border border-gray-100">
            {activeTab} content coming soon
          </div>
        )}
      </div>
      <DashboardFooter />
    </div>
  );
}
