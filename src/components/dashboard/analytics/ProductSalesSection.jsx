"use client";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import {
  FiPackage,
  FiFileText,
  FiDollarSign,
  FiTrendingUp,
  FiTrendingDown,
  FiArrowRight,
} from "react-icons/fi";
import businessProfileAPI from "@/services/businessProfileAPI";

const ProductSalesSection = () => {
  const [loading, setLoading] = useState(true);
  const [topProducts, setTopProducts] = useState([]);
  const [productMetricsData, setProductMetricsData] = useState({
    totalViews: 0,
    conversion: 0,
    revenuePotential: 0,
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);

        // Fetch all analytics data in parallel
        const results = await Promise.allSettled([
          businessProfileAPI.getTopPerformingProducts("7d"),
          businessProfileAPI.getTotalProductViews("7d"),
          businessProfileAPI.getConversionRate("30d"),
          businessProfileAPI.getRevenuePotential("7d"),
        ]);

        const [
          topProductsRes,
          totalViewsRes,
          conversionRes,
          revenuePotentialRes,
        ] = results;

        // Process top performing products
        if (
          topProductsRes.status === "fulfilled" &&
          topProductsRes.value?.data &&
          Array.isArray(topProductsRes.value.data) &&
          topProductsRes.value.data.length > 0
        ) {
          // Transform API data to chart format
          const transformedData = topProductsRes.value.data.map((item) => ({
            name: item.title,
            views: item.views || 0,
            quotes: item.purchases || 0,
          }));

          setTopProducts(transformedData);

          if (process.env.NODE_ENV === "development") {
            console.log("Top performing products loaded:", transformedData);
          }
        } else {
          // Empty data
          if (process.env.NODE_ENV === "development") {
            console.warn("Top performing products API returned empty data");
          }
          setTopProducts([]);
        }

        // Process product metrics
        setProductMetricsData({
          totalViews:
            totalViewsRes.status === "fulfilled"
              ? totalViewsRes.value?.data?.totalViews || 0
              : 0,
          conversion:
            conversionRes.status === "fulfilled"
              ? conversionRes.value?.data || 0
              : 0,
          revenuePotential:
            revenuePotentialRes.status === "fulfilled"
              ? revenuePotentialRes.value?.data?.revenuePotentialPercent || 0
              : 0,
        });

        // Log warnings for failed APIs
        if (process.env.NODE_ENV === "development") {
          results.forEach((result, index) => {
            if (result.status === "rejected") {
              const apiNames = [
                "getTopPerformingProducts",
                "getTotalProductViews",
                "getConversionRate",
                "getRevenuePotential",
              ];
              console.warn(
                `Analytics API ${apiNames[index]} failed:`,
                result.reason?.message || "No data",
              );
            }
          });
        }
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.warn("Analytics fetch failed:", error.message);
        }
        setTopProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  // Product metrics using API data
  const productMetrics = [
    {
      title: "Total Product Views",
      value:
        typeof productMetricsData.totalViews === "number"
          ? productMetricsData.totalViews.toLocaleString()
          : productMetricsData.totalViews,
      change: "+12%",
      trend: "up",
      period: "vs last period",
      icon: FiPackage,
      iconBg: "bg-green-500",
    },
    {
      title: "Quote Conversion",
      value: `${productMetricsData.conversion}%`,
      change: "0%",
      trend: "down",
      period: "vs last period",
      icon: FiFileText,
      iconBg: "bg-blue-500",
    },
    {
      title: "Revenue Potential",
      value: `${productMetricsData.revenuePotential}%`,
      period: "vs last period",
      icon: FiDollarSign,
      iconBg: "bg-yellow-600",
    },
  ];

  // Mock data for inventory alerts
  const inventoryAlerts = [
    {
      name: "CNC Machine Component",
      stock: 0,
      status: "Low Stock",
      statusColor: "bg-yellow-100 text-yellow-700 border-yellow-300",
    },
    {
      name: "Industrial Pump X1",
      stock: 0,
      status: "Critical",
      statusColor: "bg-red-100 text-red-700 border-red-300",
    },
    {
      name: "Precision Disc Brake System",
      stock: 0,
      status: "Low Stock",
      statusColor: "bg-yellow-100 text-yellow-700 border-yellow-300",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Product & Sales Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          Product & Sales
        </h2>
      </div>

      {/* Product Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {productMetrics.map((metric, index) => (
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
            {metric.trend ? (
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
            ) : metric.period ? (
              <div className="text-sm text-gray-500">{metric.period}</div>
            ) : null}
          </div>
        ))}
      </div>

      {/* Charts and Alerts Section */}
      <div className="grid grid-cols-1 lg:col-span-3 gap-6">
        {/* Top Performing Products - Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Top Performing Products
            </h3>
            <p className="text-sm text-gray-500">
              Ranked by views and quote requests
            </p>
          </div>
          {topProducts.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={topProducts}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f0f0f0"
                  horizontal={false}
                />
                <XAxis type="number" tick={{ fill: "#6b7280", fontSize: 12 }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fill: "#374151", fontSize: 12 }}
                  width={90}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "12px" }} iconType="circle" />
                <Bar
                  dataKey="views"
                  fill="#a78bfa"
                  radius={[0, 4, 4, 0]}
                  name="Views"
                />
                <Bar
                  dataKey="quotes"
                  fill="#1e1b4b"
                  radius={[0, 4, 4, 0]}
                  name="Quotes"
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-center">
                <p className="text-gray-500 text-sm font-medium">
                  No products data available
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Add products to see performance analytics
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Inventory Alerts */}
        {/* <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Inventory Alerts
            </h3>
            <p className="text-sm text-gray-500">Items requiring attention</p>
          </div>
          <div className="space-y-4">
            {inventoryAlerts.map((item, index) => (
              <div
                key={index}
                className="pb-4 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      ({item.stock} Units Left)
                    </p>
                  </div>
                </div>
                <span
                  className={`inline-block px-2.5 py-1 rounded-full text-sm font-medium border ${item.statusColor}`}
                >
                  {item.status}
                </span>
              </div>
            ))}
            <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-1">
              Update Inventory
              <FiArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProductSalesSection;
