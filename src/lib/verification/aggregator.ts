import {
  AiDetectionSignal,
  ProvenanceSignal,
  MetadataSignal,
  ForensicsSignal,
  EvidenceAggregationResult,
} from "./types";

export const AGGREGATOR_DISCLAIMER =
  "TrustLayer provides evidence-based assessment and is not a definitive authenticity oracle. Multiple independent signals are aggregated to evaluate probability of synthetic origin or alteration, but cannot establish ground-truth authenticity with absolute certainty.";

/**
 * Deterministic Evidence Aggregation Engine
 *
 * Combines independent verification signals into a defensible, explainable assessment.
 * CRITICAL RULE: Missing evidence (such as absent C2PA) is NEVER treated as negative evidence (fake).
 */
export function aggregateVerificationSignals(
  aiSignal: AiDetectionSignal,
  provenanceSignal: ProvenanceSignal,
  metadataSignal: MetadataSignal,
  forensicsSignal: ForensicsSignal
): EvidenceAggregationResult {
  const hasAiFlag = aiSignal.status === "detected";
  const hasForensicAnomaly = forensicsSignal.status === "anomaly_detected";
  const hasEditingSoftware = metadataSignal.editingSoftwareDetected;
  const hasProvenance = provenanceSignal.hasC2pa;
  const isAiInconclusive = aiSignal.status === "inconclusive" || aiSignal.status === "unavailable";

  const whyThisAssessment: string[] = [];

  // 1. AI Detection explanation
  if (hasAiFlag) {
    whyThisAssessment.push(
      `AI visual analysis detected observable synthetic or generative artifacts (${aiSignal.evidence.slice(0, 2).join("; ") || "unnatural visual patterns"}).`
    );
  } else if (isAiInconclusive) {
    whyThisAssessment.push(
      "AI visual analysis was inconclusive or limited by resolution/compression constraints."
    );
  } else {
    whyThisAssessment.push(
      "AI visual analysis did not identify strong synthetic generation or deepfake characteristics."
    );
  }

  // 2. Provenance explanation (NEVER equates absent C2PA with fake)
  if (hasProvenance) {
    whyThisAssessment.push(
      `C2PA Content Credentials detected (${provenanceSignal.boxTypeDetected || "valid JUMBF manifest"}), providing cryptographic provenance.`
    );
  } else {
    whyThisAssessment.push(
      "C2PA Content Credentials were not available in the uploaded container. This is neutral: common consumer cameras and messaging apps do not embed or preserve C2PA metadata."
    );
  }

  // 3. Metadata explanation
  if (hasEditingSoftware && metadataSignal.editingSoftwareName) {
    whyThisAssessment.push(
      `Metadata indicated post-processing using editing software ("${metadataSignal.editingSoftwareName}").`
    );
  } else if (metadataSignal.metadata.hasExif) {
    whyThisAssessment.push(
      `Camera hardware tags detected (${[metadataSignal.metadata.cameraMake, metadataSignal.metadata.cameraModel].filter(Boolean).join(" ") || "EXIF present"}).`
    );
  } else {
    whyThisAssessment.push(
      "EXIF hardware acquisition metadata was absent or stripped from the container."
    );
  }

  // 4. Forensic explanation
  if (hasForensicAnomaly) {
    whyThisAssessment.push(
      `Forensic analysis detected container or quantization discrepancies (${forensicsSignal.evidence[0] || "structural anomaly"}).`
    );
  } else if (forensicsSignal.status === "normal") {
    whyThisAssessment.push(
      `Forensic inspection of container markers and compression tables conforms to standard specifications.`
    );
  } else {
    whyThisAssessment.push(
      "Advanced forensic models were not enabled for this container type."
    );
  }

  // Final summary clause
  whyThisAssessment.push(
    "These signals increase the reason for review, but do not establish authenticity with absolute certainty."
  );

  // Assessment & Confidence Determination
  let overallAssessment: EvidenceAggregationResult["overallAssessment"];
  let evidenceStrength: EvidenceAggregationResult["evidenceStrength"];
  let confidence: EvidenceAggregationResult["confidence"];
  let verdictTitle: string;
  let verdictSummary: string;

  if (hasProvenance && !hasAiFlag && !hasForensicAnomaly) {
    overallAssessment = "NO STRONG SYNTHETIC SIGNALS DETECTED";
    evidenceStrength = "Multiple Independent Signals";
    confidence = "HIGH";
    verdictTitle = "Corroborated by Provenance & Consistent Visuals";
    verdictSummary =
      "Content credentials confirm cryptographic provenance and visual inspection did not detect generative synthesis anomalies.";
  } else if (hasAiFlag && (hasForensicAnomaly || hasEditingSoftware)) {
    overallAssessment = "POTENTIALLY SYNTHETIC / MANIPULATED";
    evidenceStrength = "Multiple Independent Signals";
    confidence = aiSignal.confidence === "high" ? "HIGH" : "MODERATE";
    verdictTitle = "Multi-Signal Inconsistencies Detected";
    verdictSummary =
      "Multiple independent signals—including visual AI observations and metadata/forensic indicators—suggest possible generative synthesis or post-capture editing.";
  } else if (hasAiFlag) {
    overallAssessment = "POTENTIALLY SYNTHETIC";
    evidenceStrength = "Single Corroborated Signal";
    confidence = aiSignal.confidence === "high" ? "MODERATE" : "LOW";
    verdictTitle = "Visual Synthetic Patterns Observed";
    verdictSummary =
      "Observable generative indicators were noted during visual inspection, though external provenance or forensic corroboration is not present.";
  } else if (hasForensicAnomaly || hasEditingSoftware) {
    overallAssessment = "REQUIRES REVIEW";
    evidenceStrength = "Single Corroborated Signal";
    confidence = "MODERATE";
    verdictTitle = "Container or Post-Processing Discrepancy";
    verdictSummary =
      "File metadata or container structure indicates modification or non-standard encoding. Visual synthesis indicators were not detected.";
  } else if (isAiInconclusive) {
    overallAssessment = "INSUFFICIENT EVIDENCE";
    evidenceStrength = "Inconclusive Baseline";
    confidence = "LOW";
    verdictTitle = "Insufficient Verifiable Signals";
    verdictSummary =
      "Available signals were insufficient to form a confident assessment. The file may be heavily re-compressed or lacking structural metadata.";
  } else {
    overallAssessment = "NO STRONG SYNTHETIC SIGNALS DETECTED";
    evidenceStrength = "Single Corroborated Signal";
    confidence = "MODERATE";
    verdictTitle = "Baseline Structure & Visuals Normal";
    verdictSummary =
      "No anomalous synthetic indicators, manipulation artifacts, or structural container flaws were identified in the analyzed file.";
  }

  return {
    overallAssessment,
    evidenceStrength,
    confidence,
    verdictTitle,
    verdictSummary,
    whyThisAssessment,
    disclaimer: AGGREGATOR_DISCLAIMER,
  };
}
