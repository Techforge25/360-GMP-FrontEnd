import { chartDataUser } from "@/constants/index";
import { useState } from "react";
import {
     XAxis,
     YAxis,
     CartesianGrid,
     Tooltip,
     ResponsiveContainer,
     Area,
     AreaChart,
} from "recharts";

export default function SpendingChart() {
     return (
          <div className="bg-card rounded-xl border border-border p-5">
               <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-black">Spending Activity</h2>
               </div>

               <div className="h-[260px]">
                    <ResponsiveContainer width="100%" height="100%">
                         <AreaChart data={chartDataUser} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
                              <defs>
                                   <linearGradient id="marketplaceGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="hsl(243, 75%, 35%)" stopOpacity={0.15} />
                                        <stop offset="100%" stopColor="hsl(243, 75%, 35%)" stopOpacity={0.02} />
                                   </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" vertical={false} />
                              <XAxis
                                   dataKey="month"
                                   axisLine={false}
                                   tickLine={false}
                                   tick={{ fill: "hsl(220, 10%, 50%)", fontSize: 12 }}
                              />
                              <YAxis
                                   axisLine={false}
                                   tickLine={false}
                                   tick={{ fill: "hsl(220, 10%, 50%)", fontSize: 12 }}
                                   tickFormatter={(v) => `$${v}`}
                              />
                              <Tooltip
                                   contentStyle={{
                                        backgroundColor: "white",
                                        border: "1px solid hsl(220, 13%, 91%)",
                                        borderRadius: "8px",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                        padding: "10px 14px",
                                        fontSize: "13px",
                                   }}
                                   formatter={(value, name) => [
                                        `$${value.toFixed(2)}`,
                                        name === "marketplace" ? "Market Place" : "Refund Amount",
                                   ]}
                                   labelStyle={{ fontWeight: 600, marginBottom: 4 }}
                              />
                              <Area
                                   type="monotone"
                                   dataKey="marketplace"
                                   stroke="hsl(243, 75%, 35%)"
                                   strokeWidth={2.5}
                                   fill="url(#marketplaceGrad)"
                                   dot={false}
                                   activeDot={{ r: 5, fill: "hsl(243, 75%, 35%)", stroke: "white", strokeWidth: 2 }}
                              />
                              <Area
                                   type="monotone"
                                   dataKey="refund"
                                   stroke="hsl(145, 63%, 42%)"
                                   strokeWidth={2}
                                   strokeDasharray="6 4"
                                   fill="transparent"
                                   dot={false}
                                   activeDot={{ r: 4, fill: "hsl(145, 63%, 42%)", stroke: "white", strokeWidth: 2 }}
                              />
                         </AreaChart>
                    </ResponsiveContainer>
               </div>

               <div className="flex items-center justify-center gap-6 mt-3">
                    <div className="flex items-center gap-2">
                         <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                         <span className="text-xs text-muted-foreground">market place</span>
                    </div>
                    <div className="flex items-center gap-2">
                         <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                         <span className="text-xs text-muted-foreground">Refunded Amount</span>
                    </div>
               </div>
          </div>
     );
};