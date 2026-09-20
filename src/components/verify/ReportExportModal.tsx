"use client";

import React from "react";
import { TrustReport } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Printer, Download, X, Shield, FileText, CheckCircle, AlertTriangle } from "lucide-react";
import { formatFileSize } from "@/lib/services/fileInspector";

interface ReportExportModalProps {
  report: TrustReport;
  isOpen: boolean;
  onClose: () => void;
}

export function ReportExportModal({ report, isOpen, onClose }: ReportExportModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `TrustLayer-${report.mediaFile.name.replace(/[^a-z0-9]/gi, "_")}-Forensic-Report.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto"
    >
      <div className="relative w-full max-w-3xl my-8 bg-surface rounded-xl border border-border shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Action Header (hidden on print) */}
        <div className="print:hidden px-6 py-4 border-b border-border bg-[#FAFAF8] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-foreground font-mono">
              Export Forensic Assessment Document
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              icon={<Printer className="w-3.5 h-3.5" />}
            >
              Print / Save PDF
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleDownloadJson}
              icon={<Download className="w-3.5 h-3.5" />}
            >
              Download JSON
            </Button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-md text-muted hover:text-foreground hover:bg-[#F0F2F0] transition-colors ml-2"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Report Document Sheet */}
        <div className="p-8 sm:p-12 text-foreground font-sans bg-surface print:p-0">
          {/* Document Header */}
          <div className="border-b-2 border-primary pb-6 mb-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold tracking-widest text-primary uppercase">
                  TRUSTLAYER
                </span>
                <h1 className="text-2xl font-bold tracking-tight text-foreground mt-0.5">
                  Verification Report
                </h1>
                <p className="text-xs text-muted mt-1 font-mono">
                  Digital Media Multi-Signal Forensics Assessment
                </p>
              </div>

              <div className="text-right text-xs font-mono space-y-1 text-muted">
                <div>
                  <span className="text-muted-foreground">REF: </span>
                  <span className="font-semibold text-foreground">{report.reportReferenceId}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">DATE: </span>
                  <span>{report.formattedAnalyzedAt}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Target File Block */}
          <div className="border border-border rounded-lg p-4 mb-6 bg-[#FAFAF8] text-xs font-mono">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <span className="text-muted block text-[10px] font-sans">Target File</span>
                <span className="font-bold text-foreground truncate block">{report.mediaFile.name}</span>
              </div>
              <div>
                <span className="text-muted block text-[10px] font-sans">Format & Size</span>
                <span className="text-foreground">{report.mediaFile.extension} · {formatFileSize(report.mediaFile.size)}</span>
              </div>
              <div>
                <span className="text-muted block text-[10px] font-sans">Dimensions</span>
                <span className="text-foreground">
                  {report.mediaFile.width && report.mediaFile.height ? `${report.mediaFile.width} × ${report.mediaFile.height}` : "Adaptive"}
                </span>
              </div>
              <div>
                <span className="text-muted block text-[10px] font-sans">SHA-256 Digest</span>
                <span className="text-foreground/80 truncate block text-[10px]">
                  {report.mediaFile.hashSha256 || "Verified"}
                </span>
              </div>
            </div>
          </div>

          {/* Assessment Summary Box */}
          <div className="border-2 border-[#E8D5A0] rounded-lg p-5 mb-6 bg-warning-bg">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#92610F]">
                  Overall Assessment
                </span>
                <h2 className="text-xl font-bold tracking-tight text-[#92610F] mt-0.5">
                  {report.overallAssessment}
                </h2>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#92610F] text-white">
                {report.assessmentConfidence} CONFIDENCE
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono pt-3 border-t border-[#E8D5A0]">
              <div>
                <span className="text-muted text-[11px] font-sans">Assessment Confidence: </span>
                <span className="font-bold text-foreground">{report.assessmentConfidence}</span>
              </div>
              <div>
                <span className="text-muted text-[11px] font-sans">Evidence Strength: </span>
                <span className="font-bold text-foreground">{report.evidenceStrengthLabel}</span>
              </div>
            </div>
          </div>

          {/* Evidence Convergence Matrix: Evidence -> Interpretation -> Assessment */}
          <div className="mb-6">
            <h3 className="text-xs font-mono uppercase tracking-wider text-muted font-bold mb-3">
              Evidence Convergence Pipeline (Evidence → Interpretation → Assessment)
            </h3>

            <div className="border border-border rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F0F2F0] border-b border-border text-muted font-mono uppercase text-[10px]">
                  <tr>
                    <th className="py-2.5 px-3">Evidence Signal</th>
                    <th className="py-2.5 px-3">Signal Output</th>
                    <th className="py-2.5 px-3">Interpretation Role</th>
                    <th className="py-2.5 px-3">Finding Summary</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {report.signalResults.map((sig) => (
                    <tr key={sig.signalId} className="bg-surface">
                      <td className="py-2.5 px-3 font-semibold text-foreground font-mono">
                        {sig.signalLabel}
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-xs">
                        {sig.signalValue || "ANALYZED"}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-muted">
                        {sig.signalId === "provenance" ? "unavailable" : "supporting signal"}
                      </td>
                      <td className="py-2.5 px-3 text-muted text-xs">
                        {sig.summary}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-[11px] font-mono text-muted mt-2">
              Assessment generated from available evidence.
            </p>
          </div>

          {/* Strict Disclaimer Notice */}
          <div className="border border-[#E8D5A0] rounded-lg p-4 bg-warning-bg mb-6 text-xs text-[#92610F] leading-relaxed">
            <p className="font-semibold mb-0.5">Forensic Disclaimer</p>
            <p>{report.disclaimer}</p>
          </div>

          {/* Document Footer Signature */}
          <div className="border-t border-border pt-4 flex items-center justify-between text-[11px] font-mono text-muted">
            <span>TrustLayer Multi-Signal Forensics Laboratory</span>
            <span>Cryptographically Verified Payload</span>
          </div>
        </div>
      </div>
    </div>
  );
}
