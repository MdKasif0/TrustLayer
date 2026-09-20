"use client";

import React from "react";
import { StoredReport } from "@/lib/services/reportStorageService";
import { AssessmentReport } from "@/components/verify/AssessmentReport";
import { X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ReportDetailModalProps {
  report: StoredReport | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ReportDetailModal({ report, isOpen, onClose }: ReportDetailModalProps) {
  if (!isOpen || !report) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 bg-black/60 overflow-y-auto"
    >
      <div className="relative w-full max-w-5xl my-4 sm:my-8 bg-background rounded-2xl border border-border shadow-xl overflow-hidden animate-in fade-in duration-200">
        {/* Navigation Bar */}
        <div className="sticky top-0 z-30 px-6 py-3.5 border-b border-border bg-surface flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              icon={<ArrowLeft className="w-3.5 h-3.5" />}
            >
              Back to History
            </Button>
            <span className="text-xs font-mono text-muted pl-2">
              Viewing Ref: {report.reportReferenceId}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-[#F0F2F0] transition-colors"
            aria-label="Close report view"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Full Report Content */}
        <div className="p-6 sm:p-10 bg-background max-h-[85vh] overflow-y-auto">
          <AssessmentReport report={report.fullReport} onReset={onClose} />
        </div>
      </div>
    </div>
  );
}
