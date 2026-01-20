"use client";
import React from "react";
import ProfileHeader from "@/components/dashboard/profile/ProfileHeader";
import AnalyticsSection from "@/components/dashboard/profile/AnalyticsSection";
import FeatureProduct from "@/components/dashboard/profile/FeatureProduct";
import ActivitySidebar from "@/components/dashboard/profile/ActivitySidebar";
import DashboardFooter from "@/components/dashboard/DashboardFooter";

export default function BusinessProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Profile Header */}
      <ProfileHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-8">
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
      </div>
      <DashboardFooter />
    </div>
  );
}
