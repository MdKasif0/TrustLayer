import React from "react";
import { cn } from "@/lib/utils";
import type { TrustLevel } from "@/lib/types";
import { ShieldCheck, ShieldAlert, ShieldQuestion, ShieldX } from "lucide-react";

interface TrustIndicatorProps {
  level: TrustLevel;
  confidence: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const trustConfig: Record<
  TrustLevel,
  {
    label: string;
    description: string;
    ringColor: string;
    textColor: string;
    bgColor: string;
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  verified: {
    label: "Verified Authentic",
    description: "Strong evidence supports authenticity",
    ringColor: "stroke-success",
    textColor: "text-success",
    bgColor: "bg-success-bg",
    icon: ShieldCheck,
  },
  "likely-authentic": {
    label: "Likely Authentic",
    description: "Most evidence supports authenticity",
    ringColor: "stroke-success",
    textColor: "text-success",
    bgColor: "bg-success-bg",
    icon: ShieldCheck,
  },
  uncertain: {
    label: "Uncertain",
    description: "Evidence is mixed or insufficient",
    ringColor: "stroke-warning",
    textColor: "text-warning",
    bgColor: "bg-warning-bg",
    icon: ShieldQuestion,
  },
  suspicious: {
    label: "Suspicious",
    description: "Multiple indicators suggest manipulation",
    ringColor: "stroke-[#92610F]",
    textColor: "text-[#92610F]",
    bgColor: "bg-warning-bg",
    icon: ShieldAlert,
  },
  manipulated: {
    label: "Likely Manipulated",
    description: "Strong evidence of manipulation detected",
    ringColor: "stroke-danger",
    textColor: "text-danger",
    bgColor: "bg-danger-bg",
    icon: ShieldX,
  },
};

const sizes = {
  sm: { ring: 64, stroke: 4, iconSize: "w-5 h-5" },
  md: { ring: 96, stroke: 5, iconSize: "w-7 h-7" },
  lg: { ring: 128, stroke: 6, iconSize: "w-9 h-9" },
};

export function TrustIndicator({
  level,
  confidence,
  size = "md",
  className,
}: TrustIndicatorProps) {
  const config = trustConfig[level];
  const Icon = config.icon;
  const s = sizes[size];
  const radius = (s.ring - s.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (confidence / 100) * circumference;

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      {/* Ring */}
      <div className="relative" style={{ width: s.ring, height: s.ring }}>
        <svg
          width={s.ring}
          height={s.ring}
          viewBox={`0 0 ${s.ring} ${s.ring}`}
          className="-rotate-90"
        >
          <circle
            cx={s.ring / 2}
            cy={s.ring / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={s.stroke}
            className="text-[#F0F2F0]"
          />
          <circle
            cx={s.ring / 2}
            cy={s.ring / 2}
            r={radius}
            fill="none"
            strokeWidth={s.stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={cn(config.ringColor, "transition-all duration-700 ease-out")}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className={cn(s.iconSize, config.textColor)} />
        </div>
      </div>

      {/* Label */}
      <div className="text-center">
        <p className={cn("text-sm font-semibold", config.textColor)}>
          {config.label}
        </p>
        <p className="text-xs text-muted mt-0.5">{config.description}</p>
        <p className={cn("text-lg font-bold tabular-nums mt-1", config.textColor)}>
          {confidence}%
        </p>
      </div>
    </div>
  );
}
