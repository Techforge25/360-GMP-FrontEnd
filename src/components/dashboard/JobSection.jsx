"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiBriefcase, FiClock, FiMapPin } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { useUserRole } from "@/context/UserContext";
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
  const { user } = useUserRole();
  const router = useRouter();

  // Conditional URL based on user role
  const jobsUrl = user?.role === "business" ? "/dashboard/business/jobs" : "/dashboard/user/jobs";

  const handleViewJobDetail = (jobId) => {
    const baseUrl = user?.role === "business" ? "/dashboard/business/jobs" : "/dashboard/user/jobs";
    router.push(`${baseUrl}/${jobId}`);
  };

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
            company: job.businessId?.companyName || "Unknown Company",
            logo: job.businessId?.logo || null,
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
        <div className="max-w-[1400px] mx-auto px-4 text-center">
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
    <section className="py-12 bg-gray-50/30 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-12 left-8 w-4 h-4 border-4 border-purple-500 rounded-full opacity-60"></div>

      {/* Right side gradient blur */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, #8E47FF 0%, #FFC310 100%)",
          filter: "blur(100px)",
          transform: "translate(30%, -20%)",
        }}
      ></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 relative z-10">
          <div className="absolute top-[150%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] -z-10 flex items-center justify-center opacity-100 pointer-events-none">
            <img
              src="/assets/images/bottle.png"
              alt=""
              className="w-[50%] h-[50%] object-contain"
            />
          </div>
          <h2 className="text-2xl font-semibold mx-auto text-black mb-2 max-w-sm">
            Latest Jobs Posted By Other Companies
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {jobs.map((job, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl z-100 border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white flex items-start gap-4"
            >
              {/* Company Logo */}
              <div
                className={`w-35 h-full rounded-2xl bg-[#ECEFF6] border border-[#E3E7EE] flex-shrink-0 flex items-center justify-center`}
              >
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center overflow-hidden">
                  {job.logo ? (
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="w-full h-full object-contain p-1"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <span 
                    className={`text-2xl font-bold text-gray-700 ${job.logo ? 'hidden' : 'flex'}`}
                    style={{ display: job.logo ? 'none' : 'flex' }}
                  >
                    {job.company.charAt(0)}
                  </span>
                </div>
              </div>

              {/* Job Details */}
              <div className="flex-1">
                <h3 className="font-semibold mb-1 text-gray-900 text-xl">
                  {job.title}
                </h3>
                <p className="text-base text-[#240457] mb-3">{job.company}</p>

                {/* Job Meta Info */}
                <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1">
                    <img src="/assets/images/pinIcon.png" alt="" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src="/assets/images/bagIcon.png" alt="" />
                    {job.type}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src="/assets/images/clockIcon.png" alt="" />
                    {job.posted}
                  </span>
                </div>

                {/* View Details Button */}
                <button 
                  onClick={() => handleViewJobDetail(job.id)}
                  className="px-4 mt-6 py-2 border border-[#240457] text-[#240457] rounded-xl font-medium hover:bg-[#240457] hover:text-white transition-colors text-base flex items-center gap-2"
                >
                  View Details
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Jobs Button */}
        <div className="flex justify-center">
          <Link href={jobsUrl}>
            <Button className="bg-[#240457] hover:bg-[#1a0340] text-white rounded-xl px-8 py-3 font-medium flex items-center gap-2">
              View All Jobs
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JobSection;
