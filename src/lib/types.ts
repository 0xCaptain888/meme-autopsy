export type Verdict =
  | "Dead on Arrival"
  | "Viral but Fragile"
  | "Short-Term Attention Trap"
  | "Stable Cult Potential"
  | "High Conviction Meme"
  | "Chaos Without Cohesion";

export type StatusBadge = "CRITICAL" | "ACTIVE CASE" | "HIGH SIGNAL" | "WARNING" | "NEUTRAL";

export interface DimensionScore {
  score: number;
  reading: string;
}

export interface ScoreSet {
  symbolicDensity: DimensionScore;
  loreDepth: DimensionScore;
  ritualRepeatability: DimensionScore;
  communityCohesion: DimensionScore;
  beliefElasticity: DimensionScore;
  narrativeSurvivability: DimensionScore;
}

export interface TimelineItem {
  phase: string;
  diagnosis: string;
  riskLevel?: "LOW" | "MODERATE" | "ELEVATED" | "HIGH" | "CRITICAL";
}

export interface ReasoningSignal {
  label: string;
  detail: string;
}

export interface AutopsyReport {
  case_id: string;
  analysis_timestamp: string;
  project_name: string;
  verdict: Verdict;
  confidence: number;
  statusBadge: StatusBadge;
  primary_cause: string;
  summary: string;
  scores: ScoreSet;
  collapse_timeline: TimelineItem[];
  interventions: string[];
  forensic_notes: string[];
  reasoning_signals: ReasoningSignal[];
  comparable_pattern: string;
  input_snapshot: {
    projectName: string;
    narrative: string;
    communityText?: string;
    notes?: string;
  };
}

export interface FormData {
  projectName: string;
  narrative: string;
  communityText: string;
  notes: string;
}

export interface SampleCase {
  case_id: string;
  input: FormData;
  report: AutopsyReport;
}

export type Language = "en" | "zh";
export type AppView = "landing" | "workspace";
