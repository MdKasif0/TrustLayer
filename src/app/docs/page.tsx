import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  BookOpen,
  ScanSearch,
  Fingerprint,
  FileSearch,
  Layers,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Documentation — TrustLayer",
  description:
    "Learn how to use TrustLayer for media verification. Guides for AI detection, provenance, metadata analysis, and forensic signals.",
};

const sections = [
  {
    icon: ScanSearch,
    title: "Getting Started",
    description: "Upload your first file and understand the verification report.",
    badge: "Guide",
    href: "/docs",
  },
  {
    icon: ScanSearch,
    title: "AI Detection Signals",
    description:
      "How TrustLayer identifies AI-generated patterns in images and video.",
    badge: "Reference",
    href: "/docs",
  },
  {
    icon: Fingerprint,
    title: "Provenance & C2PA",
    description:
      "Understanding digital provenance, content credentials, and chain of custody.",
    badge: "Reference",
    href: "/docs",
  },
  {
    icon: FileSearch,
    title: "Metadata Analysis",
    description:
      "EXIF, XMP, and IPTC metadata parsing and inconsistency detection.",
    badge: "Reference",
    href: "/docs",
  },
  {
    icon: Layers,
    title: "Forensic Analysis",
    description:
      "Pixel-level forensics: ELA, noise analysis, clone detection, and splicing.",
    badge: "Reference",
    href: "/docs",
  },
  {
    icon: BookOpen,
    title: "Understanding Trust Levels",
    description:
      "How TrustLayer weighs multiple signals to produce confidence-based assessments.",
    badge: "Concept",
    href: "/docs",
  },
];

export default function DocsPage() {
  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="mb-2">Documentation</h1>
          <p className="text-muted text-sm max-w-lg">
            Guides and references for understanding TrustLayer&apos;s verification
            methodology and using the platform effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Link key={section.title} href={section.href}>
                <Card padding="md" hoverable className="h-full group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-9 h-9 rounded-md bg-soft-green flex items-center justify-center">
                      <Icon className="w-[18px] h-[18px] text-primary" />
                    </div>
                    <Badge variant="muted">{section.badge}</Badge>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground mb-1">
                    {section.title}
                  </h4>
                  <p className="text-sm text-muted leading-relaxed mb-3">
                    {section.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
                    Read more
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
