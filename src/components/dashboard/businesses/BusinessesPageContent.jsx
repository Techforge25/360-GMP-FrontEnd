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
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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
      <span className="text-[#240457] max-w-[1400px] mx-auto block py-3 sm:py-4 px-3 sm:px-6 lg:px-20 text-sm sm:text-sm">Business List</span>
      <main className="pb-16 sm:pb-20 lg:pb-24">
        <BusinessHero
          query={query}
          setQuery={setQuery}
          location={location}
          setLocation={setLocation}
          onSearch={handleSearch}
        />

        <div className="mx-auto px-3 sm:px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 max-w-[1400px] mx-auto">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden w-full flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-3 mb-4 hover:bg-gray-50 transition-colors"
            >
              <CiMenuBurger className="w-5 h-5 text-[#240457]" />
              <span className="font-medium text-gray-700">Filters</span>
            </button>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="top-4">
                <FilterSidebar />
              </div>
            </aside>

            {/* Mobile Filter Modal */}
            {isMobileFilterOpen && (
              <>
                {/* Backdrop */}
                <div 
                  className="lg:hidden fixed inset-0 bg-black/50 z-50"
                  onClick={() => setIsMobileFilterOpen(false)}
                />
                
                {/* Modal */}
                <div className="lg:hidden fixed inset-x-4 top-4 bottom-4 z-50 bg-white rounded-lg shadow-2xl overflow-y-auto">
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900 text-lg">Filters</h3>
                    <button
                      onClick={() => setIsMobileFilterOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <span className="sr-only">Close</span>
                      ×
                    </button>
                  </div>
                  <div className="p-4">
                    <FilterSidebar />
                  </div>
                </div>
              </>
            )}

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
                <h2 className="text-lg sm:text-xl text-center lg:text-left font-medium text-black">
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
                    className="bg-[#240457] mx-auto lg:mx-0 text-white text-sm sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5"
                  >
                    <span className="mr-1 sm:mr-2">
                      <CiMenuBurger className="w-3 h-3 sm:w-4 sm:h-4" />
                    </span>{" "}
                    Open Map
                  </Button>
                </div>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="flex justify-center items-center py-12 sm:py-16">
                  <div className="text-center">
                    <div className="w-8 h-8 border-3 border-gray-300 border-t-[#240457] rounded-full animate-spin mx-auto mb-4"></div>
                    <div className="text-gray-500 text-sm sm:text-base">
                      Loading business profiles...
                    </div>
                  </div>
                </div>
              )}

              {/* Error State */}
              {error && !loading && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 mb-4">
                  <p className="text-red-600 text-sm sm:text-base">
                    <strong>Error:</strong> {error}
                  </p>
                  <button
                    onClick={fetchBusinessProfiles}
                    className="mt-2 text-sm sm:text-sm text-red-700 underline hover:text-red-800 transition-colors"
                  >
                    Try again
                  </button>
                </div>
              )}

              {/* Business List */}
              {!loading && !error && filteredBusinesses.length > 0 && (
                <div className="space-y-3 sm:space-y-4">
                  {filteredBusinesses.map((biz, i) => (
                    <BusinessCard key={i} business={biz} />
                  ))}
                </div>
              )}

              {/* Empty State */}
              {!loading && !error && businesses.length === 0 && (
                <div className="text-center py-12 sm:py-16">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CiMenuBurger className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-base font-medium mb-2">No business profiles found</p>
                  <p className="text-gray-400 text-sm">Try adjusting your search criteria</p>
                </div>
              )}

              {/* Pagination */}
              {!loading && businesses.length > 0 && (
                <div className="flex justify-center items-center mt-8 sm:mt-12 gap-1 sm:gap-2 px-2">
                  <button className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-100 rounded text-gray-500 text-sm sm:text-sm lg:text-base hover:bg-gray-200 transition-colors">
                    Prev
                  </button>
                  <button className="px-2 sm:px-3 py-1 sm:py-1.5 bg-[#240457] text-white rounded text-sm sm:text-sm lg:text-base">
                    1
                  </button>
                  <button className="hidden sm:block px-3 py-1.5 bg-white border border-gray-200 rounded text-gray-600 text-sm lg:text-base hover:bg-gray-50 transition-colors">
                    2
                  </button>
                  <button className="hidden sm:block px-3 py-1.5 bg-white border border-gray-200 rounded text-gray-600 text-sm lg:text-base hover:bg-gray-50 transition-colors">
                    3
                  </button>
                  <button className="hidden md:block px-3 py-1.5 bg-white border border-gray-200 rounded text-gray-600 text-sm lg:text-base hover:bg-gray-50 transition-colors">
                    4
                  </button>
                  <span className="hidden md:block text-gray-400 text-sm">...</span>
                  <button className="hidden sm:block px-3 py-1.5 bg-white border border-gray-200 rounded text-gray-600 text-sm lg:text-base hover:bg-gray-50 transition-colors">
                    352
                  </button>
                  <button className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-100 rounded text-gray-500 text-sm sm:text-sm lg:text-base hover:bg-gray-200 transition-colors">
                    <span className="hidden sm:inline">Next &gt;</span>
                    <span className="sm:hidden">&gt;</span>
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
