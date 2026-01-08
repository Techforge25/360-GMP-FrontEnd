"use client";
import React from "react";
import { FiMapPin, FiPhone, FiGlobe, FiMoreHorizontal } from "react-icons/fi";

const BusinessGrid = ({ businesses = [] }) => {
  if (!businesses || businesses.length === 0) return null;

  return (
    <section className="py-12 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-indigo-950 mb-2">
            Businesses
          </h2>
          <p className="text-sm text-gray-500">
            Explore verified businesses around the world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((biz, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Cover Image */}
              <div className="h-32 bg-gray-200 relative">
                <img
                  src={biz.image || "/assets/images/pBG.png"}
                  alt={biz.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                {/* Logo Overlay */}
                <div className="absolute -bottom-6 left-4">
                  <div className="w-12 h-12 rounded-lg bg-white p-1 shadow-sm border border-gray-100 flex items-center justify-center">
                    <img
                      src={biz.logo || "/assets/images/profileLogo.png"}
                      alt={biz.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-8 px-4 pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">
                      {biz.name}
                    </h3>
                    <p className="text-xs text-blue-600 font-medium">
                      {biz.category}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-400">
                      <FiGlobe className="w-3.5 h-3.5" />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-400">
                      <FiPhone className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center text-xs text-gray-500 mt-3 pt-3 border-t border-gray-50">
                  <FiMapPin className="mr-1" /> {biz.location}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button className="px-6 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 shadow-sm">
            Discover More Businesses
          </button>
        </div>
      </div>
    </section>
  );
};

export default BusinessGrid;
