import type { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  FileSearch,
  KeyRound,
  FileCode,
  ScanLine,
  AlertTriangle,
  ExternalLink,
  BookOpen,
  ArrowRight,
  Scale,
  CheckCircle2,
  HelpCircle,
  Clock,
  Layers,
  Cpu,
  Lock,
  Eye,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "How TrustLayer Works — Research, Methodology & Transparency",
  description:
    "TrustLayer combines multiple evidence sources (AI detection, C2PA provenance, metadata, forensics) to provide transparent, probabilistic digital media verification.",
};

interface MethodologyCard {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  focus: string;
  principles: string[];
  indicators: string[];
  scientificBasis: string;
}

const methodologies: MethodologyCard[] = [
  {
    id: "ai-detection",
    number: "METHODOLOGY 01",
    title: "AI DETECTION",
    subtitle: "Synthetic-Content Indicators",
    focus: "Identification of statistical, spatial, and frequency-domain artifacts inherent to generative machine learning architectures.",
    principles: [
      "Dual-domain spectral decomposition (Discrete Cosine Transform and 2D Fast Fourier Transform)",
      "Universal latent visual feature projection across diverse generative backbones (CLIP ViT feature spaces)",
      "High-frequency residual spatial lattice and checkerboard grid attenuation analysis",
      "Perceptual boundary gradient consistency across fine organic textures (hair, pupil edges, foliage)",
    ],
    indicators: [
      "DCT sub-band periodic spikes characteristic of transposed convolutions and diffusion upsampling",
      "Fourier spectral kurtosis divergence from natural optical photographic decay curves",
      "Asymmetric inter-ocular and micro-facial geometry anomalies in synthetic human subjects",
    ],
    scientificBasis:
      "Generative diffusion and GAN pipelines operate within discrete latent coordinate spaces, leaving measurable periodic micro-patterns that differ from continuous photon collection by physical camera sensors.",
  },
  {
    id: "provenance",
    number: "METHODOLOGY 02",
    title: "PROVENANCE",
    subtitle: "C2PA / Content Credentials",
    focus: "Cryptographic manifest auditing and hardware trust anchor verification adhering to Coalition for Content Provenance and Authenticity (C2PA) standards.",
    principles: [
      "ISO/IEC 23008-12 JUMBF (JPEG Universal Metadata Box Format) container inspection",
      "Public Key Infrastructure (PKI) X.509 cryptographic signature chain verification",
      "Hardware-level keystore root validation (e.g. Leica, Sony, Nikon hardware provenance chips)",
      "Audit trail assertion evaluation covering edits, composites, transcodes, and generative augmentations",
    ],
    indicators: [
      "Cryptographic SHA-256 hash binding between file pixel payload and provenance claim",
      "Timestamp authority verification confirming signing epoch against trusted time servers",
      "Detailed lineage graph of parent media assets and downstream digital alterations",
    ],
    scientificBasis:
      "When attached, cryptographically signed metadata manifests provide an immutable chain of custody. However, absence of provenance is ubiquitous across the open web and is never treated as proof of manipulation.",
  },
  {
    id: "metadata",
    number: "METHODOLOGY 03",
    title: "METADATA",
    subtitle: "File-Level Information",
    focus: "Low-level structural parsing of container headers, quantization profiles, and embedded dictionary blocks.",
    principles: [
      "EXIF, XMP, and IPTC dictionary block integrity and cross-field synchronization",
      "JPEG Discrete Quantization Table (DQT) matching against empirical camera firmware databases",
      "Chroma subsampling format profiling (4:2:0 vs 4:2:2 vs 4:4:4 container alignment)",
      "Container atom / stream layout inspection for non-standard muxer and encoder footprints",
    ],
    indicators: [
      "Divergence between stated camera make/model and embedded chrominance quantization tables",
      "Discrepancies between EXIF capture timestamps, GPS UTC timestamps, and filesystem epochs",
      "Signatures of intermediate software re-encoding (e.g. libvips, Pillow, FFmpeg, Adobe Photoshop)",
    ],
    scientificBasis:
      "Physical cameras write standardized quantization profiles and proprietary MakerNotes determined by their hardware image signal processor (ISP). Re-saving or synthetic generation invariably introduces container-level variations.",
  },
  {
    id: "forensics",
    number: "METHODOLOGY 04",
    title: "FORENSICS",
    subtitle: "Visual and Temporal Signals",
    focus: "Classical digital forensics analyzing localized compression variances, sensor noise floors, and physical scene constraints.",
    principles: [
      "Error Level Analysis (ELA) at baseline re-compression matrices to identify localized compression deltas",
      "Photo Response Non-Uniformity (PRNU) sensor pattern noise consistency across image quadrants",
      "Directional lighting and cast shadow vector consistency across multi-object planes",
      "Temporal video coherence: inter-frame optical flow vectors, macroblock GOP consistency, and A/V sync",
    ],
    indicators: [
      "Elevated ELA variance clusters within foreground focal subjects compared to ambient background",
      "Sensor noise floor discontinuities across spatial boundaries indicating splicing or local inpainting",
      "Temporal frame warping and facial boundary micro-jitter across consecutive video frames",
    ],
    scientificBasis:
      "Authentic digital capture obeys the immutable physics of light propagation, lens optics, and sensor pixel well capacity. Spliced, blended, or synthesized elements frequently violate these physical invariants.",
  },
];

