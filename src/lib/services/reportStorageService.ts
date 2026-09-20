import { TrustReport } from "@/lib/types";

export type StoredAssessmentType =
  | "Potentially Synthetic"
  | "Requires Review"
  | "Insufficient Evidence"
  | "No Significant Synthetic Signals";

export interface StoredReport {
  id: string;
  reportReferenceId: string;
  fileName: string;
  fileType: string;
  mediaKind: "image" | "video";
  fileSize: number;
  dimensions?: string;
  thumbnailUrl?: string;
  analyzedAt: string;
  formattedDate: string;
  overallAssessment: StoredAssessmentType;
  assessmentConfidence: "LOW" | "MODERATE" | "HIGH";
  evidenceSummary: string;
  status: "Complete" | "Flagged" | "Review Required" | "Verified";
  isDemo?: boolean;
  fullReport: TrustReport;
}

export interface ReportStorageService {
  getReports(): Promise<StoredReport[]>;
  getReportById(id: string): Promise<StoredReport | null>;
  saveReport(report: TrustReport, mediaThumbnail?: string): Promise<StoredReport>;
  deleteReport(id: string): Promise<void>;
  clearAll(): Promise<void>;
  seedDemoReports(): Promise<StoredReport[]>;
}

const STORAGE_KEY = "trustlayer_verification_reports_v1";

