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
    const initialStageStates: Record<string, any> = {
      "file-inspection": {
        status: "in-progress",
        qualitativeState: "evaluating",
        detail: "Validating container format and binary integrity.",
      },
      "ai-detection": { status: "pending", qualitativeState: "pending", detail: "Waiting for visual analysis." },
      provenance: { status: "pending", qualitativeState: "pending", detail: "Waiting for C2PA container inspection." },
      metadata: { status: "pending", qualitativeState: "pending", detail: "Waiting for EXIF/XMP extraction." },
      forensics: { status: "pending", qualitativeState: "pending", detail: "Waiting for DQT table inspection." },
      aggregation: { status: "pending", qualitativeState: "pending", detail: "Waiting for evidence synthesis." },
    };

    options?.onProgress?.({
      stageIndex: 0,
      stageNumber: "01",
      stageName: "FILE INSPECTION",
      stageStatus: "in-progress",
      qualitativeState: "evaluating",
      telemetry: `Validating container format and size for ${media.name}...`,
      percentage: 15,
      completedStages: [],
      stageStates: initialStageStates,
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
            completedStages: ["file-inspection"],
            stageStates: {
              ...initialStageStates,
              "file-inspection": { status: "complete", qualitativeState: "available", detail: "File verified." },
              "ai-detection": { status: "in-progress", qualitativeState: "evaluating", detail: "Sampling frames for multimodal inspection." },
            },
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

      const finalStageStates: Record<string, any> = {
        "file-inspection": { status: "complete", qualitativeState: "available", detail: "Container valid." },
        "ai-detection": { status: "complete", qualitativeState: "available", detail: "Groq visual analysis complete." },
        provenance: { status: "complete", qualitativeState: "available", detail: "C2PA audit complete." },
        metadata: { status: "complete", qualitativeState: "available", detail: "EXIF/XMP extracted." },
        forensics: { status: "complete", qualitativeState: "available", detail: "Quantization & container audit complete." },
        aggregation: { status: "complete", qualitativeState: "available", detail: "Transparent assessment compiled." },
      };

      // Final complete stage
      options?.onProgress?.({
        stageIndex: 5,
        stageNumber: "06",
        stageName: "EVIDENCE AGGREGATION",
        stageStatus: "complete",
        qualitativeState: "available",
        telemetry: "Multi-signal synthesis complete. Trust Report generated.",
        percentage: 100,
        completedStages: [
          "file-inspection",
          "ai-detection",
          "provenance",
          "metadata",
          "forensics",
          "aggregation",
        ],
        stageStates: finalStageStates,
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
      { id: "ai-detection", num: "02", name: "AI DETECTION", telemetry: "Running Groq Qwen multimodal visual evidence inspection..." },
      { id: "provenance", num: "03", name: "PROVENANCE", telemetry: "Scanning JUMBF boxes and C2PA Content Credentials..." },
      { id: "metadata", num: "04", name: "METADATA", telemetry: "Extracting EXIF, XMP, and editing software headers..." },
      { id: "forensics", num: "05", name: "FORENSICS", telemetry: "Auditing JPEG DQT quantization tables & container boundaries..." },
      { id: "aggregation", num: "06", name: "EVIDENCE AGGREGATION", telemetry: "Synthesizing independent evidence signals into Trust Report..." },
    ];

    const currentStates: Record<string, any> = {
      "file-inspection": { status: "complete", qualitativeState: "available", detail: "Container valid." },
      "ai-detection": { status: "pending", qualitativeState: "pending", detail: "Waiting for visual analysis." },
      provenance: { status: "pending", qualitativeState: "pending", detail: "Waiting for C2PA container inspection." },
      metadata: { status: "pending", qualitativeState: "pending", detail: "Waiting for EXIF/XMP extraction." },
      forensics: { status: "pending", qualitativeState: "pending", detail: "Waiting for DQT table inspection." },
      aggregation: { status: "pending", qualitativeState: "pending", detail: "Waiting for evidence synthesis." },
    };

    return setInterval(() => {
      if (currentStage <= stages.length && onProgress) {
        const stage = stages[currentStage - 1];
        if (stage) {
          // Mark previous as complete
          if (currentStage > 1) {
            const prevStage = stages[currentStage - 2];
            currentStates[prevStage.id] = {
              status: "complete",
              qualitativeState: "available",
              detail: `${prevStage.name} complete.`,
            };
          }
          currentStates[stage.id] = {
            status: "in-progress",
            qualitativeState: "evaluating",
            detail: stage.telemetry,
          };

          onProgress({
            stageIndex: currentStage,
            stageNumber: stage.num,
            stageName: stage.name,
            stageStatus: "in-progress",
            qualitativeState: "evaluating",
            telemetry: stage.telemetry,
            percentage: Math.min(20 + currentStage * 14, 92),
            completedStages: ["file-inspection", ...stages.slice(0, currentStage - 1).map((s) => s.id)],
            stageStates: { ...currentStates },
            evidenceSignalsCollected: Math.min(currentStage, activeSignals.length),
            totalSignals: activeSignals.length,
          });
        }
        currentStage++;
      }
    }, 1100);
  }
}
