import type { Metadata } from "next";
import { VerifyPage } from "./VerifyPage";

export const metadata: Metadata = {
  title: "Verify Media — TrustLayer",
  description:
    "Upload an image or video to verify its authenticity using multi-signal analysis.",
};

export default function Page() {
  return <VerifyPage />;
}
