"use client";
import React from "react";
import { FiMessageSquare, FiClock, FiStar } from "react-icons/fi";
import DashboardFooter from "@/components/dashboard/DashboardFooter";

export default function BusinessMessagesPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-[#240457] to-[#9747FF] px-8 py-12 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiMessageSquare className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">
              Business Messaging Center
            </h1>
            <p className="text-white/90 text-lg max-w-7xl mx-auto">
              Connect with your customers, manage inquiries, and build stronger business relationships.
            </p>
          </div>

          {/* Content Section */}
          <div className="px-8 py-12 text-center">
            <div className="max-w-7xl mx-auto">
              <div className="w-16 h-16 bg-[#240457]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiClock className="w-8 h-8 text-[#240457]" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Coming Soon in Phase 5
              </h2>
              
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                We're building an advanced messaging system that will revolutionize how you communicate with your customers. Stay tuned for real-time chat, automated responses, and seamless customer support tools.
              </p>

              {/* Features Preview */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-[#240457] rounded-lg flex items-center justify-center mx-auto mb-3">
                    <FiMessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Real-time Chat</h3>
                  <p className="text-sm text-gray-600">Instant messaging with customers</p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-[#9747FF] rounded-lg flex items-center justify-center mx-auto mb-3">
                    <FiStar className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Smart Responses</h3>
                  <p className="text-sm text-gray-600">AI-powered quick replies</p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-[#0B8806] rounded-lg flex items-center justify-center mx-auto mb-3">
                    <FiClock className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
                  <p className="text-sm text-gray-600">Always available for your customers</p>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-[#240457] to-[#9747FF] text-white p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-2">
                  Want to be notified when it's ready?
                </h3>
                <p className="text-white/90 mb-4">
                  We'll send you an update as soon as messaging becomes available.
                </p>
                <button className="bg-white text-[#240457] px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Notify Me
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