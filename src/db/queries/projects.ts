import { getServerClient } from "@/db/supabase";

// --- Input types ---

export interface UpsertProjectInput {
  name?: string;
  symbol?: string;
  contractAddress: string;
  launchPlatform?: string;
  websiteUrl?: string;
  twitterUrl?: string;
  telegramUrl?: string;
}

export interface RunAutopsyInput {
  contractAddress: string;
  name?: string;
  symbol?: string;
  launchPlatform?: string;
  websiteUrl?: string;
  twitterUrl?: string;
  telegramUrl?: string;
  sourceUrl?: string;
}

// --- camelCase result types ---

export interface ProjectRow {
  id: string;
  name: string | null;
  symbol: string | null;
  contractAddress: string;
  launchPlatform: string;
  status: string;
  websiteUrl: string | null;
  twitterUrl: string | null;
  telegramUrl: string | null;
  sourceUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectBundle {
  project: ProjectRow;
  market: MarketRow | null;
  holders: HolderRow | null;
  narrative: NarrativeRow | null;
  missingDataFlags: string[];
}

export interface MarketRow {
  id: string;
  projectId: string;
  priceUsd: number | null;
  priceChange24h: number | null;
  volume24h: number | null;
  liquidity: number | null;
  marketCap: number | null;
  fdv: number | null;
  pairAddress: string | null;
  dexId: string | null;
  snapshotTime: string;
  source: string;
}

export interface HolderRow {
  id: string;
  projectId: string;
  totalHolders: number | null;
  top10Pct: number | null;
  top20Pct: number | null;
  top50Pct: number | null;
  uniqueHolders24h: number | null;
  suspiciousConcentrationFlag: boolean;
  snapshotTime: string;
  source: string | null;
}

export interface NarrativeRow {
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

// --- Mappers ---

// --- Mappers ---

function mapProject(row: Record<string, unknown>): ProjectRow {
  return {
    id: row.id as string,
    name: row.name as string | null,
    symbol: row.symbol as string | null,
    contractAddress: row.contract_address as string,
    launchPlatform: row.launch_platform as string,
    status: row.status as string,
    websiteUrl: row.website_url as string | null,
    twitterUrl: row.twitter_url as string | null,
    telegramUrl: row.telegram_url as string | null,
    sourceUrl: row.source_url as string | null,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

function mapMarket(row: Record<string, unknown>): MarketRow {
  return {
    id: row.id as string,
    projectId: row.project_id as string,
    priceUsd: row.price_usd as number | null,
    priceChange24h: row.price_change_24h as number | null,
    volume24h: row.volume_24h as number | null,
    liquidity: row.liquidity as number | null,
    marketCap: row.market_cap as number | null,
    fdv: row.fdv as number | null,
    pairAddress: row.pair_address as string | null,
    dexId: row.dex_id as string | null,
    snapshotTime: row.snapshot_time as string,
    source: row.source as string,
  };
}

function mapHolder(row: Record<string, unknown>): HolderRow {
  return {
    id: row.id as string,
    projectId: row.project_id as string,
    totalHolders: row.total_holders as number | null,
    top10Pct: row.top_10_pct as number | null,
    top20Pct: row.top_20_pct as number | null,
    top50Pct: row.top_50_pct as number | null,
    uniqueHolders24h: row.unique_holders_24h as number | null,
    suspiciousConcentrationFlag: row.suspicious_concentration_flag as boolean,
    snapshotTime: row.snapshot_time as string,
    source: row.source as string | null,
  };
}

function mapNarrative(row: Record<string, unknown>): NarrativeRow {
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

// --- CRUD Operations ---

/**
 * Upserts a project by contract_address. Returns the upserted project.
 */
export async function upsertProject(input: UpsertProjectInput): Promise<ProjectRow> {
  const db = getServerClient();

  const payload: Record<string, unknown> = {
    contract_address: input.contractAddress,
  };
  if (input.name !== undefined) payload.name = input.name;
  if (input.symbol !== undefined) payload.symbol = input.symbol;
  if (input.launchPlatform !== undefined) payload.launch_platform = input.launchPlatform;
  if (input.websiteUrl !== undefined) payload.website_url = input.websiteUrl;
  if (input.twitterUrl !== undefined) payload.twitter_url = input.twitterUrl;
  if (input.telegramUrl !== undefined) payload.telegram_url = input.telegramUrl;

  const { data, error } = await db
    .from("projects")
    .upsert(payload, { onConflict: "contract_address" })
    .select("*")
    .single();

  if (error) {
    throw new Error(`upsertProject failed: ${error.message}`);
  }

  return mapProject(data as Record<string, unknown>);
}

/**
 * Convenience wrapper that maps RunAutopsyInput fields to upsertProject params.
 */
export async function upsertProjectFromInput(input: RunAutopsyInput): Promise<ProjectRow> {
  return upsertProject({
    contractAddress: input.contractAddress,
    name: input.name,
    symbol: input.symbol,
    launchPlatform: input.launchPlatform,
    websiteUrl: input.websiteUrl,
    twitterUrl: input.twitterUrl,
    telegramUrl: input.telegramUrl,
  });
}

/**
 * Fetches a project by its UUID. Throws if not found.
 */
export async function getProjectById(id: string): Promise<ProjectRow> {
  const db = getServerClient();

  const { data, error } = await db
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`getProjectById failed: ${error.message}`);
  }
  if (!data) {
    throw new Error(`Project not found: ${id}`);
  }

  return mapProject(data as Record<string, unknown>);
}

/**
 * Fetches a project by contract_address. Returns null if not found.
 */
export async function getProjectByContractAddress(
  address: string
): Promise<ProjectRow | null> {
  const db = getServerClient();

  const { data, error } = await db
    .from("projects")
    .select("*")
    .eq("contract_address", address)
    .maybeSingle();

  if (error) {
    throw new Error(`getProjectByContractAddress failed: ${error.message}`);
  }
  if (!data) {
    return null;
  }

  return mapProject(data as Record<string, unknown>);
}

/**
 * Fetches a project plus its latest market_snapshot, holder_structure,
 * and narrative_features. Returns a bundle with missing-data flags.
 */
export async function getProjectBundleForDiagnosis(
  projectId: string
): Promise<ProjectBundle> {
  const db = getServerClient();

  // Fetch project
  const { data: projectData, error: projectError } = await db
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .single();

  if (projectError) {
    throw new Error(`getProjectBundleForDiagnosis: project fetch failed: ${projectError.message}`);
  }
  if (!projectData) {
    throw new Error(`getProjectBundleForDiagnosis: project not found: ${projectId}`);
  }

  // Fetch latest market snapshot, holder structure, and narrative features in parallel
  const [marketResult, holderResult, narrativeResult] = await Promise.all([
    db
      .from("market_snapshots")
      .select("*")
      .eq("project_id", projectId)
      .order("snapshot_time", { ascending: false })
      .limit(1)
      .maybeSingle(),
    db
      .from("holder_structure")
      .select("*")
      .eq("project_id", projectId)
      .order("snapshot_time", { ascending: false })
      .limit(1)
      .maybeSingle(),
    db
      .from("narrative_features")
      .select("*")
      .eq("project_id", projectId)
      .order("extracted_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);

  if (marketResult.error) {
    throw new Error(`getProjectBundleForDiagnosis: market fetch failed: ${marketResult.error.message}`);
  }
  if (holderResult.error) {
    throw new Error(`getProjectBundleForDiagnosis: holder fetch failed: ${holderResult.error.message}`);
  }
  if (narrativeResult.error) {
    throw new Error(`getProjectBundleForDiagnosis: narrative fetch failed: ${narrativeResult.error.message}`);
  }

  const market = marketResult.data
    ? mapMarket(marketResult.data as Record<string, unknown>)
    : null;
  const holders = holderResult.data
    ? mapHolder(holderResult.data as Record<string, unknown>)
    : null;
  const narrative = narrativeResult.data
    ? mapNarrative(narrativeResult.data as Record<string, unknown>)
    : null;

  // Build missing-data flags
  const missingDataFlags: string[] = [];
  if (!market) missingDataFlags.push("No market snapshot available");
  if (!holders) missingDataFlags.push("No holder structure data available");
  if (!narrative) missingDataFlags.push("No narrative features extracted yet");

  return {
    project: mapProject(projectData as Record<string, unknown>),
    market,
    holders,
    narrative,
    missingDataFlags,
  };
}
