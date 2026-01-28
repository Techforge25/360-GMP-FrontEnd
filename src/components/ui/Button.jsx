import React from "react";
import { cn } from "@/lib/utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Button = React.forwardRef(
  (
    {
      className,
      variant = "default",
      size = "default",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const variants = {
      default: "bg-brand-primary text-text-inverse hover:opacity-90",
      destructive: "bg-accent-danger text-text-inverse hover:opacity-90",
      outline:
        "border border-border-light text-text-primary bg-surface hover:bg-surface-muted hover:text-text-primary/50",
      secondary: "bg-brand-secondary text-text-primary hover:opacity-80",
      ghost: "hover:bg-surface-muted hover:text-text-primary",
      link: "text-text-link underline-offset-4 hover:underline",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className,
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
