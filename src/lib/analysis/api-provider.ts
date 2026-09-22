import {
  MediaFile,
  AnalysisSignalType,
  TrustReport,
} from "@/lib/types";
import { AnalysisProvider } from "./provider";
import {
  AnalysisOptions,
  ImageAnalysisResult,
  VideoAnalysisResult,
  MetadataAnalysisResult,
  ProvenanceAnalysisResult,
  ForensicsAnalysisResult,
} from "./types";
import { DemoAnalysisProvider } from "./demo-provider";
import { extractRepresentativeVideoFrames } from "@/lib/video/extract-frames";

/**
 * ApiAnalysisProvider
 *
 * Communicates with the TrustLayer API service layer (`/api/verify`).
 * Secrets such as API keys remain strictly server-side.
 */
export class ApiAnalysisProvider implements AnalysisProvider {
  readonly name = "ApiAnalysisProvider (Live Verification)";
  readonly isDemo = false;
  private apiEndpoint: string;

  constructor(apiEndpoint = "/api/verify") {
    this.apiEndpoint = apiEndpoint;
  }

  /**
   * Dispatches media to the real verification pipeline.
   */
  async analyzeMedia(
    media: MediaFile,
    activeSignals: AnalysisSignalType[],
    options?: AnalysisOptions
  ): Promise<TrustReport> {
    const startTime = Date.now();

    // Stage 1: File Validation
    options?.onProgress?.({
      stageIndex: 0,
      stageNumber: "01",
      stageName: "FILE VALIDATION",
      stageStatus: "in-progress",
      qualitativeState: "evaluating",
      telemetry: `Validating container format and size for ${media.name}...`,
      percentage: 15,
      completedStages: [],
      evidenceSignalsCollected: 0,
      totalSignals: activeSignals.length,
    });

    try {
      const formData = new FormData();
      formData.append("action", "analyze-media");
      formData.append(
        "mediaMetadata",
        JSON.stringify({
          id: media.id,
          name: media.name,
          size: media.size,
          type: media.type,
          extension: media.extension,
          mediaKind: media.mediaKind,
          width: media.width,
          height: media.height,
          duration: media.duration,
          hashSha256: media.hashSha256,
        })
      );
      formData.append("activeSignals", JSON.stringify(activeSignals));

      let fileToAttach: Blob | File | null = media.file || null;
      if (!fileToAttach && media.previewUrl && media.previewUrl.startsWith("blob:")) {
        try {
          const blobRes = await fetch(media.previewUrl);
          fileToAttach = await blobRes.blob();
        } catch {
          // continue
        }
      }

      if (fileToAttach) {
        formData.append("file", fileToAttach, media.name);
      }

      // If video, extract client-side representative frames for Groq multimodal analysis
      if (media.mediaKind === "video" && fileToAttach) {
        try {
          options?.onProgress?.({
            stageIndex: 1,
            stageNumber: "02",
            stageName: "VIDEO SAMPLING",
            stageStatus: "in-progress",
            qualitativeState: "evaluating",
            telemetry: "Extracting representative keyframes (Beginning, 25%, 50%, 75%, End)...",
            percentage: 30,
            completedStages: ["file-validation"],
            evidenceSignalsCollected: 0,
            totalSignals: activeSignals.length,
          });

          const frames = await extractRepresentativeVideoFrames(fileToAttach, 5);
          const serializableFrames = frames.map((f) => ({
            base64: f.dataUrl,
            timestamp: f.timestamp,
            label: f.label,
          }));
          formData.append("videoFrames", JSON.stringify(serializableFrames));
        } catch (vErr) {
          console.warn("Could not extract client video frames; will proceed with server container inspection:", vErr);
        }
      }

      // Progress progression tracking while server analyzes
      const progressTimer = this.trackServerProgress(activeSignals, options?.onProgress);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), options?.timeoutMs || 60000);

