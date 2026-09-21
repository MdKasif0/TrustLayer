"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { AlertTriangle, X, Trash2 } from "lucide-react";
import { StoredReport } from "@/lib/services/reportStorageService";

interface DeleteConfirmModalProps {
  report: StoredReport | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmModal({
  report,
  isOpen,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  if (!isOpen || !report) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
    >
      <div className="relative w-full max-w-md bg-surface rounded-xl border border-border shadow-lg p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-danger-bg flex items-center justify-center text-danger shrink-0 border border-[#F0C5C1]">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">
                Delete Verification Report
              </h3>
              <p className="text-xs font-mono text-muted mt-0.5">
                Ref: {report.reportReferenceId}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 text-muted hover:text-foreground rounded hover:bg-[#F0F2F0]"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 bg-[#FAFBF9] rounded-lg border border-border/80 text-xs text-muted leading-relaxed">
          Are you sure you want to delete the verification record for{" "}
          <span className="font-semibold text-foreground font-mono">{report.fileName}</span>?
          This forensic assessment and associated signal evidence will be permanently removed.
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={onConfirm}
            icon={<Trash2 className="w-3.5 h-3.5" />}
          >
            Delete Report
          </Button>
        </div>
      </div>
    </div>
  );
}
