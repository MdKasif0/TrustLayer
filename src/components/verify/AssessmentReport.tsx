"use client";

import React, { useState } from "react";
import { TrustReport, AnalysisResult, EvidenceItem } from "@/lib/types";
import { formatFileSize, formatDuration } from "@/lib/services/fileInspector";
import { TrustIndicator } from "@/components/ui/TrustIndicator";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import {
  RotateCcw,
  Download,
  Share2,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Clock,
  Hash,
  BrainCircuit,
  Fingerprint,
  FileSearch,
  Layers,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AssessmentReportProps {
  report: TrustReport;
  onReset: () => void;
}

const SIGNAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "ai-detection": BrainCircuit,
  provenance: Fingerprint,
  metadata: FileSearch,
  forensic: Layers,
};

export function AssessmentReport({ report, onReset }: AssessmentReportProps) {
  const [expandedSignals, setExpandedSignals] = useState<Record<string, boolean>>({
    "ai-detection": true,
    provenance: false,
    metadata: false,
    forensic: false,
  });

  const toggleSignal = (signalId: string) => {
    setExpandedSignals((prev) => ({
      ...prev,
      [signalId]: !prev[signalId],
    }));
  };

  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `TrustLayer-${report.mediaFile.name.replace(/[^a-z0-9]/gi, "_")}-Report.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-soft-green text-primary border border-[#C1E3CA]">
              REPORT COMPLETED
            </span>
            <span className="text-xs text-muted font-mono">
              ID: {report.id}
            </span>
          </div>
          <h2 className="text-xl font-bold text-foreground">
            Multi-Signal Verification Assessment
          </h2>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            icon={<Download className="w-3.5 h-3.5" />}
          >
            Export JSON
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onReset}
            icon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Verify Another File
          </Button>
        </div>
      </div>

      {/* Main Verdict & File Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overall Trust Assessment Card */}
        <div className="lg:col-span-2 border border-border rounded-xl bg-surface p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                Executive Verdict
              </span>
              <StatusBadge status={report.overallTrustLevel} size="md" />
            </div>

            <h3 className="text-2xl font-bold text-foreground mb-2">
              {report.verdictTitle}
            </h3>
            <p className="text-sm text-muted leading-relaxed mb-6">
              {report.verdictSummary}
            </p>

            {/* Key Findings List */}
            <div className="border-t border-border/70 pt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-2.5">
                Key Evidentiary Observations
              </p>
              <ul className="space-y-2">
                {report.keyFindings.map((finding, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-xs text-foreground/90">
                    <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0 mt-0.5" />
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-4 mt-6 border-t border-border flex items-center justify-between text-xs text-muted font-mono">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-muted" />
              Analyzed in {(report.executionDurationMs / 1000).toFixed(2)}s
            </span>
            <span>{report.activeSignals.length} evidence signals aggregated</span>
          </div>
        </div>

        {/* Circular Trust Score Card */}
        <div className="border border-border rounded-xl bg-surface p-6 shadow-xs flex flex-col items-center justify-center text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">
            Confidence Index
          </p>

          <TrustIndicator
            level={report.overallTrustLevel}
            confidence={report.overallConfidence}
            size="lg"
          />

          <p className="text-[11px] text-muted mt-3 max-w-[210px] leading-relaxed">
            Consensus confidence derived across all active analytical dimensions.
          </p>
        </div>
      </div>

      {/* Target File Breakdown */}
      <div className="border border-border rounded-xl bg-surface p-5 shadow-xs">
        <div className="flex items-center gap-2 pb-3 border-b border-border mb-3">
          <FileText className="w-4 h-4 text-primary" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
            Target Media Specifications
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div>
            <span className="text-muted block text-[11px] font-sans">Filename</span>
            <span className="font-semibold text-foreground truncate block" title={report.mediaFile.name}>
              {report.mediaFile.name}
            </span>
          </div>
          <div>
            <span className="text-muted block text-[11px] font-sans">Container</span>
            <span className="font-semibold text-foreground">
              {report.mediaFile.extension} ({report.mediaFile.type})
            </span>
          </div>
          <div>
            <span className="text-muted block text-[11px] font-sans">Size & Dimensions</span>
            <span className="font-semibold text-foreground">
              {formatFileSize(report.mediaFile.size)}
              {report.mediaFile.width && report.mediaFile.height
                ? ` · ${report.mediaFile.width}×${report.mediaFile.height}`
                : ""}
            </span>
          </div>
          <div>
            <span className="text-muted block text-[11px] font-sans">SHA-256 Digest</span>
            <span className="text-foreground/80 truncate block text-[11px]" title={report.mediaFile.hashSha256}>
              {report.mediaFile.hashSha256 ? `${report.mediaFile.hashSha256.slice(0, 16)}…` : "Verified"}
            </span>
          </div>
        </div>
      </div>

      {/* Multi-Signal Evidence Breakdown */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            Signal Findings Breakdown
          </h3>
          <span className="text-xs text-muted">
            Click a signal to toggle technical parameters
          </span>
        </div>

        <div className="space-y-3">
          {report.signalResults.map((result: AnalysisResult) => {
            const Icon = SIGNAL_ICONS[result.signalId] || FileText;
            const isExpanded = Boolean(expandedSignals[result.signalId]);

            return (
              <div
                key={result.signalId}
                className="border border-border rounded-xl bg-surface overflow-hidden shadow-xs transition-colors"
              >
                {/* Signal Row Header */}
                <button
                  type="button"
                  onClick={() => toggleSignal(result.signalId)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-[#FAFBF9] cursor-pointer"
                >
                  <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-soft-green flex items-center justify-center text-primary shrink-0 border border-[#D5ECDB]">
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground">
                          {result.signalLabel}
                        </span>
                        <span
                          className={cn(
                            "text-[10px] font-mono font-medium px-2 py-0.5 rounded",
                            result.status === "analyzed"
                              ? "bg-soft-green text-primary"
                              : result.status === "inconclusive"
                              ? "bg-[#F0F2F0] text-muted"
                              : "bg-warning-bg text-warning"
                          )}
                        >
                          {result.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs text-muted mt-0.5 leading-relaxed truncate sm:whitespace-normal">
                        {result.summary}
                      </p>
                    </div>
                  </div>

                  {/* Strength & Score Indicator */}
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="hidden sm:flex flex-col items-end text-right">
                      <span className="text-xs font-mono font-medium text-foreground">
                        {result.confidence}% Confidence
                      </span>
                      <span className="text-[11px] text-muted capitalize">
                        {result.strength} Evidence
                      </span>
                    </div>

                    <div className="w-7 h-7 rounded-md bg-[#F0F2F0] flex items-center justify-center text-muted">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </button>

                {/* Expanded Technical Findings */}
                {isExpanded && (
                  <div className="border-t border-border bg-[#FAFAF8] p-4 sm:p-5 space-y-4 animate-in fade-in duration-150">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {result.items.map((item: EvidenceItem) => (
                        <div
                          key={item.id}
                          className="border border-border/80 rounded-lg bg-surface p-4 text-xs space-y-2"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="font-semibold text-foreground text-xs">
                              {item.title}
                            </h4>
                            <span className="font-mono text-[11px] text-primary font-medium px-1.5 py-0.5 rounded bg-soft-green">
                              {item.confidence}%
                            </span>
                          </div>

                          <p className="text-muted leading-relaxed">
                            {item.summary}
                          </p>

                          {item.details && (
                            <p className="text-[11px] text-muted/90 bg-[#F7F9F7] p-2 rounded border border-border/50">
                              {item.details}
                            </p>
                          )}

                          {item.technicalData && (
                            <div className="pt-2 border-t border-border/50 font-mono text-[10px] space-y-1">
                              {Object.entries(item.technicalData).map(([key, val]) => (
                                <div key={key} className="flex justify-between text-muted">
                                  <span>{key}:</span>
                                  <span className="text-foreground font-semibold">{String(val)}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Trust & Safety Disclaimer */}
      <div className="border border-[#E8D5A0] rounded-xl bg-warning-bg p-4 sm:p-5 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-[#92610F] shrink-0 mt-0.5" />
        <div className="text-xs text-[#92610F] leading-relaxed">
          <p className="font-semibold mb-1">Standard Cybersecurity & Forensics Notice</p>
          <p>{report.disclaimer}</p>
        </div>
      </div>
    </div>
  );
}
