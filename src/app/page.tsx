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
  CheckCircle2,
  AlertTriangle,
  Newspaper,
  Building2,
  ShieldAlert,
  GraduationCap,
  ArrowRight,
  Shield,
  Activity,
  Lock,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="bg-background">
      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section className="pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-border/80">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column (7 cols): Copy & Primary CTAs */}
            <div className="lg:col-span-7 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-soft-green border border-[#C1E3CA] text-primary text-[11px] font-mono font-bold tracking-widest uppercase mb-6 shadow-subtle">
                <Shield className="w-3.5 h-3.5 text-primary" />
                <span>CYBER SAFETY • DIGITAL MEDIA VERIFICATION</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold leading-[1.12] tracking-tight text-foreground mb-6">
                Know what you&apos;re looking at.
              </h1>

              <p className="text-base sm:text-lg text-muted leading-relaxed mb-8 max-w-xl">
                TrustLayer analyzes digital images and videos across multiple
                evidence signals to help you understand whether content may be
                authentic, AI-generated, or manipulated.
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Link href="/verify">
                  <Button
                    variant="primary"
                    size="lg"
                    icon={<ScanSearch className="w-4 h-4" />}
                    className="font-semibold px-6 shadow-subtle"
                  >
                    Verify Media
                  </Button>
                </Link>
                <a href="#how-signals-work">
                  <Button variant="secondary" size="lg" className="font-medium px-5">
                    See How It Works
                    <ChevronDown className="w-4 h-4 ml-1 opacity-70" />
                  </Button>
                </a>
              </div>

              <div className="inline-flex items-center gap-2 text-xs text-muted bg-surface px-3 py-1.5 rounded-md border border-border shadow-subtle">
                <AlertTriangle className="w-3.5 h-3.5 text-warning shrink-0" />
                <span>Evidence-based assessment. Not absolute certainty.</span>
              </div>
            </div>

            {/* Right Column (5 cols): Verification Pipeline Mock */}
            <div className="lg:col-span-5 hidden lg:block">
              <HeroVerificationVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION: WHY TRUSTLAYER? ═══════════════ */}
      <section className="py-20 border-b border-border/80">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="max-w-xl mb-12">
            <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-primary mb-2 block">
              FORENSIC RATIONALE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              Why TrustLayer?
            </h2>
            <p className="text-sm text-muted mt-2 leading-relaxed">
              In adversarial environments, single-model detectors fail. TrustLayer combines independent lines of evidence to produce auditable, transparent assessments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                number: "01",
                label: "DETECT",
                title: "Identify synthetic generative signals",
                description:
                  "Isolate frequency-domain artifacts, periodic upsampling lattices, and boundary gradient inconsistencies associated with generative diffusion and GAN models.",
                icon: BrainCircuit,
              },
              {
                number: "02",
                label: "PROVENANCE",
                title: "Verify cryptographic chain of custody",
                description:
                  "Audit C2PA Content Credentials, hardware-anchored device certificates, and digital lineage assertions to verify origin when provenance is present.",
                icon: Fingerprint,
              },
              {
                number: "03",
                label: "FORENSICS",
                title: "Examine physical scene invariants",
                description:
                  "Analyze localized Error Level Analysis (ELA) compression deltas, Photo Response Non-Uniformity (PRNU) noise floors, and lighting vector geometry.",
                icon: Layers,
              },
            ].map((col) => {
              const Icon = col.icon;
              return (
                <div
                  key={col.number}
                  className="bg-surface rounded-xl border border-border p-6 shadow-subtle flex flex-col justify-between hover:border-border-strong transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-border text-xs font-mono">
                      <span className="text-primary font-bold">{col.number}</span>
                      <span className="text-muted uppercase tracking-wider">{col.label}</span>
                    </div>

                    <div className="w-9 h-9 rounded-md bg-very-soft-green border border-border flex items-center justify-center mb-4 text-primary">
                      <Icon className="w-4.5 h-4.5" />
                    </div>

                    <h3 className="text-base font-bold text-foreground mb-2 tracking-tight">
                      {col.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed">
                      {col.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION: FOUR INDEPENDENT SIGNALS ═══════════════ */}
      <section id="how-signals-work" className="py-20 border-b border-border/80 scroll-mt-14">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-primary mb-2 block">
              ANALYSIS SIGNALS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              Four Independent Evidence Vectors
            </h2>
            <p className="text-sm text-muted mt-2 leading-relaxed">
              Each layer interrogates a distinct aspect of the media file. Concurring signals strengthen confidence; conflicting signals are highlighted with full transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                id: "ai",
                title: "AI Detection",
                badge: "Synthetics",
                detail:
                  "Fourier transform sub-bands and universal latent feature representations identify generative model artifacts without overfitting to single vendors.",
                icon: BrainCircuit,
              },
              {
                id: "provenance",
                title: "Provenance / C2PA",
                badge: "Credentials",
                detail:
                  "ISO/IEC 23008-12 JUMBF manifest parsing and PKI certificate validation to verify capture hardware authenticity and editing lineage.",
                icon: Fingerprint,
              },
              {
                id: "metadata",
                title: "Metadata Analysis",
                badge: "File Headers",
                detail:
                  "EXIF, XMP, and IPTC dictionary parsing and JPEG quantization table profile matching against known hardware camera ISP firmware.",
                icon: FileSearch,
              },
              {
                id: "forensics",
                title: "Forensic Analysis",
                badge: "ELA & Sensor",
                detail:
                  "Localized compression error variances (ELA), sensor PRNU noise floor continuity, and video inter-frame temporal optical flow coherence.",
                icon: Layers,
              },
            ].map((sig) => {
              const Icon = sig.icon;
              return (
                <div
                  key={sig.id}
                  className="bg-surface rounded-xl border border-border p-5 sm:p-6 shadow-subtle flex flex-col justify-between hover:border-border-strong transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-8 h-8 rounded-md bg-soft-green text-primary flex items-center justify-center border border-[#C1E3CA]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-very-soft-green border border-border text-muted font-medium">
                        {sig.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-foreground mb-2 tracking-tight">
                      {sig.title}
                    </h3>
                    <p className="text-xs text-muted leading-relaxed mb-4">
                      {sig.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Research Teaser Callout */}
          <div className="mt-8 p-5 bg-surface border border-border rounded-xl shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-soft-green flex items-center justify-center text-primary shrink-0 border border-[#C1E3CA]">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-foreground">
                  Grounded in peer-reviewed forensic literature
                </p>
                <p className="text-xs text-muted mt-0.5">
                  Synthesizing published research from Wang et al., Ojha et al. (CVPR 2023), FaceForensics++, DeepfakeBench, and NIST standards.
                </p>
              </div>
            </div>
            <Link href="/about" className="shrink-0">
              <Button variant="secondary" size="sm" className="text-xs font-mono">
                Explore Research Foundations
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION: BUILT FOR CAREFUL DECISIONS ═══════════════ */}
      <section className="py-20 border-b border-border/80">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="max-w-xl mb-12">
            <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-primary mb-2 block">
              TARGET INVESTIGATORS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              Built for Careful Decisions
            </h2>
            <p className="text-sm text-muted mt-2 leading-relaxed">
              Designed for high-stakes verification environments where automated opaque labels are insufficient.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: Newspaper,
                title: "Journalists & Newsrooms",
                description:
                  "Verify user-submitted images and breaking video before publication. Review transparent evidence signals rather than single opaque scores.",
              },
              {
                icon: GraduationCap,
                title: "Forensic Researchers",
                description:
                  "Conduct peer-reviewed synthetic media research, audit provenance manifests, and evaluate detector performance across diverse datasets.",
              },
              {
                icon: Building2,
                title: "Compliance & Legal",
                description:
                  "Establish verifiable chain of custody and forensic documentation for digital evidence submitted in official proceedings.",
              },
              {
                icon: ShieldAlert,
                title: "Security & Threat Teams",
                description:
                  "Identify synthetic media in spear-phishing, social engineering campaigns, and corporate brand impersonation incidents.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-5 bg-surface border border-border rounded-xl shadow-subtle hover:border-border-strong transition-colors"
                >
                  <div className="w-8 h-8 rounded-md bg-very-soft-green border border-border text-primary flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground mb-1.5 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ FINAL ACTION CTA ═══════════════ */}
      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="bg-surface border border-border rounded-xl p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-subtle">
            <div className="w-12 h-12 rounded-xl bg-soft-green border border-[#C1E3CA] text-primary flex items-center justify-center mx-auto mb-5">
              <ScanSearch className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              Verify Digital Media
            </h2>
            <p className="text-sm text-muted max-w-md mx-auto mb-6 leading-relaxed">
              Upload an image or video to initiate an auditable multi-signal evidence assessment.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/verify" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" icon={<ScanSearch className="w-4 h-4" />} className="w-full sm:w-auto font-semibold px-6">
                  Start Verification
                </Button>
              </Link>
              <Link href="/reports" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  View Sample Reports
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Hero Verification Visual Mock
   Reflects the actual TrustLayer analysis architecture
   ───────────────────────────────────────────────────────── */

function HeroVerificationVisual() {
  return (
    <div className="border border-border rounded-xl bg-surface shadow-card overflow-hidden">
      {/* Chrome Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-[#FAFAF8]">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-border-strong" />
            <span className="w-2.5 h-2.5 rounded-full bg-border-strong" />
            <span className="w-2.5 h-2.5 rounded-full bg-border-strong" />
          </div>
          <span className="text-[11px] font-mono text-muted font-medium ml-1">
            TrustLayer Multi-Signal Pipeline
          </span>
        </div>
        <span className="text-[10px] font-mono uppercase bg-soft-green text-primary px-2 py-0.5 rounded border border-[#C1E3CA] font-semibold">
          Active Workspace
        </span>
      </div>

      <div className="p-5 space-y-4">
        {/* File Node */}
        <div className="flex items-center gap-3 p-3 bg-very-soft-green rounded-lg border border-border">
          <div className="w-10 h-10 rounded-md bg-surface border border-border flex items-center justify-center shrink-0">
            <FileImage className="w-5 h-5 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold font-mono text-foreground truncate">
              surveillance_capture_raw.jpg
            </p>
            <p className="text-[11px] text-muted font-mono">
              2.4 MB · JPEG · 3024 × 4032 · SHA-256 Intact
            </p>
          </div>
          <span className="text-[10px] font-mono font-semibold text-primary bg-soft-green px-2 py-0.5 rounded border border-[#C1E3CA]">
            Loaded
          </span>
        </div>

        {/* Direction Indicator */}
        <div className="flex justify-center my-1">
          <ArrowDown className="w-3.5 h-3.5 text-muted opacity-60" />
        </div>

        {/* 4 Signals Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { label: "AI Detection", icon: BrainCircuit, status: "Flagged", statusColor: "text-warning" },
            { label: "Provenance", icon: Fingerprint, status: "Missing", statusColor: "text-muted" },
            { label: "Metadata", icon: FileSearch, status: "Review", statusColor: "text-warning" },
            { label: "Forensics", icon: Layers, status: "Anomaly", statusColor: "text-warning" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-center justify-between p-2.5 rounded-lg border border-border bg-[#FAFAF8] text-xs font-mono"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Icon className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="text-[11px] font-semibold text-foreground truncate">{item.label}</span>
                </div>
                <span className={`text-[10px] font-semibold ${item.statusColor}`}>
                  {item.status}
                </span>
              </div>
            );
          })}
        </div>

        {/* Direction Indicator */}
        <div className="flex justify-center my-1">
          <ArrowDown className="w-3.5 h-3.5 text-muted opacity-60" />
        </div>

        {/* Final Report Card Preview */}
        <div className="p-3.5 rounded-lg border border-border bg-surface">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted font-bold">
              Evidence Assessment
            </span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-warning-bg text-[#92610F] border border-[#E8D5A0]">
              POTENTIALLY SYNTHETIC
            </span>
          </div>

          <div className="space-y-1.5 text-[11px] font-mono">
            <div className="flex items-center justify-between">
              <span className="text-muted">Assessment Confidence:</span>
              <span className="font-semibold text-foreground">MODERATE</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">Evidence Strength:</span>
              <span className="font-semibold text-primary">MULTIPLE SIGNALS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
