import crypto from "crypto";

export interface HashVerificationResult {
  sha256: string;
  algorithm: "SHA-256";
  bytesHashed: number;
  explanation: string;
  verified: boolean;
}

export const SHA256_EXPLANATION =
  "The SHA-256 digest identifies the exact uploaded file content. It serves as a cryptographic fingerprint to prevent tampering, but does not determine whether the media is authentic or synthetic.";

/**
 * Computes the cryptographic SHA-256 hash of a file buffer.
 */
export function computeSha256(buffer: Buffer): HashVerificationResult {
  const hash = crypto.createHash("sha256").update(buffer).digest("hex");

  return {
    sha256: hash,
    algorithm: "SHA-256",
    bytesHashed: buffer.length,
    explanation: SHA256_EXPLANATION,
    verified: true,
  };
}

/**
 * Validates a client-submitted SHA-256 digest against the server-computed buffer digest.
 */
export function verifySha256(buffer: Buffer, clientHash?: string): boolean {
  if (!clientHash) return false;
  const serverHash = crypto.createHash("sha256").update(buffer).digest("hex");
  return serverHash.toLowerCase() === clientHash.toLowerCase();
}
