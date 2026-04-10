export interface DiagnosisPromptInput {
  project: {
    id: string;
    name: string;
    contract_address: string;
    chain?: string;
    description?: string;
  };
  market?: {
    price_usd: number | null;
    price_change_24h: number | null;
    volume_24h: number | null;
    liquidity_usd: number | null;
    market_cap: number | null;
    fdv: number | null;
    pair_address: string | null;
    dex_id: string | null;
    snapshot_at: string;
  } | null;
  holders?: {
    total_holders: number;
    top10_pct: number;
    top20_pct: number;
    top50_pct: number;
    suspicious: boolean;
    snapshot_at: string;
  } | null;
  narrative?: Record<string, unknown> | null;
  manualInput?: {
    coreNarrative?: string | null;
    communityBehavior?: string | null;
    strategicContext?: string | null;
  } | null;
  dataProvenance?: string[];
  missingDataFlags?: string[];
}

export interface PromptPair {
  systemPrompt: string;
  userPrompt: string;
}

export function buildDiagnosisPrompt(input: DiagnosisPromptInput): PromptPair {
  const systemPrompt = `You are a forensic analyst specializing in BSC meme-coin projects. You synthesize quantitative data (market snapshot, holder structure) and qualitative narrative features into a single diagnosis.

You will receive 6-dimension narrative scores (0-10 each) along with supporting evidence. Use them together with any market and holder data to produce a final diagnosis.

You MUST assign exactly one verdict from this list:
- "Dead on Arrival"
- "Viral but Fragile"
- "Short-Term Attention Trap"
- "Stable Cult Potential"
- "High Conviction Meme"
- "Chaos Without Cohesion"

Your output MUST be strict JSON with this exact structure:
{
  "verdict": "<one of the 6 verdicts>",
  "confidence": <number 0-1>,
  "primaryCause": "<one sentence root cause>",
  "summary": "<2-3 sentence executive summary>",
  "whyThisVerdict": [
    { "reason": "<reason>", "evidence": "<supporting evidence>" }
    // 3-5 items
  ],
  "scores": {
    "symbolicDensity": { "score": <0-10>, "reading": "<short reading>" },
    "loreDepth": { "score": <0-10>, "reading": "<short reading>" },
    "ritualRepeatability": { "score": <0-10>, "reading": "<short reading>" },
    "communityCohesion": { "score": <0-10>, "reading": "<short reading>" },
    "beliefElasticity": { "score": <0-10>, "reading": "<short reading>" },
    "narrativeSurvivability": { "score": <0-10>, "reading": "<short reading>" }
  },
  "structureRisks": [
    { "risk": "<risk description>", "evidence": "<supporting evidence>" }
    // 2-4 items
  ],
  "collapseTimeline": [
    { "stage": "<stage name>", "diagnosis": "<diagnostic sentence>", "evidence": "<supporting evidence>" }
    // 3-5 stages
  ],
  "interventionPath": [
    { "action": "<recommended action>", "why": "<rationale>" }
    // 2-4 items
  ],
  "warningFlags": ["<red flag string>", ...],
  "comparablePattern": "<reference to known meme or cultural pattern>"
}

Rules:
- NEVER invent on-chain facts or market data. Use only what is provided.
- If market data or holder data is missing, note it in warningFlags (e.g., "Market data unavailable — diagnosis relies solely on narrative signals").
- Be decisive. Do not hedge. Do not compliment unless the data warrants it.
- Output ONLY the JSON object. No markdown fences, no prose, no explanation.`;

  const userPrompt = buildDiagnosisUserPrompt(input);

  return { systemPrompt, userPrompt };
}

function buildDiagnosisUserPrompt(input: DiagnosisPromptInput): string {
  const sections: string[] = [];

  // Project info
  sections.push(`=== PROJECT ===
Name: ${input.project.name}
Contract: ${input.project.contract_address}${input.project.chain ? `\nChain: ${input.project.chain}` : ""}${input.project.description ? `\nDescription: ${input.project.description}` : ""}`);

  // Market snapshot
  if (input.market) {
    const m = input.market;
    sections.push(`=== MARKET SNAPSHOT (${m.snapshot_at}) ===
Price (USD): ${m.price_usd ?? "N/A"}
24h Change: ${m.price_change_24h != null ? `${m.price_change_24h}%` : "N/A"}
24h Volume: ${m.volume_24h ?? "N/A"}
Liquidity (USD): ${m.liquidity_usd ?? "N/A"}
Market Cap: ${m.market_cap ?? "N/A"}
FDV: ${m.fdv ?? "N/A"}
DEX: ${m.dex_id ?? "N/A"}
Pair: ${m.pair_address ?? "N/A"}`);
  } else {
    sections.push("=== MARKET SNAPSHOT ===\nNo market data available.");
  }

  // Holder structure
  if (input.holders) {
    const h = input.holders;
    sections.push(`=== HOLDER STRUCTURE (${h.snapshot_at}) ===
Total Holders: ${h.total_holders}
Top 10 Holders: ${h.top10_pct}%
Top 20 Holders: ${h.top20_pct}%
Top 50 Holders: ${h.top50_pct}%
Suspicious Activity: ${h.suspicious ? "YES" : "No"}`);
  } else {
    sections.push("=== HOLDER STRUCTURE ===\nNo holder data available.");
  }

  // Narrative features
  if (input.narrative) {
    sections.push(
      `=== NARRATIVE FEATURES ===\n${JSON.stringify(input.narrative, null, 2)}`
    );
  } else {
    sections.push("=== NARRATIVE FEATURES ===\nNo narrative extraction available.");
  }

  // Manual input
  if (input.manualInput) {
    const mi = input.manualInput;
    const parts: string[] = [];
    if (mi.coreNarrative) parts.push(`Core Narrative: ${mi.coreNarrative}`);
    if (mi.communityBehavior) parts.push(`Community Behavior: ${mi.communityBehavior}`);
    if (mi.strategicContext) parts.push(`Strategic Context: ${mi.strategicContext}`);
    if (parts.length > 0) {
      sections.push(`=== MANUAL INPUT ===\n${parts.join("\n")}`);
    }
  }

  // Data provenance
  if (input.dataProvenance && input.dataProvenance.length > 0) {
    sections.push(
      `=== DATA PROVENANCE ===\nSources used: ${input.dataProvenance.join(", ")}`
    );
  }

  // Missing data flags
  if (input.missingDataFlags && input.missingDataFlags.length > 0) {
    sections.push(
      `=== MISSING DATA FLAGS ===\n${input.missingDataFlags.join("\n")}`
    );
  }

  sections.push(
    "Synthesize a full diagnosis based on all available data above. Respond with ONLY the JSON object."
  );

  return sections.join("\n\n");
}
