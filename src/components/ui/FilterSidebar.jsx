import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { FiChevronUp, FiChevronDown, FiX } from "react-icons/fi";
import { Button } from "@/components/ui/Button";

const FilterSection = ({ title, children, isOpen: defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b py-4 last:border-0">
      <button
        className="flex w-full items-center justify-between text-base font-semibold"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </button>
      {isOpen && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  );
};

const CheckboxItem = ({ label, checked, onChange, count }) => (
  <label className="flex cursor-pointer items-center space-x-2">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 rounded border-border-light text-brand-primary focus:ring-brand-primary"
    />
    <span className="flex-1 text-base text-text-secondary">{label}</span>
    {count && <span className="text-sm text-text-secondary">({count})</span>}
  </label>
);

const FilterSidebar = ({ className, onClose }) => {
  return (
    <div
      className={cn(
        "w-full max-w-xs rounded-xl border border-border-light bg-surface-elevated p-4",
        className,
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-bold">Filters</h3>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onClose}
        >
          <FiX />
        </Button>
      </div>

      <div className="h-full overflow-y-auto pr-2">
        <FilterSection title="Pay">
          <CheckboxItem label="$1000-$1500" />
          <CheckboxItem label="$1500-$3000" checked />
          <CheckboxItem label="$3000-$5000" />
          <CheckboxItem label="$5000+" />
        </FilterSection>

        <FilterSection title="Product Category">
          <CheckboxItem label="Manufacturing" />
          <CheckboxItem label="Logistics" checked />
          <CheckboxItem label="Tech" />
          <CheckboxItem label="Pharma" />
          <CheckboxItem label="Chemical" />
        </FilterSection>

        <FilterSection title="Job Type">
          <CheckboxItem label="Full Time" checked />
          <CheckboxItem label="Part Time" checked />
          <CheckboxItem label="Fresher" />
          <CheckboxItem label="Internship" />
          <CheckboxItem label="Contract" />
        </FilterSection>

        <FilterSection title="Location">
          <CheckboxItem label="Toronto" />
          <CheckboxItem label="Ottawa" checked />
          <CheckboxItem label="Vancouver" />
          <CheckboxItem label="Quebec City" />
          <CheckboxItem label="Montreal" />
        </FilterSection>
      </div>
    </div>
  );
};

export { FilterSidebar };
