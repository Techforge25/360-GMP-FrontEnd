"use client";
import React from "react";
import DashboardHero from "@/components/dashboard/DashboardHero";
import BusinessGrid from "@/components/dashboard/BusinessGrid";
import CommunitySection from "@/components/dashboard/CommunitySection";
import ProductSections from "@/components/dashboard/ProductSections";
import JobSection from "@/components/dashboard/JobSection";

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-white">
      <DashboardHero />
      <BusinessGrid />
      <CommunitySection />
      <ProductSections />
      <JobSection />
    </div>
  );
}
