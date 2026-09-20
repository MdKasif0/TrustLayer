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

/**
 * ApiAnalysisProvider
 *
 * Communicates with the TrustLayer API service layer (`/api/analyze`) or external
 * microservices (e.g. Python/FastAPI backend, C2PA service).
 *
 * Secrets such as API keys and backend tokens remain strictly server-side.
 * The client communicates exclusively through the Next.js API proxy route or
 * authorized endpoints.
 */
export class ApiAnalysisProvider implements AnalysisProvider {
  readonly name = "ApiAnalysisProvider (Live Verification)";
  readonly isDemo = false;
  private apiEndpoint: string;

  constructor(apiEndpoint = "/api/analyze") {
    this.apiEndpoint = apiEndpoint;
  }

  /**
   * Dispatches media to the verification pipeline.
   * Handles progressive status updates and compiles the final TrustReport.
   */
  async analyzeMedia(
    media: MediaFile,
    activeSignals: AnalysisSignalType[],
    options?: AnalysisOptions
  ): Promise<TrustReport> {
    const startTime = Date.now();

    // Notify client of initial stage
    options?.onProgress?.({
      stageIndex: 0,
      stageNumber: "01",
      stageName: "FILE INSPECTION",
      stageStatus: "in-progress",
      qualitativeState: "evaluating",
      telemetry: `Transmitting ${media.name} (${media.type}) to TrustLayer verification service...`,
      percentage: 10,
      completedStages: [],
      evidenceSignalsCollected: 0,
      totalSignals: activeSignals.length,
    });

    try {
      // Build multipart request payload
      const formData = new FormData();
      formData.append("action", "analyze-media");
      formData.append("mediaMetadata", JSON.stringify({
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
      }));
      formData.append("activeSignals", JSON.stringify(activeSignals));
      if (options?.priority) {
        formData.append("priority", options.priority);
      }

      // If media contains a file/blob reference, attach it
      if (media.file) {
        formData.append("file", media.file, media.name);
      } else if (media.previewUrl && media.previewUrl.startsWith("blob:")) {
        try {
          const blobRes = await fetch(media.previewUrl);
          const blob = await blobRes.blob();
          formData.append("file", blob, media.name);
        } catch {
          // Proceed with metadata-only if blob retrieval is unavailable
        }
      }

      // Stage progression simulation during network transit
      const progressTimer = this.simulateNetworkProgress(activeSignals, options?.onProgress);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), options?.timeoutMs || 45000);

      const response = await fetch(this.apiEndpoint, {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      clearInterval(progressTimer);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Verification API responded with status ${response.status}: ${errorText}`);
      }

      const report: TrustReport = await response.json();

      // Final completion progress event
      options?.onProgress?.({
        stageIndex: 5,
        stageNumber: "06",
        stageName: "EVIDENCE AGGREGATION",
        stageStatus: "complete",
        qualitativeState: "available",
        telemetry: "Multi-signal synthesis complete. TrustReport compiled.",
        percentage: 100,
        completedStages: ["file-inspection", "ai-detection", "provenance", "metadata", "forensics", "aggregation"],
        evidenceSignalsCollected: activeSignals.length,
        totalSignals: activeSignals.length,
      });

      return {
        ...report,
        executionDurationMs: Date.now() - startTime,
      };
    } catch (err: unknown) {
      console.warn("ApiAnalysisProvider network call encountered an issue:", err);

      // In development or when backend is unreachable, gracefully fallback to DemoAnalysisProvider
      if (process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_DEMO_MODE !== "false") {
        console.info("Falling back to DemoAnalysisProvider...");
        const fallback = new DemoAnalysisProvider();
        return fallback.analyzeMedia(media, activeSignals, options);
      }

      throw new Error(
        `Analysis failed: ${err instanceof Error ? err.message : "Remote verification service unavailable."}`
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

  private simulateNetworkProgress(
    activeSignals: AnalysisSignalType[],
    onProgress?: AnalysisOptions["onProgress"]
  ): ReturnType<typeof setInterval> {
    let currentStage = 1;
    const stages = [
      { num: "02", name: "AI DETECTION", telemetry: "Running synthetic media latent artifact model..." },
      { num: "03", name: "PROVENANCE", telemetry: "Inspecting C2PA manifest & hardware keystore..." },
      { num: "04", name: "METADATA", telemetry: "Extracting EXIF quantization & header blocks..." },
      { num: "05", name: "FORENSICS", telemetry: "Calculating Error Level Analysis (ELA) delta..." },
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
          percentage: Math.min(20 + currentStage * 18, 92),
          completedStages: stages.slice(0, currentStage).map((s) => s.name.toLowerCase().replace(" ", "-")),
          evidenceSignalsCollected: currentStage,
          totalSignals: activeSignals.length,
        });
        currentStage++;
      }
    }, 900);
  }
}
