import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  border?: boolean;
  hoverable?: boolean;
  children: React.ReactNode;
}

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-5 sm:p-6",
  lg: "p-6 sm:p-8",
};

export function Card({
  className,
  padding = "md",
  border = true,
  hoverable = false,
  children,
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-surface rounded-lg",
        border && "border border-border",
        hoverable && "transition-shadow duration-150 hover:shadow-[var(--shadow-md)]",
        paddingStyles[padding],
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex items-center justify-between mb-4", className)}>
      {children}
    </div>
  );
}

export function CardTitle({
  as: Tag = "h3",
  className,
  children,
}: {
  as?: "h2" | "h3" | "h4";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag className={cn("font-semibold text-foreground", className)}>
      {children}
    </Tag>
  );
}
