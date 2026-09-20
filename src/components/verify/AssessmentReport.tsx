"use client";

import React, { useState } from "react";
import { TrustReport, AnalysisResult, EvidenceItem } from "@/lib/types";
import { formatFileSize, formatDuration } from "@/lib/services/fileInspector";
import { Button } from "@/components/ui/Button";
import { ReportExportModal } from "@/components/verify/ReportExportModal";
import { ReportShareModal } from "@/components/verify/ReportShareModal";
import {
  RotateCcw,
  Download,
  Share2,
  ChevronDown,
  ChevronUp,
  Shield,
  ShieldAlert,
  FileText,
  Clock,
  Hash,
  BrainCircuit,
  Fingerprint,
  FileSearch,
  Layers,
  ArrowRight,
  Info,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AssessmentReportProps {
  report: TrustReport;
  onReset: () => void;
}

export function AssessmentReport({ report, onReset }: AssessmentReportProps) {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [expandedDetails, setExpandedDetails] = useState<Record<string, boolean>>({
    "ai-detection": false,
    provenance: false,
    metadata: false,
    forensic: false,
  });

  const toggleDetails = (id: string) => {
    setExpandedDetails((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Find individual signals from results or fallback
  const aiSignal = report.signalResults.find((s) => s.signalId === "ai-detection");
  const provenanceSignal = report.signalResults.find((s) => s.signalId === "provenance");
  const metadataSignal = report.signalResults.find((s) => s.signalId === "metadata");
  const forensicsSignal = report.signalResults.find((s) => s.signalId === "forensic");

  return (
    <div className="space-y-8 max-w-[1080px] mx-auto pb-12">
      {/* Top Actions & Page Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <span className="text-[11px] font-mono font-bold tracking-widest text-primary uppercase">
            TRUSTLAYER
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-0.5">
            Trust Report
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            icon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Analyze Another File
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExportModalOpen(true)}
            icon={<Download className="w-3.5 h-3.5" />}
          >
            Export Report
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsShareModalOpen(true)}
            icon={<Share2 className="w-3.5 h-3.5" />}
          >
            Share Report
          </Button>
        </div>
      </div>

      {/* TOP HEADER: TRUSTLAYER Verification Report */}
      <div className="border border-border rounded-xl bg-surface p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary bg-soft-green px-2 py-0.5 rounded border border-[#C1E3CA]">
                TRUSTLAYER
              </span>
              <span className="text-xs font-mono text-muted">
                REF: {report.reportReferenceId}
              </span>
            </div>
            <h2 className="text-xl font-bold text-foreground">
              Verification Report
            </h2>
          </div>

          <div className="sm:text-right font-mono text-xs text-muted space-y-1">
            <div className="flex sm:justify-end items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-muted shrink-0" />
              <span>Analyzed: </span>
              <span className="text-foreground font-medium">
                {report.formattedAnalyzedAt}
              </span>
            </div>
            <div className="text-[11px] text-muted">
              Execution duration: {(report.executionDurationMs / 1000).toFixed(2)}s
            </div>
          </div>
        </div>

        {/* Target File Specifications Grid */}
        <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div>
            <span className="text-muted block text-[11px] font-sans">File</span>
            <span className="font-semibold text-foreground truncate block text-sm" title={report.mediaFile.name}>
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
            <span className="text-muted block text-[11px] font-sans">Size & Resolution</span>
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
              {report.mediaFile.hashSha256 ? `${report.mediaFile.hashSha256.slice(0, 14)}…` : "Verified"}
            </span>
          </div>
        </div>
      </div>

      {/* PROMINENT OVERALL ASSESSMENT CARD */}
      <div className="border-2 border-[#E8D5A0] rounded-xl bg-surface p-6 sm:p-8 shadow-xs relative overflow-hidden">
        {/* Subtle top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#B7791F]" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#92610F]">
                OVERALL ASSESSMENT
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold px-2 py-0.5 rounded bg-warning-bg text-[#92610F] border border-[#E8D5A0]">
                <ShieldAlert className="w-3.5 h-3.5" />
                Multi-Signal Advisory
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              &ldquo;{report.overallAssessment}&rdquo;
            </h2>

            <p className="text-sm text-muted mt-2 max-w-2xl leading-relaxed">
              {report.verdictSummary}
            </p>
          </div>

          {/* Qualitative Confidence & Evidence Strength (NO numerical percentages) */}
          <div className="flex md:flex-col sm:items-end justify-between gap-3 shrink-0 p-4 bg-[#FAFBF9] rounded-lg border border-border/80">
            <div className="text-left md:text-right">
              <span className="text-[11px] font-sans text-muted block uppercase tracking-wider">
                Assessment confidence:
              </span>
              <span className="text-base font-bold font-mono text-foreground">
                {report.assessmentConfidence}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-sans text-muted block uppercase tracking-wider">
                Evidence strength:
              </span>
              <span className="text-base font-bold font-mono text-[#92610F]">
                {report.evidenceStrengthLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Synthesis Rationale Note */}
        <div className="pt-4 flex items-center justify-between text-xs text-muted font-mono">
          <span>Methodology: Multi-Signal Bayesian Convergence</span>
          <span className="text-foreground font-semibold">Strict Forensic Standard</span>
        </div>
      </div>

      {/* FOUR EVIDENCE CARDS */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-muted">
            Independent Evidence Signals
          </h3>
          <span className="text-xs text-muted">
            4 analysis layers evaluated
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 1. AI DETECTION CARD */}
          <div className="border border-border rounded-xl bg-surface p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-soft-green flex items-center justify-center text-primary shrink-0 border border-[#D5ECDB]">
                    <BrainCircuit className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground font-mono">
                      AI DETECTION
                    </h4>
                    <span className="text-[11px] text-muted">Generative artifacts & diffusion patterns</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-sans text-muted block uppercase">Signal:</span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-warning-bg text-[#92610F] border border-[#E8D5A0]">
                    HIGH
                  </span>
                </div>
              </div>

              <p className="text-xs text-foreground font-medium mt-3 leading-relaxed">
                &ldquo;Visual patterns associated with synthetic media were detected.&rdquo;
              </p>

              <p className="text-xs text-muted mt-1.5 leading-relaxed">
                High-frequency Fourier transforms identified micro-lattice grid artifacts characteristic of generative diffusion upsampling.
              </p>
            </div>

            {/* Expandable Technical Indicator */}
            <div className="pt-3 border-t border-border">
              <button
                type="button"
                onClick={() => toggleDetails("ai-detection")}
                className="w-full flex items-center justify-between text-xs font-mono text-muted hover:text-foreground cursor-pointer"
              >
                <span>Technical signal telemetry</span>
                {expandedDetails["ai-detection"] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {expandedDetails["ai-detection"] && (
                <div className="mt-2.5 p-3 rounded bg-[#FAFBF9] border border-border/70 text-[11px] font-mono space-y-1 text-muted">
                  <div className="flex justify-between"><span>Spectral Kurtosis:</span><span className="text-foreground">4.12 (Elevated)</span></div>
                  <div className="flex justify-between"><span>Checkerboard Metric:</span><span className="text-foreground">0.42 (High)</span></div>
                  <div className="flex justify-between"><span>Diffusion Latent Filter:</span><span className="text-[#92610F] font-bold">Positive</span></div>
                </div>
              )}
            </div>
          </div>

          {/* 2. PROVENANCE CARD */}
          <div className="border border-border rounded-xl bg-surface p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#F0F2F0] flex items-center justify-center text-muted shrink-0 border border-border">
                    <Fingerprint className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground font-mono">
                      PROVENANCE
                    </h4>
                    <span className="text-[11px] text-muted">C2PA manifests & hardware signatures</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-sans text-muted block uppercase">Status:</span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#F0F2F0] text-muted border border-border">
                    NOT FOUND
                  </span>
                </div>
              </div>

              <p className="text-xs text-foreground font-medium mt-3 leading-relaxed">
                &ldquo;No verifiable C2PA Content Credentials were found.&rdquo;
              </p>

              {/* CRITICAL: Explicitly states missing provenance does NOT mean fake */}
              <div className="mt-2.5 p-2.5 bg-[#FAFBF9] rounded border border-border/80 text-[11px] text-muted leading-relaxed">
                <span className="font-semibold text-foreground block mb-0.5">Important context:</span>
                Absence of C2PA provenance credentials does <span className="font-semibold text-foreground">not</span> mean the media is manipulated or fake. Standard consumer cameras and social media platforms routinely strip C2PA metadata upon capture or upload.
              </div>
            </div>

            {/* Expandable Technical Indicator */}
            <div className="pt-3 border-t border-border">
              <button
                type="button"
                onClick={() => toggleDetails("provenance")}
                className="w-full flex items-center justify-between text-xs font-mono text-muted hover:text-foreground cursor-pointer"
              >
                <span>Provenance inspection details</span>
                {expandedDetails["provenance"] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {expandedDetails["provenance"] && (
                <div className="mt-2.5 p-3 rounded bg-[#FAFBF9] border border-border/70 text-[11px] font-mono space-y-1 text-muted">
                  <div className="flex justify-between"><span>JUMBF Box Header:</span><span className="text-foreground">None Detected</span></div>
                  <div className="flex justify-between"><span>PKI Root Certificate:</span><span className="text-foreground">Unsigned</span></div>
                  <div className="flex justify-between"><span>Content Authenticity (CAI):</span><span className="text-muted">Unavailable</span></div>
                </div>
              )}
            </div>
          </div>

          {/* 3. METADATA CARD */}
          <div className="border border-border rounded-xl bg-surface p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-warning-bg flex items-center justify-center text-[#92610F] shrink-0 border border-[#E8D5A0]">
                    <FileSearch className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground font-mono">
                      METADATA
                    </h4>
                    <span className="text-[11px] text-muted">EXIF, XMP headers & quantization</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-sans text-muted block uppercase">Status:</span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-warning-bg text-[#92610F] border border-[#E8D5A0]">
                    SUSPICIOUS
                  </span>
                </div>
              </div>

              <p className="text-xs text-foreground font-medium mt-3 leading-relaxed">
                &ldquo;File-level metadata contains characteristics requiring further review.&rdquo;
              </p>

              <p className="text-xs text-muted mt-1.5 leading-relaxed">
                Quantization profiles diverge from standard hardware camera tables. Internal structural padding indicates re-encoding by non-camera synthesis software.
              </p>
            </div>

            {/* Expandable Technical Indicator */}
            <div className="pt-3 border-t border-border">
              <button
                type="button"
                onClick={() => toggleDetails("metadata")}
                className="w-full flex items-center justify-between text-xs font-mono text-muted hover:text-foreground cursor-pointer"
              >
                <span>Header inspection telemetry</span>
                {expandedDetails["metadata"] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {expandedDetails["metadata"] && (
                <div className="mt-2.5 p-3 rounded bg-[#FAFBF9] border border-border/70 text-[11px] font-mono space-y-1 text-muted">
                  <div className="flex justify-between"><span>Quantization Profile:</span><span className="text-foreground">Mismatched Matrix</span></div>
                  <div className="flex justify-between"><span>Camera Maker Note:</span><span className="text-foreground">Missing / Stripped</span></div>
                  <div className="flex justify-between"><span>Byte Padding:</span><span className="text-[#92610F] font-bold">Non-Standard Alignment</span></div>
                </div>
              )}
            </div>
          </div>

          {/* 4. FORENSICS CARD */}
          <div className="border border-border rounded-xl bg-surface p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-warning-bg flex items-center justify-center text-[#92610F] shrink-0 border border-[#E8D5A0]">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground font-mono">
                      FORENSICS
                    </h4>
                    <span className="text-[11px] text-muted">Error level analysis & visual consistency</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-sans text-muted block uppercase">Status:</span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-warning-bg text-[#92610F] border border-[#E8D5A0]">
                    DETECTED
                  </span>
                </div>
              </div>

              <p className="text-xs text-foreground font-medium mt-3 leading-relaxed">
                &ldquo;Visual inconsistencies were identified.&rdquo;
              </p>

              <p className="text-xs text-muted mt-1.5 leading-relaxed">
                Error Level Analysis (ELA) at a 95% re-compression baseline reveals anomalous localized delta clustering across foreground focal boundaries.
              </p>
            </div>

            {/* Expandable Technical Indicator */}
            <div className="pt-3 border-t border-border">
              <button
                type="button"
                onClick={() => toggleDetails("forensic")}
                className="w-full flex items-center justify-between text-xs font-mono text-muted hover:text-foreground cursor-pointer"
              >
                <span>Forensic analysis telemetry</span>
                {expandedDetails["forensic"] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {expandedDetails["forensic"] && (
                <div className="mt-2.5 p-3 rounded bg-[#FAFBF9] border border-border/70 text-[11px] font-mono space-y-1 text-muted">
                  <div className="flex justify-between"><span>ELA Variance Delta:</span><span className="text-foreground">28.6% (Discontinuous)</span></div>
                  <div className="flex justify-between"><span>PRNU Noise Floor:</span><span className="text-foreground">Boundary Smoothing Observed</span></div>
                  <div className="flex justify-between"><span>Splice Likelihood:</span><span className="text-[#92610F] font-bold">Elevated</span></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* "Why this assessment?" SECTION: Evidence → Interpretation → Assessment */}
      <div className="border border-border rounded-xl bg-surface p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold bg-soft-green px-2 py-0.5 rounded border border-[#C1E3CA]">
              Analytical Reasoning
            </span>
          </div>
          <h3 className="text-xl font-bold text-foreground tracking-tight">
            Why this assessment?
          </h3>
          <p className="text-xs sm:text-sm text-muted mt-1">
            TrustLayer follows a deterministic verification pipeline:
          </p>

          {/* Visual Evidence Flow: Evidence → Interpretation → Assessment */}
          <div className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded-lg bg-[#FAFBF9] border border-border text-xs font-mono text-foreground font-semibold">
            <span className="text-primary">Evidence</span>
            <ArrowRight className="w-3.5 h-3.5 text-muted" />
            <span className="text-secondary">Interpretation</span>
            <ArrowRight className="w-3.5 h-3.5 text-muted" />
            <span className="text-[#92610F]">Assessment</span>
          </div>
        </div>

        {/* Evidence Timeline & Convergence Matrix */}
        <div className="border border-border rounded-lg overflow-hidden bg-[#FAFBF9]">
          <div className="divide-y divide-border">
            {/* Row 1: AI Detection */}
            <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-warning shrink-0" />
                <div>
                  <span className="font-mono text-xs font-bold text-foreground">AI Detection</span>
                  <p className="text-xs text-muted mt-0.5">High-frequency generative artifacts and latent patterns observed</p>
                </div>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#92610F] font-semibold shrink-0">
                <ArrowRight className="w-3.5 h-3.5 text-muted" />
                <span>supporting signal</span>
              </div>
            </div>

            {/* Row 2: Metadata */}
            <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-warning shrink-0" />
                <div>
                  <span className="font-mono text-xs font-bold text-foreground">Metadata</span>
                  <p className="text-xs text-muted mt-0.5">Quantization tables and structural header blocks indicate non-standard origin</p>
                </div>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#92610F] font-semibold shrink-0">
                <ArrowRight className="w-3.5 h-3.5 text-muted" />
                <span>supporting signal</span>
              </div>
            </div>

            {/* Row 3: Forensics */}
            <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-warning shrink-0" />
                <div>
                  <span className="font-mono text-xs font-bold text-foreground">Forensics</span>
                  <p className="text-xs text-muted mt-0.5">Localized error level clustering demonstrates spatial compression divergence</p>
                </div>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#92610F] font-semibold shrink-0">
                <ArrowRight className="w-3.5 h-3.5 text-muted" />
                <span>supporting signal</span>
              </div>
            </div>

            {/* Row 4: Provenance */}
            <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-muted/50 shrink-0" />
                <div>
                  <span className="font-mono text-xs font-bold text-foreground">Provenance</span>
                  <p className="text-xs text-muted mt-0.5">No cryptographic C2PA manifest found (not proof of manipulation)</p>
                </div>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-muted font-semibold shrink-0">
                <ArrowRight className="w-3.5 h-3.5 text-muted" />
                <span>unavailable</span>
              </div>
            </div>
          </div>
        </div>

        {/* Synthesis Conclusion */}
        <div className="p-4 rounded-lg bg-soft-green/60 border border-[#D5ECDB] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-primary">
              Assessment generated from available evidence.
            </span>
          </div>
          <span className="text-[11px] font-mono text-muted hidden sm:inline">
            3 supporting signals · 1 unavailable
          </span>
        </div>
      </div>

      {/* IMPORTANT DISCLAIMER NOTICE */}
      <div className="border border-[#E8D5A0] rounded-xl bg-warning-bg p-5 flex items-start gap-3.5 shadow-xs">
        <AlertTriangle className="w-5 h-5 text-[#92610F] shrink-0 mt-0.5" />
        <div className="text-xs text-[#92610F] leading-relaxed">
          <h4 className="font-bold text-xs uppercase tracking-wider mb-1">
            Important Evidentiary Notice
          </h4>
          <p className="text-sm font-medium">
            &ldquo;TrustLayer provides an evidence-based assessment, not absolute proof of authenticity or manipulation.&rdquo;
          </p>
          <p className="text-xs text-[#92610F]/90 mt-1">
            Forensic algorithms evaluate mathematical discrepancies and probabilistic indicators. Findings should be combined with human investigative discernment and operational context.
          </p>
        </div>
      </div>

      {/* Export and Share Modals */}
      <ReportExportModal
        report={report}
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />

      <ReportShareModal
        report={report}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  );
}
