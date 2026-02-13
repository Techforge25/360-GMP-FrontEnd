"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const SalaryDistributionSection = () => {
  const data = [
    { name: "$60k-80k", count: 0, fill: "#cbd5e1" },
    { name: "$80k-100k", count: 0, fill: "#cbd5e1" },
    { name: "$100k-120k", count: 0, fill: "#000000" }, // Highlighted
    { name: "$120k-140k", count: 0, fill: "#cbd5e1" },
    { name: "$140k+", count: 0, fill: "#cbd5e1" },
  ];

  return (
    <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 p-5 sm:p-6 shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            Salary Range Distribution
          </h3>
          <p className="text-sm text-gray-500">
            Your focus areas for career development
          </p>
        </div>
        <span className="text-smfont-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded-md h-fit">
          Applied Jobs
        </span>
      </div>

      <div className="h-[250px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 10, left: -20, bottom: 5 }}
            barSize={28}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f3f4f6"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#6b7280" }}
              interval={0}
            />
            <YAxis hide />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Floating tooltip for highlighted item */}
        <div className="absolute top-[10%] left-[45%] bg-white border border-gray-200 shadow-sm rounded p-2 z-10 flex items-center gap-2">
          <div className="w-1 h-8 bg-black rounded-full"></div>
          <div>
            <div className="text-[10px] text-gray-500 font-medium">
              $ 100k-120k
            </div>
            <div className="text-smtext-black font-bold">Count : 45</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryDistributionSection;
