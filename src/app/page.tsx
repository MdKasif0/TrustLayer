import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  ScanSearch,
  Fingerprint,
  FileSearch,
  Layers,
  ArrowDown,
  BrainCircuit,
  ShieldCheck,
  ChevronDown,
  FileImage,
  FileVideo,
  CheckCircle2,
  AlertTriangle,
  Minus,
  Newspaper,
  Building2,
  ShieldAlert,
  Users,
  GraduationCap,
} from "lucide-react";

export default function HomePage() {
  return (
    <div>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Copy */}
            <div className="max-w-xl">
              <div className="flex items-center gap-1.5 mb-6">
                <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-secondary">
                  Cyber Safety
                </span>
                <span className="text-[11px] text-border-strong mx-1">•</span>
                <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-secondary">
                  Digital Media Verification
                </span>
              </div>

              <h1 className="text-[2rem] sm:text-[2.5rem] md:text-[2.75rem] font-bold leading-[1.1] tracking-[-0.025em] text-foreground mb-5">
                Know what you&apos;re
                <br />
                looking at.
              </h1>

              <p className="text-base sm:text-lg text-muted leading-relaxed mb-8 max-w-[480px]">
                TrustLayer analyzes digital images and videos across multiple
                evidence signals to help you understand whether content may be
                authentic, AI-generated, or manipulated.
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Link href="/verify">
                  <Button
                    size="lg"
                    icon={<ScanSearch className="w-4 h-4" />}
                  >
                    Verify Media
                  </Button>
                </Link>
                <a href="#how-signals-work">
                  <Button variant="outline" size="lg">
                    See How It Works
                    <ChevronDown className="w-4 h-4 ml-0.5" />
                  </Button>
                </a>
              </div>

              <p className="text-xs text-muted flex items-center gap-1.5">
                <AlertTriangle className="w-3 h-3 text-warning shrink-0" />
                Evidence-based assessment. Not absolute certainty.
              </p>
            </div>

            {/* Right: Verification Interface Mock */}
            <div className="hidden lg:block">
              <HeroVerificationVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ WHY TRUSTLAYER ═══════════════ */}
      <section className="py-16 sm:py-20 border-t border-border">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-secondary mb-2">
              Approach
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Why TrustLayer?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden border border-border">
            {[
              {
                label: "Detect",
                icon: BrainCircuit,
                description:
                  "Identify signals associated with synthetic or manipulated media using multiple independent detection methods.",
              },
              {
                label: "Verify",
                icon: ShieldCheck,
                description:
                  "Inspect provenance, Content Credentials (C2PA), metadata, and file characteristics for signs of origin and editing.",
              },
              {
                label: "Explain",
                icon: FileSearch,
                description:
                  "Turn multiple signals into an understandable assessment with supporting evidence — not a black-box verdict.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="bg-surface p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-md bg-soft-green flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold tracking-[0.1em] uppercase text-muted block leading-none mb-0.5">
                        0{i + 1}
                      </span>
                      <h3 className="text-base font-semibold text-foreground leading-tight">
                        {item.label}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ ONE FILE, MULTIPLE SIGNALS ═══════════════ */}
      <section id="how-signals-work" className="py-16 sm:py-20 border-t border-border scroll-mt-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-secondary mb-2">
              Multi-Signal Analysis
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
              One file. Multiple signals.
            </h2>
            <p className="text-sm text-muted max-w-md">
              Each uploaded file is examined across four independent evidence
              categories. No single signal decides the outcome.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: BrainCircuit,
                title: "AI Detection",
                subtitle: "Synthetic-content indicators",
                detail:
                  "Classifiers and pattern analysis to identify content generated by diffusion models, GANs, or other AI systems.",
              },
              {
                icon: Fingerprint,
                title: "Provenance",
                subtitle: "C2PA / Content Credentials",
                detail:
                  "Verify chain of custody, embedded Content Credentials, and digital signatures tracing content to its source.",
              },
              {
                icon: FileSearch,
                title: "Metadata",
                subtitle: "EXIF and file-level information",
                detail:
                  "Parse timestamps, device info, software history, GPS data, and detect stripped or inconsistent metadata.",
              },
              {
                icon: Layers,
                title: "Forensics",
                subtitle: "Visual and temporal signals",
                detail:
                  "Error level analysis, noise patterns, compression artifacts, copy-move detection, and splicing indicators.",
              },
            ].map((signal) => {
              const Icon = signal.icon;
              return (
                <div
                  key={signal.title}
                  className="border border-border rounded-lg bg-surface p-5 group"
                >
                  <div className="w-9 h-9 rounded-md bg-soft-green flex items-center justify-center mb-4">
                    <Icon className="w-[18px] h-[18px] text-primary" />
                  </div>
                  <h4 className="text-sm font-semibold text-foreground mb-0.5">
                    {signal.title}
                  </h4>
                  <p className="text-xs text-secondary font-medium mb-3">
                    {signal.subtitle}
                  </p>
                  <p className="text-xs text-muted leading-relaxed">
                    {signal.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ BUILT FOR CAREFUL DECISIONS ═══════════════ */}
      <section className="py-16 sm:py-20 border-t border-border">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-10">
            <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-secondary mb-2">
              Who It&apos;s For
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
              Built for careful decisions
            </h2>
            <p className="text-sm text-muted leading-relaxed max-w-lg">
              TrustLayer provides evidence, not absolute verdicts. It is designed
              for anyone who needs to understand the origins and integrity of
              digital media before making decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: Newspaper,
                title: "Journalists",
                description:
                  "Verify user-submitted photos and videos before publication. Understand what evidence supports or undermines authenticity.",
              },
              {
                icon: GraduationCap,
                title: "Researchers",
                description:
                  "Analyze media provenance and synthetic content signals for academic work, misinformation studies, and forensic research.",
              },
              {
                icon: Building2,
                title: "Organizations",
                description:
                  "Integrate evidence-based media checks into editorial, legal, compliance, or content moderation workflows.",
              },
              {
                icon: ShieldAlert,
                title: "Security Teams",
                description:
                  "Detect potentially manipulated media in threat intelligence, incident response, and social engineering investigations.",
              },
              {
                icon: Users,
                title: "Everyday Users",
                description:
                  "Check whether an image or video shared online shows signs of AI generation or manipulation before trusting or sharing it.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex gap-3 p-4 rounded-lg border border-border bg-surface"
                >
                  <div className="w-9 h-9 rounded-md bg-soft-green flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-[18px] h-[18px] text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 p-4 rounded-lg bg-warning-bg border border-[#E8D5A0]">
            <p className="text-xs text-[#92610F] leading-relaxed flex items-start gap-2">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>
                <strong className="font-semibold">No detection method is infallible.</strong>{" "}
                TrustLayer surfaces evidence across multiple signals to support
                your judgment. It does not guarantee detection of all synthetic
                or manipulated content.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section className="py-16 sm:py-20 border-t border-border">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-md mx-auto">
            <div className="w-12 h-12 rounded-lg bg-soft-green flex items-center justify-center mx-auto mb-5">
              <ScanSearch className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
              Verify a piece of media
            </h2>
            <p className="text-sm text-muted mb-6">
              Upload an image or video file and receive a multi-signal evidence
              report.
            </p>
            <Link href="/verify">
              <Button
                size="lg"
                icon={<ScanSearch className="w-4 h-4" />}
              >
                Start Verification
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Hero Verification Visual
   A realistic, minimal mockup of the TrustLayer analysis
   pipeline: Media → 4 Signals → Evidence Report
   ───────────────────────────────────────────────────────── */

function HeroVerificationVisual() {
  return (
    <div className="relative">
      {/* Main container — styled as a UI window */}
      <div className="border border-border rounded-lg bg-surface shadow-[var(--shadow-md)] overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border bg-[#F7F8F7]">
          <div className="w-2.5 h-2.5 rounded-full bg-[#DDE3DE]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#DDE3DE]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#DDE3DE]" />
          <span className="ml-2 text-[10px] text-muted font-medium tracking-wide">
            TrustLayer Analysis
          </span>
        </div>

        <div className="p-5">
          {/* Step 1: Media File */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-md bg-[#F0F2F0] border border-border flex items-center justify-center">
              <FileImage className="w-6 h-6 text-muted" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">
                media_sample.jpg
              </p>
              <p className="text-[10px] text-muted">
                2.4 MB · JPEG · 3024 × 4032
              </p>
            </div>
            <div className="ml-auto">
              <span className="text-[10px] font-medium text-success bg-success-bg px-1.5 py-0.5 rounded">
                Uploaded
              </span>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center my-2">
            <ArrowDown className="w-3.5 h-3.5 text-border-strong" />
          </div>

          {/* Step 2: Signal Analysis Grid */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            {[
              { label: "AI Detection", icon: BrainCircuit, status: "done" },
              { label: "Provenance", icon: Fingerprint, status: "done" },
              { label: "Metadata", icon: FileSearch, status: "done" },
              { label: "Forensics", icon: Layers, status: "done" },
            ].map((signal) => {
              const Icon = signal.icon;
              return (
                <div
                  key={signal.label}
                  className="flex items-center gap-2 p-2.5 rounded-md border border-border bg-[#FAFAF7]"
                >
                  <Icon className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="text-[10px] font-medium text-foreground truncate">
                    {signal.label}
                  </span>
                  <CheckCircle2 className="w-3 h-3 text-success ml-auto shrink-0" />
                </div>
              );
            })}
          </div>

          {/* Arrow */}
          <div className="flex justify-center my-2">
            <ArrowDown className="w-3.5 h-3.5 text-border-strong" />
          </div>

          {/* Step 3: Evidence Report Preview */}
          <div className="rounded-md border border-border bg-[#FAFAF7] p-3.5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-muted">
                Evidence Report
              </span>
              <span className="text-[10px] font-medium text-foreground bg-warning-bg border border-[#E8D5A0] px-1.5 py-0.5 rounded">
                Uncertain
              </span>
            </div>

            {/* Signal rows */}
            <div className="space-y-2">
              <ReportSignalRow
                label="AI Detection"
                finding="Moderate synthetic indicators"
                barWidth="w-[55%]"
                barColor="bg-warning"
              />
              <ReportSignalRow
                label="Provenance"
                finding="No Content Credentials found"
                barWidth="w-[20%]"
                barColor="bg-[#C4CCC6]"
              />
              <ReportSignalRow
                label="Metadata"
                finding="Partial EXIF present"
                barWidth="w-[40%]"
                barColor="bg-secondary"
              />
              <ReportSignalRow
                label="Forensics"
                finding="Minor compression anomalies"
                barWidth="w-[35%]"
                barColor="bg-warning"
              />
            </div>

            <div className="mt-3 pt-2.5 border-t border-border">
              <p className="text-[10px] text-muted leading-relaxed">
                Mixed signals detected. Manual review recommended for this
                assessment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportSignalRow({
  label,
  finding,
  barWidth,
  barColor,
}: {
  label: string;
  finding: string;
  barWidth: string;
  barColor: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-medium text-foreground">{label}</span>
        <span className="text-[10px] text-muted">{finding}</span>
      </div>
      <div className="h-1 bg-[#ECEEED] rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${barColor} ${barWidth}`} />
      </div>
    </div>
  );
}
