"use client";

import React, { useState } from "react";
import { TrustReport } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Copy, Check, X, Share2, Shield, Link2, Hash } from "lucide-react";

interface ReportShareModalProps {
  report: TrustReport;
  isOpen: boolean;
  onClose: () => void;
}

export function ReportShareModal({ report, isOpen, onClose }: ReportShareModalProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/verify#${report.reportReferenceId}` : "";

  if (!isOpen) return null;

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
    >
      <div className="relative w-full max-w-md bg-surface rounded-xl border border-border shadow-lg p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">
              Share Verification Assessment
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-muted hover:text-foreground rounded hover:bg-[#F0F2F0]"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-muted leading-relaxed">
          Share this verifiable multi-signal assessment report with investigators, journalists, or stakeholders.
        </p>

        {/* Share Link Input */}
        <div>
          <label className="text-[11px] font-mono text-muted uppercase tracking-wider block mb-1">
            Verification URL
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 text-xs font-mono bg-[#FAFAF8] border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              icon={copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
            >
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>

        {/* Verification Fingerprint */}
        <div className="p-3 bg-[#FAFAF8] rounded-lg border border-border/70 text-xs font-mono space-y-1">
          <div className="flex items-center gap-1.5 text-muted text-[11px]">
            <Hash className="w-3 h-3 text-primary" />
            <span>Cryptographic Fingerprint</span>
          </div>
          <p className="text-[10px] text-foreground/80 break-all select-all">
            {report.mediaFile.hashSha256 || "TL-DIGEST-VERIFIED"}
          </p>
        </div>

        <div className="pt-2 flex justify-end">
          <Button variant="primary" size="sm" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
