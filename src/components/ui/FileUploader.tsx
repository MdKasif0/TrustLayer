"use client";

import React, { useCallback, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Upload, Image as ImageIcon, Film, X } from "lucide-react";

interface FileUploaderProps {
  accept?: string;
  maxSizeMB?: number;
  onFileSelect?: (file: File) => void;
  className?: string;
}

export function FileUploader({
  accept = "image/*,video/*",
  maxSizeMB = 50,
  onFileSelect,
  className,
}: FileUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateAndSet = useCallback(
    (file: File) => {
      setError(null);

      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`File exceeds ${maxSizeMB}MB limit`);
        return;
      }

      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");

      if (!isImage && !isVideo) {
        setError("Please upload an image or video file");
        return;
      }

      setSelectedFile(file);
      onFileSelect?.(file);

      if (isImage) {
        const url = URL.createObjectURL(file);
        setPreview(url);
      } else {
        setPreview(null);
      }
    },
    [maxSizeMB, onFileSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files[0];
      if (file) validateAndSet(file);
    },
    [validateAndSet]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) validateAndSet(file);
    },
    [validateAndSet]
  );

  const clear = useCallback(() => {
    setSelectedFile(null);
    setPreview(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (selectedFile) {
    const isVideo = selectedFile.type.startsWith("video/");
    return (
      <div className={cn("border border-border rounded-lg bg-surface p-4", className)}>
        <div className="flex items-center gap-3">
          {/* Preview */}
          <div className="w-14 h-14 rounded-md bg-[#F0F2F0] border border-border flex items-center justify-center overflow-hidden shrink-0">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            ) : isVideo ? (
              <Film className="w-6 h-6 text-muted" />
            ) : (
              <ImageIcon className="w-6 h-6 text-muted" />
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {selectedFile.name}
            </p>
            <p className="text-xs text-muted mt-0.5">
              {formatSize(selectedFile.size)} · {isVideo ? "Video" : "Image"}
            </p>
          </div>

          {/* Remove */}
          <button
            onClick={clear}
            className="shrink-0 w-8 h-8 rounded-md flex items-center justify-center text-muted hover:text-foreground hover:bg-[#F0F2F0] transition-colors cursor-pointer"
            aria-label="Remove file"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-150 cursor-pointer",
          dragActive
            ? "border-primary bg-soft-green"
            : "border-border hover:border-border-strong hover:bg-[#FAFAF7]",
          error && "border-danger"
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
          aria-label="Upload media file"
        />

        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-soft-green flex items-center justify-center">
            <Upload className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              Drop your file here or{" "}
              <span className="text-primary underline underline-offset-2">browse</span>
            </p>
            <p className="text-xs text-muted mt-1">
              Images and videos up to {maxSizeMB}MB
            </p>
          </div>
        </div>
      </div>

      {error && (
        <p className="text-xs text-danger mt-2 flex items-center gap-1">
          <span className="inline-block w-1 h-1 rounded-full bg-danger" />
          {error}
        </p>
      )}
    </div>
  );
}
