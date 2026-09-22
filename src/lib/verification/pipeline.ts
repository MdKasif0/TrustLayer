import {
  MediaFile,
  AnalysisSignalType,
  TrustReport,
  AnalysisResult,
  EvidenceItem,
  EvidenceTimelineItem,
  TrustLevel,
} from "@/lib/types";
import { computeSha256 } from "./hash";
import { inspectProvenance } from "./provenance";
import { extractMetadata } from "./metadata";
import { inspectForensics } from "./forensics";
import { aggregateVerificationSignals } from "./aggregator";
import { analyzeImageWithGroq } from "../groq/analyze-image";
import { analyzeVideoFramesWithGroq, VideoFrameSample } from "../groq/analyze-video";
import { AiDetectionSignal, GroqAiAnalysisResult } from "./types";

export interface VerificationPipelineOptions {
  buffer: Buffer;
  fileName: string;
  mimeType: string;
  activeSignals: AnalysisSignalType[];
  dimensions?: { width?: number; height?: number; duration?: number };
  videoFrames?: VideoFrameSample[];
  previewUrl?: string;
}

/**
 * Main End-to-End Real Verification Pipeline
 *
 * Runs genuine inspections across all active evidence pillars:
 * 1. SHA-256 Cryptographic Hash
 * 2. C2PA / Content Credentials Provenance Scanner
 * 3. EXIF, XMP, IPTC, and Software Metadata Extraction
 * 4. JPEG DQT Quantization & Container Forensics
 * 5. Groq Qwen AI Multimodal Visual / Video Analysis
 * 6. Deterministic Multi-Signal Evidence Aggregation
 */
