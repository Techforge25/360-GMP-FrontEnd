"use client";
import React from "react";
import { FiChevronDown, FiChevronUp, FiX, FiFilter } from "react-icons/fi";

const FilterSection = ({
  title,
  options,
  selectedOptions,
  onToggle,
  isOpen = true,
}) => {
  const [open, setOpen] = React.useState(isOpen);

  return (
    <div className="border-b border-border-light py-3 sm:py-4 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full mb-3 group py-1 sm:py-0 touch-manipulation"
      >
        <h4 className="font-semibold text-text-primary text-sm sm:text-base group-hover:text-brand-primary transition-colors">
          {title}
        </h4>
        {open ? (
          <FiChevronUp className="text-black w-4 h-4 sm:w-5 sm:h-5" />
        ) : (
          <FiChevronDown className="text-black w-4 h-4 sm:w-5 sm:h-5" />
        )}
      </button>

      {open && (
        <div className="space-y-2 sm:space-y-2.5">
          {options.map((opt, i) => (
            <label key={i} className="flex items-center gap-2.5 sm:gap-3 cursor-pointer py-1 touch-manipulation">
              <input
                type="checkbox"
                checked={selectedOptions.includes(opt.value)}
                onChange={() => onToggle(opt.value)}
                className="w-4 h-4 sm:w-[18px] sm:h-[18px] rounded border-gray-300 text-[#240457] focus:ring-brand-primary cursor-pointer touch-manipulation"
              />
              <span className="text-sm sm:text-base text-text-secondary hover:text-text-primary transition-colors">
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
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

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

  const activeFiltersCount = Object.values(localFilters).reduce(
    (count, arr) => count + arr.length,
    0
  );

  // Mobile Filter Toggle Button
  const MobileFilterButton = () => (
    <button
      onClick={() => setIsMobileOpen(true)}
      className="lg:hidden w-full flex items-center justify-center gap-2 bg-white border border-border-light rounded-lg px-4 py-3 mb-4 hover:bg-gray-50 transition-colors"
    >
      <FiFilter className="w-5 h-5 text-brand-primary" />
      <span className="font-medium text-gray-700">
        Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
      </span>
    </button>
  );

  // Desktop Sidebar Content
  const SidebarContent = ({ isMobile = false }) => (
    <div className={`bg-white rounded-lg border border-border-light h-fit ${
      isMobile 
        ? "w-full max-w-md mx-auto" 
        : "w-full sm:w-72 md:w-64 lg:w-72 xl:w-80"
    }`}>
      {/* Mobile Header */}
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b border-border-light">
          <h3 className="font-semibold text-lg text-gray-900">Filter Jobs</h3>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors touch-manipulation"
          >
            <FiX className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      )}

      <div className="p-3 sm:p-4">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className={`font-semibold text-gray-500 ${isMobile ? "text-base" : "text-sm sm:text-base"}`}>
            {isMobile ? "Filter Options" : "Jobs Category"}
          </h3>
          {hasActiveFilters && (
            <button
              onClick={clearAll}
              className="text-sm sm:text-sm text-brand-primary hover:underline font-medium touch-manipulation py-1 px-1"
            >
              Clear All
            </button>
          )}
        </div>

        <FilterSection
          title="Pay Range"
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

        {(showAllFilters || isMobile) && (
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

        {!isMobile && (
          <div className="pt-3 sm:pt-4 text-center flex justify-center">
            <button
              onClick={() => setShowAllFilters(!showAllFilters)}
              className="text-sm sm:text-base text-brand-primary font-medium hover:underline flex items-center justify-center gap-1 py-2 px-2 touch-manipulation"
            >
              All Filters {showAllFilters ? <FiChevronUp className="w-4 h-4" /> : <FiChevronDown className="w-4 h-4" />}
            </button>
          </div>
        )}

        {/* Mobile Apply Button */}
        {isMobile && (
          <div className="pt-4 border-t border-border-light mt-4">
            <button
              onClick={() => setIsMobileOpen(false)}
              className="w-full bg-brand-primary text-white font-medium py-3 px-4 rounded-lg hover:bg-brand-primary/90 transition-colors touch-manipulation"
            >
              Apply Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <MobileFilterButton />

      {/* Desktop Sidebar */}
      <div className="hidden lg:block flex-shrink-0 sticky top-4">
        <SidebarContent />
      </div>

      {/* Mobile Filter Modal/Drawer */}
      {isMobileOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-50 touch-manipulation"
            onClick={() => setIsMobileOpen(false)}
          />
          
          {/* Modal */}
          <div className="lg:hidden fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-h-[85vh] overflow-y-auto">
            <SidebarContent isMobile={true} />
          </div>
        </>
      )}
    </>
  );
};
