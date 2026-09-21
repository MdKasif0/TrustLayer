"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  BookOpen,
  ScanSearch,
  Fingerprint,
  FileSearch,
  Layers,
  Scale,
  Shield,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  FileCode,
  HardDrive,
  Cpu,
} from "lucide-react";
import { cn } from "@/lib/utils";

type DocTopicId =
  | "getting-started"
  | "ai-detection"
  | "provenance"
  | "metadata"
  | "forensics"
  | "evidentiary-synthesis";

interface DocTopic {
  id: DocTopicId;
  title: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  summary: string;
}

const topics: DocTopic[] = [
  {
    id: "getting-started",
    title: "Getting Started & Container Integrity",
    badge: "Operational Guide",
    icon: ScanSearch,
    summary: "Media ingestion pipeline, supported formats, and SHA-256 client-side cryptographic fingerprinting.",
  },
  {
    id: "ai-detection",
    title: "AI Detection Engine",
    badge: "Algorithmic Reference",
    icon: Cpu,
    summary: "Dual-domain 2D-DCT frequency analysis and convolutional upsampling lattice artifact detection.",
  },
  {
    id: "provenance",
    title: "Provenance & C2PA Architecture",
    badge: "Standards Reference",
    icon: Fingerprint,
    summary: "JUMBF container parsing, PKI cryptographic signatures, and why missing provenance != fake.",
  },
  {
    id: "metadata",
    title: "Metadata & Container Forensics",
    badge: "Structural Reference",
    icon: FileSearch,
    summary: "EXIF dictionaries, JPEG Discrete Quantization Tables (DQT), and software encoder signatures.",
  },
  {
    id: "forensics",
    title: "Pixel-Level Visual Forensics",
    badge: "Diagnostic Reference",
    icon: Layers,
    summary: "Error Level Analysis (ELA), PRNU sensor noise floor coherence, and lighting vector continuity.",
  },
  {
    id: "evidentiary-synthesis",
    title: "Multi-Signal Evidentiary Synthesis",
    badge: "Methodology",
    icon: Scale,
    summary: "Bayesian signal convergence, qualitative confidence levels, and avoiding deceptive statistical percentages.",
  },
];

