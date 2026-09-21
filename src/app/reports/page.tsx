"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  reportStorageService,
  StoredReport,
  StoredAssessmentType,
} from "@/lib/services/reportStorageService";
import { formatFileSize } from "@/lib/services/fileInspector";
import { Button } from "@/components/ui/Button";
import { DeleteConfirmModal } from "@/components/reports/DeleteConfirmModal";
import { ReportDetailModal } from "@/components/reports/ReportDetailModal";
import { ReportExportModal } from "@/components/verify/ReportExportModal";
import {
  ScanSearch,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  FileImage,
  Film,
  Eye,
  Download,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Clock,
  Sparkles,
  Shield,
  Layers,
  FileText,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

type FilterOption =
  | "All"
  | "Images"
  | "Videos"
  | "Potentially Synthetic"
  | "Requires Review"
  | "Insufficient Evidence";

type SortOption = "Newest" | "Oldest" | "Assessment";

const assessmentConfig: Record<
  StoredAssessmentType,
  { label: string; bg: string; text: string; border: string }
> = {
  "Potentially Synthetic": {
    label: "Potentially Synthetic",
    bg: "bg-warning-bg",
    text: "text-[#92610F]",
    border: "border-[#E8D5A0]",
  },
  "Requires Review": {
    label: "Requires Review",
    bg: "bg-warning-bg",
    text: "text-warning",
    border: "border-[#E8D5A0]",
  },
  "Insufficient Evidence": {
    label: "Insufficient Evidence",
    bg: "bg-[#F0F2F0]",
    text: "text-muted",
    border: "border-border",
  },
  "No Significant Synthetic Signals": {
    label: "No Significant Synthetic Signals",
    bg: "bg-success-bg",
    text: "text-success",
    border: "border-[#B8DFC6]",
  },
};

export default function ReportsPage() {
  const [reports, setReports] = useState<StoredReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Search, Filter, Sort state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>("All");
  const [selectedSort, setSelectedSort] = useState<SortOption>("Newest");

  // Modal states
  const [selectedReportForView, setSelectedReportForView] = useState<StoredReport | null>(null);
  const [selectedReportForExport, setSelectedReportForExport] = useState<StoredReport | null>(null);
  const [selectedReportForDelete, setSelectedReportForDelete] = useState<StoredReport | null>(null);

  // Load reports from storage on mount
  const loadReports = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await reportStorageService.getReports();
      setReports(data);
    } catch (err) {
      console.error("Failed to load reports:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  // Handle demo seeding
  const handleSeedDemo = async () => {
    setIsLoading(true);
    const seeded = await reportStorageService.seedDemoReports();
    setReports(seeded);
    setIsLoading(false);
  };

  // Handle report deletion
  const handleDeleteConfirm = async () => {
    if (!selectedReportForDelete) return;
    await reportStorageService.deleteReport(selectedReportForDelete.id);
    setSelectedReportForDelete(null);
    await loadReports();
  };

  // Filter & search logic
  const filteredReports = useMemo(() => {
    let result = [...reports];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (r) =>
          r.fileName.toLowerCase().includes(q) ||
          r.reportReferenceId.toLowerCase().includes(q) ||
          r.overallAssessment.toLowerCase().includes(q) ||
          r.fileType.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedFilter === "Images") {
      result = result.filter((r) => r.mediaKind === "image");
    } else if (selectedFilter === "Videos") {
      result = result.filter((r) => r.mediaKind === "video");
    } else if (
      selectedFilter === "Potentially Synthetic" ||
      selectedFilter === "Requires Review" ||
      selectedFilter === "Insufficient Evidence"
    ) {
      result = result.filter((r) => r.overallAssessment === selectedFilter);
    }

    // Sort order
    if (selectedSort === "Newest") {
      result.sort((a, b) => new Date(b.analyzedAt).getTime() - new Date(a.analyzedAt).getTime());
    } else if (selectedSort === "Oldest") {
      result.sort((a, b) => new Date(a.analyzedAt).getTime() - new Date(b.analyzedAt).getTime());
    } else if (selectedSort === "Assessment") {
      result.sort((a, b) => a.overallAssessment.localeCompare(b.overallAssessment));
    }

    return result;
  }, [reports, searchQuery, selectedFilter, selectedSort]);

  const filterOptions: FilterOption[] = [
    "All",
    "Images",
    "Videos",
    "Potentially Synthetic",
    "Requires Review",
    "Insufficient Evidence",
  ];

  return (
    <div className="py-8 sm:py-12 bg-background min-h-[calc(100vh-64px)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-primary bg-soft-green px-2.5 py-0.5 rounded border border-[#C1E3CA]">
                Audit Records
              </span>
              <span className="text-xs text-muted font-mono">
                {reports.length} {reports.length === 1 ? "report" : "reports"} stored
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Verification History
            </h1>
            <p className="text-sm text-muted mt-1 leading-relaxed">
              Review previously analyzed media and their evidence assessments.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link href="/verify">
              <Button variant="primary" size="sm" icon={<ScanSearch className="w-3.5 h-3.5" />}>
                New Verification
              </Button>
            </Link>
          </div>
        </div>

        {/* Search, Filters, and Sorting Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-surface p-4 rounded-xl border border-border shadow-xs">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs font-mono bg-[#FAFBF9] border border-border rounded-lg pl-9 pr-3 py-2 text-foreground focus:outline-none focus:border-primary placeholder:font-sans placeholder:text-muted"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <div className="flex items-center gap-1.5 text-xs text-muted font-mono shrink-0">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort:</span>
            </div>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value as SortOption)}
              className="text-xs font-mono bg-[#FAFBF9] border border-border rounded-lg px-2.5 py-1.5 text-foreground focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
              <option value="Assessment">Assessment</option>
            </select>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setSelectedFilter(filter)}
              className={cn(
                "px-3 py-1 text-xs font-mono rounded-lg border transition-colors cursor-pointer",
                selectedFilter === filter
                  ? "bg-primary text-white border-primary font-semibold"
                  : "bg-surface text-muted border-border hover:border-border-strong hover:text-foreground"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Reports Table / List or Empty State */}
        {isLoading ? (
          <div className="border border-border rounded-xl bg-surface p-4 divide-y divide-border/60">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="py-3.5 flex items-center gap-4 animate-pulse">
                <div className="w-10 h-10 bg-[#F0F2F0] rounded-md shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 bg-[#F0F2F0] rounded w-48" />
                  <div className="h-2.5 bg-[#F0F2F0] rounded w-28" />
                </div>
                <div className="h-6 bg-[#F0F2F0] rounded w-20 hidden md:block" />
                <div className="h-6 bg-[#F0F2F0] rounded w-36 hidden sm:block" />
                <div className="h-6 bg-[#F0F2F0] rounded w-24" />
              </div>
            ))}
          </div>
        ) : filteredReports.length > 0 ? (
          <div className="border border-border rounded-xl bg-surface overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-xs border-collapse">
                <thead className="bg-[#FAFBF9] border-b border-border text-[10px] uppercase font-mono font-bold text-muted tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Media</th>
                    <th className="py-3 px-4">File</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Assessment</th>
                    <th className="py-3 px-4">Evidence</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border font-sans">
                  {filteredReports.map((report) => {
                    const isVid = report.mediaKind === "video";
                    const badge = assessmentConfig[report.overallAssessment] || assessmentConfig["Requires Review"];

                    return (
                      <tr
                        key={report.id}
                        onClick={() => setSelectedReportForView(report)}
                        className="hover:bg-[#FAFBF9] transition-colors cursor-pointer group"
                      >
                        {/* 1. MEDIA THUMBNAIL */}
                        <td className="py-3 px-4">
                          <div className="w-10 h-10 rounded-md bg-[#17201A]/10 border border-border overflow-hidden flex items-center justify-center shrink-0 relative">
                            {report.thumbnailUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={report.thumbnailUrl}
                                alt={report.fileName}
                                className="w-full h-full object-cover"
                              />
                            ) : isVid ? (
                              <Film className="w-4 h-4 text-muted" />
                            ) : (
                              <FileImage className="w-4 h-4 text-muted" />
                            )}
                            {isVid && (
                              <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-black/70 rounded flex items-center justify-center text-[8px] text-white">
                                ▶
                              </span>
                            )}
                          </div>
                        </td>

                        {/* 2. FILE */}
                        <td className="py-3 px-4">
                          <div className="min-w-0 max-w-[200px]">
                            <p className="font-semibold text-foreground truncate font-mono text-xs group-hover:text-primary transition-colors" title={report.fileName}>
                              {report.fileName}
                            </p>
                            <p className="text-[11px] text-muted font-mono">
                              {formatFileSize(report.fileSize)}
                              {report.dimensions ? ` · ${report.dimensions}` : ""}
                            </p>
                          </div>
                        </td>

                        {/* 3. TYPE */}
                        <td className="py-3 px-4 font-mono text-[11px]">
                          <span className="px-1.5 py-0.5 rounded bg-[#F0F2F0] text-foreground border border-border">
                            {report.fileType.toUpperCase()}
                          </span>
                        </td>

                        {/* 4. DATE */}
                        <td className="py-3 px-4 text-muted font-mono text-[11px] whitespace-nowrap">
                          {report.formattedDate}
                        </td>

                        {/* 5. ASSESSMENT */}
                        <td className="py-3 px-4">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1.5 text-[11px] font-mono font-bold px-2 py-0.5 rounded border whitespace-nowrap",
                              badge.bg,
                              badge.text,
                              badge.border
                            )}
                          >
                            {report.overallAssessment}
                          </span>
                        </td>

                        {/* 6. EVIDENCE */}
                        <td className="py-3 px-4 font-mono text-[11px] text-muted whitespace-nowrap">
                          {report.evidenceSummary}
                        </td>

                        {/* 7. STATUS */}
                        <td className="py-3 px-4 font-mono text-[11px]">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={cn(
                                "text-[10px] font-mono font-medium px-2 py-0.5 rounded border",
                                report.status === "Flagged"
                                  ? "bg-warning-bg text-[#92610F] border-[#E8D5A0]"
                                  : report.status === "Verified"
                                  ? "bg-success-bg text-success border-[#B8DFC6]"
                                  : "bg-[#F0F2F0] text-muted border-border"
                              )}
                            >
                              {report.status}
                            </span>
                            {report.isDemo && (
                              <span className="text-[9px] font-mono uppercase bg-primary text-white px-1.5 py-0.5 rounded font-bold" title="Explicitly labeled demo record">
                                DEMO
                              </span>
                            )}
                          </div>
                        </td>

                        {/* 8. ACTION */}
                        <td
                          className="py-3 px-4 text-right"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-end gap-1">
                            <Link
                              href={`/report/${report.id}`}
                              className="p-1.5 text-muted hover:text-primary transition-colors"
                              title="Open permalink report"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedReportForView(report)}
                              title="Quick view"
                              className="p-1.5 h-auto text-muted hover:text-primary"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedReportForExport(report)}
                              title="Export report"
                              className="p-1.5 h-auto text-muted hover:text-foreground"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedReportForDelete(report)}
                              title="Delete report"
                              className="p-1.5 h-auto text-muted hover:text-danger"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="border border-border rounded-xl bg-surface p-10 sm:p-14 text-center shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-soft-green border border-[#D5ECDB] flex items-center justify-center text-primary mx-auto mb-4">
              <FileText className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-foreground">
              No verification reports yet.
            </h3>
            <p className="text-xs sm:text-sm text-muted max-w-md mx-auto mt-1.5 leading-relaxed">
              Upload your first image or video to create a Trust Report.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
              <Link href="/verify">
                <Button variant="primary" size="md" icon={<ScanSearch className="w-4 h-4" />}>
                  Verify Media
                </Button>
              </Link>
              <Button
                variant="outline"
                size="md"
                onClick={handleSeedDemo}
                icon={<Sparkles className="w-3.5 h-3.5" />}
              >
                Load Labeled Demo Examples
              </Button>
            </div>

            <p className="text-[11px] font-mono text-muted/80 mt-4">
              Demo records are explicitly labeled with [DEMO] indicators.
            </p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        report={selectedReportForDelete}
        isOpen={Boolean(selectedReportForDelete)}
        onClose={() => setSelectedReportForDelete(null)}
        onConfirm={handleDeleteConfirm}
      />

      {/* View Full Report Modal */}
      <ReportDetailModal
        report={selectedReportForView}
        isOpen={Boolean(selectedReportForView)}
        onClose={() => setSelectedReportForView(null)}
      />

      {/* Export Report Modal */}
      {selectedReportForExport && (
        <ReportExportModal
          report={selectedReportForExport.fullReport}
          isOpen={Boolean(selectedReportForExport)}
          onClose={() => setSelectedReportForExport(null)}
        />
      )}
    </div>
  );
}
