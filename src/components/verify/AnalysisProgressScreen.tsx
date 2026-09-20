"use client";

import React, { useState } from "react";
import { MediaFile, AnalysisSignalType } from "@/lib/types";
import { MediaInspectionVisual } from "@/components/verify/MediaInspectionVisual";
import { VerificationTimeline } from "@/components/verify/VerificationTimeline";
import { StageRuntimeState } from "@/lib/services/analysisService";
import { Terminal, ChevronDown, ChevronUp, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalysisProgressScreenProps {
  media: MediaFile;
  activeSignals: AnalysisSignalType[];
  currentStageIndex: number;
  stageStates: Record<string, StageRuntimeState>;
  evidenceSignalsCollected: number;
  totalSignals: number;
  telemetryLog: string[];
}

export function AnalysisProgressScreen({
  media,
  activeSignals,
  currentStageIndex,
  stageStates,
  evidenceSignalsCollected,
  totalSignals,
  telemetryLog,
}: AnalysisProgressScreenProps) {
  const [isConsoleOpen, setIsConsoleOpen] = useState(true);

  return (
    <div className="space-y-6">
      {/* Two-Column Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Media Inspection Visual (5 cols on lg) */}
        <div className="lg:col-span-5">
          <MediaInspectionVisual
            media={media}
            currentStageIndex={currentStageIndex}
          />
        </div>

        {/* Right Column: Verification Timeline (7 cols on lg) */}
        <div className="lg:col-span-7">
          <VerificationTimeline
            currentStageIndex={currentStageIndex}
            stageStates={stageStates}
            evidenceSignalsCollected={evidenceSignalsCollected}
            totalSignals={totalSignals}
          />
        </div>
      </div>

      {/* Real-Time Forensic Telemetry Console Drawer */}
      <div className="border border-border rounded-xl bg-surface text-foreground overflow-hidden shadow-xs font-mono text-xs">
        <button
          type="button"
          onClick={() => setIsConsoleOpen((prev) => !prev)}
          className="w-full px-4 py-3 flex items-center justify-between border-b border-border bg-[#FAFBF9] hover:bg-[#F0F2F0] cursor-pointer transition-colors text-left"
        >
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary text-[11px] font-bold tracking-wider uppercase">
              Real-Time Forensic Telemetry Stream
            </span>
            <span className="text-muted text-[10px] font-mono">· Event Audit Log</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-muted font-mono">
            <span>{isConsoleOpen ? "Collapse" : "Expand"}</span>
            {isConsoleOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </div>
        </button>

        {isConsoleOpen && (
          <div className="p-4 space-y-1.5 max-h-44 overflow-y-auto pr-2 bg-[#FAFAF8] divide-y divide-border/40">
            {telemetryLog.slice(-8).map((log, idx) => (
              <div key={idx} className="pt-1.5 first:pt-0 flex items-start gap-2 text-[11px] leading-relaxed">
                <span className="text-primary font-bold select-none">&gt;</span>
                <span className={idx === telemetryLog.slice(-8).length - 1 ? "text-foreground font-semibold" : "text-muted font-normal"}>
                  {log}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
