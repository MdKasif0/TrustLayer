import type { Metadata } from "next";
import { VerifyPage } from "./VerifyPage";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Verify Media",
  description:
    "Analyze suspicious images and videos with TrustLayer's multi-signal digital media verification workflow.",
  path: "/verify",
});

export default function Page() {
  return <VerifyPage />;
}
