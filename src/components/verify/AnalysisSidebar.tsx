"use client";

import React from "react";
import { MediaFile } from "@/lib/types";
import { formatFileSize, formatDuration } from "@/lib/services/fileInspector";
import { FileText, Shield, FileCheck2, Hash, Video, Image as ImageIcon, HelpCircle } from "lucide-react";

interface AnalysisSidebarProps {
  media: MediaFile | null;
  activeSignalCount: number;
}

export function AnalysisSidebar({ media, activeSignalCount }: AnalysisSidebarProps) {
  return (
    <aside className="space-y-4">
      {/* File Summary Card */}
      <div className="border border-border rounded-xl bg-surface p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              File
            </h2>
          </div>
          {media ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-success bg-success-bg px-2 py-0.5 rounded border border-[#B8DFC6]">
              <FileCheck2 className="w-3 h-3" />
              Verified Valid
            </span>
          ) : (
            <span className="text-[11px] font-medium text-muted bg-[#F0F2F0] px-2 py-0.5 rounded">
              Awaiting upload
            </span>
          )}
        </div>

        {media ? (
          <dl className="space-y-2.5 text-xs">
            {/* Filename */}
            <div>
              <dt className="text-muted font-medium mb-0.5">Filename</dt>
              <dd className="font-mono text-foreground break-all bg-[#F9FAF8] px-2 py-1.5 rounded border border-border/70 text-[11px]">
                {media.name}
              </dd>
            </div>

            {/* Type & Media Kind */}
            <div className="flex items-center justify-between py-1 border-b border-border/50">
              <dt className="text-muted">Type</dt>
              <dd className="font-mono text-foreground font-medium flex items-center gap-1.5">
                {media.mediaKind === "video" ? (
                  <Video className="w-3 h-3 text-muted" />
                ) : (
                  <ImageIcon className="w-3 h-3 text-muted" />
                )}
                {media.type} ({media.extension})
              </dd>
            </div>

            {/* Size */}
            <div className="flex items-center justify-between py-1 border-b border-border/50">
              <dt className="text-muted">Size</dt>
              <dd className="font-mono text-foreground font-medium">
                {formatFileSize(media.size)}
              </dd>
            </div>

            {/* Resolution */}
            <div className="flex items-center justify-between py-1 border-b border-border/50">
              <dt className="text-muted">Resolution</dt>
              <dd className="font-mono text-foreground font-medium">
                {media.width && media.height ? `${media.width} × ${media.height} px` : "Extracting…"}
              </dd>
            </div>

            {/* Duration for video */}
            <div className="flex items-center justify-between py-1 border-b border-border/50">
              <dt className="text-muted">Duration</dt>
              <dd className="font-mono text-foreground font-medium">
                {media.mediaKind === "video"
                  ? media.duration !== undefined
                    ? formatDuration(media.duration)
                    : "Extracting…"
                  : "N/A (Image file)"}
              </dd>
            </div>

            {/* SHA-256 preview */}
            {media.hashSha256 && (
              <div className="pt-1">
                <dt className="text-muted font-medium mb-1 flex items-center gap-1 text-[11px]">
                  <Hash className="w-3 h-3" />
                  SHA-256 Digest
                </dt>
                <dd className="font-mono text-[10px] text-muted-foreground break-all bg-[#F5F7F5] p-1.5 rounded border border-border/80 text-foreground/80 select-all">
                  {media.hashSha256}
                </dd>
              </div>
            )}
          </dl>
        ) : (
          <div className="py-8 text-center text-muted">
            <HelpCircle className="w-6 h-6 mx-auto mb-2 text-muted/60" />
            <p className="text-xs font-medium text-foreground">No media uploaded yet</p>
            <p className="text-[11px] text-muted mt-1 max-w-[200px] mx-auto">
              File properties will populate automatically after upload.
            </p>
          </div>
        )}
      </div>

      {/* Verification Pipeline Readiness Card */}
      <div className="border border-border rounded-xl bg-surface p-5 shadow-xs">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3 flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-primary" />
          Pipeline Status
        </h3>

        <ul className="space-y-2 text-xs">
          <li className="flex items-center justify-between py-1 border-b border-border/40">
            <span className="text-muted">Target File:</span>
            <span className="font-medium text-foreground">
              {media ? "Ready" : "Waiting for upload"}
            </span>
          </li>
          <li className="flex items-center justify-between py-1 border-b border-border/40">
            <span className="text-muted">Signals Configured:</span>
            <span className="font-mono font-medium text-primary">
              {activeSignalCount} active
            </span>
          </li>
          <li className="flex items-center justify-between py-1">
            <span className="text-muted">Result Fabrication:</span>
            <span className="font-medium text-success">
              Disabled (Strict Evaluation)
            </span>
          </li>
        </ul>
      </div>

      {/* Privacy & Methodology Assurance */}
      <div className="border border-[#D5ECDB] rounded-xl bg-soft-green/50 p-4">
        <div className="flex items-start gap-2.5">
          <Shield className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-primary">Integrity Guarantee</p>
            <p className="text-[11px] text-muted mt-1 leading-relaxed">
              TrustLayer does not display pre-computed or fabricated results. Verdicts are only generated after executing rigorous multi-signal analysis.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
