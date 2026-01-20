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
      iconBg: "bg-[#0B8806]",
      iconColor: "text-[#0B8806]",
      borderColor: "border-[#0B8806]",
      bgColor: "bg-[#E6F6E9]",
    },
    {
      label: "New Leads/Quotes",
      value: "43",
      change: "+ 6% vs last period",
      trend: "up",
      icon: FiFileText,
      iconBg: "bg-[#185ADB]",
      iconColor: "text-[#185ADB]",
      borderColor: "border-[#185ADB]",
      bgColor: "bg-[#DFEDFF]",
    },
    {
      label: "Conversion Rate",
      value: "1.2 %",
      change: "+ 24% vs last period",
      trend: "up",
      icon: FiRefreshCw,
      iconBg: "bg-[#F4B400]",
      iconColor: "text-[#F4B400]",
      borderColor: "border-[#F4B400]",
      bgColor: "bg-[#FFF7E6]",
    },
    {
      label: "Critical Alerts",
      value: "100",
      change: "- 8.5% vs last period",
      trend: "down",
      icon: FiAlertCircle,
      iconBg: "bg-[#D60000]",
      iconColor: "text-[#D60000]",
      borderColor: "border-[#D60000]",
      bgColor: "bg-[#FFE6E6]",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-black">
          Core Profile Analytics
        </h2>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 text-[#6C49AC] rounded-md text-xs font-semibold hover:bg-indigo-100 transition-colors">
          <p>Business Analytics</p>
          <img src="/assets/images/analyticsIcon.png" alt="" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl border ${stat.borderColor} ${stat.bgColor} relative overflow-hidden group hover:border-gray-200 transition-colors`}
          >
            <div
              className={`absolute top-0 left-0 w-1 h-full ${stat.borderColor}`}
            />
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className={`text-2xl font-semibold ${stat.iconColor}`}>
                  {stat.value}
                </div>
                <div className="text-xs text-black font-medium mt-1 mb-2">
                  {stat.label}
                </div>
              </div>
              <div
                className={`w-8 h-8 rounded-lg ${stat.iconBg} flex items-center justify-center text-white`}
              >
                <stat.icon className="w-4 h-4" />
              </div>
            </div>
            <div
              className={`text-[10px] font-medium flex items-center gap-1 ${stat.trend === "up" ? "text-[#0B8806]" : "text-[#D60000]"}`}
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
