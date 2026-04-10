import { getServerClient } from "@/db/supabase";

// --- Types ---

export interface NarrativeFeaturesRow {
  id: string;
  projectId: string;
  symbolicDensityScore: number | null;
  symbolicDensityReading: string | null;
  symbolicDensityEvidence: unknown;
  loreDepthScore: number | null;
  loreDepthReading: string | null;
  loreDepthEvidence: unknown;
  ritualRepeatabilityScore: number | null;
  ritualRepeatabilityReading: string | null;
  ritualRepeatabilityEvidence: unknown;
  communityCohesionScore: number | null;
  communityCohesionReading: string | null;
  communityCohesionEvidence: unknown;
  beliefElasticityScore: number | null;
  beliefElasticityReading: string | null;
  beliefElasticityEvidence: unknown;
  narrativeSurvivabilityScore: number | null;
  narrativeSurvivabilityReading: string | null;
  narrativeSurvivabilityEvidence: unknown;
  uncertaintyNotes: unknown;
  extractedAt: string;
  createdAt: string;
}

// --- Mapper ---

function mapNarrativeFeatures(row: Record<string, unknown>): NarrativeFeaturesRow {
  return {
    id: row.id as string,
    projectId: row.project_id as string,
    symbolicDensityScore: row.symbolic_density_score as number | null,
    symbolicDensityReading: row.symbolic_density_reading as string | null,
    symbolicDensityEvidence: row.symbolic_density_evidence,
    loreDepthScore: row.lore_depth_score as number | null,
    loreDepthReading: row.lore_depth_reading as string | null,
    loreDepthEvidence: row.lore_depth_evidence,
    ritualRepeatabilityScore: row.ritual_repeatability_score as number | null,
    ritualRepeatabilityReading: row.ritual_repeatability_reading as string | null,
    ritualRepeatabilityEvidence: row.ritual_repeatability_evidence,
    communityCohesionScore: row.community_cohesion_score as number | null,
    communityCohesionReading: row.community_cohesion_reading as string | null,
    communityCohesionEvidence: row.community_cohesion_evidence,
    beliefElasticityScore: row.belief_elasticity_score as number | null,
    beliefElasticityReading: row.belief_elasticity_reading as string | null,
    beliefElasticityEvidence: row.belief_elasticity_evidence,
    narrativeSurvivabilityScore: row.narrative_survivability_score as number | null,
    narrativeSurvivabilityReading: row.narrative_survivability_reading as string | null,
    narrativeSurvivabilityEvidence: row.narrative_survivability_evidence,
    uncertaintyNotes: row.uncertainty_notes,
    extractedAt: row.extracted_at as string,
    createdAt: row.created_at as string,
  };
}

// --- Dimension keys for DRY insertion ---

const DIMENSIONS = [
  "symbolicDensity",
  "loreDepth",
  "ritualRepeatability",
  "communityCohesion",
  "beliefElasticity",
  "narrativeSurvivability",
] as const;

/** Converts camelCase dimension name to snake_case DB column prefix. */
function toSnakePrefix(camel: string): string {
  return camel.replace(/([A-Z])/g, "_$1").toLowerCase();
}

// --- Query functions ---

/**
 * Fetches the most recent narrative features for a given project.
 * Returns null if no features have been extracted yet.
 */
export async function getLatestNarrativeFeatures(
  projectId: string
): Promise<NarrativeFeaturesRow | null> {
  const db = getServerClient();

  const { data, error } = await db
    .from("narrative_features")
    .select("*")
    .eq("project_id", projectId)
    .order("extracted_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(`getLatestNarrativeFeatures failed: ${error.message}`);
  }
  if (!data) {
    return null;
  }

  return mapNarrativeFeatures(data as Record<string, unknown>);
}

/**
 * Inserts a new narrative_features row for a project, mapping the 6 camelCase
 * dimension objects (score / reading / evidenceQuotes) plus uncertaintyNotes
 * into the corresponding snake_case DB columns.
 *
 * @param projectId - UUID of the project
 * @param features  - LLM extraction output with keys like symbolicDensity,
 *                    loreDepth, etc., each containing { score, reading, evidenceQuotes }
 */
export async function persistNarrativeFeatures(
  projectId: string,
  features: Record<string, unknown>
): Promise<NarrativeFeaturesRow> {
  const db = getServerClient();

  const payload: Record<string, unknown> = {
    project_id: projectId,
    uncertainty_notes: features.uncertaintyNotes ?? [],
  };

  for (const dim of DIMENSIONS) {
    const prefix = toSnakePrefix(dim);
    const dimData = features[dim] as
      | { score?: number; reading?: string; evidenceQuotes?: unknown }
      | undefined;

    payload[`${prefix}_score`] = dimData?.score ?? null;
    payload[`${prefix}_reading`] = dimData?.reading ?? null;
    payload[`${prefix}_evidence`] = dimData?.evidenceQuotes ?? null;
  }

  const { data, error } = await db
    .from("narrative_features")
    .insert(payload)
    .select("*")
    .single();

  if (error) {
    throw new Error(`persistNarrativeFeatures failed: ${error.message}`);
  }

  return mapNarrativeFeatures(data as Record<string, unknown>);
}
