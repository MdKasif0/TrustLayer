import type { Metadata } from "next";
import Link from "next/link";
import {
  Upload,
  Cpu,
  FileSearch,
  ShieldCheck,
  ArrowRight,
  BrainCircuit,
  Fingerprint,
  Layers,
  Scale,
  CheckCircle2,
  BookOpen,
  GraduationCap,
  Shield,
  ScanSearch,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "How It Works — Digital Media Verification Workflow",
  description:
    "Learn how TrustLayer combines AI detection, provenance, metadata, and forensic signals to assess digital media without relying on fragile single-model detectors.",
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  const steps = [
    {
      number: "01",
      title: "Upload & Ingest",
      icon: Upload,
      headline: "Local sandbox ingestion with cryptographic hashing",
      description:
        "Media is ingested strictly in browser volatile memory. TrustLayer computes SHA-256 integrity digests immediately upon drop, establishing an immutable cryptographic reference point before any inspection commences.",
      details: [
        "Ephemeral in-memory processing (no persistent server retention)",
        "Automated format and MIME type container validation",
        "Deterministic SHA-256 fingerprint generation",
      ],
    },
    {
      number: "02",
      title: "Multi-Signal Analysis",
      icon: Cpu,
      headline: "Independent parallel evaluation across four evidentiary layers",
      description:
        "Rather than delegating authenticity to an isolated AI black box, TrustLayer triggers four independent diagnostic engines simultaneously across frequency domain, metadata headers, and cryptographic ledgers.",
      details: [
        "AI Spectral & Latent Diffusion Feature Analysis",
        "C2PA / CAI Cryptographic Provenance Manifest Inspection",
        "Hardware Sensor EXIF & Compression Quantization Auditing",
        "Error Level Analysis (ELA) & PRNU Sensor Noise Forensics",
      ],
    },
    {
      number: "03",
      title: "Review Evidence",
      icon: FileSearch,
      headline: "Transparent, visual evidentiary maps and telemetry",
      description:
        "Every signal produces inspectable data artifacts. Investigators can toggle between Discrete Cosine Transform heatmaps, optical edge reticles, and raw container headers to see exactly what triggered the system.",
      details: [
        "Interactive Error Level Analysis (ELA) heatmap overlay",
        "Edge gradient continuity and PRNU noise floor metrics",
        "Structured cryptographic signer validation assertions",
      ],
    },
    {
      number: "04",
      title: "Understand Risk",
      icon: ShieldCheck,
      headline: "Calibrated probabilistic synthesis without absolute claims",
      description:
        "TrustLayer synthesizes findings into a clear, probabilistic assessment. The platform explicitly refuses to declare 100% certainty, arming human analysts with transparent evidentiary weights to make informed decisions.",
      details: [
        "Categorized risk classifications: Verified, Likely Authentic, Review, or Manipulated",
        "Signal agreement scoring across independent detection vectors",
        "Exportable, signed PDF and JSON verification summaries",
      ],
    },
  ];

  const signals = [
    {
      id: "ai-detection",
      title: "AI Detection",
      subtitle: "Synthetic-Content Indicators",
      icon: BrainCircuit,
      description:
        "Analyzes periodic frequency-domain artifacts (DCT / FFT) and universal latent visual projections characteristic of diffusion and generative transformer architectures.",
    },
    {
      id: "provenance",
      title: "Provenance",
      subtitle: "C2PA / Content Credentials",
      icon: Fingerprint,
      description:
        "Extracts and validates cryptographic JUMBF manifest stores, verifying X.509 certificate chains, hardware tamper assertions, and signed edit lineages.",
    },
    {
      id: "metadata",
      title: "Metadata",
      subtitle: "File-Level Structure",
      icon: FileSearch,
      description:
        "Audits EXIF tags, quantization tables, color space profiles, and encoder software signatures against known physical camera sensor baselines.",
    },
    {
      id: "forensics",
      title: "Forensics",
      subtitle: "Visual & Sensor Signals",
      icon: Layers,
      description:
        "Inspects Error Level Analysis (ELA) recompression variance, PRNU sensor noise floor distributions, and localized edge gradient discontinuities.",
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
                  METHODOLOGY &amp; WORKFLOW
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted bg-[#F0F2F0] px-2 py-0.5 rounded border border-border">
                  FOUR-STAGE PIPELINE
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                How TrustLayer verifies digital media
              </h1>
              <p className="text-sm sm:text-base text-secondary mt-2 max-w-2xl leading-relaxed">
                TrustLayer does not attempt to answer authenticity with a single detector. It combines multiple evidence sources to provide a transparent, probabilistic assessment.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/verify">
                <Button
                  variant="primary"
                  size="md"
                  icon={<ScanSearch className="w-4 h-4" />}
                >
                  Verify Media
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* ══════════════════════════════════════════════════════════
            SECTION 1: THE FOUR-STEP VERIFICATION WORKFLOW
            ══════════════════════════════════════════════════════════ */}
        <section className="mb-20">
          <div className="mb-8">
            <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold block mb-1">
              THE WORKFLOW
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Four steps from raw media to transparent evidence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step) => {
              const StepIcon = step.icon;
              return (
                <article
                  key={step.number}
                  className="p-6 sm:p-7 rounded-xl border border-border bg-surface shadow-xs space-y-4 relative flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[10px] bg-very-soft-green text-primary flex items-center justify-center border border-[#A3D9B5]">
                          <StepIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[11px] font-mono font-bold text-muted uppercase tracking-wider block">
                            STEP {step.number}
                          </span>
                          <h3 className="text-base font-bold text-foreground font-sans">
                            {step.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <h4 className="text-sm font-semibold text-foreground mb-2">
                      {step.headline}
                    </h4>

                    <p className="text-xs sm:text-sm text-secondary leading-relaxed mb-4">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border space-y-1.5 font-mono text-xs">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-muted">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 2: THE FOUR INDEPENDENT EVIDENCE SIGNALS
            ══════════════════════════════════════════════════════════ */}
        <section className="mb-20">
          <div className="mb-8">
            <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold block mb-1">
              INDEPENDENT SIGNALS
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Multi-signal evidentiary synthesis
            </h2>
            <p className="text-sm text-secondary mt-1 max-w-2xl">
              Single-model detectors are easily bypassed by novel generators or light editing. TrustLayer checks across four separate technical dimensions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {signals.map((sig) => {
              const Icon = sig.icon;
              return (
                <div
                  key={sig.id}
                  className="p-5 rounded-xl border border-border bg-surface shadow-xs space-y-3 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-9 h-9 rounded-lg bg-very-soft-green text-primary flex items-center justify-center mb-3 border border-[#A3D9B5]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-foreground font-mono">
                      {sig.title}
                    </h3>
                    <p className="text-[11px] font-mono text-primary font-semibold mb-2">
                      {sig.subtitle}
                    </p>
                    <p className="text-xs text-secondary leading-relaxed">
                      {sig.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 3: SCIENTIFIC TRANSPARENCY CALLOUT & DEEP LINKS
            ══════════════════════════════════════════════════════════ */}
        <section className="p-8 rounded-xl border border-border bg-surface shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold block mb-1">
              GROUNDED IN SCIENTIFIC LITERATURE
            </span>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Explore the research and technical foundations
            </h2>
            <p className="text-xs sm:text-sm text-secondary leading-relaxed">
              Read how TrustLayer implements peer-reviewed benchmarks from Wang et al., Ojha et al. (CVPR), FaceForensics++, NIST standards, and C2PA Content Credentials.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/research">
              <Button
                variant="secondary"
                size="md"
                icon={<GraduationCap className="w-4 h-4" />}
              >
                Explore Research
              </Button>
            </Link>
            <Link href="/docs">
              <Button
                variant="secondary"
                size="md"
                icon={<BookOpen className="w-4 h-4" />}
              >
                Documentation
              </Button>
            </Link>
            <Link href="/verify">
              <Button
                variant="primary"
                size="md"
                icon={<ScanSearch className="w-4 h-4" />}
              >
                Verify Media
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
