/**
 * DexScreener adapter — fetches and normalizes BSC market data.
 */

import { z } from "zod";
import { supabaseAdmin } from "@/db/supabase";
import type { MarketSnapshot, Project } from "@/types/domain";

const DEXSCREENER_BASE_URL =
  process.env.DEXSCREENER_BASE_URL || "https://api.dexscreener.com/latest";

// ---------------------------------------------------------------------------
// Zod schema for validated market snapshot inserts
// ---------------------------------------------------------------------------

const MarketSnapshotSchema = z.object({
  project_id: z.string().uuid(),
  price_usd: z.number().nullable(),
  price_change_24h: z.number().nullable(),
  volume_24h: z.number().nullable(),
  liquidity_usd: z.number().nullable(),
  market_cap: z.number().nullable(),
  fdv: z.number().nullable(),
  pair_address: z.string().nullable(),
  dex_id: z.string().nullable(),
  snapshot_at: z.string().datetime(),
  source: z.string(),
});

// ---------------------------------------------------------------------------
// Fetch raw pair data from DexScreener
// ---------------------------------------------------------------------------

export async function fetchDexScreenerPair(
  contractAddress: string,
): Promise<unknown | null> {
  try {
    const url = `${DEXSCREENER_BASE_URL}/dex/tokens/${contractAddress}`;
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(15_000),
    });

    if (!res.ok) {
      console.error(
        `[dexscreener] HTTP ${res.status} for ${contractAddress}`,
      );
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error("[dexscreener] fetch error:", err);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Normalize raw response into a MarketSnapshot-shaped object
// ---------------------------------------------------------------------------

export function normalizeDexScreenerData(
  raw: any,
  projectId: string,
): Omit<MarketSnapshot, "id"> | null {
  try {
    const pairs: any[] = raw?.pairs;
    if (!Array.isArray(pairs) || pairs.length === 0) return null;

    // Prefer a BSC pair; fall back to the first pair if none match
    const bscPair = pairs.find((p: any) => p.chainId === "bsc") ?? pairs[0];

    const priceUsd = bscPair.priceUsd ? parseFloat(bscPair.priceUsd) : null;
    const priceChange24h =
      bscPair.priceChange?.h24 != null
        ? Number(bscPair.priceChange.h24)
        : null;
    const volume24h =
      bscPair.volume?.h24 != null ? Number(bscPair.volume.h24) : null;
    const liquidityUsd =
      bscPair.liquidity?.usd != null ? Number(bscPair.liquidity.usd) : null;
    const marketCap =
      bscPair.marketCap != null ? Number(bscPair.marketCap) : null;
    const fdv = bscPair.fdv != null ? Number(bscPair.fdv) : null;
    const pairAddress: string | null = bscPair.pairAddress ?? null;
    const dexId: string | null = bscPair.dexId ?? null;

    return {
      project_id: projectId,
      price_usd: Number.isFinite(priceUsd) ? priceUsd : null,
      price_change_24h: Number.isFinite(priceChange24h)
        ? priceChange24h
        : null,
      volume_24h: Number.isFinite(volume24h) ? volume24h : null,
      liquidity_usd: Number.isFinite(liquidityUsd) ? liquidityUsd : null,
      market_cap: Number.isFinite(marketCap) ? marketCap : null,
      fdv: Number.isFinite(fdv) ? fdv : null,
      pair_address: pairAddress,
      dex_id: dexId,
      snapshot_at: new Date().toISOString(),
      source: "dexscreener",
    };
  } catch (err) {
    console.error("[dexscreener] normalization error:", err);
    return null;
  }
}

// ---------------------------------------------------------------------------
// End-to-end: load project, fetch, normalize, validate, persist
// ---------------------------------------------------------------------------

export async function refreshMarketForProject(
  projectId: string,
): Promise<MarketSnapshot | null> {
  try {
    // 1. Load project from Supabase
    const { data: project, error: projectErr } = await supabaseAdmin
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .single<Project>();

    if (projectErr || !project) {
      console.error(
        "[dexscreener] project lookup failed:",
        projectErr?.message,
      );
      return null;
    }

    if (!project.contract_address) {
      console.error("[dexscreener] project has no contract_address");
      return null;
    }

    // 2. Fetch raw data
    const raw = await fetchDexScreenerPair(project.contract_address);
    if (!raw) return null;

    // 3. Normalize
    const normalized = normalizeDexScreenerData(raw, projectId);
    if (!normalized) return null;

    // 4. Validate with Zod
    const parsed = MarketSnapshotSchema.safeParse(normalized);
    if (!parsed.success) {
      console.error(
        "[dexscreener] validation failed:",
        parsed.error.format(),
      );
      return null;
    }

    // 5. Insert into market_snapshots
    const { data: inserted, error: insertErr } = await supabaseAdmin
      .from("market_snapshots")
      .insert(parsed.data)
      .select()
      .single<MarketSnapshot>();

    if (insertErr) {
      console.error("[dexscreener] insert error:", insertErr.message);
      return null;
    }

    return inserted;
  } catch (err) {
    console.error("[dexscreener] refreshMarketForProject error:", err);
    return null;
  }
}
