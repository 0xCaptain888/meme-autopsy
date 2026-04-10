import { NextRequest, NextResponse } from "next/server";
import { runAutopsyInputSchema } from "@/lib/validation/zod";
import { upsertProject, persistNarrativeFeatures, persistForensicReport } from "@/db/queries";
import { refreshMarketForProject } from "@/lib/sources/dexscreener";
import { refreshHoldersForProject } from "@/lib/sources/bscscan";
import { collectNarrativeSources } from "@/lib/sources/fourmeme";
import { runNarrativeExtraction } from "@/lib/llm/narrative-extractor";
import { runDiagnosis } from "@/lib/llm/diagnosis";
import { composeReportPayload } from "@/lib/report/compose-report";
import { demoProject, demoReport } from "@/data/demo-report";
import type { MarketSnapshot, HolderStructure } from "@/types/domain";
import type { NarrativeFeatures } from "@/lib/validation/zod";

export async function POST(request: NextRequest) {
  try {
    // --- Parse & validate input ---
    const body = await request.json();
    const parsed = runAutopsyInputSchema.safeParse(body);

    if (!parsed.success) {
      const issues = parsed.error.issues
        .map((i) => `${i.path.join(".")}: ${i.message}`)
        .join("; ");
      return NextResponse.json(
        { ok: false, error: "VALIDATION_FAILED", details: issues },
        { status: 400 }
      );
    }

    const input = parsed.data;

    // --- Demo mode short-circuit ---
    if (process.env.DEMO_MODE === "true") {
      return NextResponse.json({
        ok: true,
        project: demoProject,
        report: demoReport,
        partial: false,
      });
    }

    // --- Upsert project ---
    const project = await upsertProject({
      name: input.name,
      symbol: input.symbol,
      contractAddress: input.contractAddress,
      launchPlatform: input.launchPlatform,
      websiteUrl: input.websiteUrl,
      twitterUrl: input.twitterUrl,
      telegramUrl: input.telegramUrl,
    });

    // --- Refresh market data (non-blocking failure) ---
    let market: MarketSnapshot | null = null;
    try {
      market = await refreshMarketForProject(project.id);
    } catch (err) {
      console.error("[autopsy/run] market refresh error:", err);
    }

    // --- Refresh holder data (non-blocking failure) ---
    let holders: HolderStructure | null = null;
    try {
      holders = await refreshHoldersForProject(project.id);
    } catch (err) {
      console.error("[autopsy/run] holder refresh error:", err);
    }

    // --- Collect narrative sources (non-blocking failure) ---
    let narrativeSources: Awaited<ReturnType<typeof collectNarrativeSources>> = [];
    try {
      narrativeSources = await collectNarrativeSources(project, input as Record<string, unknown>);
    } catch (err) {
      console.error("[autopsy/run] narrative sources error:", err);
    }

    // --- Run narrative extraction ---
    const narrativeFeatures: NarrativeFeatures = await runNarrativeExtraction({
      project,
      narrativeSources,
    });

    // --- Persist narrative features ---
    const sourcesUsed = narrativeSources.map((s) => s.sourceType);
    await persistNarrativeFeatures(project.id, narrativeFeatures, sourcesUsed);

    // --- Compose report payload ---
    const reportPayload = composeReportPayload({
      project,
      market,
      holders,
      narrative: narrativeFeatures,
      input: {
        coreNarrative: input.coreNarrative ?? null,
        communityBehavior: input.communityBehavior ?? null,
        strategicContext: input.strategicContext ?? null,
      },
    });

    // --- Run diagnosis ---
    const report = await runDiagnosis(reportPayload);

    // --- Persist forensic report ---
    const partial = !market || !holders;
    await persistForensicReport(project.id, report, partial);

    return NextResponse.json({
      ok: true,
      project,
      report,
      partial,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[autopsy/run] fatal error:", message);
    return NextResponse.json(
      { ok: false, error: "AUTOPSY_RUN_FAILED", details: message },
      { status: 500 }
    );
  }
}
