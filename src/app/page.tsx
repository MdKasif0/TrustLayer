import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  ScanSearch,
  Fingerprint,
  FileSearch,
  Layers,
  ArrowDown,
  BrainCircuit,
  Shield,
  ShieldCheck,
  FileImage,
  Newspaper,
  ShieldAlert,
  GraduationCap,
  Users,
  FileUp,
  Activity,
  CheckCircle2,
  Clock,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="bg-background text-foreground">
      {/* ══════════════════════════════════════════════════════════
          HERO: SPLIT-SCREEN
          ══════════════════════════════════════════════════════════ */}
      <section className="pt-14 pb-16 sm:pt-20 sm:pb-20 border-b border-border">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-7">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-very-soft-green border border-border text-primary text-[11px] font-mono font-bold tracking-widest uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>CYBER SAFETY • DIGITAL MEDIA VERIFICATION</span>
              </div>

              {/* Main Heading: Large but not oversized */}
              <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold leading-[1.18] tracking-tight text-foreground mb-5">
                Know what you&apos;re looking at.
              </h1>

              {/* Supporting text */}
              <p className="text-base sm:text-lg text-muted leading-relaxed mb-8 max-w-xl">
                TrustLayer analyzes images and videos across AI detection,
                provenance, metadata and forensic signals to produce an
                evidence-based assessment.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 mb-6">
                <Link href="/verify">
                  <Button
                    variant="primary"
                    size="lg"
                    icon={<ScanSearch className="w-4 h-4" />}
                    className="font-semibold px-6 shadow-subtle text-sm"
                  >
                    Verify Media
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="font-medium px-5 text-sm"
                  >
                    Explore Methodology
                  </Button>
                </Link>
              </div>

              {/* Small Reassurance */}
              <div className="inline-flex items-center gap-2 text-xs text-muted">
                <Shield className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>Evidence-based assessment. Not absolute certainty.</span>
              </div>
            </div>

            {/* RIGHT COLUMN: Realistic TrustLayer Product Interface Preview */}
            <div className="lg:col-span-5">
              <HeroVerificationVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          HERO LOWER AREA: COMPACT CREDIBILITY STRIP
          ══════════════════════════════════════════════════════════ */}
      <div className="border-b border-border bg-[#F7F9F7]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-soft-green text-primary px-2 py-0.5 rounded border border-[#C1E3CA]">
                MULTI-SIGNAL
              </span>
              <span className="text-muted font-sans font-medium text-xs">
                Independent verification pipeline architecture
              </span>
            </div>

            <div className="flex items-center gap-2 text-muted font-medium">
              <span className="text-foreground">AI Detection</span>
              <span className="text-border-strong">•</span>
              <span className="text-foreground">Provenance</span>
              <span className="text-border-strong">•</span>
              <span className="text-foreground">Metadata</span>
              <span className="text-border-strong">•</span>
              <span className="text-foreground">Forensics</span>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          SECTION: "One file. Four evidence layers."
          Minimalist, editorial spacing, fine separators
          ══════════════════════════════════════════════════════════ */}
      <section className="py-20 border-b border-border">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-14">
            <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-primary mb-2 block">
              EVIDENTIARY ARCHITECTURE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              One file. Four evidence layers.
            </h2>
            <p className="text-sm text-muted mt-2 leading-relaxed max-w-xl">
              TrustLayer does not rely on a single opaque model. Each layer
              interrogates a distinct physical or digital property of the media
              container.
            </p>
          </div>

          {/* 4 Visually Distinct Minimalist Columns with Editorial Spacing */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border border-y border-border">
            {/* 01: AI DETECTION */}
            <div className="py-8 md:py-10 md:pr-8 lg:pr-7 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-primary tracking-wider block mb-4">
                  01
                </span>
                <h3 className="text-sm font-bold tracking-wider uppercase text-foreground mb-2 font-mono">
                  AI DETECTION
                </h3>
                <p className="text-base font-semibold text-foreground mb-2">
                  Synthetic-content indicators.
                </p>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  Examines spatial frequency decomposition, discrete cosine
                  transform (DCT) sub-bands, and latent diffusion lattice
                  anomalies.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border/60">
                <span className="text-[11px] font-mono text-muted">
                  Vector: Frequency &amp; GAN/Diffusion Latents
                </span>
              </div>
            </div>

            {/* 02: PROVENANCE */}
            <div className="py-8 md:py-10 md:px-8 lg:px-7 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-primary tracking-wider block mb-4">
                  02
                </span>
                <h3 className="text-sm font-bold tracking-wider uppercase text-foreground mb-2 font-mono">
                  PROVENANCE
                </h3>
                <p className="text-base font-semibold text-foreground mb-2">
                  Creation and editing history.
                </p>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  Inspects C2PA JUMBF manifests, cryptographic X.509 signature
                  chains, and hardware keystore roots to trace capture chain of
                  custody.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border/60">
                <span className="text-[11px] font-mono text-muted">
                  Vector: C2PA &amp; Cryptographic Lineage
                </span>
              </div>
            </div>

            {/* 03: METADATA */}
            <div className="py-8 md:py-10 md:px-8 lg:px-7 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-primary tracking-wider block mb-4">
                  03
                </span>
                <h3 className="text-sm font-bold tracking-wider uppercase text-foreground mb-2 font-mono">
                  METADATA
                </h3>
                <p className="text-base font-semibold text-foreground mb-2">
                  File-level information.
                </p>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  Audits EXIF, XMP, and IPTC dictionary structures, checking
                  quantization tables against empirical camera hardware
                  profiles.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border/60">
                <span className="text-[11px] font-mono text-muted">
                  Vector: Container Headers &amp; Quantization
                </span>
              </div>
            </div>

            {/* 04: FORENSICS */}
            <div className="py-8 md:py-10 md:pl-8 lg:pl-7 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-primary tracking-wider block mb-4">
                  04
                </span>
                <h3 className="text-sm font-bold tracking-wider uppercase text-foreground mb-2 font-mono">
                  FORENSICS
                </h3>
                <p className="text-base font-semibold text-foreground mb-2">
                  Visual and temporal signals.
                </p>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  Executes Error Level Analysis (ELA), sensor PRNU noise floor
                  continuity, and inter-frame temporal optical flow coherence.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border/60">
                <span className="text-[11px] font-mono text-muted">
                  Vector: ELA, Sensor Noise &amp; Temporal Flow
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          NEXT SECTION: "From upload to evidence"
          Horizontal 4-step visual with simple icon & one sentence
          ══════════════════════════════════════════════════════════ */}
      <section className="py-20 border-b border-border">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-14">
            <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-primary mb-2 block">
              VERIFICATION PIPELINE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              From upload to evidence
            </h2>
            <p className="text-sm text-muted mt-2 leading-relaxed">
              A transparent, reproducible methodology that transforms raw media
              into structured forensic intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 01: Upload */}
            <div className="p-5 sm:p-6 rounded-xl border border-border bg-surface shadow-subtle flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-primary">
                    01
                  </span>
                  <div className="w-8 h-8 rounded-md bg-very-soft-green border border-border flex items-center justify-center text-primary">
                    <FileUp className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">
                  Upload
                </h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  Submit an image or video to initiate container parsing,
                  format validation, and cryptographic hash generation.
                </p>
              </div>
            </div>

            {/* Step 02: Analyze */}
            <div className="p-5 sm:p-6 rounded-xl border border-border bg-surface shadow-subtle flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-primary">
                    02
                  </span>
                  <div className="w-8 h-8 rounded-md bg-very-soft-green border border-border flex items-center justify-center text-primary">
                    <Activity className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">
                  Analyze
                </h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  Execute independent inspection engines across synthetic
                  patterns, provenance claims, headers, and pixel forensics.
                </p>
              </div>
            </div>

            {/* Step 03: Review Evidence */}
            <div className="p-5 sm:p-6 rounded-xl border border-border bg-surface shadow-subtle flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-primary">
                    03
                  </span>
                  <div className="w-8 h-8 rounded-md bg-very-soft-green border border-border flex items-center justify-center text-primary">
                    <Layers className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">
                  Review Evidence
                </h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  Examine granular diagnostic findings, technical telemetry, and
                  clear plain-language explanations for each signal.
                </p>
              </div>
            </div>

            {/* Step 04: Understand Risk */}
            <div className="p-5 sm:p-6 rounded-xl border border-border bg-surface shadow-subtle flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-primary">
                    04
                  </span>
                  <div className="w-8 h-8 rounded-md bg-very-soft-green border border-border flex items-center justify-center text-primary">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">
                  Understand Risk
                </h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  Receive an evidence-based assessment with qualitative
                  confidence strength to inform careful decision-making.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          NEXT SECTION: "Designed for careful decisions"
          4 audience categories with restrained iconography
          ══════════════════════════════════════════════════════════ */}
      <section className="py-20 border-b border-border">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-14">
            <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-primary mb-2 block">
              PROFESSIONAL APPLICATIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Designed for careful decisions
            </h2>
            <p className="text-sm text-muted mt-2 leading-relaxed">
              Tailored for high-stakes environments where black-box labels are
              insufficient and every conclusion must be defensible.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Journalists */}
            <div className="p-5 sm:p-6 rounded-xl border border-border bg-surface shadow-subtle">
              <div className="w-9 h-9 rounded-md bg-very-soft-green border border-border flex items-center justify-center text-primary mb-4">
                <Newspaper className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">
                Journalists
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                Verify user-submitted images, source leaks, and viral breaking
                video before publishing to preserve editorial credibility.
              </p>
            </div>

            {/* 2. Researchers */}
            <div className="p-5 sm:p-6 rounded-xl border border-border bg-surface shadow-subtle">
              <div className="w-9 h-9 rounded-md bg-very-soft-green border border-border flex items-center justify-center text-primary mb-4">
                <GraduationCap className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">
                Researchers
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                Study generative artifact distributions, evaluate detector
                robustness, and audit C2PA implementation integrity across
                datasets.
              </p>
            </div>

            {/* 3. Security Teams */}
            <div className="p-5 sm:p-6 rounded-xl border border-border bg-surface shadow-subtle">
              <div className="w-9 h-9 rounded-md bg-very-soft-green border border-border flex items-center justify-center text-primary mb-4">
                <ShieldAlert className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">
                Security Teams
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                Triage synthetic media used in social engineering campaigns,
                executive impersonation, and fraudulent compliance submissions.
              </p>
            </div>

            {/* 4. Everyday Users */}
            <div className="p-5 sm:p-6 rounded-xl border border-border bg-surface shadow-subtle">
              <div className="w-9 h-9 rounded-md bg-very-soft-green border border-border flex items-center justify-center text-primary mb-4">
                <Users className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">
                Everyday Users
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                Cross-examine suspicious images circulating on social networks
                and messaging groups before sharing or placing trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FINAL CTA
          ══════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="border border-border rounded-2xl bg-surface p-8 sm:p-14 text-center max-w-3xl mx-auto shadow-subtle">
            <div className="w-12 h-12 rounded-xl bg-soft-green border border-[#C1E3CA] text-primary flex items-center justify-center mx-auto mb-6">
              <ScanSearch className="w-6 h-6" />
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-foreground mb-4">
              Verify the media before you trust the message.
            </h2>

            <p className="text-sm sm:text-base text-muted max-w-lg mx-auto mb-8 leading-relaxed">
              Upload an image or video to begin a transparent multi-signal
              evidence assessment.
            </p>

            <Link href="/verify">
              <Button
                variant="primary"
                size="lg"
                icon={<ScanSearch className="w-4 h-4" />}
                className="font-semibold px-8 shadow-subtle text-sm"
              >
                Verify Media
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Hero Verification Visual Mock
   Reflects the exact requested workflow:
   MEDIA -> example-image.jpg
   ↓
   VERIFICATION SIGNALS:
   AI Detection       Detected
   Provenance         Available
   Metadata           Reviewed
   Forensics          Reviewed
   ↓
   TRUST REPORT:
   "Requires Review"
   Evidence: Multiple signals available
   ───────────────────────────────────────────────────────────── */

