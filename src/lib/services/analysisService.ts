import {
  MediaFile,
  AnalysisSignalType,
  AnalysisResult,
  EvidenceItem,
  TrustReport,
  TrustLevel,
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
    name: "File inspection",
    defaultDetail: "Validating container format, stream integrity, and cryptographic hash",
  },
  {
    number: "02",
    id: "ai-detection",
    name: "AI signal analysis",
    signalId: "ai-detection",
    defaultDetail: "Scanning for diffusion patterns, high-frequency anomalies, and generative artifacts",
  },
  {
    number: "03",
    id: "provenance",
    name: "Provenance inspection",
    signalId: "provenance",
    defaultDetail: "Checking C2PA JUMBF manifests, hardware root certificates, and manifest tampering",
  },
  {
    number: "04",
    id: "metadata",
    name: "Metadata analysis",
    signalId: "metadata",
    defaultDetail: "Parsing EXIF, XMP, IPTC headers, camera quantization tables, and timezone offsets",
  },
  {
    number: "05",
    id: "forensic",
    name: "Forensic analysis",
    signalId: "forensic",
    defaultDetail: "Evaluating error level analysis (ELA), clone-detection maps, and sensor noise consistency",
  },
  {
    number: "06",
    id: "aggregation",
    name: "Evidence aggregation",
    defaultDetail: "Synthesizing cross-signal correlations and computing confidence bounds",
  },
];

