import type { Metadata } from "next";
import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Shield,
  FileCode,
  Layers,
  Scale,
  Cpu,
  Fingerprint,
  FileSearch,
  ScanSearch,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Research — Academic Literature & Standards Foundation",
  description:
    "Explore the peer-reviewed research, universal synthetic feature detectors, and C2PA open standards governing TrustLayer's digital media verification platform.",
  path: "/research",
  image: "/og/trustlayer-research.png",
  imageAlt: "TrustLayer research and academic standards foundation",
});

interface ResearchPaper {
  authors: string;
  year: string;
  title: string;
  venue: string;
  summary: string;
  doi?: string;
  url?: string;
  methodologyRelation: string;
}

const researchPapers: ResearchPaper[] = [
  {
    authors: "Wang, Sheng-Yu; Wang, Oliver; Zhang, Richard; Owens, Andrew; Efros, Alexei A.",
    year: "2019",
    title: "CNN-generated images are surprisingly easy to spot... for now",
    venue: "arXiv:1912.11035 / CVPR 2020",
    summary:
      "Demonstrated that a classifier trained on a single CNN-based generator (ProGAN) can generalize surprisingly well to detect images from other, unseen generative architectures, identifying systematic frequency lattice artifacts.",
    methodologyRelation:
      "Underpins TrustLayer's cross-model spectral feature decomposition and discrete cosine transform lattice artifact detection.",
  },
  {
    authors: "Ojha, Utkarsh; Li, Yuheng; Lee, Yong Jae",
    year: "2023",
    title: "Towards Universal Fake Image Detectors that Generalize Across Generative Models",
    venue: "CVPR 2023 (IEEE/CVF Conference on Computer Vision and Pattern Recognition)",
    summary:
      "Introduced a framework leveraging pre-trained vision-language feature spaces (such as CLIP ViT backbones) as universal latent spaces for distinguishing synthetic from authentic imagery across varied diffusion models.",
    methodologyRelation:
      "Guides TrustLayer's latent visual projection analysis, evaluating feature embeddings rather than relying solely on surface pixel classifiers.",
  },
  {
    authors: "Rössler, Andreas; Cozzolino, Davide; Verdoliva, Luisa; Riess, Christian; Thies, Justus; Nießner, Matthias",
    year: "2019",
    title: "FaceForensics++: Learning to Detect Manipulated Facial Images",
    venue: "ICCV 2019 (International Conference on Computer Vision)",
    summary:
      "Established a standard benchmark dataset of automated and semi-automated facial manipulations (Deepfakes, Face2Face, FaceSwap, NeuralTextures), providing standardized compression degradation baselines.",
    methodologyRelation:
      "Informs TrustLayer's facial biometric asymmetry checks and compression resistance testing at varied quality factors.",
  },
  {
    authors: "Yan, Zhiyuan; Zhang, Yong; Fan, Xinfeng; Wu, Baoyuan",
    year: "2023",
    title: "DeepfakeBench: A Comprehensive Benchmark of Deepfake Detection",
    venue: "NeurIPS 2023 (Benchmark & Datasets Track)",
    summary:
      "Standardized evaluation protocol comparing dozens of deepfake detectors across unified perturbation matrices, highlighting vulnerabilities to unseen codecs, resizing, and adversarial post-processing.",
    methodologyRelation:
      "Directly shaped TrustLayer's probabilistic synthesis architecture, replacing single-verdict systems with multi-signal evidence weighing.",
  },
  {
    authors: "National Institute of Standards and Technology (NIST)",
    year: "2023",
    title: "Reducing Risks Posed by Synthetic Content",
    venue: "NIST Special Publication / Executive Order 14110 Technical Guidance",
    summary:
      "Federal technical recommendations advocating multi-layered evidentiary verification, provenance logging, and watermarking interoperability rather than solitary automated classifiers.",
    methodologyRelation:
      "Serves as the structural guideline for TrustLayer's evidentiary separation: AI detection, provenance, metadata, and forensics as isolated channels.",
  },
  {
    authors: "Coalition for Content Provenance and Authenticity (C2PA)",
    year: "2021–2026",
    title: "C2PA Technical Specification: Content Credentials & Provenance Architecture",
    venue: "C2PA / Joint Development Foundation",
    summary:
      "Open technical standard defining cryptographic binding of tamper-evident metadata assertions, signer certificates, and edit lineage histories to media containers (JUMBF).",
    methodologyRelation:
      "Forms TrustLayer's provenance verification module, directly verifying signed manifest roots, certificate revocation status, and hardware signer trust anchors.",
  },
];