function HeroVerificationVisual() {
  return (
    <div className="border border-border rounded-xl bg-surface shadow-card overflow-hidden">
      {/* Chrome Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-[#FAFAF8]">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DDE3DE]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#DDE3DE]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#DDE3DE]" />
          </div>
          <span className="text-[11px] font-mono text-muted font-medium ml-1">
            TrustLayer Verification Session
          </span>
        </div>
        <span className="text-[10px] font-mono uppercase bg-soft-green text-primary px-2 py-0.5 rounded border border-[#C1E3CA] font-semibold">
          Audit Ready
        </span>
      </div>

      <div className="p-5 space-y-3.5">
        {/* Step 1: MEDIA Node */}
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted font-bold block mb-1.5">
            MEDIA
          </span>
          <div className="flex items-center gap-3 p-3 bg-very-soft-green rounded-lg border border-border">
            <div className="w-9 h-9 rounded-md bg-surface border border-border flex items-center justify-center shrink-0">
              <FileImage className="w-4.5 h-4.5 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold font-mono text-foreground truncate">
                example-image.jpg
              </p>
              <p className="text-[11px] text-muted font-mono">
                2.4 MB · JPEG · 3024 × 4032 · SHA-256 Intact
              </p>
            </div>
            <span className="text-[10px] font-mono font-semibold text-primary bg-soft-green px-2 py-0.5 rounded border border-[#C1E3CA]">
              Loaded
            </span>
          </div>
        </div>

        {/* Direction Connector */}
        <div className="flex justify-center my-0.5">
          <ArrowDown className="w-3.5 h-3.5 text-muted opacity-60" />
        </div>

        {/* Step 2: VERIFICATION SIGNALS */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted font-bold">
              VERIFICATION SIGNALS
            </span>
            <span className="text-[10px] font-mono text-muted">
              4 / 4 evaluated
            </span>
          </div>

          <div className="border border-border rounded-lg bg-[#FAFBF9] divide-y divide-border/70 text-xs font-mono">
            {/* AI Detection -> Detected */}
            <div className="flex items-center justify-between px-3 py-2 bg-surface">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-3.5 h-3.5 text-primary" />
                <span className="font-semibold text-foreground text-xs">
                  AI Detection
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-warning-bg text-[#92610F] border border-[#E8D5A0]">
                Detected
              </span>
            </div>

            {/* Provenance -> Available */}
            <div className="flex items-center justify-between px-3 py-2 bg-surface">
              <div className="flex items-center gap-2">
                <Fingerprint className="w-3.5 h-3.5 text-primary" />
                <span className="font-semibold text-foreground text-xs">
                  Provenance
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-success-bg text-success border border-[#B8DFC6]">
                Available
              </span>
            </div>

            {/* Metadata -> Reviewed */}
            <div className="flex items-center justify-between px-3 py-2 bg-surface">
              <div className="flex items-center gap-2">
                <FileSearch className="w-3.5 h-3.5 text-primary" />
                <span className="font-semibold text-foreground text-xs">
                  Metadata
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-very-soft-green text-foreground border border-border">
                Reviewed
              </span>
            </div>

            {/* Forensics -> Reviewed */}
            <div className="flex items-center justify-between px-3 py-2 bg-surface">
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-primary" />
                <span className="font-semibold text-foreground text-xs">
                  Forensics
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-very-soft-green text-foreground border border-border">
                Reviewed
              </span>
            </div>
          </div>
        </div>

        {/* Direction Connector */}
        <div className="flex justify-center my-0.5">
          <ArrowDown className="w-3.5 h-3.5 text-muted opacity-60" />
        </div>

        {/* Step 3: TRUST REPORT */}
        <div className="p-3.5 rounded-lg border border-border bg-surface">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted font-bold">
              TRUST REPORT
            </span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-warning-bg text-[#92610F] border border-[#E8D5A0]">
              &ldquo;Requires Review&rdquo;
            </span>
          </div>

          <div className="space-y-1 text-[11px] font-mono">
            <div className="flex items-center justify-between">
              <span className="text-muted">Evidence:</span>
              <span className="font-semibold text-primary">
                Multiple signals available
              </span>
            </div>
            <div className="flex items-center justify-between text-muted text-[10px]">
              <span>Synthesis:</span>
              <span>Concurring anomalies flagged for review</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
