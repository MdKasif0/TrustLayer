import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  ScanSearch,
  Fingerprint,
  FileSearch,
  Layers,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const signals = [
  {
    icon: ScanSearch,
    title: "AI Generation Detection",
    description:
      "Analyze patterns and artifacts that distinguish AI-generated content from authentic media.",
  },
  {
    icon: Fingerprint,
    title: "Digital Provenance",
    description:
      "Trace the origin and chain of custody using C2PA, EXIF data, and embedded signatures.",
  },
  {
    icon: FileSearch,
    title: "Metadata Analysis",
    description:
      "Examine file metadata, timestamps, device information, and editing history for inconsistencies.",
  },
  {
    icon: Layers,
    title: "Forensic Indicators",
    description:
      "Detect compression artifacts, splicing boundaries, clone regions, and noise inconsistencies.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-secondary">
                Evidence-based media verification
              </span>
            </div>

            <h1 className="text-foreground mb-4">
              Verify the authenticity of digital media
            </h1>
            <p className="text-muted text-lg leading-relaxed mb-8 max-w-xl">
              Upload an image or video. TrustLayer analyzes multiple evidence
              sources — AI signals, provenance, metadata, and forensic
              indicators — to produce an understandable, evidence-based
              assessment.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="/verify">
                <Button
                  size="lg"
                  icon={<ScanSearch className="w-4 h-4" />}
                >
                  Verify Media
                </Button>
              </Link>
              <Link href="/docs">
                <Button variant="outline" size="lg">
                  Read the docs
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Signals */}
      <section className="py-12 border-t border-border">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <h2 className="text-foreground mb-2">Multi-signal analysis</h2>
            <p className="text-muted text-sm max-w-lg">
              No single detector is sufficient. TrustLayer evaluates evidence
              across four independent signal categories to produce a balanced
              assessment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {signals.map((signal) => {
              const Icon = signal.icon;
              return (
                <Card key={signal.title} hoverable padding="md">
                  <div className="w-9 h-9 rounded-md bg-soft-green flex items-center justify-center mb-3">
                    <Icon className="w-[18px] h-[18px] text-primary" />
                  </div>
                  <h4 className="text-sm font-semibold text-foreground mb-1">
                    {signal.title}
                  </h4>
                  <p className="text-sm text-muted leading-relaxed">
                    {signal.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 border-t border-border">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <h2 className="text-foreground mb-2">How it works</h2>
            <p className="text-muted text-sm max-w-lg">
              A straightforward three-step process from upload to evidence report.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Upload media",
                description:
                  "Drop an image or video file. We accept common formats up to 50MB.",
              },
              {
                step: "02",
                title: "Multi-signal analysis",
                description:
                  "TrustLayer runs independent detectors across AI, provenance, metadata, and forensic categories.",
              },
              {
                step: "03",
                title: "Evidence report",
                description:
                  "Review each signal's findings, strength, and confidence. Understand the evidence behind the assessment.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <span className="text-2xl font-bold text-border-strong tabular-nums">
                  {item.step}
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 border-t border-border">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <Card padding="lg" className="bg-soft-green border-[#C8DCCE]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold text-foreground mb-1">
                  Ready to verify?
                </h3>
                <p className="text-sm text-muted">
                  Upload a file and receive your first evidence report in seconds.
                </p>
              </div>
              <Link href="/verify">
                <Button icon={<ScanSearch className="w-4 h-4" />}>
                  Start verification
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
