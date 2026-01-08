"use client";
import React from "react";
import AuthNavbar from "@/components/dashboard/AuthNavbar";
import Footer from "@/components/landing/Footer";
import DashboardHero from "@/components/dashboard/DashboardHero";
import BusinessGrid from "@/components/dashboard/BusinessGrid";
import CommunitySection from "@/components/dashboard/CommunitySection";
import ProductSections from "@/components/dashboard/ProductSections";
import JobSection from "@/components/dashboard/JobSection";

export default function UserDashboard() {
  // Setup for User Dashboard - reusing components but allows for future divergence
  return (
    <div className="min-h-screen bg-white">
      {/* User-specific Navbar config could be passed here if needed */}
      <AuthNavbar />
      <main>
        <DashboardHero />

        {/* Users might prioritize Jobs or Products over Business Listings, but structure is currently identical */}
        <BusinessGrid />
        <CommunitySection />
        <ProductSections />
        <JobSection />
      </main>
      <Footer />
    </div>
  );
}
