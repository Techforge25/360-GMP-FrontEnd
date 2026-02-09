"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiChevronDown, FiMoreVertical, FiChevronRight } from "react-icons/fi";
import businessProfileAPI from "@/services/businessProfileAPI";
import jobAPI from "@/services/jobAPI";

import CreateJobModal from "@/components/dashboard/jobs/CreateJobModal";
import CandidatesView from "@/components/dashboard/jobs/CandidatesView";

export default function BusinessJobsTab() {
  const router = useRouter();
  const [sortBy, setSortBy] = useState("Last 30 Day's");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);
  const [showCandidates, setShowCandidates] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [businessProfile, setBusinessProfile] = useState(null);
  const [hiringStats, setHiringStats] = useState({
    views: { count: 0, period: "30d" },
    applications: 0,
    interview: 0,
    hired: 0,
  });

  useEffect(() => {
    fetchBusinessJobsData();
  }, []);

  const fetchBusinessJobsData = async () => {
    try {
      setLoading(true);

      // First, get the business profile to get businessId
      const profileResponse = await businessProfileAPI.getMyProfile();
      console.log("Business Profile Response:", profileResponse);

      if (profileResponse?.data) {
        setBusinessProfile(profileResponse.data);
        const businessId = profileResponse.data._id;

        // Fetch jobs for this business
        const jobsResponse = await jobAPI.getAll({ businessId });
        console.log("Jobs Response:", jobsResponse);

        if (jobsResponse?.success && jobsResponse?.data) {
          const jobsData =
            jobsResponse.data.docs ||
            jobsResponse.data.jobs ||
            jobsResponse.data ||
            [];
          setJobs(jobsData);

          // Calculate hiring stats from jobs data
          calculateHiringStats(jobsData);
        }
      }
    } catch (error) {
      console.error("Failed to fetch business jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateHiringStats = (jobsData) => {
    // Calculate total views from all jobs
    const totalViews = jobsData.reduce(
      (sum, job) => sum + (job.viewsCount || 0),
      0,
    );

    // For now, we'll use placeholder values for applications, interview, and hired
    // These would need separate API endpoints or be included in the job data
    setHiringStats({
      views: { count: totalViews, period: "30d" },
      applications: 0, // TODO: Fetch from applications API
      interview: 0, // TODO: Fetch from applications API
      hired: 0, // TODO: Fetch from applications API
    });
  };

  const handleCreateJob = () => {
    setShowCreateJobModal(true);
  };

  const handleViewCandidates = (job) => {
    setSelectedJob(job);
    setShowCandidates(true);
  };

  const handleBackToJobs = () => {
    setShowCandidates(false);
    setSelectedJob(null);
  };

  const handleStatusChange = (jobId, newStatus) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, status: newStatus } : job,
      ),
    );
  };

  return (
    <>
      {showCandidates && selectedJob ? (
        <CandidatesView job={selectedJob} onBack={handleBackToJobs} />
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 lg:p-8 border-b border-gray-200 gap-3 sm:gap-0">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Jobs</h2>
            <button
              onClick={handleCreateJob}
              className="bg-[#240457] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-sm font-medium hover:bg-[#240457] transition-colors flex items-center gap-1.5 sm:gap-2 justify-center sm:justify-start"
            >
              <span className="hidden sm:inline">Create a job</span>
              <span className="sm:hidden">Create Job</span>
              <span className="text-base sm:text-lg">→</span>
            </button>
          </div>

          {/* Hiring Funnel Stats */}
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                Hiring Funnel State
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-sm text-gray-600">
                  Sort By
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm sm:text-sm bg-white border border-gray-300 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 text-gray-900 focus:ring-2 focus:ring-[#240457] focus:border-[#240457] outline-none cursor-pointer"
                >
                  <option value="Last 30 Day's">Last 30 Day's</option>
                  <option value="Last 7 Days">Last 7 Days</option>
                  <option value="Last 90 Days">Last 90 Days</option>
                </select>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {/* Views Card */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 sm:p-4 lg:p-6">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-700 mb-0.5 sm:mb-1">
                  {hiringStats.views.count}
                </div>
                <div className="text-sm sm:text-sm text-green-600">
                  Views ({hiringStats.views.period})
                </div>
              </div>

              {/* Applications Card */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 sm:p-4 lg:p-6">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-700 mb-0.5 sm:mb-1">
                  {hiringStats.applications}
                </div>
                <div className="text-sm sm:text-sm text-blue-600">
                  Applications
                </div>
              </div>

              {/* Interview Card */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 sm:p-4 lg:p-6">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-700 mb-0.5 sm:mb-1">
                  {hiringStats.interview}
                </div>
                <div className="text-sm sm:text-sm text-yellow-600">
                  Interview
                </div>
              </div>

              {/* Hired Card */}
              <div className="bg-gray-100 border border-gray-300 rounded-xl p-3 sm:p-4 lg:p-6">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-700 mb-0.5 sm:mb-1">
                  {hiringStats.hired}
                </div>
                <div className="text-sm sm:text-sm text-gray-600">Hired</div>
              </div>
            </div>

            {/* Jobs Table */}
            <div className="overflow-x-auto -mx-6 md:-mx-8">
              <div className="inline-block min-w-full align-middle px-6 md:px-8">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 text-left">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-gray-300 text-[#240457] focus:ring-[#240457]"
                        />
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                        Jobs Title
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                        Candidates
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                        Date Posted
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                        Email
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                        Job Status
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {loading ? (
                      <tr>
                        <td
                          colSpan="7"
                          className="py-12 text-center text-gray-500"
                        >
                          Loading jobs...
                        </td>
                      </tr>
                    ) : jobs.length === 0 ? (
                      <tr>
                        <td
                          colSpan="7"
                          className="py-12 text-center text-gray-500"
                        >
                          No jobs found. Create your first job to get started!
                        </td>
                      </tr>
                    ) : (
                      jobs.map((job) => (
                        <tr
                          key={job._id}
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleViewCandidates(job)}
                        >
                          <td className="py-4">
                            <input
                              type="checkbox"
                              className="w-4 h-4 rounded border-gray-300 text-[#240457] focus:ring-[#240457]"
                            />
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-medium text-gray-900">
                              {job.jobTitle}
                            </div>
                            <div className="text-sm text-gray-500">
                              {job.location?.city && job.location?.country
                                ? `${job.location.city}, ${job.location.country}`
                                : job.location?.country || "N/A"}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-700">All • 0</span>
                            <span className="text-gray-400">|</span>
                            <span className="text-gray-700">
                              New •{" "}
                              <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-green-100 text-green-700 rounded text-sm font-medium">
                                00
                              </span>
                                </span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-700">
                          {new Date(job.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                          })}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-700">
                            {businessProfile?.email || "N/A"}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <span
                                className={`inline-flex items-center gap-1 text-sm font-medium ${
                                  job.status === "open"
                                    ? "text-green-700"
                                    : "text-gray-700"
                                }`}
                              >
                                <span
                                  className={`w-2 h-2 rounded-full ${
                                    job.status === "open"
                                      ? "bg-green-500"
                                      : "bg-gray-500"
                                  }`}
                                ></span>
                                {job.status === "open" ? "Open" : "Closed"}
                              </span>
                              <button className="p-1 hover:bg-gray-100 rounded">
                                <FiChevronDown className="w-4 h-4 text-gray-500" />
                              </button>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <button className="p-1 hover:bg-gray-100 rounded">
                                <FiMoreVertical className="w-5 h-5 text-gray-600" />
                              </button>
                              <button className="p-1 hover:bg-gray-100 rounded">
                                <FiChevronRight className="w-5 h-5 text-gray-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      <CreateJobModal
        isOpen={showCreateJobModal}
        onClose={() => setShowCreateJobModal(false)}
        onSuccess={fetchBusinessJobsData}
        businessId={businessProfile?._id}
      />
    </>
  );
}