class LocalReportStorageService implements ReportStorageService {
  async getReports(): Promise<StoredReport[]> {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      return JSON.parse(data) as StoredReport[];
    } catch (e) {
      console.error("Failed to read reports from localStorage:", e);
      return [];
    }
  }

  async getReportById(id: string): Promise<StoredReport | null> {
    const reports = await this.getReports();
    return reports.find((r) => r.id === id || r.reportReferenceId === id) || null;
  }

  async saveReport(report: TrustReport, mediaThumbnail?: string): Promise<StoredReport> {
    const reports = await this.getReports();

    // Map assessment string to standard historical assessment state
    let overallAssessment: StoredAssessmentType = "Potentially Synthetic";
    let status: StoredReport["status"] = "Flagged";

    if (report.overallAssessment.includes("POTENTIALLY SYNTHETIC") || report.overallTrustLevel === "suspicious" || report.overallTrustLevel === "manipulated") {
      overallAssessment = "Potentially Synthetic";
      status = "Flagged";
    } else if (report.overallTrustLevel === "uncertain") {
      overallAssessment = "Insufficient Evidence";
      status = "Review Required";
    } else if (report.overallTrustLevel === "likely-authentic" || report.overallTrustLevel === "verified") {
      overallAssessment = "No Significant Synthetic Signals";
      status = "Verified";
    } else {
      overallAssessment = "Requires Review";
      status = "Review Required";
    }

    const flaggedSignalsCount = report.signalResults.filter((s) => s.status === "flagged" || s.anomalyDetected).length;
    const evidenceSummary = flaggedSignalsCount > 0
      ? `${flaggedSignalsCount} Signals Flagged`
      : report.activeSignals.includes("provenance")
      ? "C2PA Missing, Baseline Normal"
      : "Multi-Signal Consistent";

    const storedItem: StoredReport = {
      id: report.id,
      reportReferenceId: report.reportReferenceId,
      fileName: report.mediaFile.name,
      fileType: report.mediaFile.extension,
      mediaKind: report.mediaFile.mediaKind,
      fileSize: report.mediaFile.size,
      dimensions: report.mediaFile.width && report.mediaFile.height ? `${report.mediaFile.width} × ${report.mediaFile.height}` : undefined,
      thumbnailUrl: mediaThumbnail || report.mediaFile.previewUrl,
      analyzedAt: report.analyzedAt,
      formattedDate: report.formattedAnalyzedAt,
      overallAssessment,
      assessmentConfidence: report.assessmentConfidence,
      evidenceSummary,
      status,
      isDemo: false,
      fullReport: report,
    };

    // Filter out if already exists, then prepend
    const updated = [storedItem, ...reports.filter((r) => r.id !== report.id)];

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn("Storage quota exceeded or error storing report; keeping in memory", e);
    }

    return storedItem;
  }

  async deleteReport(id: string): Promise<void> {
    const reports = await this.getReports();
    const updated = reports.filter((r) => r.id !== id && r.reportReferenceId !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to delete report:", e);
    }
  }

  async clearAll(): Promise<void> {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error("Failed to clear reports:", e);
    }
  }

  async seedDemoReports(): Promise<StoredReport[]> {
    const existing = await this.getReports();
    if (existing.some((r) => r.isDemo)) {
      return existing; // Demo examples already seeded
    }

    const demoItems: StoredReport[] = [
      {
        id: "demo-report-01",
        reportReferenceId: "TL-2026-9041",
        fileName: "portrait-synthetic-profile.jpg",
        fileType: "JPG",
        mediaKind: "image",
        fileSize: 384 * 1024,
        dimensions: "1024 × 1024",
        analyzedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        formattedDate: "September 20, 2026 at 04:15 PM EDT",
        overallAssessment: "Potentially Synthetic",
        assessmentConfidence: "MODERATE",
        evidenceSummary: "3 Signals Flagged",
        status: "Flagged",
        isDemo: true,
        fullReport: this.createMockReport(
          "demo-report-01",
          "TL-2026-9041",
          "portrait-synthetic-profile.jpg",
          "JPG",
          "image",
          384 * 1024,
          1024,
          1024,
          "POTENTIALLY SYNTHETIC / MANIPULATED",
          "MODERATE",
          "MULTIPLE SIGNALS",
          "suspicious"
        ),
      },
      {
        id: "demo-report-02",
        reportReferenceId: "TL-2026-8412",
        fileName: "press-conference-segment.mp4",
        fileType: "MP4",
        mediaKind: "video",
        fileSize: 8.4 * 1024 * 1024,
        dimensions: "1920 × 1080",
        analyzedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        formattedDate: "September 19, 2026 at 11:30 AM EDT",
        overallAssessment: "Requires Review",
        assessmentConfidence: "LOW",
        evidenceSummary: "Mismatched Audio/Video GOP",
        status: "Review Required",
        isDemo: true,
        fullReport: this.createMockReport(
          "demo-report-02",
          "TL-2026-8412",
          "press-conference-segment.mp4",
          "MP4",
          "video",
          8.4 * 1024 * 1024,
          1920,
          1080,
          "REQUIRES REVIEW / INCONCLUSIVE",
          "LOW",
          "LIMITED EVIDENCE",
          "uncertain"
        ),
      },
      {
        id: "demo-report-03",
        reportReferenceId: "TL-2026-7204",
        fileName: "field-documentary-raw.jpg",
        fileType: "JPG",
        mediaKind: "image",
        fileSize: 1.8 * 1024 * 1024,
        dimensions: "2048 × 1536",
        analyzedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
        formattedDate: "September 18, 2026 at 02:45 PM EDT",
        overallAssessment: "No Significant Synthetic Signals",
        assessmentConfidence: "HIGH",
        evidenceSummary: "Full Baseline Intact",
        status: "Verified",
        isDemo: true,
        fullReport: this.createMockReport(
          "demo-report-03",
          "TL-2026-7204",
          "field-documentary-raw.jpg",
          "JPG",
          "image",
          1.8 * 1024 * 1024,
          2048,
          1536,
          "NO SIGNIFICANT SYNTHETIC SIGNALS",
          "HIGH",
          "MULTIPLE SIGNALS",
          "verified"
        ),
      },
    ];

    const merged = [...demoItems, ...existing];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    } catch (e) {
      console.warn("Storage error saving demo reports:", e);
    }
    return merged;
  }

  private createMockReport(
    id: string,
    ref: string,
    name: string,
    ext: string,
    kind: "image" | "video",
    size: number,
    w: number,
    h: number,
    overallAssessment: string,
    confidence: "LOW" | "MODERATE" | "HIGH",
    strengthLabel: string,
    trustLevel: "verified" | "likely-authentic" | "uncertain" | "suspicious" | "manipulated"
  ): TrustReport {
    return {
      id,
      reportReferenceId: ref,
      mediaFile: {
        id: `media-${id}`,
        name,
        size,
        type: kind === "video" ? "video/mp4" : "image/jpeg",
        extension: ext,
        mediaKind: kind,
        previewUrl: "",
        width: w,
        height: h,
        hashSha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      },
      analyzedAt: new Date().toISOString(),
      formattedAnalyzedAt: "September 20, 2026 at 04:15 PM EDT",
      executionDurationMs: 4420,
      overallTrustLevel: trustLevel,
      overallAssessment,
      assessmentConfidence: confidence,
      evidenceStrengthLabel: strengthLabel,
      overallConfidence: 78,
      verdictTitle: overallAssessment,
      verdictSummary: "Multi-signal evaluation completed across independent AI detection, provenance, metadata, and forensic layers.",
      activeSignals: ["ai-detection", "provenance", "metadata", "forensic"],
      signalResults: [
        {
          signalId: "ai-detection",
          signalLabel: "AI DETECTION",
          signalValue: trustLevel === "suspicious" ? "HIGH" : "NORMAL",
          status: trustLevel === "suspicious" ? "flagged" : "analyzed",
          strength: "strong",
          confidence: 82,
          summary: trustLevel === "suspicious" ? "Visual patterns associated with synthetic media were detected." : "No significant synthetic generative artifacts identified.",
          items: [],
          anomalyDetected: trustLevel === "suspicious",
          qualitativeState: trustLevel === "suspicious" ? "detected" : "available",
        },
        {
          signalId: "provenance",
          signalLabel: "PROVENANCE",
          signalValue: "NOT FOUND",
          status: "inconclusive",
          strength: "inconclusive",
          confidence: 48,
          summary: "No verifiable C2PA Content Credentials were found.",
          items: [],
          anomalyDetected: false,
          qualitativeState: "not-available",
        },
        {
          signalId: "metadata",
          signalLabel: "METADATA",
          signalValue: trustLevel === "suspicious" ? "SUSPICIOUS" : "NORMAL",
          status: trustLevel === "suspicious" ? "flagged" : "analyzed",
          strength: "moderate",
          confidence: 75,
          summary: trustLevel === "suspicious" ? "File-level metadata contains characteristics requiring further review." : "Headers and quantization tables match expected camera baselines.",
          items: [],
          anomalyDetected: trustLevel === "suspicious",
          qualitativeState: trustLevel === "suspicious" ? "suspicious" : "available",
        },
        {
          signalId: "forensic",
          signalLabel: "FORENSICS",
          signalValue: trustLevel === "suspicious" ? "DETECTED" : "NORMAL",
          status: trustLevel === "suspicious" ? "flagged" : "analyzed",
          strength: "strong",
          confidence: 80,
          summary: trustLevel === "suspicious" ? "Visual inconsistencies were identified." : "Sensor noise and Error Level Analysis uniform across plane.",
          items: [],
          anomalyDetected: trustLevel === "suspicious",
          qualitativeState: trustLevel === "suspicious" ? "detected" : "available",
        },
      ],
      evidenceTimeline: [
        {
          signalName: "AI Detection",
          signalId: "ai-detection",
          role: trustLevel === "suspicious" ? "supporting signal" : "neutral",
          findingSummary: "Spatial frequency and boundary gradient review.",
        },
        {
          signalName: "Metadata",
          signalId: "metadata",
          role: trustLevel === "suspicious" ? "supporting signal" : "neutral",
          findingSummary: "Container headers and quantization profile.",
        },
        {
          signalName: "Forensics",
          signalId: "forensic",
          role: trustLevel === "suspicious" ? "supporting signal" : "neutral",
          findingSummary: "Error Level Analysis (ELA) compression check.",
        },
        {
          signalName: "Provenance",
          signalId: "provenance",
          role: "unavailable",
          findingSummary: "No C2PA manifest attached.",
        },
      ],
      keyFindings: [
        "Assessment generated from available evidence across independent verification channels.",
      ],
      disclaimer: "TrustLayer provides an evidence-based assessment, not absolute proof of authenticity or manipulation.",
    };
  }
}

export const reportStorageService: ReportStorageService = new LocalReportStorageService();
