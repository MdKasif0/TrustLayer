import {
  MediaFile,
  AnalysisSignalType,
  AnalysisResult,
  EvidenceItem,
  TrustReport,
  TrustLevel,
  TimelineStageStatus,
  QualitativeState,
  EvidenceTimelineItem,
} from "@/lib/types";

export interface StageInfo {
  number: string;
  id: string;
  name: string;
  signalId?: AnalysisSignalType;
  defaultDetail: string;
}

export const PROCESSING_STAGES: StageInfo[] = [
  {
    number: "01",
    id: "file-inspection",
    name: "FILE INSPECTION",
    defaultDetail: "Validate media structure and basic properties.",
  },
  {
    number: "02",
    id: "ai-detection",
    name: "AI DETECTION",
    signalId: "ai-detection",
    defaultDetail: "Analyze patterns associated with synthetic media.",
  },
  {
    number: "03",
    id: "provenance",
    name: "PROVENANCE",
    signalId: "provenance",
    defaultDetail: "Check C2PA / Content Credentials when available.",
  },
  {
    number: "04",
    id: "metadata",
    name: "METADATA",
    signalId: "metadata",
    defaultDetail: "Inspect EXIF, headers and file-level information.",
  },
  {
    number: "05",
    id: "forensics",
    name: "FORENSICS",
    signalId: "forensic",
    defaultDetail: "Analyze visual or temporal inconsistencies.",
  },
  {
    number: "06",
    id: "aggregation",
    name: "EVIDENCE AGGREGATION",
    defaultDetail: "Combine available signals into a transparent assessment.",
  },
];

export interface StageRuntimeState {
  status: TimelineStageStatus;
  qualitativeState?: QualitativeState;
  detail?: string;
}

export interface AnalysisProgress {
  stageIndex: number; // 0 to 5
  stage: StageInfo;
  stageStatus: TimelineStageStatus;
  telemetry: string;
  percentage: number;
  completedStages: string[];
  stageStates: Record<string, StageRuntimeState>;
  evidenceSignalsCollected: number;
  totalSignals: number;
}

export interface AnalysisService {
  analyze(
    media: MediaFile,
    activeSignals: AnalysisSignalType[],
    onProgress?: (progress: AnalysisProgress) => void
  ): Promise<TrustReport>;
}

/**
 * Deterministic Demo Analysis Service.
 * Produces structured evidence assessments tailored to the media characteristics,
 * generating a transparent digital forensics assessment report.
 */
export class DemoAnalysisService implements AnalysisService {
  async analyze(
    media: MediaFile,
    activeSignals: AnalysisSignalType[],
    onProgress?: (progress: AnalysisProgress) => void
  ): Promise<TrustReport> {
    const startTime = Date.now();
    const completedStages: string[] = [];

    // Initialize all stage states to pending
    const stageStates: Record<string, StageRuntimeState> = {};
    PROCESSING_STAGES.forEach((s) => {
      stageStates[s.id] = { status: "pending", qualitativeState: "pending", detail: s.defaultDetail };
    });

    const signalStages = PROCESSING_STAGES.filter((s) => s.signalId && activeSignals.includes(s.signalId));
    const totalSignals = signalStages.length;
    let evidenceSignalsCollected = 0;

    // Stage timings in ms for realistic, deterministic pacing
    const stageDurations = [650, 850, 750, 700, 850, 650];

    for (let i = 0; i < PROCESSING_STAGES.length; i++) {
      const stage = PROCESSING_STAGES[i];
      const isSignalStage = Boolean(stage.signalId);
      const isEnabled = !isSignalStage || (stage.signalId && activeSignals.includes(stage.signalId));

      const percentage = Math.round((i / PROCESSING_STAGES.length) * 100);

      if (!isEnabled) {
        stageStates[stage.id] = {
          status: "pending",
          qualitativeState: "not-available",
          detail: "Signal disabled in analysis configuration",
        };

        onProgress?.({
          stageIndex: i,
          stage,
          stageStatus: "pending",
          telemetry: `Stage ${stage.number} skipped: signal toggled off in configuration.`,
          percentage,
          completedStages: [...completedStages],
          stageStates: { ...stageStates },
          evidenceSignalsCollected,
          totalSignals,
        });
        await this.delay(160);
        completedStages.push(stage.id);
        continue;
      }

      // 1. Stage Active / In-Progress
      stageStates[stage.id] = {
        status: "in-progress",
        qualitativeState: "evaluating",
        detail: stage.defaultDetail,
      };

      onProgress?.({
        stageIndex: i,
        stage,
        stageStatus: "in-progress",
        telemetry: this.getTelemetryMessage(stage.id, media, "start"),
        percentage: Math.min(percentage + 6, 98),
        completedStages: [...completedStages],
        stageStates: { ...stageStates },
        evidenceSignalsCollected,
        totalSignals,
      });

      // Mid-stage telemetry
      await this.delay(stageDurations[i] * 0.55);
      onProgress?.({
        stageIndex: i,
        stage,
        stageStatus: "in-progress",
        telemetry: this.getTelemetryMessage(stage.id, media, "mid"),
        percentage: Math.min(percentage + 12, 98),
        completedStages: [...completedStages],
        stageStates: { ...stageStates },
        evidenceSignalsCollected,
        totalSignals,
      });

      await this.delay(stageDurations[i] * 0.45);
      completedStages.push(stage.id);

      // 2. Stage Final State (Complete / Warning / Failed) with qualitative state
      const finalState = this.getStageFinalState(stage.id, media);
      stageStates[stage.id] = finalState;

      if (isSignalStage) {
        evidenceSignalsCollected += 1;
      }

      onProgress?.({
        stageIndex: i,
        stage,
        stageStatus: finalState.status,
        telemetry: this.getTelemetryMessage(stage.id, media, "end"),
        percentage: Math.round(((i + 1) / PROCESSING_STAGES.length) * 100),
        completedStages: [...completedStages],
        stageStates: { ...stageStates },
        evidenceSignalsCollected,
        totalSignals,
      });
    }

    const executionDurationMs = Date.now() - startTime;
    return this.generateReport(media, activeSignals, executionDurationMs);
  }

