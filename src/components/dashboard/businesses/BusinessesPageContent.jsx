"use client";
import React, { useState, useEffect } from "react";
import BusinessHero from "@/components/dashboard/businesses/BusinessHero";
import BusinessCard from "@/components/dashboard/businesses/BusinessCard";
import FilterSidebar from "@/components/dashboard/businesses/FilterSidebar";
import { Button } from "@/components/ui/Button";
import { CiMenuBurger } from "react-icons/ci";
import businessProfileAPI from "@/services/businessProfileAPI";

export default function BusinessesPageContent() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);

  useEffect(() => {
    fetchBusinessProfiles();
  }, []);

  useEffect(() => {
    // Initialize filtered list when data loads
    if (businesses.length > 0) {
      setFilteredBusinesses(businesses);
    }
  }, [businesses]);

  const fetchBusinessProfiles = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await businessProfileAPI.getAll();

      console.log("Business Profile API Response:", response);

      if (response.success && response.data) {
        // Backend returns paginated data: { docs: [...], totalDocs, hasNextPage, etc. }
        const businessData = response.data.docs || response.data;

        console.log("Extracted business data:", businessData);

        // Transform backend data to match component expectations
        const transformedData = Array.isArray(businessData)
          ? businessData.map(transformBusinessProfile)
          : [transformBusinessProfile(businessData)];

        setBusinesses(transformedData);
        setFilteredBusinesses(transformedData);
      } else {
        console.warn("No business profiles in response or invalid structure");
        setBusinesses([]);
        setFilteredBusinesses([]);
      }
    } catch (err) {
      console.error("Failed to fetch business profiles:", err);
      setError(err.message || "Failed to load business profiles");
    } finally {
      setLoading(false);
    }
  };

  const filterBusinesses = () => {
    let filtered = businesses;

    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(
        (biz) =>
          biz.name.toLowerCase().includes(lowerQuery) ||
          biz.category.toLowerCase().includes(lowerQuery) ||
          (biz.tags &&
            biz.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))),
      );
    }

    if (location) {
      const lowerLocation = location.toLowerCase();
      filtered = filtered.filter((biz) =>
        biz.location.toLowerCase().includes(lowerLocation),
      );
    }

    setFilteredBusinesses(filtered);
  };

  const handleSearch = () => {
    filterBusinesses();
  };

  // Transform backend schema to component schema
  const transformBusinessProfile = (profile) => {
    return {
      id: profile._id || profile.id || "mock-id", // Add ID for routing
      name: profile.companyName || "Unknown Company",
      description: profile.description || "No description available",
      verified: profile.certifications?.length > 0 || false,
      location: profile.location
        ? `${profile.location.city || ""}, ${profile.location.country || ""}`
        : "Location not specified",
      rating: 4.8, // Default rating (backend doesn't provide this yet)
      reviews: 124, // Default reviews count
      category: profile.businessType || profile.primaryIndustry || "General",
      established: profile.foundedDate
        ? new Date(profile.foundedDate).getFullYear().toString()
        : "N/A",
      stats: {
        minOrder: "Contact for details",
        responseRate: ">95%", // Default value
        onTime: "98%", // Default value
        transactions: "Supplier",
        products: "Contact for details",
      },
      actions: {
        website: profile.website || "#",
        directions: profile.location?.addressLine || "#",
        contact: profile.b2bContact?.phone || "#",
        profile: "#",
      },
      logo: profile.logo || "/assets/images/profileLogo.png",
      banner: profile.banner || null,
      sponsored: false,
      // Additional data from backend
      companySize: profile.companySize,
      operationHour: profile.operationHour,
      certifications: profile.certifications,
      b2bContact: profile.b2bContact,
    };
  };

  return (
    <div className="w-full bg-white">
      <span className="text-[#240457] max-w-7xl mx-auto block py-4 text-sm">Business List</span>
      <main className="pb-24">
        <BusinessHero
          query={query}
          setQuery={setQuery}
          location={location}
          setLocation={setLocation}
          onSearch={handleSearch}
        />

        <div className="mx-auto px-4 sm:px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
            {/* Sidebar */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <FilterSidebar />
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium text-black">
                  {loading
                    ? "Loading..."
                    : `${filteredBusinesses.length} ${
                        filteredBusinesses.length === 1
                          ? "Registered Company"
                          : "Registered Companies"
                      } `}
                </h2>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    className="bg-[#240457] text-white text-sm"
                  >
                    <span className="mr-1">
                      <CiMenuBurger />
                    </span>{" "}
                    Open Map
                  </Button>
                </div>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="flex justify-center items-center py-12">
                  <div className="text-gray-500">
                    Loading business profiles...
                  </div>
                </div>
              )}

              {/* Error State */}
              {error && !loading && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <p className="text-red-600 text-base">
                    <strong>Error:</strong> {error}
                  </p>
                  <button
                    onClick={fetchBusinessProfiles}
                    className="mt-2 text-sm text-red-700 underline hover:text-red-800"
                  >
                    Try again
                  </button>
                </div>
              )}

              {/* Business List */}
              {!loading && !error && filteredBusinesses.length > 0 && (
                <div className="space-y-4">
                  {filteredBusinesses.map((biz, i) => (
                    <BusinessCard key={i} business={biz} />
                  ))}
                </div>
              )}

              {/* Empty State */}
              {!loading && !error && businesses.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No business profiles found.</p>
                </div>
              )}

              {/* Pagination */}
              {!loading && businesses.length > 0 && (
                <div className="flex justify-center items-center mt-12 gap-2">
                  <button className="px-3 py-1 bg-gray-100 rounded text-gray-500 text-base hover:bg-gray-200">
                    Prev
                  </button>
                  <button className="px-3 py-1 bg-[#240457] text-white rounded text-base">
                    1
                  </button>
                  <button className="px-3 py-1 bg-white border border-gray-200 rounded text-gray-600 text-base hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-3 py-1 bg-white border border-gray-200 rounded text-gray-600 text-base hover:bg-gray-50">
                    3
                  </button>
                  <button className="px-3 py-1 bg-white border border-gray-200 rounded text-gray-600 text-base hover:bg-gray-50">
                    4
                  </button>
                  <span className="text-gray-400">...</span>
                  <button className="px-3 py-1 bg-white border border-gray-200 rounded text-gray-600 text-base hover:bg-gray-50">
                    352
                  </button>
                  <button className="px-3 py-1 bg-gray-100 rounded text-gray-500 text-base hover:bg-gray-200">
                    Next &gt;
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
