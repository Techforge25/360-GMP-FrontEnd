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

const TopCategoriesSection = () => {
  const data = [
    { name: "CNC Machined X1", value: 0 },
    { name: "Safety Valve V2", value: 0 },
    { name: "Control Panel A", value: 0 },
    { name: "Hydraulic Seal", value: 0 },
    { name: "Filter Mesh", value: 0 },
  ];

  return (
    <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 p-5 sm:p-6 shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            Top Purchased Categories
          </h3>
          <p className="text-sm text-gray-500">
            Your focus areas for career development
          </p>
        </div>
        <span className="text-smfont-semibold text-purple-700 bg-purple-50 px-2 py-1 rounded-md h-fit">
          0 Categories
        </span>
      </div>

      <div className="h-[250px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
            barSize={20}
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
              hide // Hiding YAxis labels to use custom labels inside/overlapped or just tooltips as per design interpretation which seems to show labels left aligned.
              // Wait, design has labels on the left. Let me enable them.
            />
            <YAxis
              yAxisId="left"
              dataKey="name"
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#6b7280" }}
              width={90}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Bar
              dataKey="value"
              fill="#a855f7"
              radius={[0, 4, 4, 0]}
              yAxisId="left"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fillOpacity={index === 0 ? 1 : 0.8 - index * 0.15}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Floating tooltip simulation for top item as seen in design */}
        <div className="absolute top-[20%] left-[50%] bg-white border border-gray-200 shadow-sm rounded p-2 z-10">
          <div className="text-[10px] text-gray-500 font-medium">
            CNC Machined X1
          </div>
          <div className="text-smtext-purple-600 font-bold">Items : 80</div>
        </div>
      </div>
    </div>
  );
};

export default TopCategoriesSection;
