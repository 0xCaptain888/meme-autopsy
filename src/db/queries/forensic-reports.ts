import { getServerClient } from "@/db/supabase";

// --- Types ---

export interface ForensicReportRow {
  id: string;
  projectId: string;
  caseId: string;
  verdict: string;
  confidence: number;
  primaryCause: string | null;
  summary: string | null;
  whyThisVerdict: unknown;
  scores: unknown;
  structureRisks: unknown;
  collapseTimeline: unknown;
  interventionPath: unknown;
  warningFlags: unknown;
  dataProvenance: unknown;
  missingDataFlags: unknown;
  comparablePattern: string | null;
  inputSnapshot: unknown;
  createdAt: string;
}

// --- Mapper ---

function mapReport(row: Record<string, unknown>): ForensicReportRow {
  return {
    id: row.id as string,
    projectId: row.project_id as string,
    caseId: row.case_id as string,
    verdict: row.verdict as string,
    confidence: row.confidence as number,
    primaryCause: row.primary_cause as string | null,
    summary: row.summary as string | null,
    whyThisVerdict: row.why_this_verdict,
    scores: row.scores,
    structureRisks: row.structure_risks,
    collapseTimeline: row.collapse_timeline,
    interventionPath: row.intervention_path,
    warningFlags: row.warning_flags,
    dataProvenance: row.data_provenance,
    missingDataFlags: row.missing_data_flags,
    comparablePattern: row.comparable_pattern as string | null,
    inputSnapshot: row.input_snapshot,
    createdAt: row.created_at as string,
  };
}

// --- Helpers ---

/**
 * Generates a case ID in the format CASE-YYYY-MMDD-XXXX
 * where XXXX is random hexadecimal.
 */
function generateCaseId(): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const hex = Math.random().toString(16).slice(2, 6).toUpperCase();
  return `CASE-${yyyy}-${mm}${dd}-${hex}`;
}

// --- Query functions ---

/**
 * Persists narrative features for a project. Delegates to the
 * narrative-features module but provided here as a convenience.
 */
export async function persistNarrativeFeatures(
  projectId: string,
  features: Record<string, unknown>
): Promise<void> {
  const db = getServerClient();

  const payload: Record<string, unknown> = {
    project_id: projectId,
    symbolic_density_score: features.symbolicDensity
      ? (features.symbolicDensity as Record<string, unknown>).score
      : null,
    symbolic_density_reading: features.symbolicDensity
      ? (features.symbolicDensity as Record<string, unknown>).reading
      : null,
    symbolic_density_evidence: features.symbolicDensity
      ? (features.symbolicDensity as Record<string, unknown>).evidenceQuotes
      : null,
    lore_depth_score: features.loreDepth
      ? (features.loreDepth as Record<string, unknown>).score
      : null,
    lore_depth_reading: features.loreDepth
      ? (features.loreDepth as Record<string, unknown>).reading
      : null,
    lore_depth_evidence: features.loreDepth
      ? (features.loreDepth as Record<string, unknown>).evidenceQuotes
      : null,
    ritual_repeatability_score: features.ritualRepeatability
      ? (features.ritualRepeatability as Record<string, unknown>).score
      : null,
    ritual_repeatability_reading: features.ritualRepeatability
      ? (features.ritualRepeatability as Record<string, unknown>).reading
      : null,
    ritual_repeatability_evidence: features.ritualRepeatability
      ? (features.ritualRepeatability as Record<string, unknown>).evidenceQuotes
      : null,
    community_cohesion_score: features.communityCohesion
      ? (features.communityCohesion as Record<string, unknown>).score
      : null,
    community_cohesion_reading: features.communityCohesion
      ? (features.communityCohesion as Record<string, unknown>).reading
      : null,
    community_cohesion_evidence: features.communityCohesion
      ? (features.communityCohesion as Record<string, unknown>).evidenceQuotes
      : null,
    belief_elasticity_score: features.beliefElasticity
      ? (features.beliefElasticity as Record<string, unknown>).score
      : null,
    belief_elasticity_reading: features.beliefElasticity
      ? (features.beliefElasticity as Record<string, unknown>).reading
      : null,
    belief_elasticity_evidence: features.beliefElasticity
      ? (features.beliefElasticity as Record<string, unknown>).evidenceQuotes
      : null,
    narrative_survivability_score: features.narrativeSurvivability
      ? (features.narrativeSurvivability as Record<string, unknown>).score
      : null,
    narrative_survivability_reading: features.narrativeSurvivability
      ? (features.narrativeSurvivability as Record<string, unknown>).reading
      : null,
    narrative_survivability_evidence: features.narrativeSurvivability
      ? (features.narrativeSurvivability as Record<string, unknown>).evidenceQuotes
      : null,
    uncertainty_notes: features.uncertaintyNotes ?? [],
  };

  const { error } = await db.from("narrative_features").insert(payload);

  if (error) {
    throw new Error(`persistNarrativeFeatures failed: ${error.message}`);
  }
}

/**
 * Persists a forensic report for a project. Generates a unique case_id,
 * inserts into forensic_reports, and returns the inserted row.
 */
export async function persistForensicReport(
  projectId: string,
  diagnosis: Record<string, unknown>
): Promise<ForensicReportRow> {
  const db = getServerClient();
  const caseId = generateCaseId();

  const payload: Record<string, unknown> = {
    project_id: projectId,
    case_id: caseId,
    verdict: diagnosis.verdict,
    confidence: diagnosis.confidence,
    primary_cause: diagnosis.primaryCause ?? null,
    summary: diagnosis.summary ?? null,
    why_this_verdict: diagnosis.whyThisVerdict ?? null,
    scores: diagnosis.scores ?? null,
    structure_risks: diagnosis.structureRisks ?? null,
    collapse_timeline: diagnosis.collapseTimeline ?? null,
    intervention_path: diagnosis.interventionPath ?? null,
    warning_flags: diagnosis.warningFlags ?? null,
    data_provenance: diagnosis.dataProvenance ?? null,
    missing_data_flags: diagnosis.missingDataFlags ?? null,
    comparable_pattern: diagnosis.comparablePattern ?? null,
    input_snapshot: diagnosis.inputSnapshot ?? null,
  };

  const { data, error } = await db
    .from("forensic_reports")
    .insert(payload)
    .select("*")
    .single();

  if (error) {
    throw new Error(`persistForensicReport failed: ${error.message}`);
  }

  return mapReport(data as Record<string, unknown>);
}

/**
 * Fetches the most recent forensic report for a given project.
 * Returns null if no report exists.
 */
export async function getLatestReportForProject(
  projectId: string
): Promise<ForensicReportRow | null> {
  const db = getServerClient();

  const { data, error } = await db
    .from("forensic_reports")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(`getLatestReportForProject failed: ${error.message}`);
  }
  if (!data) {
    return null;
  }

  return mapReport(data as Record<string, unknown>);
}

/**
 * Fetches a forensic report by its unique case_id.
 * Returns null if not found.
 */
export async function getReportByCaseId(
  caseId: string
): Promise<ForensicReportRow | null> {
  const db = getServerClient();

  const { data, error } = await db
    .from("forensic_reports")
    .select("*")
    .eq("case_id", caseId)
    .maybeSingle();

  if (error) {
    throw new Error(`getReportByCaseId failed: ${error.message}`);
  }
  if (!data) {
    return null;
  }

  return mapReport(data as Record<string, unknown>);
}
