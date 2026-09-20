import type { Metadata, Viewport } from "next";
import { AppShell } from "@/components/layout";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#FAFAF7",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://trustlayer.verification.internal"
  ),
  title: {
    default: "TrustLayer | Digital Media Verification",
    template: "%s | TrustLayer",
  },
  description:
    "TrustLayer combines AI detection, provenance, metadata and forensic signals to provide evidence-based digital media assessments.",
  keywords: [
    "digital media verification",
    "AI detection",
    "synthetic content",
    "C2PA provenance",
    "media forensics",
    "deepfake detection",
    "cyber safety",
    "content authenticity",
  ],
  authors: [{ name: "TrustLayer Engineering" }],
  creator: "TrustLayer",
  publisher: "TrustLayer",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "TrustLayer",
    title: "TrustLayer | Digital Media Verification",
    description:
      "TrustLayer combines AI detection, provenance, metadata and forensic signals to provide evidence-based digital media assessments.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrustLayer | Digital Media Verification",
    description:
      "TrustLayer combines AI detection, provenance, metadata and forensic signals to provide evidence-based digital media assessments.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased font-sans bg-background text-foreground min-h-screen">
        {/* Accessible Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:shadow-md focus:outline-none text-xs font-mono font-bold"
        >
          Skip to main content
        </a>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
