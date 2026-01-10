"use client";
import React from "react";
import DashboardHero from "@/components/dashboard/DashboardHero";
import BusinessGrid from "@/components/dashboard/BusinessGrid";
import CommunitySection from "@/components/dashboard/CommunitySection";
import ProductSections from "@/components/dashboard/ProductSections";
import JobSection from "@/components/dashboard/JobSection";

export default function BusinessDashboard() {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/mock/dashboard");
        if (res.ok) {
          const json = await res.json();
          console.log("Dashboard data:", json);
          setData(json);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <DashboardHero />

      {loading ? (
        <div className="flex h-96 items-center justify-center">
          <div className="animate-spin h-8 w-8 border-2 border-brand-primary border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <>
          <BusinessGrid businesses={data?.featuredBusinesses} />
          <CommunitySection communities={data?.communities} />
          <ProductSections products={data?.products} />
          <JobSection jobs={data?.latestJobs} />
        </>
      )}
    </div>
  );
}
