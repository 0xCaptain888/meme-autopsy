/**
 * Generic LLM client for structured JSON completions.
 *
 * Env vars:
 *   OPENAI_API_KEY   – required
 *   OPENAI_MODEL     – default "gpt-4.1-mini"
 *   LLM_BASE_URL     – default "https://api.openai.com/v1"
 */

export interface LlmJsonCompletionParams {
  systemPrompt: string;
  userPrompt: string;
  /** If true, the caller is signaling this is already a retry attempt (for logging). */
  retry?: boolean;
}

export async function llmJsonCompletion(
  params: LlmJsonCompletionParams
): Promise<unknown> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY is not set. Configure it as an environment variable."
    );
  }

  const model = process.env.OPENAI_MODEL ?? "gpt-4.1-mini";
  const baseUrl = (process.env.LLM_BASE_URL ?? "https://api.openai.com/v1").replace(
    /\/$/,
    ""
  );

  const url = `${baseUrl}/chat/completions`;

  const body = JSON.stringify({
    model,
    messages: [
      { role: "system", content: params.systemPrompt },
      { role: "user", content: params.userPrompt },
    ],
    response_format: { type: "json_object" },
    temperature: 0.3,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body,
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "<unreadable body>");
    throw new Error(
      `LLM API error ${response.status} (${response.statusText}): ${errorText}`
    );
  }

  const result = await response.json();

  const content: string | undefined = result?.choices?.[0]?.message?.content;
  if (typeof content !== "string" || content.trim().length === 0) {
    throw new Error(
      "LLM returned an empty or missing content field in choices[0].message.content"
    );
  }

  try {
    return JSON.parse(content);
  } catch (parseError) {
    throw new Error(
      `Failed to parse LLM response as JSON: ${
        parseError instanceof Error ? parseError.message : String(parseError)
      }\nRaw content: ${content.slice(0, 500)}`
    );
  }
}
