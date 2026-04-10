/**
 * Domain types for Meme Autopsy source adapters and data pipeline.
 */

export interface Project {
  id: string;
  name: string;
  symbol?: string;
  contract_address: string;
  chain?: string;
  launchPlatform?: string;
  websiteUrl?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface MarketSnapshot {
  id?: string;
  project_id: string;
  price_usd: number | null;
  price_change_24h: number | null;
  volume_24h: number | null;
  liquidity_usd: number | null;
  market_cap: number | null;
  fdv: number | null;
  pair_address: string | null;
  dex_id: string | null;
  snapshot_at: string;
  source: string;
}

export interface HolderStructure {
  id?: string;
  project_id: string;
  total_holders: number;
  top10_pct: number;
  top20_pct: number;
  top50_pct: number;
  suspicious: boolean;
  snapshot_at: string;
  source: string;
}

export type NarrativeSourceType =
  | "four_meme"
  | "website"
  | "manual_narrative"
  | "manual_community";

export interface NarrativeSource {
  sourceType: NarrativeSourceType;
  text: string;
  url?: string;
  fetchedAt: string;
}

// --- Forensic Report (new unified schema) ---

export interface WhyThisVerdictItem {
  reason: string;
  evidence: string;
}

export interface ForensicDimensionScore {
  score: number;  // 0-10
  reading: string;
}

export interface ForensicScores {
  symbolicDensity: ForensicDimensionScore;
  loreDepth: ForensicDimensionScore;
  ritualRepeatability: ForensicDimensionScore;
  communityCohesion: ForensicDimensionScore;
  beliefElasticity: ForensicDimensionScore;
  narrativeSurvivability: ForensicDimensionScore;
}

export interface StructureRisk {
  risk: string;
  evidence: string;
}

export interface CollapseTimelineStage {
  stage: string;
  diagnosis: string;
  evidence: string;
}

export interface InterventionItem {
  action: string;
  why: string;
}

export interface ForensicReport {
  id: string;
  projectId: string;
  caseId: string; // CASE-2025-XXXX-XXXX
  verdict: string;
  confidence: number; // 0-1
  primaryCause: string;
  summary: string;
  whyThisVerdict: WhyThisVerdictItem[];
  scores: ForensicScores;
  structureRisks: StructureRisk[];
  collapseTimeline: CollapseTimelineStage[];
  interventionPath: InterventionItem[];
  warningFlags: string[];
  dataProvenance: string[];
  missingDataFlags: string[];
  comparablePattern: string;
  inputSnapshot: Record<string, unknown>;
  createdAt: string; // ISO string
}

export interface DemoCase {
  contractAddress: string;
  project: Project;
  report: ForensicReport;
}
