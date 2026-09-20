"use client";

import React from "react";
import { MediaFile } from "@/lib/types";
import { formatFileSize, formatDuration } from "@/lib/services/fileInspector";
import {
  FileImage,
  Film,
  Scan,
  ShieldCheck,
  Hash,
  Maximize2,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaInspectionVisualProps {
  media: MediaFile;
  currentStageIndex: number;
}

export function MediaInspectionVisual({ media, currentStageIndex }: MediaInspectionVisualProps) {
  const isVideo = media.mediaKind === "video";

  // Representative filmstrip frames for video
  const representativeFrames = [
    { timestamp: "00:00.0", label: "Keyframe 01", status: "Sampled" },
    { timestamp: "00:02.5", label: "Inter-frame A", status: "Verified" },
    { timestamp: "00:05.0", label: "Inter-frame B", status: "Evaluating" },
    { timestamp: "00:07.5", label: "Inter-frame C", status: "Pending" },
    { timestamp: "00:10.0", label: "Keyframe 02", status: "Pending" },
  ];

  return (
    <div className="border border-border rounded-xl bg-surface overflow-hidden shadow-xs">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border bg-[#FAFAF8] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-soft-green flex items-center justify-center text-primary shrink-0 border border-[#D5ECDB]">
            {isVideo ? <Film className="w-3.5 h-3.5" /> : <FileImage className="w-3.5 h-3.5" />}
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
            Target Inspection Stream
          </span>
        </div>
        <span className="text-[11px] font-mono text-muted flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          Live Forensic Buffer
        </span>
      </div>

      {/* Media Inspection Canvas */}
      <div className="relative bg-[#111613] flex items-center justify-center min-h-[320px] max-h-[460px] overflow-hidden select-none">
        {isVideo ? (
          <video
            src={media.previewUrl}
            controls
            playsInline
            className="w-full max-h-[460px] object-contain opacity-90"
          />
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={media.previewUrl}
              alt={media.name}
              className="w-full max-h-[460px] object-contain opacity-95"
            />

            {/* Subtle Analysis-Region Indicators (Strictly Non-Neon, Precision Cybersecurity Grid) */}
            {/* Region 01: High-Frequency Spectrum */}
            <div className="absolute top-[12%] right-[10%] w-[34%] h-[32%] border border-dashed border-[#86EFAC]/70 rounded pointer-events-none bg-[#14532D]/10">
              <div className="absolute -top-5 left-0 text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-[#17201A]/90 text-[#86EFAC] border border-white/15">
                REG-01: Frequency Spectrum
              </div>
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#86EFAC]" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#86EFAC]" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#86EFAC]" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#86EFAC]" />
            </div>

            {/* Region 02: Spatial Boundary Reticle */}
            <div className="absolute top-[38%] left-[20%] w-[42%] h-[38%] border border-[#86EFAC]/60 rounded pointer-events-none bg-[#2F6B4F]/10">
              <div className="absolute -top-5 left-0 text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-[#17201A]/90 text-[#86EFAC] border border-white/15">
                REG-02: Spatial Boundary
              </div>
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#86EFAC]" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#86EFAC]" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#86EFAC]" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#86EFAC]" />
            </div>

            {/* Region 03: PRNU Noise Floor */}
            <div className="absolute bottom-[10%] left-[8%] w-[28%] h-[24%] border border-dashed border-[#C4D7C7]/50 rounded pointer-events-none bg-[#17201A]/20">
              <div className="absolute -bottom-5 left-0 text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-[#17201A]/90 text-[#C4D7C7] border border-white/15">
                REG-03: Noise Consistency
              </div>
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#C4D7C7]" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#C4D7C7]" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#C4D7C7]" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#C4D7C7]" />
            </div>
          </div>
        )}

        {/* Scan Status Overlay Badges */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2 pointer-events-none">
          <span className="text-[10px] font-mono px-2 py-1 rounded bg-black/80 text-white/90 border border-white/15 backdrop-blur-xs flex items-center gap-1.5">
            <Scan className="w-3 h-3 text-[#86EFAC]" />
            Active Stage {currentStageIndex + 1} of 6
          </span>
        </div>
      </div>

      {/* Video Filmstrip of Representative Frames */}
      {isVideo && (
        <div className="p-3.5 border-t border-border bg-[#FBFDFB]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-primary" />
              Temporal Frame Sequence
            </span>
            <span className="text-[10px] font-mono text-muted">5 keyframes sampled</span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {representativeFrames.map((frame, idx) => (
              <div
                key={idx}
                className={cn(
                  "border rounded p-1.5 text-center transition-colors",
                  idx === 0 || idx === 1
                    ? "border-[#B8DFC6] bg-soft-green/60"
                    : idx === 2
                    ? "border-primary bg-soft-green ring-1 ring-primary/30"
                    : "border-border bg-surface"
                )}
              >
                <div className="h-9 rounded bg-[#17201A]/10 flex items-center justify-center text-[10px] font-mono text-foreground font-semibold mb-1">
                  {frame.timestamp}
                </div>
                <p className="text-[9px] font-mono text-muted truncate">{frame.label}</p>
                <span
                  className={cn(
                    "text-[8px] font-mono font-bold uppercase block mt-0.5",
                    idx === 2 ? "text-primary" : idx < 2 ? "text-success" : "text-muted"
                  )}
                >
                  {idx === 2 ? "SCANNING" : idx < 2 ? "VERIFIED" : "QUEUED"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Target Media Metadata Summary */}
      <div className="p-4 border-t border-border bg-surface">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div>
            <span className="text-muted block text-[10px] font-sans">Filename</span>
            <span className="font-semibold text-foreground truncate block" title={media.name}>
              {media.name}
            </span>
          </div>
          <div>
            <span className="text-muted block text-[10px] font-sans">Container</span>
            <span className="font-semibold text-foreground">
              {media.extension} · {formatFileSize(media.size)}
            </span>
          </div>
          <div>
            <span className="text-muted block text-[10px] font-sans">Dimensions</span>
            <span className="font-semibold text-foreground">
              {media.width && media.height ? `${media.width} × ${media.height}` : "Adaptive"}
              {media.duration ? ` · ${formatDuration(media.duration)}` : ""}
            </span>
          </div>
          <div>
            <span className="text-muted block text-[10px] font-sans">SHA-256 Digest</span>
            <span className="text-foreground/80 truncate block text-[11px]" title={media.hashSha256}>
              {media.hashSha256 ? `${media.hashSha256.slice(0, 12)}…` : "Verified"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