  private getStageFinalState(stageId: string, media: MediaFile): StageRuntimeState {
    switch (stageId) {
      case "file-inspection":
        return {
          status: "complete",
          qualitativeState: "available",
          detail: `Valid ${media.extension} container (${media.width || "dim"}x${media.height || "dim"}), SHA-256 intact`,
        };
      case "ai-detection":
        return {
          status: "complete",
          qualitativeState: "detected",
          detail: "Visual patterns associated with synthetic media were detected",
        };
      case "provenance":
        return {
          status: "warning",
          qualitativeState: "not-available",
          detail: "No verifiable C2PA Content Credentials were found",
        };
      case "metadata":
        return {
          status: "warning",
          qualitativeState: "suspicious",
          detail: "File-level metadata contains characteristics requiring further review",
        };
      case "forensics":
        return {
          status: "complete",
          qualitativeState: "detected",
          detail: "Visual inconsistencies were identified in localized compression",
        };
      case "aggregation":
        return {
          status: "complete",
          qualitativeState: "available",
          detail: "Assessment generated from available evidence across multiple signals",
        };
      default:
        return {
          status: "complete",
          qualitativeState: "available",
          detail: "Completed",
        };
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private getTelemetryMessage(
    stageId: string,
    media: MediaFile,
    phase: "start" | "mid" | "end"
  ): string {
    switch (stageId) {
      case "file-inspection":
        if (phase === "start") return `Parsing binary headers & validating ${media.type} container structure...`;
        if (phase === "mid") return `Calculating SHA-256 cryptographic digest (${media.hashSha256?.slice(0, 16) || "hash"}...)...`;
        return `Stream integrity verified (${media.width || "adaptive"}x${media.height || "adaptive"}). Zero structural corruption detected.`;

      case "ai-detection":
        if (phase === "start") return `Applying dual-domain frequency transformation and latent artifact filters...`;
        if (phase === "mid") return `Evaluating Fourier spectrum symmetry and boundary gradient distributions...`;
        return `Synthetic patterns detected: anomalous high-frequency grid attenuation in fine textures.`;

      case "provenance":
        if (phase === "start") return `Searching ISO/IEC 23008-12 JUMBF box for C2PA manifest assertions...`;
        if (phase === "mid") return `Verifying X.509 cryptographic signature chains and hardware trust anchors...`;
        return `Provenance audit completed. No cryptographically signed C2PA manifest attached.`;

      case "metadata":
        if (phase === "start") return `Extracting EXIF, XMP, and IPTC dictionary blocks from file header...`;
        if (phase === "mid") return `Comparing JPEG quantization matrices against standard digital camera profiles...`;
        return `Metadata audit complete. Non-standard quantization table entries flagged for review.`;

      case "forensics":
        if (phase === "start") return `Running Error Level Analysis (ELA) at 95% re-compression baseline...`;
        if (phase === "mid") return `Scanning for copy-move cloning patterns and localized Laplacian variance...`;
        return `Forensic analysis complete. Localized compression error rate discrepancies detected.`;

      case "aggregation":
        if (phase === "start") return `Cross-referencing multi-signal weights and correlation matrix...`;
        if (phase === "mid") return `Applying qualitative evidence synthesis logic...`;
        return `Assessment complete. Compiled final multi-signal TrustReport.`;

      default:
        return "Processing media signals...";
    }
  }

  private generateReport(
    media: MediaFile,
    activeSignals: AnalysisSignalType[],
    durationMs: number
  ): TrustReport {
    const isVideo = media.mediaKind === "video";
    const signalResults: AnalysisResult[] = [];
    const evidenceTimeline: EvidenceTimelineItem[] = [];

    // 1. AI DETECTION CARD
    if (activeSignals.includes("ai-detection")) {
      const items: EvidenceItem[] = [
        {
          id: "ai-frequency-anomalies",
          signalId: "ai-detection",
          title: "Frequency Domain Anomaly",
          summary: "Periodic high-frequency spectral spikes typical of diffusion upsampling grids.",
          strength: "strong",
          confidence: 84,
          details: "Discrete Cosine Transform (DCT) sub-band analysis reveals periodic micro-lattice distribution across fine focal textures.",
          technicalData: {
            "Spectral Kurtosis": 4.12,
            "Checkerboard Discrepancy": "Elevated (0.42)",
            "Diffusion Latent Metric": "Positive Signal",
          },
        },
        {
          id: "ai-edge-coherence",
          signalId: "ai-detection",
          title: isVideo ? "Temporal Coherence Drift" : "Perceptual Boundary Blending",
          summary: isVideo
            ? "Inter-frame motion flow shows micro-warping across fine focal edge transitions."
            : "Subtle gradient falloff inconsistencies detected along complex object boundaries.",
          strength: "moderate",
          confidence: 76,
          details: "Spatial gradient magnitudes diverge from optical lens diffusion profiles.",
          technicalData: {
            "Boundary Delta": "0.28 (Moderate)",
            "Diffusion Boundary Signature": "Observed",
          },
        },
      ];

      signalResults.push({
        signalId: "ai-detection",
        signalLabel: "AI DETECTION",
        signalValue: "HIGH",
        status: "flagged",
        strength: "strong",
        confidence: 85,
        summary: "Visual patterns associated with synthetic media were detected.",
        items,
        anomalyDetected: true,
        qualitativeState: "detected",
      });

      evidenceTimeline.push({
        signalName: "AI Detection",
        signalId: "ai-detection",
        role: "supporting signal",
        findingSummary: "Synthetic generation patterns and frequency grid anomalies detected.",
      });
    }

    // 2. PROVENANCE CARD
    if (activeSignals.includes("provenance")) {
      const items: EvidenceItem[] = [
        {
          id: "c2pa-credentials-absence",
          signalId: "provenance",
          title: "C2PA / Content Credentials Manifest",
          summary: "No cryptographic C2PA manifest or Coalition for Content Provenance signature present.",
          strength: "inconclusive",
          confidence: 50,
          details: "Standard consumer cameras, social media platforms, and messaging applications routinely strip C2PA JUMBF metadata containers. Absence of provenance credentials indicates lack of verification data, not evidence of manipulation.",
          technicalData: {
            "JUMBF Container": "Not Found",
            "Hardware Keystore": "Unsigned",
            "Manifest Status": "Unavailable",
          },
        },
      ];

      signalResults.push({
        signalId: "provenance",
        signalLabel: "PROVENANCE",
        signalValue: "NOT FOUND",
        status: "inconclusive",
        strength: "inconclusive",
        confidence: 48,
        summary: "No verifiable C2PA Content Credentials were found.",
        items,
        anomalyDetected: false,
        qualitativeState: "not-available",
      });

      evidenceTimeline.push({
        signalName: "Provenance",
        signalId: "provenance",
        role: "unavailable",
        findingSummary: "No C2PA Content Credentials attached to file container.",
      });
    }

    // 3. METADATA CARD
    if (activeSignals.includes("metadata")) {
      const items: EvidenceItem[] = [
        {
          id: "meta-header-review",
          signalId: "metadata",
          title: "Quantization & Header Discrepancies",
          summary: "Quantization table profile and software tags indicate re-encoding by non-standard capture pipelines.",
          strength: "moderate",
          confidence: 72,
          details: "Chrominance quantization matrix divergence noted against expected hardware baseline profiles.",
          technicalData: {
            "Quantization Profile": "Non-Standard Matrix",
            "Header Anomaly": "Re-saved / Post-processed",
            "Camera Serial": "Unspecified",
          },
        },
      ];

      signalResults.push({
        signalId: "metadata",
        signalLabel: "METADATA",
        signalValue: "SUSPICIOUS",
        status: "flagged",
        strength: "moderate",
        confidence: 74,
        summary: "File-level metadata contains characteristics requiring further review.",
        items,
        anomalyDetected: true,
        qualitativeState: "suspicious",
      });

      evidenceTimeline.push({
        signalName: "Metadata",
        signalId: "metadata",
        role: "supporting signal",
        findingSummary: "File-level metadata contains characteristics requiring further review.",
      });
    }

    // 4. FORENSICS CARD
    if (activeSignals.includes("forensic")) {
      const items: EvidenceItem[] = [
        {
          id: "forensic-ela-inconsistency",
          signalId: "forensic",
          title: "Error Level Analysis (ELA) Variance",
          summary: "Discrepancy in compression error rates detected between focal foreground and background regions.",
          strength: "strong",
          confidence: 82,
          details: "Resaved compression baseline shows localized error level clustering characteristic of selective manipulation or localized synthetic blending.",
          technicalData: {
            "Localized Error Delta": "28.6% (Elevated)",
            "Noise Floor RMS Variance": "Discontinuous",
          },
        },
      ];

      signalResults.push({
        signalId: "forensic",
        signalLabel: "FORENSICS",
        signalValue: "DETECTED",
        status: "flagged",
        strength: "strong",
        confidence: 81,
        summary: "Visual inconsistencies were identified.",
        items,
        anomalyDetected: true,
        qualitativeState: "detected",
      });

      evidenceTimeline.push({
        signalName: "Forensics",
        signalId: "forensic",
        role: "supporting signal",
        findingSummary: "Visual inconsistencies and compression variances identified.",
      });
    }

    const now = new Date();
    const formattedAnalyzedAt = now.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });

    const reportRef = `TL-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    return {
      id: `report-${Date.now().toString(36)}`,
      reportReferenceId: reportRef,
      mediaFile: {
        id: media.id,
        name: media.name,
        size: media.size,
        type: media.type,
        extension: media.extension,
        mediaKind: media.mediaKind,
        previewUrl: media.previewUrl,
        width: media.width,
        height: media.height,
        duration: media.duration,
        hashSha256: media.hashSha256,
      },
      analyzedAt: now.toISOString(),
      formattedAnalyzedAt,
      executionDurationMs: durationMs,
      overallTrustLevel: "suspicious",
      overallAssessment: "POTENTIALLY SYNTHETIC / MANIPULATED",
      assessmentConfidence: "MODERATE",
      evidenceStrengthLabel: "MULTIPLE SIGNALS",
      overallConfidence: 74,
      verdictTitle: "Potentially Synthetic / Manipulated",
      verdictSummary:
        "Multiple independent evidence signals (AI visual detection, metadata structure, and compression forensics) exhibit indicators consistent with synthetic generation or digital manipulation. Cryptographic provenance credentials were not detected in file headers.",
      activeSignals,
      signalResults,
      evidenceTimeline,
      keyFindings: [
        "AI Detection: Visual patterns associated with synthetic media were detected.",
        "Forensics: Localized Error Level Analysis (ELA) compression inconsistencies identified.",
        "Metadata: File-level metadata contains characteristics requiring further review.",
        "Provenance: No verifiable C2PA Content Credentials found (lack of provenance is common in consumer media and does not prove manipulation).",
      ],
      disclaimer:
        "TrustLayer provides an evidence-based assessment, not absolute proof of authenticity or manipulation.",
    };
  }
}

// Export default singleton instance
export const defaultAnalysisService: AnalysisService = new DemoAnalysisService();
