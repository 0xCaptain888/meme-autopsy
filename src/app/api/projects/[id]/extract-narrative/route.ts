import { NextRequest, NextResponse } from "next/server";
import { getProjectById, persistNarrativeFeatures } from "@/db/queries";
import { collectNarrativeSources } from "@/lib/sources/fourmeme";
import { runNarrativeExtraction } from "@/lib/llm/narrative-extractor";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Fetch project
    const project = await getProjectById(id);

    // Parse optional body for manual input fields
    let input: Record<string, unknown> = {};
    try {
      input = await request.json();
    } catch {
      // No body or invalid JSON is acceptable — proceed with empty input
    }

    // Collect narrative sources
    const narrativeSources = await collectNarrativeSources(project, input);

    // Run LLM narrative extraction
    const narrativeFeatures = await runNarrativeExtraction({
      project,
      narrativeSources,
    });

    // Persist to database
    const sourcesUsed = narrativeSources.map((s) => s.sourceType);
    await persistNarrativeFeatures(project.id, narrativeFeatures, sourcesUsed);

    return NextResponse.json({
      ok: true,
      narrativeFeatures,
      sourcesUsed,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[extract-narrative] error:", message);
    return NextResponse.json(
      { ok: false, error: "EXTRACT_NARRATIVE_FAILED", details: message },
      { status: 500 }
    );
  }
}
