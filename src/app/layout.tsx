import type { Metadata } from "next";
import { AppShell } from "@/components/layout";
import "./globals.css";

export const metadata: Metadata = {
  title: "TrustLayer — AI-Powered Digital Media Verification",
  description:
    "Multi-signal digital media verification platform. Upload an image or video to analyze AI-generation signals, provenance, metadata, and forensic indicators.",
  keywords: [
    "media verification",
    "AI detection",
    "deepfake detection",
    "image forensics",
    "digital provenance",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
