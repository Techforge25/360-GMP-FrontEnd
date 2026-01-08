"use client";
import React from "react";
import { FiBriefcase, FiClock, FiMapPin } from "react-icons/fi";
import { Button } from "@/components/ui/Button";

const JobSection = ({ jobs = [] }) => {
  if (!jobs || jobs.length === 0) return null;

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
