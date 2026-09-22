import type { Metadata } from "next";
import Link from "next/link";
import {
  Upload,
  Hash,
  Fingerprint,
  FileSearch,
  BrainCircuit,
  Layers,
  Scale,
  FileText,
  ArrowDown,
  ArrowRight,
  Shield,
  ScanSearch,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "How It Works — Digital Media Verification Workflow",
  description:
    "Learn how TrustLayer analyzes digital media through an 8-step verification pipeline: upload, SHA-256, C2PA provenance, metadata, Groq AI analysis, forensics, evidence aggregation, and Trust Report.",
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  const pipelineSteps = [
    {
      number: "01",
      id: "upload",
      title: "UPLOAD",
      icon: Upload,
      headline: "File Validation & Security Sandboxing",
      description:
        "Media is uploaded and validated strictly as untrusted binary input. TrustLayer enforces MIME type verification, file extension validation, and maximum size limits (50 MB) to protect against container exploitation.",
      technicalDetails: [
        "MIME type and magic-number byte signature sniffing",
        "Sanitization of filenames against path traversal sequences",
        "Container dimension extraction for images and duration for videos",
      ],
    },
    {
      number: "02",
      id: "hash",
      title: "HASH",
      icon: Hash,
      headline: "Cryptographic SHA-256 Digest Generation",
      description:
        "A cryptographic SHA-256 digest is generated from the complete uploaded binary buffer. This establishes an immutable content identifier to verify file integrity across reports.",
      technicalDetails: [
        "Cryptographic 256-bit SHA-256 hex digest",
        "Serves purely as a unique content identifier, not an authenticity score",
        "Full hash is displayed and copyable in the final Trust Report",
      ],
    },
    {
      number: "03",
      id: "provenance",
      title: "PROVENANCE",
      icon: Fingerprint,
      headline: "C2PA / Content Credentials Inspection",
      description:
        "The binary container is scanned for C2PA Content Credentials and ISO/IEC 19566-5 JUMBF boxes. If present, claim generators, signing timestamps, and manifest assertions are extracted.",
      technicalDetails: [
        "JPEG APP11 (0xFFEB) JUMBF box & Content Credentials scanning",
        "PNG c2pa / caPI chunks & MP4 ISO-BMFF uuid / jumb boxes",
        "Explicit aggregation rule: Missing C2PA is neutral and NEVER treated as proof of fake",
      ],
    },
    {
      number: "04",
      id: "metadata",
      title: "METADATA",
      icon: FileSearch,
      headline: "EXIF, XMP, IPTC & Software Signature Extraction",
      description:
        "Extracts camera make, model, modification timestamps, orientation, color space, and software tags from native binary headers without relying on external cloud parsers.",
      technicalDetails: [
        "Native binary parsing of TIFF headers and IFD0/SubIFD tags",
        "Detection of post-processing software (e.g. Adobe Photoshop, GIMP, Canva)",
        "Truthful labeling: Missing camera information is marked as 'Unavailable' rather than fabricated",
      ],
    },
    {
      number: "05",
      id: "ai-analysis",
      title: "AI ANALYSIS",
      icon: BrainCircuit,
      headline: "Groq Multimodal Visual Analysis (qwen/qwen3.8-27b)",
      description:
        "The media (or sampled representative video keyframes) is analyzed using Groq's multimodal AI model server-side. The model inspects observable visual evidence, separating observations from interpretations.",
      technicalDetails: [
        "Prompt Injection Defense: Visible text is treated as evidence, never instructions",
        "Structured JSON schema with strict schema validation and retry fallback",
        "Qualitative confidence ratings (Low / Moderate / High) instead of uncalibrated percentages",
      ],
    },
    {
      number: "06",
      id: "forensics",
      title: "FORENSICS",
      icon: Layers,
      headline: "JPEG Quantization (DQT) & Container Integrity Audit",
      description:
        "Performs genuine binary checks on compression tables and container boundaries to identify non-standard quantization curves and trailing payloads.",
      technicalDetails: [
        "JPEG DQT (0xFFDB) matrix extraction and IJG compression quality estimation",
        "Container boundary audit: Scans for trailing bytes past End-of-Image (EOI 0xFFD9)",
        "Accurate scope: Advanced models (PRNU sensor fingerprinting, GAN latent residuals) are explicitly marked unavailable",
      ],
    },
    {
      number: "07",
      id: "aggregation",
      title: "EVIDENCE AGGREGATION",
      icon: Scale,
      headline: "Deterministic Multi-Signal Synthesis",
      description:
        "A deterministic rule-based layer combines all active signals (AI Detection, Provenance, Metadata, Forensics) into an objective assessment. The LLM does NOT decide the final verdict.",
      technicalDetails: [
        "Strict separation of positive, negative, missing, and inconclusive evidence",
        "Generates qualitative verdict: Potentially Synthetic, Requires Review, No Strong Signal, or Insufficient Evidence",
        "Generates the 'Why this assessment?' explainability trail for human review",
      ],
    },
    {
      number: "08",
      id: "trust-report",
      title: "TRUST REPORT",
      icon: FileText,
      headline: "Transparent, Calibrated Verification Report",
      description:
        "Presents the completed assessment with all four independent evidence pillars, full file details, SHA-256 hash, and clear methodological limitations.",
      technicalDetails: [
        "Complete explainability trail answering exactly what evidence led to the assessment",
        "Local and server-side report persistence allowing permanent retrieval via /report/[id]",
        "Exportable formatted reports and shareable verification permalinks",
      ],
    },
  ];

  return (
    <div className="py-10 sm:py-16 bg-background text-foreground font-sans min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Document Header Bar */}
        <header className="border-b border-border pb-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold bg-soft-green px-2.5 py-0.5 rounded border border-[#A3D9B5]">
                  VERIFICATION PIPELINE
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted bg-[#F0F2F0] px-2 py-0.5 rounded border border-border">
                  8-STAGE EVIDENTIARY FLOW
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                How TrustLayer verifies digital media
              </h1>
              <p className="text-sm sm:text-base text-secondary mt-2 max-w-2xl leading-relaxed">
                TrustLayer analyzes digital images and videos using multiple independent evidence signals. It provides a transparent, evidence-based assessment rather than a single black-box score.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/research">
                <Button variant="secondary" size="md" icon={<BookOpen className="w-4 h-4" />}>
                  Research Literature
                </Button>
              </Link>
              <Link href="/verify">
                <Button variant="primary" size="md" icon={<ScanSearch className="w-4 h-4" />}>
                  Verify Media
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* ══════════════════════════════════════════════════════════
            PIPELINE FLOW DIAGRAM (VISUAL CHAIN)
            ══════════════════════════════════════════════════════════ */}
        <section className="mb-16">
          <div className="p-6 sm:p-8 bg-surface border border-border rounded-xl shadow-xs">
            <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold mb-4 block">
              PIPELINE ARCHITECTURE (END-TO-END FLOW)
            </span>

            {/* Visual Pipeline Chain */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-center text-xs font-mono font-bold">
              {pipelineSteps.map((step, idx) => {
                const StepIcon = step.icon;
                return (
                  <div
                    key={step.id}
                    className="p-3 rounded-lg bg-[#FAFBF9] border border-border/80 flex flex-col items-center justify-between gap-2"
                  >
                    <span className="text-[10px] text-muted">{step.number}</span>
                    <div className="w-8 h-8 rounded-lg bg-soft-green flex items-center justify-center text-primary">
                      <StepIcon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] text-foreground font-bold">{step.title}</span>
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-secondary mt-4 font-sans text-center">
              Each stage executes genuine programmatic checks or calls server-side AI models. If a test cannot run, it is marked <code className="bg-[#F0F2F0] px-1 py-0.5 rounded font-mono text-[11px]">Not available</code> rather than simulated.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            DETAILED 8-STAGE BREAKDOWN
            ══════════════════════════════════════════════════════════ */}
        <section className="space-y-6 mb-20">
          <div className="mb-8">
            <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold block mb-1">
              DETAILED TECHNICAL STAGES
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              What TrustLayer actually does at each verification stage
            </h2>
          </div>

          <div className="space-y-6">
            {pipelineSteps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <article
                  key={step.id}
                  className="p-6 sm:p-8 rounded-xl border border-border bg-surface shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-soft-green flex items-center justify-center text-primary shrink-0 border border-[#A3D9B5]">
                        <StepIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-primary">
                            STAGE {step.number}
                          </span>
                          <span className="text-xs text-muted font-mono">/</span>
                          <span className="text-xs font-mono font-bold text-foreground">
                            {step.title}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-foreground tracking-tight">
                          {step.headline}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                    {step.description}
                  </p>

                  <div className="pt-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-muted font-bold block mb-2">
                      Technical Implementation Details:
                    </span>
                    <ul className="text-xs text-foreground/90 space-y-1.5 list-disc list-inside font-sans leading-relaxed">
                      {step.technicalDetails.map((detail, dIdx) => (
                        <li key={dIdx}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            CORE PHILOSOPHY CALLOUT
            ══════════════════════════════════════════════════════════ */}
        <section className="p-6 sm:p-8 rounded-xl border border-[#E8D5A0] bg-[#FBF7EE] shadow-xs space-y-4 mb-16">
          <div className="flex items-center gap-2 text-[#92610F]">
            <Shield className="w-5 h-5 shrink-0" />
            <h4 className="font-bold text-xs font-mono uppercase tracking-wider">
              Core TrustLayer Philosophy
            </h4>
          </div>

          <blockquote className="text-base sm:text-lg font-semibold text-[#5D420F] leading-snug">
            &ldquo;Multiple signals → evidence aggregation → transparent assessment. Never present an AI-generated prediction as an unquestionable fact.&rdquo;
          </blockquote>

          <p className="text-xs sm:text-sm text-[#5D420F]/90 leading-relaxed font-sans">
            TrustLayer uses nuanced classifications such as <strong>Potentially Synthetic</strong>, <strong>Potentially Manipulated</strong>, <strong>Requires Review</strong>, <strong>No Strong Synthetic Signals Detected</strong>, and <strong>Insufficient Evidence</strong> rather than misleading absolutes like &ldquo;100% Real&rdquo; or &ldquo;100% Fake&rdquo;.
          </p>
        </section>

        {/* Bottom CTA */}
        <section className="p-6 rounded-xl border border-border bg-surface shadow-xs flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-mono text-muted">
            TrustLayer Verification Pipeline · Powered by Groq qwen/qwen3.8-27b
          </span>
          <div className="flex items-center gap-3">
            <Link href="/research">
              <Button variant="secondary" size="sm">
                Research Foundation
              </Button>
            </Link>
            <Link href="/verify">
              <Button variant="primary" size="sm">
                Start Verification
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
