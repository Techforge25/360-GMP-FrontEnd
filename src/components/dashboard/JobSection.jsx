"use client";
import React from "react";
import { FiBriefcase, FiClock, FiMapPin } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import jobAPI from "@/services/jobAPI"; // Import jobAPI

const getTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} days ago`;
  if (hours > 0) return `${hours} hours ago`;
  if (minutes > 0) return `${minutes} mins ago`;
  return "Just now";
};

const getRandomColor = (index) => {
  const colors = [
    "bg-blue-100 text-blue-600",
    "bg-purple-100 text-purple-600",
    "bg-green-100 text-green-600",
    "bg-orange-100 text-orange-600",
  ];
  return colors[index % colors.length];
};

const JobSection = () => {
  const [jobs, setJobs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await jobAPI.getLatestJobs(4);

        if (response.success && response.data) {
          // Check if data is array or wrapped in docs/jobs
          const jobsData = Array.isArray(response.data)
            ? response.data
            : response.data.jobs || response.data.docs || [];

          const mappedJobs = jobsData.map((job, index) => ({
            id: job._id,
            company:
              job.businessId?.profileName ||
              job.businessId?.businessName ||
              "Unknown Company",
            title: job.jobTitle,
            location: job.location
              ? `${job.location.city}, ${job.location.country}`
              : "Remote",
            type: job.employmentType,
            posted: getTimeAgo(job.createdAt),
            color: getRandomColor(index),
          }));

          setJobs(mappedJobs);
        }
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
        setError("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-white mb-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-gray-100 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!jobs.length) return null;

  return (
    <section className="py-12 bg-white mb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-indigo-950 mb-2">
            Latest Jobs Posted By Other Companies
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {jobs.map((job, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white flex items-start gap-4"
            >
              <div
                className={`w-12 h-12 rounded-lg ${job.color} flex-shrink-0 flex items-center justify-center text-xl font-bold text-gray-700`}
              >
                {job.company.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-base mb-1">
                  {job.title}
                </h3>
                <p className="text-sm text-indigo-600 font-medium mb-3">
                  {job.company}
                </p>

                <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <FiMapPin /> {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiBriefcase /> {job.type}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock /> {job.posted}
                  </span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto rounded-full text-xs font-medium border-gray-200"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button className="bg-indigo-900 text-white rounded-full px-8">
            View All Jobs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JobSection;
