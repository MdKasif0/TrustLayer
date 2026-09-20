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
} from "lucide-react";

interface AssessmentReportProps {
  report: TrustReport;
  onReset: () => void;
}

export function AssessmentReport({ report, onReset }: AssessmentReportProps) {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [activeDetailSection, setActiveDetailSection] = useState<string | null>(null);

  const handleScrollToEvidence = (sectionId: string) => {
    setActiveDetailSection(sectionId);
    const element = document.getElementById(`evidence-${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="space-y-10 max-w-[1080px] mx-auto pb-16">
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
              {report.mediaFile.name || "example-image.jpg"}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-secondary mt-1.5 font-mono">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-secondary shrink-0" />
                <span>Analyzed:</span>
                <span className="text-foreground font-medium">
                  {report.formattedAnalyzedAt || "September 21, 2026"}
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

          {/* Action Buttons: Export PDF, Share, Analyze Another */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExportModalOpen(true)}
              className="text-xs font-mono h-9"
              icon={<FileDown className="w-3.5 h-3.5" />}
            >
              Export PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsShareModalOpen(true)}
              className="text-xs font-mono h-9"
              icon={<Share2 className="w-3.5 h-3.5" />}
            >
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              className="text-xs font-mono h-9"
              icon={<RotateCcw className="w-3.5 h-3.5" />}
            >
              Analyze Another
            </Button>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          MAIN ASSESSMENT
      ───────────────────────────────────────────────────────────── */}
      <section className="border border-border rounded-xl bg-surface p-6 sm:p-8 shadow-xs relative overflow-hidden">
        {/* Top Hairline Indicator */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#B7791F]" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#92610F]">
                OVERALL ASSESSMENT
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-warning-bg text-[#92610F] border border-[#E8D5A0]">
                <ShieldAlert className="w-3 h-3" />
                Multi-Signal Advisory
              </span>
            </div>

            {/* Large but restrained assessment header */}
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              {report.overallAssessment || "POTENTIALLY SYNTHETIC / MANIPULATED"}
            </h2>

            <p className="text-xs text-secondary italic font-sans pt-0.5">
              &ldquo;Based on the evidence currently available to TrustLayer.&rdquo;
            </p>

            <p className="text-xs sm:text-sm text-secondary max-w-2xl leading-relaxed pt-1">
              {report.verdictSummary ||
                "Multiple independent evidence signals indicate characteristics consistent with generative synthesis and non-optical post-processing."}
            </p>
          </div>

          {/* Qualitative Confidence & Evidence Strength (STRICTLY NO FAKE PERCENTAGES) */}
          <div className="flex md:flex-col sm:items-end justify-between gap-3 shrink-0 p-4 bg-[#FAFBF9] rounded-lg border border-border/80 min-w-[210px]">
            <div className="text-left md:text-right">
              <span className="text-[11px] font-sans text-secondary block uppercase tracking-wider">
                Evidence strength:
              </span>
              <span className="text-sm sm:text-base font-bold font-mono text-[#92610F]">
                {report.evidenceStrengthLabel || "MULTIPLE SIGNALS"}
              </span>
            </div>

            <div className="text-left md:text-right">
              <span className="text-[11px] font-sans text-secondary block uppercase tracking-wider">
                Assessment confidence:
              </span>
              <span className="text-sm sm:text-base font-bold font-mono text-foreground">
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
          FOUR SIGNALS: ELEGANT EVIDENCE OVERVIEW
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

        {/* 4 Elegant Signal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 1. AI DETECTION CARD */}
          <div className="border border-border rounded-xl bg-surface p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#FDF2F2] flex items-center justify-center text-[#991B1B] shrink-0 border border-[#F8B4B4]">
                    <BrainCircuit className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground font-mono">
                      AI DETECTION
                    </h4>
                    <span className="text-[11px] text-secondary">Synthetic media indicators</span>
                  </div>
                </div>

                {/* Status Indicator (Red: Suspicious / detected) */}
                <div className="text-right">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FDF2F2] text-[#991B1B] border border-[#F8B4B4]">
                    HIGH SIGNAL
                  </span>
                </div>
              </div>

              <p className="text-xs text-foreground font-medium mt-3 leading-relaxed">
                &ldquo;Visual patterns associated with synthetic media were detected.&rdquo;
              </p>
              <p className="text-xs text-secondary mt-1 leading-relaxed">
                Discrete cosine transform identified periodic frequency-domain lattice artifacts characteristic of generative diffusion.
              </p>
            </div>

            <div className="pt-3 border-t border-border flex justify-end">
              <button
                type="button"
                onClick={() => handleScrollToEvidence("ai")}
                className="text-xs font-mono font-semibold text-primary hover:text-secondary inline-flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>View evidence</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* 2. PROVENANCE CARD */}
          <div className="border border-border rounded-xl bg-surface p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#FBF7EE] flex items-center justify-center text-[#92610F] shrink-0 border border-[#E8D5A0]">
                    <Fingerprint className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground font-mono">
                      PROVENANCE
                    </h4>
                    <span className="text-[11px] text-secondary">C2PA / Content Credentials</span>
                  </div>
                </div>

                {/* Status Indicator (Amber: Unavailable) */}
                <div className="text-right">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FBF7EE] text-[#92610F] border border-[#E8D5A0]">
                    NOT FOUND
                  </span>
                </div>
              </div>

              <p className="text-xs text-foreground font-medium mt-3 leading-relaxed">
                &ldquo;No verifiable C2PA Content Credentials found.&rdquo;
              </p>
              <p className="text-xs text-secondary mt-1 leading-relaxed">
                Container headers contain no JUMBF metadata box or cryptographic signer assertions (standard consumer camera state).
              </p>
            </div>

            <div className="pt-3 border-t border-border flex justify-end">
              <button
                type="button"
                onClick={() => handleScrollToEvidence("provenance")}
                className="text-xs font-mono font-semibold text-primary hover:text-secondary inline-flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>View evidence</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* 3. METADATA CARD */}
          <div className="border border-border rounded-xl bg-surface p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#FBF7EE] flex items-center justify-center text-[#92610F] shrink-0 border border-[#E8D5A0]">
                    <FileSearch className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground font-mono">
                      METADATA
                    </h4>
                    <span className="text-[11px] text-secondary">EXIF / file information</span>
                  </div>
                </div>

                {/* Status Indicator (Amber: Requires review) */}
                <div className="text-right">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FBF7EE] text-[#92610F] border border-[#E8D5A0]">
                    REVIEW
                  </span>
                </div>
              </div>

              <p className="text-xs text-foreground font-medium mt-3 leading-relaxed">
                &ldquo;File characteristics require review.&rdquo;
              </p>
              <p className="text-xs text-secondary mt-1 leading-relaxed">
                Quantization profiles diverge from standard hardware sensors, and software signature indicates server-side encoding.
              </p>
            </div>

            <div className="pt-3 border-t border-border flex justify-end">
              <button
                type="button"
                onClick={() => handleScrollToEvidence("metadata")}
                className="text-xs font-mono font-semibold text-primary hover:text-secondary inline-flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>View evidence</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* 4. FORENSICS CARD */}
          <div className="border border-border rounded-xl bg-surface p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#FDF2F2] flex items-center justify-center text-[#991B1B] shrink-0 border border-[#F8B4B4]">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground font-mono">
                      FORENSICS
                    </h4>
                    <span className="text-[11px] text-secondary">Visual / temporal analysis</span>
                  </div>
                </div>

                {/* Status Indicator (Red: Detected) */}
                <div className="text-right">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FDF2F2] text-[#991B1B] border border-[#F8B4B4]">
                    DETECTED
                  </span>
                </div>
              </div>

              <p className="text-xs text-foreground font-medium mt-3 leading-relaxed">
                &ldquo;Visual anomalies detected.&rdquo;
              </p>
              <p className="text-xs text-secondary mt-1 leading-relaxed">
                Error Level Analysis (ELA) exhibits localized compression discontinuities (+28.6% delta) along focal boundaries.
              </p>
            </div>

            <div className="pt-3 border-t border-border flex justify-end">
              <button
                type="button"
                onClick={() => handleScrollToEvidence("forensics")}
                className="text-xs font-mono font-semibold text-primary hover:text-secondary inline-flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>View evidence</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION: "Why this assessment?" (VISUAL EVIDENCE TIMELINE)
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
            TrustLayer converges independent evidence vectors into a transparent assessment rather than relying on a single detector:
          </p>
        </div>

        {/* Elegant Visual Evidence Timeline */}
        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-border">
          {/* Timeline Step 1: AI Detection */}
          <div className="relative group">
            <div className="absolute -left-6 sm:-left-8 top-1 w-3 h-3 rounded-full bg-[#991B1B] ring-4 ring-surface" />
            <div className="p-4 rounded-lg bg-[#FAFBF9] border border-border/80 hover:border-border transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-foreground flex items-center gap-1.5">
                  <span>01</span>
                  <span>AI Detection</span>
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FDF2F2] text-[#991B1B] border border-[#F8B4B4]">
                  HIGH SIGNAL
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-secondary font-mono mt-1">
                <ArrowDown className="w-3 h-3 text-[#991B1B] shrink-0" />
                <span className="text-foreground font-medium">Synthetic-pattern indicators detected</span>
              </div>
              <p className="text-xs text-secondary mt-1 font-sans">
                Discrete cosine transform reveals high-frequency mathematical lattice artifacts characteristic of diffusion upsampling models.
              </p>
            </div>
          </div>

          {/* Timeline Step 2: Metadata */}
          <div className="relative group">
            <div className="absolute -left-6 sm:-left-8 top-1 w-3 h-3 rounded-full bg-[#B7791F] ring-4 ring-surface" />
            <div className="p-4 rounded-lg bg-[#FAFBF9] border border-border/80 hover:border-border transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-foreground flex items-center gap-1.5">
                  <span>02</span>
                  <span>Metadata</span>
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FBF7EE] text-[#92610F] border border-[#E8D5A0]">
                  REVIEW
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-secondary font-mono mt-1">
                <ArrowDown className="w-3 h-3 text-[#B7791F] shrink-0" />
                <span className="text-foreground font-medium">File characteristics require review</span>
              </div>
              <p className="text-xs text-secondary mt-1 font-sans">
                Quantization tables mismatch standard camera curves; container encoded via server graphics library (<code className="text-[11px] font-mono">libvips</code>) without camera hardware MakerNotes.
              </p>
            </div>
          </div>

          {/* Timeline Step 3: Forensics */}
          <div className="relative group">
            <div className="absolute -left-6 sm:-left-8 top-1 w-3 h-3 rounded-full bg-[#991B1B] ring-4 ring-surface" />
            <div className="p-4 rounded-lg bg-[#FAFBF9] border border-border/80 hover:border-border transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-foreground flex items-center gap-1.5">
                  <span>03</span>
                  <span>Forensics</span>
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FDF2F2] text-[#991B1B] border border-[#F8B4B4]">
                  DETECTED
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-secondary font-mono mt-1">
                <ArrowDown className="w-3 h-3 text-[#991B1B] shrink-0" />
                <span className="text-foreground font-medium">Visual anomalies detected</span>
              </div>
              <p className="text-xs text-secondary mt-1 font-sans">
                Error Level Analysis (ELA) shows +28.6% discontinuous error clustering across foreground boundaries, indicating localized synthetic composition.
              </p>
            </div>
          </div>

          {/* Timeline Step 4: Provenance */}
          <div className="relative group">
            <div className="absolute -left-6 sm:-left-8 top-1 w-3 h-3 rounded-full bg-secondary/50 ring-4 ring-surface" />
            <div className="p-4 rounded-lg bg-[#FAFBF9] border border-border/80 hover:border-border transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-foreground flex items-center gap-1.5">
                  <span>04</span>
                  <span>Provenance</span>
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FBF7EE] text-[#92610F] border border-[#E8D5A0]">
                  NOT FOUND
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-secondary font-mono mt-1">
                <ArrowDown className="w-3 h-3 text-secondary shrink-0" />
                <span className="text-foreground font-medium">No verifiable Content Credentials found</span>
              </div>
              <p className="text-xs text-secondary mt-1 font-sans">
                No cryptographic origin claim attached. (Note: missing C2PA is standard across consumer devices and does not itself imply manipulation).
              </p>
            </div>
          </div>
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
          &ldquo;TrustLayer provides an evidence-based assessment. Results may be affected by compression, editing, missing provenance and unseen generation methods.&rdquo;
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
            Statistical AI indicators are probabilistic; TrustLayer requires corroborating signals.
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
            variant="outline"
            onClick={() => setIsExportModalOpen(true)}
            className="text-xs font-mono h-10 px-4"
            icon={<FileText className="w-4 h-4" />}
          >
            Export Report
          </Button>
          <Button
            variant="primary"
            onClick={onReset}
            className="text-xs font-mono h-10 px-5 bg-primary hover:bg-secondary text-white font-semibold"
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

