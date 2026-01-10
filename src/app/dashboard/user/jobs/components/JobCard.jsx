"use client";
import React from "react";
import Image from "next/image";
import { FiMapPin, FiBriefcase, FiClock, FiDollarSign } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export const JobCard = ({ job }) => {
  return (
    <div className="bg-white border border-border-light rounded-lg p-5 hover:shadow-md transition-shadow flex flex-col md:flex-row gap-4 items-start relative">
      <div className="w-24 h-24 rounded-lg bg-gray-50 border border-border-light flex-shrink-0 relative overflow-hidden">
        <Image src={job.logo} alt={job.company} fill className="object-cover" />
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4 mb-1">
          <div>
            <h3 className="font-bold text-text-primary text-base truncate pr-2">
              {job.title}
            </h3>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-brand-primary">
                {job.company}
              </span>
              •
              <span className="text-sm text-green-600">
                {job.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-text-secondary mt-3">
          <div className="flex items-center gap-1">
            <FiMapPin /> {job.location}
          </div>
          <div className="w-px h-4 bg-border-light" />
          <div className="flex items-center gap-1">
            <FiBriefcase /> {job.type}
          </div>
          <div className="w-px h-4 bg-border-light" />
          <div className="flex items-center gap-1">
            <FiClock /> {job.postedAt}
          </div>
          <div className="w-px h-4 bg-border-light" />
          <div className="flex items-center gap-1">
            <FiDollarSign /> {job.salary}
          </div>
        </div>
      </div>

      <div className="mt-2 md:mt-0 self-start md:self-center">
        <Link href={`/dashboard/user/jobs/${job.id}`}>
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
