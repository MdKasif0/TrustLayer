import React from "react";
import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";

type StepStatus = "pending" | "active" | "complete" | "error";

interface ProgressStepProps {
  steps: {
    label: string;
    description?: string;
    status: StepStatus;
  }[];
  className?: string;
}

export function ProgressStep({ steps, className }: ProgressStepProps) {
  return (
    <div className={cn("space-y-0", className)}>
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;

        return (
          <div key={i} className="flex gap-3">
            {/* Indicator column */}
            <div className="flex flex-col items-center">
              <StepDot status={step.status} />
              {!isLast && (
                <div
                  className={cn(
                    "w-px flex-1 min-h-[24px]",
                    step.status === "complete" ? "bg-success" : "bg-border"
                  )}
                />
              )}
            </div>

            {/* Label */}
            <div className={cn("pb-4", isLast && "pb-0")}>
              <p
                className={cn(
                  "text-sm font-medium leading-5",
                  step.status === "active" && "text-primary",
                  step.status === "complete" && "text-foreground",
                  step.status === "pending" && "text-muted",
                  step.status === "error" && "text-danger"
                )}
              >
                {step.label}
              </p>
              {step.description && (
                <p className="text-xs text-muted mt-0.5">{step.description}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function StepDot({ status }: { status: StepStatus }) {
  if (status === "complete") {
    return (
      <div className="w-5 h-5 rounded-full bg-success flex items-center justify-center shrink-0">
        <Check className="w-3 h-3 text-white" strokeWidth={3} />
      </div>
    );
  }

  if (status === "active") {
    return (
      <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center shrink-0">
        <Loader2 className="w-3 h-3 text-primary animate-spin" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="w-5 h-5 rounded-full bg-danger flex items-center justify-center shrink-0">
        <span className="text-white text-xs font-bold">!</span>
      </div>
    );
  }

  return (
    <div className="w-5 h-5 rounded-full border-2 border-border shrink-0" />
  );
}
