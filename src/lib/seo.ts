import type { Metadata } from "next";

export const SITE_CONFIG = {
  name: "TrustLayer",
  titleDefault: "TrustLayer | Evidence-Based Digital Media Verification",
  titleTemplate: "%s | TrustLayer",
  descriptionDefault:
    "TrustLayer analyzes digital images and videos using AI detection, provenance, metadata, and forensic signals to provide transparent, evidence-based media verification.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://trustlayer-v1.netlify.app",
  ogImage: "/og/trustlayer-og.png",
  twitterCard: "summary_large_image" as const,
  keywords: [
    "AI-generated content detection",
    "digital media verification",
    "AI image detection",
    "AI video detection",
    "deepfake detection",
    "manipulated media detection",
    "content authenticity",
    "media provenance",
    "Content Credentials",
    "C2PA",
    "deepfake verification",
    "synthetic media detection",
    "fake image verification",
    "fake video verification",
    "digital content authenticity",
    "media forensics",
    "cyber safety",
  ],
  authors: [{ name: "TrustLayer Engineering" }],
  creator: "TrustLayer",
  publisher: "TrustLayer",
};

export function getBaseUrl(): string {
  // Explicit override (set in .env.local or hosting env vars)
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  // Vercel auto-set variable
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  // Netlify auto-set variable (available at build time)
  if (process.env.URL) {
    return process.env.URL;
  }
  // Local development
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }
  // Production fallback — must match actual deployed domain
  return "https://trustlayer-v1.netlify.app";
}

export function getCanonicalUrl(path: string = ""): string {
  const cleanBase = getBaseUrl().replace(/\/+$/, "");
  const cleanPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  return `${cleanBase}${cleanPath}`;
}

export interface MetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
}

export function constructMetadata({
  title,
  description = SITE_CONFIG.descriptionDefault,
  path = "",
  image = SITE_CONFIG.ogImage,
  imageAlt = "TrustLayer evidence-based digital media verification",
  noIndex = false,
}: MetadataOptions = {}): Metadata {
  const canonical = getCanonicalUrl(path);
  const pageTitle = title ? title : SITE_CONFIG.titleDefault;
  const fullImageUrl = image.startsWith("http") ? image : getCanonicalUrl(image);

  return {
    metadataBase: new URL(getBaseUrl()),
    title: title ? title : { default: SITE_CONFIG.titleDefault, template: SITE_CONFIG.titleTemplate },
    description,
    keywords: SITE_CONFIG.keywords,
    authors: SITE_CONFIG.authors,
    creator: SITE_CONFIG.creator,
    publisher: SITE_CONFIG.publisher,
    applicationName: SITE_CONFIG.name,
    alternates: {
      canonical,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonical,
      siteName: SITE_CONFIG.name,
      title: pageTitle,
      description,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: SITE_CONFIG.twitterCard,
      title: pageTitle,
      description,
      images: [fullImageUrl],
      creator: "@trustlayer",
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.png", type: "image/png", sizes: "512x512" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
      shortcut: "/favicon.ico",
    },
  };
}

/**
 * Generates JSON-LD Structured Data for the TrustLayer Platform
 */
export function generateStructuredData() {
  const siteUrl = getCanonicalUrl();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TrustLayer",
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
    description: "Evidence-based digital media verification platform.",
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TrustLayer",
    url: siteUrl,
    description: SITE_CONFIG.descriptionDefault,
    inLanguage: "en-US",
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "TrustLayer",
    applicationCategory: "SecurityApplication",
    operatingSystem: "Web",
    url: siteUrl,
    description:
      "Evidence-based digital media verification platform analyzing images and videos across AI detection, provenance, metadata, and forensics.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return {
    organizationSchema,
    webSiteSchema,
    softwareApplicationSchema,
  };
}
