"use client";
import React, { useState, useEffect } from "react";
import { FiSearch, FiMapPin, FiChevronDown } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { JobFilterSidebar } from "./components/JobFilterSidebar";
import { JobCard } from "./components/JobCard";
import { ChatWidget } from "../../../../components/dashboard/chat/ChatWidget";
import api from "@/lib/axios";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [hasMore, setHasMore] = useState(true);

  // Set items per page to 20 as requested
  const itemsPerPage = 20;

  useEffect(() => {
    // Reset and fetch initial data when filters change
    setCurrentPage(1);
    setHasMore(true);
    fetchInitialJobs();
  }, []);

  const fetchInitialJobs = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: 1,
        limit: itemsPerPage,
        status: "open",
      });

      if (searchQuery) queryParams.append("search", searchQuery);
      // Backend doesn't support location query in the provided snippet explicitly for filtering jobs list directly
      // but if it did, we'd add it here. Keeping it for future or if api supports it.

      const response = await api.get({
        url: `/jobs?${queryParams.toString()}`,
        enableErrorMessage: false,
        enableSuccessMessage: false,
        activateLoader: false,
      });

      if (response.success && response.data) {
        setJobs(response.data.jobs || []);
        setTotalPages(response.data.pagination?.totalPages || 1);
        setTotalJobs(response.data.pagination?.totalJobs || 0);
        setHasMore(response.data.pagination?.hasNextPage || false);
        setCurrentPage(2); // Next page to fetch
      } else {
        setJobs([]);
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
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

      if (searchQuery) queryParams.append("search", searchQuery);

      const response = await api.get({
        url: `/jobs?${queryParams.toString()}`,
        enableErrorMessage: false,
        enableSuccessMessage: false,
        activateLoader: false,
      });

      if (response.success && response.data) {
        const newJobs = response.data.jobs || [];
        setJobs((prev) => [...prev, ...newJobs]);
        setHasMore(response.data.pagination?.hasNextPage || false);
        setCurrentPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to load more jobs:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchInitialJobs();
  };

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
      <div className="mx-auto mb-8 bg-gradient-to-r from-blue-100 to-green-100 rounded-xl p-18 text-center shadow-sm border border-border-light">
        <h1 className="text-3xl font-semibold text-text-primary mb-6">
          Find Your Next Opportunity
        </h1>

        <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
          <div className="flex flex-1 items-center bg-white border border-border-light rounded-lg overflow-hidden h-11">
            <div className="relative flex-1">
              <img
                src="/assets/images/long_searchBar.png"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
                alt=""
              />
              <Input
                placeholder="Search by role, skill, or company name..."
                className="pl-10 h-11 border-0 focus:ring-0 rounded-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>

            <div className="w-px h-6 bg-border-light" />

            <div className="relative flex-1">
              <img
                src="/assets/images/plusMap.png"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
                alt=""
              />
              <Input
                placeholder="Canada/USA"
                className="pl-10 h-11 border-0 focus:ring-0 rounded-none"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
          </div>
          <Button className="h-auto px-8" onClick={handleSearch}>
            Search Jobs
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col items-start sm:flex-row mb-10 gap-6">
        <JobFilterSidebar />

        <div className="flex-1 w-full">
          <Card className="bg-white border-border-light shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <p className="font-semibold text-text-primary">
                  Showing {jobs.length} of {totalJobs} Jobs
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700">Sort By</span>
                  <select className="text-sm bg-transparent font-medium border border-gray-200 rounded-md p-2 text-text-primary focus:ring-0 cursor-pointer outline-none">
                    <option>Newest</option>
                    <option>Oldest</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Loading jobs...</p>
                </div>
              ) : jobs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No jobs found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <JobCard key={job._id} job={job} />
                  ))}
                </div>
              )}

              {/* Load More Button */}
              {hasMore && (
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={loadMoreJobs}
                    disabled={loadingMore}
                    className="px-6 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loadingMore ? (
                      <>
                        <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                        Loading...
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

      <ChatWidget />
    </div>
  );
}
