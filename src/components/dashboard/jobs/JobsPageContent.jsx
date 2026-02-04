"use client";
import React, { useState, useEffect } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [hasMore, setHasMore] = useState(true);

  // Filter states from sidebar
  const [filters, setFilters] = useState({
    pay: [],
    categories: [],
    jobTypes: [],
    locations: [],
    datePosted: [],
  });

  // Set items per page to 20 as requested
  const itemsPerPage = 20;

  useEffect(() => {
    // Reset and fetch initial data when filters change
    setCurrentPage(1);
    setHasMore(true);
    fetchInitialJobs();
  }, [sortBy, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const fetchInitialJobs = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: 1,
        limit: itemsPerPage,
        status: "open",
      });

      if (searchQuery) {
        queryParams.append("search", searchQuery);
        queryParams.append("keyword", searchQuery);
        queryParams.append("category", searchQuery);
      }
      if (locationQuery) {
        queryParams.append("location", locationQuery);
        queryParams.append("country", locationQuery);
        queryParams.append("city", locationQuery);
        queryParams.append("location.city", locationQuery);
        queryParams.append("location.country", locationQuery);
      }

      // Add filter parameters
      if (filters.pay.length > 0) {
        // Backend logic 'Number(payRange)' expects a single value.
        queryParams.append("payRange", filters.pay[filters.pay.length - 1]);
      }
      if (filters.categories.length > 0) {
        filters.categories.forEach((cat) =>
          queryParams.append("jobCategory", cat),
        );
      }
      if (filters.jobTypes.length > 0) {
        filters.jobTypes.forEach((type) =>
          queryParams.append("employmentType", type),
        );
      }
      if (filters.locations.length > 0) {
        // Backend logic 'if(country)' expects a single value for regex.
        queryParams.append(
          "country",
          filters.locations[filters.locations.length - 1],
        );
      }
      if (filters.datePosted.length > 0) {
        // Handle date posted filters
        filters.datePosted.forEach((date) =>
          queryParams.append("datePosted", date),
        );
      }

      // Add sort parameter
      if (sortBy) {
        queryParams.append(
          "sort",
          sortBy === "newest" ? "-createdAt" : "createdAt",
        );
      }

      const response = await api.get({
        url: `/jobs?${queryParams.toString()}`,
        enableErrorMessage: false,
        enableSuccessMessage: false,
        activateLoader: false,
      });

      if (response.success && response.data) {
        setJobs(response.data.docs || response.data.jobs || []);
        setTotalPages(
          response.data.totalPages || response.data.pagination?.totalPages || 1,
        );
        setTotalJobs(
          response.data.totalDocs || response.data.pagination?.totalJobs || 0,
        );
        setHasMore(
          response.data.hasNextPage ??
            response.data.pagination?.hasNextPage ??
            false,
        );
        setCurrentPage(2); // Next page to fetch
      } else {
        setJobs([]);
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch jobs. Full error:", error);
      if (error.response) {
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
      }
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreJobs = async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: itemsPerPage,
        status: "open",
      });

      if (searchQuery) {
        queryParams.append("search", searchQuery);
        queryParams.append("keyword", searchQuery);
        queryParams.append("category", searchQuery);
      }
      if (locationQuery) {
        queryParams.append("location", locationQuery);
        queryParams.append("country", locationQuery);
        queryParams.append("city", locationQuery);
        queryParams.append("location.city", locationQuery);
        queryParams.append("location.country", locationQuery);
      }

      // Add filter parameters
      if (filters.pay.length > 0) {
        // Backend logic 'Number(payRange)' expects a single value.
        queryParams.append("payRange", filters.pay[filters.pay.length - 1]);
      }
      if (filters.categories.length > 0) {
        filters.categories.forEach((cat) =>
          queryParams.append("jobCategory", cat),
        );
      }
      if (filters.jobTypes.length > 0) {
        filters.jobTypes.forEach((type) =>
          queryParams.append("employmentType", type),
        );
      }
      if (filters.locations.length > 0) {
        // Backend logic 'if(country)' expects a single value for regex.
        queryParams.append(
          "country",
          filters.locations[filters.locations.length - 1],
        );
      }
      if (filters.datePosted.length > 0) {
        filters.datePosted.forEach((date) =>
          queryParams.append("datePosted", date),
        );
      }

      // Add sort parameter
      if (sortBy) {
        queryParams.append(
          "sort",
          sortBy === "newest" ? "-createdAt" : "createdAt",
        );
      }

      const response = await api.get({
        url: `/jobs?${queryParams.toString()}`,
        enableErrorMessage: false,
        enableSuccessMessage: false,
        activateLoader: false,
      });

      if (response.success && response.data) {
        const newJobs = response.data.docs || response.data.jobs || [];
        setJobs((prev) => [...prev, ...newJobs]);
        setHasMore(
          response.data.hasNextPage ??
            response.data.pagination?.hasNextPage ??
            false,
        );
        setCurrentPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to load more jobs:", error.message || error);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
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
                    <span className="text-sm sm:text-base text-gray-700 whitespace-nowrap">Sort By</span>
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
                    <p className="text-gray-500 text-sm sm:text-base">Loading jobs...</p>
                  </div>
                ) : jobs.length === 0 ? (
                  <div className="text-center py-12 sm:py-16">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiSearch className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-lg font-medium mb-2">No jobs found</p>
                    <p className="text-gray-400 text-sm">Try adjusting your search criteria or filters</p>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {jobs.map((job) => (
                      <JobCard key={job._id} job={job} />
                    ))}
                  </div>
                )}

                {/* Load More Button */}
                {hasMore && (
                  <div className="mt-6 sm:mt-8 flex justify-center">
                    <button
                      onClick={loadMoreJobs}
                      disabled={loadingMore}
                      className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-2.5 bg-white border border-gray-300 rounded-lg text-sm sm:text-base font-medium text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 touch-manipulation"
                    >
                      {loadingMore ? (
                        <>
                          <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                          <span>Loading...</span>
                        </>
                      ) : (
                        "Load More Jobs"
                      )}
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* <ChatWidget /> */}
    </div>
  );
}
