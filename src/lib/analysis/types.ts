import {
  MediaFile,
  AnalysisSignalType,
  TrustReport,
  EvidenceItem,
  EvidenceStrength,
  QualitativeState,
  EvidenceConfidenceLabel,
  ProvenanceState,
  TimelineStageStatus,
} from "@/lib/types";

export interface AnalysisProgressEvent {
  stageIndex: number;
  stageNumber: string;
  stageName: string;
  stageStatus: TimelineStageStatus;
  qualitativeState?: QualitativeState;
  telemetry: string;
  percentage: number;
  completedStages: string[];
  evidenceSignalsCollected: number;
  totalSignals: number;
}

export interface AnalysisOptions {
  activeSignals?: AnalysisSignalType[];
  priority?: "standard" | "deep";
  timeoutMs?: number;
  onProgress?: (event: AnalysisProgressEvent) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Specific Analysis Method Results
// ─────────────────────────────────────────────────────────────────────────────

export interface ImageAnalysisResult {
  isAiGenerated: boolean;
  signalStrength: EvidenceStrength;
  confidenceLabel: EvidenceConfidenceLabel;
  detectedIndicators: string[];
  frequencyAnomaliesDetected: boolean;
  boundaryInconsistencies: boolean;
  modelIdentifier: string;
  analysisScope: string;
  limitations: string;
  items: EvidenceItem[];
  isDemo: boolean;
}

export interface VideoAnalysisResult {
  isAiGenerated: boolean;
  signalStrength: EvidenceStrength;
  confidenceLabel: EvidenceConfidenceLabel;
  detectedIndicators: string[];
  temporalCoherenceScore: number; // 0-100 normalized
  faceWarpingDetected: boolean;
  frameInconsistencies: boolean;
  audioVideoSyncOffsetMs?: number;
  keyframesSampled: number;
  modelIdentifier: string;
  limitations: string;
  items: EvidenceItem[];
  isDemo: boolean;
}

export interface MetadataAnalysisResult {
  status: "verified" | "suspicious" | "incomplete" | "standard";
  confidenceLabel: EvidenceConfidenceLabel;
  exifPresent: boolean;
  containerMime: string;
  softwareTag?: string;
  cameraMakeModel?: string;
  quantizationProfileConsistent: boolean;
  timestampDeltaHours?: number;
  suspiciousFields: string[];
  findings: string[];
  isDemo: boolean;
}

export interface ProvenanceAnalysisResult {
  c2paStatus: ProvenanceState;
  confidenceLabel: EvidenceConfidenceLabel;
  jumbfBoxPresent: boolean;
  hasValidSignature: boolean;
  signerIdentity?: string;
  signingTime?: string;
  editHistoryAssertionsCount: number;
  hardwareKeystoreVerified: boolean;
  summary: string;
  policyNote: string;
  isDemo: boolean;
}

export interface ForensicsAnalysisResult {
  status: "detected" | "nominal" | "inconclusive";
  confidenceLabel: EvidenceConfidenceLabel;
  elaVarianceDelta: number; // e.g., 28.6%
  noiseFloorConsistent: boolean;
  lightingInconsistencyAngle?: number;
  edgeHaloDetected: boolean;
  anomalousQuadrants: number[];
  findings: string[];
  isDemo: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Future Provider & Service Interfaces (Pluggable Microservices)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Interface for AI Detection vendor APIs (e.g. Hive, Sightengine, internal PyTorch models)
 */
export interface AiDetectionService {
  readonly serviceName: string;
  detectSyntheticImage(imageBuffer: ArrayBuffer | Blob): Promise<ImageAnalysisResult>;
  detectSyntheticVideo(videoBuffer: ArrayBuffer | Blob): Promise<VideoAnalysisResult>;
}

/**
 * Interface for C2PA parser services (e.g. c2pa-rs, c2patool, CAI Node SDK)
 */
export interface C2paParserService {
  readonly serviceName: string;
  inspectManifest(fileBuffer: ArrayBuffer | Blob): Promise<ProvenanceAnalysisResult>;
}

/**
 * Interface for metadata extraction services (e.g. ExifTool, libexif)
 */
export interface MetadataParserService {
  readonly serviceName: string;
  extractHeaders(fileBuffer: ArrayBuffer | Blob): Promise<MetadataAnalysisResult>;
}

/**
 * Interface for computer vision and forensic analysis engines
 */
export interface ComputerVisionForensicsService {
  readonly serviceName: string;
  runErrorLevelAnalysis(imageBuffer: ArrayBuffer | Blob, baselineQuality?: number): Promise<{ varianceDelta: number; heatmapUrl?: string }>;
  analyzePrnuNoise(imageBuffer: ArrayBuffer | Blob): Promise<{ isContiguous: boolean; quadrantDeltas: number[] }>;
  analyzeEdgeGradients(imageBuffer: ArrayBuffer | Blob): Promise<{ edgeHalosFound: boolean }>;
}

/**
 * Interface for Python/FastAPI backend gateway
 */
export interface PythonBackendService {
  readonly endpointUrl: string;
  healthCheck(): Promise<boolean>;
  dispatchVerification(file: File | Blob, signals: AnalysisSignalType[]): Promise<TrustReport>;
}
