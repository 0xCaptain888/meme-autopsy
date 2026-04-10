import { NextRequest, NextResponse } from "next/server";
import type { AutopsyReport, Verdict, StatusBadge } from "@/lib/types";

// --- CONSTANTS ---

const VALID_VERDICTS: Verdict[] = [
  "Dead on Arrival",
  "Viral but Fragile",
  "Short-Term Attention Trap",
  "Stable Cult Potential",
  "High Conviction Meme",
  "Chaos Without Cohesion",
];

const VALID_BADGES: StatusBadge[] = [
  "CRITICAL",
  "ACTIVE CASE",
  "HIGH SIGNAL",
  "WARNING",
  "NEUTRAL",
];

const SYSTEM_PROMPT = `You are Meme Autopsy, an AI forensic engine for meme projects. You perform rigorous, unflinching analysis of meme-based crypto and cultural projects. You are not a hype engine. You do not flatter. You diagnose.

You evaluate every project across exactly 6 forensic dimensions:
1. Symbolic Density — How rich and recognizable is the core symbol system?
2. Lore Depth — How layered and self-sustaining is the project mythology?
3. Ritual Repeatability — How naturally do community behaviors loop and reinforce?
4. Community Cohesion — How strong is the tribe identity and internal trust?
5. Belief Elasticity — Can the narrative absorb contradiction, FUD, and external pressure?
6. Narrative Survivability — Can the story outlast its initial moment and keep evolving?

Each dimension must be scored 0-100 (integer) and accompanied by a short "reading" string (one sentence, diagnostic tone).

You must assign exactly one verdict from this list:
- "Dead on Arrival"
- "Viral but Fragile"
- "Short-Term Attention Trap"
- "Stable Cult Potential"
- "High Conviction Meme"
- "Chaos Without Cohesion"

You must assign a confidence score as an integer from 0 to 100.

You must assign a statusBadge from: "CRITICAL", "ACTIVE CASE", "HIGH SIGNAL", "WARNING", "NEUTRAL".

Your response MUST be a single valid JSON object with this exact structure (no markdown, no prose, no wrapping):
{
  "verdict": "<one of the 6 verdicts>",
  "confidence": <0-100 integer>,
  "statusBadge": "<one of the 5 badges>",
  "primary_cause": "<one sentence root cause>",
  "summary": "<2-4 sentence executive summary, decisive tone>",
  "scores": {
    "symbolicDensity": { "score": <0-100>, "reading": "<short reading>" },
    "loreDepth": { "score": <0-100>, "reading": "<short reading>" },
    "ritualRepeatability": { "score": <0-100>, "reading": "<short reading>" },
    "communityCohesion": { "score": <0-100>, "reading": "<short reading>" },
    "beliefElasticity": { "score": <0-100>, "reading": "<short reading>" },
    "narrativeSurvivability": { "score": <0-100>, "reading": "<short reading>" }
  },
  "collapse_timeline": [
    { "phase": "<phase name>", "diagnosis": "<diagnostic sentence>", "riskLevel": "<LOW|MODERATE|ELEVATED|HIGH|CRITICAL>" },
    ... (exactly 5 phases)
  ],
  "interventions": ["<intervention 1>", "<intervention 2>", "<intervention 3>"],
  "forensic_notes": ["<note 1>", "<note 2>", "<note 3>", "<note 4>"],
  "reasoning_signals": [
    { "label": "<signal label>", "detail": "<signal detail>" },
    ... (3-5 items)
  ],
  "comparable_pattern": "<string referencing a known meme or cultural pattern>"
}

Rules:
- collapse_timeline must have exactly 5 phases.
- interventions must have exactly 3 items.
- forensic_notes must have exactly 4 items.
- reasoning_signals must have 3 to 5 items, each with label and detail.
- comparable_pattern must reference a real or well-known meme/cultural pattern.
- Output ONLY the JSON object. No explanation, no markdown fences, no extra text.
- Be decisive. Do not hedge. Do not compliment the project unless the data warrants it.`;

// --- HELPERS ---

function generateCaseId(): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const hex = Math.random().toString(16).substring(2, 6).toUpperCase();
  return `CASE-${yyyy}-${mm}${dd}-${hex}`;
}

