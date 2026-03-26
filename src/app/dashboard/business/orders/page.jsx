"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { FiEye, FiCalendar, FiChevronDown } from "react-icons/fi";
import axios from "axios";
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import { businessTabs, tabs } from "@/constants/index";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

const TAB_TO_ENDPOINT = {
  "All Orders": "/orders/business/all-orders",
  "Awaiting Shipment": "/orders/business/processing-orders",
  "In Transit": "/orders/business/in-transit-orders",
  Delivered: "/orders/business/completed-orders",
  Cancelled: "/orders/business/cancelled-orders",
};

// const TAB_TO_ENDPOINT = [
//   "All Orders",
//   "Awaiting Shipment",
//   "In Transit",
//   "Delivered",
//   "Cancelled",
// ];

const BusinessOrdersPage = () => {
  const [activeTab, setActiveTab] = useState("All Orders");
  const [ordersByTab, setOrdersByTab] = useState({}); // { "All Orders": [...], "Awaiting Shipment": [...] }
  const [pageByTab, setPageByTab] = useState({}); // current page per tab
  const [hasMoreByTab, setHasMoreByTab] = useState({}); // whether more pages exist
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const limit = 10;

  // Get current tab's data
  const currentOrders = ordersByTab[activeTab] || [];
  const currentPage = pageByTab[activeTab] || 1;
  const hasMore = hasMoreByTab[activeTab] ?? true;

  const fetchOrders = useCallback(
    async (page, reset = false) => {
      setLoading(true);
      setError(null);

      try {
        const endpoint = businessTabs[activeTab];

        console.log(`Fetching ${activeTab} page=${page}`);

        const res = await axios.get(`${BASE_URL}${endpoint}`, {
          params: { page, limit },
          withCredentials: true,
        });

        if (!res.data?.success) {
          throw new Error(res.data?.message || "Failed to load orders");
        }

        const newDocs = res.data.data?.docs || [];
        const pagination = res.data.data?.pagination || {};
        const hasNext = pagination.hasNextPage ?? newDocs.length === limit;

        setOrdersByTab((prev) => ({
          ...prev,
          [activeTab]: reset
            ? newDocs
            : [...(prev[activeTab] || []), ...newDocs],
        }));

        setPageByTab((prev) => ({
          ...prev,
          [activeTab]: page,
        }));

        setHasMoreByTab((prev) => ({
          ...prev,
          [activeTab]: hasNext,
        }));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [activeTab],
  );

  // Reset & load first page when tab changes
  useEffect(() => {
    setOrdersByTab((prev) => ({ ...prev, [activeTab]: [] }));
    setHasMoreByTab((prev) => ({ ...prev, [activeTab]: true }));

    fetchOrders(1, true); // always page 1
  }, [activeTab]);

  const getStatusColor = (status = "") => {
    const s = status.toLowerCase();
    if (s.includes("await") || s.includes("process") || s === "pending")
      return "bg-amber-100 text-amber-800";
    if (s.includes("transit") || s.includes("ship"))
      return "bg-purple-100 text-purple-800";
    if (s.includes("deliv")) {
      return "bg-blue-100 text-blue-800";
    }
    if (s.includes("deliv") || s === "completed")
      return "bg-green-100 text-green-800";
    if (s.includes("cancel")) return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-700";
  };

  const getOrderType = (items = []) => {
    const totalQty = items.reduce(
      (sum, item) => sum + (item?.quantity || 0),
      0,
    );
    return totalQty > 1 ? "Bulk" : "Single";
  };

  const handleLoadMore = () => {
    if (loading || !hasMore) return;

    const nextPage = currentPage + 1;
    fetchOrders(nextPage);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Banner */}
      <div className="mx-auto mb-6 bg-[#110026] relative overflow-hidden rounded-xl">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end p-6 lg:p-10 xl:p-12 relative z-10 max-w-[1400px] mx-auto">
          {/* ... banner content remains unchanged ... */}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 border border-gray-200 rounded-xl bg-white">

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-3 border-b border-gray-200">
            {Object.keys(businessTabs).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab
                  ? "bg-[#240457] text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Main content */}
        {loading && currentOrders.length === 0 ? (
          <div className="py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#240457] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading orders...</p>
          </div>
        ) : error ? (
          <div className="py-16 text-center">
            <p className="text-red-600 text-lg font-medium">{error}</p>
            <button
              onClick={() => fetchOrders(1, true)}
              className="mt-5 px-8 py-3 bg-[#240457] text-white rounded-lg hover:bg-purple-950 transition"
            >
              Try Again
            </button>
          </div>
        ) : currentOrders.length === 0 ? (
          <div className="py-20 text-center text-gray-500 text-lg">
            No orders found{" "}
            {activeTab !== "All Orders" ? `in "${activeTab}"` : ""}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="w-full min-w-[900px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Buyer
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider hidden sm:table-cell">
                      Order Date
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider hidden md:table-cell">
                      Order Type
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-5 py-4 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentOrders.map((order) => {
                    const buyerName = order.shippingAddress?.name || "Unknown";
                    const orderType = getOrderType(order.items);

                    return (
                      <tr
                        key={order._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-5 py-4 whitespace-nowrap font-medium text-gray-900">
                          #{order._id?.slice(-8) || "N/A"}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap text-gray-700 max-w-[200px] truncate">
                          {buyerName}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap hidden sm:table-cell text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap font-medium text-gray-900">
                          ${(order.totalAmount || 0).toFixed(2)}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap hidden md:table-cell text-gray-600">
                          {orderType}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
                          >
                            {order.status || "Unknown"}
                          </span>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap text-right">
                          <Link
                            href={`/dashboard/business/orders/${order._id}`}
                            className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition text-sm gap-1.5"
                          >
                            <FiEye size={16} /> View
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {hasMoreByTab[activeTab] !== false && (
              <div className="py-8 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className={`px-10 py-3.5 min-w-[160px] border border-gray-300 rounded-lg font-medium text-gray-700 transition-all flex items-center justify-center gap-2
        ${loading
                      ? "opacity-60 cursor-wait bg-gray-50"
                      : "hover:bg-gray-50 hover:shadow-sm active:scale-98"
                    }`}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-gray-600"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                      </svg>
                      Loading...
                    </>
                  ) : (
                    "Load More"
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="pt-10">
        <DashboardFooter />
      </div>
    </div>
  );
};

export default BusinessOrdersPage;
