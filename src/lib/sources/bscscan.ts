/**
 * BscScan adapter — fetches token holder lists and derives concentration metrics.
 */

import { z } from "zod";
import { supabaseAdmin } from "@/db/supabase";
import type { HolderStructure, Project } from "@/types/domain";

const BSCSCAN_API_URL = "https://api.bscscan.com/api";
const BSCSCAN_API_KEY = process.env.BSCSCAN_API_KEY ?? "";

// ---------------------------------------------------------------------------
// Zod schema for validated holder structure inserts
// ---------------------------------------------------------------------------

const HolderStructureSchema = z.object({
  project_id: z.string().uuid(),
  total_holders: z.number().int().nonnegative(),
  top10_pct: z.number().min(0).max(100),
  top20_pct: z.number().min(0).max(100),
  top50_pct: z.number().min(0).max(100),
  suspicious: z.boolean(),
  snapshot_at: z.string().datetime(),
  source: z.string(),
});

// ---------------------------------------------------------------------------
// Fetch top holders from BscScan
// ---------------------------------------------------------------------------

export async function fetchTopHolders(
  contractAddress: string,
): Promise<any[] | null> {
  try {
    if (!BSCSCAN_API_KEY) {
      console.error("[bscscan] BSCSCAN_API_KEY is not set");
      return null;
    }

    const params = new URLSearchParams({
      module: "token",
      action: "tokenholderlist",
      contractaddress: contractAddress,
      page: "1",
      offset: "50",
      apikey: BSCSCAN_API_KEY,
    });

    const url = `${BSCSCAN_API_URL}?${params.toString()}`;
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(15_000),
    });

    if (!res.ok) {
      console.error(`[bscscan] HTTP ${res.status} for ${contractAddress}`);
      return null;
    }

    const json = await res.json();

    if (json.status !== "1" || !Array.isArray(json.result)) {
      console.error("[bscscan] unexpected response:", json.message ?? json);
      return null;
    }

    return json.result;
  } catch (err) {
    console.error("[bscscan] fetch error:", err);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Derive concentration metrics from a holder list
// ---------------------------------------------------------------------------

export function deriveHolderMetrics(
  holders: any[],
  totalSupply?: number,
): Omit<HolderStructure, "id" | "project_id" | "snapshot_at" | "source"> | null {
  try {
    if (!holders || holders.length === 0) return null;

    // Sort descending by token balance
    const sorted = [...holders].sort((a, b) => {
      const balA = parseFloat(a.TokenHolderQuantity ?? a.value ?? "0");
      const balB = parseFloat(b.TokenHolderQuantity ?? b.value ?? "0");
      return balB - balA;
    });

    const balances = sorted.map((h) =>
      parseFloat(h.TokenHolderQuantity ?? h.value ?? "0"),
    );

    // Compute total from supply param or sum of fetched balances
    const total = totalSupply && totalSupply > 0
      ? totalSupply
      : balances.reduce((sum, b) => sum + b, 0);

    if (total <= 0) return null;

    const sumSlice = (end: number) =>
      balances.slice(0, Math.min(end, balances.length)).reduce((s, b) => s + b, 0);

    const top10Pct = (sumSlice(10) / total) * 100;
    const top20Pct = (sumSlice(20) / total) * 100;
    const top50Pct = (sumSlice(50) / total) * 100;
    const suspicious = top10Pct > 80;

    return {
      total_holders: sorted.length,
      top10_pct: Math.round(top10Pct * 100) / 100,
      top20_pct: Math.round(top20Pct * 100) / 100,
      top50_pct: Math.round(top50Pct * 100) / 100,
      suspicious,
    };
  } catch (err) {
    console.error("[bscscan] deriveHolderMetrics error:", err);
    return null;
  }
}

// ---------------------------------------------------------------------------
// End-to-end: load project, fetch holders, derive metrics, validate, persist
// ---------------------------------------------------------------------------

export async function refreshHoldersForProject(
  projectId: string,
): Promise<HolderStructure | null> {
  try {
    // 1. Load project from Supabase
    const { data: project, error: projectErr } = await supabaseAdmin
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .single<Project>();

    if (projectErr || !project) {
      console.error("[bscscan] project lookup failed:", projectErr?.message);
      return null;
    }

    if (!project.contract_address) {
      console.error("[bscscan] project has no contract_address");
      return null;
    }

    // 2. Fetch holders
    const holders = await fetchTopHolders(project.contract_address);
    if (!holders) return null;

    // 3. Derive metrics
    const metrics = deriveHolderMetrics(holders);
    if (!metrics) return null;

    // 4. Assemble row
    const row = {
      project_id: projectId,
      ...metrics,
      snapshot_at: new Date().toISOString(),
      source: "bscscan",
    };

    // 5. Validate with Zod
    const parsed = HolderStructureSchema.safeParse(row);
    if (!parsed.success) {
      console.error("[bscscan] validation failed:", parsed.error.format());
      return null;
    }

    // 6. Insert into holder_structure
    const { data: inserted, error: insertErr } = await supabaseAdmin
      .from("holder_structure")
      .insert(parsed.data)
      .select()
      .single<HolderStructure>();

    if (insertErr) {
      console.error("[bscscan] insert error:", insertErr.message);
      return null;
    }

    return inserted;
  } catch (err) {
    console.error("[bscscan] refreshHoldersForProject error:", err);
    return null;
  }
}
