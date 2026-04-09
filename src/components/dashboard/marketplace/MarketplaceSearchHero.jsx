"use client";

import { is } from "date-fns/locale";
import { Search } from "lucide-react";
import { select } from "slate";

export default function MarketplaceSearchHero({
  query,
  setQuery,
  handleSearch,
  handleClearFilters,
  isSearchSelected
}) {
  return (
    <>
      <nav className="bg-white border-b border-gray-200 px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-gray-900 text-sm sm:text-base lg:text-lg font-medium">
            Market Place
          </h1>
        </div>
      </nav>

      <div className="relative overflow-hidden pb-16 sm:pb-20 lg:pb-24">
        <div className="absolute inset-0">
          <img
            src="/assets/images/marketplace.png"
            alt="Marketplace Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 pb-6 sm:pb-8 pt-12 sm:pt-16">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 px-2">
              Find Verified supplier Across the Globe
            </h1>
            <p className="text-purple-100 text-sm sm:text-base lg:text-lg xl:text-xl max-w-3xl mx-auto px-4 sm:px-6">
              Connect with top-rated verified suppliers. Low MOQ, Fast Shipping,
              and Trade Assurance.
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-20 max-w-[1150px] mx-auto px-3 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 lg:-mt-24">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="relative w-full">
              <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products, or supplier..."
                readOnly={isSearchSelected}
                className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700 placeholder-gray-400 text-sm sm:text-base"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-brand-primary cursor-pointer hover:bg-brand-primary/90 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg sm:rounded-xl font-medium transition-colors duration-200 whitespace-nowrap w-full sm:w-auto text-sm sm:text-base"
            >
              Search
            </button>
            <button
              onClick={handleClearFilters}
              disabled={!query}
              className="bg-gray-500 cursor-pointer text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg sm:rounded-xl font-medium transition-colors duration-200 whitespace-nowrap w-full sm:w-auto text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 disabled:hover:bg-gray-500"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
