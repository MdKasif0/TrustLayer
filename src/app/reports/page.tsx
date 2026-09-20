import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { FileText, ScanSearch } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reports — TrustLayer",
  description: "View your media verification reports and analysis history.",
};

export default function ReportsPage() {
  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="mb-2">Reports</h1>
            <p className="text-muted text-sm max-w-lg">
              View and manage your media verification reports. Each report
              contains the full evidence breakdown from all analysis signals.
            </p>
          </div>
          <Link href="/verify" className="hidden sm:block shrink-0">
            <Button size="sm" icon={<ScanSearch className="w-3.5 h-3.5" />}>
              New Verification
            </Button>
          </Link>
        </div>

        <Card padding="none">
          <EmptyState
            icon={<FileText className="w-5 h-5" />}
            title="No reports yet"
            description="Verification reports will appear here after you analyze your first file. Each report includes a full multi-signal evidence breakdown."
            action={
              <Link href="/verify">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={<ScanSearch className="w-3.5 h-3.5" />}
                >
                  Verify your first file
                </Button>
              </Link>
            }
          />
        </Card>
      </div>
    </div>
  );
}
