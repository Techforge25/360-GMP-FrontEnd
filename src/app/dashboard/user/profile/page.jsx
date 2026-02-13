"use client";
import React, { useState } from "react";
import UserProfileHeader from "@/components/dashboard/userProfile/UserProfileHeader";
import UserStats from "@/components/dashboard/userProfile/UserStats";
import UserAbout from "@/components/dashboard/userProfile/UserAbout";
import UserExperience from "@/components/dashboard/userProfile/UserExperience";
import UserEducation from "@/components/dashboard/userProfile/UserEducation";
import UserJobPreferences from "@/components/dashboard/userProfile/UserJobPreferences";
import UserSidebar from "@/components/dashboard/userProfile/UserSidebar";
import UserApplications from "@/components/dashboard/userProfile/UserApplications";
import UserCommunities from "@/components/dashboard/userProfile/UserCommunities";
// import RecentlyViewedProducts from "@/components/dashboard/userProfile/RecentlyViewedProducts";
// import UserOrders from "@/components/dashboard/userProfile/UserOrders";
import DashboardFooter from "@/components/dashboard/DashboardFooter";

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState("Profile");

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Profile Header */}
      <UserProfileHeader activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 mt-4 sm:mt-6 lg:mt-8 mb-6 sm:mb-8">
        {activeTab === "Profile" ? (
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
            {/* Main Content Column */}
            <div className="flex-1 space-y-4 sm:space-y-6 lg:space-y-8 min-w-0">
              {/* Profile Stats / Summary */}
              <UserStats />

              {/* About Section */}
              <UserAbout />

              {/* Experience Section */}
              <UserExperience />

              {/* Education and Job Preferences Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                <UserEducation />
                <UserJobPreferences />
              </div>

              {/* Recently Viewed Products */}
              {/* <RecentlyViewedProducts /> */}
            </div>

            {/* Right Sidebar Column */}
            <div className="w-full lg:w-[350px] xl:w-[380px] lg:flex-shrink-0 space-y-4 sm:space-y-6 lg:space-y-8">
              <UserSidebar />
            </div>
          </div>
        ) : activeTab === "Jobs" ? (
          <div className="w-full">
            <UserApplications />
          </div>
        ) : activeTab === "Communities" ? (
          <div className="w-full">
            <UserCommunities />
          </div>
        ) : (
          // Disabled
          // : activeTab === "Orders" ? (
          //   <UserOrders />
          // )
          <div className="bg-white p-6 sm:p-8 lg:p-12 rounded-lg sm:rounded-xl text-center text-gray-500 shadow-sm border border-gray-100 min-h-[300px] sm:min-h-[400px] flex flex-col items-center justify-center">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              Coming Soon in phase 5
            </h3>
            <p className="text-sm sm:text-base px-4">
              The {activeTab} section is currently under development.
            </p>
          </div>
        )}
      </div>

      <DashboardFooter />
    </div>
  );
}
