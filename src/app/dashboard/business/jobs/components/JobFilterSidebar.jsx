"use client";
import React from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const FilterSection = ({
  title,
  options,
  selectedOptions,
  onToggle,
  isOpen = true,
}) => {
  const [open, setOpen] = React.useState(isOpen);

  return (
    <div className="border-b border-border-light py-4 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full mb-3 group"
      >
        <h4 className="font-semibold text-text-primary text-sm group-hover:text-brand-primary transition-colors">
          {title}
        </h4>
        {open ? (
          <FiChevronUp className="text-black" />
        ) : (
          <FiChevronDown className="text-black" />
        )}
      </button>

      {open && (
        <div className="space-y-2">
          {options.map((opt, i) => (
            <label key={i} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedOptions.includes(opt.value)}
                onChange={() => onToggle(opt.value)}
                className="w-4 h-4 rounded border-gray-300 text-[#240457] focus:ring-brand-primary cursor-pointer"
              />
              <span className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export const JobFilterSidebar = ({ onFilterChange }) => {
  const [showAllFilters, setShowAllFilters] = React.useState(false);

  // Unified filter state
  const [localFilters, setLocalFilters] = React.useState({
    pay: [],
    categories: [],
    jobTypes: [],
    locations: [],
    datePosted: [],
  });

  const handleToggle = (group, value) => {
    const currentGroup = localFilters[group];

    // Check if it's a single-select group (Pay or Location) per backend snippet
    let nextGroup;
    if (group === "pay" || group === "locations") {
      // Toggle logic for single-select: if already selected, clear it; otherwise set it as the only value
      nextGroup = currentGroup.includes(value) ? [] : [value];
    } else {
      // Multi-select for others
      nextGroup = currentGroup.includes(value)
        ? currentGroup.filter((item) => item !== value)
        : [...currentGroup, value];
    }

    const nextFilters = {
      ...localFilters,
      [group]: nextGroup,
    };

    // 1. Update local state
    setLocalFilters(nextFilters);

    // 2. Notify parent of the change sequentially
    if (onFilterChange) {
      onFilterChange(nextFilters);
    }
  };

  const clearAll = () => {
    const emptyFilters = {
      pay: [],
      categories: [],
      jobTypes: [],
      locations: [],
      datePosted: [],
    };
    setLocalFilters(emptyFilters);
    if (onFilterChange) {
      onFilterChange(emptyFilters);
    }
  };

  const hasActiveFilters = Object.values(localFilters).some(
    (arr) => arr.length > 0,
  );

  return (
    <div className="w-64 flex-shrink-0 bg-white rounded-lg border border-border-light p-4 h-fit sticky top-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-500">Jobs Category</h3>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-brand-primary hover:underline font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      <FilterSection
        title="Pay"
        options={[
          { label: "$1000-$1500", value: "1000" },
          { label: "$1500-$3000", value: "1500" },
          { label: "$3000-$5000", value: "3000" },
          { label: "$5000+", value: "5000" },
        ]}
        selectedOptions={localFilters.pay}
        onToggle={(val) => handleToggle("pay", val)}
      />

      <FilterSection
        title="Job Category"
        options={[
          { label: "Manufacturing", value: "Manufacturing" },
          { label: "Logistics", value: "Logistics" },
          { label: "Tech", value: "Tech" },
          { label: "Pharma", value: "Pharma" },
          { label: "Chemical", value: "Chemical" },
        ]}
        selectedOptions={localFilters.categories}
        onToggle={(val) => handleToggle("categories", val)}
      />

      <FilterSection
        title="Job Type"
        options={[
          { label: "Full Time", value: "Full-Time" },
          { label: "Part Time", value: "Part-Time" },
          { label: "Fresher", value: "Fresher" },
          { label: "Internship", value: "Internship" },
          { label: "Contract", value: "Contract" },
        ]}
        selectedOptions={localFilters.jobTypes}
        onToggle={(val) => handleToggle("jobTypes", val)}
      />

      {showAllFilters && (
        <>
          <FilterSection
            title="Location"
            options={[
              { label: "Canada", value: "Canada" },
              { label: "USA", value: "USA" },
              { label: "UK", value: "UK" },
              { label: "Toronto", value: "Toronto" },
              { label: "Montreal", value: "Montreal" },
            ]}
            selectedOptions={localFilters.locations}
            onToggle={(val) => handleToggle("locations", val)}
          />

          <FilterSection
            title="Date Posted"
            options={[
              { label: "All Jobs", value: "all" },
              { label: "Last 24 Hours", value: "24h" },
              { label: "Last 7 Days", value: "7d" },
              { label: "Last 14 Days", value: "14d" },
              { label: "Last 30 Days", value: "30d" },
            ]}
            selectedOptions={localFilters.datePosted}
            onToggle={(val) => handleToggle("datePosted", val)}
          />
        </>
      )}

      <div className="pt-4 text-center flex justify-center">
        <button
          onClick={() => setShowAllFilters(!showAllFilters)}
          className="text-sm text-brand-primary font-medium hover:underline flex items-center justify-center gap-1"
        >
          All Filters {showAllFilters ? <FiChevronUp /> : <FiChevronDown />}
        </button>
      </div>
    </div>
  );
};
