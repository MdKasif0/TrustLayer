"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { AnalysisSignalType } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import {
  ScanSearch,
  BrainCircuit,
  Fingerprint,
  FileSearch,
  Layers,
  ShieldCheck,
  Check,
} from "lucide-react";

interface SignalConfigPanelProps {
  activeSignals: AnalysisSignalType[];
  onToggleSignal: (signalId: AnalysisSignalType) => void;
  onStartVerification: () => void;
  disabled?: boolean;
  mediaKind?: "image" | "video";
}

interface SignalItem {
  id: AnalysisSignalType;
  title: string;
  explanation: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SIGNALS: SignalItem[] = [
  {
    id: "ai-detection",
    title: "AI Detection",
    explanation: "Synthetic media indicators",
    icon: BrainCircuit,
  },
  {
    id: "provenance",
    title: "Provenance",
    explanation: "C2PA / Content Credentials",
    icon: Fingerprint,
  },
  {
    id: "metadata",
    title: "Metadata",
    explanation: "EXIF / file information",
    icon: FileSearch,
  },
  {
    id: "forensic",
    title: "Forensics",
    explanation: "Visual / temporal analysis",
    icon: Layers,
  },
];

export function SignalConfigPanel({
  activeSignals,
  onToggleSignal,
  onStartVerification,
  disabled = false,
  mediaKind = "image",
}: SignalConfigPanelProps) {
  const selectedCount = activeSignals.length;

  return (
    <div className="border border-border rounded-xl bg-surface p-6 sm:p-7 shadow-subtle flex flex-col justify-between space-y-6">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border mb-5">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-foreground">
              Verification Signals
            </h2>
            <p className="text-xs text-muted mt-0.5">
              Select multi-signal inspection layers for this assessment
            </p>
          </div>

          <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-very-soft-green text-primary border border-border">
            {selectedCount} / 4 active
          </span>
        </div>

        {/* Four Rows: AI Detection, Provenance, Metadata, Forensics */}
        <div className="space-y-3">
          {SIGNALS.map((signal) => {
            const isSelected = activeSignals.includes(signal.id);
            const Icon = signal.icon;

            return (
              <div
                key={signal.id}
                onClick={() => {
                  if (!disabled) onToggleSignal(signal.id);
                }}
                className={cn(
                  "p-4 rounded-xl border transition-all duration-150 flex items-center justify-between gap-4 cursor-pointer select-none",
                  isSelected
                    ? "bg-[#FAFDFB] border-primary/40 ring-1 ring-primary/10"
                    : "bg-surface border-border hover:border-border-strong hover:bg-[#FAFBF9]",
                  disabled && "opacity-60 cursor-not-allowed pointer-events-none"
                )}
                role="checkbox"
                aria-checked={isSelected}
                tabIndex={disabled ? -1 : 0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (!disabled) onToggleSignal(signal.id);
                  }
                }}
              >
                {/* Left: Icon, Title, Short Explanation */}
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={cn(
                      "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors border",
                      isSelected
                        ? "bg-soft-green text-primary border-[#C1E3CA]"
                        : "bg-[#F0F2F0] text-muted border-border"
                    )}
                  >
                    <Icon className="w-4.5 h-4.5" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-foreground">
                      {signal.title}
                    </h3>
                    <p className="text-xs text-muted leading-tight mt-0.5">
                      {signal.explanation}
                    </p>
                  </div>
                </div>

                {/* Right: Accessible Toggle Switch */}
                <div className="shrink-0 pl-2">
                  <div
                    className={cn(
                      "w-10 h-6 rounded-full transition-colors relative flex items-center px-0.5",
                      isSelected ? "bg-primary" : "bg-[#DDE3DE]"
                    )}
                    aria-hidden="true"
                  >
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full bg-white shadow-xs transition-transform transform flex items-center justify-center text-primary",
                        isSelected ? "translate-x-4" : "translate-x-0"
                      )}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Analysis Scope Callout */}
        <div className="mt-6 p-4 rounded-xl bg-very-soft-green border border-border">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary">
              Analysis scope
            </span>
          </div>

          {mediaKind === "video" ? (
            <div>
              <p className="text-xs font-semibold text-foreground font-mono">
                Video: Frame + temporal analysis
              </p>
              <p className="text-xs text-muted mt-1 leading-relaxed">
                Inter-frame optical flow vectors, macroblock GOP bitrate jitter,
                facial boundary stability, and audio-video temporal sync.
              </p>
            </div>
          ) : (
            <div>
              <p className="text-xs font-semibold text-foreground font-mono">
                Image: Visual + file analysis
              </p>
              <p className="text-xs text-muted mt-1 leading-relaxed">
                Full-frame discrete cosine transform (DCT) lattice inspection,
                JPEG quantization tables, and Error Level Analysis (ELA).
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action Footer: Primary CTA & Evidence Statement */}
      <div className="pt-4 border-t border-border space-y-3">
        <Button
          type="button"
          variant="primary"
          size="lg"
          onClick={onStartVerification}
          disabled={disabled || selectedCount === 0}
          icon={<ScanSearch className="w-4 h-4" />}
          className="w-full py-3 text-sm font-semibold shadow-subtle"
        >
          Start Verification
        </Button>

        <p className="text-center text-xs text-muted leading-relaxed font-sans">
          Your results will show the evidence supporting each assessment.
        </p>
      </div>
    </div>
  );
}