      const response = await fetch(this.apiEndpoint, {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      clearInterval(progressTimer);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || errorData.message || `Server returned status ${response.status}`;
        throw new Error(errorMessage);
      }

      const report: TrustReport = await response.json();

      // Final complete stage
      options?.onProgress?.({
        stageIndex: 6,
        stageNumber: "07",
        stageName: "BUILDING REPORT",
        stageStatus: "complete",
        qualitativeState: "available",
        telemetry: "Multi-signal synthesis complete. Trust Report generated.",
        percentage: 100,
        completedStages: [
          "file-validation",
          "generating-hash",
          "checking-provenance",
          "reading-metadata",
          "ai-visual-analysis",
          "forensic-analysis",
          "building-report",
        ],
        evidenceSignalsCollected: activeSignals.length,
        totalSignals: activeSignals.length,
      });

      return {
        ...report,
        executionDurationMs: Date.now() - startTime,
      };
    } catch (err: unknown) {
      console.warn("ApiAnalysisProvider verification encountered an issue:", err);

      // Only fallback to Demo in explicit DEMO_MODE
      if (process.env.NEXT_PUBLIC_DEMO_MODE === "true") {
        console.info("NEXT_PUBLIC_DEMO_MODE=true: Falling back to DemoAnalysisProvider...");
        const fallback = new DemoAnalysisProvider();
        return fallback.analyzeMedia(media, activeSignals, options);
      }

      throw new Error(
        err instanceof Error ? err.message : "Remote verification service unavailable."
      );
    }
  }

  async analyzeImage(file: File | Blob, options?: AnalysisOptions): Promise<ImageAnalysisResult> {
    return this.postAction<ImageAnalysisResult>("analyze-image", file, options);
  }

  async analyzeVideo(file: File | Blob, options?: AnalysisOptions): Promise<VideoAnalysisResult> {
    return this.postAction<VideoAnalysisResult>("analyze-video", file, options);
  }

  async analyzeMetadata(file: File | Blob): Promise<MetadataAnalysisResult> {
    return this.postAction<MetadataAnalysisResult>("analyze-metadata", file);
  }

  async analyzeProvenance(file: File | Blob): Promise<ProvenanceAnalysisResult> {
    return this.postAction<ProvenanceAnalysisResult>("analyze-provenance", file);
  }

  async analyzeForensics(file: File | Blob): Promise<ForensicsAnalysisResult> {
    return this.postAction<ForensicsAnalysisResult>("analyze-forensics", file);
  }

  private async postAction<T>(action: string, file: File | Blob, options?: AnalysisOptions): Promise<T> {
    const formData = new FormData();
    formData.append("action", action);
    formData.append("file", file, file instanceof File ? file.name : "media-sample");

    const response = await fetch(this.apiEndpoint, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API provider action '${action}' failed with status: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }

  private trackServerProgress(
    activeSignals: AnalysisSignalType[],
    onProgress?: AnalysisOptions["onProgress"]
  ): ReturnType<typeof setInterval> {
    let currentStage = 1;
    const stages = [
      { num: "02", name: "GENERATING HASH", telemetry: "Computing cryptographic SHA-256 binary digest..." },
      { num: "03", name: "CHECKING PROVENANCE", telemetry: "Scanning JUMBF boxes and C2PA Content Credentials..." },
      { num: "04", name: "READING METADATA", telemetry: "Extracting EXIF, XMP, and editing software headers..." },
      { num: "05", name: "AI VISUAL ANALYSIS", telemetry: "Running Groq Qwen multimodal visual evidence inspection..." },
      { num: "06", name: "FORENSIC ANALYSIS", telemetry: "Auditing JPEG DQT quantization tables & container boundaries..." },
    ];

    return setInterval(() => {
      if (currentStage < stages.length && onProgress) {
        const stage = stages[currentStage];
        onProgress({
          stageIndex: currentStage,
          stageNumber: stage.num,
          stageName: stage.name,
          stageStatus: "in-progress",
          qualitativeState: "evaluating",
          telemetry: stage.telemetry,
          percentage: Math.min(20 + currentStage * 14, 90),
          completedStages: stages
            .slice(0, currentStage)
            .map((s) => s.name.toLowerCase().replace(/\s+/g, "-")),
          evidenceSignalsCollected: Math.min(currentStage, activeSignals.length),
          totalSignals: activeSignals.length,
        });
        currentStage++;
      }
    }, 1100);
  }
}