interface ResearchPaper {
  id: string;
  authors: string;
  year: string;
  title: string;
  venue: string;
  summary: string;
  trustLayerApplication: string;
  linkUrl: string;
  linkLabel: string;
}

const researchFoundations: ResearchPaper[] = [
  {
    id: "wang-2019",
    authors: "Wang et al.",
    year: "2019 / 2020",
    title: "CNN-generated images are surprisingly easy to spot... for now",
    venue: "IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR 2020)",
    summary:
      "Demonstrated that convolutional generative networks leave common low-level spatial and frequency artifacts across architectures, allowing models trained on a single CNN generator to detect unseen generators with notable cross-model transferability.",
    trustLayerApplication:
      "Informs TrustLayer's spatial-frequency inspection layers and artifact baseline filters for detecting generative synthesis footprints.",
    linkUrl: "https://arxiv.org/abs/1912.11035",
    linkLabel: "arXiv:1912.11035",
  },
  {
    id: "ojha-2023",
    authors: "Ojha, Li & Lee",
    year: "2023",
    title: "Towards Universal Fake Image Detectors that Generalize Across Generative Models",
    venue: "IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR 2023)",
    summary:
      "Addressed the critical failure of legacy detectors on modern diffusion architectures (Latent Diffusion, Stable Diffusion, Midjourney) by leveraging nearest-neighbor representations in pre-trained multi-modal vision encoders (CLIP ViT).",
    trustLayerApplication:
      "Provides the theoretical foundation for TrustLayer's universal feature projection, mitigating detector overfitting to specific proprietary models.",
    linkUrl: "https://arxiv.org/abs/2302.10174",
    linkLabel: "arXiv:2302.10174",
  },
  {
    id: "faceforensics",
    authors: "Rössler et al.",
    year: "2019",
    title: "FaceForensics++: Learning to Detect Manipulated Facial Images",
    venue: "IEEE/CVF International Conference on Computer Vision (ICCV 2019)",
    summary:
      "Constructed a definitive benchmark assessing facial manipulations (Deepfakes, Face2Face, FaceSwap, NeuralTextures) and established the empirical baseline for detector degradation under social media re-compression rates.",
    trustLayerApplication:
      "Guides TrustLayer's compression tolerance modeling and inter-frame temporal consistency checks for video verification.",
    linkUrl: "https://arxiv.org/abs/1901.08971",
    linkLabel: "arXiv:1901.08971",
  },
  {
    id: "deepfakebench",
    authors: "Yan et al.",
    year: "2023",
    title: "DeepfakeBench: A Comprehensive Benchmark of Deepfake Detection",
    venue: "NeurIPS 2023 (Datasets and Benchmarks Track)",
    summary:
      "Unified 15+ state-of-the-art detection algorithms under an open standardized evaluation harness, revealing significant performance variance against realistic perturbations, unseen generators, and post-processing filters.",
    trustLayerApplication:
      "Validates TrustLayer's refusal to rely on single-algorithm accuracy scores, reinforcing the necessity of multi-signal evidence synthesis.",
    linkUrl: "https://arxiv.org/abs/2307.01426",
    linkLabel: "arXiv:2307.01426",
  },
  {
    id: "nist-guidelines",
    authors: "NIST (National Institute of Standards and Technology)",
    year: "2024",
    title: "Reducing Risks Posed by Synthetic Content",
    venue: "NIST AI 100-4 / Generative AI Risk Management Profile",
    summary:
      "Comprehensive federal technical guidelines examining digital watermarking, provenance tracking, statistical detection methods, and the inherent socio-technical limitations of automated authenticity verification.",
    trustLayerApplication:
      "Directly informs TrustLayer's transparent reporting standards, uncertainty disclosures, and strict avoidance of fabricated confidence metrics.",
    linkUrl: "https://www.nist.gov/itl/ai-risk-management-framework",
    linkLabel: "NIST AI Profile",
  },
  {
    id: "c2pa-spec",
    authors: "C2PA Coalition",
    year: "2021 – Present",
    title: "Coalition for Content Provenance and Authenticity",
    venue: "C2PA Open Technical Specifications (Joint Initiative: Adobe, Microsoft, Intel, BBC, Arm)",
    summary:
      "Open technical specification defining end-to-end cryptographic asset binding, JUMBF assertion trees, and hardware keystore signing protocols for verifiable digital provenance.",
    trustLayerApplication:
      "Serves as the architectural implementation standard for TrustLayer's Provenance audit layer and C2PA manifest inspection.",
    linkUrl: "https://c2pa.org/specifications/",
    linkLabel: "c2pa.org/specifications",
  },
];

