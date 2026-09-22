/**
 * Core Verification Types for TrustLayer
 *
 * Implements strict types for all 4 independent evidence pillars:
 * 1. AI Detection (Groq Qwen multimodal)
 * 2. Provenance (C2PA Content Credentials & JUMBF)
 * 3. Metadata (EXIF, XMP, IPTC, software tags)
 * 4. Forensic Analysis (JPEG Quantization, ELA, container integrity)
 */

export type QualitativeConfidence = "low" | "moderate" | "high";

export type SignalAvailability = "available" | "not_found" | "unsupported" | "unavailable";

export type AiDetectionStatus = "detected" | "not_detected" | "inconclusive" | "unavailable";

export interface GroqVisualObservation {
  observation: string;
  interpretation: string;
  assessment: "potential_synthetic" | "potential_manipulation" | "neutral" | "unusual";
}

export interface GroqAiAnalysisResult {
  media_type: "image" | "video_frame" | "video_sampled";
  visual_observations: GroqVisualObservation[];
  synthetic_indicators: string[];
  manipulation_indicators: string[];
  text_anomalies: string[];
  facial_anomalies: string[];
  lighting_anomalies: string[];
  geometry_anomalies: string[];
  contextual_limitations: string[];
  assessment: "potentially_synthetic" | "potentially_manipulated" | "no_strong_signal" | "inconclusive";
  confidence: QualitativeConfidence;
  model_id: string;
  tokens_used?: number;
}

export interface AiDetectionSignal {
  status: AiDetectionStatus;
  evidence: string[];
  observations: GroqVisualObservation[];
  confidence: QualitativeConfidence;
  limitations: string[];
  model: string;
  analyzedFramesCount?: number;
}

export type ProvenanceStatus = "available" | "not_found" | "invalid" | "unreadable" | "unsupported";

export interface C2paAssertion {
  label: string;
  value: string;
}

export interface ProvenanceSignal {
  status: ProvenanceStatus;
  hasC2pa: boolean;
  boxTypeDetected?: string;
  manifestTitle?: string;
  claimGenerator?: string;
  signingTime?: string;
  assertions: C2paAssertion[];
  evidence: string[];
  limitations: string[];
}

export interface FileMetadata {
  fileType: string;
  mimeType: string;
  fileSizeBytes: number;
  formattedSize: string;
  dimensions?: { width: number; height: number };
  durationSeconds?: number;
  cameraMake?: string;
  cameraModel?: string;
  software?: string;
  creationDate?: string;
  colorProfile?: string;
  orientation?: string;
  hasExif: boolean;
  hasXmp: boolean;
  hasIptc: boolean;
  rawTags: Record<string, string>;
}

export interface MetadataSignal {
  status: "reviewed" | "sparse" | "inconclusive" | "unavailable";
  editingSoftwareDetected: boolean;
  editingSoftwareName?: string;
  metadata: FileMetadata;
  evidence: string[];
  limitations: string[];
}

export interface DqtInspection {
  hasDqt: boolean;
  estimatedQuality?: number;
  tableCount: number;
  isStandardChrominanceLuminance: boolean;
  notes: string[];
}

export interface ContainerAudit {
  eoiMarkerFound: boolean;
  trailingBytesAfterEoi: number;
  headerDimensionMatchesSof: boolean;
  anomalyDetected: boolean;
  notes: string[];
}

export interface ForensicsSignal {
  status: "normal" | "anomaly_detected" | "inconclusive" | "unavailable";
  dqt: DqtInspection;
  container: ContainerAudit;
  evidence: string[];
  limitations: string[];
}

export interface EvidenceAggregationResult {
  overallAssessment:
    | "POTENTIALLY SYNTHETIC / MANIPULATED"
    | "POTENTIALLY SYNTHETIC"
    | "POTENTIALLY MANIPULATED"
    | "REQUIRES REVIEW"
    | "NO STRONG SYNTHETIC SIGNALS DETECTED"
    | "INSUFFICIENT EVIDENCE";
  evidenceStrength: "Multiple Independent Signals" | "Single Corroborated Signal" | "Weak / Limited Signals" | "Inconclusive Baseline";
  confidence: "LOW" | "MODERATE" | "HIGH";
  verdictTitle: string;
  verdictSummary: string;
  whyThisAssessment: string[];
  disclaimer: string;
}

export interface FullVerificationResult {
  id: string;
  reportReferenceId: string;
  createdAt: string;
  fileName: string;
  fileSizeBytes: number;
  mediaKind: "image" | "video";
  mimeType: string;
  sha256: string;
  sha256Explanation: string;
  signals: {
    aiDetection: AiDetectionSignal;
    provenance: ProvenanceSignal;
    metadata: MetadataSignal;
    forensics: ForensicsSignal;
  };
  assessment: EvidenceAggregationResult;
}
