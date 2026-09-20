"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log unexpected operational errors to telemetry/monitoring
    console.error("TrustLayer Runtime Application Error:", error);
  }, [error]);

  return (
    <div className="py-16 sm:py-24 bg-background min-h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="max-w-xl mx-auto px-4 text-center">
        {/* Forensics Alert Badge */}
        <div className="w-14 h-14 rounded-xl bg-danger-bg border border-[#F0C5C1] flex items-center justify-center mx-auto mb-5 text-danger shadow-xs">
          <ShieldAlert className="w-7 h-7" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#F0F2F0] text-muted font-mono text-[11px] mb-3 border border-border">
          <span>FATAL EXCEPTION CATCH</span>
          {error.digest && <span>· ID: {error.digest.slice(0, 8)}</span>}
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
          An Unexpected Error Occurred
        </h1>

        <p className="text-sm text-muted leading-relaxed mb-6 max-w-md mx-auto">
          The TrustLayer engine encountered an unexpected state while rendering this view.
          Underlying data and file integrity have not been compromised.
        </p>

        {/* Technical Error Detail (Safe, sanitized) */}
        <div className="p-3.5 bg-surface border border-border rounded-lg text-left text-xs font-mono mb-6 overflow-x-auto text-muted">
          <p className="text-foreground font-semibold mb-1">Diagnostic Log:</p>
          <p className="text-danger truncate">{error.message || "Unknown runtime exception"}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            variant="primary"
            onClick={() => reset()}
            className="w-full sm:w-auto text-xs"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-2" />
            Retry Action
          </Button>

          <Link href="/verify" className="w-full sm:w-auto">
            <Button variant="secondary" className="w-full sm:w-auto text-xs">
              Return to Workspace
            </Button>
          </Link>

          <Link href="/" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto text-xs">
              <Home className="w-3.5 h-3.5 mr-2" />
              Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