const limitations = [
  {
    id: "probabilistic",
    title: "Detection is probabilistic, not absolute proof",
    description:
      "Statistical classifiers output likelihood estimations based on patterns observed in empirical training distributions. No machine learning detector can provide 100% certainty. TrustLayer outputs qualitative evidence signals rather than definitive binary verdicts.",
  },
  {
    id: "evasion",
    title: "New generation methods may evade existing detectors",
    description:
      "The generative AI landscape advances continuously. Novel diffusion schedulers, adversarial training routines, and zero-day latent upscalers may exhibit feature distributions not yet represented in public research benchmarks.",
  },
  {
    id: "compression",
    title: "Heavy compression degrades high-frequency forensic evidence",
    description:
      "Transcoding, aggressive JPEG quantization, and social media messaging platforms routinely discard high-frequency DCT coefficients and smooth sensor noise. This lossy degradation can attenuate genuine synthetic artifacts as well as camera noise profiles.",
  },
  {
    id: "benign-editing",
    title: "Standard image editing alters metadata and compression baselines",
    description:
      "Routine post-production actions—such as cropping, localized dodging/burning, color grading, and format re-saving—alter quantization tables and introduce boundary steps. These benign edits can trigger forensic flags without constituting synthetic manipulation.",
  },
  {
    id: "missing-provenance",
    title: "Missing provenance does not indicate fraudulent media",
    description:
      "The overwhelming majority of digital media circulating online lacks C2PA Content Credentials. Absence of provenance merely indicates that cryptographic signing was not performed or was stripped during distribution; it is NEVER proof of manipulation.",
  },
  {
    id: "human-in-the-loop",
    title: "Results must support human judgment, not replace it",
    description:
      "TrustLayer is an investigative decision-support platform designed for journalists, forensic examiners, and trust & safety analysts. Algorithmic findings must always be contextualized with primary source verification and chain-of-custody corroboration.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-8 sm:py-16 bg-background min-h-[calc(100vh-64px)] font-sans">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Document Header Bar */}
        <div className="border-b border-border pb-6 mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold bg-soft-green px-2.5 py-0.5 rounded border border-[#C1E3CA]">
                  RESEARCH & METHODOLOGY
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted bg-[#F0F2F0] px-2 py-0.5 rounded border border-border">
                  CYBER FORENSICS TRANSPARENCY
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                How TrustLayer Works
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-left md:text-right font-mono text-[11px] text-muted">
                <p>DOC REF: TL-MET-2026.04</p>
                <p>REVISED: SEPTEMBER 2026</p>
              </div>
              <Link href="/verify">
                <Button variant="primary" size="sm" className="text-xs">
                  Open Workspace
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Core Philosophy Callout */}
        <section className="mb-16">
          <div className="p-6 sm:p-8 bg-surface border border-border rounded-xl shadow-xs relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
            <div className="max-w-3xl">
              <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold mb-2 block">
                CORE PHILOSOPHY
              </span>
              <blockquote className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight leading-snug mb-4">
                &ldquo;TrustLayer does not attempt to answer authenticity with a single detector.
                It combines multiple evidence sources to provide a transparent, probabilistic assessment.&rdquo;
              </blockquote>
              <p className="text-sm text-muted leading-relaxed">
                Single-model classifiers often produce fragile results in real-world media environments.
                Adversarial perturbations, varied compression codecs, and novel generative architectures easily deceive isolated neural networks.
                TrustLayer treats verification as a structured forensic inquiry: evaluating independent evidence vectors—including synthetic pattern recognition,
                cryptographic provenance, container metadata, and localized pixel forensics—to assemble an auditable, multi-signal evidence record.
              </p>
            </div>
          </div>
        </section>

        {/* Four Methodology Cards */}
        <section className="mb-20">
          <div className="mb-8">
            <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold block mb-1">
              INSPECTION VECTORS
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Four Core Verification Methodologies
            </h2>
            <p className="text-sm text-muted mt-1 max-w-2xl">
              Each evidence channel operates independently. When signals corroborate one another, confidence increases; when signals conflict, the ambiguity is transparently exposed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {methodologies.map((m) => (
              <div
                key={m.id}
                className="p-6 bg-surface border border-border rounded-xl flex flex-col justify-between shadow-xs hover:border-border-strong transition-colors"
              >
                <div>
                  {/* Top Metadata */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-border text-[11px] font-mono text-muted">
                    <span className="font-bold text-primary">{m.number}</span>
                    <span className="bg-[#F0F2F0] px-2 py-0.5 rounded">{m.subtitle}</span>
                  </div>

                  {/* Title & Scope */}
                  <h3 className="text-lg font-bold text-foreground mb-2 tracking-tight">
                    {m.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed mb-5">
                    {m.focus}
                  </p>

                  {/* Principles */}
                  <div className="mb-5">
                    <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-foreground mb-2 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-primary" />
                      Analysis Principles
                    </h4>
                    <ul className="space-y-1.5">
                      {m.principles.map((principle, idx) => (
                        <li key={idx} className="text-xs text-foreground/90 flex items-start gap-2">
                          <span className="text-primary font-mono text-[10px] mt-0.5">•</span>
                          <span className="leading-normal">{principle}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Indicators */}
                  <div className="mb-5 p-3.5 bg-[#FAFBF9] border border-border rounded-lg">
                    <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-foreground mb-2 flex items-center gap-1.5">
                      <ScanLine className="w-3.5 h-3.5 text-primary" />
                      Key Forensic Indicators
                    </h4>
                    <ul className="space-y-1.5">
                      {m.indicators.map((ind, idx) => (
                        <li key={idx} className="text-xs text-muted flex items-start gap-2">
                          <span className="text-primary font-mono text-[10px] mt-0.5">›</span>
                          <span className="leading-relaxed">{ind}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Scientific Basis Footer */}
                <div className="pt-3 border-t border-border mt-2">
                  <p className="text-[11px] text-muted italic leading-relaxed">
                    <strong className="not-italic text-foreground font-semibold">Scientific Basis: </strong>
                    {m.scientificBasis}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Research Foundations Section */}
        <section className="mb-20">
          <div className="mb-8">
            <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold block mb-1">
              PEER-REVIEWED LITERATURE & STANDARDS
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Research Foundations
            </h2>
            <p className="text-sm text-muted mt-1 max-w-2xl">
              TrustLayer synthesizes published breakthroughs across computer vision, forensic signal processing, and institutional authenticity standards.
            </p>
          </div>

          <div className="border border-border rounded-xl bg-surface overflow-hidden shadow-xs">
            <div className="divide-y divide-border">
              {researchFoundations.map((paper) => (
                <div key={paper.id} className="p-5 sm:p-6 hover:bg-[#FAFBF9] transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="max-w-3xl">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="font-mono text-xs font-bold text-primary">
                          {paper.authors}
                        </span>
                        <span className="text-xs text-muted font-mono">({paper.year})</span>
                        <span className="text-[10px] font-mono uppercase bg-[#F0F2F0] text-muted px-2 py-0.5 rounded border border-border">
                          {paper.venue}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-foreground tracking-tight mb-2">
                        &ldquo;{paper.title}&rdquo;
                      </h3>

                      <p className="text-xs text-muted leading-relaxed mb-3">
                        {paper.summary}
                      </p>

                      <div className="p-3 bg-soft-green/50 border border-[#C1E3CA] rounded-lg">
                        <p className="text-xs text-[#0F4023] leading-relaxed">
                          <strong className="font-semibold text-primary">TrustLayer Application: </strong>
                          {paper.trustLayerApplication}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 pt-1">
                      <a
                        href={paper.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-surface text-xs font-mono font-medium text-foreground hover:bg-[#F0F2F0] hover:text-primary transition-colors"
                      >
                        <span>{paper.linkLabel}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-muted" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Important Limitations Section (Amber Aesthetic) */}
        <section className="mb-20">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-[#8A6116]" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#8A6116] font-bold">
                CRITICAL TECHNICAL CONSTRAINTS
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Important Limitations
            </h2>
            <p className="text-sm text-muted mt-1 max-w-2xl">
              Responsible media forensics requires unambiguous disclosure of failure modes, edge cases, and boundary constraints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {limitations.map((lim) => (
              <div
                key={lim.id}
                className="p-5 bg-[#FFFDF8] border border-[#E5D7B5] rounded-xl shadow-xs"
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-[#FBF7EE] border border-[#E5D7B5] flex items-center justify-center shrink-0 mt-0.5 text-[#8A6116]">
                    <span className="text-xs font-mono font-bold">!</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#4B340B] mb-1.5 tracking-tight">
                      {lim.title}
                    </h3>
                    <p className="text-xs text-[#674B16] leading-relaxed">
                      {lim.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Transparency Statement */}
        <section className="mb-12">
          <div className="p-6 sm:p-8 bg-surface text-foreground rounded-xl shadow-xs border-2 border-primary">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold">
                  TRANSPARENCY DECLARATION
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-3">
                Our Commitment to Forensic Integrity
              </h2>
              <div className="space-y-3 text-xs sm:text-sm text-muted leading-relaxed">
                <p>
                  TrustLayer rejects opaque, single-metric commercial claims such as &ldquo;99.9% detection accuracy.&rdquo;
                  In real-world cybersecurity, adversarial conditions, compression degradation, and novel model distributions render fabricated certainty dangerous.
                </p>
                <p>
                  Every assessment generated by TrustLayer reveals its underlying evidence indicators, signal confidences, and methodology limitations.
                  Uploaded media is processed ephemerally in volatile memory and is never repurposed for model training without affirmative user consent.
                  Our objective is not to deliver automated authoritative verdicts, but to equip human investigators with transparent, auditable evidence.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs font-mono text-muted">
                  <span>TrustLayer Open Architecture · Released under MIT License</span>
                </div>
                <div className="flex items-center gap-3">
                  <Link href="/docs">
                    <Button variant="outline" size="sm" className="text-xs">
                      Technical Docs
                    </Button>
                  </Link>
                  <Link href="/verify">
                    <Button variant="primary" size="sm" className="text-xs">
                      Verify Media
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
