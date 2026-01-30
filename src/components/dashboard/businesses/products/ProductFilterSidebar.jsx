"use client";
import React, { useState } from "react";
import { FaStar, FaChevronUp, FaChevronDown } from "react-icons/fa";

export default function ProductFilterSidebar() {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    moq: true,
    ratings: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 w-full lg:w-64 flex-shrink-0 h-fit">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Filter Product</h3>

      {/* Product Category */}
      <div className="mb-6 pb-6 border-b border-gray-100">
        <div
          className="flex justify-between items-center cursor-pointer mb-4"
          onClick={() => toggleSection("category")}
        >
          <h4 className="font-bold text-gray-900 text-sm">Product Category</h4>
          {expandedSections.category ? <FaChevronUp className="text-gray-400 text-xs" /> : <FaChevronDown className="text-gray-400 text-xs" />}
        </div>
        
        {expandedSections.category && (
          <div className="space-y-3">
            {[
              { id: "cat1", label: "Category 1 (54)" },
              { id: "electronic", label: "Electronic", checked: true },
              { id: "cat2", label: "Category 2 (12)" },
              { id: "cat3", label: "Category 3 (12)" },
              { id: "cat4", label: "Category 4 (5)" },
            ].map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id={item.id}
                  defaultChecked={item.checked}
                  className="w-4 h-4 rounded border-gray-300 text-indigo-900 focus:ring-indigo-900"
                />
                <label htmlFor={item.id} className={`text-sm ${item.checked ? 'font-bold text-gray-900' : 'text-gray-500'}`}>
                  {item.label}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MOQ Range */}
      <div className="mb-6 pb-6 border-b border-gray-100">
        <div
          className="flex justify-between items-center cursor-pointer mb-4"
          onClick={() => toggleSection("moq")}
        >
          <h4 className="font-bold text-gray-900 text-sm">MOQ Range</h4>
          {expandedSections.moq ? <FaChevronUp className="text-gray-400 text-xs" /> : <FaChevronDown className="text-gray-400 text-xs" />}
        </div>

        {expandedSections.moq && (
          <div className="space-y-3">
            {[
              { id: "all", label: "All Quantities" },
              { id: "less500", label: "MOQ < 500 Units", checked: true },
              { id: "200-400", label: "200-400 Units" },
              { id: "more500", label: "MOQ > 500 Units" },
            ].map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id={item.id}
                  defaultChecked={item.checked}
                  className="w-4 h-4 rounded border-gray-300 text-indigo-900 focus:ring-indigo-900"
                />
                <label htmlFor={item.id} className={`text-sm ${item.checked ? 'font-bold text-gray-900' : 'text-gray-500'}`}>
                  {item.label}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

       {/* Ratings */}
       <div>
        <div
          className="flex justify-between items-center cursor-pointer mb-4"
          onClick={() => toggleSection("ratings")}
        >
          <h4 className="font-bold text-gray-900 text-sm">Ratings</h4>
          {expandedSections.ratings ? <FaChevronUp className="text-gray-400 text-xs" /> : <FaChevronDown className="text-gray-400 text-xs" />}
        </div>

        {expandedSections.ratings && (
          <div className="space-y-3">
            {[5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1].map((rating) => (
               <div key={rating} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id={`rating-${rating}`}
                  className="w-4 h-4 rounded border-gray-300 text-indigo-900 focus:ring-indigo-900"
                />
                <label htmlFor={`rating-${rating}`} className="flex items-center gap-2 text-sm text-gray-600">
                   <FaStar className="text-yellow-400 text-sm" /> 
                   <span>{rating}</span>
                </label>
              </div>
            ))}
             <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="no-rating"
                  className="w-4 h-4 rounded border-gray-300 text-indigo-900 focus:ring-indigo-900"
                />
                <label htmlFor="no-rating" className="text-sm text-gray-500">
                  No rating
                </label>
              </div>
          </div>
        )}
      </div>

    </div>
  );
}
