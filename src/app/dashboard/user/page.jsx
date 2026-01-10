"use client";
import React from "react";
import DashboardHero from "@/components/dashboard/DashboardHero";
import BusinessGrid from "@/components/dashboard/BusinessGrid";
import CommunitySection from "@/components/dashboard/CommunitySection";
import ProductSections from "@/components/dashboard/ProductSections";
import JobSection from "@/components/dashboard/JobSection";

export default function UserDashboard() {
  // Setup for User Dashboard - reusing components but allows for future divergence
  return (
    <div className="min-h-screen bg-white">
      <DashboardHero />

      {/* Users might prioritize Jobs or Products over Business Listings, but structure is currently identical */}
      <BusinessGrid />
      <CommunitySection />
      <ProductSections />
      <JobSection />
    </div>
  );
}
