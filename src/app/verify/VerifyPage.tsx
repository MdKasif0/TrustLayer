"use client";

import React, { useState, useCallback } from "react";
import { FileUploader } from "@/components/ui/FileUploader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressStep } from "@/components/ui/ProgressStep";
import { EmptyState } from "@/components/ui/EmptyState";
import { ScanSearch, Upload } from "lucide-react";

type VerifyState = "idle" | "ready" | "analyzing";

const analysisSteps = [
  { label: "Upload received", description: "File validated and queued", status: "pending" as const },
  { label: "AI generation detection", description: "Scanning for synthetic patterns", status: "pending" as const },
  { label: "Provenance analysis", description: "Checking C2PA and digital signatures", status: "pending" as const },
  { label: "Metadata extraction", description: "Parsing EXIF, XMP, and file headers", status: "pending" as const },
  { label: "Forensic analysis", description: "Examining compression and noise patterns", status: "pending" as const },
  { label: "Report generation", description: "Compiling evidence-based assessment", status: "pending" as const },
];

export function VerifyPage() {
  const [state, setState] = useState<VerifyState>("idle");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file);
    setState("ready");
  }, []);

  const handleAnalyze = useCallback(() => {
    if (!selectedFile) return;
    setState("analyzing");
    // Analysis will be implemented in a future iteration
  }, [selectedFile]);

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="mb-2">Verify Media</h1>
          <p className="text-muted text-sm max-w-lg">
            Upload an image or video file. TrustLayer will analyze it across
            multiple evidence categories and produce an assessment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Upload area */}
          <div className="lg:col-span-2">
            <Card padding="lg">
              <h3 className="text-base font-semibold text-foreground mb-1">
                Upload a file
              </h3>
              <p className="text-sm text-muted mb-4">
                Supported formats: JPEG, PNG, WebP, GIF, MP4, MOV, WebM
              </p>

              <FileUploader
                onFileSelect={handleFileSelect}
                className="mb-4"
              />

              {state === "ready" && (
                <div className="flex items-center justify-end gap-3 pt-2 border-t border-border mt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedFile(null);
                      setState("idle");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    icon={<ScanSearch className="w-4 h-4" />}
                    onClick={handleAnalyze}
                  >
                    Start Analysis
                  </Button>
                </div>
              )}

              {state === "analyzing" && (
                <div className="pt-4 border-t border-border mt-4">
                  <p className="text-sm font-medium text-foreground mb-3">
                    Analysis pipeline
                  </p>
                  <ProgressStep
                    steps={analysisSteps.map((s, i) => ({
                      ...s,
                      status: i === 0 ? "complete" : i === 1 ? "active" : "pending",
                    }))}
                  />
                  <p className="text-xs text-muted mt-4">
                    Full analysis integration will be available in a future release.
                  </p>
                </div>
              )}
            </Card>
          </div>

          {/* Right: Sidebar info */}
          <div className="space-y-4">
            <Card padding="md">
              <h4 className="text-sm font-semibold text-foreground mb-2">
                What we analyze
              </h4>
              <ul className="space-y-2">
                {[
                  "AI generation signals",
                  "C2PA provenance data",
                  "EXIF & XMP metadata",
                  "Compression forensics",
                  "Copy-move detection",
                  "Noise consistency",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-muted"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            <Card padding="md" className="bg-warning-bg border-[#E8D5A0]">
              <h4 className="text-sm font-semibold text-[#92610F] mb-1">
                Important note
              </h4>
              <p className="text-xs text-[#92610F] leading-relaxed">
                No single signal is definitive. TrustLayer provides
                evidence-based assessments, not absolute verdicts. Always
                consider context alongside automated analysis.
              </p>
            </Card>
          </div>
        </div>

        {/* Previous verifications placeholder */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Recent verifications
          </h2>
          <Card padding="none">
            <EmptyState
              icon={<Upload className="w-5 h-5" />}
              title="No verifications yet"
              description="Your verification history will appear here after you analyze your first file."
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
