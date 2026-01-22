"use client";
import React from "react";
import Image from "next/image";
import { FiMapPin, FiBriefcase, FiClock, FiDollarSign } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

// Dummy data for temporary display
const dummyJob = {
  id: "1",
  logo: "/assets/images/Logo.png",
  company: "Tech Solutions Inc.",
  isActive: true,
  title: "Senior Software Developer",
  location: "Toronto, ON",
  type: "Full-time",
  postedAt: "2 days ago",
  salary: "$80,000 - $120,000",
};

export const JobCard = ({ job = dummyJob }) => {
  // Helper function to format location (handles both string and object formats)
  const formatLocation = (location) => {
    if (!location) return dummyJob.location;
    if (typeof location === "string") return location;
    if (typeof location === "object") {
      const parts = [];
      if (location.city) parts.push(location.city);
      if (location.country) parts.push(location.country);
      return parts.length > 0 ? parts.join(", ") : dummyJob.location;
    }
    return dummyJob.location;
  };

  // Helper function to format posted date
  const formatPostedAt = (date) => {
    if (!date) return dummyJob.postedAt;
    if (typeof date === "string" && !date.includes("ago")) {
      // If it's a date string, convert it to relative time
      const dateObj = new Date(date);
      const now = new Date();
      const diffInMs = now - dateObj;
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
      if (diffInDays === 0) return "Today";
      if (diffInDays === 1) return "1 day ago";
      if (diffInDays < 7) return `${diffInDays} days ago`;
      if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
      return `${Math.floor(diffInDays / 30)} months ago`;
    }
    return date;
  };

  // Use dummy data if job prop is not provided or incomplete
  const rawLocation = job?.location || job?.jobLocation;
  const rawPostedAt = job?.postedAt || job?.createdAt;
  
  const jobData = {
    id: job?.id || job?._id || dummyJob.id,
    logo: job?.logo || job?.companyLogo || dummyJob.logo,
    company: job?.company || job?.companyName || dummyJob.company,
    isActive: job?.isActive !== undefined ? job.isActive : dummyJob.isActive,
    title: job?.title || job?.jobTitle || dummyJob.title,
    location: formatLocation(rawLocation),
    type: job?.type || job?.jobType || dummyJob.type,
    postedAt: formatPostedAt(rawPostedAt),
    salary: job?.salary || job?.salaryRange || dummyJob.salary,
  };

  return (
    <div className="bg-white border border-border-light rounded-lg p-5 hover:shadow-md transition-shadow flex flex-col md:flex-row gap-4 items-start relative">
      <div className="w-24 h-24 rounded-lg bg-gray-50 border border-border-light flex-shrink-0 relative overflow-hidden">
        <Image src={jobData.logo} alt={jobData.company} fill className="object-cover" />
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4 mb-1">
          <div>
            <h3 className="font-bold text-text-primary text-base truncate pr-2">
              {jobData.title}
            </h3>
            <div className="flex items-center gap-2 mt-2 text-sm">
              <span className="font-medium text-brand-primary">
                {jobData.company}
              </span>
              •
              <span className="text-sm text-green-600">
                {jobData.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-text-secondary">
          <div className="flex items-center gap-1">
            <img src="/assets/images/pinIcon.png" alt="" /> {jobData.location}
          </div>
          <div className="w-px h-4 bg-border-light" />
          <div className="flex items-center gap-1">
            <img src="/assets/images/bagIcon.png" alt="" /> {jobData.type}
          </div>
          <div className="w-px h-4 bg-border-light" />
          <div className="flex items-center gap-1">
            <img src="/assets/images/clockIcon.png" alt="" /> {jobData.postedAt}
          </div>
          <div className="w-px h-4 bg-border-light" />
          <div className="flex items-center gap-1">
            <img src="/assets/images/dollarIcon.png" alt="" /> {jobData.salary}
          </div>
        </div>
      </div>

      <div className="mt-2 md:mt-0 self-start md:self-center">
        <Link href={`/dashboard/business/jobs/${jobData.id}`}>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs font-medium text-brand-primary hover:text-brand-primary/80"
          >
            View Details &gt;
          </Button>
        </Link>
      </div>
    </div>
  );
};
