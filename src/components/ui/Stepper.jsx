import React from "react";
import { cn } from "@/lib/utils";

export const Stepper = ({ currentStep, steps }) => {
  const activeIndex = steps.findIndex((s) => s.id === currentStep);
  const totalSteps = steps.length - 1;

  const rawProgress = (activeIndex / totalSteps) * 100;

  return (
    <div className="relative w-full max-w-4xl mx-auto mb-12 px-4">
      {/* Base line */}
      <div className="absolute top-5 left-15 w-[calc(100%-8rem)] h-0.5 bg-border-light" />

      {/* Progress line */}
      <div
        className="absolute top-5 left-15 h-0.5 bg-accent-success transition-all duration-300"
        style={{
          width: activeIndex === 0 ? "0%" : `calc(${rawProgress}% - 8rem)`,
        }}
      />

      {/* Steps */}
      <div className="flex justify-between relative z-10">
        {steps.map((step) => {
          const isActive = step.id <= currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-base font-semibold border-2 transition-all duration-300 bg-surface",
                  isActive
                    ? "border-accent-success bg-accent-success text-white"
                    : "border-border-light text-text-secondary",
                )}
              >
                {step.id}
              </div>

              <span
                className={cn(
                  "text-sm font-medium whitespace-nowrap text-center",
                  isActive ? "text-text-primary" : "text-text-secondary",
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
