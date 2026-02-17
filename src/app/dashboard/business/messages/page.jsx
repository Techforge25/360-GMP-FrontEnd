// "use client";
// import React, { useState } from "react";
// import ConversationList from "@/components/dashboard/messages/ConversationList";
// import ChatWindow from "@/components/dashboard/messages/ChatWindow";
// import ChatProfileSidebar from "@/components/dashboard/messages/ChatProfileSidebar";
// import {
//   mockConversations,
//   featuredProducts,
// } from "@/components/dashboard/messages/mockData";
// import { cn } from "@/lib/utils";
// import { ArrowLeftIcon } from "lucide-react";

import DashboardFooter from "@/components/dashboard/DashboardFooter";
import { ArrowLeftIcon, Link } from "lucide-react";
import { FiInfo, FiMail } from "react-icons/fi";

export default function BusinessMessagesPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Container */}
      <div className="max-w-[1400px] mx-auto px-4 mt-4">
        <Link
          href="/dashboard/business"
          className="text-black flex items-center gap-2 hover:text-indigo-600 transition-colors w-fit"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Back</span>
        </Link>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden min-h-[600px] flex flex-col">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-[#240457] to-[#9747FF] px-8 py-16 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiMail className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Business Messages
            </h1>
            <p className="text-white/90 text-lg max-w-[800px] mx-auto leading-relaxed">
              We're developing an advanced messaging system to streamline your
              communication with clients, team members, and potential partners.
            </p>
          </div>

          {/* Content Section */}
          <div className="px-8 py-16 text-center flex-1 flex flex-col items-center justify-center">
            <div className="max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-[#240457]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiInfo className="w-8 h-8 text-[#240457]" />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Coming Soon in Phase 5
              </h2>

              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                The Messages feature is currently under active development as
                part of Phase 5. Soon, you'll be able to manage all your
                business conversations in one secure place, complete with file
                sharing, real-time notifications, and smart filtering.
              </p>

              <Link
                href="/dashboard/business"
                className="inline-flex items-center gap-2 bg-[#240457] text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-900 transition-all shadow-lg shadow-purple-900/10 hover:-translate-y-0.5"
              >
                Return to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <DashboardFooter />
      </div>
    </div>
  );
}
