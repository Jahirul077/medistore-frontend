import React from "react";
import { cn } from "@/lib/utils";

export default function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  iconRight,
  disabled,
  type = "button",
  onClick,
  ...props
}) {
  // Styles for different variants
  const variants = {
    primary: "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 shadow-md shadow-emerald-500/10 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98]",
    secondary: "bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 active:scale-[0.98]",
    outline: "border border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900 active:scale-[0.98]",
    ghost: "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900",
    glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 shadow-lg active:scale-[0.98]",
  };

  // Styles for different sizes
  const sizes = {
    sm: "h-9 px-4 text-xs rounded-lg gap-1.5",
    md: "h-11 px-6 text-sm rounded-xl gap-2",
    lg: "h-13 px-8 text-base rounded-2xl gap-2.5",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center font-medium transition-all duration-200 ease-out select-none outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {/* Loading Spinner */}
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            document="evenodd"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}

      {/* Left Icon (if not loading) */}
      {!loading && icon && <span className="flex items-center shrink-0">{icon}</span>}

      {/* Button Text */}
      <span>{children}</span>

      {/* Right Icon */}
      {!loading && iconRight && <span className="flex items-center shrink-0">{iconRight}</span>}
    </button>
  );
}
