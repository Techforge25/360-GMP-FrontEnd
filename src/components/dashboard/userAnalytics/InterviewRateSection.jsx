"use client";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { FiMousePointer, FiClock } from "react-icons/fi";

const InterviewRateSection = () => {
  // Data for the semi-circle gauge
  // Value is 24.6%, so the filled part is 24.6 and empty is 100-24.6
  const data = [
    { name: "Rate", value: 0, color: "#9333ea" }, // Purple
    { name: "Remaining", value: 75.4, color: "#e5e7eb" }, // Gray
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 shadow-sm flex flex-col justify-between h-full">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Interview Rate</h3>

      <div className="flex-1 flex flex-col items-center justify-center relative min-h-[160px]">
        {/* Semi-Circle Chart */}
        <div className="w-full h-full absolute inset-0 flex items-center justify-center">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="70%" // Moved down to simulate semi-circle better
                startAngle={180}
                endAngle={0}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                <Cell key="cell-0" fill="#a855f7" />
                <Cell key="cell-1" fill="#e5e7eb" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Percentage Text Centered */}
        <div className="text-center relative mt-10 z-10">
          <div className="text-4xl font-bold text-gray-900">0 %</div>
          <div className="text-sm font-medium text-gray-500">Conversion</div>
        </div>
      </div>

      <div className="text-center mb-6">
        <p className="text-sm text-purple-600 font-medium bg-purple-50 inline-block px-3 py-1 rounded-full">
          All Time Success Rate 0%
        </p>
        <p className="text-[10px] text-gray-400 mt-1 max-w-[200px] mx-auto leading-tight">
          Total Interview Invites / Total Job Applications
        </p>
      </div>

      <div className="space-y-3 mt-auto">
        {/* Profile CTR */}
        <div className="bg-gray-100 rounded-lg p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center text-blue-600">
            <FiMousePointer className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Profile CTR</p>
            <p className="text-sm font-bold text-gray-900">0 %</p>
          </div>
        </div>

        {/* Avg Response Time */}
        <div className="bg-gray-100 rounded-lg p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-purple-100 flex items-center justify-center text-purple-600">
            <FiClock className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Avg Response Time</p>
            <p className="text-sm font-bold text-gray-900">0 Days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewRateSection;
