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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    fetchJobs();
  }, [currentPage]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await api.get({
        url: `/jobs?page=${currentPage}&limit=${itemsPerPage}&status=open`,
        enableErrorMessage: false,
        enableSuccessMessage: false,
        activateLoader: false,
      });

      if (response.success && response.data) {
        setJobs(response.data.jobs || []);
        setTotalPages(response.data.pagination?.totalPages || 1);
        setTotalJobs(response.data.pagination?.totalJobs || 0);
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchJobs();
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
              <img src="/assets/images/long_searchBar.png" className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" alt="" />
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
              <img src="/assets/images/plusMap.png" className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" alt="" />
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

              {totalPages > 1 && (
                <div className="mt-8 flex justify-center items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded border border-border-light text-text-secondary hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    &lt;
                  </button>

                  {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={i}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium transition-colors ${
                          currentPage === pageNum
                            ? "bg-brand-primary text-white"
                            : "text-text-secondary hover:bg-gray-50 border border-border-light"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded border border-border-light text-text-secondary hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    &gt;
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
