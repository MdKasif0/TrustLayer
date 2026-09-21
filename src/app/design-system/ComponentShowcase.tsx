"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { EvidenceItem } from "@/components/ui/EvidenceItem";
import { ProgressStep } from "@/components/ui/ProgressStep";
import { TrustIndicator } from "@/components/ui/TrustIndicator";
import { FileUploader } from "@/components/ui/FileUploader";
import { ReportSection, ReportDivider } from "@/components/ui/ReportSection";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { Tooltip } from "@/components/ui/Tooltip";
import {
  ScanSearch,
  Download,
  Trash2,
  Fingerprint,
  FileSearch,
  Layers,
  BrainCircuit,
  Upload,
  Info,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";

export function ComponentShowcase() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <h1 className="mb-2">Design System</h1>
          <p className="text-muted text-sm max-w-lg">
            Component library and visual reference for the TrustLayer
            application. All components below are production-ready.
          </p>
        </div>

        {/* Colors */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-4">Colors</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { name: "Background", color: "#FAFAF7" },
              { name: "Surface", color: "#FFFFFF" },
              { name: "Primary", color: "#16A34A" },
              { name: "Secondary", color: "#2F6B4F" },
              { name: "Soft Green", color: "#EAF4ED" },
              { name: "Foreground", color: "#17201A" },
              { name: "Muted", color: "#647067" },
              { name: "Border", color: "#DDE3DE" },
              { name: "Warning", color: "#B7791F" },
              { name: "Warning BG", color: "#FFF7E6" },
              { name: "Danger", color: "#B42318" },
              { name: "Danger BG", color: "#FEF0EF" },
              { name: "Success", color: "#28734A" },
              { name: "Success BG", color: "#ECF7EF" },
            ].map((c) => (
              <div key={c.name} className="flex flex-col gap-1.5">
                <div
                  className="w-full h-12 rounded-md border border-border"
                  style={{ backgroundColor: c.color }}
                />
                <div>
                  <p className="text-xs font-medium text-foreground">{c.name}</p>
                  <p className="text-xs text-muted font-mono">{c.color}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-4">Button Design System</h2>
          <Card padding="md">
            <div className="space-y-6">
              <div>
                <p className="text-xs font-mono font-bold text-muted uppercase tracking-wider mb-2">
                  Semantic Variants (Tactile Cybersecurity System)
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary">Primary Action</Button>
                  <Button variant="secondary">Secondary Action</Button>
                  <Button variant="tertiary" iconRight={<ArrowRight className="w-3.5 h-3.5" />}>
                    Tertiary Action
                  </Button>
                  <Button variant="danger" icon={<Trash2 className="w-4 h-4" />}>
                    Danger
                  </Button>
                  <Button variant="warning" icon={<AlertTriangle className="w-4 h-4" />}>
                    Warning
                  </Button>
                </div>
              </div>

              <div>
                <p className="text-xs font-mono font-bold text-muted uppercase tracking-wider mb-2">
                  Size Hierarchy (48px / 44px / 36px / 40px icon)
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="lg" icon={<ScanSearch className="w-4 h-4" />}>
                    Large (48px)
                  </Button>
                  <Button size="md" variant="secondary" icon={<ScanSearch className="w-4 h-4" />}>
                    Medium (44px)
                  </Button>
                  <Button size="sm" variant="outline" icon={<ScanSearch className="w-3.5 h-3.5" />}>
                    Small (36px)
                  </Button>
                  <Button size="icon" variant="secondary" aria-label="Search icon">
                    <ScanSearch className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <p className="text-xs font-mono font-bold text-muted uppercase tracking-wider mb-2">
                  Interactive &amp; System States
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button icon={<Download className="w-4 h-4" />} variant="primary">
                    Export Report
                  </Button>
                  <Button loading variant="primary">
                    Analyzing
                  </Button>
                  <Button disabled variant="primary">
                    Disabled Primary
                  </Button>
                  <Button disabled variant="secondary">
                    Disabled Secondary
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Badges */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-4">Badges</h2>
          <Card padding="md">
            <div className="flex flex-wrap items-center gap-3">
              <Badge>Default</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="muted">Muted</Badge>
            </div>
          </Card>
        </section>

        {/* Status Badges */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-4">Status Badges</h2>
          <Card padding="md">
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status="verified" />
              <StatusBadge status="likely-authentic" />
              <StatusBadge status="uncertain" />
              <StatusBadge status="suspicious" />
              <StatusBadge status="manipulated" />
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <StatusBadge status="pending" size="sm" />
              <StatusBadge status="running" size="sm" />
              <StatusBadge status="error" size="sm" />
            </div>
          </Card>
        </section>

        {/* Trust Indicators */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-4">Trust Indicators</h2>
          <Card padding="lg">
            <div className="flex flex-wrap items-start justify-around gap-8">
              <TrustIndicator level="verified" confidence={95} size="sm" />
              <TrustIndicator level="likely-authentic" confidence={78} />
              <TrustIndicator level="uncertain" confidence={52} />
              <TrustIndicator level="suspicious" confidence={35} />
              <TrustIndicator level="manipulated" confidence={12} size="lg" />
            </div>
          </Card>
        </section>

        {/* Evidence Items */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-4">Evidence Items</h2>
          <div className="space-y-3">
            <EvidenceItem
              icon={<BrainCircuit className="w-[18px] h-[18px]" />}
              label="AI Generation Classifier"
              category="AI Detection"
              strength="strong"
              confidence={92}
              summary="Image exhibits strong indicators of AI generation including characteristic frequency artifacts and texture patterns."
              onClick={() => {}}
            />
            <EvidenceItem
              icon={<Fingerprint className="w-[18px] h-[18px]" />}
              label="C2PA Content Credentials"
              category="Provenance"
              strength="moderate"
              confidence={65}
              summary="Content credentials found but chain of custody has a gap between original capture and current version."
            />
            <EvidenceItem
              icon={<FileSearch className="w-[18px] h-[18px]" />}
              label="EXIF Metadata"
              category="Metadata"
              strength="weak"
              confidence={40}
              summary="Metadata is partially stripped. Device information present but timestamps show inconsistencies."
            />
            <EvidenceItem
              icon={<Layers className="w-[18px] h-[18px]" />}
              label="Error Level Analysis"
              category="Forensic"
              strength="inconclusive"
              confidence={25}
              summary="No significant compression anomalies detected. Insufficient data for a definitive conclusion."
            />
          </div>
        </section>

        {/* Progress Steps */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-4">Progress Steps</h2>
          <Card padding="md">
            <ProgressStep
              steps={[
                { label: "Upload received", description: "File validated", status: "complete" },
                { label: "AI detection", description: "Scanning patterns", status: "complete" },
                { label: "Provenance check", description: "Verifying C2PA", status: "active" },
                { label: "Metadata analysis", description: "Parsing headers", status: "pending" },
                { label: "Forensic scan", description: "Pixel analysis", status: "pending" },
              ]}
            />
          </Card>
        </section>

        {/* Cards */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-4">Cards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card padding="md">
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
              </CardHeader>
              <p className="text-sm text-muted">Standard card with border and padding.</p>
            </Card>
            <Card padding="md" hoverable>
              <CardHeader>
                <CardTitle>Hoverable</CardTitle>
                <Badge variant="success">Active</Badge>
              </CardHeader>
              <p className="text-sm text-muted">Hover to see shadow effect.</p>
            </Card>
            <Card padding="md" className="bg-soft-green border-[#C8DCCE]">
              <CardHeader>
                <CardTitle>Highlighted</CardTitle>
              </CardHeader>
              <p className="text-sm text-muted">With custom background color.</p>
            </Card>
          </div>
        </section>

        {/* Report Section */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-4">Report Section</h2>
          <Card padding="lg">
            <ReportSection
              title="AI Detection Results"
              description="Signals from AI generation classifiers"
              action={<Badge variant="warning">2 signals</Badge>}
            >
              <p className="text-sm text-muted">
                Report content goes here with evidence items, charts, or other data.
              </p>
            </ReportSection>
            <ReportDivider />
            <ReportSection title="Metadata Summary">
              <p className="text-sm text-muted">
                Another section in the same report card.
              </p>
            </ReportSection>
          </Card>
        </section>

        {/* File Uploader */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-4">File Uploader</h2>
          <Card padding="md">
            <FileUploader />
          </Card>
        </section>

        {/* Empty State */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-4">Empty State</h2>
          <Card padding="none">
            <EmptyState
              icon={<Upload className="w-5 h-5" />}
              title="No files uploaded"
              description="Upload your first file to begin verification."
              action={
                <Button
                  variant="secondary"
                  size="sm"
                  icon={<ScanSearch className="w-3.5 h-3.5" />}
                >
                  Upload file
                </Button>
              }
            />
          </Card>
        </section>

        {/* Tooltip */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-4">Tooltips</h2>
          <Card padding="md">
            <div className="flex flex-wrap items-center gap-6">
              <Tooltip content="Shows more info about this element">
                <Button variant="outline" size="sm" icon={<Info className="w-3.5 h-3.5" />}>
                  Hover me (top)
                </Button>
              </Tooltip>
              <Tooltip content="Bottom tooltip" side="bottom">
                <Button variant="ghost" size="sm">
                  Bottom
                </Button>
              </Tooltip>
              <Tooltip content="Right side" side="right">
                <Button variant="ghost" size="sm">
                  Right
                </Button>
              </Tooltip>
            </div>
          </Card>
        </section>

        {/* Modal */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-4">Modal</h2>
          <Card padding="md">
            <Button variant="outline" onClick={() => setModalOpen(true)}>
              Open Modal
            </Button>
            <Modal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              title="Confirm Action"
              description="Are you sure you want to proceed with this verification?"
              size="sm"
            >
              <div className="space-y-3">
                <p className="text-sm text-muted">
                  This will start the full multi-signal analysis pipeline. The
                  process typically takes 15–30 seconds.
                </p>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setModalOpen(false)}>
                    Confirm
                  </Button>
                </div>
              </div>
            </Modal>
          </Card>
        </section>
      </div>
    </div>
  );
}
