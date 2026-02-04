"use client";
import React from "react";
import { FiEdit2, FiCheckCircle } from "react-icons/fi";

const UserAbout = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-5 lg:p-6 mb-6 sm:mb-8 relative group">
      <div className="flex justify-between items-start mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">About</h2>
        <button className="p-1 sm:p-1.5 hover:bg-gray-50 rounded transition-colors text-gray-400 hover:text-gray-600">
          <FiEdit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>

      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
        I specialize in GMP-driven process improvement and supply chain
        streamlining, with a growing emphasis on cold-chain integrity
        validation. My goal is to reinforce compliance, strengthen traceability,
        and support reliable temperature-controlled distribution across
        regulated environments.
      </p>

      <div className="space-y-3 sm:space-y-4">
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-0.5 sm:mb-1">Member Since</h3>
          <p className="text-xs sm:text-sm text-gray-500">August 2023</p>
        </div>

        <div>
          <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-0.5 sm:mb-1">
            Profile Status
          </h3>
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-[#185ADB] font-medium">
            Verified <FiCheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAbout;
