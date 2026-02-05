"use client";
import React from "react";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { Button } from "@/components/ui/Button";

const BusinessHero = ({ query, setQuery, location, setLocation, onSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="relative w-full h-[300px] xs:h-[320px] sm:h-[340px] md:h-[360px] lg:h-[400px] flex items-center justify-center overflow-hidden mb-4 sm:mb-6 lg:mb-8 px-2 sm:px-4 py-4">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/90 to-blue-900/80 z-10" />
        <img
          src="/assets/images/businessHero.png"
          alt="Background"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentElement.style.backgroundColor = "#1e3a8a";
          }}
        />
      </div>

      <div className="relative z-20 w-full max-w-6xl mx-auto px-2 sm:px-4 lg:px-6 text-center text-white">
        <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 px-1 sm:px-2 leading-tight">
          Discover Businesses Around the World
        </h1>
        <p className="text-blue-100 mb-4 sm:mb-6 lg:mb-8 text-sm xs:text-sm sm:text-base lg:text-lg px-1 sm:px-4 max-w-3xl mx-auto">
          Search by Category, industry, or name and explore verified Businesses.
        </p>

        <div className="bg-white/20 border border-white/40 p-2 xs:p-3 sm:p-4 lg:p-6 rounded-lg shadow-xl w-full max-w-4xl mx-auto">
          {/* Mobile: Stacked Layout */}
          <div className="md:hidden space-y-2 xs:space-y-3">
            <div className="flex items-center px-3 py-2.5 xs:py-3 bg-white rounded-md border border-gray-200 shadow-sm">
              <FiSearch className="text-gray-500 mr-2 w-4 h-4 flex-shrink-0" />
              <input
                type="text"
                placeholder="Reference / products, service..."
                className="w-full bg-transparent border-none focus:outline-none text-sm text-gray-700 placeholder:text-gray-400"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="flex items-center px-3 py-2.5 xs:py-3 bg-white rounded-md border border-gray-200 shadow-sm">
              <FiMapPin className="text-gray-500 mr-2 w-4 h-4 flex-shrink-0" />
              <input
                type="text"
                placeholder="Type Location"
                className="w-full bg-transparent border-none focus:outline-none text-sm text-gray-700 placeholder:text-gray-400"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <Button
              onClick={onSearch}
              className="bg-[#240457] text-white rounded-lg px-4 py-3 font-medium hover:bg-[#240457]/90 w-full transition-colors text-sm"
            >
              <div className="flex items-center justify-center gap-2">
                <span>▶</span>
                <span>Search</span>
              </div>
            </Button>
          </div>

          {/* Desktop: Inline Layout */}
          <div className="hidden md:flex gap-2 lg:gap-3">
            <div className="flex-1 flex items-center px-4 py-4 h-12 lg:h-14 bg-white rounded-md border border-gray-200 shadow-sm">
              <FiSearch className="text-gray-500 mr-3 w-5 h-5 flex-shrink-0" />
              <input
                type="text"
                placeholder="Reference / products, service..."
                className="w-full bg-transparent border-none focus:outline-none text-base text-gray-700 placeholder:text-gray-400"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="flex-1 flex items-center px-4 py-4 h-12 lg:h-14 bg-white rounded-md border border-gray-200 shadow-sm">
              <FiMapPin className="text-gray-500 mr-3 w-5 h-5 flex-shrink-0" />
              <input
                type="text"
                placeholder="Type Location"
                className="w-full bg-transparent border-none focus:outline-none text-base text-gray-700 placeholder:text-gray-400"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <Button
              onClick={onSearch}
              className="bg-[#240457] text-white rounded-lg px-6 lg:px-8 h-12 lg:h-14 font-medium hover:bg-[#240457]/90 flex-shrink-0 transition-colors flex items-center"
            >
              <span className="text-white">▶</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessHero;
