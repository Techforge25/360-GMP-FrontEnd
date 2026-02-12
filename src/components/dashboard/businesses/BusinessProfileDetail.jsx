"use client";
import React, { useState, useEffect } from "react";
import ProfileHeader from "./profile/ProfileHeader";
import ProfileOverview from "./profile/ProfileOverview";
import ProfileJobs from "./profile/ProfileJobs";
import ProfileProducts from "./profile/ProfileProducts";
import ProfileCommunities from "./profile/ProfileCommunities";
import ProfileGallery from "./profile/ProfileGallery";
import ProfileTestimonials from "./profile/ProfileTestimonials";
import businessProfileAPI from "@/services/businessProfileAPI";

export default function BusinessProfileDetail({ businessId }) {
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (businessId) {
      fetchBusinessProfile();
    }
  }, [businessId]);

  const fetchBusinessProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await businessProfileAPI.viewBusinessProfile(businessId);

      console.log("Business Profile Detail API Response:", response);

      if (response.success && response.data) {
        // Transform the data to match component expectations
        const transformedData = {
          ...response.data,
          name: response.data.companyName || "Unknown Company",
          location: response.data.location || null,
          displayLocation: response.data.location
            ? `${response.data.location.city || ""}, ${response.data.location.country || ""}`
                .replace(/^,\s*/, "")
                .replace(/,\s*$/, "")
            : "Location not specified",
          verified:
            response.data.isVerified ||
            response.data.certifications?.length > 0 ||
            false,
          employees: response.data.companySize || "N/A",
          age: response.data.foundedDate
            ? `${new Date().getFullYear() - new Date(response.data.foundedDate).getFullYear()} yrs`
            : "N/A",
          industry:
            response.data.primaryIndustry ||
            response.data.businessType ||
            "General",
          rating: 4.9, // Default until backend provides ratings
          stats: {
            delivery: "100%",
            reorder: "<15%",
            response: "≤6h",
            revenue: "USD $3.6M+",
            products: "210",
          },
        };
        setBusinessData(transformedData);
      } else {
        setError("Failed to load business profile");
      }
    } catch (err) {
      console.error("Failed to fetch business profile:", err);
      setError(err.message || "Failed to load business profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center py-20">
            <div className="text-gray-500 text-lg">
              Loading business profile...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 text-lg mb-4">
              <strong>Error:</strong> {error}
            </p>
            <button
              onClick={fetchBusinessProfile}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!businessData) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Business profile not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Full width banner section */}
      <div className="w-full">
        <ProfileHeader business={businessData} />
      </div>

      {/* Constrained content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileOverview business={businessData} />
        <ProfileJobs businessId={businessId} />
        <ProfileProducts businessId={businessId} />
        <ProfileCommunities businessId={businessId} />
        <ProfileGallery businessProfileId={businessId} />
        <ProfileTestimonials />
      </div>
    </div>
  );
}
