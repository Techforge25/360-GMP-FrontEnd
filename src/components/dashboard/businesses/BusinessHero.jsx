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
    <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden mb-8 p-4 rounded-card">
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

      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 text-center text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Discover Businesses Around the World
        </h1>
        <p className="text-blue-100 mb-8 text-base">
          Search by Category, industry, or name and explore verified Businesses.
        </p>

        <div className="bg-white/20 border border-white/40 p-6 rounded-lg shadow-xl max-w-4xl mx-auto flex flex-col md:flex-row gap-2">
          <div className="flex-1 flex items-center px-4 py-4 h-12 bg-gray-50 rounded-md border border-border-light">
            <FiSearch className="text-black mr-3 w-5 h-5" />
            <input
              type="text"
              placeholder="Reference / products, service..."
              className="w-full bg-transparent border-none focus:outline-none text-base text-gray-700 placeholder:text-gray-400"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="flex-1 flex items-center px-4 py-4 h-12 bg-gray-50 rounded-md border border-gray-200">
            <FiMapPin className="text-black mr-3 w-5 h-5" />
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
            className="bg-[#240457] cursor-pointer text-white rounded-xl px-3 h-12 font-medium hover:bg-[#240457] w-full md:w-auto"
          >
            <img src="/assets/images/stylishArrow.png" alt="" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BusinessHero;
