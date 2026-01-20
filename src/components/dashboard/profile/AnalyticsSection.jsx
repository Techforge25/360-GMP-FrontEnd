"use client";
import React from "react";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiUser,
  FiFileText,
  FiRefreshCw,
  FiAlertCircle,
  FiBarChart2,
} from "react-icons/fi";

const AnalyticsSection = () => {
  const stats = [
    {
      label: "Profile Views (30D)",
      value: "23.1k",
      change: "+12% vs last period",
      trend: "up",
      icon: FiUser,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      borderColor: "border-green-500",
    },
    {
      label: "New Leads/Quotes",
      value: "43",
      change: "+ 6% vs last period",
      trend: "up",
      icon: FiFileText,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      borderColor: "border-blue-500",
    },
    {
      label: "Conversion Rate",
      value: "1.2 %",
      change: "+ 24% vs last period",
      trend: "up",
      icon: FiRefreshCw,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      borderColor: "border-yellow-500",
    },
    {
      label: "Critical Alerts",
      value: "100",
      change: "- 8.5% vs last period",
      trend: "down",
      icon: FiAlertCircle,
      iconBg: "bg-red-100",
      iconColor: "text-red-500",
      borderColor: "border-red-500",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">
          Core Profile Analytics
        </h2>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-md text-xs font-medium hover:bg-indigo-100 transition-colors">
          Business Analytics
          <FiBarChart2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 relative overflow-hidden group hover:border-gray-200 transition-colors"
          >
            <div
              className={`absolute top-0 left-0 w-1 h-full ${stat.borderColor}`}
            />
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 font-medium mt-1">
                  {stat.label}
                </div>
              </div>
              <div
                className={`w-8 h-8 rounded-lg ${stat.iconBg} flex items-center justify-center ${stat.iconColor}`}
              >
                <stat.icon className="w-4 h-4" />
              </div>
            </div>
            <div
              className={`text-[10px] font-medium flex items-center gap-1 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
            >
              {stat.trend === "up" ? (
                <FiTrendingUp className="w-3 h-3" />
              ) : (
                <FiTrendingDown className="w-3 h-3" />
              )}
              {stat.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsSection;
