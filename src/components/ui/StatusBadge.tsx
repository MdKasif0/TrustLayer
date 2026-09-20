import React from "react";
import { cn } from "@/lib/utils";
import type { TrustLevel } from "@/lib/types";
import {
  ShieldCheck,
  ShieldAlert,
  ShieldQuestion,
  ShieldX,
  AlertTriangle,
} from "lucide-react";

interface StatusBadgeProps {
  status: TrustLevel | "pending" | "running" | "error";
  size?: "sm" | "md";
  className?: string;
}

const statusConfig: Record<
  StatusBadgeProps["status"],
  { label: string; classes: string; icon: React.ComponentType<{ className?: string }> }
> = {
  verified: {
    label: "Verified Authentic",
    classes: "bg-success-bg text-success border-[#B8DFC6]",
    icon: ShieldCheck,
  },
  "likely-authentic": {
    label: "Likely Authentic",
    classes: "bg-success-bg text-success border-[#B8DFC6]",
    icon: ShieldCheck,
  },
  uncertain: {
    label: "Uncertain",
    classes: "bg-warning-bg text-warning border-[#E8D5A0]",
    icon: ShieldQuestion,
  },
  suspicious: {
    label: "Suspicious",
    classes: "bg-warning-bg text-[#92610F] border-[#E8D5A0]",
    icon: ShieldAlert,
  },
  manipulated: {
    label: "Likely Manipulated",
    classes: "bg-danger-bg text-danger border-[#F0C5C1]",
    icon: ShieldX,
  },
  pending: {
    label: "Pending",
    classes: "bg-[#F0F2F0] text-muted border-border",
    icon: ShieldQuestion,
  },
  running: {
    label: "Analyzing…",
    classes: "bg-soft-green text-secondary border-[#B8DFC6]",
    icon: ShieldQuestion,
  },
  error: {
    label: "Error",
    classes: "bg-danger-bg text-danger border-[#F0C5C1]",
    icon: AlertTriangle,
  },
};

export function StatusBadge({ status, size = "md", className }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border font-medium",
        size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-2.5 py-1",
        config.classes,
        className
      )}
    >
      <Icon className={size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} />
      {config.label}
    </span>
  );
}
