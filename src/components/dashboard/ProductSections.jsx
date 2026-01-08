"use client";
import React from "react";
import { FiArrowRight, FiHeart } from "react-icons/fi";
import { Button } from "@/components/ui/Button";

const ProductSections = ({ products }) => {
  // Use passed products or default to empty structure if unavailable
  const { featured = [], topRanking = [], newArrivals = [] } = products || {};

  if (!products) return null;

  return (
    <div className="space-y-16 py-12">
      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-indigo-950">
              Feature Product
            </h2>
            <p className="text-sm text-gray-500">
              Curated high-quality items for you.
            </p>
          </div>
          <Button
            variant="outline"
            className="text-indigo-900 border-indigo-200"
          >
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((prod, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group"
            >
              <div className="h-48 bg-gray-100 relative">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.target.style.display = "none")}
                />
                <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                  {prod.tag}
                </span>
                <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
                  <FiHeart />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1">{prod.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-indigo-900">
                    {prod.price}
                  </span>
                  <Button
                    size="sm"
                    className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Split Section: Top Ranking & New Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Ranking (Purple Gradient) */}
          <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold">Top Ranking</h2>
                <p className="text-white/80 text-xs">
                  Best selling products this month
                </p>
              </div>
              <span className="text-xs font-bold cursor-pointer hover:underline">
                See All &gt;
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {topRanking.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-3 text-gray-900 shadow-lg"
                >
                  <div className="h-24 bg-gray-100 rounded-lg mb-3 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  </div>
                  <h3 className="font-bold text-sm truncate">{item.name}</h3>
                  <p className="text-xs text-gray-500 mb-2 truncate">
                    {item.desc}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-indigo-900 text-sm">
                      {item.price}
                    </span>
                    <button className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-indigo-900 hover:text-white transition-colors">
                      <FiArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* New Product (Dark Overlay) */}
          <div className="bg-gray-900 rounded-2xl p-6 text-white relative overflow-hidden">
            {/* Background element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-800 rounded-full blur-3xl -mr-10 -mt-10" />

            <div className="flex justify-between items-center mb-6 relative z-10">
              <div>
                <h2 className="text-xl font-bold">New Product</h2>
                <p className="text-gray-400 text-xs">
                  Just arrived in the marketplace
                </p>
              </div>
              <span className="text-xs font-bold cursor-pointer hover:underline">
                See All &gt;
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 relative z-10">
              {newArrivals.map((item, i) => (
                <div
                  key={i}
                  className="bg-gray-800 rounded-xl p-3 border border-gray-700 shadow-lg"
                >
                  <div className="h-24 bg-gray-700 rounded-lg mb-3 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  </div>
                  <h3 className="font-bold text-sm truncate text-gray-200">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2 truncate">
                    {item.desc}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white text-sm">
                      {item.price}
                    </span>
                    <button className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-colors">
                      <FiArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductSections;
