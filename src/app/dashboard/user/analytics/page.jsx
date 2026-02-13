"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiDownload, FiChevronDown } from "react-icons/fi";
import ProfileSummarySection from "@/components/dashboard/userAnalytics/ProfileSummarySection";
import ViewsOverTimeSection from "@/components/dashboard/userAnalytics/ViewsOverTimeSection";
import TopSearchKeywordsSection from "@/components/dashboard/userAnalytics/TopSearchKeywordsSection";
import InterviewRateSection from "@/components/dashboard/userAnalytics/InterviewRateSection";
import ApplicationFunnelSection from "@/components/dashboard/userAnalytics/ApplicationFunnelSection";
import TopCategoriesSection from "@/components/dashboard/userAnalytics/TopCategoriesSection";
import SalaryDistributionSection from "@/components/dashboard/userAnalytics/SalaryDistributionSection";

const UserAnalyticsPage = () => {
  const router = useRouter();

  return (
    <div className="bg-white/70">
    <div className="max-w-[1400px] mx-auto p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Analytics Overview
          </h1>
          <p className="text-gray-500 text-sm">
            Track your application success and profile visibility
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort By</span>
            <div className="relative">
              <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                Last 7 Days
                <FiChevronDown className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
          {/* <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            Export
            <FiDownload className="w-4 h-4 text-gray-500" />
          </button> */}
        </div>
      </div>

      {/* Profile Summary */}
      <ProfileSummarySection />

      {/* Grid Layout for Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Views Over Time (2/3 width) - Row 1 */}
        <ViewsOverTimeSection />

        {/* Top Search Keywords (1/3 width) - Row 1 */}
        <TopSearchKeywordsSection />

        {/* Application Funnel (will be 2/3 width) - Row 2 Left */}
        <ApplicationFunnelSection />

        {/* Interview Rate (1/3 width) - Row 2 Right */}
        <div className="row-span-2">
          <InterviewRateSection />
        </div>

        {/* Top Categories */}
        <TopCategoriesSection />

        {/* Salary Distribution */}
        <SalaryDistributionSection />
      </div>
    </div>
    </div>
  );
};

export default UserAnalyticsPage;
