"use client";
import React from "react";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { JobFilterSidebar } from "./components/JobFilterSidebar";
import { JobCard } from "./components/JobCard";
import { ChatWidget } from "../../../../components/dashboard/chat/ChatWidget";
import { mockJobs } from "@/data/mockJobs";

export default function JobsPage() {
  // Pagination State
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = mockJobs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(mockJobs.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="mx-auto mb-8 bg-gradient-to-r from-blue-100 to-green-100 rounded-xl p-18 text-center shadow-sm border border-border-light">
        <h1 className="text-3xl font-semibold text-text-primary mb-6">
          Find Your Next Opportunity
        </h1>

        <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
          {/* Unified input bar */}
          <div className="flex flex-1 items-center bg-white border border-border-light rounded-lg overflow-hidden h-11">
            {/* Left input */}
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <Input
                placeholder="Search by role, skill, or company name..."
                className="pl-10 h-11 border-0 focus:ring-0 rounded-none"
              />
            </div>

            {/* Vertical divider */}
            <div className="w-px h-6 bg-border-light" />

            {/* Right input */}
            <div className="relative flex-1">
              <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <Input
                placeholder="Canada/USA"
                className="pl-10 h-11 border-0 focus:ring-0 rounded-none"
              />
            </div>
          </div>
          <Button className="h-auto px-8">Search Jobs</Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col items-start sm:flex-row mb-10 gap-6">
        {/* Sidebar */}
        <JobFilterSidebar />

        {/* Main Content */}
        <div className="flex-1 w-full">
          <Card className="bg-white border-border-light shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <p className="font-bold text-text-primary">
                  Showing {Math.min(indexOfLastItem, mockJobs.length)} of{" "}
                  {mockJobs.length} Jobs
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-text-secondary">Sort By</span>
                  <select className="text-sm border-none bg-transparent font-semibold text-text-primary focus:ring-0 cursor-pointer outline-none">
                    <option>Newest</option>
                    <option>Oldest</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {currentJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>

              {/* Pagination Controls */}
              <div className="mt-8 flex justify-center items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded border border-border-light text-text-secondary hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  &lt;
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium transition-colors ${
                      currentPage === i + 1
                        ? "bg-brand-primary text-white"
                        : "text-text-secondary hover:bg-gray-50 border border-border-light"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded border border-border-light text-text-secondary hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  &gt;
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ChatWidget />
    </div>
  );
}
