"use client";
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import React, { useState } from "react";
import Link from "next/link";
import { FiCalendar, FiChevronDown, FiEye, FiTrash2 } from "react-icons/fi";

const BusinessOrdersPage = () => {
  const [activeTab, setActiveTab] = useState("All Orders");

  // Mock Data
  const orders = [
    {
      id: "#39202",
      buyer: "Bio Pharm Supply Co.",
      date: "Nov 25, 2025",
      total: "$57,500",
      type: "Bulk",
      status: "Awaiting Shipment",
    },
    {
      id: "#39203",
      buyer: "Pioneer Labs",
      date: "Nov 26, 2025",
      total: "$8,890",
      type: "Single",
      status: "Delivered",
    },
    {
      id: "#39201",
      buyer: "TechGlobal Inc.",
      date: "Nov 24, 2025",
      total: "$13,475",
      type: "Bulk",
      status: "Delivered",
    },
    {
      id: "#39203",
      buyer: "Pioneer Labs",
      date: "Nov 26, 2025",
      total: "$8,890",
      type: "Single",
      status: "Delivered",
    },
    {
      id: "#39202",
      buyer: "Bio Pharm Supply Co.",
      date: "Nov 25, 2025",
      total: "$57,500",
      type: "Bulk",
      status: "In Transit",
    },
    {
      id: "#39202",
      buyer: "Bio Pharm Supply Co.",
      date: "Nov 25, 2025",
      total: "$57,500",
      type: "Bulk",
      status: "Delivered",
    },
    {
      id: "#39202",
      buyer: "Pioneer Labs",
      date: "Nov 25, 2025",
      total: "$57,500",
      type: "Bulk",
      status: "Delivered",
    },
    {
      id: "#39202",
      buyer: "Bio Pharm Supply Co.",
      date: "Nov 25, 2025",
      total: "$57,500",
      type: "Bulk",
      status: "Cancelled",
    },
    {
      id: "#39201",
      buyer: "Pioneer Labs",
      date: "Nov 24, 2025",
      total: "$13,475",
      type: "Bulk",
      status: "Delivered",
    },
    {
      id: "#39203",
      buyer: "TechGlobal Inc.",
      date: "Nov 26, 2025",
      total: "$8,890",
      type: "Single",
      status: "Delivered",
    },
    {
      id: "#39202",
      buyer: "TechGlobal Inc.",
      date: "Nov 25, 2025",
      total: "$57,500",
      type: "Bulk",
      status: "Delivered",
    },
    {
      id: "#39201",
      buyer: "Pioneer Labs",
      date: "Nov 24, 2025",
      total: "$13,475",
      type: "Bulk",
      status: "Completed",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Awaiting Shipment":
        return "bg-amber-100 text-amber-700";
      case "In Transit":
        return "bg-purple-100 text-purple-700";
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Completed": // Added completed just in case, treating as delivered/green for now or create new
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      case "Canceled": // Handle typo from mock data source if any
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const tabs = [
    "All Orders",
    "Awaiting Shipment",
    "In Transit",
    "Delivered",
    "Cancelled",
  ];

  return (
    <div className="bg-[#FFFFFF]">
      {/* Seller Dashboard Banner */}
      <div className="mx-auto mb-4 sm:mb-6 lg:mb-8 bg-[#110026] relative overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end p-4 sm:p-6 lg:p-8 xl:p-12 relative z-10 max-w-[1400px] mx-auto">
          <div className="w-full lg:w-1/2 space-y-3 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-bold text-white">Seller Dashboard</h1>
            <p className="text-sm sm:text-base lg:text-base text-gray-200">
              360GMP Escrow Protection: Seller is paid only after you confirm
              delivery.
            </p>
            <div className="relative max-w-full sm:max-w-sm lg:max-w-xs mt-3 sm:mt-6 bg-white rounded-lg mx-auto lg:mx-0">
              <input
                type="text"
                placeholder="Order Number, Buyer..."
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

          {/* Right Illustrations matched with CSS/SVG */}
          <div className="hidden lg:block absolute right-0 bottom-0 top-12 h-full pointer-events-none">
            {/* Simple representation of the illustration using absolute div blocks/SVGs to match the vibe */}
            <div className="relative h-[152px] w-[400px]">
              <img src="/assets/images/sellerImg.png" alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border border-gray-200 rounded-xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
          <h1 className="text-xl sm:text-2xl font-medium text-gray-900">My Orders</h1>

          <div className="flex flex-row xs:flex-row items-stretch xs:items-center gap-2 sm:gap-3">
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

        {/* Table */}
        <div className="bg-white rounded-b-xl shadow-sm border border-t rounded-t-lg border-gray-200 overflow-hidden mt-3 sm:mt-4">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="bg-[#F0F0F0]">
                <tr>
                  <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-sm sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-sm sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Buyer
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
                {orders.map((order, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <span className="text-sm sm:text-base font-semibold text-gray-900">
                        {order.id}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <span className="text-sm sm:text-base text-gray-600">
                        {order.buyer}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <span className="text-sm sm:text-base text-gray-600">
                        {order.date}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <span className="text-sm sm:text-base font-semibold text-gray-900">
                        {order.total}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <span className="text-sm sm:text-base text-gray-600">
                        {order.type}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-sm sm:text-sm font-medium ${getStatusColor(
                          order.status,
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2 sm:gap-3">
                        <Link href={`/dashboard/business/orders/${order.id.replace("#", "")}`} className="p-1 sm:p-1.5 rounded-lg bg-[#DCDCDC33] text-[#444953] transition-colors hover:bg-gray-200 block">
                          <FiEye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </Link>
                        <button className="p-1 sm:p-1.5 rounded-lg bg-[#DCDCDC33] text-[#FF383C] transition-colors hover:bg-red-50">
                          <FiTrash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Load More */}
          <div className="px-3 sm:px-4 lg:px-6 py-4 sm:py-6 border-t border-gray-200 flex justify-center">
            <button className="px-4 sm:px-6 py-2 bg-white border border-gray-200 rounded-lg text-sm sm:text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Load more
            </button>
          </div>
        </div>
      </div>
      <div className="pt-4 sm:pt-6 lg:pt-8">
        <DashboardFooter />
      </div>
    </div>
  );
};

export default BusinessOrdersPage;