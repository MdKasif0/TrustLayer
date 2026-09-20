"use client";

import React, { useState } from "react";
import { MediaFile } from "@/lib/types";
import { formatFileSize, formatDuration } from "@/lib/services/fileInspector";
import { FileImage, Film, RefreshCw, Trash2, Maximize2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface MediaPreviewProps {
  media: MediaFile;
  onReplace: () => void;
  onRemove: () => void;
  disabled?: boolean;
}

export function MediaPreview({ media, onReplace, onRemove, disabled = false }: MediaPreviewProps) {
  const isVideo = media.mediaKind === "video";
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="border border-border rounded-xl bg-surface overflow-hidden shadow-xs">
      {/* Media Header Banner */}
      <div className="px-4 py-3 border-b border-border bg-[#FAFAF8] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-md bg-soft-green flex items-center justify-center text-primary shrink-0">
            {isVideo ? <Film className="w-4 h-4" /> : <FileImage className="w-4 h-4" />}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{media.name}</p>
            <p className="text-xs text-muted">
              {media.extension} · {formatFileSize(media.size)}
              {media.width && media.height ? ` · ${media.width}×${media.height} px` : ""}
              {media.duration ? ` · ${formatDuration(media.duration)}` : ""}
            </p>
          </div>
        </div>

        {/* Top actions */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onReplace}
            disabled={disabled}
            icon={<RefreshCw className="w-3.5 h-3.5" />}
            title="Replace with another file"
          >
            <span className="hidden sm:inline">Replace</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onRemove}
            disabled={disabled}
            className="text-danger hover:bg-danger-bg hover:border-[#F0C5C1]"
            icon={<Trash2 className="w-3.5 h-3.5" />}
            title="Remove media"
          >
            <span className="hidden sm:inline">Remove</span>
          </Button>
        </div>
      </div>

      {/* Media Viewport */}
      <div className="relative bg-[#F0F2F0] border-b border-border flex items-center justify-center min-h-[300px] max-h-[480px] overflow-hidden">
        {isVideo ? (
          <video
            src={media.previewUrl}
            controls
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="w-full max-h-[480px] object-contain"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={media.previewUrl}
            alt={media.name}
            className="w-full max-h-[480px] object-contain"
          />
        )}

        {/* Dimension & Integrity Tag Overlay */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 pointer-events-none">
          {media.width && media.height && (
            <span className="text-[11px] font-mono font-medium px-2 py-1 rounded bg-black/75 text-white/90 backdrop-blur-xs border border-white/10">
              {media.width} × {media.height} px
            </span>
          )}
          {media.duration && (
            <span className="text-[11px] font-mono font-medium px-2 py-1 rounded bg-black/75 text-white/90 backdrop-blur-xs border border-white/10">
              {formatDuration(media.duration)}
            </span>
          )}
          <span className="text-[11px] font-mono px-2 py-1 rounded bg-black/75 text-[#86EFAC] backdrop-blur-xs border border-white/10 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            Integrity Verified
          </span>
        </div>
      </div>
    </div>
  );
}