export async function runVerificationPipeline(
  options: VerificationPipelineOptions
): Promise<TrustReport> {
  const startTime = Date.now();
  const {
    buffer,
    fileName,
    mimeType,
    activeSignals,
    dimensions,
    videoFrames,
    previewUrl = "",
  } = options;

  const isVideo =
    mimeType.startsWith("video/") ||
    fileName.toLowerCase().endsWith(".mp4") ||
    fileName.toLowerCase().endsWith(".mov");

  // Step 1: Cryptographic SHA-256 Digest
  const hashResult = computeSha256(buffer);

  // Step 2, 3, 4: Run local binary checks concurrently for speed
  const [provenanceSignal, metadataSignal, forensicsSignal] = await Promise.all([
    inspectProvenance(buffer, mimeType),
    extractMetadata(buffer, fileName, mimeType, dimensions),
    inspectForensics(buffer, mimeType, dimensions),
  ]);

  // Step 5: AI Visual Analysis via Groq
  let aiSignal: AiDetectionSignal;

  if (activeSignals.includes("ai-detection")) {
    try {
      let groqResult: GroqAiAnalysisResult;

      if (isVideo && videoFrames && videoFrames.length > 0) {
        groqResult = await analyzeVideoFramesWithGroq(videoFrames);
      } else {
        groqResult = await analyzeImageWithGroq(buffer, mimeType);
      }

      // Map Groq output to AiDetectionSignal
      const hasSyntheticIndicators = groqResult.synthetic_indicators.length > 0;
      const hasManipulationIndicators = groqResult.manipulation_indicators.length > 0;
      const isDetected =
        groqResult.assessment === "potentially_synthetic" ||
        groqResult.assessment === "potentially_manipulated" ||
        hasSyntheticIndicators ||
        hasManipulationIndicators;

      const aiEvidenceList: string[] = [];
      for (const obs of groqResult.visual_observations) {
        aiEvidenceList.push(`${obs.observation} (${obs.interpretation})`);
      }
      for (const syn of groqResult.synthetic_indicators) {
        aiEvidenceList.push(`Synthetic pattern: ${syn}`);
      }
      for (const man of groqResult.manipulation_indicators) {
        aiEvidenceList.push(`Manipulation pattern: ${man}`);
      }

      aiSignal = {
        status: isDetected
          ? "detected"
          : groqResult.assessment === "inconclusive"
          ? "inconclusive"
          : "not_detected",
        evidence: aiEvidenceList.length > 0 ? aiEvidenceList : ["No prominent generative artifacts observed."],
        observations: groqResult.visual_observations,
        confidence: groqResult.confidence,
        limitations: groqResult.contextual_limitations,
        model: groqResult.model_id,
        analyzedFramesCount: isVideo && videoFrames ? videoFrames.length : 1,
      };
    } catch (groqErr) {
      console.warn("Groq AI visual analysis failed, setting signal to unavailable:", groqErr);
      aiSignal = {
        status: "unavailable",
        evidence: ["AI visual analysis service could not be reached."],
        observations: [],
        confidence: "low",
        limitations: [
          "Groq API connection was unavailable or encountered a timeout. Assessment relies on metadata, provenance, and forensic signals.",
        ],
        model: process.env.GROQ_MODEL || "qwen/qwen3.8-27b",
      };
    }
  } else {
    aiSignal = {
      status: "unavailable",
      evidence: ["AI visual inspection was deactivated by the user."],
      observations: [],
      confidence: "low",
      limitations: ["Signal disabled in configuration."],
      model: "deactivated",
    };
  }

  // Step 6: Deterministic Multi-Signal Evidence Aggregator
  const aggregation = aggregateVerificationSignals(
    aiSignal,
    provenanceSignal,
    metadataSignal,
    forensicsSignal
  );

  // Map to UI TrustLevel
  let overallTrustLevel: TrustLevel;
  if (aggregation.overallAssessment.includes("POTENTIALLY SYNTHETIC") || aggregation.overallAssessment.includes("MANIPULATED")) {
    overallTrustLevel = "suspicious";
  } else if (aggregation.overallAssessment === "REQUIRES REVIEW") {
    overallTrustLevel = "uncertain";
  } else if (aggregation.overallAssessment === "INSUFFICIENT EVIDENCE") {
    overallTrustLevel = "uncertain";
  } else if (provenanceSignal.hasC2pa) {
    overallTrustLevel = "verified";
  } else {
    overallTrustLevel = "likely-authentic";
  }

  // Build SignalResults for UI
  const signalResults: AnalysisResult[] = [];
  const evidenceTimeline: EvidenceTimelineItem[] = [];

  // 1. AI Detection
  if (activeSignals.includes("ai-detection")) {
    const aiFlagged = aiSignal.status === "detected";
    const aiConfidenceScore =
      aiSignal.confidence === "high" ? 85 : aiSignal.confidence === "moderate" ? 65 : 40;

    const aiItems: EvidenceItem[] = aiSignal.evidence.map((ev, idx) => ({
      id: `ai-ev-${idx}`,
      signalId: "ai-detection",
      title: ev.split(":")[0] || "Visual Feature",
      summary: ev,
      strength: aiFlagged ? "strong" : "weak",
      confidence: aiConfidenceScore,
    }));

    signalResults.push({
      signalId: "ai-detection",
      signalLabel: "AI Visual Inspection",
      status: aiFlagged ? "flagged" : aiSignal.status === "unavailable" ? "skipped" : "analyzed",
      signalValue: aiFlagged ? "SIGNAL DETECTED" : aiSignal.status === "unavailable" ? "UNAVAILABLE" : "NO STRONG SIGNAL",
      strength: aiFlagged ? "strong" : "moderate",
      confidence: aiConfidenceScore,
      summary: aiFlagged
        ? `Observed ${aiSignal.evidence.length} potential synthetic or manipulated visual pattern(s).`
        : aiSignal.status === "unavailable"
        ? "AI visual analysis is unavailable."
        : "No prominent generative synthesis patterns were observed.",
      items: aiItems,
      anomalyDetected: aiFlagged,
      qualitativeState: aiFlagged ? "detected" : aiSignal.status === "unavailable" ? "not-available" : "available",
      evidenceConfidence: aiSignal.confidence === "high" ? "Strong" : aiSignal.confidence === "moderate" ? "Moderate" : "Limited",
    });

    evidenceTimeline.push({
      signalName: "AI Visual Analysis",
      signalId: "ai-detection",
      role: aiFlagged ? "supporting signal" : "neutral",
      findingSummary: aiFlagged
        ? "Generative or manipulation indicators observed by Groq Qwen visual model"
        : "No significant generative anomalies detected",
    });
  }

  // 2. Provenance / C2PA
  if (activeSignals.includes("provenance")) {
    const provItems: EvidenceItem[] = provenanceSignal.evidence.map((ev, idx) => ({
      id: `prov-ev-${idx}`,
      signalId: "provenance",
      title: ev.split(":")[0] || "Provenance Record",
      summary: ev,
      strength: provenanceSignal.hasC2pa ? "strong" : "inconclusive",
      confidence: provenanceSignal.hasC2pa ? 90 : 30,
    }));

    signalResults.push({
      signalId: "provenance",
      signalLabel: "C2PA Provenance & Content Credentials",
      status: provenanceSignal.hasC2pa ? "analyzed" : "inconclusive",
      signalValue: provenanceSignal.hasC2pa ? "AVAILABLE" : "NOT FOUND",
      strength: provenanceSignal.hasC2pa ? "strong" : "inconclusive",
      confidence: provenanceSignal.hasC2pa ? 95 : 25,
      summary: provenanceSignal.hasC2pa
        ? `C2PA Content Credentials found in container (${provenanceSignal.boxTypeDetected}).`
        : "No C2PA Content Credentials were detected in the uploaded file.",
      items: provItems,
      anomalyDetected: false,
      qualitativeState: provenanceSignal.hasC2pa ? "available" : "not-available",
      evidenceConfidence: provenanceSignal.hasC2pa ? "Strong" : "Inconclusive",
    });

    evidenceTimeline.push({
      signalName: "C2PA Provenance",
      signalId: "provenance",
      role: provenanceSignal.hasC2pa ? "supporting signal" : "unavailable",
      findingSummary: provenanceSignal.hasC2pa
        ? "Cryptographic C2PA manifest present"
        : "No C2PA Content Credentials detected (neutral baseline)",
    });
  }

  // 3. Metadata
  if (activeSignals.includes("metadata")) {
    const metaFlagged = metadataSignal.editingSoftwareDetected;
    const metaItems: EvidenceItem[] = metadataSignal.evidence.map((ev, idx) => ({
      id: `meta-ev-${idx}`,
      signalId: "metadata",
      title: ev.split(":")[0] || "Metadata Field",
      summary: ev,
      strength: metaFlagged ? "moderate" : "weak",
      confidence: metaFlagged ? 75 : 60,
    }));

    signalResults.push({
      signalId: "metadata",
      signalLabel: "File Metadata & Headers",
      status: metaFlagged ? "flagged" : "analyzed",
      signalValue: metaFlagged ? "EDITING DETECTED" : "REVIEWED",
      strength: metaFlagged ? "moderate" : "moderate",
      confidence: 70,
      summary: metaFlagged
        ? `Editing-software metadata detected ("${metadataSignal.editingSoftwareName}").`
        : metadataSignal.metadata.hasExif
        ? `EXIF metadata reviewed (${metadataSignal.metadata.cameraMake || "Standard acquisition"}).`
        : "Container headers reviewed (minimal metadata present).",
      items: metaItems,
      anomalyDetected: metaFlagged,
      qualitativeState: metaFlagged ? "suspicious" : "available",
      evidenceConfidence: "Moderate",
    });

    evidenceTimeline.push({
      signalName: "Metadata Inspection",
      signalId: "metadata",
      role: metaFlagged ? "supporting signal" : "neutral",
      findingSummary: metaFlagged
        ? `Editing software tags detected (${metadataSignal.editingSoftwareName})`
        : "Camera tags or container timestamps consistent",
    });
  }

  // 4. Forensics
  if (activeSignals.includes("forensic")) {
    const forensicFlagged = forensicsSignal.status === "anomaly_detected";
    const forensicItems: EvidenceItem[] = forensicsSignal.evidence.map((ev, idx) => ({
      id: `forensic-ev-${idx}`,
      signalId: "forensic",
      title: ev.split(":")[0] || "Forensic Metric",
      summary: ev,
      strength: forensicFlagged ? "strong" : "moderate",
      confidence: forensicFlagged ? 80 : 70,
    }));

    signalResults.push({
      signalId: "forensic",
      signalLabel: "Forensics & Quantization",
      status: forensicFlagged ? "flagged" : forensicsSignal.status === "unavailable" ? "skipped" : "analyzed",
      signalValue: forensicFlagged ? "ANOMALY DETECTED" : forensicsSignal.status === "unavailable" ? "UNAVAILABLE" : "NORMAL",
      strength: forensicFlagged ? "strong" : "moderate",
      confidence: 75,
      summary: forensicFlagged
        ? "Container or quantization discrepancies detected."
        : forensicsSignal.status === "unavailable"
        ? "Advanced forensics not enabled for container type."
        : "Quantization tables and container structure conform to standard expectations.",
      items: forensicItems,
      anomalyDetected: forensicFlagged,
      qualitativeState: forensicFlagged ? "suspicious" : forensicsSignal.status === "unavailable" ? "not-available" : "available",
      evidenceConfidence: "Moderate",
    });

    evidenceTimeline.push({
      signalName: "Forensic Analysis",
      signalId: "forensic",
      role: forensicFlagged ? "supporting signal" : "neutral",
      findingSummary: forensicFlagged
        ? "Container structural or quantization anomaly detected"
        : "Standard JPEG/PNG stream termination and table curves",
    });
  }

  const now = new Date();
  const reportId = `rep_${now.getTime().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
  const reportRef = `TL-${now.getFullYear()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

  const formattedDate = now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return {
    id: reportId,
    reportReferenceId: reportRef,
    mediaFile: {
      id: `media-${now.getTime()}`,
      name: fileName,
      size: buffer.length,
      type: mimeType,
      extension: fileName.split(".").pop()?.toUpperCase() || "JPG",
      mediaKind: isVideo ? "video" : "image",
      previewUrl,
      width: metadataSignal.metadata.dimensions?.width,
      height: metadataSignal.metadata.dimensions?.height,
      duration: dimensions?.duration,
      hashSha256: hashResult.sha256,
    },
    analyzedAt: now.toISOString(),
    formattedAnalyzedAt: formattedDate,
    executionDurationMs: Date.now() - startTime,
    overallTrustLevel,
    overallAssessment: aggregation.overallAssessment,
    assessmentConfidence: aggregation.confidence,
    evidenceStrengthLabel: aggregation.evidenceStrength.toUpperCase(),
    overallConfidence: aggregation.confidence === "HIGH" ? 85 : aggregation.confidence === "MODERATE" ? 65 : 45,
    verdictTitle: aggregation.verdictTitle,
    verdictSummary: aggregation.verdictSummary,
    activeSignals,
    signalResults,
    evidenceTimeline,
    keyFindings: aggregation.whyThisAssessment,
    disclaimer: aggregation.disclaimer,
  };
}
