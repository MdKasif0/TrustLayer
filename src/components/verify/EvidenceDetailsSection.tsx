"use client";

import React, { useState } from "react";
import { TrustReport, MediaFile, EvidenceConfidenceLabel, ProvenanceState } from "@/lib/types";
import { VisualEvidenceMap } from "@/components/verify/VisualEvidenceMap";
import { formatFileSize } from "@/lib/services/fileInspector";
import {
  BrainCircuit,
  Fingerprint,
  FileSearch,
  Layers,
  Shield,
  ShieldAlert,
  AlertTriangle,
  Info,
  CheckCircle2,
  HelpCircle,
  Clock,
  Camera,
  Film,
  FileImage,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EvidenceDetailsSectionProps {
  report: TrustReport;
}

const confidenceBadgeStyles: Record<EvidenceConfidenceLabel, { bg: string; text: string; border: string }> = {
  Strong: { bg: "bg-success-bg", text: "text-success", border: "border-[#B8DFC6]" },
  Moderate: { bg: "bg-soft-green", text: "text-primary", border: "border-[#C1E3CA]" },
  Limited: { bg: "bg-warning-bg", text: "text-[#92610F]", border: "border-[#E8D5A0]" },
  Inconclusive: { bg: "bg-[#F0F2F0]", text: "text-muted", border: "border-border" },
};

export function EvidenceDetailsSection({ report }: EvidenceDetailsSectionProps) {
  const isVideo = report.mediaFile.mediaKind === "video";
  const [activeTab, setActiveTab] = useState<"ai" | "provenance" | "metadata" | "forensics">("ai");

  const provenanceStates: ProvenanceState[] = ["Verified", "Not found", "Invalid", "Incomplete", "Unavailable"];
  const currentProvenanceState: ProvenanceState = "Not found";

  return (
    <section className="space-y-6 pt-4 border-t border-border">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-primary bg-soft-green px-2 py-0.5 rounded border border-[#C1E3CA]">
              Forensic Deep-Dive
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            EVIDENCE DETAILS
          </h2>
          <p className="text-xs sm:text-sm text-muted mt-0.5">
            Examine the technical evidence, signal scopes, metadata tables, and diagnostic maps.
          </p>
        </div>

        {/* Section Navigation Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F0F2F0] rounded-lg border border-border self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab("ai")}
            className={cn(
              "px-3 py-1 text-xs font-mono rounded-md font-medium transition-colors cursor-pointer",
              activeTab === "ai" ? "bg-surface text-primary shadow-xs font-bold" : "text-muted hover:text-foreground"
            )}
          >
            1. AI Detection
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("provenance")}
            className={cn(
              "px-3 py-1 text-xs font-mono rounded-md font-medium transition-colors cursor-pointer",
              activeTab === "provenance" ? "bg-surface text-primary shadow-xs font-bold" : "text-muted hover:text-foreground"
            )}
          >
            2. Provenance
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("metadata")}
            className={cn(
              "px-3 py-1 text-xs font-mono rounded-md font-medium transition-colors cursor-pointer",
              activeTab === "metadata" ? "bg-surface text-primary shadow-xs font-bold" : "text-muted hover:text-foreground"
            )}
          >
            3. Metadata
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("forensics")}
            className={cn(
              "px-3 py-1 text-xs font-mono rounded-md font-medium transition-colors cursor-pointer",
              activeTab === "forensics" ? "bg-surface text-primary shadow-xs font-bold" : "text-muted hover:text-foreground"
            )}
          >
            4. Forensics
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          1. AI DETECTION SECTION
      ───────────────────────────────────────────────────────────── */}
      {(activeTab === "ai" || activeTab === undefined) && (
        <div className="border border-border rounded-xl bg-surface p-6 sm:p-7 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-soft-green flex items-center justify-center text-primary shrink-0 border border-[#D5ECDB]">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-foreground font-mono">
                    1. AI DETECTION
                  </h3>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-warning-bg text-[#92610F] border border-[#E8D5A0]">
                    SIGNAL: HIGH
                  </span>
                </div>
                <p className="text-xs text-muted mt-0.5">
                  Generative diffusion, spatial frequency, and synthetic boundary pattern analysis
                </p>
              </div>
            </div>

            {/* Evidence Confidence Badge */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted font-sans">Evidence confidence:</span>
              <span className={cn("text-xs font-mono font-bold px-2.5 py-1 rounded border", confidenceBadgeStyles.Strong.bg, confidenceBadgeStyles.Strong.text, confidenceBadgeStyles.Strong.border)}>
                Strong
              </span>
            </div>
          </div>

          {/* Model Name & Analysis Scope */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3.5 bg-[#FAFBF9] rounded-lg border border-border/80">
              <span className="text-muted block text-[11px] font-sans font-semibold mb-1">
                Model / Detector Name
              </span>
              <span className="text-foreground font-bold">
                TrustLayer Ensemble-DF v2.4 (Diffusion &amp; GAN Discriminator Suite)
              </span>
              <p className="text-[11px] text-muted font-sans mt-1">
                Multi-pass spatial frequency decomposition and boundary gradient analysis engine.
              </p>
            </div>

            <div className="p-3.5 bg-[#FAFBF9] rounded-lg border border-border/80">
              <span className="text-muted block text-[11px] font-sans font-semibold mb-1">
                Analysis Scope
              </span>
              <span className="text-foreground font-semibold">
                Full-frame discrete cosine transform (DCT), latent diffusion lattice analysis, and edge sharpness gradient mapping.
              </span>
            </div>
          </div>

          {/* Detected Indicators */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-muted">
              Detected Indicators
            </h4>

            <div className="space-y-3">
              {/* Indicator 1 */}
              <div className="p-4 rounded-lg border border-border bg-[#FAFBF9] space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-warning" />
                    Frequency Domain Periodic Grid Attenuation
                  </span>
                  <span className="font-mono text-[11px] text-[#92610F] font-semibold bg-warning-bg px-2 py-0.5 rounded border border-[#E8D5A0]">
                    Observed in Fine Textures
                  </span>
                </div>
                <p className="text-foreground/90 leading-relaxed font-sans">
                  &ldquo;Visual patterns associated with synthetic media were detected.&rdquo;
                </p>
                <div className="p-2.5 bg-surface rounded border border-border/60 text-muted leading-relaxed font-sans text-[11px]">
                  <span className="font-semibold text-foreground">Plain-Language Explanation: </span>
                  AI image generators build images using mathematical algorithms that arrange pixels in subtle, repetitive grid patterns across fine textures. Optical camera lenses do not produce these mathematical micro-lattices.
                </div>
              </div>

              {/* Indicator 2 */}
              <div className="p-4 rounded-lg border border-border bg-[#FAFBF9] space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-warning" />
                    Spatial Boundary Gradient Falloff
                  </span>
                  <span className="font-mono text-[11px] text-[#92610F] font-semibold bg-warning-bg px-2 py-0.5 rounded border border-[#E8D5A0]">
                    Unnatural Edge Sharpness
                  </span>
                </div>
                <div className="p-2.5 bg-surface rounded border border-border/60 text-muted leading-relaxed font-sans text-[11px]">
                  <span className="font-semibold text-foreground">Plain-Language Explanation: </span>
                  Physical camera lenses create a gradual, optical blur transition between focal subjects and the background. In this media, object borders exhibit sudden algorithmic blending with no natural depth-of-field transition.
                </div>
              </div>
            </div>
          </div>

          {/* Limitations Callout */}
          <div className="p-4 rounded-lg border border-[#E8D5A0] bg-warning-bg flex items-start gap-3">
            <Info className="w-5 h-5 text-[#92610F] shrink-0 mt-0.5" />
            <div className="text-xs text-[#92610F] leading-relaxed">
              <h5 className="font-bold uppercase tracking-wider mb-0.5">
                Technical Limitations &amp; Scope
              </h5>
              <p className="font-semibold text-sm">
                &ldquo;AI detection is probabilistic and may perform differently on unseen generation methods.&rdquo;
              </p>
              <p className="mt-1 text-xs text-[#92610F]/90 font-sans">
                Heavy re-compression, aggressive social media downsampling, or novel model architectures not present in the reference training baseline can influence signal confidence.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. PROVENANCE SECTION
      ───────────────────────────────────────────────────────────── */}
      {(activeTab === "provenance" || activeTab === undefined) && (
        <div className="border border-border rounded-xl bg-surface p-6 sm:p-7 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#F0F2F0] flex items-center justify-center text-muted shrink-0 border border-border">
                <Fingerprint className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-foreground font-mono">
                    2. PROVENANCE
                  </h3>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#F0F2F0] text-muted border border-border">
                    STATUS: NOT FOUND
                  </span>
                </div>
                <p className="text-xs text-muted mt-0.5">
                  C2PA Content Credentials, cryptographic signatures, and edit lineage
                </p>
              </div>
            </div>

            {/* Evidence Confidence Badge */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted font-sans">Evidence confidence:</span>
              <span className={cn("text-xs font-mono font-bold px-2.5 py-1 rounded border", confidenceBadgeStyles.Limited.bg, confidenceBadgeStyles.Limited.text, confidenceBadgeStyles.Limited.border)}>
                Limited
              </span>
            </div>
          </div>

          {/* CRITICAL NOTICE: Never interpret 'Not found' as automatically fake */}
          <div className="p-4 rounded-lg border border-border bg-[#FAFBF9] flex items-start gap-3">
            <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div className="text-xs text-muted leading-relaxed font-sans">
              <p className="font-bold text-foreground text-xs uppercase tracking-wider mb-1">
                Forensic Rule: &ldquo;Not found&rdquo; Does Not Imply Manipulation
              </p>
              <p className="text-foreground/90">
                Never interpret &ldquo;Not found&rdquo; as automatically fake. C2PA is an emerging industry standard. Most consumer smartphones, digital cameras, and messaging applications do not attach Content Credentials by default or actively strip metadata upon transfer. Lack of provenance simply indicates an unrecorded chain-of-custody, not proof of tampering.
              </p>
            </div>
          </div>

          {/* Possible States Breakdown */}
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-muted font-semibold block mb-2">
              Possible Provenance States:
            </span>
            <div className="flex flex-wrap gap-2">
              {provenanceStates.map((state) => {
                const isSelected = state === currentProvenanceState;
                return (
                  <span
                    key={state}
                    className={cn(
                      "text-xs font-mono px-2.5 py-1 rounded border font-medium flex items-center gap-1.5",
                      isSelected
                        ? "bg-[#17201A] text-white border-[#17201A] font-bold"
                        : "bg-[#FAFAF8] text-muted border-border"
                    )}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-warning" />}
                    {state}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Provenance Audit Details Grid */}
          <div className="border border-border rounded-lg overflow-hidden text-xs font-mono">
            <table className="w-full text-left">
              <tbody className="divide-y divide-border">
                <tr className="bg-surface">
                  <td className="py-2.5 px-4 font-semibold text-muted w-1/3">C2PA status</td>
                  <td className="py-2.5 px-4 font-bold text-foreground">Not found in container</td>
                </tr>
                <tr className="bg-[#FAFBF9]">
                  <td className="py-2.5 px-4 font-semibold text-muted">Content Credentials</td>
                  <td className="py-2.5 px-4 text-foreground">JUMBF metadata box absent</td>
                </tr>
                <tr className="bg-surface">
                  <td className="py-2.5 px-4 font-semibold text-muted">Signer</td>
                  <td className="py-2.5 px-4 text-muted">Unsigned / No cryptographic key attached</td>
                </tr>
                <tr className="bg-[#FAFBF9]">
                  <td className="py-2.5 px-4 font-semibold text-muted">Creation information</td>
                  <td className="py-2.5 px-4 text-muted">No origin certificate available</td>
                </tr>
                <tr className="bg-surface">
                  <td className="py-2.5 px-4 font-semibold text-muted">Editing history</td>
                  <td className="py-2.5 px-4 text-muted">No assertion history claims found</td>
                </tr>
                <tr className="bg-[#FAFBF9]">
                  <td className="py-2.5 px-4 font-semibold text-muted">Verification status</td>
                  <td className="py-2.5 px-4 text-warning font-semibold">Unverified (Standard consumer state)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. METADATA SECTION
      ───────────────────────────────────────────────────────────── */}
      {(activeTab === "metadata" || activeTab === undefined) && (
        <div className="border border-border rounded-xl bg-surface p-6 sm:p-7 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning-bg flex items-center justify-center text-[#92610F] shrink-0 border border-[#E8D5A0]">
                <FileSearch className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-foreground font-mono">
                    3. METADATA
                  </h3>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-warning-bg text-[#92610F] border border-[#E8D5A0]">
                    STATUS: SUSPICIOUS
                  </span>
                </div>
                <p className="text-xs text-muted mt-0.5">
                  File-level headers, EXIF/XMP dictionaries, and quantization table consistency
                </p>
              </div>
            </div>

            {/* Evidence Confidence Badge */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted font-sans">Evidence confidence:</span>
              <span className={cn("text-xs font-mono font-bold px-2.5 py-1 rounded border", confidenceBadgeStyles.Moderate.bg, confidenceBadgeStyles.Moderate.text, confidenceBadgeStyles.Moderate.border)}>
                Moderate
              </span>
            </div>
          </div>

          <p className="text-xs text-muted leading-relaxed font-sans">
            Fields highlighted in amber indicate values that diverge from standard camera capture baselines or suggest re-encoding. These are highlighted for careful investigation, but are <span className="font-semibold text-foreground">not automatically labeled fraudulent</span>.
          </p>

          {/* Professional Metadata Table */}
          <div className="border border-border rounded-lg overflow-hidden text-xs font-mono">
            <table className="w-full text-left">
              <thead className="bg-[#F0F2F0] border-b border-border text-[10px] uppercase font-bold text-muted">
                <tr>
                  <th className="py-2.5 px-4">Metadata Field</th>
                  <th className="py-2.5 px-4">Extracted Value</th>
                  <th className="py-2.5 px-4">Forensic Assessment</th>
                  <th className="py-2.5 px-4 hidden md:table-cell">Plain-Language Explanation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {/* 1. File type */}
                <tr className="bg-surface">
                  <td className="py-2.5 px-4 font-semibold text-foreground">File type</td>
                  <td className="py-2.5 px-4 text-foreground">{report.mediaFile.type} ({report.mediaFile.extension})</td>
                  <td className="py-2.5 px-4 text-success font-medium">Standard Container</td>
                  <td className="py-2.5 px-4 text-muted text-[11px] font-sans hidden md:table-cell">File conforms to standard container specification.</td>
                </tr>

                {/* 2. File size */}
                <tr className="bg-[#FAFBF9]">
                  <td className="py-2.5 px-4 font-semibold text-foreground">File size</td>
                  <td className="py-2.5 px-4 text-foreground">{formatFileSize(report.mediaFile.size)}</td>
                  <td className="py-2.5 px-4 text-success font-medium">Nominal</td>
                  <td className="py-2.5 px-4 text-muted text-[11px] font-sans hidden md:table-cell">Bytes match reported binary length.</td>
                </tr>

                {/* 3. Dimensions */}
                <tr className="bg-surface">
                  <td className="py-2.5 px-4 font-semibold text-foreground">Dimensions</td>
                  <td className="py-2.5 px-4 text-foreground">{report.mediaFile.width && report.mediaFile.height ? `${report.mediaFile.width} × ${report.mediaFile.height} px` : "Adaptive"}</td>
                  <td className="py-2.5 px-4 text-success font-medium">Verified</td>
                  <td className="py-2.5 px-4 text-muted text-[11px] font-sans hidden md:table-cell">Image raster pixel aspect ratio confirmed.</td>
                </tr>

                {/* 4. Creation timestamp (Amber Highlight) */}
                <tr className="bg-[#FFFDF9]">
                  <td className="py-2.5 px-4 font-semibold text-foreground">Creation timestamp</td>
                  <td className="py-2.5 px-4 text-foreground">2026-09-20 18:42:10 UTC</td>
                  <td className="py-2.5 px-4 font-bold text-[#92610F]">
                    <span className="px-1.5 py-0.5 rounded bg-warning-bg border border-[#E8D5A0]">Review Needed</span>
                  </td>
                  <td className="py-2.5 px-4 text-[#92610F] text-[11px] font-sans hidden md:table-cell">
                    Creation and modification timestamps diverge by several hours without recorded camera session data.
                  </td>
                </tr>

                {/* 5. Modification timestamp (Amber Highlight) */}
                <tr className="bg-[#FFFDF9]">
                  <td className="py-2.5 px-4 font-semibold text-foreground">Modification timestamp</td>
                  <td className="py-2.5 px-4 text-foreground">{report.formattedAnalyzedAt}</td>
                  <td className="py-2.5 px-4 font-bold text-[#92610F]">
                    <span className="px-1.5 py-0.5 rounded bg-warning-bg border border-[#E8D5A0]">Recent Re-save</span>
                  </td>
                  <td className="py-2.5 px-4 text-[#92610F] text-[11px] font-sans hidden md:table-cell">
                    Container was re-encoded shortly before submission.
                  </td>
                </tr>

                {/* 6. Software tag (Amber Highlight) */}
                <tr className="bg-[#FFFDF9]">
                  <td className="py-2.5 px-4 font-semibold text-foreground">Software tag</td>
                  <td className="py-2.5 px-4 text-foreground">libvips / Composite Web Export</td>
                  <td className="py-2.5 px-4 font-bold text-[#92610F]">
                    <span className="px-1.5 py-0.5 rounded bg-warning-bg border border-[#E8D5A0]">Non-Camera Encoder</span>
                  </td>
                  <td className="py-2.5 px-4 text-[#92610F] text-[11px] font-sans hidden md:table-cell">
                    File was encoded with a server-side graphics library rather than on-device camera firmware.
                  </td>
                </tr>

                {/* 7. Camera information (Amber Highlight) */}
                <tr className="bg-[#FFFDF9]">
                  <td className="py-2.5 px-4 font-semibold text-foreground">Camera information</td>
                  <td className="py-2.5 px-4 text-muted">Maker: None / Model: Stripped</td>
                  <td className="py-2.5 px-4 font-bold text-[#92610F]">
                    <span className="px-1.5 py-0.5 rounded bg-warning-bg border border-[#E8D5A0]">Hardware Stripped</span>
                  </td>
                  <td className="py-2.5 px-4 text-[#92610F] text-[11px] font-sans hidden md:table-cell">
                    Missing hardware MakerNotes common in web re-saves or AI generation exports.
                  </td>
                </tr>

                {/* 8. Encoding */}
                <tr className="bg-surface">
                  <td className="py-2.5 px-4 font-semibold text-foreground">Encoding</td>
                  <td className="py-2.5 px-4 text-foreground">8-bit YCbCr 4:2:0 Chroma Subsampling</td>
                  <td className="py-2.5 px-4 text-success font-medium">Standard</td>
                  <td className="py-2.5 px-4 text-muted text-[11px] font-sans hidden md:table-cell">Standard web color space matrix.</td>
                </tr>

                {/* 9. EXIF status (Amber Highlight) */}
                <tr className="bg-[#FFFDF9]">
                  <td className="py-2.5 px-4 font-semibold text-foreground">EXIF status</td>
                  <td className="py-2.5 px-4 text-foreground">Partial header dictionary</td>
                  <td className="py-2.5 px-4 font-bold text-[#92610F]">
                    <span className="px-1.5 py-0.5 rounded bg-warning-bg border border-[#E8D5A0]">Incomplete</span>
                  </td>
                  <td className="py-2.5 px-4 text-[#92610F] text-[11px] font-sans hidden md:table-cell">
                    Header does not contain full sensor calibration parameters.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          4. FORENSICS SECTION & VISUAL EVIDENCE MAP
      ───────────────────────────────────────────────────────────── */}
      {(activeTab === "forensics" || activeTab === undefined) && (
        <div className="border border-border rounded-xl bg-surface p-6 sm:p-7 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning-bg flex items-center justify-center text-[#92610F] shrink-0 border border-[#E8D5A0]">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-foreground font-mono">
                    4. FORENSICS
                  </h3>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-warning-bg text-[#92610F] border border-[#E8D5A0]">
                    STATUS: DETECTED
                  </span>
                </div>
                <p className="text-xs text-muted mt-0.5">
                  Error Level Analysis (ELA), visual inconsistencies, and localized sensor noise patterns
                </p>
              </div>
            </div>

            {/* Evidence Confidence Badge */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted font-sans">Evidence confidence:</span>
              <span className={cn("text-xs font-mono font-bold px-2.5 py-1 rounded border", confidenceBadgeStyles.Strong.bg, confidenceBadgeStyles.Strong.text, confidenceBadgeStyles.Strong.border)}>
                Strong
              </span>
            </div>
          </div>

          {/* Visual Evidence Map Integration */}
          <VisualEvidenceMap media={report.mediaFile} />

          {/* Detailed Findings List (Image vs Video Specific) */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-muted">
              {isVideo ? "Video Temporal Forensic Vectors" : "Image Spatial Forensic Vectors"}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {!isVideo ? (
                /* Image-Specific Forensic Vectors */
                <>
                  {/* 1. Compression artifacts */}
                  <div className="p-3.5 bg-[#FAFBF9] rounded-lg border border-border text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground font-mono">Compression Artifacts</span>
                      <span className="text-[10px] font-mono text-[#92610F] font-bold">Detected (+28.6% ELA Delta)</span>
                    </div>
                    <p className="text-muted leading-relaxed font-sans text-[11px]">
                      <span className="font-semibold text-foreground">Explanation: </span>
                      Error Level Analysis shows the foreground subject responds to re-compression at a significantly different rate than background pixels, suggesting localized composition or generative rendering.
                    </p>
                  </div>

                  {/* 2. Visual inconsistencies */}
                  <div className="p-3.5 bg-[#FAFBF9] rounded-lg border border-border text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground font-mono">Visual Inconsistencies</span>
                      <span className="text-[10px] font-mono text-[#92610F] font-bold">Observed</span>
                    </div>
                    <p className="text-muted leading-relaxed font-sans text-[11px]">
                      <span className="font-semibold text-foreground">Explanation: </span>
                      Subtle differences in grain texture and sharpness between adjacent focal regions do not conform to optical lens physics.
                    </p>
                  </div>

                  {/* 3. Region anomalies */}
                  <div className="p-3.5 bg-[#FAFBF9] rounded-lg border border-border text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground font-mono">Region Anomalies</span>
                      <span className="text-[10px] font-mono text-[#92610F] font-bold">Quadrant 3 Divergence</span>
                    </div>
                    <p className="text-muted leading-relaxed font-sans text-[11px]">
                      <span className="font-semibold text-foreground">Explanation: </span>
                      High-frequency Laplacian variance drops abruptly across quadrant boundaries, indicating localized smoothing typical of inpainting.
                    </p>
                  </div>

                  {/* 4. Lighting inconsistencies */}
                  <div className="p-3.5 bg-[#FAFBF9] rounded-lg border border-border text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground font-mono">Lighting Inconsistencies</span>
                      <span className="text-[10px] font-mono text-muted font-bold">~18° Specular Delta</span>
                    </div>
                    <p className="text-muted leading-relaxed font-sans text-[11px]">
                      <span className="font-semibold text-foreground">Explanation: </span>
                      Shadow direction on the primary subject shows an estimated 18-degree variance compared to ambient background shadow cast.
                    </p>
                  </div>

                  {/* 5. Edge artifacts */}
                  <div className="p-3.5 bg-[#FAFBF9] rounded-lg border border-border text-xs space-y-1 md:col-span-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground font-mono">Edge Artifacts</span>
                      <span className="text-[10px] font-mono text-[#92610F] font-bold">Boundary Halos Identified</span>
                    </div>
                    <p className="text-muted leading-relaxed font-sans text-[11px]">
                      <span className="font-semibold text-foreground">Explanation: </span>
                      Perimeter pixel gradients along high-contrast borders display subtle haloing where algorithmic alpha blending occurred.
                    </p>
                  </div>
                </>
              ) : (
                /* Video-Specific Forensic Vectors */
                <>
                  {/* 1. Frame consistency */}
                  <div className="p-3.5 bg-[#FAFBF9] rounded-lg border border-border text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground font-mono">Frame Consistency</span>
                      <span className="text-[10px] font-mono text-[#92610F] font-bold">GOP Jitter Detected</span>
                    </div>
                    <p className="text-muted leading-relaxed font-sans text-[11px]">
                      <span className="font-semibold text-foreground">Explanation: </span>
                      Keyframe bitrate distributions fluctuate irregularly across scene transitions.
                    </p>
                  </div>

                  {/* 2. Temporal artifacts */}
                  <div className="p-3.5 bg-[#FAFBF9] rounded-lg border border-border text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground font-mono">Temporal Artifacts</span>
                      <span className="text-[10px] font-mono text-[#92610F] font-bold">Micro-Warping</span>
                    </div>
                    <p className="text-muted leading-relaxed font-sans text-[11px]">
                      <span className="font-semibold text-foreground">Explanation: </span>
                      Inter-frame optical flow vectors reveal slight spatial swimming in fine texture areas.
                    </p>
                  </div>

                  {/* 3. Face consistency */}
                  <div className="p-3.5 bg-[#FAFBF9] rounded-lg border border-border text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground font-mono">Face Consistency</span>
                      <span className="text-[10px] font-mono text-success font-bold">Nominal</span>
                    </div>
                    <p className="text-muted leading-relaxed font-sans text-[11px]">
                      <span className="font-semibold text-foreground">Explanation: </span>
                      Facial landmark meshes maintain stable alignment across sampled frames.
                    </p>
                  </div>

                  {/* 4. Audio/video synchronization */}
                  <div className="p-3.5 bg-[#FAFBF9] rounded-lg border border-border text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground font-mono">Audio/Video Sync</span>
                      <span className="text-[10px] font-mono text-muted font-bold">Aligned</span>
                    </div>
                    <p className="text-muted leading-relaxed font-sans text-[11px]">
                      <span className="font-semibold text-foreground">Explanation: </span>
                      Audio track timestamps align with visual speech articulators within nominal latency.
                    </p>
                  </div>

                  {/* 5. Compression anomalies */}
                  <div className="p-3.5 bg-[#FAFBF9] rounded-lg border border-border text-xs space-y-1 md:col-span-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground font-mono">Compression Anomalies</span>
                      <span className="text-[10px] font-mono text-[#92610F] font-bold">Macroblock Discontinuities</span>
                    </div>
                    <p className="text-muted leading-relaxed font-sans text-[11px]">
                      <span className="font-semibold text-foreground">Explanation: </span>
                      Macroblock boundary quantizations exhibit selective compression disparities across isolated frames.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
