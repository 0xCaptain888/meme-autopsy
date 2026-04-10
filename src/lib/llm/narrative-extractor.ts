import {
  narrativeExtractionOutputSchema,
  type NarrativeFeatures,
} from "@/lib/validation/zod";
import { buildNarrativeExtractionPrompt } from "@/prompts/narrative-extraction";
import { llmJsonCompletion } from "@/lib/llm/client";
import type { Project, NarrativeSource } from "@/types/domain";

export interface NarrativeExtractionInput {
  project: Project;
  narrativeSources: NarrativeSource[];
}

/**
 * Runs LLM-based narrative extraction, validates the output with Zod,
 * and retries once on validation failure.
 */
export async function runNarrativeExtraction(
  input: NarrativeExtractionInput
): Promise<NarrativeFeatures> {
  const { systemPrompt, userPrompt } = buildNarrativeExtractionPrompt(input);

  // First attempt
  const firstRaw = await llmJsonCompletion({ systemPrompt, userPrompt });
  const firstResult = narrativeExtractionOutputSchema.safeParse(firstRaw);

  if (firstResult.success) {
    return firstResult.data;
  }

  // Retry once
  const retryRaw = await llmJsonCompletion({
    systemPrompt,
    userPrompt,
    retry: true,
  });
  const retryResult = narrativeExtractionOutputSchema.safeParse(retryRaw);

  if (retryResult.success) {
    return retryResult.data;
  }

  const issues = retryResult.error.issues
    .map((i) => `${i.path.join(".")}: ${i.message}`)
    .join("; ");

  throw new Error(
    `Narrative extraction failed validation after retry. Issues: ${issues}`
  );
}
