import { NextRequest, NextResponse } from "next/server";
import { TrustReport } from "@/lib/types";

// In-memory server report storage for runtime persistence
const reportStore = new Map<string, TrustReport>();

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const report = reportStore.get(id);
    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }
    return NextResponse.json(report);
  }

  const reports = Array.from(reportStore.values());
  return NextResponse.json({ reports, count: reports.length });
}

export async function POST(req: NextRequest) {
  try {
    const report: TrustReport = await req.json();
    if (!report || !report.id) {
      return NextResponse.json({ error: "Invalid report payload" }, { status: 400 });
    }

    reportStore.set(report.id, report);
    if (report.reportReferenceId) {
      reportStore.set(report.reportReferenceId, report);
    }

    return NextResponse.json({ success: true, id: report.id });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to store report", message: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
