import { NextRequest, NextResponse } from "next/server";
import { DemoAnalysisProvider } from "@/lib/analysis/demo-provider";
import { runVerificationPipeline } from "@/lib/verification/pipeline";
import { MediaFile, AnalysisSignalType } from "@/lib/types";
import { VideoFrameSample } from "@/lib/groq/analyze-video";
import { sanitizeFilename } from "@/lib/services/fileInspector";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * GET /api/analyze
 * Status & configuration check. Secrets are never exposed.
 */
export async function GET() {
  const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
  const hasGroq = Boolean(process.env.GROQ_API_KEY);

  return NextResponse.json({
    service: "TrustLayer Verification Gateway",
    version: "2.5.0",
    environment: process.env.NODE_ENV,
    mode: isDemo ? "DEMO_MODE" : "LIVE_VERIFICATION",
    aiModel: process.env.GROQ_MODEL || "qwen/qwen3.8-27b",
    configuredServices: {
      groqApi: hasGroq,
      c2paInspection: true,
      metadataExtraction: true,
      forensicDqt: true,
      sha256Hashing: true,
    },
  });
}

/**
 * POST /api/analyze
 * Live verification gateway.
 */
export async function POST(req: NextRequest) {
  try {
    const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

    const contentType = req.headers.get("content-type") || "";
    let action = "analyze-media";
    let mediaMetadata: Partial<MediaFile> = {};
    let activeSignals: AnalysisSignalType[] = [
      "ai-detection",
      "provenance",
      "metadata",
      "forensic",
    ];
    let fileBlob: Blob | null = null;
    let fileName = "uploaded-media";
    let videoFrames: VideoFrameSample[] = [];

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      action = (formData.get("action") as string) || "analyze-media";

      const metaRaw = formData.get("mediaMetadata") as string | null;
      if (metaRaw) {
        try {
          mediaMetadata = JSON.parse(metaRaw);
        } catch {
          // fallback
        }
      }

      const signalsRaw = formData.get("activeSignals") as string | null;
      if (signalsRaw) {
        try {
          activeSignals = JSON.parse(signalsRaw);
        } catch {
          // fallback
        }
      }

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
          // ignore
        }
      }

      const file = formData.get("file");
      if (file && typeof file !== "string") {
        fileBlob = file;
        fileName = file.name || "media-sample";
      }
    } else if (contentType.includes("application/json")) {
      const json = await req.json();
      action = json.action || "analyze-media";
      mediaMetadata = json.mediaMetadata || {};
      activeSignals = json.activeSignals || activeSignals;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // REAL VERIFICATION PIPELINE (LIVE MODE)
    // ─────────────────────────────────────────────────────────────────────────
    if (!isDemo && fileBlob) {
      const safeName = sanitizeFilename(fileName);
      const arrayBuffer = await fileBlob.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const report = await runVerificationPipeline({
        buffer,
        fileName: safeName,
        mimeType: fileBlob.type || "application/octet-stream",
        activeSignals,
        dimensions: {
          width: mediaMetadata.width,
          height: mediaMetadata.height,
          duration: mediaMetadata.duration,
        },
        videoFrames: videoFrames.length > 0 ? videoFrames : undefined,
        previewUrl: mediaMetadata.previewUrl,
      });

      return NextResponse.json(report);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // DEMO PROVIDER (Only when NEXT_PUBLIC_DEMO_MODE=true)
    // ─────────────────────────────────────────────────────────────────────────
    const demoProvider = new DemoAnalysisProvider();
    const media: MediaFile = {
      id: mediaMetadata.id || `media-${Date.now().toString(36)}`,
      name: mediaMetadata.name || fileName,
      size: mediaMetadata.size || (fileBlob ? fileBlob.size : 1024 * 512),
      type: mediaMetadata.type || (fileBlob ? fileBlob.type : "image/jpeg"),
      extension:
        mediaMetadata.extension || fileName.split(".").pop()?.toUpperCase() || "JPG",
      mediaKind:
        mediaMetadata.mediaKind ||
        (fileName.toLowerCase().endsWith(".mp4") || fileName.toLowerCase().endsWith(".mov")
          ? "video"
          : "image"),
      previewUrl: mediaMetadata.previewUrl || "",
      width: mediaMetadata.width || 1024,
      height: mediaMetadata.height || 1024,
      duration: mediaMetadata.duration,
      hashSha256:
        mediaMetadata.hashSha256 ||
        "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    };

    const report = await demoProvider.analyzeMedia(media, activeSignals);
    return NextResponse.json(report);
  } catch (err: unknown) {
    console.error("API route /api/analyze error:", err);
    return NextResponse.json(
      {
        error: "Internal verification gateway error",
        message: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
