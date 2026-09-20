"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { MediaFile, AnalysisSignalType } from "@/lib/types";
import { PROCESSING_STAGES, StageInfo } from "@/lib/services/analysisService";
import {
  Check,
  Loader2,
  Terminal,
  Shield,
  FileImage,
  Film,
  Minus,
} from "lucide-react";
import { formatFileSize } from "@/lib/services/fileInspector";

interface ProcessingStagesProps {
  media: MediaFile;
  activeSignals: AnalysisSignalType[];
  currentStageIndex: number;
  completedStages: string[];
  telemetryLog: string[];
  overallProgress: number;
}

export function ProcessingStages({
  media,
  activeSignals,
  currentStageIndex,
  completedStages,
  telemetryLog,
  overallProgress,
}: ProcessingStagesProps) {
  const isVideo = media.mediaKind === "video";

  return (
    <div className="border border-border rounded-xl bg-surface overflow-hidden shadow-xs">
      {/* File Header */}
      <div className="p-5 sm:p-6 border-b border-border bg-[#FAFBF9] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-soft-green flex items-center justify-center text-primary shrink-0 border border-[#D5ECDB]">
            {isVideo ? <Film className="w-5 h-5" /> : <FileImage className="w-5 h-5" />}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-primary bg-soft-green px-2 py-0.5 rounded">
                ANALYSIS IN PROGRESS
              </span>
              <span className="text-xs text-muted font-mono">{overallProgress}%</span>
            </div>
            <h2 className="text-sm font-semibold text-foreground truncate mt-0.5">
              {media.name}
            </h2>
            <p className="text-xs text-muted font-mono">
              {media.extension} · {formatFileSize(media.size)}
              {media.width && media.height ? ` · ${media.width}×${media.height} px` : ""}
            </p>
          </div>
        </div>

        {/* Progress Bar Header */}
        <div className="w-full sm:w-48 flex flex-col gap-1.5">
          <div className="flex justify-between text-xs text-muted font-mono">
            <span>Overall progress</span>
            <span>{overallProgress}%</span>
          </div>
          <div className="h-2 w-full bg-[#EAEFEA] rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.min(overallProgress, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* 6 Labeled Stages List */}
      <div className="p-5 sm:p-6">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">
          Processing Stages
        </h3>

        <div className="space-y-3">
          {PROCESSING_STAGES.map((stage: StageInfo, index: number) => {
            const isSignalStage = Boolean(stage.signalId);
            const isEnabled =
              !isSignalStage ||
              (stage.signalId && activeSignals.includes(stage.signalId));

            const isCompleted = completedStages.includes(stage.id);
            const isActive = index === currentStageIndex && isEnabled && !isCompleted;
            const isPending = !isActive && !isCompleted && isEnabled;
            const isSkipped = !isEnabled;

            return (
              <div
                key={stage.id}
                className={cn(
                  "flex items-start gap-3.5 p-3.5 rounded-lg border transition-all duration-200",
                  isActive
                    ? "bg-[#F7FAF8] border-primary ring-1 ring-primary/20 shadow-xs"
                    : isCompleted
                    ? "bg-surface border-border"
                    : isSkipped
                    ? "bg-[#FAFAFA] border-border/60 opacity-60"
                    : "bg-surface border-border/80"
                )}
              >
                {/* Number Badge & Icon */}
                <div className="flex items-center gap-2 shrink-0 mt-0.5">
                  <span className="font-mono text-xs font-bold text-muted/70 w-5">
                    {stage.number}
                  </span>
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center transition-colors",
                      isCompleted
                        ? "bg-success text-white"
                        : isActive
                        ? "border-2 border-primary bg-soft-green text-primary"
                        : isSkipped
                        ? "bg-[#EAEFEA] text-muted"
                        : "border border-border text-muted bg-[#F5F7F5]"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    ) : isActive ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : isSkipped ? (
                      <Minus className="w-3.5 h-3.5" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-muted/40" />
                    )}
                  </div>
                </div>

                {/* Stage Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={cn(
                        "text-sm font-semibold",
                        isActive
                          ? "text-primary font-bold"
                          : isCompleted
                          ? "text-foreground"
                          : isSkipped
                          ? "text-muted"
                          : "text-muted-foreground"
                      )}
                    >
                      {stage.name}
                    </p>

                    <span
                      className={cn(
                        "text-[11px] font-mono font-medium px-2 py-0.5 rounded",
                        isCompleted
                          ? "bg-success-bg text-success"
                          : isActive
                          ? "bg-soft-green text-primary"
                          : isSkipped
                          ? "bg-[#EFEFEF] text-muted"
                          : "bg-[#F5F5F3] text-muted"
                      )}
                    >
                      {isCompleted
                        ? "COMPLETE"
                        : isActive
                        ? "EVALUATING"
                        : isSkipped
                        ? "SKIPPED"
                        : "PENDING"}
                    </span>
                  </div>

                  <p className="text-xs text-muted mt-1 leading-relaxed">
                    {isSkipped
                      ? "Stage skipped: Signal disabled in verification configuration."
                      : stage.defaultDetail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Real-Time Telemetry Terminal */}
      <div className="border-t border-border bg-[#141A16] text-[#E0E6E1] p-4 sm:p-5 font-mono text-xs">
        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10 text-muted-foreground text-[11px]">
          <Terminal className="w-3.5 h-3.5 text-[#86EFAC]" />
          <span className="text-[#86EFAC] font-semibold">LIVE VERIFICATION TELEMETRY</span>
          <span className="text-white/40">· SHA-256 Engine</span>
        </div>

        <div className="space-y-1.5 max-h-36 overflow-y-auto pr-2">
          {telemetryLog.slice(-5).map((log, idx) => (
            <div key={idx} className="flex items-start gap-2 text-[11px] leading-relaxed">
              <span className="text-white/40 select-none">&gt;</span>
              <span className={idx === telemetryLog.slice(-5).length - 1 ? "text-white font-medium" : "text-white/70"}>
                {log}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
