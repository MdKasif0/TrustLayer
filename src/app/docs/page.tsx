import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { DocsClient } from "./DocsClient";

export const metadata: Metadata = constructMetadata({
  title: "Documentation — Verification Methodology & Architecture",
  description:
    "Explore TrustLayer's verification methodology, evidence layers, architecture, and implementation details.",
  path: "/docs",
});

export default function DocsPage() {
  return <DocsClient />;
}
