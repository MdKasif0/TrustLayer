import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import {
  Shield,
  Scale,
  Lock,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About — TrustLayer",
  description:
    "Learn about TrustLayer's approach to evidence-based digital media verification.",
};

const principles = [
  {
    icon: Scale,
    title: "Evidence over verdicts",
    description:
      "We present the evidence and let you decide. TrustLayer never delivers a single \"real\" or \"fake\" label without showing the underlying signals and their confidence levels.",
  },
  {
    icon: Shield,
    title: "Multi-signal approach",
    description:
      "No single detector is reliable enough alone. By combining AI detection, provenance, metadata, and forensic analysis, we reduce false positives and provide a more complete picture.",
  },
  {
    icon: Lock,
    title: "Privacy by default",
    description:
      "Uploaded files are processed in memory and never stored permanently. We don't build profiles, track users, or share data with third parties.",
  },
  {
    icon: Users,
    title: "Built for professionals",
    description:
      "Designed for journalists, fact-checkers, legal teams, and trust & safety professionals who need reliable, auditable verification workflows.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12">
          <h1 className="mb-3">About TrustLayer</h1>
          <p className="text-muted leading-relaxed">
            TrustLayer is a multi-signal digital media verification platform. In
            a world where AI-generated content is increasingly indistinguishable
            from authentic media, single-method detection is no longer
            sufficient.
          </p>
          <p className="text-muted leading-relaxed mt-3">
            We combine multiple independent analysis methods — AI-generation
            detection, digital provenance (C2PA), metadata forensics, and
            pixel-level analysis — to produce transparent, evidence-based
            assessments that professionals can act on.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6">
            Core principles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {principles.map((p) => {
              const Icon = p.icon;
              return (
                <Card key={p.title} padding="md">
                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-md bg-soft-green flex items-center justify-center shrink-0">
                      <Icon className="w-[18px] h-[18px] text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-1">
                        {p.title}
                      </h4>
                      <p className="text-sm text-muted leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="max-w-2xl">
          <h2 className="text-lg font-semibold text-foreground mb-3">
            Why not just one detector?
          </h2>
          <div className="prose prose-sm text-muted space-y-3">
            <p>
              Individual AI detectors have known limitations: they can be fooled
              by post-processing, may produce false positives on certain camera
              models, and their accuracy varies significantly across content
              types.
            </p>
            <p>
              By evaluating multiple independent signals, TrustLayer can identify
              cases where detectors disagree, highlight conflicting evidence, and
              provide confidence-weighted assessments rather than binary
              classifications.
            </p>
            <p>
              This approach is modeled on how professional fact-checkers and
              forensic analysts work: no single piece of evidence is conclusive,
              but the weight of multiple independent signals builds a reliable
              picture.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
