"use client";
import React from "react";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { IoSend } from "react-icons/io5";
import { MdClear } from "react-icons/md";

const BusinessHero = ({ query, setQuery, location, setLocation, onSearch, onClearFilters }) => {
  return (
    <div className="relative md:max-w-[1400px] w-[96%] mx-auto h-[300px] xs:h-[320px] sm:h-[340px] md:h-[360px] lg:h-[400px] flex items-center justify-center overflow-hidden mb-4 sm:mb-6 lg:mb-8 px-2 sm:px-4 py-4">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-brand-primary/10 z-10 rounded-[12px]" />
        <Image
          src="/assets/images/businessHero.png"
          alt="Background"
          className="w-full h-full object-cover rounded-[12px]"
          width={1920}
          height={400}
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
              />
            </div>
            <Button
              onClick={onSearch}
              className="bg-brand-primary text-white rounded-lg px-4 py-3 font-medium hover:bg-brand-primary/90 w-full transition-colors text-sm"
            >
              <div className="flex items-center justify-center gap-2">
                <span>Search</span>
                <IoSend size={18} />
              </div>
            </Button>
            <Button
              onClick={onClearFilters}
              className="bg-brand-primary text-white rounded-lg px-4 py-3 font-medium hover:bg-brand-primary/90 w-full transition-colors text-sm"
            >
              <div className="flex items-center justify-center gap-2">
                <span>Clear</span>
                <IoSend size={18} />
              </div>
            </Button>
          </div>

          {/* Desktop: Inline Layout */}
          <div className="hidden md:flex md:items-center gap-2 lg:gap-3">
            <div className="flex-1 flex items-center px-4 py-4 h-12 lg:h-14 bg-white rounded-md border border-gray-200 shadow-sm">
              <FiSearch className="text-gray-500 mr-3 w-5 h-5 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search Business Name, service..."
                className="w-full bg-transparent border-none focus:outline-none text-base text-gray-700 placeholder:text-gray-400"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="flex-1 flex items-center px-4 py-4 h-12 lg:h-14 bg-white rounded-md border border-gray-200 shadow-sm">
              <FiMapPin className="text-gray-500 mr-3 w-5 h-5 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search Business Type"
                className="w-full bg-transparent border-none focus:outline-none text-base text-gray-700 placeholder:text-gray-400"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <Button
              onClick={onSearch}
              className="bg-brand-primary text-white rounded-lg px-2 lg:px-4 h-10 lg:h-12 font-medium hover:bg-brand-primary/90 flex-shrink-0 transition-colors flex items-center"
            >
              <span className="text-white"><IoSend size={20} /></span>
            </Button>
            <Button
              onClick={onClearFilters}
              className="bg-brand-primary text-white rounded-lg px-2 lg:px-4 h-10 lg:h-12 font-medium hover:bg-brand-primary/90 flex-shrink-0 transition-colors flex items-center"
            >
              <span className="text-white"><MdClear size={20} /></span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessHero;
