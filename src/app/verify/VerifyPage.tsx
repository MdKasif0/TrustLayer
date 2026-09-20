"use client";

import React, { useState, useCallback, useRef } from "react";
import { MediaFile, AnalysisSignalType, TrustReport } from "@/lib/types";
import { UploadArea } from "@/components/verify/UploadArea";
import { MediaPreview } from "@/components/verify/MediaPreview";
import { SignalConfigPanel } from "@/components/verify/SignalConfigPanel";
import { AnalysisSidebar } from "@/components/verify/AnalysisSidebar";
import { ProcessingStages } from "@/components/verify/ProcessingStages";
import { AssessmentReport } from "@/components/verify/AssessmentReport";
import { defaultAnalysisService, AnalysisProgress } from "@/lib/services/analysisService";
import { ShieldCheck, ShieldAlert, History } from "lucide-react";

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
  const [completedStages, setCompletedStages] = useState<string[]>([]);
  const [telemetryLog, setTelemetryLog] = useState<string[]>([]);
  const [overallProgress, setOverallProgress] = useState<number>(0);

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

  // Trigger analysis execution
  const handleStartVerification = useCallback(async () => {
    if (!selectedMedia || activeSignals.length === 0) return;

    setStep("processing");
    setCurrentStageIndex(0);
    setCompletedStages([]);
    setOverallProgress(0);
    setTelemetryLog([
      `Session initialized for target: ${selectedMedia.name} (${selectedMedia.extension})`,
      `Active inspection signals: ${activeSignals.join(", ")}`,
      `Initializing 6-stage evidence assessment pipeline...`,
    ]);

    try {
      const report = await defaultAnalysisService.analyze(
        selectedMedia,
        activeSignals,
        (progress: AnalysisProgress) => {
          setCurrentStageIndex(progress.stageIndex);
          setCompletedStages(progress.completedStages);
          setOverallProgress(progress.percentage);
          setTelemetryLog((prev) => [...prev, progress.telemetry]);
        }
      );

      setTrustReport(report);
      setStep("report");
    } catch (err: unknown) {
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
    <div className="py-8 sm:py-12 bg-background min-h-[calc(100vh-64px)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold bg-soft-green px-2.5 py-0.5 rounded border border-[#C1E3CA]">
                  Workspace
                </span>
                <span className="text-xs text-muted">Cyber Safety Verification Engine</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Verify Media
              </h1>
              <p className="text-sm text-muted max-w-2xl mt-1.5 leading-relaxed">
                Upload an image or video to begin a multi-signal evidence assessment.
              </p>
            </div>
          </div>
        </header>

        {/* Workspace Views */}
        {step === "report" && trustReport ? (
          /* Step 3: Completed Assessment Report */
          <div className="animate-in fade-in duration-200">
            <AssessmentReport report={trustReport} onReset={handleReset} />
          </div>
        ) : step === "processing" && selectedMedia ? (
          /* Step 2: Active 6-Stage Processing Pipeline */
          <div className="animate-in fade-in duration-200 max-w-4xl mx-auto">
            <ProcessingStages
              media={selectedMedia}
              activeSignals={activeSignals}
              currentStageIndex={currentStageIndex}
              completedStages={completedStages}
              telemetryLog={telemetryLog}
              overallProgress={overallProgress}
            />
          </div>
        ) : (
          /* Step 1: Upload & Configuration Workspace */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Main Interactive Column */}
            <div className="lg:col-span-2 space-y-6">
              {!selectedMedia ? (
                /* Upload Area */
                <UploadArea onFileAccepted={handleFileAccepted} />
              ) : (
                /* Uploaded File Preview */
                <MediaPreview
                  media={selectedMedia}
                  onReplace={handleReplaceMedia}
                  onRemove={handleRemoveMedia}
                />
              )}

              {/* Analysis Configuration Panel */}
              <SignalConfigPanel
                activeSignals={activeSignals}
                onToggleSignal={handleToggleSignal}
                onStartVerification={handleStartVerification}
                disabled={!selectedMedia}
              />
            </div>

            {/* Sidebar Column: File Metadata & System Readiness */}
            <div className="lg:col-span-1">
              <AnalysisSidebar
                media={selectedMedia}
                activeSignalCount={activeSignals.length}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
