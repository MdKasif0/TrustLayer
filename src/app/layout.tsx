import type { Metadata, Viewport } from "next";
import { AppShell } from "@/components/layout";
import { constructMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/seo/StructuredData";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#FAFAF7",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased font-sans bg-background text-foreground min-h-screen">
        {/* Centralized JSON-LD Structured Data */}
        <StructuredData />

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
