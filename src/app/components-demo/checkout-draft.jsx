"use client";
import React from "react";
import Link from "next/link";
import { FiCheck, FiArrowRight } from "react-icons/fi";
import { HiOutlineShieldCheck } from "react-icons/hi";
import DashboardFooter from "../DashboardFooter";

const CheckoutPage = () => {
  return (
    <div className="bg-[#FAFBFD] min-h-screen flex flex-col">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center py-16 px-4">
        {/* Top Icon Area */}
        <div className="w-24 h-24 bg-[#E8F6ED] rounded-full flex items-center justify-center mb-6 mt-auto">
          <HiOutlineShieldCheck className="w-12 h-12 text-[#139D4C]" strokeWidth={1.5} />
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">
          Payment Secured in Escrow
        </h1>
        <p className="text-gray-600 text-center max-w-2xl mb-12 text-base sm:text-lg">
          Great news! We've secured your funds. The seller has been notified to prepare your shipment.{" "}
          <br className="hidden sm:inline" />
          Funds will only be released once you confirm delivery.
        </p>

        {/* Escrow Status Card */}
        <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 w-full max-w-lg overflow-hidden mb-auto">
          {/* Order Reference */}
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
            <span className="text-gray-900 font-bold text-base">Order Reference</span>
            <span className="text-gray-900 font-bold text-base"># 39201</span>
          </div>

          {/* Step Features */}
          <div className="p-6 space-y-6">
            <div className="flex gap-4 items-start">
              <div className="shrink-0 mt-0.5">
                <div className="w-6 h-6 rounded-full border-[1.5px] border-[#139D4C] flex items-center justify-center">
                  <FiCheck className="w-3.5 h-3.5 text-[#139D4C]" strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <h3 className="text-gray-800 font-semibold mb-1">Payment Verified</h3>
                <p className="text-gray-500 text-sm">Your card was successfully charged.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="shrink-0 mt-0.5">
                <HiOutlineShieldCheck className="w-6 h-6 text-[#139D4C]" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-gray-800 font-semibold mb-1">Funds Locked</h3>
                <p className="text-gray-500 text-sm">Money is currently in 360 Safe Vault.</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-6 py-5 border-t border-gray-100 flex gap-4">
            <Link
              href="/dashboard/user"
              className="flex-1 text-center py-2.5 px-4 border border-gray-200 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/dashboard/user/orders/39201"
              className="flex-1 flex items-center justify-center gap-2 bg-[#139D4C] text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-[#0f843f] transition-colors shadow-sm"
            >
              Track Order <FiArrowRight className="w-4.5 h-4.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <DashboardFooter />
    </div>
  );
};

export default CheckoutPage;