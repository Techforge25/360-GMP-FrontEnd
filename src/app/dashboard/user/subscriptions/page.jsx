"use client";
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import { ChevronLeft } from "lucide-react";
import React from "react";
import {
  FiArrowRight,
  FiInfo,
  FiPlus,
  FiCheckCircle,
  FiCalendar,
  FiChevronDown,
  FiSearch,
  FiDownload,
  FiChevronRight,
} from "react-icons/fi";
import { RiVisaLine } from "react-icons/ri";

const BusinessSubscriptionsPage = () => {
  return (
    <div className=" bg-gray-50">
      {/* Header */}
      <div className="bg-emerald-50/50 py-12 border-b border-gray-200 mb-8">
        <div className="max-w-4xl mx-auto text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">
            Current Plan Overview
          </h1>
          <p className="text-gray-800">
            Manage Your Subscription, Billing Details, And Usage Limits.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Active Plan Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
          {/* Gradient Background Effect */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-50 via-white to-white pointer-events-none opacity-50" />

          <div className="relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#E6F6E9] border border-[#0B8806] text-[#0B8806] text-sm font-semibold mb-6">
              Active Plan
            </span>

            <h2 className="text-3xl font-medium text-gray-900 mb-2">
              Silver Perfect For Discovering Businesses
            </h2>

            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-4xl font-medium text-[#240457]">$199</span>
              <span className="text-[#240457] text-lg">/Month</span>
            </div>

            <p className="text-gray-700 mb-8">
              Renews Automatically On Jan 15, 2026
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-[#240457] text-white rounded-lg text-base font-medium hover:bg-gray-900 transition-colors">
                <span>Manage Plan</span>
                <FiArrowRight />
              </button>
              <button className="px-6 py-3 bg-white border border-red-500 text-red-500 rounded-lg text-base font-medium hover:bg-red-50 transition-colors">
                Cancel Recent Plan
              </button>
            </div>
          </div>
        </div>

        {/* Lower Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Usage Limits Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-medium text-black">Usage Limits</h3>
              <button className="text-base text-blue-600 hover:underline font-medium">
                View Details
              </button>
            </div>

            <div className="space-y-6">
              {/* Product Listings */}
              <div className="space-y-2">
                <div className="flex justify-between text-base font-medium text-gray-700">
                  <span>Product Listings</span>
                  <div>
                    <span className="text-gray-900">10 </span>
                    <span className="text-gray-500">/ 20</span>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#240457] w-1/2 rounded-full" />
                </div>
              </div>

              {/* Active Job Posts */}
              <div className="space-y-2">
                <div className="flex justify-between text-base font-medium text-gray-700">
                  <span>Active Job Posts</span>
                  <div>
                    <span className="text-gray-900">45 </span>
                    <span className="text-gray-500">/ 100</span>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#240457] w-[45%] rounded-full" />
                </div>
              </div>

              {/* Communities */}
              <div className="space-y-2">
                <div className="flex justify-between text-base font-medium text-gray-700">
                  <span>Communities</span>
                  <div>
                    <span className="text-gray-900">3 </span>
                    <span className="text-gray-500">/ 10</span>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#240457] w-[30%] rounded-full" />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-base text-gray-500">
                Need more capacity?{" "}
                <button className="text-blue-600 hover:underline">
                  Upgrade your limits
                </button>
              </p>
            </div>
          </div>

          {/* Billing Cycle Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium text-black mb-6">
              Billing Cycle
            </h3>

            <div className="flex items-start gap-4 mb-6">
              <div className="rounded-lg text-indigo-600">
                <img src="/assets/images/bilingIcon.png" alt="billingIcon" />
                {/* Using Info icon as existing calendar one might differ, styled to match */}
              </div>
              <div>
                <p className="text-base text-gray-500 mb-1">
                  Next billing date
                </p>
                <p className="text-lg font-medium text-black">
                  January 15, 2026
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-600 rounded-lg px-4 py-3 flex items-center gap-3">
              <FiInfo className="w-5 h-5 text-white border border-blue-600 rounded-full bg-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-500">
                Your account will be charged{" "}
                <span className="font-bold">$199</span> automatically.
              </p>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-black">Payment Method</h3>
              <button className="text-base text-blue-600 hover:underline font-medium">
                Update
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white p-1 rounded border border-gray-200">
                  <RiVisaLine className="w-8 h-5 text-blue-800" />
                </div>
                <div>
                  <p className="text-base font-medium text-gray-900">
                    visa ****2125
                  </p>
                  <p className="text-sm text-gray-500">Expiry · 12/27</p>
                </div>
              </div>
              <img src="/assets/images/check_circle.png" alt="check" />
            </div>

            <button className="w-full flex items-center gap-2 p-4 text-base text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="p-1 bg-gray-200 rounded-full">
                <FiPlus className="w-4 h-4 text-[#240457]" />
              </div>
              <span>Add New Payment Menthod</span>
            </button>
          </div>
        </div>

        {/* Subscription History & Invoices Section */}
        <div className="pt-12">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-2xl font-medium text-gray-900">
              Subscription History & Invoices
            </h2>
            <p className="text-gray-500">
              Manage Your Billing Details And Download Past Invoices <br /> For
              Global Manufacturing Co.
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <img
                  src="/assets/images/workspace_premium.png"
                  alt="check"
                  className="w-4 h-5"
                />
                <span className="text-gray-500 text-base font-semibold">
                  Current Plan
                </span>
              </div>
              <p className="text-2xl font-medium text-gray-900">Silver</p>
              <p className="text-sm text-gray-500 mt-1">Renew Automatically</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <img
                  src="/assets/images/calendar_month.png"
                  alt="check"
                  className="w-4 h-5"
                />
                <span className="text-gray-500 text-base font-semibold">
                  Next Billing Date
                </span>
              </div>
              <p className="text-2xl font-medium text-gray-900">Nov 24, 2023</p>
              <p className="text-sm text-gray-500 mt-1">Amount: $199.00</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <img
                  src="/assets/images/attach_money.png"
                  alt="check"
                  className="w-3 h-5"
                />
                <span className="text-gray-500 text-base font-semibold">
                  Total Spent YTD
                </span>
              </div>
              <p className="text-2xl font-medium text-gray-900">$48,000.00</p>
              <div className="flex items-center gap-2 mt-1">
                <img src="/assets/images/trending_up.png" alt="" />
                <p className="text-sm text-green-500 font-medium">
                  +12% vs last year
                </p>
              </div>
            </div>
          </div>

          {/* Invoices Table Container */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {/* Filters */}
            <div className="p-6 border-b-2 border-gray-200 flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:max-w-md">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search By Invoice Name ID Or Plan Name..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-base text-gray-800 hover:bg-gray-50">
                  <span>Filter By Date</span>
                  <FiCalendar className="w-4 h-4" />
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-base text-gray-800 hover:bg-gray-50">
                  <span>All Status</span>
                  <FiChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium flex gap-2 items-center text-black uppercase tracking-wider">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-gray-300 focus:ring-gray-300"
                      />
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                      Invoice ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                      Plans
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-black uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    {
                      date: "Oct 28, 2025",
                      time: "12:30 AM",
                      id: "#INV-2025-089",
                      plan: "Silver Plan-Monthly",
                      amount: "$199",
                      status: "Paid",
                    },
                    {
                      date: "Aug 28, 2025",
                      time: "12:30 AM",
                      id: "#INV-2025-087",
                      plan: "Silver Plan-Monthly",
                      amount: "$199",
                      status: "Paid",
                    },
                    {
                      date: "Sep 28, 2025",
                      time: "12:30 AM",
                      id: "#INV-2025-088",
                      plan: "Silver Plan-Monthly",
                      amount: "$199",
                      status: "Paid",
                    },
                    {
                      date: "Jul 28, 2025",
                      time: "12:30 AM",
                      id: "#INV-2025-086",
                      plan: "Premium Plan -Monthly",
                      amount: "$299",
                      status: "Paid",
                    },
                    {
                      date: "Jul 28, 2025",
                      time: "12:30 AM",
                      id: "#INV-2025-086",
                      plan: "Premium Plan -Monthly",
                      amount: "$299",
                      status: "Failed",
                    },
                    {
                      date: "May 28, 2025",
                      time: "12:30 AM",
                      id: "#INV-2025-084",
                      plan: "Silver-Monthly",
                      amount: "$199",
                      status: "Paid",
                    },
                  ].map((invoice, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-base font-medium text-gray-900">
                          {invoice.date}
                        </div>
                        <div className="text-sm text-gray-500">
                          {invoice.time}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-base text-gray-500">
                        {invoice.id}
                      </td>
                      <td className="px-6 py-4 text-base text-gray-900">
                        {invoice.plan}
                      </td>
                      <td className="px-6 py-4 text-base font-medium text-gray-900">
                        {invoice.amount}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                            invoice.status === "Paid"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                              invoice.status === "Paid"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          ></span>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="flex items-center justify-end gap-1 text-sm text-gray-500 hover:text-gray-900 w-full">
                          <span>PDF</span>
                          <FiDownload className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <p className="text-base text-gray-700">
                Showing <span className="font-medium text-black">1-5</span> Of{" "}
                <span className="font-medium text-black">20</span>
              </p>
              <div className="flex items-center space-x-2">
                <div className="flex items-center gap-1">
                  <button className="px-3 flex items-center gap-1 py-1 text-gray-400 border border-gray-200 rounded bg-[#EAEBED] text-base disabled:opacity-50">
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>
                </div>
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    className="w-8 h-8 flex text-black items-center justify-center border border-gray-200 rounded hover:bg-gray-50 text-base"
                  >
                    {page}
                  </button>
                ))}
                <span className="text-gray-500">...</span>
                <button className="w-8 h-8 text-black flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50 text-base">
                  20
                </button>
                <button className="px-3 py-1 bg-[#240457] text-white rounded font-[100] hover:bg-gray-900 text-base flex items-center gap-1">
                  Next <FiChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-8">
        <DashboardFooter />
      </div>
    </div>
  );
};

export default BusinessSubscriptionsPage;
