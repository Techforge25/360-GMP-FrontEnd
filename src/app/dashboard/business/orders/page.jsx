"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiCalendar, FiChevronDown, FiEye, FiTrash2 } from "react-icons/fi";
import axios from "axios";
import DashboardFooter from "@/components/dashboard/DashboardFooter";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

const BusinessOrdersPage = () => {
  const [activeTab, setActiveTab] = useState("All Orders");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(`${BASE_URL}/orders/business/all-orders`, {
          withCredentials: true, // session/auth cookies bhejne ke liye
        });

        if (!res.data.success) {
          throw new Error(res.data.message || "Failed to fetch business orders");
        }

        setOrders(res.data.data.docs || []);
      } catch (err) {
        console.error("Business orders fetch error:", err);
        setError(err.response?.data?.message || err.message || "Could not load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    const s = status?.toLowerCase() || "";
    if (s.includes("await") || s === "pending") return "bg-amber-100 text-amber-700";
    if (s.includes("transit") || s.includes("ship")) return "bg-purple-100 text-purple-700";
    if (s.includes("deliv") || s === "completed") return "bg-green-100 text-green-700";
    if (s.includes("cancel")) return "bg-red-100 text-red-700";
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
      {/* Seller Dashboard Banner */}
      <div className="mx-auto mb-6 bg-[#110026] relative overflow-hidden rounded-xl">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end p-6 lg:p-10 xl:p-12 relative z-10 max-w-[1400px] mx-auto">
          <div className="w-full lg:w-1/2 space-y-4 text-center lg:text-left">
            <h1 className="text-3xl lg:text-4xl font-bold text-white">Seller Dashboard</h1>
            <p className="text-base lg:text-lg text-gray-200">
              360GMP Escrow Protection: Get paid securely only after buyer confirms delivery.
            </p>
            <div className="relative max-w-full sm:max-w-md lg:max-w-sm mt-4 bg-white rounded-lg mx-auto lg:mx-0">
              <input
                type="text"
                placeholder="Search orders by ID, buyer..."
                className="w-full px-5 py-3 rounded-lg text-base text-gray-900 border-none focus:ring-2 focus:ring-indigo-500 pl-12"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
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

          <div className="hidden lg:block absolute right-0 bottom-0 h-full pointer-events-none">
            <img src="/assets/images/sellerImg.png" alt="Seller Illustration" className="h-full object-contain" />
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 border border-gray-200 rounded-xl bg-white">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-semibold text-gray-900">My Orders</h1>

          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              Filter By Date <FiCalendar className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              All Status <FiChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-3 scrollbar-hide border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? "bg-[#240457] text-white"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
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
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full min-w-[900px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                    Buyer
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider hidden sm:table-cell">
                    Order Date
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider hidden md:table-cell">
                    Order Type
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-4 text-right text-sm font-medium text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => {
                  const isBulk = (order.items?.reduce((sum, i) => sum + (i.quantity || 0), 0) || 0) > 1;
                  const buyerName = order.buyerUserProfile?.fullName || "Unknown Buyer";

                  return (
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="text-base font-semibold text-gray-900">
                          #{order._id?.slice(-6) || "N/A"}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="text-base text-gray-700 truncate block max-w-[180px]">
                          {buyerName}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                        <span className="text-base text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="text-base font-semibold text-gray-900">
                          ${order.totalAmount?.toFixed(2) || "0.00"}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap hidden md:table-cell">
                        <span className="text-base text-gray-600">
                          {isBulk ? "Bulk" : "Single"}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
                        >
                          {order.status || "Unknown"}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-3">
                          <Link
                            href={`/dashboard/business/orders/${order._id}`}
                            className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                          >
                            <FiEye className="w-5 h-5" />
                          </Link>
                          <button className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition">
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Load More */}
        {!loading && orders.length > 0 && (
          <div className="px-4 py-6 border-t border-gray-200 flex justify-center">
            <button className="px-8 py-3 bg-white border border-gray-200 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Load more
            </button>
          </div>
        )}
      </div>

      <div className="pt-8">
        <DashboardFooter />
      </div>
    </div>
  );
};

export default BusinessOrdersPage;