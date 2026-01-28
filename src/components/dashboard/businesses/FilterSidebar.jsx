"use client";
import React, { useState } from "react";
import { FiChevronDown, FiChevronUp, FiSearch, FiFilter } from "react-icons/fi";

const FilterGroup = ({ title, options, isOpenDefault = true }) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-base font-bold text-gray-900 mb-3"
      >
        {title}
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </button>

      {isOpen && (
        <div className="space-y-2 animate-in slide-in-from-top-1">
          {options.map((opt, i) => (
            <label
              key={i}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  className="peer w-4 h-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500/20"
                />
              </div>
              <span className="text-base text-gray-600 group-hover:text-gray-900 transition-colors">
                {opt}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const FilterSidebar = () => {
  return (
    <div className="w-full border border-border-light p-6 rounded-card">
      <div className="flex items-center gap-2 mb-6 text-gray-600 font-bold border-b pb-4">
        Filters
      </div>

      <FilterGroup
        title="Industry Category"
        options={[
          "Tech & Manufacturing",
          "Industrial Machinery & Equipment",
          "Chemicals & Petrochemicals",
          "Fashion & Accessories",
          "Service Project & Equipment",
          "Consumer Electronics",
          "Packaging Materials",
          "Furniture & Home Decor",
        ]}
      />

      <FilterGroup
        title="Country"
        options={[
          "United States of America",
          "Canada",
          "Germany",
          "China",
          "Belgium",
          "France",
          "South Africa",
        ]}
      />

      <FilterGroup
        title="Rating"
        options={["5 Stars", "4 Stars & Up", "3 Stars & Up", "2 Stars & Up"]}
      />
    </div>
  );
};

export default FilterSidebar;
