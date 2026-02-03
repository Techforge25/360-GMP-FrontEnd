"use client";
import React from "react";
import { FiBell, FiClock, FiSettings, FiTrendingUp, FiUsers, FiCheckCircle } from "react-icons/fi";
import DashboardFooter from "@/components/dashboard/DashboardFooter";

export default function BusinessNotificationsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-[#240457] to-[#9747FF] px-8 py-12 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiBell className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">
              Business Notifications
            </h1>
            <p className="text-white/90 text-lg max-w-7xl mx-auto">
              Stay updated with real-time alerts, customer activities, and important business events.
            </p>
          </div>

          {/* Content Section */}
          <div className="px-8 py-12 text-center">
            <div className="max-w-7xl mx-auto">
              <div className="w-16 h-16 bg-[#240457]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiClock className="w-8 h-8 text-[#240457]" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Enhanced Notifications Coming Soon
              </h2>
              
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                We're developing a comprehensive notification system that will keep you informed about every aspect of your business. Get ready for smart alerts, priority notifications, and customizable preferences.
              </p>

              {/* Features Preview */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-[#240457] rounded-lg flex items-center justify-center mx-auto mb-3">
                    <FiTrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Business Analytics</h3>
                  <p className="text-sm text-gray-600">Sales trends & performance alerts</p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-[#9747FF] rounded-lg flex items-center justify-center mx-auto mb-3">
                    <FiUsers className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Customer Activities</h3>
                  <p className="text-sm text-gray-600">New inquiries & interactions</p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-[#0B8806] rounded-lg flex items-center justify-center mx-auto mb-3">
                    <FiCheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Order Updates</h3>
                  <p className="text-sm text-gray-600">Status changes & confirmations</p>
                </div>
              </div>

              {/* Notification Types */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">What You'll Be Notified About:</h3>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#240457] rounded-full"></div>
                    <span>New customer inquiries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#9747FF] rounded-full"></div>
                    <span>Product reviews & ratings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#0B8806] rounded-full"></div>
                    <span>Low inventory alerts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#F4B400] rounded-full"></div>
                    <span>Payment confirmations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#D60000] rounded-full"></div>
                    <span>System maintenance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#240457] rounded-full"></div>
                    <span>Profile verifications</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-[#240457] to-[#9747FF] text-white p-6 rounded-xl">
                <FiSettings className="w-8 h-8 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">
                  Get Ready for Smart Notifications
                </h3>
                <p className="text-white/90 mb-4">
                  Be among the first to experience our intelligent notification system with customizable preferences.
                </p>
                <button className="bg-white text-[#240457] px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Enable Notifications
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* <DashboardFooter /> */}
    </div>
  );
}