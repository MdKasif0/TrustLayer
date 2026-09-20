import React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  loading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-hover active:bg-[#0B3319] border-transparent",
  secondary:
    "bg-soft-green text-primary hover:bg-[#D5ECDB] active:bg-[#C1E3CA] border-transparent",
  outline:
    "bg-transparent text-foreground hover:bg-soft-green active:bg-[#D5ECDB] border-border",
  ghost:
    "bg-transparent text-muted hover:text-foreground hover:bg-soft-green active:bg-[#D5ECDB] border-transparent",
  danger:
    "bg-danger text-white hover:bg-[#9A1E14] active:bg-[#821912] border-transparent",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-[13px] px-3 py-1.5 gap-1.5",
  md: "text-sm px-4 py-2 gap-2",
  lg: "text-[15px] px-5 py-2.5 gap-2",
};

export function Button({
  variant = "primary",
  size = "md",
  icon,
  loading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium rounded-md border",
        "transition-colors duration-150 cursor-pointer",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      {children}
    </button>
  );
}
