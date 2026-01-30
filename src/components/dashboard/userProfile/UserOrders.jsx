"use client";
import React, { useState } from "react";
import { FiCalendar, FiChevronDown, FiEye, FiTrash2 } from "react-icons/fi";

const UserOrders = () => {
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
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      case "Canceled":
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

  const filteredOrders = activeTab === "All Orders" 
    ? orders 
    : orders.filter(order => order.status === activeTab);

  return (
    <div className="border border-gray-200 rounded-xl bg-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 gap-4">
        <h1 className="text-xl sm:text-2xl font-medium text-gray-900">My Orders</h1>

        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm sm:text-base text-gray-600 hover:bg-gray-50">
            <span>Filter By Date</span>
            <FiCalendar className="w-4 h-4 text-black" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm sm:text-base text-gray-600 hover:bg-gray-50">
            <span>All Status</span>
            <FiChevronDown className="w-4 h-4 text-black" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 sm:px-6">
        <div className="flex space-x-4 sm:space-x-8 overflow-x-auto scrollbar-hide border-b border-t border-[#E3E7EE] py-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm sm:text-base font-medium px-3 py-2 rounded-xl whitespace-nowrap transition-colors ${
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
      <div className="border-t border-gray-200 mt-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F0F0F0]">
              <tr>
                <th className="px-4 sm:px-6 py-4 text-left text-sm sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-4 sm:px-6 py-4 text-left text-sm sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Buyer
                </th>
                <th className="px-4 sm:px-6 py-4 text-left text-sm sm:text-sm font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Order Date
                </th>
                <th className="px-4 sm:px-6 py-4 text-left text-sm sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-4 sm:px-6 py-4 text-left text-sm sm:text-sm font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Order Type
                </th>
                <th className="px-4 sm:px-6 py-4 text-left text-sm sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Delivery Status
                </th>
                <th className="px-4 sm:px-6 py-4 text-right text-sm sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className="text-sm sm:text-base font-semibold text-gray-900">
                      {order.id}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className="text-sm sm:text-base text-gray-600">
                      {order.buyer}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                    <span className="text-sm sm:text-base text-gray-600">
                      {order.date}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className="text-sm sm:text-base font-semibold text-gray-900">
                      {order.total}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    <span className="text-sm sm:text-base text-gray-600">
                      {order.type}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-sm sm:text-sm font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2 sm:gap-3">
                      <button className="p-1.5 rounded-lg bg-[#DCDCDC33] text-[#444953] transition-colors hover:bg-gray-200">
                        <FiEye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg bg-[#DCDCDC33] text-[#FF383C] transition-colors hover:bg-red-100">
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Load More */}
        <div className="px-6 py-6 border-t border-gray-200 flex justify-center">
          <button className="px-6 py-2 bg-white border border-gray-200 rounded-lg text-sm sm:text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Load more
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