export function DocsClient() {
  const [activeTopic, setActiveTopic] = useState<DocTopicId>("getting-started");

  return (
    <div className="py-8 sm:py-12 bg-background min-h-[calc(100vh-64px)] text-foreground font-sans">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
        {/* Header */}
        <header className="border-b border-border pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-primary bg-very-soft-green px-2.5 py-0.5 rounded border border-border">
                TECHNICAL DOCUMENTATION
              </span>
              <span className="text-[11px] font-mono text-muted">SPEC VERSION 2026.04</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              TrustLayer documentation
            </h1>
            <p className="text-sm text-muted mt-1 leading-relaxed max-w-2xl">
              In-depth technical guides, algorithm specifications, and evidentiary frameworks governing the TrustLayer verification platform.
            </p>
          </div>

          <Link href="/verify">
            <Button
              variant="primary"
              size="sm"
              icon={<ScanSearch className="w-3.5 h-3.5" />}
            >
              Verify Media
            </Button>
          </Link>
        </header>

        {/* Two-Column Documentation Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Navigation Sidebar */}
          <aside className="lg:col-span-4 space-y-2">
            <div className="border border-border rounded-xl bg-surface p-3 shadow-xs space-y-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted px-3 py-2 block">
                Documentation Modules
              </span>
              {topics.map((t) => {
                const Icon = t.icon;
                const isSelected = t.id === activeTopic;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveTopic(t.id)}
                    className={cn(
                      "w-full p-3 rounded-lg text-left transition-all flex items-start gap-3 cursor-pointer",
                      isSelected
                        ? "bg-very-soft-green text-primary border border-[#C1E3CA] font-semibold"
                        : "text-muted hover:text-foreground hover:bg-[#FAFBF9] border border-transparent"
                    )}
                  >
                    <Icon className={cn("w-4 h-4 mt-0.5 shrink-0", isSelected ? "text-primary" : "text-muted")} />
                    <div className="min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-mono font-bold truncate">{t.title}</span>
                      </div>
                      <span className="text-[10px] font-mono text-muted uppercase block mt-0.5">{t.badge}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Context Card */}
            <div className="border border-border rounded-xl bg-surface p-4 shadow-xs text-xs space-y-2">
              <span className="font-mono font-bold uppercase tracking-wider text-foreground text-[11px] block">
                Forensic Standard
              </span>
              <p className="text-muted leading-relaxed">
                TrustLayer prioritizes transparent diagnostic evidence over opaque probabilistic black boxes.
              </p>
              <Link
                href="/about"
                className="text-primary font-mono text-xs font-semibold inline-flex items-center gap-1 hover:underline pt-1"
              >
                <span>Read Research Foundations</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </aside>

          {/* Right Content Area */}
          <main className="lg:col-span-8">
            <div className="border border-border rounded-xl bg-surface p-6 sm:p-8 shadow-xs space-y-6">
              {/* 1. GETTING STARTED */}
              {activeTopic === "getting-started" && (
                <article className="space-y-6">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-primary uppercase tracking-widest block mb-1">
                      MODULE 01 · OPERATIONAL INGESTION
                    </span>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground font-mono">
                      Getting Started &amp; Container Integrity
                    </h2>
                    <p className="text-sm text-muted mt-2 leading-relaxed">
                      TrustLayer processes media locally within the browser context to ensure chain-of-custody preservation and zero unauthorized cloud exposure.
                    </p>
                  </div>

                  <div className="space-y-4 text-xs font-sans leading-relaxed text-foreground/90">
                    <h3 className="text-sm font-bold font-mono text-foreground uppercase tracking-wider">
                      Supported Media Formats
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-center">
                      {["JPG / JPEG", "PNG", "WEBP", "MP4", "MOV"].map((ext) => (
                        <div key={ext} className="p-2.5 rounded bg-[#FAFBF9] border border-border font-bold">
                          {ext}
                        </div>
                      ))}
                    </div>

                    <h3 className="text-sm font-bold font-mono text-foreground uppercase tracking-wider pt-2">
                      Cryptographic Fingerprinting (SHA-256)
                    </h3>
                    <p className="text-muted">
                      Upon file ingestion, TrustLayer computes an asynchronous cryptographic SHA-256 digest directly from the ArrayBuffer byte stream:
                    </p>
                    <pre className="p-3 bg-[#FAFBF9] rounded-lg border border-border font-mono text-[11px] text-foreground overflow-x-auto">
                      {`// Client-side WebCrypto SHA-256 calculation
const buffer = await file.arrayBuffer();
const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
const hashSha256 = Array.from(new Uint8Array(hashBuffer))
  .map(b => b.toString(16).padStart(2, "0"))
  .join("");`}
                    </pre>

                    <h3 className="text-sm font-bold font-mono text-foreground uppercase tracking-wider pt-2">
                      Memory Safety &amp; Ingestion Limits
                    </h3>
                    <p className="text-muted">
                      Browser heap memory imposes strict limits on synchronous binary manipulation. TrustLayer implements chunked streaming verification for files up to 50 MB (configurable in Settings up to 100 MB).
                    </p>
                  </div>
                </article>
              )}

              {/* 2. AI DETECTION */}
              {activeTopic === "ai-detection" && (
                <article className="space-y-6">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-primary uppercase tracking-widest block mb-1">
                      MODULE 02 · FREQUENCY-DOMAIN ANALYSIS
                    </span>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground font-mono">
                      AI Detection Engine
                    </h2>
                    <p className="text-sm text-muted mt-2 leading-relaxed">
                      Generative models assemble pixels through mathematical algorithms that leave distinctive periodic lattice artifacts in the frequency domain.
                    </p>
                  </div>

                  <div className="space-y-4 text-xs font-sans leading-relaxed text-foreground/90">
                    <h3 className="text-sm font-bold font-mono text-foreground uppercase tracking-wider">
                      Transposed Convolution Lattice Signatures
                    </h3>
                    <p className="text-muted">
                      Upsampling layers in diffusion networks and GAN generators use transposed convolutions or bilinear upscaling, producing characteristic checkerboard artifacts in the Discrete Cosine Transform (DCT) spectrum:
                    </p>
                    <div className="p-4 rounded-lg bg-[#FAFBF9] border border-border font-mono text-xs space-y-1.5">
                      <div className="flex justify-between text-muted">
                        <span>Spectral Kurtosis Metric:</span>
                        <span className="text-foreground font-bold">&gt; 3.80 (Elevated Lattice Peak)</span>
                      </div>
                      <div className="flex justify-between text-muted">
                        <span>Natural Optical Baseline:</span>
                        <span className="text-foreground font-bold">1.80 – 2.40 (Decaying Power Spectrum)</span>
                      </div>
                    </div>

                    <h3 className="text-sm font-bold font-mono text-foreground uppercase tracking-wider pt-2">
                      Probabilistic Nature &amp; Limitations
                    </h3>
                    <div className="p-4 rounded-lg bg-[#FBF7EE] border border-[#E8D5A0] text-xs text-[#5D420F] space-y-1">
                      <span className="font-bold font-mono uppercase tracking-wider block">
                        Core Methodological Principle
                      </span>
                      AI detection is probabilistic and subject to distribution shift. Novel model architectures or heavy social media re-compression alter lattice signatures. AI detection must never be presented as an absolute verdict without corroborating evidence.
                    </div>
                  </div>
                </article>
              )}

              {/* 3. PROVENANCE */}
              {activeTopic === "provenance" && (
                <article className="space-y-6">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-primary uppercase tracking-widest block mb-1">
                      MODULE 03 · CRYPTOGRAPHIC AUDITING
                    </span>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground font-mono">
                      Provenance &amp; C2PA Architecture
                    </h2>
                    <p className="text-sm text-muted mt-2 leading-relaxed">
                      The Coalition for Content Provenance and Authenticity (C2PA) standard attaches cryptographically signed assertion manifests to media assets.
                    </p>
                  </div>

                  <div className="space-y-4 text-xs font-sans leading-relaxed text-foreground/90">
                    <h3 className="text-sm font-bold font-mono text-foreground uppercase tracking-wider">
                      JUMBF Container Parsing
                    </h3>
                    <p className="text-muted">
                      TrustLayer inspects binary file containers for JPEG Universal Metadata Box Format (JUMBF) headers containing assertions, parent claims, and X.509 PKI certificate chains.
                    </p>

                    <div className="p-4 rounded-lg bg-[#FAFBF9] border border-border space-y-2">
                      <span className="font-mono font-bold text-foreground text-xs uppercase block">
                        Forensic Standard: Missing Provenance ≠ Fake
                      </span>
                      <p className="text-muted leading-relaxed">
                        The vast majority of consumer smartphones, DSLRs, and messaging applications do not attach C2PA manifests or routinely strip metadata during upload. The status &ldquo;NOT FOUND&rdquo; reflects standard consumer behavior, not evidence of malicious manipulation.
                      </p>
                    </div>
                  </div>
                </article>
              )}

              {/* 4. METADATA */}
              {activeTopic === "metadata" && (
                <article className="space-y-6">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-primary uppercase tracking-widest block mb-1">
                      MODULE 04 · STRUCTURAL INSPECTION
                    </span>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground font-mono">
                      Metadata &amp; Container Forensics
                    </h2>
                    <p className="text-sm text-muted mt-2 leading-relaxed">
                      Physical camera hardware encodes images with unique quantization tables, firmware identifiers, and synchronized timestamp records.
                    </p>
                  </div>

                  <div className="space-y-4 text-xs font-sans leading-relaxed text-foreground/90">
                    <h3 className="text-sm font-bold font-mono text-foreground uppercase tracking-wider">
                      Discrete Quantization Table (DQT) Analysis
                    </h3>
                    <p className="text-muted">
                      JPEG images use 8x8 luminance and chrominance quantization tables. Camera manufacturers use proprietary quantization profiles that diverge predictably from open-source synthesis libraries like <code className="font-mono text-[11px]">libvips</code> or <code className="font-mono text-[11px]">Pillow</code>.
                    </p>

                    <h3 className="text-sm font-bold font-mono text-foreground uppercase tracking-wider pt-2">
                      Timestamp Divergence
                    </h3>
                    <p className="text-muted">
                      When creation timestamps, GPS epochs, and container modification headers diverge without recorded camera session data, TrustLayer flags the file for human review.
                    </p>
                  </div>
                </article>
              )}

              {/* 5. FORENSICS */}
              {activeTopic === "forensics" && (
                <article className="space-y-6">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-primary uppercase tracking-widest block mb-1">
                      MODULE 05 · PIXEL-LEVEL FORENSICS
                    </span>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground font-mono">
                      Pixel-Level Visual Forensics
                    </h2>
                    <p className="text-sm text-muted mt-2 leading-relaxed">
                      Physical cameras record real-world scenes through optical glass lenses, creating coherent lighting vectors and uniform sensor noise floors.
                    </p>
                  </div>

                  <div className="space-y-4 text-xs font-sans leading-relaxed text-foreground/90">
                    <h3 className="text-sm font-bold font-mono text-foreground uppercase tracking-wider">
                      Error Level Analysis (ELA)
                    </h3>
                    <p className="text-muted">
                      ELA intentionally re-compresses the image at a known baseline (95% quality) and computes the pixel-by-pixel variance delta. Regions that have undergone differential editing or synthetic insertion exhibit anomalous high error deltas.
                    </p>

                    <h3 className="text-sm font-bold font-mono text-foreground uppercase tracking-wider pt-2">
                      Sensor Noise Uniformity (PRNU)
                    </h3>
                    <p className="text-muted">
                      Photo Response Non-Uniformity represents microscopic physical sensor imperfections unique to a camera sensor. AI-synthesized images display artificial noise smoothing across subject perimeters.
                    </p>
                  </div>
                </article>
              )}

              {/* 6. EVIDENTIARY SYNTHESIS */}
              {activeTopic === "evidentiary-synthesis" && (
                <article className="space-y-6">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-primary uppercase tracking-widest block mb-1">
                      MODULE 06 · CONVERGENCE METHODOLOGY
                    </span>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground font-mono">
                      Multi-Signal Evidentiary Synthesis
                    </h2>
                    <p className="text-sm text-muted mt-2 leading-relaxed">
                      TrustLayer combines multiple independent evidence signals rather than relying on a single fallible detector.
                    </p>
                  </div>

                  <div className="space-y-4 text-xs font-sans leading-relaxed text-foreground/90">
                    <h3 className="text-sm font-bold font-mono text-foreground uppercase tracking-wider">
                      Strict Evidentiary Standards (No Fake Percentages)
                    </h3>
                    <p className="text-muted">
                      TrustLayer strictly rejects fabricated numerical precision (such as claiming &ldquo;98.4% AI generated&rdquo;). Authentic digital forensics operates through qualitative evidentiary convergence:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
                      <div className="p-3 bg-[#FAFBF9] rounded-lg border border-border">
                        <span className="text-primary font-bold block">Strong Signal</span>
                        <span className="text-muted text-[11px]">Consistent, cross-validated artifacts identified.</span>
                      </div>
                      <div className="p-3 bg-[#FAFBF9] rounded-lg border border-border">
                        <span className="text-[#92610F] font-bold block">Moderate Signal</span>
                        <span className="text-muted text-[11px]">Indicators present requiring additional investigation.</span>
                      </div>
                      <div className="p-3 bg-[#FAFBF9] rounded-lg border border-border">
                        <span className="text-secondary font-bold block">Limited Evidence</span>
                        <span className="text-muted text-[11px]">Weak indicators insufficient for definitive assessment.</span>
                      </div>
                      <div className="p-3 bg-[#FAFBF9] rounded-lg border border-border">
                        <span className="text-muted font-bold block">Inconclusive</span>
                        <span className="text-muted text-[11px]">Conflicting or heavily compressed signals.</span>
                      </div>
                    </div>
                  </div>
                </article>
              )}

              {/* Module Footer Actions */}
              <div className="pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-xs font-mono text-muted">
                  Ready to test these methodologies on your files?
                </span>
                <Link href="/verify">
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<ScanSearch className="w-3.5 h-3.5" />}
                  >
                    Verify Media Now
                  </Button>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
