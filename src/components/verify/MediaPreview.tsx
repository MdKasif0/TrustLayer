"use client";

import React, { useState, useRef } from "react";
import { MediaFile } from "@/lib/types";
import { formatFileSize, formatDuration } from "@/lib/services/fileInspector";
import {
  FileImage,
  Film,
  RefreshCw,
  Trash2,
  Play,
  Pause,
  Copy,
  Check,
  ShieldCheck,
  Hash,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface MediaPreviewProps {
  media: MediaFile;
  onReplace: () => void;
  onRemove: () => void;
  disabled?: boolean;
}

export function MediaPreview({
  media,
  onReplace,
  onRemove,
  disabled = false,
}: MediaPreviewProps) {
  const isVideo = media.mediaKind === "video";
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(media.duration || 0);
  const [copiedHash, setCopiedHash] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    if (!duration && videoRef.current.duration) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleCopyHash = () => {
    if (media.hashSha256 && typeof navigator !== "undefined") {
      navigator.clipboard.writeText(media.hashSha256);
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    }
  };

  return (
    <div className="border border-border rounded-xl bg-surface overflow-hidden shadow-subtle">
      {/* Top Header Bar */}
      <div className="px-4 py-3 border-b border-border bg-[#FAFAF8] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-md bg-very-soft-green border border-border flex items-center justify-center text-primary shrink-0">
            {isVideo ? <Film className="w-3.5 h-3.5" /> : <FileImage className="w-3.5 h-3.5" />}
          </div>
          <div className="min-w-0">
            <span className="text-xs font-mono font-bold text-foreground truncate block">
              {media.name}
            </span>
            <span className="text-[11px] font-mono text-muted">
              Target Media Ready for Investigation
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onReplace}
            disabled={disabled}
            icon={<RefreshCw className="w-3.5 h-3.5" />}
            title="Replace media file"
            className="text-xs font-mono"
          >
            Replace
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onRemove}
            disabled={disabled}
            className="text-danger hover:bg-danger-bg hover:border-[#F0C5C1] text-xs font-mono"
            icon={<Trash2 className="w-3.5 h-3.5" />}
            title="Remove media file"
          >
            Remove
          </Button>
        </div>
      </div>

      {/* Media Viewport */}
      <div className="relative bg-[#F4F6F4] border-b border-border flex items-center justify-center min-h-[300px] max-h-[440px] overflow-hidden">
        {isVideo ? (
          <video
            ref={videoRef}
            src={media.previewUrl}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={() => {
              if (videoRef.current) setDuration(videoRef.current.duration);
            }}
            onEnded={() => setIsPlaying(false)}
            className="w-full max-h-[440px] object-contain"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={media.previewUrl}
            alt={media.name}
            className="w-full max-h-[440px] object-contain"
          />
        )}

        {/* Verified Container Pill */}
        <div className="absolute top-3 left-3 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface text-foreground text-[11px] font-mono font-semibold border border-border shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            Integrity Verified
          </span>
        </div>
      </div>

      {/* Video Minimal Timeline Controls (Rendered for video) */}
      {isVideo && (
        <div className="p-3 bg-[#FAFBF9] border-b border-border flex items-center gap-3 text-xs font-mono">
          <button
            type="button"
            onClick={togglePlay}
            className="w-7 h-7 rounded bg-surface border border-border flex items-center justify-center text-primary hover:bg-very-soft-green transition-colors cursor-pointer"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>

          {/* Minimal Timeline Scrubber */}
          <div className="flex-1 flex items-center gap-2">
            <input
              type="range"
              min="0"
              max={duration || 100}
              step="0.05"
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-[#DDE3DE] rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          {/* Time Display */}
          <div className="text-muted shrink-0 text-[11px]">
            <span>{formatDuration(currentTime)}</span>
            <span className="mx-1">/</span>
            <span>{formatDuration(duration)}</span>
          </div>
        </div>
      )}

      {/* Metadata Underneath: Filename, File type, Dimensions, File size */}
      <div className="p-5 bg-surface space-y-4">
        <span className="text-[10px] font-mono uppercase tracking-wider text-muted font-bold block">
          Target File Properties
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          {/* Filename */}
          <div className="p-3 rounded-lg bg-[#FAFBF9] border border-border">
            <span className="text-muted text-[11px] font-sans block mb-1">Filename</span>
            <span className="font-semibold text-foreground truncate block" title={media.name}>
              {media.name}
            </span>
          </div>

          {/* File type */}
          <div className="p-3 rounded-lg bg-[#FAFBF9] border border-border">
            <span className="text-muted text-[11px] font-sans block mb-1">File Type</span>
            <span className="font-semibold text-foreground">
              {media.extension} ({media.type})
            </span>
          </div>

          {/* Dimensions */}
          <div className="p-3 rounded-lg bg-[#FAFBF9] border border-border">
            <span className="text-muted text-[11px] font-sans block mb-1">Dimensions</span>
            <span className="font-semibold text-foreground">
              {media.width && media.height ? `${media.width} × ${media.height} px` : "Extracting…"}
            </span>
          </div>

          {/* File size */}
          <div className="p-3 rounded-lg bg-[#FAFBF9] border border-border">
            <span className="text-muted text-[11px] font-sans block mb-1">File Size</span>
            <span className="font-semibold text-foreground">
              {formatFileSize(media.size)}
            </span>
          </div>
        </div>

        {/* SHA-256 Digest Row */}
        {media.hashSha256 && (
          <div className="p-3 rounded-lg bg-[#FAFBF9] border border-border flex items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 min-w-0">
              <Hash className="w-3.5 h-3.5 text-primary shrink-0" />
              <div className="min-w-0">
                <span className="text-muted text-[10px] uppercase tracking-wider block font-sans">
                  SHA-256 Fingerprint
                </span>
                <span className="text-foreground/90 font-mono text-[11px] truncate block select-all">
                  {media.hashSha256}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyHash}
              className="px-2 py-1 rounded bg-surface border border-border text-muted hover:text-foreground text-[10px] font-mono flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
              title="Copy SHA-256 digest"
            >
              {copiedHash ? (
                <>
                  <Check className="w-3 h-3 text-success" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
