import React from "react";
import { generateStructuredData } from "@/lib/seo";

export function StructuredData() {
  const { organizationSchema, webSiteSchema } = generateStructuredData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
    </>
  );
}

export function SoftwareApplicationData() {
  const { softwareApplicationSchema } = generateStructuredData();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
    />
  );
}
