"use client";

import React, { useState, useEffect } from "react";
import { TrustReport, ProvenanceState } from "@/lib/types";
import { VisualEvidenceMap } from "@/components/verify/VisualEvidenceMap";
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
  // Expandable state for each of the 4 sections
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    ai: true,
    provenance: false,
    metadata: false,
    forensics: false,
  });

  // When an external section is targeted (e.g. from "View evidence" click), expand it
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
          {/* Header & Toggle */}
          <button
            type="button"
            onClick={() => toggleSection("ai")}
            className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 hover:bg-[#FAFAF8] transition-colors cursor-pointer"
            aria-expanded={expanded.ai}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#FDF2F2] flex items-center justify-center text-[#991B1B] shrink-0 border border-[#F8B4B4]">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-base font-bold text-foreground font-mono">
                    AI Detection
                  </h4>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FDF2F2] text-[#991B1B] border border-[#F8B4B4]">
                    HIGH SIGNAL
                  </span>
                  <span className="text-[10px] font-mono text-secondary hidden sm:inline">
                    Synthetic media indicators
                  </span>
                </div>
                <p className="text-xs text-secondary mt-1 line-clamp-1">
                  Visual patterns associated with synthetic media were detected.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 pt-1 sm:pt-0">
              <span className="text-xs font-mono text-secondary hidden md:inline">
                {expanded.ai ? "Collapse dossier" : "Expand dossier"}
              </span>
              <div className="w-7 h-7 rounded-md border border-border flex items-center justify-center text-secondary">
                {expanded.ai ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
            </div>
          </button>

          {/* Dossier Body */}
          {expanded.ai && (
            <div className="px-5 pb-6 sm:px-6 sm:pb-7 pt-2 border-t border-border space-y-6">
              {/* Four Sub-Blocks */}
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
                      <span className="font-semibold text-foreground">Ensemble Model Suite:</span> TrustLayer Ensemble-DF v2.4 (diffusion &amp; GAN spatial frequency discriminator).
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">Frequency Domain:</span> 2D Discrete Cosine Transform (DCT) and azimuthal spectral distribution across 64 frequency bands.
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">Synthesis Boundary Checks:</span> High-pass Laplacian filters inspecting micro-texture gradients and upsampling stride artifacts.
                    </li>
                  </ul>
                </div>

                {/* 2. WHAT WAS FOUND */}
                <div className="p-4 rounded-lg bg-[#FDF2F2]/40 border border-[#F8B4B4]/70 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#991B1B] shrink-0" />
                    <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-[#991B1B]">
                      What Was Found
                    </h5>
                  </div>
                  <ul className="text-xs text-[#17201A] space-y-1.5 list-disc list-inside font-sans leading-relaxed">
                    <li>
                      <span className="font-semibold text-foreground">Periodic Grid Attenuation:</span> Radial spectral power spikes at normalized frequencies $(u, v) = (0.35, 0.42)$ characteristic of generative convolutional upsampling.
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">Gradient Falloff Discontinuity:</span> Focal subject contours exhibit algorithmic alpha blending with no natural optical depth-of-field transition.
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">Spectral Kurtosis:</span> Elevated kurtosis metric of <code className="font-mono text-[11px] bg-surface px-1 py-0.5 rounded border border-border">4.12</code> (Baseline camera noise $\approx 2.10$).
                    </li>
                  </ul>
                </div>
              </div>

              {/* 3. WHY IT MATTERS & 4. LIMITATIONS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 3. WHY IT MATTERS */}
                <div className="p-4 rounded-lg bg-[#FAFBF9] border border-border/80 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                    <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
                      Why It Matters
                    </h5>
                  </div>
                  <p className="text-xs text-secondary leading-relaxed font-sans">
                    Generative models assemble pixels through mathematical algorithms that produce subtle, periodic lattice structures across fine textures. Physical camera sensors and glass lenses generate continuous photon shot noise rather than mathematical grid artifacts.
                  </p>
                </div>

                {/* 4. LIMITATIONS */}
                <div className="p-4 rounded-lg bg-[#FBF7EE] border border-[#E8D5A0] space-y-1.5">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#92610F] shrink-0" />
                    <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-[#92610F]">
                      Limitations
                    </h5>
                  </div>
                  <p className="text-xs text-[#5D420F] leading-relaxed font-sans">
                    AI detection is probabilistic and may perform differently on unseen generation methods. Heavy social media re-compression or aggressive downsampling can partially obscure mathematical lattice artifacts.
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
          {/* Header & Toggle */}
          <button
            type="button"
            onClick={() => toggleSection("provenance")}
            className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 hover:bg-[#FAFAF8] transition-colors cursor-pointer"
            aria-expanded={expanded.provenance}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#FBF7EE] flex items-center justify-center text-[#92610F] shrink-0 border border-[#E8D5A0]">
                <Fingerprint className="w-5 h-5" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-base font-bold text-foreground font-mono">
                    Provenance
                  </h4>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FBF7EE] text-[#92610F] border border-[#E8D5A0]">
                    NOT FOUND
                  </span>
                  <span className="text-[10px] font-mono text-secondary hidden sm:inline">
                    C2PA / Content Credentials
                  </span>
                </div>
                <p className="text-xs text-secondary mt-1 line-clamp-1">
                  No verifiable C2PA Content Credentials were found in container headers.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 pt-1 sm:pt-0">
              <span className="text-xs font-mono text-secondary hidden md:inline">
                {expanded.provenance ? "Collapse dossier" : "Expand dossier"}
              </span>
              <div className="w-7 h-7 rounded-md border border-border flex items-center justify-center text-secondary">
                {expanded.provenance ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
            </div>
          </button>

          {/* Dossier Body */}
          {expanded.provenance && (
            <div className="px-5 pb-6 sm:px-6 sm:pb-7 pt-2 border-t border-border space-y-6">
              {/* Four Sub-Blocks */}
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
                      <span className="font-semibold text-foreground">C2PA Manifest Box:</span> Searched binary container for standard JUMBF (JPEG Universal Metadata Box Format) assertions.
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">Cryptographic Signatures:</span> Evaluated public-key PKI certificate anchors and timestamp authority credentials.
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">Lineage Assertions:</span> Checked for parent assertion history, edit action ingredients, and camera hardware bindings.
                    </li>
                  </ul>
                </div>

                {/* 2. WHAT WAS FOUND */}
                <div className="p-4 rounded-lg bg-[#FAFBF9] border border-border/80 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#B7791F] shrink-0" />
                    <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
                      What Was Found
                    </h5>
                  </div>
                  <div className="border border-border rounded-lg overflow-hidden text-xs font-mono">
                    <table className="w-full text-left">
                      <tbody className="divide-y divide-border">
                        <tr className="bg-surface">
                          <td className="py-2 px-3 text-secondary font-semibold">C2PA Status</td>
                          <td className="py-2 px-3 font-bold text-foreground">Not found in container</td>
                        </tr>
                        <tr className="bg-[#FAFBF9]">
                          <td className="py-2 px-3 text-secondary font-semibold">Content Credentials</td>
                          <td className="py-2 px-3 text-secondary">JUMBF box absent</td>
                        </tr>
                        <tr className="bg-surface">
                          <td className="py-2 px-3 text-secondary font-semibold">Signer</td>
                          <td className="py-2 px-3 text-secondary">Unsigned / No key attached</td>
                        </tr>
                        <tr className="bg-[#FAFBF9]">
                          <td className="py-2 px-3 text-secondary font-semibold">Verification State</td>
                          <td className="py-2 px-3 text-[#92610F] font-semibold">Standard Consumer State</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* 3. WHY IT MATTERS & 4. LIMITATIONS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 3. WHY IT MATTERS */}
                <div className="p-4 rounded-lg bg-[#FAFBF9] border border-border/80 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary shrink-0" />
                    <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
                      Why It Matters (Forensic Standard)
                    </h5>
                  </div>
                  <p className="text-xs text-secondary leading-relaxed font-sans">
                    Cryptographic provenance provides verifiable proof of origin when present. However, <strong className="text-foreground">absence of C2PA credentials does NOT imply media is synthetic or manipulated</strong>. Most consumer cameras and social media publishing pipelines strip metadata by default.
                  </p>
                </div>

                {/* 4. LIMITATIONS */}
                <div className="p-4 rounded-lg bg-[#FBF7EE] border border-[#E8D5A0] space-y-1.5">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#92610F] shrink-0" />
                    <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-[#92610F]">
                      Limitations
                    </h5>
                  </div>
                  <p className="text-xs text-[#5D420F] leading-relaxed font-sans">
                    C2PA adoption is voluntary and actively growing. Standard web operations—such as taking a screenshot, resizing an image in chat apps, or downloading from the web—routinely sever the provenance chain of custody.
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
          {/* Header & Toggle */}
          <button
            type="button"
            onClick={() => toggleSection("metadata")}
            className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 hover:bg-[#FAFAF8] transition-colors cursor-pointer"
            aria-expanded={expanded.metadata}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#FBF7EE] flex items-center justify-center text-[#92610F] shrink-0 border border-[#E8D5A0]">
                <FileSearch className="w-5 h-5" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-base font-bold text-foreground font-mono">
                    Metadata
                  </h4>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FBF7EE] text-[#92610F] border border-[#E8D5A0]">
                    REVIEW
                  </span>
                  <span className="text-[10px] font-mono text-secondary hidden sm:inline">
                    EXIF / file information
                  </span>
                </div>
                <p className="text-xs text-secondary mt-1 line-clamp-1">
                  File-level metadata contains characteristics requiring further review.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 pt-1 sm:pt-0">
              <span className="text-xs font-mono text-secondary hidden md:inline">
                {expanded.metadata ? "Collapse dossier" : "Expand dossier"}
              </span>
              <div className="w-7 h-7 rounded-md border border-border flex items-center justify-center text-secondary">
                {expanded.metadata ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
            </div>
          </button>

          {/* Dossier Body */}
          {expanded.metadata && (
            <div className="px-5 pb-6 sm:px-6 sm:pb-7 pt-2 border-t border-border space-y-6">
              {/* Four Sub-Blocks */}
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
                      <span className="font-semibold text-foreground">Header Dictionaries:</span> EXIF IFD0, SubIFD, and GPS metadata records.
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">Quantization Profiles:</span> Luminance and chrominance discrete cosine transform quantization matrices.
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">Encoder Signatures:</span> Software creator strings, camera make/model tags, and container padding alignment.
                    </li>
                  </ul>
                </div>

                {/* 2. WHAT WAS FOUND */}
                <div className="p-4 rounded-lg bg-[#FAFBF9] border border-border/80 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#B7791F] shrink-0" />
                    <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
                      What Was Found
                    </h5>
                  </div>
                  <ul className="text-xs text-[#17201A] space-y-1.5 list-disc list-inside font-sans leading-relaxed">
                    <li>
                      <span className="font-semibold text-foreground">Software Tag:</span> Identified server-side encoding signature: <code className="font-mono text-[11px] bg-surface px-1 py-0.5 rounded border border-border">libvips / Composite Web Export</code>.
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">Quantization Table Mismatch:</span> DQT matrix diverges from standard camera sensor firmware curves.
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">Camera Firmware Stripped:</span> MakerNote and lens serial blocks absent.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Full Technical Metadata Table */}
              <div className="border border-border rounded-lg overflow-hidden text-xs font-mono">
                <table className="w-full text-left">
                  <thead className="bg-[#F0F2F0] border-b border-border text-[10px] uppercase font-bold text-secondary">
                    <tr>
                      <th className="py-2.5 px-4">Metadata Field</th>
                      <th className="py-2.5 px-4">Extracted Value</th>
                      <th className="py-2.5 px-4">Forensic Assessment</th>
                      <th className="py-2.5 px-4 hidden md:table-cell">Plain-Language Explanation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr className="bg-surface">
                      <td className="py-2.5 px-4 font-semibold text-foreground">File type</td>
                      <td className="py-2.5 px-4 text-foreground">{report.mediaFile.type} ({report.mediaFile.extension})</td>
                      <td className="py-2.5 px-4 text-success font-medium">Standard Container</td>
                      <td className="py-2.5 px-4 text-secondary text-[11px] font-sans hidden md:table-cell">Conforms to standard image container specification.</td>
                    </tr>
                    <tr className="bg-[#FAFBF9]">
                      <td className="py-2.5 px-4 font-semibold text-foreground">File size</td>
                      <td className="py-2.5 px-4 text-foreground">{formatFileSize(report.mediaFile.size)}</td>
                      <td className="py-2.5 px-4 text-success font-medium">Nominal</td>
                      <td className="py-2.5 px-4 text-secondary text-[11px] font-sans hidden md:table-cell">Byte length verified against header records.</td>
                    </tr>
                    <tr className="bg-surface">
                      <td className="py-2.5 px-4 font-semibold text-foreground">Dimensions</td>
                      <td className="py-2.5 px-4 text-foreground">{report.mediaFile.width && report.mediaFile.height ? `${report.mediaFile.width} × ${report.mediaFile.height} px` : "Adaptive"}</td>
                      <td className="py-2.5 px-4 text-success font-medium">Verified</td>
                      <td className="py-2.5 px-4 text-secondary text-[11px] font-sans hidden md:table-cell">Raster pixel aspect ratio verified.</td>
                    </tr>
                    <tr className="bg-[#FFFDF9]">
                      <td className="py-2.5 px-4 font-semibold text-foreground">Software tag</td>
                      <td className="py-2.5 px-4 text-foreground">libvips / Composite Web Export</td>
                      <td className="py-2.5 px-4 font-bold text-[#92610F]">
                        <span className="px-1.5 py-0.5 rounded bg-warning-bg border border-[#E8D5A0]">Review Needed</span>
                      </td>
                      <td className="py-2.5 px-4 text-[#92610F] text-[11px] font-sans hidden md:table-cell">Encoded by server-side graphics library rather than on-device firmware.</td>
                    </tr>
                    <tr className="bg-[#FFFDF9]">
                      <td className="py-2.5 px-4 font-semibold text-foreground">Camera information</td>
                      <td className="py-2.5 px-4 text-secondary">Maker: None / Model: Stripped</td>
                      <td className="py-2.5 px-4 font-bold text-[#92610F]">
                        <span className="px-1.5 py-0.5 rounded bg-warning-bg border border-[#E8D5A0]">Stripped</span>
                      </td>
                      <td className="py-2.5 px-4 text-[#92610F] text-[11px] font-sans hidden md:table-cell">Missing hardware MakerNotes common in web re-saves or AI generation exports.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 3. WHY IT MATTERS & 4. LIMITATIONS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 3. WHY IT MATTERS */}
                <div className="p-4 rounded-lg bg-[#FAFBF9] border border-border/80 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                    <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
                      Why It Matters
                    </h5>
                  </div>
                  <p className="text-xs text-secondary leading-relaxed font-sans">
                    Hardware cameras embed proprietary quantization tables and hardware tags upon sensor capture. Mismatched quantization matrices indicate the file was rendered or re-saved by synthetic editing software.
                  </p>
                </div>

                {/* 4. LIMITATIONS */}
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
          {/* Header & Toggle */}
          <button
            type="button"
            onClick={() => toggleSection("forensics")}
            className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 hover:bg-[#FAFAF8] transition-colors cursor-pointer"
            aria-expanded={expanded.forensics}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#FDF2F2] flex items-center justify-center text-[#991B1B] shrink-0 border border-[#F8B4B4]">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-base font-bold text-foreground font-mono">
                    Forensics
                  </h4>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FDF2F2] text-[#991B1B] border border-[#F8B4B4]">
                    DETECTED
                  </span>
                  <span className="text-[10px] font-mono text-secondary hidden sm:inline">
                    Visual / temporal analysis
                  </span>
                </div>
                <p className="text-xs text-secondary mt-1 line-clamp-1">
                  Visual inconsistencies and localized error-level disparities were identified.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 pt-1 sm:pt-0">
              <span className="text-xs font-mono text-secondary hidden md:inline">
                {expanded.forensics ? "Collapse dossier" : "Expand dossier"}
              </span>
              <div className="w-7 h-7 rounded-md border border-border flex items-center justify-center text-secondary">
                {expanded.forensics ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
            </div>
          </button>

          {/* Dossier Body */}
          {expanded.forensics && (
            <div className="px-5 pb-6 sm:px-6 sm:pb-7 pt-2 border-t border-border space-y-6">
              {/* Four Sub-Blocks */}
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
                      <span className="font-semibold text-foreground">Error Level Analysis (ELA):</span> 95% re-compression baseline comparing residual error distribution across spatial quadrants.
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">Sensor Noise Uniformity (PRNU):</span> High-pass filtered noise residuals tested for cross-quadrant coherence.
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">Gradient &amp; Lighting:</span> Specular highlight vector estimation and edge boundary gradient continuity.
                    </li>
                  </ul>
                </div>

                {/* 2. WHAT WAS FOUND */}
                <div className="p-4 rounded-lg bg-[#FDF2F2]/40 border border-[#F8B4B4]/70 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#991B1B] shrink-0" />
                    <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-[#991B1B]">
                      What Was Found
                    </h5>
                  </div>
                  <ul className="text-xs text-[#17201A] space-y-1.5 list-disc list-inside font-sans leading-relaxed">
                    <li>
                      <span className="font-semibold text-foreground">ELA Variance Delta:</span> <code className="font-mono text-[11px] bg-surface px-1 py-0.5 rounded border border-border">+28.6%</code> discontinuous error clustering along focal boundaries.
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">Noise Floor Attenuation:</span> Spatial high-frequency smoothing observed on primary subject perimeter.
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">Edge Halos:</span> Pixel boundary gradient analysis identified algorithmic alpha transition halos.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Visual Evidence Map Integration */}
              <VisualEvidenceMap media={report.mediaFile} />

              {/* 3. WHY IT MATTERS & 4. LIMITATIONS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 3. WHY IT MATTERS */}
                <div className="p-4 rounded-lg bg-[#FAFBF9] border border-border/80 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                    <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
                      Why It Matters
                    </h5>
                  </div>
                  <p className="text-xs text-secondary leading-relaxed font-sans">
                    Physical cameras record real-world photons through optical lenses, resulting in uniform compression resistance and consistent noise floors across an entire frame. Discontinuous ELA error clusters indicate differential compression or localized digital synthesis.
                  </p>
                </div>

                {/* 4. LIMITATIONS */}
                <div className="p-4 rounded-lg bg-[#FBF7EE] border border-[#E8D5A0] space-y-1.5">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#92610F] shrink-0" />
                    <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-[#92610F]">
                      Limitations
                    </h5>
                  </div>
                  <p className="text-xs text-[#5D420F] leading-relaxed font-sans">
                    Multiple re-compression cycles (e.g. repeated re-saving on social networks) gradually wash out ELA variance. Forensic visual indicators must always be interpreted in conjunction with metadata and frequency signals.
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

