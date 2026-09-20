"use client";

import React, { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Upload, AlertCircle, Shield, X, FileUp } from "lucide-react";
import {
  validateMediaFile,
  inspectMediaDimensions,
  computeSha256,
  sanitizeFilename,
} from "@/lib/services/fileInspector";
import { MediaFile } from "@/lib/types";

interface UploadAreaProps {
  onFileAccepted: (mediaFile: MediaFile) => void;
  className?: string;
  disabled?: boolean;
}

export function UploadArea({
  onFileAccepted,
  className,
  disabled = false,
}: UploadAreaProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    async (rawFile: File) => {
      setErrorMessage(null);
      setIsProcessing(true);
      setProcessingStatus("Validating file format and size...");

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
      const ext =
        rawFile.name.split(".").pop()?.toLowerCase() || (isVideo ? "mp4" : "jpg");

      try {
        // 2. Corrupted file inspection & dimension extraction
        setProcessingStatus("Inspecting container dimensions...");
        const dimensions = await inspectMediaDimensions(rawFile, previewUrl);

        // 3. Client-side SHA-256 computation for forensic integrity
        setProcessingStatus("Computing SHA-256 cryptographic digest...");
        const hashSha256 = await computeSha256(rawFile);

        const safeName = sanitizeFilename(rawFile.name);

        const mediaFile: MediaFile = {
          id: `media-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          file: rawFile,
          name: safeName,
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
        setProcessingStatus("");
        onFileAccepted(mediaFile);
      } catch (err: unknown) {
        setIsProcessing(false);
        setProcessingStatus("");
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
      {/* Premium Drop Zone (Solid 1px border, calm light theme, no generic dashed rectangle) */}
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
          "relative border rounded-xl p-8 sm:p-14 text-center transition-all duration-150 cursor-pointer bg-surface shadow-subtle select-none",
          isDragOver
            ? "border-primary bg-soft-green ring-2 ring-primary/30"
            : "border-border hover:border-primary/50 hover:bg-[#FAFBF9]",
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
          {/* Central Upload Icon */}
          <div
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors",
              isDragOver
                ? "bg-primary text-white"
                : "bg-very-soft-green text-primary border border-border"
            )}
          >
            {isProcessing ? (
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : (
              <Upload className="w-5 h-5" />
            )}
          </div>

          {/* Title & Subtitle */}
          <h3 className="text-lg font-bold text-foreground tracking-tight mb-1.5">
            Drop media here
          </h3>
          <p className="text-xs sm:text-sm text-muted mb-5">
            or{" "}
            <span className="text-primary font-semibold underline underline-offset-4 hover:text-primary-hover">
              choose a file
            </span>{" "}
            from your system
          </p>

          {/* Supported Format Badges */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mb-4 font-mono text-[11px]">
            {["JPG", "PNG", "WEBP", "MP4", "MOV"].map((format) => (
              <span
                key={format}
                className="px-2 py-0.5 rounded bg-very-soft-green text-foreground border border-border font-medium"
              >
                {format}
              </span>
            ))}
          </div>

          {/* File Size Limit Notice */}
          <p className="text-xs text-muted font-mono mb-5">
            Maximum file size: 50 MB
          </p>

          {/* Processing Feedback */}
          {isProcessing && (
            <div className="w-full max-w-xs mb-4 p-3 bg-very-soft-green rounded-lg border border-border text-left">
              <div className="flex items-center gap-2 mb-1 text-xs font-mono text-primary font-semibold">
                <FileUp className="w-3.5 h-3.5 animate-bounce" />
                <span>Processing Media Container</span>
              </div>
              <p className="text-[11px] text-muted font-mono truncate">
                {processingStatus}
              </p>
            </div>
          )}

          {/* Privacy Statement */}
          <div className="inline-flex items-center gap-2 text-xs text-muted bg-[#FAFBF9] px-3.5 py-1.5 rounded-full border border-border">
            <Shield className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>Files are analyzed securely for verification purposes.</span>
          </div>
        </div>
      </div>

      {/* Validation Error Alert */}
      {errorMessage && (
        <div
          role="alert"
          className="mt-4 p-4 bg-danger-bg border border-[#F0C5C1] rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm text-danger animate-in fade-in duration-200"
        >
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-xs uppercase tracking-wider mb-0.5">
                {errorMessage.includes("format") || errorMessage.includes("Unsupported")
                  ? "Unsupported file type"
                  : "Upload Error"}
              </p>
              <p className="text-xs sm:text-sm text-danger/90">
                {errorMessage.includes("format") || errorMessage.includes("Unsupported")
                  ? "TrustLayer supports JPG, PNG, WEBP, MP4 and MOV."
                  : errorMessage}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              type="button"
              onClick={handleBrowseClick}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-surface border border-danger/40 text-danger hover:bg-danger hover:text-white transition-all duration-200 ease-out cursor-pointer"
            >
              Choose another file
            </button>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="text-danger/70 hover:text-danger p-1.5 rounded hover:bg-white/40 transition-colors"
              aria-label="Dismiss error"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
