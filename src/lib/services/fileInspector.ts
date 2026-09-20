import { MediaFile } from "@/lib/types";

export const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50MB

export const SUPPORTED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/quicktime",
];

export const SUPPORTED_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "mp4", "mov"];

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateMediaFile(file: File): ValidationResult {
  if (!file) {
    return { valid: false, error: "No file selected." };
  }

  // 1. File size check
  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `File size (${sizeMb} MB) exceeds maximum allowed limit of 50 MB.`,
    };
  }

  if (file.size === 0) {
    return {
      valid: false,
      error: "The selected file is empty (0 bytes).",
    };
  }

  // 2. Format & extension check
  const ext = file.name.split(".").pop()?.toLowerCase() || "";
  const mime = file.type.toLowerCase();

  const isExtSupported = SUPPORTED_EXTENSIONS.includes(ext);
  const isMimeSupported = SUPPORTED_MIME_TYPES.includes(mime) || 
    (mime.startsWith("image/") && ["jpg", "jpeg", "png", "webp"].includes(ext)) ||
    (mime.startsWith("video/") && ["mp4", "mov"].includes(ext));

  if (!isExtSupported && !isMimeSupported) {
    return {
      valid: false,
      error: `Unsupported file format (.${ext || "unknown"}). Supported formats are JPG, PNG, WEBP, MP4, and MOV.`,
    };
  }

  return { valid: true };
}

export async function computeSha256(file: File): Promise<string> {
  try {
    // Only hash up to 10MB in browser memory for speed and efficiency
    const slice = file.slice(0, Math.min(file.size, 10 * 1024 * 1024));
    const buffer = await slice.arrayBuffer();
    const digest = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(digest));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  } catch {
    return "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
  }
}

export interface MediaDimensions {
  width?: number;
  height?: number;
  duration?: number;
}

export function inspectMediaDimensions(file: File, previewUrl: string): Promise<MediaDimensions> {
  const isVideo = file.type.startsWith("video/") || file.name.toLowerCase().endsWith(".mp4") || file.name.toLowerCase().endsWith(".mov");

  return new Promise((resolve, reject) => {
    if (isVideo) {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.src = previewUrl;

      video.onloadedmetadata = () => {
        resolve({
          width: video.videoWidth || undefined,
          height: video.videoHeight || undefined,
          duration: video.duration ? Math.round(video.duration) : undefined,
        });
      };

      video.onerror = () => {
        reject(new Error("Unable to decode video stream. The video file may be corrupted, truncated, or encoded with an unsupported codec."));
      };
    } else {
      const img = new Image();
      img.src = previewUrl;

      img.onload = () => {
        resolve({
          width: img.naturalWidth || undefined,
          height: img.naturalHeight || undefined,
        });
      };

      img.onerror = () => {
        reject(new Error("Unable to decode image data. The file may be corrupted, truncated, or invalid."));
      };
    }
  });
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}
