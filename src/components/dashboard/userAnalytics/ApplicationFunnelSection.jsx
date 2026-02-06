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

const ApplicationFunnelSection = () => {
  const data = [
    { name: "Applied", value: 100 },
    { name: "Hired", value: 65 },
    { name: "Interviewing", value: 25 },
    { name: "Rejected", value: 8 },
  ];

  // Custom colors based on design - muted blue shades
  const colors = ["#1d4ed8", "#60a5fa", "#93c5fd", "#dbeafe"];

  return (
    <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5 sm:p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          Application Success Funnel
        </h3>
        <p className="text-sm text-gray-500">Application Pipeline</p>
      </div>

      <div className="h-[250px] w-full relative">
        {/* Custom Label for Interviewing/Rejected count if needed */}
        <div className="absolute bottom-[20%] left-[18%] bg-white border border-gray-200 shadow-sm rounded-lg p-2 z-10 hidden">
          {/* This mimics the floating label in design but hardcoding position is tricky responsiveness-wise. 
              Better to rely on Tooltips or Axis labels. 
              The design shows a floating "Interview Value: 2". I'll use a custom cursor or tooltip instead for clean implementation.
          */}
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
            barSize={32}
            barGap={2}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              stroke="#f3f4f6"
            />
            <XAxis type="number" hide />
            <YAxis
              dataKey="name"
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              width={80}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Manually placed label to match design exactly if requested - simpler to stick to clean chart first */}
        <div className="absolute top-[68%] left-[22%] bg-white border border-gray-200 shadow-sm rounded p-1.5 z-10">
          <div className="text-[10px] text-gray-500 font-medium">Interview</div>
          <div className="text-smtext-blue-500 font-bold">Value : 2</div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationFunnelSection;
