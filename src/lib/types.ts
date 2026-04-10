export type Verdict =
  | "Dead on Arrival"
  | "Viral but Fragile"
  | "Stable Cult Potential"
  | "Decaying Fast";

export interface ScoreSet {
  narrativeCoherence: number;
  memeSpreadability: number;
  symbolStickiness: number;
  communityTrust: number;
  loreDepth: number;
  attentionResilience: number;
}

export interface TimelineItem {
  phase: string;
  diagnosis: string;
}

export interface AutopsyReport {
  projectName: string;
  verdict: Verdict;
  statusBadge: string;
  primaryCause: string;
  secondaryCauses: string[];
  executiveSummary: string;
  scores: ScoreSet;
  scoreExplanations: Record<string, string>;
  timeline: TimelineItem[];
  interventions: string[];
}

export interface SampleCaseInput {
  projectName: string;
  narrative: string;
  websiteUrl?: string;
  communityText?: string;
}

export type Language = "en" | "zh";

export type AppView = "landing" | "input" | "loading" | "report";
