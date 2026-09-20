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

      {/* Real-Time Cybersecurity Telemetry Console Drawer */}
      <div className="border border-border rounded-xl bg-[#141A16] text-[#E0E6E1] overflow-hidden shadow-xs font-mono text-xs">
        <button
          type="button"
          onClick={() => setIsConsoleOpen((prev) => !prev)}
          className="w-full px-4 py-3 flex items-center justify-between border-b border-white/10 hover:bg-white/5 cursor-pointer transition-colors text-left"
        >
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[#86EFAC]" />
            <span className="text-[#86EFAC] text-[11px] font-semibold tracking-wider">
              REAL-TIME FORENSIC TELEMETRY STREAM
            </span>
            <span className="text-white/40 text-[10px]">· Event Log</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-white/50">
            <span>{isConsoleOpen ? "Collapse" : "Expand"}</span>
            {isConsoleOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </div>
        </button>

        {isConsoleOpen && (
          <div className="p-4 space-y-1.5 max-h-44 overflow-y-auto pr-2 bg-[#111613]">
            {telemetryLog.slice(-8).map((log, idx) => (
              <div key={idx} className="flex items-start gap-2 text-[11px] leading-relaxed">
                <span className="text-white/30 select-none">&gt;</span>
                <span className={idx === telemetryLog.slice(-8).length - 1 ? "text-white font-medium" : "text-white/70"}>
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
