"use client";
import React, { useState, useEffect } from "react";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiUser,
  FiFileText,
  FiRefreshCw,
  FiAlertCircle,
  FiBarChart2,
} from "react-icons/fi";
import businessProfileAPI from "@/services/businessProfileAPI";

const AnalyticsSection = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    views: 0,
    leads: 0,
    conversion: 0,
    criticalAlerts: 0,
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const [viewsRes, leadsRes, conversionRes, lowStockRes] =
          await Promise.all([
            businessProfileAPI.getViewCounts(),
            businessProfileAPI.getNewLeads("30d"), // Matching the label "30D"
            businessProfileAPI.getConversionRate("30d"),
            businessProfileAPI.getLowStockProducts({ limit: 1 }), // Just need count
          ]);

        setData({
          views: viewsRes?.data || 0,
          leads: leadsRes?.data || 0,
          conversion: conversionRes?.data || 0,
          criticalAlerts: lowStockRes?.data?.totalDocs || 0,
        });
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const stats = [
    {
      label: "Profile Views (All Time)",
      value:
        typeof data.views === "number"
          ? data.views.toLocaleString()
          : data.views,
      // change: "+12% vs last period", // API doesn't support change yet
      trend: "neutral",
      icon: FiUser,
      iconBg: "bg-[#0B8806]",
      iconColor: "text-[#0B8806]",
      borderColor: "border-[#0B8806]",
      bgColor: "bg-[#E6F6E9]",
    },
    {
      label: "New Leads/Quotes (30D)",
      value: data.leads,
      // change: "+ 6% vs last period",
      trend: "neutral",
      icon: FiFileText,
      iconBg: "bg-[#185ADB]",
      iconColor: "text-[#185ADB]",
      borderColor: "border-[#185ADB]",
      bgColor: "bg-[#DFEDFF]",
    },
    {
      label: "Conversion Rate (30D)",
      value: `${data.conversion}%`,
      // change: "+ 24% vs last period",
      trend: "neutral",
      icon: FiRefreshCw,
      iconBg: "bg-[#F4B400]",
      iconColor: "text-[#F4B400]",
      borderColor: "border-[#F4B400]",
      bgColor: "bg-[#FFF7E6]",
    },
    {
      label: "Critical Alerts (Low Stock)",
      value: data.criticalAlerts,
      // change: "- 8.5% vs last period",
      trend: data.criticalAlerts > 0 ? "down" : "neutral", // Red if alerts exist
      icon: FiAlertCircle,
      iconBg: "bg-[#D60000]",
      iconColor: "text-[#D60000]",
      borderColor: "border-[#D60000]",
      bgColor: "bg-[#FFE6E6]",
    },
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-32 bg-gray-100 rounded-xl animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-black">
          Core Profile Analytics
        </h2>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 text-[#6C49AC] rounded-md text-sm font-semibold hover:bg-indigo-100 transition-colors">
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
                <div className="text-sm text-black font-medium mt-1 mb-2">
                  {stat.label}
                </div>
              </div>
              <div
                className={`w-8 h-8 rounded-lg ${stat.iconBg} flex items-center justify-center text-white`}
              >
                <stat.icon className="w-4 h-4" />
              </div>
            </div>
            {stat.change && (
              <div
                className={`text-[10px] font-medium flex items-center gap-1 ${stat.trend === "up" ? "text-[#0B8806]" : stat.trend === "down" ? "text-[#D60000]" : "text-gray-500"}`}
              >
                {stat.trend === "up" ? (
                  <FiTrendingUp className="w-3 h-3" />
                ) : stat.trend === "down" ? (
                  <FiTrendingDown className="w-3 h-3" />
                ) : null}
                {stat.change}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsSection;
