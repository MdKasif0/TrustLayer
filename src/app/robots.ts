import type { MetadataRoute } from "next";
import { getCanonicalUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getCanonicalUrl();

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/verify", "/how-it-works", "/research", "/docs", "/documentation", "/about"],
      disallow: ["/api/", "/reports/", "/reports", "/settings/", "/settings", "/report/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
