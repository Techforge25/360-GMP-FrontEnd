"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiCalendar, FiChevronDown, FiEye, FiTrash2 } from "react-icons/fi";
import axios from "axios";
import DashboardFooter from "@/components/dashboard/DashboardFooter";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const UserOrdersPage = () => {
  const [activeTab, setActiveTab] = useState("All Orders");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(`${BASE_URL}/orders/user/all-orders`, {
          withCredentials: true, // cookies/session ke liye zaroori
        });

        if (!res.data.success) {
          throw new Error(res.data.message || "Failed to fetch user orders");
        }

        setOrders(res.data.data.docs || []);
      } catch (err) {
        console.error("User orders fetch error:", err);
        setError(err.response?.data?.message || err.message || "Could not load your orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    const s = status?.toLowerCase() || "";
    if (s.includes("await") || s === "pending" || s === "paid") {
      return "bg-amber-100 text-amber-700";
    }
    if (s.includes("transit") || s.includes("ship")) {
      return "bg-purple-100 text-purple-700";
    }
    if (s.includes("deliv") || s === "completed") {
      return "bg-green-100 text-green-700";
    }
    if (s.includes("cancel")) {
      return "bg-red-100 text-red-700";
    }
    return "bg-gray-100 text-gray-700";
  };

  const tabs = [
    "All Orders",
    "Awaiting Shipment",
    "In Transit",
    "Delivered",
    "Cancelled",
  ];

  const filteredOrders = activeTab === "All Orders"
    ? orders
    : orders.filter(order => 
        order.status?.toLowerCase().includes(activeTab.toLowerCase().replace(" ", ""))
      );

  const getOrderType = (items = []) => {
    const totalQty = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
    return totalQty > 1 ? "Bulk" : "Single";
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
            <div className="relative max-w-full sm:max-w-sm lg:max-w-xs mt-3 sm:mt-6 bg-white rounded-lg mx-auto lg:mx-0">
              <input
                type="text"
                placeholder="Order Number, Seller..."
                className="w-full px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base text-gray-900 border-none focus:ring-2 focus:ring-indigo-500 pl-10"
              />
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Right Illustration */}
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

          <div className="flex flex-row items-stretch xs:items-center gap-2 sm:gap-3">
            <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm sm:text-base text-gray-600 hover:bg-gray-50">
              <span>Filter By Date</span>
              <FiCalendar className="w-4 h-4 text-black" />
            </button>
            <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm sm:text-base text-gray-600 hover:bg-gray-50">
              <span>All Status</span>
              <FiChevronDown className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-t-xl px-3 sm:px-4 lg:px-6 pt-3 sm:pt-4">
          <div className="flex space-x-2 sm:space-x-4 lg:space-x-8 overflow-x-auto scrollbar-hide border-b border-t border-[#E3E7EE] py-3 sm:py-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm sm:text-base font-medium px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl whitespace-nowrap transition-colors min-w-fit ${
                  activeTab === tab
                    ? "bg-[#240457] text-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="py-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#240457] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your orders...</p>
          </div>
        ) : error ? (
          <div className="py-12 text-center text-red-600">
            <p className="text-lg font-medium">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-[#240457] text-white rounded-lg hover:bg-[#1e033a]"
            >
              Retry
            </button>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            No orders found in this category
          </div>
        ) : (
          <div className="bg-white rounded-b-xl shadow-sm border border-t rounded-t-lg border-gray-200 overflow-hidden mt-3 sm:mt-4">
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
                  {filteredOrders.map((order) => {
                    const isBulk = (order.items?.reduce((sum, i) => sum + (i.quantity || 0), 0) || 0) > 1;
                    const sellerName = order.buisnessProfile?.companyName || "Unknown Seller";

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
                            {isBulk ? "Bulk" : "Single"}
                          </span>
                        </td>
                        <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-sm sm:text-sm font-medium ${getStatusColor(
                              order.status
                            )}`}
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
                            <button className="p-1.5 sm:p-2 rounded-lg bg-[#DCDCDC33] text-[#FF383C] hover:bg-red-50 transition">
                              <FiTrash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Load More */}
            <div className="px-3 sm:px-4 lg:px-6 py-4 sm:py-6 border-t border-gray-200 flex justify-center">
              <button className="px-6 sm:px-8 py-2 bg-white border border-gray-200 rounded-lg text-sm sm:text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Load more
              </button>
            </div>
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