import React from "react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { FiBriefcase, FiUser } from "react-icons/fi";

const RoleSelectionCard = ({ type = "business", selected, onSelect }) => {
  const isBusiness = type === "business";
  const isSelected = selected === type;

  return (
    <Card
      onClick={() => onSelect && onSelect(type)}
      className={cn(
        "cursor-pointer transition-all duration-200 hover:border-brand-primary/50",
        isSelected
          ? "border-brand-primary bg-brand-primary/5 ring-1 ring-brand-primary"
          : "border-border-light bg-surface-elevated",
      )}
    >
      <div className="flex items-start p-3 xs:p-4 sm:p-6">
        <div
          className={cn(
            "mr-2 xs:mr-3 sm:mr-4 flex h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg border flex-shrink-0",
            isSelected
              ? "bg-surface text-brand-primary"
              : "bg-surface-muted text-text-secondary",
          )}
        >
          {isBusiness ? (
            <FiBriefcase className="h-4 w-4 xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
          ) : (
            <FiUser className="h-4 w-4 xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="mb-1 font-semibold text-sm xs:text-base sm:text-base leading-tight">
            {isBusiness ? "Business/Company" : "User"}
          </h3>
          <p className="text-sm xs:text-sm sm:text-base text-text-secondary leading-relaxed">
            {isBusiness
              ? "Post Jobs, Manage Leads & List Products."
              : "Buy Products & Find Jobs, Build Your Career."}
          </p>
        </div>

        <div
          className={cn(
            "ml-2 xs:ml-3 sm:ml-4 flex h-4 w-4 xs:h-5 xs:w-5 items-center justify-center rounded-full border flex-shrink-0",
            isSelected ? "border-brand-primary" : "border-text-secondary",
          )}
        >
          {isSelected && (
            <div className="h-2 w-2 xs:h-2.5 xs:w-2.5 rounded-full bg-brand-primary" />
          )}
        </div>
      </div>
    </Card>
  );
};

export { RoleSelectionCard };
