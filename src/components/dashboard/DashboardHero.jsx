"use client";
import React from "react";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { Button } from "@/components/ui/Button";

const DashboardHero = () => {
  return (
    <div className="relative w-full h-[450px] md:h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/60 to-indigo-900/40 z-10" />
        <img
          src="/assets/images/authBG.png"
          alt="Dashboard Hero"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentElement.style.backgroundColor = "#1e1b4b";
          }}
        />
      </div>

      <div className="relative z-20 w-full max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Find Verified Businesses Across The Globe
        </h1>
        <p className="text-indigo-100 mb-10 max-w-2xl mx-auto text-sm md:text-base">
          Discover verified businesses, connect in global communities, and grow
          your network with 360 Global Marketplace. Your gateway to limitless
          business opportunities.
        </p>

        <div className="bg-white p-2 rounded-xl shadow-2xl max-w-3xl mx-auto flex flex-col md:flex-row gap-2">
          <div className="flex-1 flex items-center px-4 h-12 border-b md:border-b-0 md:border-r border-gray-200">
            <FiSearch className="text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Reference / products, service..."
              className="w-full bg-transparent border-none focus:outline-none text-sm text-gray-700 placeholder:text-gray-400"
            />
          </div>
          <div className="flex-1 flex items-center px-4 h-12">
            <FiMapPin className="text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="City or country..."
              className="w-full bg-transparent border-none focus:outline-none text-sm text-gray-700 placeholder:text-gray-400"
            />
          </div>
          <Button className="bg-indigo-900 text-white rounded-lg px-8 h-12 font-medium hover:bg-indigo-800 w-full md:w-auto">
            Search
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs text-white/80">
          <span>Popular:</span>
          <span className="bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 cursor-pointer transition-colors">
            Manufactures
          </span>
          <span className="bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 cursor-pointer transition-colors">
            Suppliers
          </span>
          <span className="bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 cursor-pointer transition-colors">
            Distributers
          </span>
          <span className="bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 cursor-pointer transition-colors">
            Jobs
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardHero;
