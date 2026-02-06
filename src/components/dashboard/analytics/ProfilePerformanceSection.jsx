"use client";
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
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
  FiUser,
  FiFileText,
  FiRefreshCw,
  FiAlertCircle,
  FiTrendingUp,
  FiTrendingDown,
} from "react-icons/fi";
import businessProfileAPI from "@/services/businessProfileAPI";

const ProfilePerformanceSection = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    views: 0,
    leads: 0,
    conversion: 0,
    criticalAlerts: 0,
  });
  const [viewsData, setViewsData] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const results = await Promise.allSettled([
          businessProfileAPI.getViewCounts(),
          businessProfileAPI.getNewLeads("30d"),
          businessProfileAPI.getConversionRate("30d"),
          businessProfileAPI.getLowStockProducts({ limit: 1 }),
          businessProfileAPI.getViewsOverTime("7d"),
        ]);

        const [
          viewsRes,
          leadsRes,
          conversionRes,
          lowStockRes,
          viewsOverTimeRes,
        ] = results;

        setData({
          views:
            viewsRes.status === "fulfilled" ? viewsRes.value?.data || 0 : 0,
          leads:
            leadsRes.status === "fulfilled" ? leadsRes.value?.data || 0 : 0,
          conversion:
            conversionRes.status === "fulfilled"
              ? conversionRes.value?.data || 0
              : 0,
          criticalAlerts:
            lowStockRes.status === "fulfilled"
              ? lowStockRes.value?.data?.totalDocs || 0
              : 0,
        });

        // Process views over time data
        if (
          viewsOverTimeRes.status === "fulfilled" &&
          viewsOverTimeRes.value?.data
        ) {
          const apiData = viewsOverTimeRes.value.data;

          // Check if we have actual data
          if (Array.isArray(apiData) && apiData.length > 0) {
            // Transform API data to chart format
            const transformedData = apiData.map((item) => ({
              day: new Date(item.date).toLocaleDateString("en-US", {
                weekday: "short",
              }),
              views: item.views || 0,
              fullDate: item.date,
            }));

            setViewsData(transformedData);

            if (process.env.NODE_ENV === "development") {
              console.log("Views over time data loaded:", transformedData);
            }
          } else {
            // Empty array - show zeros
            if (process.env.NODE_ENV === "development") {
              console.warn("Views over time API returned empty array");
            }
            setViewsData([
              { day: "Mon", views: 0 },
              { day: "Tue", views: 0 },
              { day: "Wed", views: 0 },
              { day: "Thu", views: 0 },
              { day: "Fri", views: 0 },
              { day: "Sat", views: 0 },
              { day: "Sun", views: 0 },
            ]);
          }
        } else {
          // API failed - show zeros
          if (process.env.NODE_ENV === "development") {
            console.warn("Views over time API failed");
          }
          setViewsData([
            { day: "Mon", views: 0 },
            { day: "Tue", views: 0 },
            { day: "Wed", views: 0 },
            { day: "Thu", views: 0 },
            { day: "Fri", views: 0 },
            { day: "Sat", views: 0 },
            { day: "Sun", views: 0 },
          ]);
        }

        // Silently handle failures
        if (process.env.NODE_ENV === "development") {
          results.forEach((result, index) => {
            if (result.status === "rejected") {
              const apiNames = [
                "getViewCounts",
                "getNewLeads",
                "getConversionRate",
                "getLowStockProducts",
                "getViewsOverTime",
              ];
              console.warn(
                `Analytics API ${apiNames[index]} not available:`,
                result.reason?.message || "No data",
              );
            }
          });
        }
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  // Metrics data using API values
  const metricsData = [
    {
      title: "Profile Views (30D)",
      value:
        typeof data.views === "number"
          ? data.views.toLocaleString()
          : data.views,
      change: "+12%",
      trend: "up",
      period: "vs last period",
      icon: FiUser,
      bgColor: "bg-green-50",
      iconBg: "bg-green-500",
      iconColor: "text-green-500",
      borderColor: "border-green-200",
    },
    {
      title: "New Leads/Quotes",
      value: data.leads,
      change: "+4%",
      trend: "up",
      period: "vs last period",
      icon: FiFileText,
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-500",
      iconColor: "text-blue-500",
      borderColor: "border-blue-200",
    },
    {
      title: "Conversion Rate",
      value: `${data.conversion} %`,
      change: "+24%",
      trend: "up",
      period: "vs last period",
      icon: FiRefreshCw,
      bgColor: "bg-yellow-50",
      iconBg: "bg-yellow-600",
      iconColor: "text-yellow-600",
      borderColor: "border-yellow-200",
    },
    {
      title: "Critical Alerts",
      value: data.criticalAlerts,
      change: "-0.5%",
      trend: "down",
      period: "vs last period",
      icon: FiAlertCircle,
      bgColor: "bg-red-50",
      iconBg: "bg-red-500",
      iconColor: "text-red-500",
      borderColor: "border-red-200",
    },
  ];

  // Mock data for donut chart (Traffic Sources)
  const trafficData = [
    { name: "Search", value: 55, color: "#2563eb" },
    { name: "Community", value: 26, color: "#16a34a" },
    { name: "Direct Link", value: 19, color: "#f59e0b" },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Performance Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          Profile Performance
        </h2>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricsData.map((metric, index) => (
          <div
            key={index}
            className={`${metric.bgColor} border ${metric.borderColor} rounded-xl p-4 sm:p-5 relative overflow-hidden`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div
                  className={`text-2xl sm:text-3xl font-bold ${metric.iconColor} mb-1`}
                >
                  {metric.value}
                </div>
                <div className="text-sm font-medium text-gray-700">
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
              <span className="text-gray-500">{metric.period}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views Over Time - Line Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Views Over Time
            </h3>
            <p className="text-sm text-gray-500">
              Daily profile traffic for the selected period
            </p>
          </div>
          {viewsData.length > 0 && viewsData.some((item) => item.views > 0) ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="day"
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  axisLine={{ stroke: "#e5e7eb" }}
                />
                <YAxis
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  axisLine={{ stroke: "#e5e7eb" }}
                  domain={[0, 220]}
                  ticks={[0, 55, 110, 165, 220]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ fill: "#2563eb", r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-center">
                <p className="text-gray-500 text-sm font-medium">
                  No views data available
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Views will appear here once your profile gets traffic
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Analytics Overview - Donut Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Analytics Overview
            </h3>
            <p className="text-sm text-gray-500">
              Daily profile traffic for the selected period
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={trafficData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {trafficData.map((entry, index) => (
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
          <div className="flex justify-center gap-6 mt-4">
            {trafficData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePerformanceSection;
