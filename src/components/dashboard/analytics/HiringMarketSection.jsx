"use client";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  FiBriefcase,
  FiUsers,
  FiUserCheck,
  FiMessageSquare,
  FiTrendingUp,
  FiTrendingDown,
} from "react-icons/fi";
import businessProfileAPI from "@/services/businessProfileAPI";

const HiringMarketSection = () => {
  const [loading, setLoading] = useState(true);
  const [funnelData, setFunnelData] = useState([]);
  const [competitors, setCompetitors] = useState([]);

  useEffect(() => {
    const fetchApplicationFunnel = async () => {
      try {
        setLoading(true);
        const response = await businessProfileAPI.getApplicationFunnel("7d");

        if (response?.data) {
          const apiData = response.data;

          // Transform API data to funnel format
          const transformedData = [
            {
              stage: "Applicants",
              value: apiData.totalApplications || 0,
              color: "#3b82f6",
            },
            { stage: "Viewed", value: apiData.viewed || 0, color: "#60a5fa" },
            {
              stage: "Interview",
              value: apiData.interview || 0,
              label: (apiData.interview || 0).toString(),
              color: "#93c5fd",
            },
            {
              stage: "Rejected",
              value: apiData.rejected || 0,
              color: "#dbeafe",
            },
          ];

          setFunnelData(transformedData);

          if (process.env.NODE_ENV === "development") {
            console.log("Application funnel loaded:", transformedData);
          }
        } else {
          if (process.env.NODE_ENV === "development") {
            console.warn("Application funnel API returned empty data");
          }
          setFunnelData([
            { stage: "Applicants", value: 0, color: "#3b82f6" },
            { stage: "Viewed", value: 0, color: "#60a5fa" },
            { stage: "Interview", value: 0, label: "0", color: "#93c5fd" },
            { stage: "Rejected", value: 0, color: "#dbeafe" },
          ]);
        }
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.warn("Application funnel API failed:", error.message);
        }
        setFunnelData([
          { stage: "Applicants", value: 0, color: "#3b82f6" },
          { stage: "Viewed", value: 0, color: "#60a5fa" },
          { stage: "Interview", value: 0, label: "0", color: "#93c5fd" },
          { stage: "Rejected", value: 0, color: "#dbeafe" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationFunnel();
  }, []);

  useEffect(() => {
    const fetchCompetitors = async () => {
      try {
        const response =
          await businessProfileAPI.getCompetitorBenchmarking("7d");

        if (
          response?.data &&
          Array.isArray(response.data) &&
          response.data.length > 0
        ) {
          // Transform API data to table format
          const transformedData = response.data.map((item, index) => ({
            company: item.companyName || "Unknown Company",
            profileView: item.profileViews?.toLocaleString() || "0",
            growth: `+${item.growthRate}%`,
            growthColor:
              item.growthRate >= 0 ? "text-green-600" : "text-red-600",
            marketShare: "N/A", // Not provided by backend
            isYou: index === 0, // Assuming first is current user
          }));

          setCompetitors(transformedData);

          if (process.env.NODE_ENV === "development") {
            console.log("Competitor benchmarking loaded:", transformedData);
          }
        } else {
          if (process.env.NODE_ENV === "development") {
            console.warn("Competitor benchmarking API returned empty data");
          }
          setCompetitors([]);
        }
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.warn("Competitor benchmarking API failed:", error.message);
        }
        setCompetitors([]);
      }
    };

    fetchCompetitors();
  }, []);

  // Mock data for hiring metrics
  const hiringMetrics = [
    {
      title: "Total Job Views",
      value: "3,450",
      change: "+12%",
      trend: "up",
      icon: FiBriefcase,
      iconBg: "bg-green-500",
    },
    {
      title: "Applications",
      value: "348",
      change: "+12%",
      trend: "up",
      icon: FiUsers,
      iconBg: "bg-blue-500",
    },
    {
      title: "Hired",
      value: "45",
      change: "-1.2%",
      trend: "down",
      period: "Faster than industry avg",
      icon: FiUserCheck,
      iconBg: "bg-gray-500",
    },
    {
      title: "Interview",
      value: "234",
      change: "+24%",
      trend: "up",
      icon: FiMessageSquare,
      iconBg: "bg-yellow-600",
    },
  ];

  // Mock data for sourcing channels
  const sourcingChannels = [
    { name: "360GMP Search", value: 55, color: "#16a34a" },
    { name: "Community", value: 26, color: "#16a34a" },
    { name: "Direct", value: 20, color: "#16a34a" },
  ];

  // Mock data for export market distribution
  const marketData = [
    { name: "North America", value: 0, color: "#2563eb" },
    { name: "Europe", value: 0, color: "#16a34a" },
    { name: "Asia", value: 5, color: "#f59e0b" },
  ];

  return (
    <div className="space-y-6">
      {/* Hiring Metrics Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Hiring Metrics</h2>
      </div>

      {/* Hiring Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {hiringMetrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                  {metric.value}
                </div>
                <div className="text-sm font-medium text-gray-600">
                  {metric.title}
                </div>
              </div>
              <div className={`${metric.iconBg} rounded-lg p-2.5 text-white`}>
                <metric.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              {metric.trend === "up" ? (
                <FiTrendingUp className="w-3.5 h-3.5 text-green-600" />
              ) : (
                <FiTrendingDown className="w-3.5 h-3.5 text-red-600" />
              )}
              <span
                className={
                  metric.trend === "up"
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                {metric.change}
              </span>
              {metric.period && (
                <span className="text-gray-500">{metric.period}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Application Funnel and Sourcing Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Application Funnel */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Application Funnel
            </h3>
            <p className="text-sm text-gray-500">
              Candidate drop-off at each stage
            </p>
          </div>
          <div className="space-y-3">
            {funnelData.map((item, index) => (
              <div key={index} className="space-y-1.5">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-700 font-medium">
                    {item.stage}
                  </span>
                  {item.label && (
                    <span className="text-gray-400 text-sm">
                      Value: {item.label}
                    </span>
                  )}
                </div>
                <div className="relative h-10 bg-gray-100 rounded-lg overflow-hidden">
                  <div
                    className="absolute h-full rounded-lg transition-all duration-500"
                    style={{
                      width:
                        funnelData.length > 0 && funnelData[0].value > 0
                          ? `${(item.value / funnelData[0].value) * 100}%`
                          : "0%",
                      backgroundColor: item.color,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Sourcing Channels */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Top Sourcing Channels
            </h3>
            <p className="text-sm text-gray-500">Where applicants find you</p>
          </div>
          <div className="space-y-4">
            {sourcingChannels.map((channel, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-700 font-medium">
                    {channel.name}
                  </span>
                  <span className="text-gray-600 font-semibold">
                    {channel.value}%
                  </span>
                </div>
                <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="absolute h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${channel.value}%`,
                      backgroundColor: channel.color,
                    }}
                  ></div>
                </div>
              </div>
            ))}
            <p className="text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
              Most candidates come from direct search
            </p>
          </div>
        </div>
      </div>

      {/* Market Trends & Benchmarking */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Market Trends & Benchmarking
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Export Market Distribution */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                Export Market Distribution
              </h3>
              <p className="text-sm text-gray-500">Global demand by region</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={marketData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {marketData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value) => `${value}%`}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2 mt-4">
              {marketData.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-gray-900 font-medium">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Competitor Benchmarking */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                Competitor Benchmarking
              </h3>
              <p className="text-sm text-gray-500">Where applicants find you</p>
            </div>
            <div className="overflow-x-auto max-h-[300px] overflow-y-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Company
                    </th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Profile View
                    </th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Growth MOM
                    </th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Market Share
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {competitors.length > 0 ? (
                    competitors.map((competitor, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-100 last:border-0"
                      >
                        <td className="py-4 px-2">
                          <div className="flex items-center gap-2">
                            {competitor.isYou && (
                              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            )}
                            <span
                              className={`text-sm ${competitor.isYou ? "font-semibold text-gray-900" : "text-gray-700"}`}
                            >
                              {competitor.company}
                              {competitor.isYou ? " (You)" : ""}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-2 text-sm text-gray-700">
                          {competitor.profileView}
                        </td>
                        <td className="py-4 px-2">
                          <span
                            className={`text-sm font-semibold ${competitor.growthColor}`}
                          >
                            {competitor.growth}
                          </span>
                        </td>
                        <td className="py-4 px-2 text-sm text-gray-700">
                          {competitor.marketShare}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-8 text-center">
                        <p className="text-gray-500 text-sm">
                          No competitor data available
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiringMarketSection;
