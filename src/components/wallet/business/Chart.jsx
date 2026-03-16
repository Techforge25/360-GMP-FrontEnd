"use client"
import {
     ComposedChart,
     Bar,
     Line,
     XAxis,
     YAxis,
     CartesianGrid,
     Tooltip,
     Legend,
     ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import walletBusinessAPI from "@/services/walletBusinessAPI";
import { getFormattedChartData } from "@/helpers/wallet";

const formatYAxis = (value) => {
     if (value >= 1000) return `$${value / 1000}k`;
     return `$${value}`;
};

const CustomTooltip = ({ active, payload, label }) => {
     if (!active || !payload?.length) return null;

     const escrow = payload.find(p => p.dataKey === "escrowVolume");
     const income = payload.find(p => p.dataKey === "netIncome");

     return (
          <div className="rounded-lg border border-border bg-white px-4 py-3 shadow-md">
               <p className="mb-1 text-sm font-medium text-[#556179]">
                    {label}
               </p>

               {escrow && (
                    <p className="text-sm text-blue-600">
                         Escrow Volume : ${escrow.value}
                    </p>
               )}

               {income && (
                    <p className="text-sm text-black">
                         Net Income : ${income.value}
                    </p>
               )}
          </div>
     );
};

const CustomLegend = ({ payload }) => {
     if (!payload?.length) return null;
     return (
          <div className="mt-4 flex items-center justify-center gap-6">
               {payload.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                         <span
                              className="inline-block h-3 w-3 rounded-sm"
                              style={{ backgroundColor: entry.color }}
                         />
                         <span className={`text-sm ${entry.value === "Escrow Volume" ? "text-[#1A4DFF]" : "text-black"} text-muted-foreground`}>{entry.value}</span>
                    </div>
               ))}
          </div>
     );
};

export default function Chart() {
     const [sortBy, setSortBy] = useState("Last 7 Days");
     const [chartData, setChartData] = useState([])

     useEffect(() => {
          const fetchFinancialPerformanceChartData = async () => {
               const chart = await walletBusinessAPI.getFinancialPerformance()
               const getChartData = getFormattedChartData(chart.data)
               setChartData(getChartData)

          }
          fetchFinancialPerformanceChartData()
     }, [])

     return (
          <div className="rounded-xl bg-white border border-border bg-card p-6 mb-6">
               {/* Header */}
               <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-black">
                         Financial Performance
                    </h2>
                    <div className="flex items-center gap-2">
                         <span className="text-sm text-muted-foreground">Sort By</span>
                         <button className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground">
                              {sortBy}
                              <ChevronDown className="h-4 w-4 text-muted-foreground" />
                         </button>
                    </div>
               </div>

               {/* Chart */}
               <div className="h-[320px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                         <ComposedChart data={chartData} barCategoryGap="70%">
                              <CartesianGrid
                                   vertical={false}
                                   strokeDasharray=""
                                   stroke="#e3e7ee"
                              />
                              <XAxis
                                   dataKey="day"
                                   axisLine={false}
                                   tickLine={false}
                                   tick={{ fontSize: 13, fill: "#556179" }}
                                   dy={10}
                              />
                              <YAxis
                                   axisLine={false}
                                   tickLine={false}
                                   tickFormatter={formatYAxis}
                                   tick={{ fontSize: 13, fill: "#556179" }}
                                   ticks={[0, 2500, 5000, 7500, 10000]}
                              />
                              <Tooltip content={<CustomTooltip />} />
                              <Legend content={<CustomLegend />} />
                              <Bar
                                   dataKey="value"
                                   name="Escrow Volume"
                                   fill="hsl(225, 100%, 55%)"
                                   radius={[4, 4, 0, 0]}
                                   barSize={28}
                              />
                         </ComposedChart>
                    </ResponsiveContainer>
               </div>
          </div>
     );
};