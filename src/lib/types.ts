export type TrustLevel = "verified" | "likely-authentic" | "uncertain" | "suspicious" | "manipulated";
export type EvidenceStrength = "strong" | "moderate" | "weak" | "inconclusive";
export type AnalysisStatus = "pending" | "running" | "complete" | "error";

export type AnalysisSignalType = "ai-detection" | "provenance" | "metadata" | "forensic";

export type TimelineStageStatus = "pending" | "in-progress" | "complete" | "warning" | "failed";
export type QualitativeState =
  | "detected"
  | "available"
  | "not-available"
  | "inconclusive"
  | "suspicious"
  | "pending"
  | "evaluating";

export type EvidenceConfidenceLabel = "Strong" | "Moderate" | "Limited" | "Inconclusive";
export type ProvenanceState = "Verified" | "Not found" | "Invalid" | "Incomplete" | "Unavailable";

export interface MetadataFieldEntry {
  label: string;
  value: string;
  isSuspiciousOrMissing?: boolean;
  statusText?: string;
  explanation: string;
}

export interface DetailedForensicFinding {
  id: string;
  category: string;
  title: string;
  status: "Detected" | "Normal" | "Suspicious" | "Inconclusive";
  explanation: string;
  technicalNote?: string;
}

export interface MediaFile {
  id: string;
  file?: File | Blob;
  name: string;
  size: number;
  type: string; // MIME type
  extension: string;
  mediaKind: "image" | "video";
  previewUrl: string;
  width?: number;
  height?: number;
  duration?: number; // In seconds, for videos
  hashSha256?: string;
  lastModified?: number;
}

export interface AnalysisSignal {
  id: AnalysisSignalType;
  label: string;
  shortDescription: string;
  fullDescription: string;
  enabled: boolean;
  required?: boolean;
}

export interface EvidenceItem {
  id: string;
  signalId: AnalysisSignalType;
  title: string;
  summary: string;
  strength: EvidenceStrength;
  confidence: number; // 0–100
  details?: string;
  technicalData?: Record<string, string | number | boolean>;
}

export interface EvidenceTimelineItem {
  signalName: string;
  signalId: AnalysisSignalType;
  role: "supporting signal" | "unavailable" | "neutral" | "contradictory";
  findingSummary: string;
}

export interface AnalysisResult {
  signalId: AnalysisSignalType;
  signalLabel: string;
  status: "analyzed" | "flagged" | "inconclusive" | "skipped";
  signalValue?: string; // e.g., "HIGH", "NOT FOUND", "SUSPICIOUS", "DETECTED"
  strength: EvidenceStrength;
  confidence: number; // 0–100
  summary: string;
  items: EvidenceItem[];
  anomalyDetected: boolean;
  qualitativeState?: QualitativeState;
  evidenceConfidence?: EvidenceConfidenceLabel;
}

export interface ProcessingStage {
  number: string; // e.g., "01"
  id: string;
  name: string;
  description: string;
  status: TimelineStageStatus;
  qualitativeState?: QualitativeState;
  telemetryMessage?: string;
}

export interface TrustReport {
  id: string;
  reportReferenceId: string;
  mediaFile: {
    id: string;
    name: string;
    size: number;
    type: string;
    extension: string;
    mediaKind: "image" | "video";
    previewUrl: string;
    width?: number;
    height?: number;
    duration?: number;
    hashSha256?: string;
  };
  analyzedAt: string;
  formattedAnalyzedAt: string;
  executionDurationMs: number;
  overallTrustLevel: TrustLevel;
  overallAssessment: string; // e.g., "POTENTIALLY SYNTHETIC / MANIPULATED"
  assessmentConfidence: "LOW" | "MODERATE" | "HIGH";
  evidenceStrengthLabel: string; // e.g., "MULTIPLE SIGNALS"
  overallConfidence: number; // 0–100 for backwards compatibility
  verdictTitle: string;
  verdictSummary: string;
  activeSignals: AnalysisSignalType[];
  signalResults: AnalysisResult[];
  evidenceTimeline: EvidenceTimelineItem[];
  keyFindings: string[];
  disclaimer: string;
}

// Backward-compatible types for existing components
export interface EvidenceSignal {
  id: string;
  label: string;
  category: "ai-detection" | "provenance" | "metadata" | "forensic";
  strength: EvidenceStrength;
  confidence: number; // 0–100
  summary: string;
  details?: string;
}

export interface VerificationReport {
  id: string;
  filename: string;
  fileType: "image" | "video";
  fileSize: number;
  uploadedAt: string;
  status: AnalysisStatus;
  trustLevel?: TrustLevel;
  overallConfidence?: number;
  signals: EvidenceSignal[];
  thumbnailUrl?: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  external?: boolean;
}
