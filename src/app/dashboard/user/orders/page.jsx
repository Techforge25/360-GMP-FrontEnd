"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { FiCalendar, FiChevronDown, FiEye } from "react-icons/fi";
import axios from "axios";
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import { userTabs } from "@/constants/index";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

const UserOrdersPage = () => {
  const [activeTab, setActiveTab] = useState("All Orders");
  const [ordersByTab, setOrdersByTab] = useState({});
  const [pageByTab, setPageByTab] = useState({});
  const [hasMoreByTab, setHasMoreByTab] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const limit = 10;

  // Current tab data
  const currentOrders = ordersByTab[activeTab] || [];
  const currentPage = pageByTab[activeTab] || 1;
  const hasMore = hasMoreByTab[activeTab] ?? true;

  const fetchOrders = useCallback(async (reset = false) => {
    const pageToFetch = reset ? 1 : (pageByTab[activeTab] || 1);

    setLoading(true);
    setError(null);

    try {
      const endpoint = userTabs[activeTab];

      const res = await axios.get(`${BASE_URL}${endpoint}`, {
        params: { page: pageToFetch, limit },
        withCredentials: true,
      });

      if (!res.data?.success) {
        throw new Error(res.data?.message || "Failed to fetch orders");
      }

      const newDocs = res.data.data?.docs || [];
      const hasNext = res.data.data?.hasNextPage ?? false;

      setOrdersByTab((prev) => ({
        ...prev,
        [activeTab]: reset ? newDocs : [...(prev[activeTab] || []), ...newDocs],
      }));

      setPageByTab((prev) => ({
        ...prev,
        [activeTab]: pageToFetch + 1,
      }));

      setHasMoreByTab((prev) => ({
        ...prev,
        [activeTab]: hasNext,
      }));
    } catch (err) {
      console.error("User orders fetch error:", err);
      const msg = err.response?.data?.message || err.message || "Could not load your orders";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  // Load first page when tab changes (or if tab data doesn't exist yet)
  useEffect(() => {
    if (!(activeTab in ordersByTab)) {
      fetchOrders(true);
    }
  }, [activeTab, fetchOrders]);

  const getStatusColor = (status = "") => {
    const s = status.toLowerCase();
    if (s.includes("await") || s === "pending" || s === "paid") {
      return "bg-amber-100 text-amber-700";
    }
    if (s.includes("transit") || s.includes("ship")) {
      return "bg-purple-100 text-purple-700";
    }
    if (s.includes("deliv")) {
      return "bg-blue-100 text-blue-700";
    }
    if (s === "completed") {
      return "bg-green-100 text-green-700";
    }
    if (s.includes("cancel")) {
      return "bg-red-100 text-red-700";
    }
    return "bg-gray-100 text-gray-700";
  };

  const getOrderType = (items = []) => {
    const totalQty = items.reduce((sum, item) => sum + (item?.quantity || 0), 0);
    return totalQty > 1 ? "Bulk" : "Single";
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchOrders(false);
    }
  };

  return (
    <div className="bg-[#FFFFFF]">
      {/* Buyer Dashboard Banner */}
      <div className="mx-auto mb-4 sm:mb-6 lg:mb-8 bg-[#110026] relative overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end p-4 sm:p-6 lg:p-8 xl:p-12 relative z-10 max-w-[1400px] mx-auto">
          <div className="w-full lg:w-1/2 space-y-3 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-bold text-white">Buyer Dashboard</h1>
            <p className="text-sm sm:text-base lg:text-base text-gray-200">
              360GMP Escrow Protection: Secure payments with guaranteed delivery confirmation.
            </p>
          </div>

          <div className="hidden lg:block absolute right-0 bottom-0 top-12 h-full pointer-events-none">
            <div className="relative h-[152px] w-[400px]">
              <img src="/assets/images/sellerImg.png" alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border border-gray-200 rounded-xl bg-white">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
          <h1 className="text-xl sm:text-2xl font-medium text-gray-900">My Orders</h1>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-t-xl px-3 sm:px-4 lg:px-6 pt-3 sm:pt-4">
          <div className="flex space-x-2 sm:space-x-4 lg:space-x-8 overflow-x-auto scrollbar-hide border-b border-t border-[#E3E7EE] py-3 sm:py-4">
            {Object.keys(userTabs).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm sm:text-base font-medium px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl whitespace-nowrap transition-colors min-w-fit ${activeTab === tab
                  ? "bg-[#240457] text-white"
                  : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {loading && currentOrders.length === 0 ? (
          <div className="py-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#240457] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your orders...</p>
          </div>
        ) : error ? (
          <div className="py-12 text-center text-red-600">
            <p className="text-lg font-medium">{error}</p>
            <button
              onClick={() => fetchOrders(true)}
              className="mt-4 px-6 py-2 bg-[#240457] text-white rounded-lg hover:bg-[#1e033a]"
            >
              Retry
            </button>
          </div>
        ) : currentOrders.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            No orders found {activeTab !== "All Orders" ? `in "${activeTab}"` : ""}
          </div>
        ) : (
          <div className="bg-white rounded-b-xl shadow-sm border border-t-0 border-gray-200 overflow-hidden mt-3 sm:mt-4">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead className="bg-[#F0F0F0]">
                  <tr>
                    <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-sm sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-sm sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Seller
                    </th>
                    <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-sm sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Order Date
                    </th>
                    <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-sm sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-sm sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Order Type
                    </th>
                    <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-sm sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-right text-sm sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentOrders.map((order) => {
                    const sellerName = order.shippingAddress?.name || "Unknown Seller";
                    const orderType = getOrderType(order.items);

                    return (
                      <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <span className="text-sm sm:text-base font-semibold text-gray-900">
                            #{order._id?.slice(-6) || "N/A"}
                          </span>
                        </td>
                        <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <span className="text-sm sm:text-base text-gray-600 truncate block max-w-[180px]">
                            {sellerName}
                          </span>
                        </td>
                        <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <span className="text-sm sm:text-base text-gray-600">
                            {new Date(order.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </td>
                        <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <span className="text-sm sm:text-base font-semibold text-gray-900">
                            ${order.totalAmount?.toFixed(2) || "0.00"}
                          </span>
                        </td>
                        <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <span className="text-sm sm:text-base text-gray-600">
                            {orderType}
                          </span>
                        </td>
                        <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-sm sm:text-sm font-medium ${getStatusColor(order.status)}`}
                          >
                            {order.status || "Unknown"}
                          </span>
                        </td>
                        <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-2 sm:gap-3">
                            <Link
                              href={`/dashboard/user/orders/OrderTrackingPage/${order._id}`}
                              className="p-1.5 sm:p-2 rounded-lg bg-[#DCDCDC33] text-[#444953] hover:bg-gray-200 transition"
                            >
                              <FiEye className="w-4 h-4 sm:w-5 sm:h-5" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {hasMore && (
              <div className="px-3 sm:px-4 lg:px-6 py-4 sm:py-6 border-t border-gray-200 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className={`px-6 sm:px-8 py-2 border rounded-lg text-sm sm:text-base font-medium transition-colors ${loading
                    ? "bg-gray-100 text-gray-400 cursor-wait"
                    : "bg-white hover:bg-gray-50 text-gray-700 border-gray-200"
                    }`}
                >
                  {loading ? "Loading..." : "Load more"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="pt-4 sm:pt-6 lg:pt-8">
        <DashboardFooter />
      </div>
    </div>
  );
};

export default UserOrdersPage;