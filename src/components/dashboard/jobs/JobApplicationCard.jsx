import React from "react";
import Image from "next/image";
import { FiMapPin, FiBriefcase, FiClock, FiDollarSign } from "react-icons/fi";
import { cn } from "@/lib/utils";

export const JobApplicationCard = ({ application }) => {
  // Safe helpers
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "applied":
      case "pending":
        return "bg-green-100 text-green-700";
      case "interviewing":
      case "interview":
        return "bg-yellow-100 text-yellow-700";
      case "saved":
        return "bg-gray-100 text-gray-600";
      case "hired":
        return "bg-blue-100 text-blue-700";
      case "rejected":
      case "close":
      case "closed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const job = application?.jobId || {};
  const business = job?.businessId || {};

  // Hande mock data vs real data structure
  const title = job.jobTitle || "Job Title Goes Here";
  const companyName = business.companyName || "Company Name";
  const location = job.location
    ? `${job.location.city || ""} ${job.location.country || ""}`
    : "Ottawa-Canada";
  const type = job.employmentType || "Full Time";
  const timeAgo = "2 Days Ago"; // Need helper or date-fns
  const salary = `${job.salaryMin || 1000}-${job.salaryMax || 1500}/Month`;
  const logo = business.logo || "/assets/images/Logo.png";
  const status = application?.status || "Applied";

  return (
    <div className="bg-white border border-border-light rounded-xl p-6 hover:shadow-md transition-shadow relative">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Logo */}
        <div className="w-16 h-16 rounded-lg border border-border-light overflow-hidden flex-shrink-0 bg-gray-50 flex items-center justify-center">
          <Image
            src={logo}
            alt={companyName}
            width={64}
            height={64}
            className="object-contain p-1"
          />
        </div>

        {/* Content */}
        <div className="flex-1 w-full">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-text-primary mb-1">
                {title}
              </h3>
              <p className="text-brand-primary font-medium text-sm mb-3">
                {companyName}
              </p>
            </div>

            {/* Status Pill (Desktop) */}
            <div
              className={cn(
                "px-3 py-1 rounded-full text-sm font-semibold capitalize hidden md:block",
                getStatusColor(status),
              )}
            >
              {status}
            </div>
          </div>

          {/* Info Row */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-text-secondary">
            <div className="flex items-center gap-1.5">
              <FiMapPin className="text-text-tertiary" /> {location}
            </div>
            <div className="w-px h-3 bg-border-light hidden sm:block" />
            <div className="flex items-center gap-1.5">
              <FiBriefcase className="text-text-tertiary" /> {type}
            </div>
            <div className="w-px h-3 bg-border-light hidden sm:block" />
            <div className="flex items-center gap-1.5">
              <FiClock className="text-text-tertiary" /> {timeAgo}
            </div>
            <div className="w-px h-3 bg-border-light hidden sm:block" />
            <div className="flex items-center gap-1.5">
              <FiDollarSign className="text-text-tertiary" /> {salary}
            </div>
          </div>

          {/* Status Pill (Mobile) */}
          <div className="mt-4 md:hidden">
            <span
              className={cn(
                "px-3 py-1 rounded-full text-sm font-semibold capitalize",
                getStatusColor(status),
              )}
            >
              {status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
