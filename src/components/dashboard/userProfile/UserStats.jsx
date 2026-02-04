"use client";
import React from "react";
import {
  FiBriefcase,
  FiCheckSquare,
  FiBookmark,
  FiCalendar,
} from "react-icons/fi";

const UserStats = () => {
  const stats = [
    {
      label: "Totl Product Purchased",
      value: "130",
      subLabel: "Career resources",
      icon: FiBriefcase,
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600",
      iconBg: "bg-blue-500",
    },
    {
      label: "Total Applied Jobs",
      value: "230",
      subLabel: "Total applications",
      icon: FiBriefcase,
      color: "bg-gray-50 border-gray-200",
      iconColor: "text-gray-600",
      iconBg: "bg-black",
    },
    {
      label: "Saved Jobs",
      value: "12",
      subLabel: "Opportunity pipeline",
      icon: FiBookmark,
      color: "bg-yellow-50 border-yellow-200",
      iconColor: "text-yellow-600",
      iconBg: "bg-yellow-600",
    },
    {
      label: "Interview Invites",
      value: "32",
      subLabel: "Strong profile effectiveness",
      icon: FiCalendar,
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600",
      iconBg: "bg-green-600",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-5 lg:p-6 mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">Profile Summary</h2>
        <button className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gray-50 text-[#240457] rounded-md text-xs sm:text-sm font-medium hover:bg-gray-100 transition-colors">
          <span className="hidden sm:inline">Profile Analytics</span>
          <span className="sm:hidden">Analytics</span>
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#240457] rounded-sm flex items-end justify-center p-0.5 gap-0.5">
            <div className="w-0.5 h-1.5 bg-white"></div>
            <div className="w-0.5 h-2.5 bg-white"></div>
            <div className="w-0.5 h-2 bg-white"></div>
          </div>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`p-3 sm:p-4 md:p-5 rounded-xl border ${stat.color} relative`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 sm:mb-4 leading-tight">
                  {stat.label}
                </p>
                <p className="text-[9px] sm:text-[10px] text-gray-500">{stat.subLabel}</p>
              </div>
              <div
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg ${stat.iconBg} flex items-center justify-center text-white shadow-sm`}
              >
                <stat.icon className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserStats;
