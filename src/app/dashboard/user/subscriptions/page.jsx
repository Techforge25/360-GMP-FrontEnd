"use client";
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiInfo,
  FiPlus,
  FiCalendar,
  FiChevronDown,
  FiSearch,
  FiDownload,
  FiChevronRight,
} from "react-icons/fi";
import { RiVisaLine } from "react-icons/ri";
import { SiStripe } from "react-icons/si";
import subscriptionAPI from "@/services/subscriptionAPI";

const UserSubscriptionsPage = () => {
  const [subscription, setSubscription] = useState(null);
  const [totalSpent, setTotalSpent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchSubscriptionData = async () => {
      try {
        const [subResponse, totalSpentResponse] = await Promise.all([
          subscriptionAPI.getMySubscription(),
          subscriptionAPI.getTotalSpent(),
        ]);

        const subData = Array.isArray(subResponse?.data)
          ? subResponse.data[0]
          : subResponse?.data;

        let finalSubscription = subData || null;

        if (!finalSubscription) {
          const stored = subscriptionAPI.getStoredSubscription();
          if (stored?.planName) {
            finalSubscription = {
              ...stored,
              plan: { name: stored.planName, price: stored.price },
            };
          }
        }

        if (isMounted) {
          setSubscription(finalSubscription);
          setTotalSpent(totalSpentResponse?.data ?? 0);
        }
      } catch (error) {
        console.error("Failed to fetch subscription data", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchSubscriptionData();

    return () => {
      isMounted = false;
    };
  }, []);

  const planName =
    subscription?.plan?.name || subscription?.planName || "Current Plan";
  const planPriceRaw = subscription?.plan?.price ?? subscription?.price ?? 0;
  const planPrice =
    typeof planPriceRaw === "number" ? planPriceRaw : Number(planPriceRaw) || 0;
  const status = subscription?.status || "active";
  const statusLabel =
    status === "active"
      ? "Active Plan"
      : status === "canceled"
        ? "Canceled"
        : "Expired";
  const renewalDate = subscription?.endDate || subscription?.nextBillingDate;

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value || 0);

  const formatDate = (value) => {
    if (!value) return "N/A";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "N/A";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className=" bg-gray-50">
      {/* Header */}
      <div className="bg-emerald-50/50 py-6 sm:py-8 lg:py-12 border-b border-gray-200 mb-4 sm:mb-6 lg:mb-8">
        <div className="max-w-4xl mx-auto text-center space-y-2 px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-900">
            Current Plan Overview
          </h1>
          <p className="text-sm sm:text-base text-gray-800">
            Manage Your Subscription, Billing Details, And Usage Limits.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 space-y-4 sm:space-y-6">
        {/* Active Plan Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gray-100 relative overflow-hidden">
          {/* Gradient Background Effect */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-50 via-white to-white pointer-events-none opacity-50" />

          <div className="relative z-10">
            <span
              className={`inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-sm sm:text-sm font-semibold mb-4 sm:mb-6 ${
                status === "active"
                  ? "bg-[#E6F6E9] border border-[#0B8806] text-[#0B8806]"
                  : "bg-red-50 border border-red-500 text-red-600"
              }`}
            >
              {statusLabel}
            </span>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-900 mb-2">
              {loading ? "Loading plan..." : planName}
            </h2>

            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[#240457]">
                {formatCurrency(planPrice)}
              </span>
              <span className="text-[#240457] text-base sm:text-lg">/Month</span>
            </div>

            <p className="text-sm sm:text-base text-gray-700 mb-6 sm:mb-8">
              Renews Automatically On {formatDate(renewalDate)}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#240457] text-white rounded-lg text-sm sm:text-base font-medium hover:bg-gray-900 transition-colors">
                <span>Manage Plan</span>
                <FiArrowRight />
              </button>
              <button className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white border border-red-500 text-red-500 rounded-lg text-sm sm:text-base font-medium hover:bg-red-50 transition-colors">
                Cancel Recent Plan
              </button>
            </div>
          </div>
        </div>

        {/* Lower Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

          {/* Billing Cycle Card */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <h3 className="text-base sm:text-lg font-medium text-black mb-4 sm:mb-6">
              Billing Cycle
            </h3>

            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="rounded-lg text-indigo-600 flex-shrink-0">
                <img src="/assets/images/bilingIcon.png" alt="billingIcon" className="w-6 h-6 sm:w-auto sm:h-auto" />
                {/* Using Info icon as existing calendar one might differ, styled to match */}
              </div>
              <div>
                <p className="text-sm sm:text-base text-gray-500 mb-1">
                  Next billing date
                </p>
                <p className="text-base sm:text-lg font-medium text-black">
                  {formatDate(renewalDate)}
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-600 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 flex items-start sm:items-center gap-2 sm:gap-3">
              <FiInfo className="w-4 h-4 sm:w-5 sm:h-5 text-white border border-blue-600 rounded-full bg-blue-600 mt-0.5 sm:mt-0 flex-shrink-0" />
              <p className="text-sm sm:text-sm text-blue-500">
                Your account will be charged{" "}
                <span className="font-bold">
                  {formatCurrency(planPrice)}
                </span>{" "}
                automatically.
              </p>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2">
              <h3 className="text-base sm:text-lg font-medium text-black">Payment Method</h3>
              <button className="text-sm sm:text-base text-blue-600 hover:underline font-medium self-start sm:self-auto">
                Update
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-white p-1 rounded border border-gray-200 flex-shrink-0">
                  <SiStripe className="w-6 h-4 sm:w-8 sm:h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm sm:text-base font-medium text-gray-900">
                    stripe
                  </p>
                  <p className="text-sm sm:text-sm text-gray-500">Expiry · 12/27</p>
                </div>
              </div>
              <img src="/assets/images/check_circle.png" alt="check" className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
            </div>

            <button className="w-full flex items-center gap-2 p-3 sm:p-4 text-sm sm:text-base text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="p-1 bg-gray-200 rounded-full flex-shrink-0">
                <FiPlus className="w-3 h-3 sm:w-4 sm:h-4 text-[#240457]" />
              </div>
              <span>Add New Payment Method</span>
            </button>
          </div>
        </div>

        {/* Subscription History & Invoices Section */}
        <div className="pt-8 sm:pt-10 lg:pt-12">
          <div className="text-center space-y-2 mb-6 sm:mb-8 px-4">
            <h2 className="text-xl sm:text-2xl font-medium text-gray-900">
              Subscription History & Invoices
            </h2>
            <p className="text-sm sm:text-base text-gray-500">
              Manage Your Billing Details And Download Past Invoices <br className="hidden sm:block" /> For
              Global Manufacturing Co.
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <img
                  src="/assets/images/workspace_premium.png"
                  alt="check"
                  className="w-3 h-4 sm:w-4 sm:h-5 flex-shrink-0"
                />
                <span className="text-gray-500 text-sm sm:text-base font-semibold">
                  Current Plan
                </span>
              </div>
              <p className="text-xl sm:text-2xl font-medium text-gray-900">{planName}</p>
              <p className="text-sm sm:text-sm text-gray-500 mt-1">
                Status: {statusLabel}
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <img
                  src="/assets/images/calendar_month.png"
                  alt="check"
                  className="w-3 h-4 sm:w-4 sm:h-5 flex-shrink-0"
                />
                <span className="text-gray-500 text-sm sm:text-base font-semibold">
                  Next Billing Date
                </span>
              </div>
              <p className="text-xl sm:text-2xl font-medium text-gray-900">
                {formatDate(renewalDate)}
              </p>
              <p className="text-sm sm:text-sm text-gray-500 mt-1">
                Amount: {formatCurrency(planPrice)}
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <img
                  src="/assets/images/attach_money.png"
                  alt="check"
                  className="w-2.5 h-4 sm:w-3 sm:h-5 flex-shrink-0"
                />
                <span className="text-gray-500 text-sm sm:text-base font-semibold">
                  Total Spent YTD
                </span>
              </div>
              <p className="text-xl sm:text-2xl font-medium text-gray-900">
                {formatCurrency(totalSpent)}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <img src="/assets/images/trending_up.png" alt="" className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <p className="text-sm sm:text-sm text-green-500 font-medium">
                  +12% vs last year
                </p>
              </div>
            </div>
          </div>

          {/* Invoices Table Container */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {/* Filters */}
            <div className="p-4 sm:p-6 border-b-2 border-gray-200 flex flex-col lg:flex-row gap-3 sm:gap-4 justify-between items-stretch lg:items-center">
              <div className="relative w-full lg:max-w-md">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search By Invoice Name ID Or Plan Name..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 sm:gap-3 w-full lg:w-auto">
                <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border border-gray-200 rounded-lg text-sm sm:text-base text-gray-800 hover:bg-gray-50">
                  <span>Filter By Date</span>
                  <FiCalendar className="w-4 h-4" />
                </button>
                <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border border-gray-200 rounded-lg text-sm sm:text-base text-gray-800 hover:bg-gray-50">
                  <span>All Status</span>
                  <FiChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-sm sm:text-sm font-medium flex gap-2 items-center text-black uppercase tracking-wider">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-gray-300 focus:ring-gray-300"
                      />
                      Date
                    </th>
                    <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-sm sm:text-sm font-medium text-black uppercase tracking-wider">
                      Invoice ID
                    </th>
                    <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-sm sm:text-sm font-medium text-black uppercase tracking-wider">
                      Plans
                    </th>
                    <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-sm sm:text-sm font-medium text-black uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-sm sm:text-sm font-medium text-black uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-right text-sm sm:text-sm font-medium text-black uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {!subscription ? (
                    <tr>
                      <td colSpan="6" className="px-3 sm:px-4 lg:px-6 py-8 sm:py-12 text-center text-gray-500">
                        {loading ? "Loading subscription..." : "No active subscription found."}
                      </td>
                    </tr>
                  ) : (
                    <tr className="hover:bg-gray-50">
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                        <div className="text-sm sm:text-base font-medium text-gray-900">
                          {formatDate(subscription.startDate || subscription.createdAt)}
                        </div>
                        <div className="text-sm sm:text-sm text-gray-500">
                          {new Date(subscription.startDate || subscription.createdAt || Date.now()).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                          })}
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-sm sm:text-base text-gray-500">
                        {subscription.stripeSubscriptionId || `#INV-${new Date().getFullYear()}-001`}
                      </td>
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-sm sm:text-base text-gray-900">
                        {subscription.plan?.name || subscription.planName || 'Current Plan'}
                      </td>
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium text-gray-900">
                        {formatCurrency(subscription.plan?.price || subscription.price || 0)}
                      </td>
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                        <span
                          className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-sm sm:text-sm font-medium ${
                            subscription.status === "active"
                              ? "bg-green-100 text-green-800"
                              : subscription.status === "canceled"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          <span
                            className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full mr-1 sm:mr-1.5 ${
                              subscription.status === "active"
                                ? "bg-green-500"
                                : subscription.status === "canceled"
                                ? "bg-red-500"
                                : "bg-yellow-500"
                            }`}
                          ></span>
                          {subscription.status === "active" ? "Paid" : subscription.status === "canceled" ? "Failed" : "Pending"}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-right">
                        <button className="flex items-center justify-end gap-1 text-sm sm:text-sm text-gray-500 hover:text-gray-900 w-full">
                          <span>PDF</span>
                          <FiDownload className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-sm sm:text-base text-gray-700 order-2 sm:order-1">
                Showing <span className="font-medium text-black">
                  {subscription ? "1" : "0"}
                </span> Of{" "}
                <span className="font-medium text-black">{subscription ? "1" : "0"}</span>
              </p>
              <div className="flex items-center space-x-1 sm:space-x-2 order-1 sm:order-2">
                <div className="flex items-center gap-1">
                  <button className="px-2 sm:px-3 flex items-center gap-1 py-1 text-gray-400 border border-gray-200 rounded bg-[#EAEBED] text-sm sm:text-base disabled:opacity-50">
                    <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">Back</span>
                  </button>
                </div>
                <div className="hidden sm:flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((page) => (
                    <button
                      key={page}
                      className="w-6 h-6 sm:w-8 sm:h-8 flex text-black items-center justify-center border border-gray-200 rounded hover:bg-gray-50 text-sm sm:text-base"
                    >
                      {page}
                    </button>
                  ))}
                  <span className="text-gray-500 text-sm">...</span>
                  <button className="w-6 h-6 sm:w-8 sm:h-8 text-black flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50 text-sm sm:text-base">
                    20
                  </button>
                </div>
                <button className="px-2 sm:px-3 py-1 bg-[#240457] text-white rounded font-[100] hover:bg-gray-900 text-sm sm:text-base flex items-center gap-1">
                  <span className="hidden xs:inline">Next</span> <FiChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-4 sm:pt-6 lg:pt-8">
        <DashboardFooter />
      </div>
    </div>
  );
};

export default UserSubscriptionsPage;
