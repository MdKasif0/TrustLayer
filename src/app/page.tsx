import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  ScanSearch,
  Fingerprint,
  FileSearch,
  Layers,
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
  ArrowRight,
  ArrowDown,
  FileText,
  Lock,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="bg-background text-foreground font-sans">
      {/* ══════════════════════════════════════════════════════════
          HERO: TWO-COLUMN PRODUCT STORY
          Left: ~48% | Right: ~52%
          ══════════════════════════════════════════════════════════ */}
      <section className="pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-border">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* LEFT COLUMN: Approximately 48% */}
            <div className="lg:col-span-6 xl:col-span-6">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-very-soft-green border border-border text-primary text-[11px] font-mono font-bold tracking-widest uppercase mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>CYBER SAFETY • DIGITAL MEDIA VERIFICATION</span>
              </div>

              {/* Headline: Large but refined, around 64px on desktop */}
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] xl:text-[62px] font-bold leading-[1.08] tracking-[-0.025em] text-foreground mb-5">
                Know what you&apos;re looking at.
              </h1>

              {/* Supporting Text: 2 to 3 lines */}
              <p className="text-base sm:text-lg text-secondary leading-relaxed mb-5 max-w-xl">
                TrustLayer analyzes digital images and videos across AI detection,
                provenance, metadata and forensic signals to produce an
                evidence-based assessment.
              </p>

              {/* Strong Product Statement with Subtle Green Accent */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-soft-green/60 border border-[#C1E3CA] text-xs sm:text-sm font-mono font-semibold text-primary mb-7">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span>One file. Multiple signals. One transparent assessment.</span>
              </div>

              {/* CTA Row */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Link href="/verify">
                  <Button
                    variant="primary"
                    size="lg"
                    icon={<ScanSearch className="w-4 h-4" />}
                    className="font-semibold px-6 text-sm h-11 rounded-lg"
                  >
                    Verify Media
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="font-medium px-5 text-sm h-11 rounded-lg"
                  >
                    Explore Methodology
                  </Button>
                </Link>
              </div>

              {/* Trust Principle */}
              <div className="inline-flex items-center gap-2 text-xs text-secondary font-mono">
                <Shield className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>Evidence-based assessment. Not absolute certainty.</span>
              </div>
            </div>

            {/* RIGHT COLUMN: Approximately 52% - Floating Application Window */}
            <div className="lg:col-span-6 xl:col-span-6">
              <HeroApplicationPreview />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          PREMIUM TRUST BAR
          Compact editorial strip directly below hero
          ══════════════════════════════════════════════════════════ */}
      <div className="border-b border-border bg-[#FAFAF8]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-soft-green text-primary px-2 py-0.5 rounded border border-[#C1E3CA]">
                MULTI-SIGNAL VERIFICATION
              </span>
              <span className="text-secondary hidden md:inline">
                Independent verification pipeline architecture
              </span>
            </div>

            <div className="flex items-center gap-2 text-secondary font-medium">
              <span className="text-foreground">AI Detection</span>
              <span className="text-border">•</span>
              <span className="text-foreground">Provenance</span>
              <span className="text-border">•</span>
              <span className="text-foreground">Metadata</span>
              <span className="text-border">•</span>
              <span className="text-foreground">Forensics</span>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          "ONE FILE. FOUR EVIDENCE LAYERS."
          Clear, engaging 4-column breakdown + evidence aggregation
          ══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 border-b border-border">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-primary mb-2 block">
              EVIDENTIARY ARCHITECTURE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              One file. Four evidence layers.
            </h2>
            <p className="text-sm text-secondary mt-2 leading-relaxed max-w-xl">
              TrustLayer does not rely on a single opaque model. Each layer
              examines a different property of the media.
            </p>
          </div>

          {/* Four Layer Columns with Visual Flow: 01 → 02 → 03 → 04 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 01 AI DETECTION */}
            <div className="p-6 rounded-xl border border-border bg-surface shadow-xs flex flex-col justify-between hover:border-primary/40 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-primary">
                    01
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-very-soft-green border border-border flex items-center justify-center text-primary">
                    <BrainCircuit className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-xs font-bold tracking-wider uppercase text-foreground mb-1.5 font-mono">
                  AI DETECTION
                </h3>
                <h4 className="text-sm font-semibold text-foreground mb-2">
                  Synthetic-content signals
                </h4>
                <p className="text-xs text-secondary leading-relaxed">
                  Examines visual patterns associated with AI-generated media.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-border/70 flex items-center justify-between text-[11px] font-mono text-secondary">
                <span>Signal Vector</span>
                <span className="text-foreground font-medium">Visual Patterns</span>
              </div>
            </div>

            {/* 02 PROVENANCE */}
            <div className="p-6 rounded-xl border border-border bg-surface shadow-xs flex flex-col justify-between hover:border-primary/40 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-primary">
                    02
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-very-soft-green border border-border flex items-center justify-center text-primary">
                    <Fingerprint className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-xs font-bold tracking-wider uppercase text-foreground mb-1.5 font-mono">
                  PROVENANCE
                </h3>
                <h4 className="text-sm font-semibold text-foreground mb-2">
                  Creation &amp; editing history
                </h4>
                <p className="text-xs text-secondary leading-relaxed">
                  Checks available Content Credentials and provenance information.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-border/70 flex items-center justify-between text-[11px] font-mono text-secondary">
                <span>Signal Vector</span>
                <span className="text-foreground font-medium">C2PA Lineage</span>
              </div>
            </div>

            {/* 03 METADATA */}
            <div className="p-6 rounded-xl border border-border bg-surface shadow-xs flex flex-col justify-between hover:border-primary/40 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-primary">
                    03
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-very-soft-green border border-border flex items-center justify-center text-primary">
                    <FileSearch className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-xs font-bold tracking-wider uppercase text-foreground mb-1.5 font-mono">
                  METADATA
                </h3>
                <h4 className="text-sm font-semibold text-foreground mb-2">
                  File-level information
                </h4>
                <p className="text-xs text-secondary leading-relaxed">
                  Reviews EXIF and other embedded file information.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-border/70 flex items-center justify-between text-[11px] font-mono text-secondary">
                <span>Signal Vector</span>
                <span className="text-foreground font-medium">Container Headers</span>
              </div>
            </div>

            {/* 04 FORENSICS */}
            <div className="p-6 rounded-xl border border-border bg-surface shadow-xs flex flex-col justify-between hover:border-primary/40 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-primary">
                    04
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-very-soft-green border border-border flex items-center justify-center text-primary">
                    <Layers className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-xs font-bold tracking-wider uppercase text-foreground mb-1.5 font-mono">
                  FORENSICS
                </h3>
                <h4 className="text-sm font-semibold text-foreground mb-2">
                  Visual &amp; temporal signals
                </h4>
                <p className="text-xs text-secondary leading-relaxed">
                  Looks for inconsistencies within images and across video frames.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-border/70 flex items-center justify-between text-[11px] font-mono text-secondary">
                <span>Signal Vector</span>
                <span className="text-foreground font-medium">Pixel Coherence</span>
              </div>
            </div>
          </div>

          {/* Flow Connector: EVIDENCE AGGREGATION ↓ TRUST REPORT */}
          <div className="mt-8 p-4 sm:p-5 rounded-xl border border-border bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary bg-soft-green px-2.5 py-1 rounded border border-[#C1E3CA]">
                EVIDENCE AGGREGATION
              </span>
              <span className="text-xs font-mono text-secondary hidden md:inline">
                01 → 02 → 03 → 04
              </span>
              <ArrowRight className="w-4 h-4 text-primary hidden sm:inline" />
              <span className="text-xs font-mono font-bold text-foreground">
                TRUST REPORT
              </span>
            </div>
            <p className="text-xs text-secondary font-mono">
              Independent evidence evaluated in tandem to produce an explainable verdict.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          "FROM UPLOAD TO EVIDENCE" (VISUAL WORKFLOW)
          Horizontal 4-stage process + Mini Product UI visual
          ══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 border-b border-border">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-primary mb-2 block">
              WORKFLOW
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              From upload to evidence
            </h2>
            <p className="text-sm text-secondary mt-2 leading-relaxed">
              A transparent workflow from raw media to an explainable assessment.
            </p>
          </div>

          {/* Horizontal Process Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 relative">
            {/* Step 01 */}
            <div className="p-5 rounded-xl border border-border bg-surface shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-primary">01</span>
                <div className="w-7 h-7 rounded-md bg-very-soft-green border border-border flex items-center justify-center text-primary">
                  <FileUp className="w-3.5 h-3.5" />
                </div>
              </div>
              <h3 className="text-sm font-bold text-foreground mb-1">UPLOAD</h3>
              <p className="text-xs text-secondary leading-relaxed">
                Drop an image or video.
              </p>
            </div>

            {/* Step 02 */}
            <div className="p-5 rounded-xl border border-border bg-surface shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-primary">02</span>
                <div className="w-7 h-7 rounded-md bg-very-soft-green border border-border flex items-center justify-center text-primary">
                  <Activity className="w-3.5 h-3.5" />
                </div>
              </div>
              <h3 className="text-sm font-bold text-foreground mb-1">ANALYZE</h3>
              <p className="text-xs text-secondary leading-relaxed">
                Inspect multiple evidence signals.
              </p>
            </div>

            {/* Step 03 */}
            <div className="p-5 rounded-xl border border-border bg-surface shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-primary">03</span>
                <div className="w-7 h-7 rounded-md bg-very-soft-green border border-border flex items-center justify-center text-primary">
                  <FileText className="w-3.5 h-3.5" />
                </div>
              </div>
              <h3 className="text-sm font-bold text-foreground mb-1">REVIEW</h3>
              <p className="text-xs text-secondary leading-relaxed">
                Examine the findings.
              </p>
            </div>

            {/* Step 04 */}
            <div className="p-5 rounded-xl border border-border bg-surface shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-primary">04</span>
                <div className="w-7 h-7 rounded-md bg-very-soft-green border border-border flex items-center justify-center text-primary">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
              </div>
              <h3 className="text-sm font-bold text-foreground mb-1">ASSESS</h3>
              <p className="text-xs text-secondary leading-relaxed">
                Understand the evidence and risk.
              </p>
            </div>
          </div>

          {/* Product UI Visual Box */}
          <div className="p-4 sm:p-5 rounded-xl border border-border bg-[#FAFAF8] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-secondary uppercase">FILE:</span>
                <span className="font-semibold text-foreground">example-image.jpg</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-secondary uppercase">ANALYSIS:</span>
                <span className="text-primary font-semibold">4 signals evaluated</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-secondary uppercase">RESULT:</span>
                <span className="px-2 py-0.5 rounded bg-warning-bg text-[#92610F] border border-[#E8D5A0] font-bold">
                  Requires Review
                </span>
              </div>
            </div>

            <Link
              href="/verify"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-primary hover:text-primary-hover transition-colors"
            >
              <span>Test with your file</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          "WHY ONE DETECTOR IS NOT ENOUGH"
          Sophisticated comparison: Single Signal vs TrustLayer
          ══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 border-b border-border">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-primary mb-2 block">
              PARADIGM COMPARISON
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Why one detector is not enough.
            </h2>
            <p className="text-sm text-secondary mt-2 leading-relaxed">
              Digital media can carry different kinds of evidence. TrustLayer
              evaluates them together.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* LEFT: SINGLE SIGNAL APPROACH (5 cols) */}
            <div className="lg:col-span-5 p-6 rounded-xl border border-border bg-surface shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-secondary">
                    Single Signal
                  </span>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-warning-bg text-[#92610F] border border-[#E8D5A0]">
                    Limited context
                  </span>
                </div>

                {/* Conceptual Diagram */}
                <div className="my-6 p-4 rounded-lg bg-[#FAFAF8] border border-border/80 text-center font-mono text-xs space-y-2">
                  <div className="py-1.5 px-3 rounded bg-surface border border-border font-medium text-foreground">
                    AI Detector
                  </div>
                  <div className="text-secondary text-[11px]">↓</div>
                  <div className="py-1.5 px-3 rounded bg-surface border border-border text-secondary">
                    One model
                  </div>
                  <div className="text-secondary text-[11px]">↓</div>
                  <div className="py-1.5 px-3 rounded bg-surface border border-border font-semibold text-foreground">
                    One conclusion
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                  Single-model detectors generate binary scores without provenance
                  corroboration or forensic file analysis, making them vulnerable
                  to compression noise and out-of-distribution generators.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/70 text-[11px] font-mono text-secondary">
                Outcome: Fragile assessment lacking actionable explanation.
              </div>
            </div>

            {/* RIGHT: TRUSTLAYER MULTI-SIGNAL APPROACH (7 cols) */}
            <div className="lg:col-span-7 p-6 rounded-xl border border-[#C1E3CA] bg-very-soft-green shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                    TrustLayer Multi-Signal Architecture
                  </span>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-soft-green text-primary border border-[#C1E3CA]">
                    Contextual &amp; Defensible
                  </span>
                </div>

                {/* Conceptual Diagram */}
                <div className="my-6 p-4 rounded-lg bg-surface border border-border text-center font-mono text-xs space-y-2.5">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                    <div className="p-1.5 rounded bg-[#FAFAF8] border border-border font-medium">
                      AI Detection
                    </div>
                    <div className="p-1.5 rounded bg-[#FAFAF8] border border-border font-medium">
                      Provenance
                    </div>
                    <div className="p-1.5 rounded bg-[#FAFAF8] border border-border font-medium">
                      Metadata
                    </div>
                    <div className="p-1.5 rounded bg-[#FAFAF8] border border-border font-medium">
                      Forensics
                    </div>
                  </div>
                  <div className="text-primary text-[11px] font-bold">↓</div>
                  <div className="py-1.5 px-3 rounded bg-very-soft-green border border-border font-semibold text-primary">
                    Evidence Aggregation Engine
                  </div>
                  <div className="text-primary text-[11px] font-bold">↓</div>
                  <div className="py-1.5 px-3 rounded bg-primary text-white font-bold">
                    Transparent Assessment &amp; Complete Audit Trail
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                  TrustLayer interrogates multiple independent vectors to provide
                  explainable, defensible findings where every flag links back to
                  observable file characteristics.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#C1E3CA] text-xs font-mono font-semibold text-primary">
                Core principle: &ldquo;Different signals answer different questions.&rdquo;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          "BUILT FOR PEOPLE WHO NEED EVIDENCE."
          4 applications in a clean 4-column editorial grid
          ══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 border-b border-border">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-primary mb-2 block">
              APPLICATIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Built for people who need evidence.
            </h2>
            <p className="text-sm text-secondary mt-2 leading-relaxed">
              Designed for high-stakes environments where black-box labels are
              insufficient and every conclusion must be defensible.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border border-y border-border py-2">
            {/* JOURNALISTS */}
            <div className="py-6 sm:py-4 sm:pr-6">
              <div className="w-8 h-8 rounded-lg bg-very-soft-green border border-border flex items-center justify-center text-primary mb-4">
                <Newspaper className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground mb-1.5">
                JOURNALISTS
              </h3>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                Review suspicious media before publication.
              </p>
            </div>

            {/* RESEARCHERS */}
            <div className="py-6 sm:py-4 sm:px-6">
              <div className="w-8 h-8 rounded-lg bg-very-soft-green border border-border flex items-center justify-center text-primary mb-4">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground mb-1.5">
                RESEARCHERS
              </h3>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                Study synthetic-media artifacts and detector behavior.
              </p>
            </div>

            {/* SECURITY TEAMS */}
            <div className="py-6 sm:py-4 sm:px-6">
              <div className="w-8 h-8 rounded-lg bg-very-soft-green border border-border flex items-center justify-center text-primary mb-4">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground mb-1.5">
                SECURITY TEAMS
              </h3>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                Investigate suspicious media used in impersonation and social engineering.
              </p>
            </div>

            {/* EVERYDAY USERS */}
            <div className="py-6 sm:py-4 sm:pl-6">
              <div className="w-8 h-8 rounded-lg bg-very-soft-green border border-border flex items-center justify-center text-primary mb-4">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground mb-1.5">
                EVERYDAY USERS
              </h3>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                Understand suspicious images and videos before sharing them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          RESEARCH CREDIBILITY STRIP
          Academic foundations, standards, and existing systems
          ══════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-16 border-b border-border bg-[#FAFAF8]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-primary mb-1 block">
                CREDIBILITY
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Built on research and open standards.
              </h2>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-primary hover:text-primary-hover transition-colors"
            >
              <span>Explore methodology</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            {/* RESEARCH */}
            <div className="p-5 rounded-xl border border-border bg-surface shadow-xs space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary block">
                RESEARCH
              </span>
              <ul className="space-y-1.5 text-secondary">
                <li className="text-foreground font-medium">Wang et al. (2019)</li>
                <li className="text-foreground font-medium">Ojha, Li &amp; Lee (2023)</li>
                <li>FaceForensics++</li>
                <li>DeepfakeBench</li>
              </ul>
            </div>

            {/* STANDARDS */}
            <div className="p-5 rounded-xl border border-border bg-surface shadow-xs space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary block">
                STANDARDS
              </span>
              <ul className="space-y-1.5 text-secondary">
                <li className="text-foreground font-medium">C2PA Standard</li>
                <li className="text-foreground font-medium">Content Credentials</li>
                <li>NIST Synthetic-Content Guidance</li>
                <li>ISO/IEC JUMBF Container Specs</li>
              </ul>
            </div>

            {/* EXISTING SYSTEMS */}
            <div className="p-5 rounded-xl border border-border bg-surface shadow-xs space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary block">
                EXISTING SYSTEMS
              </span>
              <ul className="space-y-1.5 text-secondary">
                <li className="text-foreground font-medium">TrueMedia Principles</li>
                <li className="text-foreground font-medium">Diopter AI</li>
                <li>Open-Source Detection Research</li>
                <li>Defense Media Verification Guidelines</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FINAL CTA
          Restrained, premium green-tinted area
          ══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="border border-border rounded-xl bg-very-soft-green p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-soft-green border border-[#C1E3CA] text-primary flex items-center justify-center mx-auto mb-5">
              <Shield className="w-5 h-5" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
              Verify the media before you trust the message.
            </h2>

            <p className="text-sm text-secondary max-w-lg mx-auto mb-7 leading-relaxed">
              Upload an image or video and examine the evidence behind the assessment.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/verify">
                <Button
                  variant="primary"
                  size="md"
                  icon={<ScanSearch className="w-4 h-4" />}
                  className="font-semibold px-6 text-sm h-10 rounded-lg"
                >
                  Verify Media
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="secondary"
                  size="md"
                  className="font-medium px-5 text-sm h-10 rounded-lg"
                >
                  Explore Methodology
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Hero Application Preview Component
   Realistic floating TrustLayer application window with:
   - Window dots, session badge, audit ready
   - File metadata card
   - Pipeline: MEDIA ↓ 4 SIGNALS ↓ TRUST REPORT
   - Qualitative report card: "Requires Review"
   - Offset depth layer (No glow, No gradients)
   - 4 Evidence Layers micro-indicator
   ───────────────────────────────────────────────────────────── */

function HeroApplicationPreview() {
  return (
    <div className="relative">
      {/* Subtle Physical Depth Offset Layer (No gradients, no glow) */}
      <div
        className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-xl border border-border bg-[#F4F8F4] -z-10"
        aria-hidden="true"
      />

      {/* Main Floating Application Window */}
      <div className="border border-border rounded-xl bg-surface shadow-card overflow-hidden">
        {/* Window Top Chrome */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-[#FAFAF8]">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-[#DDE3DE]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#DDE3DE]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#DDE3DE]" />
            </div>
            <span className="text-[11px] font-mono text-secondary font-medium ml-1">
              TRUSTLAYER • VERIFICATION SESSION
            </span>
          </div>
          <span className="text-[10px] font-mono uppercase bg-soft-green text-primary px-2 py-0.5 rounded border border-[#C1E3CA] font-semibold">
            AUDIT READY
          </span>
        </div>

        {/* Window Content */}
        <div className="p-5 space-y-3.5">
          {/* Top Metadata Card */}
          <div className="p-3 bg-very-soft-green rounded-lg border border-border">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-secondary font-bold">
                TARGET MEDIA
              </span>
              <span className="text-[10px] font-mono font-semibold text-primary bg-soft-green px-1.5 py-0.5 rounded border border-[#C1E3CA]">
                Loaded
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-surface border border-border flex items-center justify-center shrink-0">
                <FileImage className="w-4 h-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold font-mono text-foreground truncate">
                  example-image.jpg
                </p>
                <p className="text-[11px] text-secondary font-mono truncate">
                  JPEG • 2.4 MB • 3024 × 4032 • SHA-256: 8f4a...92b1
                </p>
              </div>
            </div>
          </div>

          {/* Direction Indicator */}
          <div className="flex justify-center my-0.5" aria-hidden="true">
            <ArrowDown className="w-3.5 h-3.5 text-secondary/60" />
          </div>

          {/* 4 SIGNALS Section */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-secondary font-bold">
                VERIFICATION SIGNALS
              </span>
              <span className="text-[10px] font-mono text-secondary">
                4 / 4 evaluated
              </span>
            </div>

            <div className="border border-border rounded-lg bg-[#FAFBF9] divide-y divide-border/70 text-xs font-mono">
              {/* AI Detection -> Detected (Amber) */}
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

              {/* Provenance -> Available (Green) */}
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

              {/* Metadata -> Reviewed (Neutral/Sage) */}
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

              {/* Forensics -> Reviewed (Neutral/Sage) */}
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

          {/* Direction Indicator */}
          <div className="flex justify-center my-0.5" aria-hidden="true">
            <ArrowDown className="w-3.5 h-3.5 text-secondary/60" />
          </div>

          {/* TRUST REPORT Card */}
          <div className="p-3.5 rounded-lg border border-border bg-surface">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-secondary font-bold">
                TRUST REPORT
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-warning-bg text-[#92610F] border border-[#E8D5A0]">
                REQUIRES REVIEW
              </span>
            </div>

            <div className="space-y-1 text-[11px] font-mono">
              <div className="flex items-center justify-between">
                <span className="text-secondary">Evidence:</span>
                <span className="font-semibold text-primary">
                  Multiple signals available
                </span>
              </div>
              <div className="flex items-center justify-between text-secondary text-[10px]">
                <span>Assessment:</span>
                <span className="text-foreground">
                  Concerning signals require further review.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Micro-Visual: 4 Evidence Layers Indicator */}
        <div className="px-4 py-2 bg-[#FAFAF8] border-t border-border flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-secondary">
          <span className="font-bold text-primary uppercase">
            4 EVIDENCE LAYERS
          </span>
          <div className="flex items-center gap-1.5">
            <span>AI Detection</span>
            <span className="text-border">•</span>
            <span>Provenance</span>
            <span className="text-border">•</span>
            <span>Metadata</span>
            <span className="text-border">•</span>
            <span>Forensics</span>
          </div>
        </div>
      </div>
    </div>
  );
}
