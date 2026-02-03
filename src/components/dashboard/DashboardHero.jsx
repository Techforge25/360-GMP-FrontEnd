"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiMapPin, FiMenu } from "react-icons/fi";
import { Button } from "@/components/ui/Button";

const DashboardHero = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    // Allow search if at least one field has input
    if (!query.trim() && !location.trim()) return;

    const params = new URLSearchParams();
    if (query.trim()) params.append("q", query.trim());
    if (location.trim()) params.append("location", location.trim());

    router.push(`/dashboard/search?${params.toString()}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
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
      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        {/* White Content Card */}
        <div className="bg-white rounded-md shadow-2xl p-8 max-w-5xl mx-auto">
          {/* Heading */}
          <h1 className="text-lg sm:text-xl lg:text-3xl font-semibold text-black mb-5 text-center">
            Find Verified Businesses Across the Globe
          </h1>

          {/* Subheading */}
          <p className="text-base  text-[#444953] mb-10 max-w-[805px] mx-auto text-center leading-relaxed">
            Discover trusted businesses, connect with global communities, and
            grow your network with 360 Global Marketplace. Your gateway to
            worldwide business opportunities.
          </p>

          {/* Search Inputs Row */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            {/* Business Search Input */}
            <div className="flex-1 flex items-center gap-3 px-5 bg-white rounded-xl border border-gray-200 hover:border-gray-300 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100 transition-all">
              <FiSearch className="text-gray-400 w-6 h-6 flex-shrink-0" />
              <input
                type="text"
                placeholder="Businesses, products, communities..."
                className="flex-1 bg-transparent border-none focus:outline-none text-sm text-gray-700 placeholder:text-gray-400"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            {/* Location Input */}
            <div className="flex-1 flex items-center gap-3 px-5 bg-white rounded-xl border border-gray-200 hover:border-gray-300 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100 transition-all sm:max-w-xs">
              <FiMapPin className="text-gray-400 w-5 h-5 flex-shrink-0" />
              <input
                type="text"
                placeholder="City, country..."
                className="flex-1 bg-transparent border-none focus:outline-none text-sm text-gray-700 placeholder:text-gray-400"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            {/* Search Button */}
            <Button
              onClick={handleSearch}
              className="bg-brand-primary hover:bg-brand-primary/90 text-white rounded-xl px-8 py-4 font-medium transition-all shadow-md hover:shadow-lg whitespace-nowrap"
            >
              Search
            </Button>
          </div>

          {/* Popular Tags */}
          <div className="flex flex-wrap items-center gap-3 justify-center">
            <span className="text-gray-500 text-base font-medium">
              Popular:
            </span>
            <button className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-base rounded-full transition-colors font-medium">
              Manufacturing
            </button>
            <button className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-base rounded-full transition-colors font-medium">
              Healthcare
            </button>
            <button className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-base rounded-full transition-colors font-medium">
              Healthcare
            </button>
            <button className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-base rounded-full transition-colors font-medium">
              Consulting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHero;
