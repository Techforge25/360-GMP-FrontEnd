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
      <div className="flex items-start p-6">
        <div
          className={cn(
            "mr-4 flex h-10 w-10 items-center justify-center rounded-lg border",
            isSelected
              ? "bg-surface text-brand-primary"
              : "bg-surface-muted text-text-secondary",
          )}
        >
          {isBusiness ? (
            <FiBriefcase className="h-5 w-5" />
          ) : (
            <FiUser className="h-5 w-5" />
          )}
        </div>

        <div className="flex-1">
          <h3 className="mb-1 font-semibold">
            {isBusiness ? "Business/Company" : "User"}
          </h3>
          <p className="text-base text-text-secondary">
            {isBusiness
              ? "Post Jobs, Manage Leads & List Products."
              : "Buy Products & Find Jobs, Build Your Career."}
          </p>
        </div>

        <div
          className={cn(
            "ml-4 flex h-5 w-5 items-center justify-center rounded-full border",
            isSelected ? "border-brand-primary" : "border-text-secondary",
          )}
        >
          {isSelected && (
            <div className="h-2.5 w-2.5 rounded-full bg-brand-primary" />
          )}
        </div>
      </div>
    </Card>
  );
};

export { RoleSelectionCard };
