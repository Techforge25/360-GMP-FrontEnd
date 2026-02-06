"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiDownload } from "react-icons/fi";
import ProfilePerformanceSection from "@/components/dashboard/analytics/ProfilePerformanceSection";
import ProductSalesSection from "@/components/dashboard/analytics/ProductSalesSection";
import HiringMarketSection from "@/components/dashboard/analytics/HiringMarketSection";

export default function BusinessAnalyticsPage() {
  const router = useRouter();
  const [sortBy, setSortBy] = useState("Last 7 Days");

  const handleBack = () => {
    router.back();
  };

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log("Exporting analytics data...");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FiArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Back</span>
              </button>
              <div className="border-l border-gray-300 h-6"></div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Analytics Overview
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  Track your business performance and growth
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 font-medium">
                  Sort By
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border text-black border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#240457] bg-white"
                >
                  <option value="Last 7 Days">Last 7 Days</option>
                  <option value="Last 30 Days">Last 30 Days</option>
                  <option value="Last 90 Days">Last 90 Days</option>
                  <option value="Last Year">Last Year</option>
                </select>
              </div>

              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <span>Export</span>
                <FiDownload className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Section 1: Profile Performance */}
        <ProfilePerformanceSection />

        {/* Section 2: Product & Sales */}
        <ProductSalesSection />

        {/* Section 3: Hiring & Market Trends */}
        <HiringMarketSection />
      </div>
    </div>
  );
}
