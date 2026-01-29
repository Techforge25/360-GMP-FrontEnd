"use client";
import React, { useState, useEffect } from "react";
import { JobApplicationCard } from "../jobs/JobApplicationCard";
import jobAPI from "@/services/jobAPI";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "all", label: "All" },
  { id: "applied", label: "Applied", showBadge: true },
  { id: "saved", label: "Saved" },
  { id: "hired", label: "Hired" },
];

export default function UserApplications() {
  const [activeTab, setActiveTab] = useState("all");
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await jobAPI.getMyApplications();

        console.log("Applications API Response:", response);

        if (response.success && response.data) {
          const applicationsData =
            response.data.docs ||
            response.data.applications ||
            response.data ||
            [];
          console.log("Applications data:", applicationsData);
          setApplications(applicationsData);
        } else {
          console.warn("API returned unsuccessful response:", response);
          setError("Failed to fetch applications");
          setApplications([]);
        }
      } catch (err) {
        console.error("Failed to fetch applications:", err);
        console.error("Error details:", err.response?.data || err.message);
        setError(err.message || "Failed to fetch applications");
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const filteredApplications = applications.filter((app) => {
    if (activeTab === "all") return true;
    return app.status?.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-border-light overflow-hidden">
      <div className="p-6 md:p-8">
        <h2 className="text-xl font-bold text-text-primary mb-6">
          Application & Saved Jobs
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                activeTab === tab.id
                  ? "bg-[#240457] text-white"
                  : "bg-white text-text-secondary border border-border-light hover:bg-gray-50",
              )}
            >
              {tab.label}
              {tab.showBadge && (
                <span
                  className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center text-[10px]",
                    activeTab === tab.id
                      ? "bg-white text-[#240457]"
                      : "bg-[#240457] text-white",
                  )}
                >
                  {applications.filter(
                    (a) => a.status?.toLowerCase() === "applied",
                  ).length || 10}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <p className="font-medium">Error loading applications</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {/* List */}
        <div className="space-y-4">
          {loading ? (
            <div className="py-12 text-center text-text-secondary italic">
              Loading applications...
            </div>
          ) : filteredApplications.length > 0 ? (
            filteredApplications.map((app) => (
              <JobApplicationCard key={app.id || app._id} application={app} />
            ))
          ) : (
            <div className="py-12 text-center text-text-secondary border-2 border-dashed border-border-light rounded-xl bg-gray-50/50">
              <p className="font-medium text-text-primary text-lg mb-1">
                No applications found
              </p>
              <p className="text-sm">
                You haven't{" "}
                {activeTab === "all" ? "made any" : `any ${activeTab}`}{" "}
                applications yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
