"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { reportStorageService, StoredReport } from "@/lib/services/reportStorageService";
import { AssessmentReport } from "@/components/report";
import { Button } from "@/components/ui/Button";
import {
  ArrowLeft,
  FileText,
  AlertCircle,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Layers,
} from "lucide-react";

export default function ReportPermalinkPage() {
  const params = useParams();
  const router = useRouter();
  const rawId = params?.id as string | undefined;
  const id = rawId ? decodeURIComponent(rawId) : "";

  const [storedReport, setStoredReport] = useState<StoredReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchReport() {
      if (!id) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        // Try fetching report by ID or Reference
        let report = await reportStorageService.getReportById(id);

        // If not found in storage, check if demo seed contains it
        if (!report) {
          const seeded = await reportStorageService.seedDemoReports();
          report = seeded.find((r) => r.id === id || r.reportReferenceId === id) || null;
        }

        if (isMounted) {
          setStoredReport(report);
        }
      } catch (err) {
        console.error("Failed to retrieve report:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchReport();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-background py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-sm font-medium text-foreground">Loading verification report...</p>
            <p className="text-xs font-mono text-muted mt-1">Ref ID: {id}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!storedReport) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-background py-16">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="w-14 h-14 bg-warning-bg border border-[#E8D5A0] rounded-xl flex items-center justify-center mx-auto mb-5 text-warning">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground mb-2">
            Verification Report Not Found
          </h1>
          <p className="text-sm text-muted leading-relaxed mb-6">
            The verification report referenced by{" "}
            <code className="font-mono bg-muted/10 px-1.5 py-0.5 rounded text-xs text-foreground">
              {id}
            </code>{" "}
            was not found in your session or local persistence cache.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/reports">
              <Button variant="secondary" className="w-full sm:w-auto">
                <ArrowLeft className="w-4 h-4 mr-2" />
                View All Reports
              </Button>
            </Link>
            <Link href="/verify">
              <Button variant="primary" className="w-full sm:w-auto">
                Verify New Media
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isDemoReport =
    storedReport.isDemo ||
    storedReport.fullReport.keyFindings?.some((f) => f.includes("DEMO ANALYSIS")) ||
    storedReport.reportReferenceId.includes("DEMO");

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background py-8 sm:py-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Navigation & Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-border">
          <div className="flex items-center gap-3">
            <Link
              href="/reports"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-muted hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Verification History</span>
            </Link>
            <span className="text-muted/40">/</span>
            <span className="text-xs font-mono font-bold text-foreground">
              {storedReport.reportReferenceId}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopyLink}
              icon={copiedLink ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5 text-secondary" />}
            >
              {copiedLink ? "Link Copied" : "Copy Permalink"}
            </Button>
            <Link href="/verify">
              <Button variant="primary" size="sm">
                Verify Another File
              </Button>
            </Link>
          </div>
        </div>

        {/* Demo Notice Banner (if generated under Demo Mode) */}
        {isDemoReport && (
          <div className="mb-6 p-4 bg-[#FBF7EE] border border-[#E5D7B5] rounded-xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#8A6116] shrink-0 mt-0.5" />
            <div className="text-xs text-[#5D420F] leading-relaxed">
              <p className="font-bold uppercase tracking-wider text-[11px] text-[#8A6116] mb-0.5">
                DEMO ANALYSIS Notice
              </p>
              This report was generated using TrustLayer&apos;s Demo Analysis Provider for evaluation purposes.
              Findings and telemetry reflect deterministic demonstration data without presenting fictional benchmark claims.
            </div>
          </div>
        )}

        {/* The Full Flagship Assessment Report */}
        <AssessmentReport
          report={storedReport.fullReport}
          onReset={() => router.push("/verify")}
        />
      </div>
    </div>
  );
}
