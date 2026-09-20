"use client";

import React, { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Upload, AlertCircle, Shield, FileCheck, X } from "lucide-react";
import { validateMediaFile, inspectMediaDimensions, computeSha256 } from "@/lib/services/fileInspector";
import { MediaFile } from "@/lib/types";

interface UploadAreaProps {
  onFileAccepted: (mediaFile: MediaFile) => void;
  className?: string;
  disabled?: boolean;
}

export function UploadArea({ onFileAccepted, className, disabled = false }: UploadAreaProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    async (rawFile: File) => {
      setErrorMessage(null);
      setIsProcessing(true);

      // 1. Format & Size Validation
      const validation = validateMediaFile(rawFile);
      if (!validation.valid) {
        setErrorMessage(validation.error || "Invalid file.");
        setIsProcessing(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      const isVideo =
        rawFile.type.startsWith("video/") ||
        rawFile.name.toLowerCase().endsWith(".mp4") ||
        rawFile.name.toLowerCase().endsWith(".mov");

      const previewUrl = URL.createObjectURL(rawFile);
      const ext = rawFile.name.split(".").pop()?.toLowerCase() || (isVideo ? "mp4" : "jpg");

      try {
        // 2. Corrupted file inspection & dimension extraction
        const dimensions = await inspectMediaDimensions(rawFile, previewUrl);

        // 3. Client-side SHA-256 computation for forensic integrity
        const hashSha256 = await computeSha256(rawFile);

        const mediaFile: MediaFile = {
          id: `media-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          file: rawFile,
          name: rawFile.name,
          size: rawFile.size,
          type: rawFile.type || (isVideo ? "video/mp4" : "image/jpeg"),
          extension: ext.toUpperCase(),
          mediaKind: isVideo ? "video" : "image",
          previewUrl,
          width: dimensions.width,
          height: dimensions.height,
          duration: dimensions.duration,
          hashSha256,
          lastModified: rawFile.lastModified,
        };

        setIsProcessing(false);
        onFileAccepted(mediaFile);
      } catch (err: unknown) {
        setIsProcessing(false);
        URL.revokeObjectURL(previewUrl);
        const errorMsg =
          err instanceof Error
            ? err.message
            : "The selected file could not be read or is corrupted. Please choose another file.";
        setErrorMessage(errorMsg);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    },
    [onFileAccepted]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled || isProcessing) return;
      setIsDragOver(true);
    },
    [disabled, isProcessing]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      if (disabled || isProcessing) return;

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        processFile(files[0]);
      }
    },
    [disabled, isProcessing, processFile]
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        processFile(files[0]);
      }
    },
    [processFile]
  );

  const handleBrowseClick = () => {
    if (disabled || isProcessing) return;
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Upload Dropzone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Upload media dropzone"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleBrowseClick();
          }
        }}
        className={cn(
          "relative border-2 border-dashed rounded-xl p-8 sm:p-12 text-center transition-all duration-150 cursor-pointer bg-surface",
          isDragOver
            ? "border-primary bg-soft-green ring-4 ring-soft-green"
            : "border-border hover:border-border-strong hover:bg-[#FAFBF9]",
          errorMessage ? "border-danger/60" : "",
          disabled && "opacity-60 cursor-not-allowed pointer-events-none"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.mp4,.mov,image/jpeg,image/png,image/webp,video/mp4,video/quicktime"
          onChange={handleFileInputChange}
          className="hidden"
          aria-hidden="true"
        />

        <div className="max-w-md mx-auto flex flex-col items-center">
          {/* Central Icon */}
          <div
            className={cn(
              "w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors",
              isDragOver ? "bg-primary text-white" : "bg-soft-green text-primary border border-[#D5ECDB]"
            )}
          >
            {isProcessing ? (
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : (
              <Upload className="w-6 h-6" />
            )}
          </div>

          {/* Primary & Secondary copy */}
          <h2 className="text-lg font-semibold text-foreground tracking-tight mb-1">
            Drop an image or video here
          </h2>
          <p className="text-sm text-muted mb-4">
            or{" "}
            <span className="text-primary font-medium underline underline-offset-4 hover:text-primary-hover">
              choose a file
            </span>{" "}
            from your device
          </p>

          {/* Supported Formats & File Size Display */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            <span className="inline-flex items-center text-xs font-mono font-medium px-2 py-1 rounded bg-[#F0F2F0] text-foreground border border-border">
              JPG
            </span>
            <span className="inline-flex items-center text-xs font-mono font-medium px-2 py-1 rounded bg-[#F0F2F0] text-foreground border border-border">
              PNG
            </span>
            <span className="inline-flex items-center text-xs font-mono font-medium px-2 py-1 rounded bg-[#F0F2F0] text-foreground border border-border">
              WEBP
            </span>
            <span className="inline-flex items-center text-xs font-mono font-medium px-2 py-1 rounded bg-[#F0F2F0] text-foreground border border-border">
              MP4
            </span>
            <span className="inline-flex items-center text-xs font-mono font-medium px-2 py-1 rounded bg-[#F0F2F0] text-foreground border border-border">
              MOV
            </span>
            <span className="text-xs text-muted pl-1">· Maximum file size: 50 MB</span>
          </div>

          {/* Privacy Statement */}
          <div className="inline-flex items-center gap-1.5 text-xs text-muted/90 bg-[#FAFBF9] px-3 py-1.5 rounded-full border border-border/80">
            <Shield className="w-3.5 h-3.5 text-primary" />
            <span>Your media is analyzed only for verification purposes.</span>
          </div>
        </div>
      </div>

      {/* Error Message Display */}
      {errorMessage && (
        <div
          role="alert"
          className="mt-4 p-3.5 bg-danger-bg border border-[#F0C5C1] rounded-lg flex items-start justify-between gap-3 text-sm text-danger animate-in fade-in duration-200"
        >
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-xs uppercase tracking-wider mb-0.5">Upload Error</p>
              <p className="text-xs sm:text-sm text-danger/90">{errorMessage}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="text-danger/70 hover:text-danger p-1 rounded hover:bg-white/40 transition-colors"
            aria-label="Dismiss error"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
