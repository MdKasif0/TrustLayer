export type TrustLevel = "verified" | "likely-authentic" | "uncertain" | "suspicious" | "manipulated";
export type EvidenceStrength = "strong" | "moderate" | "weak" | "inconclusive";
export type AnalysisStatus = "pending" | "running" | "complete" | "error";

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
