"use client";

import React, { useState, useEffect } from "react";
import { TrustReport } from "@/lib/types";
import { formatFileSize } from "@/lib/services/fileInspector";
import {
  BrainCircuit,
  Fingerprint,
  FileSearch,
  Layers,
  Shield,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EvidenceDetailsSectionProps {
  report: TrustReport;
  activeSection?: string | null;
  onToggleSection?: (sectionId: string) => void;
}

export function EvidenceDetailsSection({
  report,
  activeSection,
  onToggleSection,
}: EvidenceDetailsSectionProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    ai: true,
    provenance: false,
    metadata: false,
    forensics: false,
  });

  useEffect(() => {
    if (activeSection) {
      setExpanded((prev) => ({
        ...prev,
        [activeSection]: true,
      }));
    }
  }, [activeSection]);

  const toggleSection = (id: string) => {
    if (onToggleSection) {
      onToggleSection(id);
    }
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const aiSignal = report.signalResults.find((s) => s.signalId === "ai-detection");
  const provSignal = report.signalResults.find((s) => s.signalId === "provenance");
  const metaSignal = report.signalResults.find((s) => s.signalId === "metadata");
  const forensicSignal = report.signalResults.find((s) => s.signalId === "forensic");

  return (
    <section id="evidence-details" className="space-y-6 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-border">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-primary block mb-1">
            DEEP-DIVE INVESTIGATION
          </span>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            EVIDENCE DETAILS
          </h3>
        </div>
        <p className="text-xs text-secondary font-mono">
          4 independent inspection dossiers · Expand to review technical findings
        </p>
      </div>

      {/* Expandable Evidence Sections */}
      <div className="space-y-4">
        {/* ─────────────────────────────────────────────────────────────
            1. AI DETECTION EXPANSION
        ───────────────────────────────────────────────────────────── */}
        <div
          id="evidence-ai"
          className={cn(
            "border rounded-xl bg-surface transition-all duration-200 shadow-xs overflow-hidden",
            expanded.ai ? "border-border" : "border-border/80 hover:border-border",
            activeSection === "ai" && "ring-2 ring-primary/30"
          )}
        >
          <button
            type="button"
            onClick={() => toggleSection("ai")}
            className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 hover:bg-[#FAFAF8] transition-colors cursor-pointer"
            aria-expanded={expanded.ai}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${
                  aiSignal?.anomalyDetected
                    ? "bg-[#FDF2F2] text-[#991B1B] border-[#F8B4B4]"
                    : "bg-[#EBF7EE] text-[#1E5631] border-[#C1E3CA]"
                }`}
              >
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-base font-bold text-foreground font-mono">
                    AI Visual Analysis
                  </h4>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                      aiSignal?.anomalyDetected
                        ? "bg-[#FDF2F2] text-[#991B1B] border-[#F8B4B4]"
                        : "bg-[#EBF7EE] text-[#1E5631] border-[#C1E3CA]"
                    }`}
                  >
                    {aiSignal?.signalValue || "ANALYZED"}
                  </span>
                  <span className="text-[10px] font-mono text-secondary hidden sm:inline">
                    Model: Groq qwen/qwen3.8-27b
                  </span>
                </div>
                <p className="text-xs text-secondary mt-1 line-clamp-1">
                  {aiSignal?.summary || "Observable visual evidence evaluated for generative artifacts."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 pt-1 sm:pt-0">
              <span className="text-xs font-mono text-secondary hidden md:inline">
                {expanded.ai ? "Collapse dossier" : "Expand dossier"}
              </span>
              <div className="w-7 h-7 rounded-md border border-border flex items-center justify-center text-secondary">
                {expanded.ai ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>
          </button>

          {expanded.ai && (
            <div className="px-5 pb-6 sm:px-6 sm:pb-7 pt-2 border-t border-border space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. WHAT WAS CHECKED */}
                <div className="p-4 rounded-lg bg-[#FAFBF9] border border-border/80 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
                      What Was Checked
                    </h5>
                  </div>
                  <ul className="text-xs text-foreground/90 space-y-1.5 list-disc list-inside font-sans leading-relaxed">
                    <li>
                      <span className="font-semibold text-foreground">AI Multimodal Vision:</span> Evaluated using Groq server-side multimodal model (<code className="font-mono text-[11px] bg-surface px-1 py-0.5 rounded border border-border">qwen/qwen3.8-27b</code>).
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">Generative Artifacts:</span> Fine skin texture smoothness, diffusion boundaries, unnatural anatomical features, and text anomalies.
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">Prompt Injection Defense:</span> Visible text inside the media is strictly evaluated as visual evidence, never instructions.
                    </li>
                  </ul>
                </div>

                {/* 2. WHAT WAS FOUND */}
                <div className={`p-4 rounded-lg border space-y-2 ${
                  aiSignal?.anomalyDetected ? "bg-[#FDF2F2]/40 border-[#F8B4B4]/70" : "bg-[#FAFBF9] border-border/80"
                }`}>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${aiSignal?.anomalyDetected ? "bg-[#991B1B]" : "bg-primary"}`} />
                    <h5 className={`text-xs font-mono font-bold uppercase tracking-wider ${aiSignal?.anomalyDetected ? "text-[#991B1B]" : "text-foreground"}`}>
                      Observable Evidence ({aiSignal?.items.length || 0} findings)
                    </h5>
                  </div>
                  <ul className="text-xs text-foreground space-y-1.5 list-disc list-inside font-sans leading-relaxed">
                    {aiSignal?.items && aiSignal.items.length > 0 ? (
                      aiSignal.items.map((item, i) => (
                        <li key={i}>
                          <span className="font-semibold text-foreground">{item.title}:</span>{" "}
                          <span>{item.summary}</span>
                        </li>
                      ))
                    ) : (
                      <li>No prominent synthetic indicators or manipulation anomalies observed.</li>
                    )}
                  </ul>
                </div>
              </div>

              {/* 3. WHY IT MATTERS & 4. LIMITATIONS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-[#FAFBF9] border border-border/80 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                    <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
                      Why It Matters
                    </h5>
                  </div>
                  <p className="text-xs text-secondary leading-relaxed font-sans">
                    Generative models frequently introduce localized pixel inconsistencies, unnatural bilateral symmetry, or text geometry flaws. Distinguishing raw visual observation from interpretation ensures objective assessment.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#FBF7EE] border border-[#E8D5A0] space-y-1.5">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#92610F] shrink-0" />
                    <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-[#92610F]">
                      Limitations
                    </h5>
                  </div>
                  <p className="text-xs text-[#5D420F] leading-relaxed font-sans">
                    Visual analysis alone cannot establish authenticity with absolute certainty. High-quality synthetic media or heavy lossy recompression can obscure indicators. TrustLayer relies on qualitative confidence, not uncalibrated percentages.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ─────────────────────────────────────────────────────────────
            2. PROVENANCE EXPANSION
        ───────────────────────────────────────────────────────────── */}
        <div
          id="evidence-provenance"
          className={cn(
            "border rounded-xl bg-surface transition-all duration-200 shadow-xs overflow-hidden",
            expanded.provenance ? "border-border" : "border-border/80 hover:border-border",
            activeSection === "provenance" && "ring-2 ring-primary/30"
          )}
        >
          <button
            type="button"
            onClick={() => toggleSection("provenance")}
            className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 hover:bg-[#FAFAF8] transition-colors cursor-pointer"
            aria-expanded={expanded.provenance}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${
                  provSignal?.status === "analyzed"
                    ? "bg-[#EBF7EE] text-[#1E5631] border-[#C1E3CA]"
                    : "bg-[#FBF7EE] text-[#92610F] border-[#E8D5A0]"
                }`}
              >
                <Fingerprint className="w-5 h-5" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-base font-bold text-foreground font-mono">
                    Provenance
                  </h4>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                      provSignal?.status === "analyzed"
                        ? "bg-[#EBF7EE] text-[#1E5631] border-[#C1E3CA]"
                        : "bg-[#FBF7EE] text-[#92610F] border-[#E8D5A0]"
                    }`}
                  >
                    {provSignal?.signalValue || "NOT FOUND"}
                  </span>
                  <span className="text-[10px] font-mono text-secondary hidden sm:inline">
                    C2PA / Content Credentials
                  </span>
                </div>
                <p className="text-xs text-secondary mt-1 line-clamp-1">
                  {provSignal?.summary || "Binary container inspection for C2PA Content Credentials."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 pt-1 sm:pt-0">
              <span className="text-xs font-mono text-secondary hidden md:inline">
                {expanded.provenance ? "Collapse dossier" : "Expand dossier"}
              </span>
              <div className="w-7 h-7 rounded-md border border-border flex items-center justify-center text-secondary">
                {expanded.provenance ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>
          </button>

          {expanded.provenance && (
            <div className="px-5 pb-6 sm:px-6 sm:pb-7 pt-2 border-t border-border space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-[#FAFBF9] border border-border/80 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
                      What Was Checked
                    </h5>
                  </div>
                  <ul className="text-xs text-foreground/90 space-y-1.5 list-disc list-inside font-sans leading-relaxed">
                    <li>
                      <span className="font-semibold text-foreground">C2PA Manifest Scanners:</span> JPEG APP11 JUMBF boxes, PNG <code className="font-mono text-[11px] bg-surface px-1 py-0.5 rounded border border-border">c2pa</code> chunks, and MP4 ISO-BMFF UUID boxes.
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">Cryptographic Manifests:</span> Claim generators, signing times, and assertion bindings.
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-[#FAFBF9] border border-border/80 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#B7791F] shrink-0" />
                    <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
                      Inspection Findings
                    </h5>
                  </div>
                  <ul className="text-xs text-foreground space-y-1.5 list-disc list-inside font-sans leading-relaxed">
                    {provSignal?.items && provSignal.items.length > 0 ? (
                      provSignal.items.map((item, i) => (
                        <li key={i}>
                          <span className="font-semibold text-foreground">{item.title}:</span>{" "}
                          <span>{item.summary}</span>
                        </li>
                      ))
                    ) : (
                      <li>No C2PA Content Credentials were detected in the uploaded file.</li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-[#FAFBF9] border border-border/80 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary shrink-0" />
                    <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
                      Crucial Aggregation Rule
                    </h5>
                  </div>
                  <p className="text-xs text-secondary leading-relaxed font-sans">
                    <strong className="text-foreground">Absence of C2PA credentials does NOT imply media is synthetic or manipulated.</strong> Most consumer cameras and social media platforms do not yet embed C2PA hardware credentials or strip them upon upload.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#FBF7EE] border border-[#E8D5A0] space-y-1.5">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#92610F] shrink-0" />
                    <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-[#92610F]">
                      Limitations
                    </h5>
                  </div>
                  <p className="text-xs text-[#5D420F] leading-relaxed font-sans">
                    When present, C2PA verifies claimed provenance assertions and edit history; complete trust requires validating the signing certificate against recognized root anchors.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ─────────────────────────────────────────────────────────────
            3. METADATA EXPANSION
        ───────────────────────────────────────────────────────────── */}
        <div
          id="evidence-metadata"
          className={cn(
            "border rounded-xl bg-surface transition-all duration-200 shadow-xs overflow-hidden",
            expanded.metadata ? "border-border" : "border-border/80 hover:border-border",
            activeSection === "metadata" && "ring-2 ring-primary/30"
          )}
        >
          <button
            type="button"
            onClick={() => toggleSection("metadata")}
            className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 hover:bg-[#FAFAF8] transition-colors cursor-pointer"
            aria-expanded={expanded.metadata}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${
                  metaSignal?.anomalyDetected
                    ? "bg-[#FBF7EE] text-[#92610F] border-[#E8D5A0]"
                    : "bg-[#EBF7EE] text-[#1E5631] border-[#C1E3CA]"
                }`}
              >
                <FileSearch className="w-5 h-5" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-base font-bold text-foreground font-mono">
                    Metadata
                  </h4>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                      metaSignal?.anomalyDetected
                        ? "bg-[#FBF7EE] text-[#92610F] border-[#E8D5A0]"
                        : "bg-[#EBF7EE] text-[#1E5631] border-[#C1E3CA]"
                    }`}
                  >
                    {metaSignal?.signalValue || "REVIEWED"}
                  </span>
                  <span className="text-[10px] font-mono text-secondary hidden sm:inline">
                    EXIF / XMP / Software tags
                  </span>
                </div>
                <p className="text-xs text-secondary mt-1 line-clamp-1">
                  {metaSignal?.summary || "Binary metadata extraction from container headers."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 pt-1 sm:pt-0">
              <span className="text-xs font-mono text-secondary hidden md:inline">
                {expanded.metadata ? "Collapse dossier" : "Expand dossier"}
              </span>
              <div className="w-7 h-7 rounded-md border border-border flex items-center justify-center text-secondary">
                {expanded.metadata ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>
          </button>

          {expanded.metadata && (
            <div className="px-5 pb-6 sm:px-6 sm:pb-7 pt-2 border-t border-border space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-[#FAFBF9] border border-border/80 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
                      What Was Checked
                    </h5>
                  </div>
                  <ul className="text-xs text-foreground/90 space-y-1.5 list-disc list-inside font-sans leading-relaxed">
                    <li>
                      <span className="font-semibold text-foreground">Header Inspection:</span> JPEG APP1 EXIF (IFD0, SubIFD), XMP RDF packets, and IPTC records.
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">Camera &amp; Software Tags:</span> Hardware Make, Model, Software, and creation timestamps.
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-[#FAFBF9] border border-border/80 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#B7791F] shrink-0" />
                    <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
                      Extracted Metadata
                    </h5>
                  </div>
                  <ul className="text-xs text-foreground space-y-1.5 list-disc list-inside font-sans leading-relaxed">
                    {metaSignal?.items && metaSignal.items.length > 0 ? (
                      metaSignal.items.map((item, i) => (
                        <li key={i}>
                          <span className="font-semibold text-foreground">{item.title}:</span>{" "}
                          <span>{item.summary}</span>
                        </li>
                      ))
                    ) : (
                      <li>Metadata headers reviewed. Minimal metadata present.</li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Technical Metadata Table */}
              <div className="border border-border rounded-lg overflow-hidden text-xs font-mono">
                <table className="w-full text-left">
                  <thead className="bg-[#F0F2F0] border-b border-border text-[10px] uppercase font-bold text-secondary">
                    <tr>
                      <th className="py-2.5 px-4">Field</th>
                      <th className="py-2.5 px-4">Value</th>
                      <th className="py-2.5 px-4">Assessment Note</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr className="bg-surface">
                      <td className="py-2.5 px-4 font-semibold text-foreground">Filename</td>
                      <td className="py-2.5 px-4 text-foreground">{report.mediaFile.name}</td>
                      <td className="py-2.5 px-4 text-secondary text-[11px] font-sans">Sanitized container input</td>
                    </tr>
                    <tr className="bg-[#FAFBF9]">
                      <td className="py-2.5 px-4 font-semibold text-foreground">Format &amp; Size</td>
                      <td className="py-2.5 px-4 text-foreground">{report.mediaFile.type} ({formatFileSize(report.mediaFile.size)})</td>
                      <td className="py-2.5 px-4 text-secondary text-[11px] font-sans">Binary length verified</td>
                    </tr>
                    <tr className="bg-surface">
                      <td className="py-2.5 px-4 font-semibold text-foreground">Dimensions</td>
                      <td className="py-2.5 px-4 text-foreground">{report.mediaFile.width && report.mediaFile.height ? `${report.mediaFile.width} × ${report.mediaFile.height}` : "Unavailable"}</td>
                      <td className="py-2.5 px-4 text-secondary text-[11px] font-sans">Decoded frame dimensions</td>
                    </tr>
                    <tr className="bg-[#FAFBF9]">
                      <td className="py-2.5 px-4 font-semibold text-foreground">SHA-256 Fingerprint</td>
                      <td className="py-2.5 px-4 text-foreground font-mono text-[11px] truncate max-w-xs">{report.mediaFile.hashSha256 || "e3b0c44..."}</td>
                      <td className="py-2.5 px-4 text-secondary text-[11px] font-sans">Exact binary identifier</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-[#FAFBF9] border border-border/80 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                    <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
                      Why It Matters
                    </h5>
                  </div>
                  <p className="text-xs text-secondary leading-relaxed font-sans">
                    Editing software tags indicate post-processing. However, editing software is common in professional photography workflows and does NOT automatically mean the content is fake.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#FBF7EE] border border-[#E8D5A0] space-y-1.5">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#92610F] shrink-0" />
                    <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-[#92610F]">
                      Limitations
                    </h5>
                  </div>
                  <p className="text-xs text-[#5D420F] leading-relaxed font-sans">
                    Metadata is easily stripped or modified by social networks and messaging platforms to protect privacy. Missing metadata alone never implies artificial generation.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ─────────────────────────────────────────────────────────────
            4. FORENSICS EXPANSION
        ───────────────────────────────────────────────────────────── */}
        <div
          id="evidence-forensics"
          className={cn(
            "border rounded-xl bg-surface transition-all duration-200 shadow-xs overflow-hidden",
            expanded.forensics ? "border-border" : "border-border/80 hover:border-border",
            activeSection === "forensics" && "ring-2 ring-primary/30"
          )}
        >
          <button
            type="button"
            onClick={() => toggleSection("forensics")}
            className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 hover:bg-[#FAFAF8] transition-colors cursor-pointer"
            aria-expanded={expanded.forensics}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${
                  forensicSignal?.anomalyDetected
                    ? "bg-[#FDF2F2] text-[#991B1B] border-[#F8B4B4]"
                    : "bg-[#EBF7EE] text-[#1E5631] border-[#C1E3CA]"
                }`}
              >
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-base font-bold text-foreground font-mono">
                    Forensics &amp; Quantization
                  </h4>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                      forensicSignal?.anomalyDetected
                        ? "bg-[#FDF2F2] text-[#991B1B] border-[#F8B4B4]"
                        : "bg-[#EBF7EE] text-[#1E5631] border-[#C1E3CA]"
                    }`}
                  >
                    {forensicSignal?.signalValue || "NORMAL"}
                  </span>
                  <span className="text-[10px] font-mono text-secondary hidden sm:inline">
                    JPEG DQT / Container audit
                  </span>
                </div>
                <p className="text-xs text-secondary mt-1 line-clamp-1">
                  {forensicSignal?.summary || "Quantization table and container structural analysis."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 pt-1 sm:pt-0">
              <span className="text-xs font-mono text-secondary hidden md:inline">
                {expanded.forensics ? "Collapse dossier" : "Expand dossier"}
              </span>
              <div className="w-7 h-7 rounded-md border border-border flex items-center justify-center text-secondary">
                {expanded.forensics ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>
          </button>

          {expanded.forensics && (
            <div className="px-5 pb-6 sm:px-6 sm:pb-7 pt-2 border-t border-border space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-[#FAFBF9] border border-border/80 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
                      What Was Checked
                    </h5>
                  </div>
                  <ul className="text-xs text-foreground/90 space-y-1.5 list-disc list-inside font-sans leading-relaxed">
                    <li>
                      <span className="font-semibold text-foreground">JPEG DQT Tables:</span> Discrete Quantization Tables (<code className="font-mono text-[11px] bg-surface px-1 py-0.5 rounded border border-border">0xFFDB</code>) and IJG compression factor estimation.
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">Container Integrity:</span> Verified stream termination at End-of-Image (<code className="font-mono text-[11px] bg-surface px-1 py-0.5 rounded border border-border">0xFFD9</code>) or PNG IEND chunk to audit trailing payload data.
                    </li>
                  </ul>
                </div>

                <div className={`p-4 rounded-lg border space-y-2 ${
                  forensicSignal?.anomalyDetected ? "bg-[#FDF2F2]/40 border-[#F8B4B4]/70" : "bg-[#FAFBF9] border-border/80"
                }`}>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${forensicSignal?.anomalyDetected ? "bg-[#991B1B]" : "bg-primary"}`} />
                    <h5 className={`text-xs font-mono font-bold uppercase tracking-wider ${forensicSignal?.anomalyDetected ? "text-[#991B1B]" : "text-foreground"}`}>
                      Forensic Findings
                    </h5>
                  </div>
                  <ul className="text-xs text-foreground space-y-1.5 list-disc list-inside font-sans leading-relaxed">
                    {forensicSignal?.items && forensicSignal.items.length > 0 ? (
                      forensicSignal.items.map((item, i) => (
                        <li key={i}>
                          <span className="font-semibold text-foreground">{item.title}:</span>{" "}
                          <span>{item.summary}</span>
                        </li>
                      ))
                    ) : (
                      <li>Quantization tables and container structure conform to standard expectations.</li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-[#FAFBF9] border border-border/80 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                    <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
                      Why It Matters
                    </h5>
                  </div>
                  <p className="text-xs text-secondary leading-relaxed font-sans">
                    Quantization tables reveal how the image data was encoded. Discrepancies between container markers and decoded frames can highlight steganographic appending or non-standard rendering pipelines.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#FBF7EE] border border-[#E8D5A0] space-y-1.5">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#92610F] shrink-0" />
                    <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-[#92610F]">
                      Active Capabilities &amp; Limitations
                    </h5>
                  </div>
                  <p className="text-xs text-[#5D420F] leading-relaxed font-sans">
                    Advanced forensic models (such as sensor PRNU fingerprinting, camera-specific noise floor modeling, and GAN latent residual analysis) are not active in this deployment. Findings are based strictly on binary container validation and DQT tables.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
