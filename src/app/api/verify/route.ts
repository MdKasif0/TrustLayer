import { NextRequest, NextResponse } from "next/server";
import { runVerificationPipeline } from "@/lib/verification/pipeline";
import { AnalysisSignalType } from "@/lib/types";
import { VideoFrameSample } from "@/lib/groq/analyze-video";
import { sanitizeFilename } from "@/lib/services/fileInspector";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Max file size: 50MB
const MAX_FILE_SIZE = 50 * 1024 * 1024;

const ALLOWED_MIME_PREFIXES = ["image/", "video/"];
const ALLOWED_EXTENSIONS = [
  "jpg",
  "jpeg",
  "png",
  "webp",
  "heic",
  "mp4",
  "mov",
  "webm",
];

/**
 * POST /api/verify
 *
 * Real, evidence-based digital media verification route.
 * Accepts multipart/form-data with `file` and optional metadata / video frames.
 */
export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Invalid Content-Type. Expected multipart/form-data." },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: "No media file provided in 'file' field." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File exceeds the supported size limit (50 MB)." },
        { status: 413 }
      );
    }

    if (file.size === 0) {
      return NextResponse.json(
        { error: "The uploaded file is empty." },
        { status: 400 }
      );
    }

    const rawFileName = (file instanceof File ? file.name : "media-upload") || "media-upload";
    const fileName = sanitizeFilename(rawFileName);
    const mimeType = file.type || "application/octet-stream";
    const ext = fileName.split(".").pop()?.toLowerCase() || "";

    const isMimeAllowed = ALLOWED_MIME_PREFIXES.some((prefix) => mimeType.startsWith(prefix));
    const isExtAllowed = ALLOWED_EXTENSIONS.includes(ext);

    if (!isMimeAllowed && !isExtAllowed) {
      return NextResponse.json(
        {
          error: `Unsupported file type (.${ext}). Supported types: JPG, PNG, WEBP, MP4, MOV, WEBM.`,
        },
        { status: 415 }
      );
    }

    // Convert file to Buffer securely in memory
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Parse active signals if supplied
    let activeSignals: AnalysisSignalType[] = [
      "ai-detection",
      "provenance",
      "metadata",
      "forensic",
    ];
    const rawSignals = formData.get("activeSignals") as string | null;
    if (rawSignals) {
      try {
        const parsedSignals = JSON.parse(rawSignals);
        if (Array.isArray(parsedSignals)) {
          activeSignals = parsedSignals as AnalysisSignalType[];
        }
      } catch {
        // use default active signals
      }
    }

    // Parse metadata / dimensions if provided
    let dimensions: { width?: number; height?: number; duration?: number } | undefined;
    const rawMetadata = formData.get("mediaMetadata") as string | null;
    if (rawMetadata) {
      try {
        const parsed = JSON.parse(rawMetadata);
        if (parsed.width || parsed.height || parsed.duration) {
          dimensions = {
            width: parsed.width,
            height: parsed.height,
            duration: parsed.duration,
          };
        }
      } catch {
        // ignore
      }
    }

    // Parse video frames if attached for video analysis
    const videoFrames: VideoFrameSample[] = [];
    const rawFrames = formData.get("videoFrames") as string | null;
    if (rawFrames) {
      try {
        const parsedFrames = JSON.parse(rawFrames);
        if (Array.isArray(parsedFrames)) {
          for (const f of parsedFrames) {
            if (f.base64) {
              const frameBuf = Buffer.from(
                f.base64.replace(/^data:image\/\w+;base64,/, ""),
                "base64"
              );
              videoFrames.push({
                buffer: frameBuf,
                timestamp: f.timestamp || 0,
                label: f.label || `${f.timestamp}s`,
              });
            }
          }
        }
      } catch {
        // proceed without client frames
      }
    }

    // Execute the complete verification pipeline
    const trustReport = await runVerificationPipeline({
      buffer,
      fileName,
      mimeType,
      activeSignals,
      dimensions,
      videoFrames: videoFrames.length > 0 ? videoFrames : undefined,
    });

    return NextResponse.json(trustReport);
  } catch (err: unknown) {
    console.error("POST /api/verify execution error:", err);
    return NextResponse.json(
      {
        error: "Verification pipeline execution error",
        message:
          err instanceof Error
            ? err.message
            : "An unexpected error occurred during verification.",
      },
      { status: 500 }
    );
  }
}
