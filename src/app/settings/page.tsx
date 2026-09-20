"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  Settings as SettingsIcon,
  Sliders,
  Shield,
  HardDrive,
  Database,
  Trash2,
  Check,
  AlertTriangle,
  FileSearch,
  BrainCircuit,
  Fingerprint,
  Layers,
  ArrowRight,
  Info,
} from "lucide-react";
import { reportStorageService } from "@/lib/services/reportStorageService";

interface UserPreferences {
  enableAiSignal: boolean;
  enableProvenanceSignal: boolean;
  enableMetadataSignal: boolean;
  enableForensicSignal: boolean;
  maxFileSizeMb: number;
  localPersistence: boolean;
  verboseTelemetry: boolean;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  enableAiSignal: true,
  enableProvenanceSignal: true,
  enableMetadataSignal: true,
  enableForensicSignal: true,
  maxFileSizeMb: 50,
  localPersistence: true,
  verboseTelemetry: true,
};

export default function SettingsPage() {
  const [prefs, setPrefs] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [savedNotice, setSavedNotice] = useState(false);
  const [clearedNotice, setClearedNotice] = useState(false);
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("trustlayer_preferences");
      if (saved) {
        setPrefs({ ...DEFAULT_PREFERENCES, ...JSON.parse(saved) });
      }
    } catch {
      // Fallback to defaults
    }
  }, []);

  // Save changes to localStorage
  const handleUpdate = (updates: Partial<UserPreferences>) => {
    setPrefs((prev) => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem("trustlayer_preferences", JSON.stringify(next));
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 2000);
      } catch {
        // Storage unavailable
      }
      return next;
    });
  };

  const handleClearHistory = async () => {
    try {
      await reportStorageService.clearAll();
      setConfirmClearOpen(false);
      setClearedNotice(true);
      setTimeout(() => setClearedNotice(false), 3000);
    } catch (err) {
      console.error("Failed to clear reports cache:", err);
    }
  };

  return (
    <div className="py-8 sm:py-12 bg-background min-h-[calc(100vh-64px)] text-foreground font-sans">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8">
        {/* Page Header */}
        <header className="border-b border-border pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-primary bg-very-soft-green px-2.5 py-0.5 rounded border border-border">
                APPLICATION CONFIGURATION
              </span>
              {savedNotice && (
                <span className="text-[11px] font-mono text-primary font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Saved
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Settings &amp; Preferences
            </h1>
            <p className="text-sm text-muted mt-1 leading-relaxed max-w-2xl">
              Configure default verification parameters, container inspection rules, and local evidence retention.
            </p>
          </div>

          <Link href="/verify">
            <Button variant="primary" size="sm" className="text-xs font-mono">
              Open Workspace
            </Button>
          </Link>
        </header>

        {/* Reassurance Notice */}
        <div className="p-4 rounded-xl bg-surface border border-border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-soft-green flex items-center justify-center text-primary shrink-0 border border-[#C1E3CA]">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-mono font-bold text-foreground uppercase tracking-wider">
                Local-First Forensic Sovereignty
              </p>
              <p className="text-xs text-muted mt-0.5">
                All preferences and evidence records reside securely in your browser&apos;s local sandbox. No data is shared with third parties.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-muted bg-[#F0F2F0] px-2.5 py-1 rounded border border-border shrink-0 self-start sm:self-auto">
            ZERO CLOUD TELEMETRY
          </span>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Core Analysis Preferences */}
          <div className="lg:col-span-7 space-y-6">
            {/* Section 1: Default Verification Signals */}
            <div className="border border-border rounded-xl bg-surface p-6 shadow-xs space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-border">
                <Sliders className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-bold font-mono text-foreground uppercase tracking-wider">
                  Default Verification Signals
                </h3>
              </div>

              <div className="divide-y divide-border space-y-1">
                {/* AI Detection */}
                <div className="pt-3 pb-3 flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <BrainCircuit className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-foreground font-mono block">
                        AI Detection (Diffusion &amp; GAN Patterns)
                      </span>
                      <p className="text-xs text-muted mt-0.5">
                        Examine spatial frequency lattices and transposed convolution artifacts.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={prefs.enableAiSignal}
                    onClick={() => handleUpdate({ enableAiSignal: !prefs.enableAiSignal })}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer border ${
                      prefs.enableAiSignal ? "bg-primary border-primary" : "bg-[#DDE3DE] border-[#C4CCC6]"
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                        prefs.enableAiSignal ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Provenance */}
                <div className="pt-3 pb-3 flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <Fingerprint className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-foreground font-mono block">
                        Provenance (C2PA / Content Credentials)
                      </span>
                      <p className="text-xs text-muted mt-0.5">
                        Inspect JUMBF metadata assertions and PKI cryptographic signatures.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={prefs.enableProvenanceSignal}
                    onClick={() => handleUpdate({ enableProvenanceSignal: !prefs.enableProvenanceSignal })}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer border ${
                      prefs.enableProvenanceSignal ? "bg-primary border-primary" : "bg-[#DDE3DE] border-[#C4CCC6]"
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                        prefs.enableProvenanceSignal ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Metadata */}
                <div className="pt-3 pb-3 flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <FileSearch className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-foreground font-mono block">
                        Metadata (EXIF &amp; Quantization)
                      </span>
                      <p className="text-xs text-muted mt-0.5">
                        Evaluate discrete quantization tables (DQT) and encoder software tags.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={prefs.enableMetadataSignal}
                    onClick={() => handleUpdate({ enableMetadataSignal: !prefs.enableMetadataSignal })}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer border ${
                      prefs.enableMetadataSignal ? "bg-primary border-primary" : "bg-[#DDE3DE] border-[#C4CCC6]"
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                        prefs.enableMetadataSignal ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Forensics */}
                <div className="pt-3 pb-1 flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <Layers className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-foreground font-mono block">
                        Forensics (Error Level Analysis)
                      </span>
                      <p className="text-xs text-muted mt-0.5">
                        Detect compression rate variance and spatial lighting inconsistencies.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={prefs.enableForensicSignal}
                    onClick={() => handleUpdate({ enableForensicSignal: !prefs.enableForensicSignal })}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer border ${
                      prefs.enableForensicSignal ? "bg-primary border-primary" : "bg-[#DDE3DE] border-[#C4CCC6]"
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                        prefs.enableForensicSignal ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Section 2: Container Parsing & Upload Thresholds */}
            <div className="border border-border rounded-xl bg-surface p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-border">
                <HardDrive className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-bold font-mono text-foreground uppercase tracking-wider">
                  Container Parsing Limits
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-mono font-semibold text-foreground block mb-1">
                    Maximum Media Upload Size
                  </label>
                  <p className="text-xs text-muted mb-3">
                    Set client-side memory safety boundaries for binary buffer ingestion.
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {[25, 50, 100].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleUpdate({ maxFileSizeMb: size })}
                        className={`py-2 px-3 text-xs font-mono rounded-lg border font-semibold transition-all cursor-pointer ${
                          prefs.maxFileSizeMb === size
                            ? "bg-primary text-white border-primary shadow-xs"
                            : "bg-[#FAFBF9] text-foreground border-border hover:bg-very-soft-green"
                        }`}
                      >
                        {size} MB
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-[#FAFBF9] rounded-lg border border-border/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-muted">SHA-256 Digest Verification</span>
                  <span className="text-primary font-bold">Mandatory (Hardware Bound)</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Persistence, Privacy & Telemetry */}
          <div className="lg:col-span-5 space-y-6">
            {/* Local Evidence Storage */}
            <div className="border border-border rounded-xl bg-surface p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-border">
                <Database className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-bold font-mono text-foreground uppercase tracking-wider">
                  Evidence Retention
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-foreground block">
                      Local Report Caching
                    </span>
                    <p className="text-xs text-muted mt-0.5">
                      Retain analyzed reports in browser IndexedDB for subsequent review.
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={prefs.localPersistence}
                    onClick={() => handleUpdate({ localPersistence: !prefs.localPersistence })}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer border shrink-0 ${
                      prefs.localPersistence ? "bg-primary border-primary" : "bg-[#DDE3DE] border-[#C4CCC6]"
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                        prefs.localPersistence ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="pt-2 border-t border-border">
                  {!confirmClearOpen ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setConfirmClearOpen(true)}
                      className="w-full text-xs font-mono text-[#991B1B] hover:bg-[#FDF2F2] border-[#F8B4B4]"
                      icon={<Trash2 className="w-3.5 h-3.5" />}
                    >
                      Clear Local History Cache
                    </Button>
                  ) : (
                    <div className="p-3 bg-[#FDF2F2] border border-[#F8B4B4] rounded-lg space-y-2">
                      <p className="text-xs text-[#991B1B] font-medium">
                        Permanently delete all locally stored verification reports?
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={handleClearHistory}
                          className="text-xs font-mono h-7"
                        >
                          Confirm Clear
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setConfirmClearOpen(false)}
                          className="text-xs font-mono h-7"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}

                  {clearedNotice && (
                    <p className="text-xs font-mono text-primary font-semibold mt-2 text-center">
                      Local report history cleared successfully.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Diagnostic Telemetry */}
            <div className="border border-border rounded-xl bg-surface p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-border">
                <Info className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-bold font-mono text-foreground uppercase tracking-wider">
                  Diagnostic Logging
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-foreground block">
                      Verbose Console Telemetry
                    </span>
                    <p className="text-xs text-muted mt-0.5">
                      Output mathematical lattice logs and frequency transform metrics to developer tools.
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={prefs.verboseTelemetry}
                    onClick={() => handleUpdate({ verboseTelemetry: !prefs.verboseTelemetry })}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer border shrink-0 ${
                      prefs.verboseTelemetry ? "bg-primary border-primary" : "bg-[#DDE3DE] border-[#C4CCC6]"
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                        prefs.verboseTelemetry ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="p-3 bg-[#FAFBF9] rounded-lg border border-border/80 text-[11px] font-mono text-muted space-y-1">
                  <div className="flex justify-between">
                    <span>Engine Version:</span>
                    <span className="text-foreground">TrustLayer Core 2.4</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Provider:</span>
                    <span className="text-foreground">Deterministic Demonstration</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

