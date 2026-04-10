import { NextRequest, NextResponse } from "next/server";
import { getProjectBundle, persistForensicReport } from "@/db/queries";
import { composeReportPayload } from "@/lib/report/compose-report";
import { runDiagnosis } from "@/lib/llm/diagnosis";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Load all available data for this project
    const bundle = await getProjectBundle(id);

    // Compose the payload for diagnosis
    const reportPayload = composeReportPayload({
      project: bundle.project,
      market: bundle.market,
      holders: bundle.holders,
      narrative: bundle.narrative,
    });

    // Run LLM diagnosis
    const report = await runDiagnosis(reportPayload);

    // Determine partial flag
    const partial = !bundle.market || !bundle.holders;

    // Persist the forensic report
    await persistForensicReport(id, report, partial);

    return NextResponse.json({
      ok: true,
      report,
      partial,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[run-autopsy] error:", message);
    return NextResponse.json(
      { ok: false, error: "RUN_AUTOPSY_FAILED", details: message },
      { status: 500 }
    );
  }
}
