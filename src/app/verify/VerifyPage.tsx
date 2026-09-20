"use client";

import React, { useState, useCallback, useRef } from "react";
import { MediaFile, AnalysisSignalType, TrustReport } from "@/lib/types";
import { UploadArea } from "@/components/verify/UploadArea";
import { MediaPreview } from "@/components/verify/MediaPreview";
import { SignalConfigPanel } from "@/components/verify/SignalConfigPanel";
import { AnalysisProgressScreen } from "@/components/verify/AnalysisProgressScreen";
import { AssessmentReport } from "@/components/verify/AssessmentReport";
import { StageRuntimeState } from "@/lib/services/analysisService";
import { reportStorageService } from "@/lib/services/reportStorageService";
import { getAnalysisProvider, isDemoMode, AnalysisProgressEvent } from "@/lib/analysis";

type WorkspaceStep = "configure" | "processing" | "report";

export function VerifyPage() {
  const [step, setStep] = useState<WorkspaceStep>("configure");
  const [selectedMedia, setSelectedMedia] = useState<MediaFile | null>(null);
  const [activeSignals, setActiveSignals] = useState<AnalysisSignalType[]>([
    "ai-detection",
    "provenance",
    "metadata",
    "forensic",
  ]);

  // Processing state
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [stageStates, setStageStates] = useState<Record<string, StageRuntimeState>>({});
  const [evidenceSignalsCollected, setEvidenceSignalsCollected] = useState<number>(0);
  const [totalSignals, setTotalSignals] = useState<number>(4);
  const [telemetryLog, setTelemetryLog] = useState<string[]>([]);
  const isCancelledRef = useRef<boolean>(false);

  // Completed report state
  const [trustReport, setTrustReport] = useState<TrustReport | null>(null);

  // Toggle signals in configuration panel
  const handleToggleSignal = useCallback((signalId: AnalysisSignalType) => {
    setActiveSignals((prev) =>
      prev.includes(signalId) ? prev.filter((s) => s !== signalId) : [...prev, signalId]
    );
  }, []);

  // Handle media acceptance from UploadArea
  const handleFileAccepted = useCallback((media: MediaFile) => {
    setSelectedMedia(media);
  }, []);

  // Handle file cancellation / removal
  const handleRemoveMedia = useCallback(() => {
    if (selectedMedia?.previewUrl) {
      URL.revokeObjectURL(selectedMedia.previewUrl);
    }
    setSelectedMedia(null);
    setTrustReport(null);
    setStep("configure");
  }, [selectedMedia]);

  // Handle re-upload / replace file
  const handleReplaceMedia = useCallback(() => {
    handleRemoveMedia();
  }, [handleRemoveMedia]);

  // Handle cancellation during active analysis
  const handleCancelVerification = useCallback(() => {
    isCancelledRef.current = true;
    setStep("configure");
    setTelemetryLog((prev) => [...prev, "Investigation cancelled by user."]);
  }, []);

  // Trigger analysis execution
  const handleStartVerification = useCallback(async () => {
    if (!selectedMedia || activeSignals.length === 0) return;

    isCancelledRef.current = false;
    setStep("processing");
    setCurrentStageIndex(0);
    setEvidenceSignalsCollected(0);
    setTotalSignals(activeSignals.length);
    setStageStates({});
    setTelemetryLog([
      `Session initialized for target: ${selectedMedia.name} (${selectedMedia.extension})`,
      `Active inspection signals: ${activeSignals.join(", ")}`,
      `Initializing multi-signal evidence verification pipeline...`,
    ]);

    try {
      const provider = getAnalysisProvider();
      const report = await provider.analyzeMedia(
        selectedMedia,
        activeSignals,
        {
          onProgress: (progress: AnalysisProgressEvent) => {
            if (isCancelledRef.current) return;
            setCurrentStageIndex(progress.stageIndex);
            if (progress.stageStates) {
              setStageStates(progress.stageStates as Record<string, StageRuntimeState>);
            }
            setEvidenceSignalsCollected(progress.evidenceSignalsCollected);
            setTotalSignals(progress.totalSignals);
            setTelemetryLog((prev) => [...prev, progress.telemetry]);
          },
        }
      );

      if (isCancelledRef.current) return;

      setTrustReport(report);
      try {
        await reportStorageService.saveReport(report, selectedMedia.previewUrl);
      } catch (saveErr) {
        console.warn("Could not persist report to local storage:", saveErr);
      }
      setStep("report");
    } catch (err: unknown) {
      if (isCancelledRef.current) return;
      console.error("Analysis execution failed:", err);
      setTelemetryLog((prev) => [
        ...prev,
        `FATAL: Analysis pipeline terminated unexpectedly: ${err instanceof Error ? err.message : "Unknown failure"}`,
      ]);
    }
  }, [selectedMedia, activeSignals]);

  // Reset workspace to verify another file
  const handleReset = useCallback(() => {
    handleRemoveMedia();
  }, [handleRemoveMedia]);

  return (
    <div className="py-8 sm:py-12 bg-background min-h-[calc(100vh-64px)] text-foreground">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Page Header (Rendered during configuration to set the clear investigative tone) */}
        {step !== "processing" && (
          <header className="mb-8 pb-4 border-b border-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold bg-very-soft-green px-2.5 py-0.5 rounded border border-border">
                    INVESTIGATION WORKSPACE
                  </span>
                  {isDemoMode() && (
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#92610F] font-semibold bg-warning-bg border border-[#E8D5A0] px-2 py-0.5 rounded">
                      Demo Mode
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  Verify Media
                </h1>
                <p className="text-sm text-muted mt-1 leading-relaxed max-w-2xl">
                  Analyze a digital image or video across multiple independent evidence signals.
                </p>
              </div>
            </div>
          </header>
        )}

        {/* WORKSPACE VIEWS */}
        {step === "report" && trustReport ? (
          /* STEP 3: Completed Assessment Report */
          <div className="animate-in fade-in duration-200">
            <AssessmentReport report={trustReport} onReset={handleReset} />
          </div>
        ) : step === "processing" && selectedMedia ? (
          /* STEP 2: Dedicated Analysis Workspace (Two-Column: MEDIA PREVIEW alongside ANALYSIS QUEUE) */
          <div className="animate-in fade-in duration-200">
            <AnalysisProgressScreen
              media={selectedMedia}
              activeSignals={activeSignals}
              currentStageIndex={currentStageIndex}
              stageStates={stageStates}
              evidenceSignalsCollected={evidenceSignalsCollected}
              totalSignals={totalSignals}
              telemetryLog={telemetryLog}
              onCancel={handleCancelVerification}
            />
          </div>
        ) : (
          /* STEP 1: Two-Column Workspace (LEFT: Media Input, RIGHT: Verification Configuration) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: Media Input */}
            <div className="lg:col-span-7">
              {!selectedMedia ? (
                <UploadArea onFileAccepted={handleFileAccepted} />
              ) : (
                <MediaPreview
                  media={selectedMedia}
                  onReplace={handleReplaceMedia}
                  onRemove={handleRemoveMedia}
                />
              )}
            </div>

            {/* RIGHT COLUMN: Verification Configuration */}
            <div className="lg:col-span-5">
              <SignalConfigPanel
                activeSignals={activeSignals}
                onToggleSignal={handleToggleSignal}
                onStartVerification={handleStartVerification}
                disabled={!selectedMedia}
                mediaKind={selectedMedia?.mediaKind || "image"}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
