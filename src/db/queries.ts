/**
 * Database query helpers for the Meme Autopsy pipeline.
 */

import { supabaseAdmin } from "@/db/supabase";
import type {
  Project,
  MarketSnapshot,
  HolderStructure,
} from "@/types/domain";
import type { NarrativeFeatures } from "@/lib/validation/zod";
import type { DiagnosisOutput } from "@/lib/validation/zod";

// ---------------------------------------------------------------------------
// Project queries
// ---------------------------------------------------------------------------

export interface UpsertProjectInput {
  name?: string;
  symbol?: string;
  contractAddress: string;
  launchPlatform: "four_meme" | "pump_fun" | "other";
  websiteUrl?: string;
  twitterUrl?: string;
  telegramUrl?: string;
}

export async function upsertProject(
  input: UpsertProjectInput
): Promise<Project> {
  const row = {
    name: input.name ?? input.symbol ?? input.contractAddress,
    contract_address: input.contractAddress,
    chain: "bsc",
    websiteUrl: input.websiteUrl ?? null,
    description: null,
  };

  const { data, error } = await supabaseAdmin
    .from("projects")
    .upsert(row, { onConflict: "contract_address" })
    .select()
    .single<Project>();

  if (error || !data) {
    throw new Error(`upsertProject failed: ${error?.message ?? "no data"}`);
  }

  return data;
}

export async function getProjectById(id: string): Promise<Project> {
  const { data, error } = await supabaseAdmin
    .from("projects")
    .select("*")
    .eq("id", id)
    .single<Project>();

  if (error || !data) {
    throw new Error(`getProjectById failed: ${error?.message ?? "not found"}`);
  }

  return data;
}

// ---------------------------------------------------------------------------
// Narrative features persistence
// ---------------------------------------------------------------------------

export async function persistNarrativeFeatures(
  projectId: string,
  features: NarrativeFeatures,
  sourcesUsed: string[]
): Promise<void> {
  const row = {
    project_id: projectId,
    features: features as unknown as Record<string, unknown>,
    sources_used: sourcesUsed,
    created_at: new Date().toISOString(),
  };

  const { error } = await supabaseAdmin
    .from("narrative_features")
    .insert(row);

  if (error) {
    console.error("[db] persistNarrativeFeatures error:", error.message);
    throw new Error(`persistNarrativeFeatures failed: ${error.message}`);
  }
}

// ---------------------------------------------------------------------------
// Forensic report persistence
// ---------------------------------------------------------------------------

export async function persistForensicReport(
  projectId: string,
  report: DiagnosisOutput,
  partial: boolean
): Promise<void> {
  const row = {
    project_id: projectId,
    report: report as unknown as Record<string, unknown>,
    partial,
    created_at: new Date().toISOString(),
  };

  const { error } = await supabaseAdmin
    .from("forensic_reports")
    .insert(row);

  if (error) {
    console.error("[db] persistForensicReport error:", error.message);
    throw new Error(`persistForensicReport failed: ${error.message}`);
  }
}

// ---------------------------------------------------------------------------
// Bundle: fetch latest data for a project (for diagnosis)
// ---------------------------------------------------------------------------

export interface ProjectBundle {
  project: Project;
  market: MarketSnapshot | null;
  holders: HolderStructure | null;
  narrative: NarrativeFeatures | null;
}

export async function getProjectBundle(
  projectId: string
): Promise<ProjectBundle> {
  const project = await getProjectById(projectId);

  // Latest market snapshot
  const { data: market } = await supabaseAdmin
    .from("market_snapshots")
    .select("*")
    .eq("project_id", projectId)
    .order("snapshot_at", { ascending: false })
    .limit(1)
    .single<MarketSnapshot>();

  // Latest holder structure
  const { data: holders } = await supabaseAdmin
    .from("holder_structure")
    .select("*")
    .eq("project_id", projectId)
    .order("snapshot_at", { ascending: false })
    .limit(1)
    .single<HolderStructure>();

  // Latest narrative features
  const { data: narrativeRow } = await supabaseAdmin
    .from("narrative_features")
    .select("features")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single<{ features: NarrativeFeatures }>();

  return {
    project,
    market: market ?? null,
    holders: holders ?? null,
    narrative: narrativeRow?.features ?? null,
  };
}
