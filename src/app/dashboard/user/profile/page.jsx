"use client";
import React, { useState } from "react";
import UserProfileHeader from "@/components/dashboard/userProfile/UserProfileHeader";
import UserStats from "@/components/dashboard/userProfile/UserStats";
import UserAbout from "@/components/dashboard/userProfile/UserAbout";
import UserExperience from "@/components/dashboard/userProfile/UserExperience";
import UserSidebar from "@/components/dashboard/userProfile/UserSidebar";
import DashboardFooter from "@/components/dashboard/DashboardFooter";

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState("Profile");

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Profile Header */}
      <UserProfileHeader activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-8">
        {activeTab === "Profile" ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content Column */}
            <div className="flex-1 space-y-8">
              {/* Profile Stats / Summary */}
              <UserStats />

              {/* About Section */}
              <UserAbout />

              {/* Experience Section */}
              <UserExperience />
            </div>

            {/* Right Sidebar Column */}
            <div className="w-full lg:w-[350px] space-y-8">
              <UserSidebar />
            </div>
          </div>
        ) : (
          <div className="bg-white p-12 rounded-xl text-center text-gray-500 shadow-sm border border-gray-100 min-h-[400px] flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Coming Soon
            </h3>
            <p>The {activeTab} section is currently under development.</p>
          </div>
        )}
      </div>

      <DashboardFooter />
    </div>
  );
}
