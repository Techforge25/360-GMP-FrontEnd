"use client";
import React from "react";
import { FiSearch, FiMapPin, FiMenu } from "react-icons/fi";
import { Button } from "@/components/ui/Button";

const DashboardHero = () => {
  return (
    <div className="relative w-full min-h-[650px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-200 to-slate-300">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/images/authBG.png"
          alt="Modern buildings"
          className="w-full h-full object-cover opacity-90"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      </div>

      {/* White fade overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        {/* White Content Card */}
        <div className="bg-white rounded-lg shadow-2xl p-8 sm:p-12 max-w-4xl mx-auto">
          {/* Heading */}
          <h1 className="text-lg sm:text-xl lg:text-3xl font-semibold text-gray-900 mb-5 text-center">
            Find Verified Businesses Across the Globe
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base text-gray-600 mb-10 max-w-3xl mx-auto text-center leading-relaxed">
            Discover trusted businesses, connect with global communities, and
            grow your network with 360 Global Marketplace. Your gateway to
            worldwide business opportunities.
          </p>

          {/* Search Inputs Row */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            {/* Business Search Input */}
            <div className="flex-1 flex items-center gap-3 px-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100 transition-all">
              <FiSearch className="text-gray-400 w-5 h-5 flex-shrink-0" />
              <input
                type="text"
                placeholder="Businesses, products, communities..."
                className="flex-1 bg-transparent border-none focus:outline-none text-sm text-gray-700 placeholder:text-gray-400"
              />
              <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                <FiMenu className="text-gray-500 w-4 h-4" />
              </button>
            </div>

            {/* Location Input */}
            <div className="flex-1 flex items-center gap-3 px-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100 transition-all sm:max-w-xs">
              <FiMapPin className="text-gray-400 w-5 h-5 flex-shrink-0" />
              <input
                type="text"
                placeholder="City, country..."
                className="flex-1 bg-transparent border-none focus:outline-none text-sm text-gray-700 placeholder:text-gray-400"
              />
            </div>

            {/* Search Button */}
            <Button className="bg-purple-900 hover:bg-purple-800 text-white rounded-xl px-10 py-4 font-semibold transition-all shadow-md hover:shadow-lg whitespace-nowrap">
              Search
            </Button>
          </div>

          {/* Popular Tags */}
          <div className="flex flex-wrap items-center gap-3 justify-center">
            <span className="text-gray-500 text-sm font-medium">Popular:</span>
            <button className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm rounded-full transition-colors font-medium">
              Manufacturing
            </button>
            <button className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm rounded-full transition-colors font-medium">
              Healthcare
            </button>
            <button className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm rounded-full transition-colors font-medium">
              Healthcare
            </button>
            <button className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm rounded-full transition-colors font-medium">
              Consulting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHero;