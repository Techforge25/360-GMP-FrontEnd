"use client";
import React from "react";
// import { Checkbox } from "@/components/ui/checkbox"; // Assuming you have a checkbox or I'll use native
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const FilterSection = ({ title, options, isOpen = true }) => {
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
                className="w-4 h-4 rounded border-gray-300 text-[#240457] focus:ring-brand-primary"
              />
              <span className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                {opt}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export const JobFilterSidebar = () => {
  return (
    <div className="w-64 flex-shrink-0 bg-white rounded-lg border border-border-light p-4 h-fit sticky top-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-500">Jobs Category</h3>
      </div>

      <FilterSection
        title="Pay"
        options={["$1000-$1500", "$1500-$3000", "$3000-5000", "$5000+"]}
      />

      <FilterSection
        title="Product Category"
        options={["Manufacturing", "Logistics", "Tech", "Pharma", "Chemical"]}
      />

      <FilterSection
        title="Job Type"
        options={[
          "Full Time",
          "Part Time",
          "Fresher",
          "Internship",
          "Contract",
        ]}
      />

      <div className="pt-4 text-center flex justify-center">
        <button className="text-sm text-brand-primary font-medium hover:underline flex items-center justify-center gap-1">
          All Filters <FiChevronDown />
        </button>
      </div>
    </div>
  );
};
