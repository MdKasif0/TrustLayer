import React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "outline"
  | "ghost"
  | "danger"
  | "warning";

export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  loading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: cn(
    "bg-[#14532D] text-white border border-[#14532D] shadow-[0_1px_2px_rgba(20,83,45,0.10)]",
    "hover:bg-[#0F4526] hover:border-[#0F4526] hover:-translate-y-[1px] hover:shadow-[0_3px_8px_rgba(20,83,45,0.14)]",
    "active:translate-y-0 active:scale-[0.99] active:shadow-[0_1px_2px_rgba(20,83,45,0.06)]",
    "focus-visible:ring-[#6FA887]"
  ),
  secondary: cn(
    "bg-white text-[#14532D] border border-[#AFC5B5] shadow-xs",
    "hover:bg-[#F4F8F4] hover:border-[#14532D] hover:text-[#14532D] hover:-translate-y-[1px] hover:shadow-[0_2px_6px_rgba(20,83,45,0.08)]",
    "active:translate-y-0 active:scale-[0.99] active:bg-[#EAF4ED]",
    "focus-visible:ring-[#6FA887]"
  ),
  tertiary: cn(
    "bg-transparent text-[#2F6B4F] border border-transparent shadow-none px-2 py-1.5",
    "hover:text-[#14532D] hover:bg-transparent",
    "active:scale-[0.99]",
    "focus-visible:ring-[#6FA887] group"
  ),
  outline: cn(
    "bg-white text-[#17201A] border border-[#DDE3DE] shadow-xs",
    "hover:bg-[#F4F8F4] hover:border-[#14532D] hover:text-[#14532D] hover:-translate-y-[1px]",
    "active:translate-y-0 active:scale-[0.99]",
    "focus-visible:ring-[#6FA887]"
  ),
  ghost: cn(
    "bg-transparent text-[#2F6B4F] border border-transparent shadow-none",
    "hover:text-[#14532D] hover:bg-[#F4F8F4]",
    "active:scale-[0.99]",
    "focus-visible:ring-[#6FA887]"
  ),
  danger: cn(
    "bg-[#B42318] text-white border border-[#B42318] shadow-xs",
    "hover:bg-[#982018] hover:border-[#982018] hover:-translate-y-[1px] hover:shadow-[0_3px_8px_rgba(180,35,24,0.18)]",
    "active:translate-y-0 active:scale-[0.99] active:bg-[#7E1B13]",
    "focus-visible:ring-[#B42318]"
  ),
  warning: cn(
    "bg-[#FFF7E6] text-[#8A5A12] border border-[#E7C98A] shadow-xs",
    "hover:bg-[#FDE8B3] hover:border-[#8A5A12] hover:-translate-y-[1px]",
    "active:translate-y-0 active:scale-[0.99]",
    "focus-visible:ring-[#8A5A12]"
  ),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-[13px] font-semibold rounded-[8px] gap-2 tracking-[-0.01em]",
  md: "h-11 px-[18px] text-sm font-semibold rounded-[10px] gap-2 tracking-[-0.01em]",
  lg: "h-12 px-5 text-sm font-semibold rounded-[10px] gap-2 tracking-[-0.01em]",
  icon: "w-10 h-10 p-0 rounded-[10px] justify-center tracking-normal",
};

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  loading = false,
  disabled,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const isTertiary = variant === "tertiary";

  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center font-sans select-none leading-none",
        "transition-all duration-150 ease-out cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:opacity-55 disabled:cursor-not-allowed disabled:pointer-events-none disabled:transform-none disabled:shadow-none",
        variantStyles[variant],
        !isTertiary && sizeStyles[size],
        isTertiary && "h-auto font-semibold text-sm",
        className
      )}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin h-4 w-4 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
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
        <span className="shrink-0 flex items-center justify-center [&>svg]:w-4 [&>svg]:h-4 lg:[&>svg]:w-[18px] lg:[&>svg]:h-[18px]">
          {icon}
        </span>
      ) : null}

      {children}

      {iconRight ? (
        <span className="shrink-0 flex items-center justify-center [&>svg]:w-4 [&>svg]:h-4 transition-transform duration-150 group-hover:translate-x-[2px]">
          {iconRight}
        </span>
      ) : null}
    </button>
  );
}
