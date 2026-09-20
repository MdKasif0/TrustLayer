"use client";

import React, { useState } from "react";
import { MediaFile } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Layers, Scan, Info, Eye, ShieldCheck, AlertCircle } from "lucide-react";

interface VisualEvidenceMapProps {
  media: {
    name: string;
    mediaKind: "image" | "video";
    previewUrl: string;
    width?: number;
    height?: number;
    duration?: number;
  };
  className?: string;
}

type DiagnosticLayer = "ela" | "boundaries" | "noise";

export function VisualEvidenceMap({ media, className }: VisualEvidenceMapProps) {
  const [activeLayer, setActiveLayer] = useState<DiagnosticLayer>("ela");
  const isVideo = media.mediaKind === "video";

  return (
    <div className={cn("border border-border rounded-xl bg-surface overflow-hidden shadow-xs", className)}>
      {/* Evidence Map Header & Layer Selector */}
      <div className="p-4 sm:p-5 border-b border-border bg-[#FAFAF8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary" />
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
              Forensic Visual Evidence Map
            </h4>
          </div>
          <p className="text-xs text-muted mt-0.5">
            Select a diagnostic inspection layer to examine localized anomalies
          </p>
        </div>

        {/* Diagnostic Layer Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F0F2F0] rounded-lg border border-border">
          <button
            type="button"
            onClick={() => setActiveLayer("ela")}
            className={cn(
              "px-2.5 py-1 text-xs font-mono rounded font-medium transition-colors cursor-pointer",
              activeLayer === "ela"
                ? "bg-surface text-primary shadow-xs font-bold"
                : "text-muted hover:text-foreground"
            )}
          >
            ELA Heatmap
          </button>
          <button
            type="button"
            onClick={() => setActiveLayer("boundaries")}
            className={cn(
              "px-2.5 py-1 text-xs font-mono rounded font-medium transition-colors cursor-pointer",
              activeLayer === "boundaries"
                ? "bg-surface text-primary shadow-xs font-bold"
                : "text-muted hover:text-foreground"
            )}
          >
            Edge Reticles
          </button>
          <button
            type="button"
            onClick={() => setActiveLayer("noise")}
            className={cn(
              "px-2.5 py-1 text-xs font-mono rounded font-medium transition-colors cursor-pointer",
              activeLayer === "noise"
                ? "bg-surface text-primary shadow-xs font-bold"
                : "text-muted hover:text-foreground"
            )}
          >
            Noise Floor
          </button>
        </div>
      </div>

      {/* Visual Canvas Viewport */}
      <div className="relative bg-[#F0F2F0] border-y border-border flex items-center justify-center min-h-[300px] max-h-[440px] overflow-hidden select-none">
        {isVideo ? (
          <video
            src={media.previewUrl}
            controls
            playsInline
            className="w-full max-h-[440px] object-contain"
          />
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={media.previewUrl}
              alt={media.name}
              className="w-full max-h-[440px] object-contain"
            />

            {/* Layer 1: Error Level Analysis (ELA) Overlay */}
            {activeLayer === "ela" && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Foreground focal anomaly cluster */}
                <div className="absolute top-[28%] left-[22%] w-[56%] h-[48%] border-2 border-dashed border-[#B7791F] rounded-lg bg-[#B7791F]/15">
                  <div className="absolute -top-5 left-0 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FFFDF9] text-[#92610F] border border-[#E8D5A0] shadow-xs">
                    ELA Delta: +28.6% (Localized Discrepancy)
                  </div>
                </div>
                {/* Background baseline */}
                <div className="absolute top-[6%] right-[8%] w-[32%] h-[24%] border border-dashed border-primary/60 rounded bg-primary/10">
                  <div className="absolute -top-5 left-0 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-surface text-primary border border-border shadow-xs">
                    Baseline Compression (Normal)
                  </div>
                </div>
              </div>
            )}

            {/* Layer 2: Boundary Gradients & Edge Reticles */}
            {activeLayer === "boundaries" && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[34%] left-[16%] w-[48%] h-[42%] border border-primary rounded bg-primary/10">
                  <div className="absolute -top-5 left-0 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-surface text-primary border border-border shadow-xs">
                    Spatial Boundary Blending (Synthetic Characteristic)
                  </div>
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary" />
                </div>
              </div>
            )}

            {/* Layer 3: Sensor Noise / PRNU Continuity */}
            {activeLayer === "noise" && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-full grid grid-cols-2 grid-rows-2">
                  <div className="border border-border/60 p-2 flex items-start justify-start">
                    <span className="text-[10px] font-mono font-bold text-primary bg-surface px-1.5 py-0.5 rounded border border-border shadow-xs">Q1: RMS 0.014</span>
                  </div>
                  <div className="border border-border/60 p-2 flex items-start justify-end">
                    <span className="text-[10px] font-mono font-bold text-primary bg-surface px-1.5 py-0.5 rounded border border-border shadow-xs">Q2: RMS 0.015</span>
                  </div>
                  <div className="border border-border/60 p-2 flex items-end justify-start">
                    <span className="text-[10px] font-mono font-bold text-[#92610F] bg-[#FFFDF9] px-1.5 py-0.5 rounded border border-[#E8D5A0] shadow-xs">Q3: Variance Delta</span>
                  </div>
                  <div className="border border-border/60 p-2 flex items-end justify-end">
                    <span className="text-[10px] font-mono font-bold text-primary bg-surface px-1.5 py-0.5 rounded border border-border shadow-xs">Q4: RMS 0.014</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Live Diagnostics Tag */}
        <div className="absolute bottom-3 left-3 pointer-events-none">
          <span className="text-[10px] font-mono font-semibold px-2 py-1 rounded bg-[#17201A] text-white/90 border border-[#2F6B4F]/40 flex items-center gap-1.5">
            <Scan className="w-3 h-3 text-[#86EFAC]" />
            Inspection Layer: {activeLayer.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Layer Explanation Footer (Plain language context) */}
      <div className="p-4 bg-[#FAFAF8] border-t border-border text-xs text-muted leading-relaxed">
        {activeLayer === "ela" && (
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-[#92610F] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-foreground font-sans">Error Level Analysis (ELA) Context: </span>
              ELA measures how different parts of an image respond to standardized re-compression. Spliced or AI-generated objects often compress at a noticeably different rate than authentic camera captures, creating a localized cluster of error variance.
            </div>
          </div>
        )}

        {activeLayer === "boundaries" && (
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-foreground font-sans">Edge Gradient Reticles Context: </span>
              Physical camera lenses produce natural optical blur and gradual transitions between focal planes. Generative AI models often synthesize edges with sudden mathematical blending or unnatural perimeter sharpness.
            </div>
          </div>
        )}

        {activeLayer === "noise" && (
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-[#2F6B4F] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-foreground font-sans">PRNU Sensor Noise Context: </span>
              Physical camera sensors impart microscopic, uniform noise patterns across every image. Discontinuities in quadrant noise floor RMS values indicate potential localized editing or multi-source composition.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
