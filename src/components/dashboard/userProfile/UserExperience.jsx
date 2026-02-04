"use client";
import React from "react";
import { FiPlus, FiBriefcase } from "react-icons/fi";

const UserExperience = () => {
  const experiences = [
    {
      id: 1,
      role: "Lead Logistics UX Architect",
      company: "Global Freight & Logistics Corp",
      duration: "Jan 2021 – Present (3 years 11 months)",
      description: [
        "Spearheaded the design of a unified B2B platform for managing international freight documentation, resulting in a 40% reduction in processing errors.",
        "Led the implementation of mobile-first warehouse inventory applications for 15+ facilities, improving real-time tracking accuracy by 25%.",
      ],
      isCurrent: true,
    },
    {
      id: 2,
      role: "Senior Industrial Systems Designer",
      company: "Precision Manufacturing Solutions",
      duration: "May 2017 – Dec 2020 (3 years 8 months)",
      description: [
        "Designed and deployed the v2 of the internal ERP/CRM tool specifically for procurement and vendor management, increasing purchasing efficiency by 15%.",
        "Conducted on-site field research with factory floor supervisors to optimize the dashboard for machine maintenance schedules, reducing downtime by 10%.",
      ],
      isCurrent: false,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-5 lg:p-6 mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
          <span className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-purple-100/50 flex items-center justify-center text-[#240457]">
            <FiBriefcase className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </span>
          Work Experience
        </h2>
        <button className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gray-50 text-[#6C49AC] rounded-md text-xs sm:text-sm font-semibold hover:bg-gray-100 transition-colors">
          <span className="hidden sm:inline">Edit Work Experience</span>
          <span className="sm:hidden">Edit</span>
          <svg
            width="10"
            height="10"
            className="sm:w-3 sm:h-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      <div className="relative border-l-2 border-gray-100 ml-2 sm:ml-3 space-y-6 sm:space-y-8 lg:space-y-10 pl-4 sm:pl-6 lg:pl-8 pb-2 sm:pb-4">
        {experiences.map((exp, index) => (
          <div key={exp.id} className="relative">
            {/* Timeline Dot */}
            <div
              className={`absolute -left-[23px] sm:-left-[31px] lg:-left-[39px] top-1.5 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white shadow-sm ${index === 0 ? "bg-[#240457]" : "bg-[#240457]"}`}
            ></div>

            <div className="mb-1">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">{exp.role}</h3>
              <p className="text-xs sm:text-sm font-medium text-[#556179] mb-0.5 sm:mb-1">
                {exp.company}
              </p>
              <p className="text-xs sm:text-sm text-purple-600 mb-1 sm:mb-2">{exp.duration}</p>
            </div>

            <ul className="space-y-2 sm:space-y-3">
              {exp.description.map((point, i) => (
                <li
                  key={i}
                  className="text-xs sm:text-sm text-gray-600 leading-relaxed flex gap-2"
                >
                  <div className="min-w-1 h-1 sm:min-w-1.5 sm:h-1.5 rounded-full bg-gray-300 mt-1.5 sm:mt-1.5"></div>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-2 border-t border-gray-100 pt-3 sm:pt-4">
        <button className="w-full py-2 sm:py-2 border border-dashed border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-500 hover:text-[#240457] hover:border-[#240457] transition-all flex items-center justify-center gap-1.5 sm:gap-2">
          <FiPlus className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Add Work Experience</span>
          <span className="sm:hidden">Add Experience</span>
        </button>
      </div>
    </div>
  );
};

export default UserExperience;
