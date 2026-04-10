import type { Project, MarketSnapshot, HolderStructure } from "@/types/domain";
import type { NarrativeFeatures } from "@/lib/validation/zod";

export interface ComposeReportInput {
  project: Project;
  market?: MarketSnapshot | null;
  holders?: HolderStructure | null;
  narrative?: NarrativeFeatures | null;
  input?: {
    coreNarrative?: string | null;
    communityBehavior?: string | null;
    strategicContext?: string | null;
  } | null;
}

export function composeReportPayload({
  project,
  market,
  holders,
  narrative,
  input,
}: ComposeReportInput) {
  return {
    caseId: `case_${project.id}`,
    analysisTimestamp: new Date().toISOString(),
    project,
    market,
    holders,
    narrative,
    manualInput: {
      coreNarrative: input?.coreNarrative ?? null,
      communityBehavior: input?.communityBehavior ?? null,
      strategicContext: input?.strategicContext ?? null,
    },
    dataProvenance: [
      project?.contract_address ? "four.meme" : null,
      market ? "DexScreener" : null,
      holders ? "BscScan" : null,
      input?.coreNarrative || input?.communityBehavior
        ? "manual_input"
        : null,
    ].filter(Boolean) as string[],
    missingDataFlags: [
      market ? null : "missing_market_data",
      holders ? null : "missing_holder_data",
      narrative ? null : "missing_narrative_data",
    ].filter(Boolean) as string[],
  };
}