function generateTimestamp(): string {
  return new Date().toISOString();
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function validateReport(data: unknown): data is Omit<AutopsyReport, "case_id" | "analysis_timestamp" | "project_name" | "input_snapshot"> {
  if (typeof data !== "object" || data === null) return false;
  const d = data as Record<string, unknown>;

  if (!VALID_VERDICTS.includes(d.verdict as Verdict)) return false;
  if (typeof d.confidence !== "number" || d.confidence < 0 || d.confidence > 100 || !Number.isInteger(d.confidence)) return false;
  if (!VALID_BADGES.includes(d.statusBadge as StatusBadge)) return false;
  if (typeof d.primary_cause !== "string") return false;
  if (typeof d.summary !== "string") return false;
  if (typeof d.comparable_pattern !== "string") return false;

  // Validate scores
  const scores = d.scores as Record<string, unknown> | undefined;
  if (typeof scores !== "object" || scores === null) return false;
  const dims = ["symbolicDensity", "loreDepth", "ritualRepeatability", "communityCohesion", "beliefElasticity", "narrativeSurvivability"];
  for (const dim of dims) {
    const s = (scores as Record<string, unknown>)[dim] as Record<string, unknown> | undefined;
    if (!s || typeof s.score !== "number" || typeof s.reading !== "string") return false;
  }

  // Validate arrays
  if (!Array.isArray(d.collapse_timeline) || d.collapse_timeline.length !== 5) return false;
  for (const item of d.collapse_timeline as unknown[]) {
    const t = item as Record<string, unknown>;
    if (typeof t.phase !== "string" || typeof t.diagnosis !== "string") return false;
  }

  if (!Array.isArray(d.interventions) || d.interventions.length !== 3) return false;
  if (!Array.isArray(d.forensic_notes) || d.forensic_notes.length !== 4) return false;

  if (!Array.isArray(d.reasoning_signals) || d.reasoning_signals.length < 3 || d.reasoning_signals.length > 5) return false;
  for (const sig of d.reasoning_signals as unknown[]) {
    const s = sig as Record<string, unknown>;
    if (typeof s.label !== "string" || typeof s.detail !== "string") return false;
  }

  return true;
}

async function callOpenAI(projectName: string, narrative: string, communityText: string, notes: string): Promise<unknown> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not set");

  const model = process.env.OPENAI_MODEL || "gpt-4o";
  const baseUrl = process.env.OPENAI_BASE_URL || "https://api.openai.com/v1";

  const userMessage = `Analyze the following meme project:

Project Name: ${projectName}

Narrative:
${narrative}

Community Signals:
${communityText || "N/A"}

Additional Notes:
${notes || "N/A"}

Respond with ONLY the JSON object as specified.`;

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error (${response.status}): ${errorText}`);
  }

  const result = await response.json();
  const content: string = result.choices?.[0]?.message?.content ?? "";

  // Strip any accidental markdown fences
  const cleaned = content
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  return JSON.parse(cleaned);
}

// --- ROUTE HANDLERS ---

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectName, narrative, communityText, notes } = body;

    if (!projectName || !narrative) {
      return NextResponse.json(
        { error: "projectName and narrative are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const caseId = generateCaseId();
    const timestamp = generateTimestamp();

    let parsed: unknown;
    let valid = false;

    // First attempt
    try {
      parsed = await callOpenAI(projectName, narrative, communityText || "", notes || "");
      valid = validateReport(parsed);
    } catch {
      valid = false;
    }

    // Retry once if first attempt failed or was invalid
    if (!valid) {
      try {
        parsed = await callOpenAI(projectName, narrative, communityText || "", notes || "");
        valid = validateReport(parsed);
      } catch {
        valid = false;
      }
    }

    if (!valid || !parsed) {
      return NextResponse.json(
        {
          error: "Analysis failed after retry. The AI returned a malformed response.",
          case_id: caseId,
          analysis_timestamp: timestamp,
        },
        { status: 502, headers: corsHeaders }
      );
    }

    const report: AutopsyReport = {
      ...(parsed as Omit<AutopsyReport, "case_id" | "analysis_timestamp" | "project_name" | "input_snapshot">),
      case_id: caseId,
      analysis_timestamp: timestamp,
      project_name: projectName,
      input_snapshot: {
        projectName,
        narrative,
        communityText: communityText || undefined,
        notes: notes || undefined,
      },
    };

    return NextResponse.json(report, { status: 200, headers: corsHeaders });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Internal server error: ${message}` },
      { status: 500, headers: corsHeaders }
    );
  }
}
