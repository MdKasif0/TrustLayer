import { ComponentShowcase } from "./ComponentShowcase";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design System — TrustLayer",
  description: "Component showcase and design system reference for TrustLayer.",
};

export default function DesignSystemPage() {
  return <ComponentShowcase />;
}
