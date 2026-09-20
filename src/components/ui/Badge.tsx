import React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "default" | "success" | "warning" | "danger" | "muted" | "brand";

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-soft-green text-primary border border-[#C1E3CA]",
  success: "bg-success-bg text-success border-[#B8DFC6]",
  warning: "bg-warning-bg text-[#92610F] border-[#E8D5A0]",
  danger: "bg-danger-bg text-danger border-[#F0C5C1]",
  muted: "bg-[#F0F2F0] text-muted border-border",
  brand: "bg-primary text-white border-transparent",
};

export function Badge({ variant = "default", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono font-medium leading-none tracking-wide uppercase",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
