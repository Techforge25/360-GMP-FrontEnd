"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
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
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedBusinessContact, setSelectedBusinessContact] = useState(null);

  // Auto-loader State
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [itemsPerPage] = useState(10);
  const sentinelRef = useRef(null);

  const [filters, setFilters] = useState({
    industries: [],
    countries: [],
    ratings: [],
  });

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchInitialBusinessProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, location, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const getQueryParams = (targetPage) => {
    const params = {
      page: targetPage,
      limit: itemsPerPage,
      search: query,
      sort: "-_id",
    };

    if (location) {
      params.country = location;
    } else if (filters.countries.length > 0) {
      params.country = filters.countries.join("|");
    }

    if (filters.industries.length > 0) {
      params.industry = filters.industries.join("|");
    }

    return params;
  };

  const loadMoreBusinesses = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);
      const params = getQueryParams(page);
      const response = await businessProfileAPI.getAll(params);

      if (response.success && response.data) {
        const docs = response.data.docs || response.data || [];
        const sortedDocs = [...docs].sort((a, b) => {
          const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          if (timeA && timeB) return timeB - timeA;
          return (b._id || "").localeCompare(a._id || "");
        });

        const transformed = sortedDocs.map(transformBusinessProfile);

        setBusinesses((prev) => [...prev, ...transformed]);

        const hasNextPage = response.data.hasNextPage !== undefined
          ? response.data.hasNextPage
          : response.data.page < response.data.totalPages;

        setHasMore(hasNextPage);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (err) {
      console.error("Failed to load more businesses:", err);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, page, query, location, filters, itemsPerPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
          loadMoreBusinesses();
        }
      },
      { threshold: 0.5 }
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [loadMoreBusinesses, hasMore, loadingMore, loading]);

  const fetchInitialBusinessProfiles = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = getQueryParams(1);
      const response = await businessProfileAPI.getAll(params);

      if (response.success && response.data) {
        const docs = response.data.docs || response.data || [];

        const sortedDocs = [...docs].sort((a, b) => {
          const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          if (timeA && timeB) return timeB - timeA;
          return (b._id || "").localeCompare(a._id || "");
        });

        const transformed = sortedDocs.map(transformBusinessProfile);

        setBusinesses(transformed);

        const hasNextPage = response.data.hasNextPage !== undefined
          ? response.data.hasNextPage
          : response.data.page < response.data.totalPages;

        setHasMore(hasNextPage);
        setPage(2);
      } else {
        setBusinesses([]);
        setHasMore(false);
      }
    } catch (err) {
      console.error("Failed to fetch business profiles:", err);
      setError(err.message || "Failed to load business profiles");
      setBusinesses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    setHasMore(true);
    fetchInitialBusinessProfiles();
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
                    : `${businesses.length} ${businesses.length === 1
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

              {/* Load More Sentinel */}
              <div
                ref={sentinelRef}
                className="w-full flex justify-center mt-12 mb-8 min-h-[40px]"
              >
                {(loadingMore || loading) && (
                  <div className="flex items-center gap-2 text-gray-500">
                    <div className="w-5 h-5 border-2 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
                    <span>Loading more businesses...</span>
                  </div>
                )}
                {!hasMore && businesses.length > 0 && (
                  <p className="text-gray-400 text-sm">
                    You&apos;ve reached the end of the list
                  </p>
                )}
              </div>
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
