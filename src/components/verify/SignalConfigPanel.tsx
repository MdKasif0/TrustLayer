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
  Check,
  Info,
} from "lucide-react";

interface SignalConfigPanelProps {
  activeSignals: AnalysisSignalType[];
  onToggleSignal: (signalId: AnalysisSignalType) => void;
  onStartVerification: () => void;
  disabled?: boolean;
}

interface SignalDefinition {
  id: AnalysisSignalType;
  label: string;
  badge: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SIGNAL_DEFINITIONS: SignalDefinition[] = [
  {
    id: "ai-detection",
    label: "AI Detection",
    badge: "Diffusion & GAN",
    description: "Detects generative diffusion artifacts, frequency discrepancies, and synthetic warping.",
    icon: BrainCircuit,
  },
  {
    id: "provenance",
    label: "Provenance / C2PA",
    badge: "Content Credentials",
    description: "Inspects C2PA JUMBF manifests, cryptographic device certificates, and edit lineage.",
    icon: Fingerprint,
  },
  {
    id: "metadata",
    label: "Metadata",
    badge: "EXIF & Headers",
    description: "Extracts EXIF/XMP dictionaries, camera quantization profiles, and timestamp consistency.",
    icon: FileSearch,
  },
  {
    id: "forensic",
    label: "Forensic Analysis",
    badge: "ELA & Sensor Noise",
    description: "Executes Error Level Analysis (ELA), copy-move forgery detection, and noise continuity.",
    icon: Layers,
  },
];

export function SignalConfigPanel({
  activeSignals,
  onToggleSignal,
  onStartVerification,
  disabled = false,
}: SignalConfigPanelProps) {
  const selectedCount = activeSignals.length;

  return (
    <div className="border border-border rounded-xl bg-surface p-5 sm:p-6 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-border">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            Analysis Signals
          </h2>
          <p className="text-xs text-muted mt-0.5">
            Configure multi-signal inspection layers for this assessment
          </p>
        </div>
        <span
          className={cn(
            "text-xs font-mono font-medium px-2 py-0.5 rounded border",
            selectedCount > 0
              ? "bg-soft-green text-primary border-[#C1E3CA]"
              : "bg-warning-bg text-warning border-[#E8D5A0]"
          )}
        >
          {selectedCount} / {SIGNAL_DEFINITIONS.length} active
        </span>
      </div>

      {/* Signal Toggles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {SIGNAL_DEFINITIONS.map((signal) => {
          const isSelected = activeSignals.includes(signal.id);
          const Icon = signal.icon;

          return (
            <button
              key={signal.id}
              type="button"
              role="checkbox"
              aria-checked={isSelected}
              onClick={() => onToggleSignal(signal.id)}
              disabled={disabled}
              className={cn(
                "w-full text-left p-3.5 rounded-lg border transition-all duration-150 flex items-start gap-3 cursor-pointer select-none",
                isSelected
                  ? "bg-[#F7FAF8] border-primary ring-1 ring-primary/20"
                  : "bg-surface border-border hover:border-border-strong hover:bg-[#FAFBF9]",
                disabled && "opacity-60 cursor-not-allowed pointer-events-none"
              )}
            >
              {/* Checkbox box */}
              <div
                className={cn(
                  "w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 transition-colors border",
                  isSelected
                    ? "bg-primary border-primary text-white"
                    : "bg-surface border-border-strong text-transparent"
                )}
                aria-hidden="true"
              >
                <Check className="w-3.5 h-3.5" strokeWidth={3} />
              </div>

              {/* Icon & Details */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1.5 mb-1">
                  <span className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-primary shrink-0" />
                    {signal.label}
                  </span>
                  <span className="text-[10px] font-mono font-medium text-muted bg-[#F0F2F0] px-1.5 py-0.5 rounded shrink-0">
                    {signal.badge}
                  </span>
                </div>
                <p className="text-xs text-muted leading-relaxed line-clamp-2">
                  {signal.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-xs text-muted">
          <Info className="w-3.5 h-3.5 text-muted shrink-0" />
          <span>Multi-signal consensus provides higher verification confidence.</span>
        </div>

        <Button
          type="button"
          variant="primary"
          size="lg"
          onClick={onStartVerification}
          disabled={disabled || selectedCount === 0}
          icon={<ScanSearch className="w-4 h-4" />}
          className="w-full sm:w-auto px-6 font-semibold shadow-xs"
        >
          Start Verification
        </Button>
      </div>
    </div>
  );
}
