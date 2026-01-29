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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-purple-100/50 flex items-center justify-center text-[#240457]">
            <FiBriefcase className="w-3.5 h-3.5" />
          </span>
          Work Experience
        </h2>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 text-[#6C49AC] rounded-md text-xs font-semibold hover:bg-gray-100 transition-colors">
          Edit Work Experience
          <svg
            width="12"
            height="12"
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

      <div className="relative border-l-2 border-gray-100 ml-3 space-y-10 pl-8 pb-4">
        {experiences.map((exp, index) => (
          <div key={exp.id} className="relative">
            {/* Timeline Dot */}
            <div
              className={`absolute -left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-white shadow-sm ${index === 0 ? "bg-[#240457]" : "bg-[#240457]"}`}
            ></div>

            <div className="mb-1">
              <h3 className="text-base font-bold text-gray-900">{exp.role}</h3>
              <p className="text-sm font-medium text-[#556179] mb-1">
                {exp.company}
              </p>
              <p className="text-xs text-purple-600 mb-2">{exp.duration}</p>
            </div>

            <ul className="space-y-3">
              {exp.description.map((point, i) => (
                <li
                  key={i}
                  className="text-sm text-gray-600 leading-relaxed flex gap-2"
                >
                  <div className="min-w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5"></div>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-2 border-t border-gray-100 pt-4">
        <button className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-500 hover:text-[#240457] hover:border-[#240457] transition-all flex items-center justify-center gap-2">
          <FiPlus className="w-4 h-4" />
          Add Work Experience
        </button>
      </div>
    </div>
  );
};

export default UserExperience;
