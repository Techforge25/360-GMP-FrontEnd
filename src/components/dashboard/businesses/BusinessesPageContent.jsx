"use client";
import React, { useState, useEffect } from "react";
import BusinessHero from "@/components/dashboard/businesses/BusinessHero";
import BusinessCard from "@/components/dashboard/businesses/BusinessCard";
import FilterSidebar from "@/components/dashboard/businesses/FilterSidebar";
import { Button } from "@/components/ui/Button";
import { CiMenuBurger } from "react-icons/ci";
import { FiX } from "react-icons/fi";
import businessProfileAPI from "@/services/businessProfileAPI";

export default function BusinessesPageContent() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [filteredBusinesses, setFilteredBusinesses] = useState([]); // Keep for compatibility with render
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedBusinessContact, setSelectedBusinessContact] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10);

  const [filters, setFilters] = useState({
    industries: [],
    countries: [],
    ratings: [],
  });

  useEffect(() => {
    fetchBusinessProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, query, location, filters]);

  // Reset page when filters change (handled in handleFilterChange usually, but good to have safety)
  // However, handleFilterChange is cleaner.

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const fetchBusinessProfiles = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page: currentPage,
        limit: itemsPerPage,
        search: query,
        sort: "-_id",
      };

      // Handle location prop vs filter
      if (location) {
        params.country = location;
        // params.city = location
      } else if (filters.countries.length > 0) {
        params.country = filters.countries.join("|");
        // params.city = filters.cities.join("|");
      }

      if (filters.industries.length > 0) {
        params.industry = filters.industries.join("|");
      }

      const response = await businessProfileAPI.getAll(params);

      if (response.success && response.data) {
        const docs = response.data.docs || response.data || [];

        // Frontend sorting fallback to ensure chronological order on the current page
        const sortedDocs = [...docs].sort((a, b) => {
          const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          if (timeA && timeB) return timeB - timeA;
          // Fallback to MongoDB ID comparison (lexicographical comparison of hex IDs is roughly chronological)
          return (b._id || "").localeCompare(a._id || "");
        });

        const transformed = sortedDocs.map(transformBusinessProfile);

        setBusinesses(transformed);
        setFilteredBusinesses(transformed); // "filtered" is now just the current page data
        setTotalPages(response.data.totalPages || 1);
        setCurrentPage(response.data.page || 1);
      } else {
        setBusinesses([]);
        setFilteredBusinesses([]);
        setTotalPages(1);
      }
    } catch (err) {
      console.error("Failed to fetch business profiles:", err);
      setError(err.message || "Failed to load business profiles");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSearch = () => {
    setCurrentPage(1); // Trigger fetch via useEffect dependency
  };

  // Transform backend schema to component schema
  const transformBusinessProfile = (profile) => {
    return {
      id: profile._id || profile.id || "mock-id",
      name: profile.companyName || "Unknown Company",
      description: profile.description || "No description available",
      verified: profile.certifications?.length > 0 || false,
      location: profile.location
        ? `${profile.location.city || ""}, ${profile.location.country || ""}`
        : "Location not specified",
      rating: "N/A",
      // reviews: "N/A",
      category: profile.businessType || profile.primaryIndustry || "General",
      established: profile.foundedDate
        ? new Date(profile.foundedDate).getFullYear().toString()
        : "N/A",
      stats: {
        minOrder: "Contact for details",
        responseRate: ">95%",
        onTime: "98%",
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
      companySize: profile.companySize,
      operationHour: profile.operationHour,
      certifications: profile.certifications,
      b2bContact: profile.b2bContact,
      // Added for Map/Directions
      rawLocation: profile.location,
      latitude: profile.latitude,
      longitude: profile.longitude,
    };
  };

  const handleContactClick = (business) => {
    setSelectedBusinessContact(business);
    setShowContactModal(true);
  };

  return (
    <div className="w-full bg-white">
      <span className="text-[#240457] max-w-[1400px] mx-auto block py-3 sm:py-4 text-sm sm:text-sm">
        Business List
      </span>
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
                <FilterSidebar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                />
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
                    <h3 className="font-semibold text-gray-900 text-lg">
                      Filters
                    </h3>
                    <button
                      onClick={() => setIsMobileFilterOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <span className="sr-only">Close</span>×
                    </button>
                  </div>
                  <div className="p-4">
                    <FilterSidebar
                      filters={filters}
                      onFilterChange={handleFilterChange}
                    />
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
                    : `${businesses.length} ${
                        businesses.length === 1
                          ? "Registered Company"
                          : "Registered Companies"
                      } `}
                </h2>

                {/* <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    className="bg-[#240457] mx-auto lg:mx-0 text-white text-sm sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5"
                  >
                    <span className="mr-1 sm:mr-2">
                      <CiMenuBurger className="w-3 h-3 sm:w-4 sm:h-4" />
                    </span>{" "}
                    Open Map
                  </Button>
                </div> */}
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
              {!loading && !error && businesses.length > 0 && (
                <div className="space-y-3 sm:space-y-4">
                  {businesses.map((biz, i) => (
                    <BusinessCard
                      key={i}
                      business={biz}
                      onContactClick={handleContactClick}
                    />
                  ))}
                </div>
              )}

              {/* Empty State */}
              {!loading && !error && businesses.length === 0 && (
                <div className="text-center py-12 sm:py-16">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CiMenuBurger className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-base font-medium mb-2">
                    No business profiles found
                  </p>
                  <p className="text-gray-400 text-sm">
                    Try adjusting your search criteria
                  </p>
                </div>
              )}

              {/* Pagination */}
              {!loading && businesses.length > 0 && totalPages > 1 && (
                <div className="flex justify-center items-center mt-8 sm:mt-12 gap-1 sm:gap-2 px-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-100 rounded text-gray-500 text-sm sm:text-sm lg:text-base hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Prev
                  </button>

                  {/* Dynamic Page Numbers */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-1.5 rounded text-sm lg:text-base transition-colors ${
                          currentPage === pageNum
                            ? "bg-[#240457] text-white"
                            : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-100 rounded text-gray-500 text-sm sm:text-sm lg:text-base hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="hidden sm:inline">Next &gt;</span>
                    <span className="sm:hidden">&gt;</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Info Modal */}
        {showContactModal && selectedBusinessContact && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  Contact Information
                </h3>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FiX className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                {/* Business Name */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Business Name</p>
                  <p className="text-base font-semibold text-gray-900">
                    {selectedBusinessContact.name}
                  </p>
                </div>

                {/* Phone */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                  <a
                    href={`tel:${selectedBusinessContact.actions?.contact || "#"}`}
                    className="text-base text-[#240457] hover:underline"
                  >
                    {selectedBusinessContact.actions?.contact ||
                      "Not available"}
                  </a>
                </div>

                {/* Location */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Location</p>
                  <p className="text-base text-gray-900">
                    {selectedBusinessContact.location}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <a
                    href={`tel:${selectedBusinessContact.actions?.contact || "#"}`}
                    className="flex-1 bg-[#240457] text-white px-4 py-2 rounded-lg text-center font-medium hover:bg-[#1a0340] transition-colors"
                  >
                    Call Now
                  </a>
                  <button
                    onClick={() => setShowContactModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
