import {
  diagnosisOutputSchema,
  type DiagnosisOutput,
} from "@/lib/validation/zod";
import { buildDiagnosisPrompt } from "@/prompts/diagnosis";
import type { DiagnosisPromptInput } from "@/prompts/diagnosis";
import { llmJsonCompletion } from "@/lib/llm/client";

/**
 * Runs LLM-based diagnosis synthesis, validates the output with Zod,
 * and retries once on validation failure.
 */
export async function runDiagnosis(
  input: DiagnosisPromptInput
): Promise<DiagnosisOutput> {
  const { systemPrompt, userPrompt } = buildDiagnosisPrompt(input);

  // First attempt
  const firstRaw = await llmJsonCompletion({ systemPrompt, userPrompt });
  const firstResult = diagnosisOutputSchema.safeParse(firstRaw);

  if (firstResult.success) {
    return firstResult.data;
  }

  // Retry once
  const retryRaw = await llmJsonCompletion({
    systemPrompt,
    userPrompt,
    retry: true,
  });
  const retryResult = diagnosisOutputSchema.safeParse(retryRaw);

  if (retryResult.success) {
    return retryResult.data;
  }

  const issues = retryResult.error.issues
    .map((i) => `${i.path.join(".")}: ${i.message}`)
    .join("; ");

  throw new Error(
    `Diagnosis failed validation after retry. Issues: ${issues}`
  );
}
