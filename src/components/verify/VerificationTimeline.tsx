"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { TimelineStageStatus, QualitativeState } from "@/lib/types";
import { PROCESSING_STAGES, StageRuntimeState } from "@/lib/services/analysisService";
import {
  Check,
  Loader2,
  AlertTriangle,
  XCircle,
  Clock,
  Shield,
  Layers,
  Info,
} from "lucide-react";

interface VerificationTimelineProps {
  currentStageIndex: number;
  stageStates: Record<string, StageRuntimeState>;
  evidenceSignalsCollected: number;
  totalSignals: number;
}

const qualitativeStateConfig: Record<
  QualitativeState,
  { label: string; bg: string; text: string; border: string }
> = {
  detected: {
    label: "Detected",
    bg: "bg-warning-bg",
    text: "text-[#92610F]",
    border: "border-[#E8D5A0]",
  },
  available: {
    label: "Available",
    bg: "bg-success-bg",
    text: "text-success",
    border: "border-[#B8DFC6]",
  },
  "not-available": {
    label: "Not available",
    bg: "bg-[#F0F2F0]",
    text: "text-muted",
    border: "border-border",
  },
  inconclusive: {
    label: "Inconclusive",
    bg: "bg-warning-bg",
    text: "text-warning",
    border: "border-[#E8D5A0]",
  },
  suspicious: {
    label: "Suspicious",
    bg: "bg-danger-bg",
    text: "text-danger",
    border: "border-[#F0C5C1]",
  },
  pending: {
    label: "Pending",
    bg: "bg-[#FAFBF9]",
    text: "text-muted/80",
    border: "border-border/60",
  },
  evaluating: {
    label: "In progress",
    bg: "bg-soft-green",
    text: "text-primary",
    border: "border-[#C1E3CA]",
  },
};

export function VerificationTimeline({
  currentStageIndex,
  stageStates,
  evidenceSignalsCollected,
  totalSignals,
}: VerificationTimelineProps) {
  return (
    <div className="border border-border rounded-xl bg-surface p-5 sm:p-6 shadow-xs space-y-6">
      {/* Header with Title, Subtitle, and Live Evidence Counter */}
      <div className="pb-4 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Analyzing your media
            </h2>
            <p className="text-xs sm:text-sm text-muted mt-1 leading-relaxed">
              TrustLayer is examining multiple independent evidence signals.
            </p>
          </div>

          {/* Small Live Evidence Counter */}
          <div className="shrink-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-soft-green border border-[#C1E3CA] text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-semibold text-primary">
                Evidence signals collected:
              </span>
              <span className="font-bold text-foreground">
                {evidenceSignalsCollected} / {totalSignals || 4}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 01-06 Professional Timeline */}
      <div className="space-y-3">
        {PROCESSING_STAGES.map((stage, idx) => {
          const state: StageRuntimeState = stageStates[stage.id] || {
            status: idx === currentStageIndex ? "in-progress" : idx < currentStageIndex ? "complete" : "pending",
            qualitativeState: idx === currentStageIndex ? "evaluating" : idx < currentStageIndex ? "available" : "pending",
            detail: stage.defaultDetail,
          };

          const isCurrent = state.status === "in-progress";
          const isComplete = state.status === "complete";
          const isWarning = state.status === "warning";
          const isFailed = state.status === "failed";
          const isPending = state.status === "pending";

          const qualitativeBadge =
            state.qualitativeState && qualitativeStateConfig[state.qualitativeState]
              ? qualitativeStateConfig[state.qualitativeState]
              : isComplete
              ? qualitativeStateConfig.available
              : isWarning
              ? qualitativeStateConfig["not-available"]
              : isCurrent
              ? qualitativeStateConfig.evaluating
              : qualitativeStateConfig.pending;

          return (
            <div
              key={stage.id}
              className={cn(
                "p-3.5 sm:p-4 rounded-lg border transition-all duration-200 flex items-start gap-3.5",
                isCurrent
                  ? "bg-[#F7FAF8] border-primary ring-1 ring-primary/20 shadow-xs"
                  : isComplete
                  ? "bg-surface border-border"
                  : isWarning
                  ? "bg-[#FFFDF9] border-[#E8D5A0]"
                  : isFailed
                  ? "bg-danger-bg border-[#F0C5C1]"
                  : "bg-surface border-border/70 opacity-75"
              )}
            >
              {/* Stage Number & State Indicator Icon */}
              <div className="flex items-center gap-2 shrink-0 mt-0.5">
                <span className="font-mono text-xs font-bold text-muted/70 w-5">
                  {stage.number}
                </span>

                <div
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center transition-colors shrink-0",
                    isComplete
                      ? "bg-success text-white"
                      : isCurrent
                      ? "border-2 border-primary bg-soft-green text-primary"
                      : isWarning
                      ? "bg-warning text-white"
                      : isFailed
                      ? "bg-danger text-white"
                      : "border border-border text-muted bg-[#F0F2F0]"
                  )}
                >
                  {isComplete ? (
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  ) : isCurrent ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : isWarning ? (
                    <AlertTriangle className="w-3 h-3 text-white" />
                  ) : isFailed ? (
                    <XCircle className="w-3 h-3 text-white" />
                  ) : (
                    <Clock className="w-3 h-3 text-muted/60" />
                  )}
                </div>
              </div>

              {/* Stage Content */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <span
                    className={cn(
                      "text-xs font-bold font-mono tracking-wider",
                      isCurrent
                        ? "text-primary"
                        : isComplete
                        ? "text-foreground"
                        : isWarning
                        ? "text-[#92610F]"
                        : isFailed
                        ? "text-danger"
                        : "text-muted"
                    )}
                  >
                    {stage.name}
                  </span>

                  {/* Qualitative State Badge (NO fake percentages) */}
                  <span
                    className={cn(
                      "text-[10px] font-mono font-medium px-2 py-0.5 rounded border self-start sm:self-auto",
                      qualitativeBadge.bg,
                      qualitativeBadge.text,
                      qualitativeBadge.border
                    )}
                  >
                    {qualitativeBadge.label}
                  </span>
                </div>

                <p className="text-xs text-muted leading-relaxed">
                  {state.detail || stage.defaultDetail}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mandatory Probabilistic Cybersecurity Notice */}
      <div className="border border-[#E8D5A0] rounded-lg bg-warning-bg p-3.5 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-[#92610F] shrink-0 mt-0.5" />
        <div className="text-xs text-[#92610F] leading-relaxed">
          <p className="font-semibold mb-0.5">Probabilistic Verification Notice</p>
          <p>
            Detection results may be affected by compression, editing, and unseen generation methods.
          </p>
        </div>
      </div>
    </div>
  );
}
