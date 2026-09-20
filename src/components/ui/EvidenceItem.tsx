import React from "react";
import { cn } from "@/lib/utils";
import type { EvidenceStrength } from "@/lib/types";
import { ChevronRight } from "lucide-react";

interface EvidenceItemProps {
  icon: React.ReactNode;
  label: string;
  category: string;
  strength: EvidenceStrength;
  confidence: number;
  summary: string;
  className?: string;
  onClick?: () => void;
}

const strengthConfig: Record<EvidenceStrength, { label: string; color: string; barColor: string }> = {
  strong: { label: "Strong", color: "text-success", barColor: "bg-success" },
  moderate: { label: "Moderate", color: "text-secondary", barColor: "bg-secondary" },
  weak: { label: "Weak", color: "text-warning", barColor: "bg-warning" },
  inconclusive: { label: "Inconclusive", color: "text-muted", barColor: "bg-[#C4CCC6]" },
};

export function EvidenceItem({
  icon,
  label,
  category,
  strength,
  confidence,
  summary,
  className,
  onClick,
}: EvidenceItemProps) {
  const config = strengthConfig[strength];
  const isClickable = !!onClick;

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-lg border border-border bg-surface",
        isClickable && "cursor-pointer hover:border-border-strong transition-colors duration-150",
        className
      )}
      onClick={onClick}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? (e) => { if (e.key === "Enter" || e.key === " ") onClick?.(); } : undefined}
    >
      {/* Icon */}
      <div className="shrink-0 w-9 h-9 rounded-md bg-soft-green flex items-center justify-center text-primary">
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-foreground">{label}</span>
          <span className="text-xs text-muted px-1.5 py-0.5 bg-[#F0F2F0] rounded">
            {category}
          </span>
        </div>
        <p className="text-sm text-muted leading-relaxed mb-2">{summary}</p>

        {/* Strength + Confidence bar */}
        <div className="flex items-center gap-3">
          <span className={cn("text-xs font-medium", config.color)}>
            {config.label}
          </span>
          <div className="flex-1 max-w-[120px] h-1.5 bg-[#F0F2F0] rounded-full overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all duration-300", config.barColor)}
              style={{ width: `${confidence}%` }}
            />
          </div>
          <span className="text-xs text-muted tabular-nums">{confidence}%</span>
        </div>
      </div>

      {/* Chevron */}
      {isClickable && (
        <ChevronRight className="shrink-0 w-4 h-4 text-muted mt-2.5" />
      )}
    </div>
  );
}
