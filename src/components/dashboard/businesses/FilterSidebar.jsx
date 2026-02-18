"use client";
import React, { useState } from "react";
import { FiChevronDown, FiChevronUp, FiSearch, FiFilter } from "react-icons/fi";

const FilterGroup = ({
  title,
  options,
  selectedValues = [],
  onChange,
  isOpenDefault = true,
}) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  const handleCheckboxChange = (option) => {
    if (selectedValues.includes(option)) {
      onChange(selectedValues.filter((v) => v !== option));
    } else {
      onChange([...selectedValues, option]);
    }
  };

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
                  checked={selectedValues.includes(opt)}
                  onChange={() => handleCheckboxChange(opt)}
                  className="peer w-4 h-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500/20"
                />
              </div>
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                {opt}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const FilterSidebar = ({ filters = {}, onFilterChange }) => {
  const handleIndustryChange = (values) => {
    onFilterChange({ ...filters, industries: values });
  };

  const handleCountryChange = (values) => {
    onFilterChange({ ...filters, countries: values });
  };

  const handleRatingChange = (values) => {
    onFilterChange({ ...filters, ratings: values });
  };

  return (
    <div className="w-full border border-border-light p-6 rounded-card">
      <div className="flex items-center gap-2 mb-6 text-gray-600 font-bold border-b pb-4">
        Filters
      </div>

      <FilterGroup
        title="Industry Category"
        options={[
          "Privately held",
          "Manufacturing",
          "Chemicals & Petrochemicals",
          "Fashion & Accessories",
          "Service Project & Equipment",
          "Consumer Electronics",
          "Packaging Materials",
          "Furniture & Home Decor",
        ]}
        selectedValues={filters.industries || []}
        onChange={handleIndustryChange}
      />

      <FilterGroup
        title="Country"
        options={[
          "United States of America",
          "Pakistan",
          "Germany",
          "China",
          "Belgium",
          "France",
          "South Africa",
        ]}
        selectedValues={filters.countries || []}
        onChange={handleCountryChange}
      />

      <FilterGroup
        title="Rating"
        // options={["5 Stars", "4 Stars & Up", "3 Stars & Up", "2 Stars & Up"]}
        options={["Coming soon in phase 5"]}
        // selectedValues={filters.ratings || []}
        onChange={handleRatingChange}
      />
    </div>
  );
};

export default FilterSidebar;
