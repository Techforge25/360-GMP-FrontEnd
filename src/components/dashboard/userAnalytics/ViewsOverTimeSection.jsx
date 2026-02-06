"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const ViewsOverTimeSection = () => {
  // Mock data matching the design
  const data = [
    { date: "Nov 12", views: 10, searches: 5 },
    { date: "Nov 13", views: 18, searches: 8 },
    { date: "Nov 14", views: 6, searches: 12 },
    { date: "Nov 15", views: 20, searches: 7 },
    { date: "Nov 16", views: 9, searches: 15 },
    { date: "Nov 17", views: 21, searches: 5 },
    { date: "Nov 18", views: 23, searches: 8 },
    { date: "Nov 19", views: 16, searches: 6 },
    { date: "Nov 20", views: 13, searches: 8 },
    { date: "Nov 21", views: 15, searches: 9 },
    { date: "Nov 22", views: 11, searches: 13 },
    { date: "Nov 23", views: 25, searches: 14 },
    { date: "Nov 24", views: 14, searches: 6 }, // Tooltip point in design
    { date: "Nov 25", views: 22, searches: 8 },
    { date: "Nov 26", views: 24, searches: 10 },
    { date: "Nov 27", views: 19, searches: 7 },
    { date: "Nov 28", views: 22, searches: 13 },
    { date: "Nov 29", views: 29, searches: 5 },
    { date: "Nov 30", views: 20, searches: 8 },
    { date: "Dec 01", views: 18, searches: 9 },
    { date: "Dec 03", views: 28, searches: 7 },
    { date: "Dec 04", views: 26, searches: 12 },
    { date: "Dec 05", views: 27, searches: 14 },
    { date: "Dec 06", views: 19, searches: 16 },
    { date: "Dec 07", views: 19, searches: 12 },
    { date: "Dec 08", views: 22, searches: 10 },
    { date: "Dec 10", views: 32, searches: 18 },
  ];

  return (
    <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5 sm:p-6 shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            Views Over Time
          </h3>
          <p className="text-sm text-gray-500">
            Monthly profile traffic for the selected period
          </p>
        </div>
        <div className="flex items-center gap-4 text-smfont-medium">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#2dd4bf]"></div>
            <span className="text-gray-500">Profile Views</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <span className="text-gray-500">Search Appearances</span>
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f3f4f6"
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              interval={3}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              domain={[0, 32]}
              ticks={[0, 8, 16, 24, 32]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              cursor={{ stroke: "#e5e7eb", strokeWidth: 1 }}
            />
            <Line
              type="monotone"
              dataKey="views"
              stroke="#2dd4bf"
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 4,
                fill: "#2dd4bf",
                stroke: "white",
                strokeWidth: 2,
              }}
            />
            <Line
              type="monotone"
              dataKey="searches"
              stroke="#d1d5db"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              activeDot={{
                r: 4,
                fill: "#d1d5db",
                stroke: "white",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ViewsOverTimeSection;
