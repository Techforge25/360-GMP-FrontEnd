"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FiCalendar, FiSmartphone } from "react-icons/fi";
import { Button } from "@/components/ui/Button";

const ChartWidget = ({ data }) => {
  // Mock data matching the "Content Health & Moderation" chart
  const defaultData = [
    { name: "1", health: 40, action: 24, reported: 24 },
    { name: "2", health: 30, action: 13, reported: 22 },
    { name: "3", health: 20, action: 58, reported: 22 },
    { name: "4", health: 27, action: 39, reported: 20 },
    { name: "5", health: 18, action: 48, reported: 21 },
    { name: "6", health: 23, action: 38, reported: 25 },
    { name: "7", health: 34, action: 43, reported: 21 },
  ];

  const chartData = data || defaultData;

  return (
    <Card className="w-full max-w-2xl shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-highlight-green">
            <div className="h-3 w-3 rounded-full bg-accent-success" />
          </div>
          <CardTitle className="text-base font-semibold">
            Content Health & Moderation
          </CardTitle>
        </div>
        <Button variant="outline" size="sm" className="h-8 text-xs font-normal">
          This Month <FiChevronDown className="ml-1" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorReported" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dc2626" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorAction" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                fontSize={12}
                tickMargin={10}
              />
              <YAxis tickLine={false} axisLine={false} fontSize={12} />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="reported"
                stroke="#dc2626"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorReported)"
              />
              <Area
                type="monotone"
                dataKey="health"
                stroke="#22c55e"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorAction)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 flex items-center justify-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-accent-danger" />
            <span>Reported Content</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-accent-success" />
            <span>Admin Actions</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

function FiChevronDown(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export { ChartWidget };
