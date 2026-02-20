"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { FiSearch, FiMapPin, FiChevronDown } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { JobFilterSidebar } from "./JobFilterSidebar";
import { JobCard } from "./JobCard";
import { ChatWidget } from "@/components/dashboard/chat/ChatWidget";
import api from "@/lib/axios";

export default function JobsPageContent() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [totalJobs, setTotalJobs] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Auto-loader State
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef(null);

  // Filter states from sidebar
  const [filters, setFilters] = useState({
    pay: [],
    categories: [],
    jobTypes: [],
    locations: [],
    datePosted: [],
  });

  // Set items per page to 20 as requested
  const itemsPerPage = 10;

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchInitialJobs();
  }, [sortBy, filters, searchQuery, locationQuery]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const getQueryParams = (targetPage) => {
    const queryParams = new URLSearchParams({
      page: targetPage,
      limit: itemsPerPage,
      status: "open",
    });

    if (searchQuery) {
      queryParams.append("search", searchQuery);
    }
    if (locationQuery) {
      queryParams.append("country", locationQuery);
    }

    // Add sort parameter
    queryParams.append("sortedType", sortBy);

    // Add filter parameters
    if (filters.pay.length > 0) {
      queryParams.append("payRange", filters.pay[filters.pay.length - 1]);
    }
    if (filters.categories.length > 0) {
      queryParams.append("jobCategory", filters.categories.join("|"));
    }
    if (filters.jobTypes.length > 0) {
      queryParams.append("employmentType", filters.jobTypes.join("|"));
    }
    if (filters.locations.length > 0) {
      queryParams.append("country", filters.locations.join("|"));
    }
    if (filters.datePosted.length > 0) {
      queryParams.append("datePosted", filters.datePosted[0]);
    }

    return queryParams;
  };

  const loadMoreJobs = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);
      const queryParams = getQueryParams(page);

      const response = await api.get({
        url: `/jobs?${queryParams.toString()}`,
        enableErrorMessage: false,
        enableSuccessMessage: false,
        activateLoader: false,
      });

      if (response.success && response.data) {
        const newJobs = response.data.docs || response.data.jobs || [];
        setJobs((prev) => [...prev, ...newJobs]);

        const hasNextPage = response.data.hasNextPage !== undefined
          ? response.data.hasNextPage
          : (response.data.page || response.data.pagination?.page || 1) <
          (response.data.totalPages || response.data.pagination?.totalPages || 1);

        setHasMore(hasNextPage);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Failed to load more jobs:", error);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, page, sortBy, filters, searchQuery, locationQuery, itemsPerPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
          loadMoreJobs();
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
  }, [loadMoreJobs, hasMore, loadingMore, loading]);

  const fetchInitialJobs = async () => {
    try {
      setLoading(true);
      const queryParams = getQueryParams(1);

      const response = await api.get({
        url: `/jobs?${queryParams.toString()}`,
        enableErrorMessage: false,
        enableSuccessMessage: false,
        activateLoader: false,
      });

      if (response.success && response.data) {
        setJobs(response.data.docs || response.data.jobs || []);

        const hasNextPage = response.data.hasNextPage !== undefined
          ? response.data.hasNextPage
          : (response.data.page || response.data.pagination?.page || 1) <
          (response.data.totalPages || response.data.pagination?.totalPages || 1);

        setHasMore(hasNextPage);
        setPage(2);

        setTotalJobs(
          response.data.totalDocs || response.data.pagination?.totalJobs || 0,
        );
      } else {
        setJobs([]);
        setHasMore(false);
        setTotalJobs(0);
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      setJobs([]);
      setHasMore(false);
      setTotalJobs(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    setHasMore(true);
    fetchInitialJobs();
  };

  console.log("JobsPageContent Rendered: ", { jobs, loading, filters });

  if (loading && jobs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="mx-auto mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg sm:rounded-xl p-8 sm:p-10 lg:p-14 text-center shadow-sm border border-border-light">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-text-primary mb-4 sm:mb-6">
          Find Your Next Opportunity
        </h1>

        <div className="flex flex-col md:flex-row gap-3 sm:gap-4 max-w-4xl mx-auto justify-center">
          {/* Mobile: Stacked Inputs */}
          <div className="sm:hidden space-y-3">
            <div className="relative bg-white border border-border-light rounded-lg">
              <img
                src="/assets/images/long_searchBar.png"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary w-4 h-4"
                alt=""
              />
              <Input
                placeholder="Search by role, skill, or company..."
                className="pl-10 text-text-secondary h-12 border-0 focus:ring-0 rounded-lg text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <div className="relative bg-white border border-border-light rounded-lg">
              <img
                src="/assets/images/plusMap.png"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary w-4 h-4"
                alt=""
              />
              <Input
                placeholder="Location (e.g., Canada)"
                className="pl-10 text-text-secondary h-12 border-0 focus:ring-0 rounded-lg text-sm"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
          </div>

          {/* Desktop: Inline Inputs */}
          <div className="hidden sm:flex items-center bg-white border border-border-light rounded-lg overflow-hidden h-11 lg:h-12">
            <div className="relative flex-1">
              <img
                src="/assets/images/long_searchBar.png"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary w-4 h-4 lg:w-5 lg:h-5"
                alt=""
              />
              <Input
                placeholder="Search by role, skill, or company name..."
                className="pl-9 lg:pl-10 text-text-secondary h-11 lg:h-12 border-0 focus:ring-0 rounded-none text-sm lg:text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>

            <div className="w-px h-6 bg-border-light" />

            <div className="relative flex-1">
              <img
                src="/assets/images/plusMap.png"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary w-4 h-4 lg:w-5 lg:h-5"
                alt=""
              />
              <Input
                placeholder="Canada"
                className="pl-9 lg:pl-10 text-text-secondary h-11 lg:h-12 border-0 focus:ring-0 rounded-none text-sm lg:text-base"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
          </div>

          <Button
            className="h-12 rounded-xl lg:h-auto px-6 sm:px-8 text-sm sm:text-base font-medium w-full sm:w-auto"
            onClick={handleSearch}
          >
            Search Jobs
          </Button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 mb-6 sm:mb-8 lg:mb-10">
          <JobFilterSidebar onFilterChange={handleFilterChange} />

          <div className="flex-1 w-full min-w-0">
            <Card className="bg-white border-border-light shadow-sm">
              <CardContent className="p-3 sm:p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
                  <p className="font-semibold text-text-primary text-sm sm:text-base">
                    Showing {jobs.length} of {totalJobs} Jobs
                  </p>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-sm sm:text-base text-gray-700 whitespace-nowrap">
                      Sort By
                    </span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="text-sm sm:text-base bg-transparent font-medium border border-gray-200 rounded-md p-2 sm:p-2.5 text-text-primary focus:ring-0 cursor-pointer outline-none min-w-0 flex-1 sm:flex-initial"
                    >
                      <option value="newest">Newest</option>
                      <option value="oldest">Oldest</option>
                    </select>
                  </div>
                </div>

                {loading ? (
                  <div className="text-center py-8 sm:py-12">
                    <div className="w-8 h-8 border-3 border-gray-300 border-t-brand-primary rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500 text-sm sm:text-base">
                      Loading jobs...
                    </p>
                  </div>
                ) : jobs.length === 0 ? (
                  <div className="text-center py-12 sm:py-16">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiSearch className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-lg font-medium mb-2">
                      No jobs found
                    </p>
                    <p className="text-gray-400 text-sm">
                      Try adjusting your search criteria or filters
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {jobs.map((job) => (
                      <JobCard key={job._id} job={job} />
                    ))}
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
                      <span>Loading more jobs...</span>
                    </div>
                  )}
                  {!hasMore && jobs.length > 0 && (
                    <p className="text-gray-400 text-sm">
                      You've reached the end of the list
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* <ChatWidget /> */}
    </div>
  );
}