export default function ResearchPage() {
  return (
    <div className="py-10 sm:py-16 bg-background text-foreground font-sans min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Document Header Bar */}
        <header className="border-b border-border pb-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold bg-soft-green px-2.5 py-0.5 rounded border border-[#A3D9B5]">
                  ACADEMIC FOUNDATIONS
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted bg-[#F0F2F0] px-2 py-0.5 rounded border border-border">
                  OPEN SCIENTIFIC STANDARDS
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                Research behind digital media verification
              </h1>
              <p className="text-sm sm:text-base text-secondary mt-2 max-w-2xl leading-relaxed">
                TrustLayer is grounded in peer-reviewed computer vision literature, forensic signal processing, and cryptographic content provenance specifications.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/how-it-works">
                <Button
                  variant="secondary"
                  size="md"
                  icon={<BookOpen className="w-4 h-4" />}
                >
                  How It Works
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
          </div>
        </header>

        {/* ══════════════════════════════════════════════════════════
            SECTION 1: SCIENTIFIC RATIONALE
            ══════════════════════════════════════════════════════════ */}
        <section className="mb-16">
          <div className="p-6 sm:p-8 bg-surface border border-border rounded-xl shadow-xs relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
            <div className="max-w-3xl">
              <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold mb-2 block">
                SCIENTIFIC RATIONALE
              </span>
              <blockquote className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight leading-snug mb-4">
                &ldquo;Isolated classifiers degrade under real-world distribution shifts. Robust verification demands orthogonal evidence layers.&rdquo;
              </blockquote>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                Empirical benchmarks consistently show that neural network detectors trained to spot artifacts in one generator often experience significant false alarm rates when evaluated on compressed, re-encoded, or newer generative architectures. TrustLayer isolates four independent evidentiary streams—frequency analysis, cryptographic provenance, container structure, and error-level forensics—to provide transparent, explainable assessments.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 2: PEER-REVIEWED LITERATURE & BENCHMARKS
            ══════════════════════════════════════════════════════════ */}
        <section className="mb-20">
          <div className="mb-8">
            <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold block mb-1">
              FOUNDATIONAL PAPERS &amp; BENCHMARKS
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Peer-reviewed computer vision &amp; forensic literature
            </h2>
          </div>

          <div className="space-y-6">
            {researchPapers.map((paper, idx) => (
              <article
                key={idx}
                className="p-6 rounded-xl border border-border bg-surface shadow-xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-border pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-primary px-2 py-0.5 rounded bg-soft-green border border-[#A3D9B5]">
                      REF {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs font-mono text-muted">{paper.year}</span>
                  </div>
                  <span className="text-xs font-mono text-secondary font-medium">
                    {paper.venue}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-foreground">
                  {paper.title}
                </h3>

                <p className="text-xs font-mono text-muted">
                  {paper.authors}
                </p>

                <p className="text-xs sm:text-sm text-secondary leading-relaxed pt-1">
                  {paper.summary}
                </p>

                <div className="pt-3 border-t border-border flex items-start gap-2 text-xs font-mono bg-[#FAFAF8] p-3 rounded-lg">
                  <span className="text-primary font-bold shrink-0">Research Foundation:</span>
                  <span className="text-muted">{paper.methodologyRelation}</span>
                </div>
              </article>
            ))}
          </div>

          {/* Explicit Research Foundation vs Implemented Technology Callout */}
          <div className="mt-8 p-6 rounded-xl border border-border bg-[#FAFBF9] space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                Important Scientific Distinction: Research vs. Implementation
              </span>
            </div>
            <p className="text-xs sm:text-sm text-secondary leading-relaxed font-sans">
              The peer-reviewed literature above provides the <strong>academic research foundation</strong> informing TrustLayer’s philosophy: that solitary AI detectors are vulnerable to distribution shifts and that multi-signal corroboration is essential.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs font-mono">
              <div className="p-3 bg-surface rounded-lg border border-border">
                <span className="font-bold text-foreground block mb-1">Academic Research Foundation</span>
                <span className="text-muted">Informs our multi-signal evidentiary aggregation rules, probabilistic confidence calibration, and adversarial test benchmarks (NIST, FaceForensics++, DeepfakeBench).</span>
              </div>
              <div className="p-3 bg-surface rounded-lg border border-border">
                <span className="font-bold text-primary block mb-1">Currently Implemented Technology</span>
                <span className="text-foreground">Groq multimodal visual inspection (<code className="text-[11px]">qwen/qwen3.8-27b</code>), binary C2PA JUMBF container scanning, native EXIF/XMP/IPTC parsing, JPEG DQT quantization table analysis, and deterministic evidence aggregation.</span>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 3: STANDARDS BODIES & COALITIONS
            ══════════════════════════════════════════════════════════ */}
        <section className="mb-20">
          <div className="mb-8">
            <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold block mb-1">
              INTEROPERABILITY
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Standards bodies &amp; provenance coalitions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-border bg-surface shadow-xs space-y-3">
              <span className="text-xs font-mono font-bold text-primary uppercase block">
                C2PA / CAI
              </span>
              <h3 className="text-sm font-bold text-foreground">
                Coalition for Content Provenance and Authenticity
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                Standardizes digital asset binding, establishing hardware-to-cloud cryptographic trust anchors, signer validity, and provenance assertions.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-surface shadow-xs space-y-3">
              <span className="text-xs font-mono font-bold text-primary uppercase block">
                W3C SPECIFICATIONS
              </span>
              <h3 className="text-sm font-bold text-foreground">
                Verifiable Credentials &amp; Decentralized Identifiers
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                Cryptographic trust models enabling decentralized identity verification and transparent signature audits for media creators and newsrooms.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-surface shadow-xs space-y-3">
              <span className="text-xs font-mono font-bold text-primary uppercase block">
                ISO / IEC STANDARDS
              </span>
              <h3 className="text-sm font-bold text-foreground">
                ISO 12234-2 &amp; Container Metadata
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                Standardized digital camera image file formats and EXIF specifications, ensuring baseline consistency when evaluating hardware sensor outputs.
              </p>
            </div>
          </div>
        </section>

        {/* Deep Navigation Bar */}
        <section className="p-6 rounded-xl border border-border bg-surface shadow-xs flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-mono text-muted">
            TrustLayer Evidentiary Specifications · Version 2026.04
          </span>
          <div className="flex items-center gap-3">
            <Link href="/how-it-works">
              <Button variant="secondary" size="sm">
                How It Works
              </Button>
            </Link>
            <Link href="/docs">
              <Button variant="secondary" size="sm">
                Documentation
              </Button>
            </Link>
            <Link href="/verify">
              <Button variant="primary" size="sm">
                Open Workspace
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
