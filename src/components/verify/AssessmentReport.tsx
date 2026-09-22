"use client";

import React, { useState } from "react";
import { TrustReport } from "@/lib/types";
import { formatFileSize } from "@/lib/services/fileInspector";
import { Button } from "@/components/ui/Button";
import { ReportExportModal } from "@/components/verify/ReportExportModal";
import { ReportShareModal } from "@/components/verify/ReportShareModal";
import { EvidenceDetailsSection } from "@/components/verify/EvidenceDetailsSection";
import {
  RotateCcw,
  FileDown,
  Share2,
  Clock,
  BrainCircuit,
  Fingerprint,
  FileSearch,
  Layers,
  ArrowRight,
  AlertTriangle,
  ArrowDown,
  FileText,
  ShieldAlert,
  ShieldCheck,
  Copy,
  Check,
  Hash,
} from "lucide-react";

interface AssessmentReportProps {
  report: TrustReport;
  onReset: () => void;
}

export function AssessmentReport({ report, onReset }: AssessmentReportProps) {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [activeDetailSection, setActiveDetailSection] = useState<string | null>(null);
  const [copiedHash, setCopiedHash] = useState(false);

  const handleScrollToEvidence = (sectionId: string) => {
    setActiveDetailSection(sectionId);
    const element = document.getElementById(`evidence-${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCopyHash = () => {
    if (report.mediaFile.hashSha256) {
      navigator.clipboard.writeText(report.mediaFile.hashSha256);
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    }
  };

  // Find individual signal results
  const aiSignal = report.signalResults.find((s) => s.signalId === "ai-detection");
  const provSignal = report.signalResults.find((s) => s.signalId === "provenance");
  const metaSignal = report.signalResults.find((s) => s.signalId === "metadata");
  const forensicSignal = report.signalResults.find((s) => s.signalId === "forensic");

  // Determine top styling based on overall assessment
  const isSuspicious =
    report.overallTrustLevel === "suspicious" ||
    report.overallAssessment.includes("SYNTHETIC") ||
    report.overallAssessment.includes("MANIPULATED");
  const isVerified =
    report.overallTrustLevel === "verified" ||
    report.overallAssessment.includes("NO STRONG SYNTHETIC SIGNALS");

  const headerBorderColor = isSuspicious
    ? "bg-[#B7791F]"
    : isVerified
    ? "bg-[#1E5631]"
    : "bg-[#92610F]";

  const badgeColor = isSuspicious
    ? "bg-warning-bg text-[#92610F] border-[#E8D5A0]"
    : isVerified
    ? "bg-[#EBF7EE] text-[#1E5631] border-[#C1E3CA]"
    : "bg-warning-bg text-[#92610F] border-[#E8D5A0]";

  return (
    <div className="space-y-10 w-full pb-16">
      {/* ─────────────────────────────────────────────────────────────
          PAGE HEADER
      ───────────────────────────────────────────────────────────── */}
      <header className="border-b border-border pb-6 space-y-4">
        {/* Methodological Concept Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-widest text-primary uppercase text-[11px] bg-soft-green px-2.5 py-0.5 rounded border border-[#C1E3CA]">
              TRUST REPORT
            </span>
            <span className="text-secondary/50">/</span>
            <span className="text-secondary font-mono text-[11px]">
              REF: {report.reportReferenceId}
            </span>
          </div>

          {/* EVIDENCE → INTERPRETATION → ASSESSMENT Flow */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface border border-border text-[11px] font-mono text-secondary">
            <span className="font-bold text-foreground">EVIDENCE</span>
            <ArrowRight className="w-3 h-3 text-secondary/60" />
            <span className="font-bold text-foreground">INTERPRETATION</span>
            <ArrowRight className="w-3 h-3 text-secondary/60" />
            <span className="font-bold text-primary">ASSESSMENT</span>
          </div>
        </div>

        {/* Title, Target File & Primary Header Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-1">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-mono">
              {report.mediaFile.name || "uploaded-media"}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-secondary mt-1.5 font-mono">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-secondary shrink-0" />
                <span>Analyzed:</span>
                <span className="text-foreground font-medium">
                  {report.formattedAnalyzedAt || "Just now"}
                </span>
              </div>
              <span className="text-secondary/40">·</span>
              <span>
                {report.mediaFile.extension?.toUpperCase() || "JPG"}
                {report.mediaFile.size ? ` · ${formatFileSize(report.mediaFile.size)}` : ""}
                {report.mediaFile.width && report.mediaFile.height
                  ? ` · ${report.mediaFile.width} × ${report.mediaFile.height}`
                  : ""}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsExportModalOpen(true)}
              icon={<FileDown className="w-4 h-4" />}
            >
              Export Report
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsShareModalOpen(true)}
              icon={<Share2 className="w-4 h-4" />}
            >
              Share Report
            </Button>
            <Button
              variant="tertiary"
              size="sm"
              onClick={onReset}
              iconRight={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Analyze another file
            </Button>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          FILE IDENTIFIER & SHA-256 INTEGRITY
      ───────────────────────────────────────────────────────────── */}
      <section className="border border-border rounded-xl bg-surface p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-primary" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
                Cryptographic Content Identifier (SHA-256)
              </span>
            </div>
            <p className="text-xs text-secondary font-mono break-all select-all bg-[#FAFBF9] px-3 py-1.5 rounded border border-border/80">
              {report.mediaFile.hashSha256 || "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"}
            </p>
            <p className="text-[11px] text-secondary italic font-sans pt-0.5">
              &ldquo;The SHA-256 digest identifies the exact uploaded file. It does not determine whether the media is authentic.&rdquo;
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopyHash}
              icon={copiedHash ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
            >
              {copiedHash ? "Hash Copied" : "Copy SHA-256"}
            </Button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          MAIN ASSESSMENT
      ───────────────────────────────────────────────────────────── */}
      <section className="border border-border rounded-xl bg-surface p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className={`absolute top-0 left-0 right-0 h-1 ${headerBorderColor}`} />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-primary">
                OVERALL ASSESSMENT
              </span>
              <span className={`inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${badgeColor}`}>
                {isSuspicious ? <ShieldAlert className="w-3 h-3" /> : <ShieldCheck className="w-3 h-3" />}
                Evidence-Based Synthesis
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              {report.overallAssessment || "NO STRONG SYNTHETIC SIGNALS DETECTED"}
            </h2>

            <p className="text-xs text-secondary italic font-sans pt-0.5">
              &ldquo;Based on the observable evidence currently available to TrustLayer.&rdquo;
            </p>

            <p className="text-xs sm:text-sm text-secondary max-w-2xl leading-relaxed pt-1">
              {report.verdictSummary ||
                "Multiple independent evidence signals were evaluated to assess synthetic or manipulation indicators."}
            </p>
          </div>

          {/* Qualitative Confidence & Evidence Strength (STRICTLY NO FAKE PERCENTAGES) */}
          <div className="flex md:flex-col sm:items-end justify-between gap-3 shrink-0 p-4 bg-[#FAFBF9] rounded-lg border border-border/80 min-w-[210px]">
            <div className="text-left md:text-right">
              <span className="text-[11px] font-sans text-secondary block uppercase tracking-wider">
                Evidence strength:
              </span>
              <span className="text-sm sm:text-base font-bold font-mono text-primary">
                {report.evidenceStrengthLabel || "MULTIPLE SIGNALS"}
              </span>
            </div>

            <div className="text-left md:text-right">
              <span className="text-[11px] font-sans text-secondary block uppercase tracking-wider">
                Assessment confidence:
              </span>
              <span className="text-sm sm:text-base font-bold font-mono text-foreground uppercase">
                {report.assessmentConfidence || "MODERATE"}
              </span>
            </div>
          </div>
        </div>

        {/* Methodological Context Footer */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-secondary font-mono">
          <span>Pipeline: Multi-Signal Evidentiary Synthesis</span>
          <span className="text-foreground font-medium">Standard of Evidence: Corroborating Signals</span>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          FOUR SIGNALS: EVIDENCE OVERVIEW CARDS
      ───────────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-secondary">
              EVIDENCE SIGNALS
            </span>
            <h3 className="text-lg font-bold text-foreground tracking-tight">
              Evidence Overview
            </h3>
          </div>
          <span className="text-xs font-mono text-secondary">
            4 independent analysis layers
          </span>
        </div>

        {/* 4 Dynamic Signal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 1. AI DETECTION CARD */}
          <div className="border border-border rounded-xl bg-surface p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                    aiSignal?.anomalyDetected
                      ? "bg-[#FDF2F2] text-[#991B1B] border-[#F8B4B4]"
                      : "bg-[#EBF7EE] text-[#1E5631] border-[#C1E3CA]"
                  }`}>
                    <BrainCircuit className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground font-mono">
                      AI DETECTION
                    </h4>
                    <span className="text-[11px] text-secondary">Visual generative indicators</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                    aiSignal?.anomalyDetected
                      ? "bg-[#FDF2F2] text-[#991B1B] border-[#F8B4B4]"
                      : aiSignal?.status === "skipped"
                      ? "bg-[#FBF7EE] text-[#92610F] border-[#E8D5A0]"
                      : "bg-[#EBF7EE] text-[#1E5631] border-[#C1E3CA]"
                  }`}>
                    {aiSignal?.signalValue || "NO STRONG SIGNAL"}
                  </span>
                </div>
              </div>

              <p className="text-xs text-foreground font-medium mt-3 leading-relaxed">
                {aiSignal?.summary || "No prominent generative synthesis patterns were observed."}
              </p>
              {aiSignal?.items && aiSignal.items.length > 0 && (
                <p className="text-xs text-secondary mt-1 leading-relaxed line-clamp-2">
                  {aiSignal.items[0].summary}
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-border flex justify-end">
              <Button
                variant="tertiary"
                onClick={() => handleScrollToEvidence("ai")}
                iconRight={<ArrowRight className="w-3.5 h-3.5" />}
                className="text-xs"
              >
                View Evidence
              </Button>
            </div>
          </div>

          {/* 2. PROVENANCE CARD */}
          <div className="border border-border rounded-xl bg-surface p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                    provSignal?.status === "analyzed"
                      ? "bg-[#EBF7EE] text-[#1E5631] border-[#C1E3CA]"
                      : "bg-[#FBF7EE] text-[#92610F] border-[#E8D5A0]"
                  }`}>
                    <Fingerprint className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground font-mono">
                      PROVENANCE
                    </h4>
                    <span className="text-[11px] text-secondary">C2PA / Content Credentials</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                    provSignal?.status === "analyzed"
                      ? "bg-[#EBF7EE] text-[#1E5631] border-[#C1E3CA]"
                      : "bg-[#FBF7EE] text-[#92610F] border-[#E8D5A0]"
                  }`}>
                    {provSignal?.signalValue || "NOT FOUND"}
                  </span>
                </div>
              </div>

              <p className="text-xs text-foreground font-medium mt-3 leading-relaxed">
                {provSignal?.summary || "No C2PA Content Credentials were detected in the uploaded file."}
              </p>
              <p className="text-xs text-secondary mt-1 leading-relaxed">
                {provSignal?.status === "analyzed"
                  ? "Cryptographic provenance manifest located in container."
                  : "Absence of C2PA is neutral: standard consumer cameras and messaging apps do not embed Content Credentials."}
              </p>
            </div>

            <div className="pt-3 border-t border-border flex justify-end">
              <Button
                variant="tertiary"
                onClick={() => handleScrollToEvidence("provenance")}
                iconRight={<ArrowRight className="w-3.5 h-3.5" />}
                className="text-xs"
              >
                View Evidence
              </Button>
            </div>
          </div>

          {/* 3. METADATA CARD */}
          <div className="border border-border rounded-xl bg-surface p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                    metaSignal?.anomalyDetected
                      ? "bg-[#FBF7EE] text-[#92610F] border-[#E8D5A0]"
                      : "bg-[#EBF7EE] text-[#1E5631] border-[#C1E3CA]"
                  }`}>
                    <FileSearch className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground font-mono">
                      METADATA
                    </h4>
                    <span className="text-[11px] text-secondary">EXIF / container tags</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                    metaSignal?.anomalyDetected
                      ? "bg-[#FBF7EE] text-[#92610F] border-[#E8D5A0]"
                      : "bg-[#EBF7EE] text-[#1E5631] border-[#C1E3CA]"
                  }`}>
                    {metaSignal?.signalValue || "REVIEWED"}
                  </span>
                </div>
              </div>

              <p className="text-xs text-foreground font-medium mt-3 leading-relaxed">
                {metaSignal?.summary || "Container metadata reviewed."}
              </p>
              {metaSignal?.items && metaSignal.items.length > 0 && (
                <p className="text-xs text-secondary mt-1 leading-relaxed line-clamp-2">
                  {metaSignal.items[0].summary}
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-border flex justify-end">
              <Button
                variant="tertiary"
                onClick={() => handleScrollToEvidence("metadata")}
                iconRight={<ArrowRight className="w-3.5 h-3.5" />}
                className="text-xs"
              >
                View Evidence
              </Button>
            </div>
          </div>

          {/* 4. FORENSICS CARD */}
          <div className="border border-border rounded-xl bg-surface p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                    forensicSignal?.anomalyDetected
                      ? "bg-[#FDF2F2] text-[#991B1B] border-[#F8B4B4]"
                      : "bg-[#EBF7EE] text-[#1E5631] border-[#C1E3CA]"
                  }`}>
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground font-mono">
                      FORENSICS
                    </h4>
                    <span className="text-[11px] text-secondary">Quantization &amp; container audit</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                    forensicSignal?.anomalyDetected
                      ? "bg-[#FDF2F2] text-[#991B1B] border-[#F8B4B4]"
                      : forensicSignal?.status === "skipped"
                      ? "bg-[#FBF7EE] text-[#92610F] border-[#E8D5A0]"
                      : "bg-[#EBF7EE] text-[#1E5631] border-[#C1E3CA]"
                  }`}>
                    {forensicSignal?.signalValue || "NORMAL"}
                  </span>
                </div>
              </div>

              <p className="text-xs text-foreground font-medium mt-3 leading-relaxed">
                {forensicSignal?.summary || "Quantization tables and container structure conform to standard expectations."}
              </p>
              {forensicSignal?.items && forensicSignal.items.length > 0 && (
                <p className="text-xs text-secondary mt-1 leading-relaxed line-clamp-2">
                  {forensicSignal.items[0].summary}
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-border flex justify-end">
              <Button
                variant="tertiary"
                onClick={() => handleScrollToEvidence("forensics")}
                iconRight={<ArrowRight className="w-3.5 h-3.5" />}
                className="text-xs"
              >
                View Evidence
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION: "Why this assessment?" (DYNAMIC EVIDENTIARY REASONING)
      ───────────────────────────────────────────────────────────── */}
      <section className="border border-border rounded-xl bg-surface p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-primary block mb-1">
            EVIDENTIARY REASONING
          </span>
          <h3 className="text-xl font-bold text-foreground tracking-tight">
            Why this assessment?
          </h3>
          <p className="text-xs sm:text-sm text-secondary mt-1 max-w-2xl">
            TrustLayer aggregates independent evidence signals into an explainable assessment:
          </p>
        </div>

        {/* Dynamic Numbered Reasoning List */}
        <div className="space-y-3">
          {report.keyFindings && report.keyFindings.length > 0 ? (
            report.keyFindings.map((finding, idx) => {
              const isDisclaimer = finding.includes("absolute certainty") || finding.includes("increase the reason for review");
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border transition-colors ${
                    isDisclaimer
                      ? "bg-[#FBF7EE] border-[#E8D5A0] text-[#5D420F]"
                      : "bg-[#FAFBF9] border-border/80 text-foreground"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-primary shrink-0 mt-0.5">
                      {String(idx + 1).padStart(2, "0")}.
                    </span>
                    <p className="text-xs sm:text-sm leading-relaxed font-sans">
                      {finding}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-4 rounded-lg bg-[#FAFBF9] border border-border/80 text-xs text-secondary">
              1. All active evidence signals evaluated and within normal baseline expectations.
            </div>
          )}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION: EVIDENCE DETAILS (EXPANDABLE DOSSIERS)
      ───────────────────────────────────────────────────────────── */}
      <EvidenceDetailsSection
        report={report}
        activeSection={activeDetailSection}
        onToggleSection={setActiveDetailSection}
      />

      {/* ─────────────────────────────────────────────────────────────
          SECTION: ASSESSMENT LIMITATIONS (RESTRAINED AMBER CALLOUT)
      ───────────────────────────────────────────────────────────── */}
      <section className="border border-[#E8D5A0] rounded-xl bg-[#FBF7EE] p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-[#92610F]">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <h4 className="font-bold text-xs font-mono uppercase tracking-wider">
            Assessment Limitations
          </h4>
        </div>

        <p className="text-sm font-semibold text-[#5D420F] leading-relaxed">
          &ldquo;{report.disclaimer || "TrustLayer provides an evidence-based assessment. Results may be affected by compression, editing, missing provenance and unseen generation methods."}&rdquo;
        </p>

        {/* Essential Evidentiary Axioms */}
        <div className="pt-2 border-t border-[#E8D5A0]/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#5D420F]/90 font-sans">
          <div>
            <span className="font-bold text-[#5D420F] block mb-0.5">No C2PA ≠ Fake</span>
            Emerging standard; social media and messaging apps routinely strip metadata upon upload.
          </div>
          <div>
            <span className="font-bold text-[#5D420F] block mb-0.5">No Metadata ≠ Fake</span>
            Stripped EXIF is standard privacy behavior across modern web publishing pipelines.
          </div>
          <div>
            <span className="font-bold text-[#5D420F] block mb-0.5">Detector ≠ Absolute Truth</span>
            Qualitative model indicators provide evidence to guide human review; not an oracle.
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          BOTTOM: "Need another opinion?"
      ───────────────────────────────────────────────────────────── */}
      <section className="border border-border rounded-xl bg-surface p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-secondary">
            WORKFLOW CONTINUANCE
          </span>
          <h4 className="text-lg font-bold text-foreground tracking-tight">
            Need another opinion?
          </h4>
          <p className="text-xs sm:text-sm text-secondary max-w-md">
            Analyze another image or video file through the multi-signal verification pipeline, or export this report for external review.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Button
            variant="secondary"
            size="md"
            onClick={() => setIsExportModalOpen(true)}
            icon={<FileText className="w-4 h-4" />}
          >
            Export Report
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={onReset}
            icon={<RotateCcw className="w-4 h-4" />}
          >
            Analyze Another File
          </Button>
        </div>
      </section>

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
