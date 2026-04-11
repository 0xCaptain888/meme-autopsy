// V2 Forensic Autopsy types

export type PronouncedCondition =
  | "Dead on Arrival"
  | "Viral but Fragile"
  | "Stable Cult Potential"
  | "Chaos Without Cohesion"
  | "High Conviction Meme"
  | "Short-Term Attention Trap";

export type SurvivalOutlook =
  | "Preserved"
  | "Guarded"
  | "Unstable but Viable"
  | "Critically Dependent"
  | "Pre-terminal";

export type MannerOfDeath =
  | "Natural decay"
  | "Structural failure"
  | "Self-inflicted collapse"
  | "Market-shock accelerated decline"
  | "Chronic fragility with acute trigger"
  | "Undetermined";

export type CaseStatus =
  | "Under Examination"
  | "Opinion Issued"
  | "Examination Interrupted"
  | "Partial Examination"
  | "Examination Ongoing"
  | "Evidence Missing"
  | "Ready for Intake";

export type SpecimenLabel =
  | "Terminal Specimen"
  | "Preserved Specimen"
  | "Open Examination";

export type EvidenceSourceStatus = "acquired" | "unavailable" | "partial" | "stale";

export interface EvidenceSource {
  name: string;
  status: EvidenceSourceStatus;
  timestamp?: string;
}

// 4-layer diagnostic protocol
export interface DiagnosticLayer {
  score: number; // 0-100
  reading: string;
}

export interface DiagnosticProtocol {
  surfaceSignals: DiagnosticLayer;
  structuralIntegrity: DiagnosticLayer;
  degenerationFactors: DiagnosticLayer;
  survivalCapacity: DiagnosticLayer;
}

// Legacy 6-dimension scores mapped into layers
export interface DimensionScore {
  score: number;
  reading: string;
}

export interface ForensicScores {
  symbolicDensity: DimensionScore;
  loreDepth: DimensionScore;
  ritualRepeatability: DimensionScore;
  communityCohesion: DimensionScore;
  beliefElasticity: DimensionScore;
  narrativeSurvivability: DimensionScore;
}

// Hypothesis → Evidence → Conclusion chain
export interface FindingChain {
  hypothesis: string;
  evidence: string;
  conclusion: string;
}

export interface PathologyAlert {
  alert: string;
  evidence: string;
  severity: "terminal" | "severe" | "moderate" | "mild";
}

export interface ContributingFactor {
  factor: string;
  evidence?: string;
}

export interface DegenerationEvent {
  phase: string;
  description: string;
  severity: "mild" | "moderate" | "severe" | "terminal";
}

// Full V2 Autopsy Report
export interface AutopsyReport {
  // Case Header
  caseId: string;
  specimenName: string;
  contractAddress: string;
  chain: string;
  sourceOrigin: string;
  intakeTime: string;
  examinationStatus: CaseStatus;
  pronouncedCondition: PronouncedCondition;

  // Case Background
  launchContext: string;
  synopsis: string;

  // Evidence Chain
  evidenceSources: EvidenceSource[];
  confidenceOfDetermination: number; // 0-100

  // Diagnostic Protocol (4 layers)
  diagnosticProtocol: DiagnosticProtocol;

  // Legacy 6-dimension scores
  scores: ForensicScores;

  // External Examination
  externalExamination: {
    surfaceFindings: string;
    visibleMarkings: string[];
    surfaceCondition: string;
    initialSignalProfile: string;
  };

  // Internal Examination
  internalExamination: {
    narrativeTissueAnalysis: string;
    structuralCondition: string;
    cohesionFindings: string;
    beliefArchitecture: string;
  };

  // Pathology Findings
  pathologyFindings: PathologyAlert[];

  // Mechanism of Virality
  mechanismOfVirality: FindingChain;

  // Mechanism of Death or Survival
  mechanismOfDeathOrSurvival: FindingChain;

  // Estimated Time of Death / Stage of Decay
  stageOfDecay: string;
  estimatedFailureWindow?: string;

  // Degeneration Timeline
  degenerationTimeline?: DegenerationEvent[];

  // Cause of Death
  primaryCauseOfDeath: string;
  contributingFactors: ContributingFactor[];
  mannerOfDeath: MannerOfDeath;

  // Survival (for living projects)
  survivalOutlook?: SurvivalOutlook;
  primarySurvivalMechanism?: string;

  // Evidence Log
  evidenceLog: {
    keyQuotes: string[];
    marketEvidence: string[];
    holderEvidence: string[];
    narrativeEvidence: string[];
  };

  // Final Autopsy Opinion
  finalOpinion: string;
  uncertaintyNotes: string[];

  // Input snapshot
  inputSnapshot: {
    contractAddress: string;
    sceneNotes?: string;
    launchPlatform?: string;
  };
}

export type ChainType = "BSC" | "ETH" | "SOL" | "BASE" | "other";

export interface FormData {
  contractAddress: string;
  projectName: string;
  chain: ChainType;
  sceneNotes: string;
  launchPlatform: "four.meme" | "manual" | "unknown";
}

export type Language = "en" | "zh";
export type AppView = "landing" | "workspace";

// Examination stages for loading
export interface ExaminationStage {
  id: string;
  label: string;
  status: "pending" | "active" | "complete" | "error";
}