export interface AnalysisProgress {
  stageIndex: number; // 0 to 5
  stage: StageInfo;
  stageStatus: "active" | "complete" | "skipped";
  telemetry: string;
  percentage: number;
  completedStages: string[];
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
 * Implements realistic staged telemetry with deterministic timings,
 * producing structured evidence assessments tailored to the media characteristics.
 */
export class DemoAnalysisService implements AnalysisService {
  async analyze(
    media: MediaFile,
    activeSignals: AnalysisSignalType[],
    onProgress?: (progress: AnalysisProgress) => void
  ): Promise<TrustReport> {
    const startTime = Date.now();
    const completedStages: string[] = [];

    // Stage timings in ms for realistic, deterministic pacing
    const stageDurations = [600, 750, 700, 650, 800, 600];

    for (let i = 0; i < PROCESSING_STAGES.length; i++) {
      const stage = PROCESSING_STAGES[i];
      const isSignalStage = Boolean(stage.signalId);
      const isEnabled = !isSignalStage || (stage.signalId && activeSignals.includes(stage.signalId));

      const percentage = Math.round(((i) / PROCESSING_STAGES.length) * 100);

      if (!isEnabled) {
        onProgress?.({
          stageIndex: i,
          stage,
          stageStatus: "skipped",
          telemetry: `Stage ${stage.number} skipped: signal toggled off in configuration.`,
          percentage,
          completedStages: [...completedStages],
        });
        await this.delay(180);
        completedStages.push(stage.id);
        continue;
      }

      // Stage Active
      onProgress?.({
        stageIndex: i,
        stage,
        stageStatus: "active",
        telemetry: this.getTelemetryMessage(stage.id, media, "start"),
        percentage: Math.min(percentage + 8, 98),
        completedStages: [...completedStages],
      });

      // Mid-stage telemetry bump
      await this.delay(stageDurations[i] * 0.55);
      onProgress?.({
        stageIndex: i,
        stage,
        stageStatus: "active",
        telemetry: this.getTelemetryMessage(stage.id, media, "mid"),
        percentage: Math.min(percentage + 14, 98),
        completedStages: [...completedStages],
      });

      await this.delay(stageDurations[i] * 0.45);
      completedStages.push(stage.id);

      // Stage Completed
      onProgress?.({
        stageIndex: i,
        stage,
        stageStatus: "complete",
        telemetry: this.getTelemetryMessage(stage.id, media, "end"),
        percentage: Math.round(((i + 1) / PROCESSING_STAGES.length) * 100),
        completedStages: [...completedStages],
      });
    }

    const executionDurationMs = Date.now() - startTime;
    return this.generateReport(media, activeSignals, executionDurationMs);
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
        return `AI signal scan complete. Extracted 3 generative risk markers across spatial sub-bands.`;

      case "provenance":
        if (phase === "start") return `Searching ISO/IEC 23008-12 JUMBF box for C2PA manifest assertions...`;
        if (phase === "mid") return `Verifying X.509 cryptographic signature chains and hardware trust anchors...`;
        return `Provenance audit completed. No cryptographically signed C2PA manifest attached.`;

      case "metadata":
        if (phase === "start") return `Extracting EXIF, XMP, and IPTC dictionary blocks from file header...`;
        if (phase === "mid") return `Comparing JPEG quantization matrices against standard digital camera profiles...`;
        return `Metadata inspection complete. Header timestamps and device parameters consistent.`;

      case "forensic":
        if (phase === "start") return `Running Error Level Analysis (ELA) at 95% re-compression baseline...`;
        if (phase === "mid") return `Scanning for copy-move cloning patterns and localized Laplacian variance...`;
        return `Forensic analysis complete. Surface noise consistency within nominal capture tolerances.`;

      case "aggregation":
        if (phase === "start") return `Cross-referencing multi-signal weights and correlation matrix...`;
        if (phase === "mid") return `Applying Bayesian confidence bounds to evidence items...`;
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

    // 1. AI Detection Signal
    if (activeSignals.includes("ai-detection")) {
      const items: EvidenceItem[] = [
        {
          id: "ai-artifact-frequency",
          signalId: "ai-detection",
          title: "Frequency Domain Anomaly Scan",
          summary: "Minor high-frequency grid attenuation observed in fine textures; consistent with mild compression or upscaling.",
          strength: "weak",
          confidence: 28,
          details: "Discrete Cosine Transform (DCT) sub-band analysis shows low probability of GAN-induced checkerboard artifacts or latent diffusion grid noise.",
          technicalData: {
            "Spectral Kurtosis": 3.42,
            "Checkerboard Index": "0.08 (Low)",
            "Diffusion Gradient P-Value": 0.31,
          },
        },
        {
          id: "ai-anatomical-consistency",
          signalId: "ai-detection",
          title: isVideo ? "Temporal Coherence Evaluation" : "Facial & Edge Coherence",
          summary: isVideo
            ? "Inter-frame motion vectors demonstrate natural optical flow without synthetic warping."
            : "No synthetic blend boundaries or asymmetric perceptual warping detected in focal regions.",
          strength: "strong",
          confidence: 86,
          details: "Gradient magnitude consistency across sharp boundary edges aligns with authentic optical capture standards.",
          technicalData: {
            "Edge Irregularity Score": 0.12,
            "Synthetic Boundary Metric": "Negative",
          },
        },
      ];

      signalResults.push({
        signalId: "ai-detection",
        signalLabel: "AI Detection",
        status: "analyzed",
        strength: "moderate",
        confidence: 82,
        summary: "Synthetic artifact analysis indicates low probability of full generative synthesis.",
        items,
        anomalyDetected: false,
      });
    }

    // 2. Provenance / C2PA Signal
    if (activeSignals.includes("provenance")) {
      const items: EvidenceItem[] = [
        {
          id: "c2pa-manifest",
          signalId: "provenance",
          title: "Content Credentials (C2PA / CAI)",
          summary: "No cryptographic C2PA manifest or Coalition for Content Provenance signature present.",
          strength: "inconclusive",
          confidence: 50,
          details: "Standard web distribution platforms frequently strip JUMBF metadata containers upon upload. Absence is typical for standard camera outputs but limits cryptographic provenance verification.",
          technicalData: {
            "JUMBF Container": "Not Found",
            "Hardware Keystore": "Unsigned",
            "Assertion Count": 0,
          },
        },
        {
          id: "signature-chain",
          signalId: "provenance",
          title: "Digital Signature Audit",
          summary: "No publisher signing certificate detected in container metadata.",
          strength: "inconclusive",
          confidence: 45,
          details: "File does not contain embedded cryptographic attestations. Typical for consumer captures.",
          technicalData: {
            "PKI Status": "None",
            "Root Authority": "Unverified",
          },
        },
      ];

      signalResults.push({
        signalId: "provenance",
        signalLabel: "Provenance / C2PA",
        status: "inconclusive",
        strength: "inconclusive",
        confidence: 48,
        summary: "Absence of cryptographic C2PA credentials prevents origin attestation; common in consumer media.",
        items,
        anomalyDetected: false,
      });
    }

    // 3. Metadata Signal
    if (activeSignals.includes("metadata")) {
      const items: EvidenceItem[] = [
        {
          id: "meta-exif-headers",
          signalId: "metadata",
          title: "Header & Structural Tags",
          summary: "Container structure is clean with standard header block arrangement.",
          strength: "moderate",
          confidence: 76,
          details: "File format conventions match standard encoder outputs. No signs of multi-generation hex concatenation.",
          technicalData: {
            "Encoding Library": isVideo ? "libavformat / ISOM" : "JFIF / Standard Baseline",
            "Byte Alignment": "Strict Little-Endian",
            "Anomalous Padding": "0 bytes",
          },
        },
        {
          id: "meta-quantization",
          signalId: "metadata",
          title: isVideo ? "Codec Compression Matrix" : "JPEG Quantization Profile",
          summary: isVideo
            ? "Keyframe GOP structure and bitrate distribution correspond to conventional single-pass encoding."
            : "Quantization matrix matches standard digital capture profiles without re-encoding discrepancies.",
          strength: "strong",
          confidence: 84,
          details: "No conflicting quantization tables found between thumbnail preview and primary payload.",
          technicalData: {
            "Quantization Quality Est.": "92%",
            "Chroma Subsampling": "4:2:0 YUV",
          },
        },
      ];

      signalResults.push({
        signalId: "metadata",
        signalLabel: "Metadata",
        status: "analyzed",
        strength: "strong",
        confidence: 80,
        summary: "File headers and container compression characteristics are consistent and uncorrupted.",
        items,
        anomalyDetected: false,
      });
    }

    // 4. Forensic Analysis Signal
    if (activeSignals.includes("forensic")) {
      const items: EvidenceItem[] = [
        {
          id: "forensic-ela",
          signalId: "forensic",
          title: "Error Level Analysis (ELA)",
          summary: "Uniform compression error dissipation across uniform regions; no localized high-error clusters.",
          strength: "strong",
          confidence: 88,
          details: "Resaved baseline at 95% shows uniform error variance. Spliced objects would typically reveal sharp divergent error levels.",
          technicalData: {
            "Max Localized Delta": "12.4 (Uniform)",
            "Anomaly Cluster Threshold": "Exceeded: False",
          },
        },
        {
          id: "forensic-noise-sensor",
          signalId: "forensic",
          title: "Photo-Response Non-Uniformity (PRNU) Check",
          summary: "Sensor noise pattern appears contiguous across quadrant boundaries.",
          strength: "moderate",
          confidence: 75,
          details: "High-pass spatial filtering confirms continuous noise floor without abrupt localized smoothing.",
          technicalData: {
            "Noise Floor RMS": "0.014",
            "Discontinuity Index": "0.04 (Low)",
          },
        },
      ];

      signalResults.push({
        signalId: "forensic",
        signalLabel: "Forensic Analysis",
        status: "analyzed",
        strength: "strong",
        confidence: 85,
        summary: "Forensic error level analysis and sensor noise floor show continuous, authentic capture properties.",
        items,
        anomalyDetected: false,
      });
    }

    // Calculate aggregated overall score
    const analyzedSignals = signalResults.filter((s) => s.status === "analyzed");
    const avgConfidence = analyzedSignals.length > 0
      ? Math.round(analyzedSignals.reduce((acc, s) => acc + s.confidence, 0) / analyzedSignals.length)
      : 65;

    let overallTrustLevel: TrustLevel = "likely-authentic";
    let verdictTitle = "Likely Authentic";
    let verdictSummary = "Multi-signal evaluation found no substantial synthetic indicators or forensic manipulation artifacts. Provenance credentials are unverified as typical for standard consumer media.";

    if (activeSignals.length === 1 && activeSignals[0] === "provenance") {
      overallTrustLevel = "uncertain";
      verdictTitle = "Uncertain";
      verdictSummary = "Cryptographic provenance credentials were not detected, and no corroborating forensic or AI detection signals were enabled.";
    }

    return {
      id: `report-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
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
      analyzedAt: new Date().toISOString(),
      executionDurationMs: durationMs,
      overallTrustLevel,
      overallConfidence: avgConfidence,
      verdictTitle,
      verdictSummary,
      activeSignals,
      signalResults,
      keyFindings: [
        "No evidence of generative AI synthesis or latent diffusion grid patterns detected.",
        "Forensic error level analysis (ELA) confirms uniform spatial compression.",
        "No embedded C2PA Content Credentials signature detected in container headers.",
        "Container structure and byte alignment adhere to nominal capture standards.",
      ],
      disclaimer:
        "TrustLayer provides automated multi-signal evidence assessments, not absolute certainty. Verification results should be considered alongside context, chain of custody, and human review.",
    };
  }
}

// Export default singleton instance
export const defaultAnalysisService: AnalysisService = new DemoAnalysisService();
