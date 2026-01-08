import React from "react";
import { cn } from "@/lib/utils";

const Badge = React.forwardRef(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default:
        "border-transparent bg-brand-primary text-text-inverse hover:opacity-80",
      secondary:
        "border-transparent bg-brand-secondary text-text-primary hover:opacity-80",
      destructive:
        "border-transparent bg-accent-danger text-text-inverse hover:opacity-80",
      outline: "text-text-primary border-border-light",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
