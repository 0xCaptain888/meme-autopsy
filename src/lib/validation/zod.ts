import { z } from "zod";

// --- Shared dimension schema ---

const dimensionScoreSchema = z.object({
  score: z.number().int().min(0).max(10),
  reading: z.string().min(1),
  evidenceQuotes: z.array(z.string()).min(0),
});

// --- Narrative extraction output ---

export const narrativeExtractionOutputSchema = z.object({
  symbolicDensity: dimensionScoreSchema,
  loreDepth: dimensionScoreSchema,
  ritualRepeatability: dimensionScoreSchema,
  communityCohesion: dimensionScoreSchema,
  beliefElasticity: dimensionScoreSchema,
  narrativeSurvivability: dimensionScoreSchema,
  uncertaintyNotes: z.array(z.string()).optional(),
});

export type NarrativeFeatures = z.infer<typeof narrativeExtractionOutputSchema>;

// --- Diagnosis output ---

const verdictSchema = z.enum([
  "Dead on Arrival",
  "Viral but Fragile",
  "Short-Term Attention Trap",
  "Stable Cult Potential",
  "High Conviction Meme",
  "Chaos Without Cohesion",
]);

const diagnosisDimensionSchema = z.object({
  score: z.number().int().min(0).max(10),
  reading: z.string().min(1),
});

export const diagnosisOutputSchema = z.object({
  verdict: verdictSchema,
  confidence: z.number().min(0).max(1),
  primaryCause: z.string().min(1),
  summary: z.string().min(1),
  whyThisVerdict: z
    .array(
      z.object({
        reason: z.string().min(1),
        evidence: z.string().min(1),
      })
    )
    .min(3)
    .max(5),
  scores: z.object({
    symbolicDensity: diagnosisDimensionSchema,
    loreDepth: diagnosisDimensionSchema,
    ritualRepeatability: diagnosisDimensionSchema,
    communityCohesion: diagnosisDimensionSchema,
    beliefElasticity: diagnosisDimensionSchema,
    narrativeSurvivability: diagnosisDimensionSchema,
  }),
  structureRisks: z
    .array(
      z.object({
        risk: z.string().min(1),
        evidence: z.string().min(1),
      })
    )
    .min(2)
    .max(4),
  collapseTimeline: z
    .array(
      z.object({
        stage: z.string().min(1),
        diagnosis: z.string().min(1),
        evidence: z.string().min(1),
      })
    )
    .min(3)
    .max(5),
  interventionPath: z
    .array(
      z.object({
        action: z.string().min(1),
        why: z.string().min(1),
      })
    )
    .min(2)
    .max(4),
  warningFlags: z.array(z.string()),
  comparablePattern: z.string().min(1),
});

export type DiagnosisOutput = z.infer<typeof diagnosisOutputSchema>;

// --- Run autopsy input ---

const launchPlatformSchema = z.enum(["four_meme", "pump_fun", "other"]);

export const runAutopsyInputSchema = z.object({
  name: z.string().optional(),
  symbol: z.string().optional(),
  contractAddress: z.string().min(1, "contractAddress is required"),
  launchPlatform: launchPlatformSchema.default("four_meme"),
  websiteUrl: z.string().url().optional().or(z.literal("")),
  twitterUrl: z.string().url().optional().or(z.literal("")),
  telegramUrl: z.string().url().optional().or(z.literal("")),
  coreNarrative: z.string().optional(),
  communityBehavior: z.string().optional(),
  strategicContext: z.string().optional(),
});

export type RunAutopsyInput = z.infer<typeof runAutopsyInputSchema>;

// --- Project upsert input ---

export const projectUpsertInputSchema = z.object({
  name: z.string().optional(),
  symbol: z.string().optional(),
  contractAddress: z.string().min(1, "contractAddress is required"),
  launchPlatform: launchPlatformSchema,
  websiteUrl: z.string().url().optional().or(z.literal("")),
  twitterUrl: z.string().url().optional().or(z.literal("")),
  telegramUrl: z.string().url().optional().or(z.literal("")),
});
