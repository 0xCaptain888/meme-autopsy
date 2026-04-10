import type { Project, NarrativeSource } from "@/types/domain";

export interface NarrativeExtractionPromptInput {
  project: Project;
  narrativeSources: NarrativeSource[];
}

export interface PromptPair {
  systemPrompt: string;
  userPrompt: string;
}

export function buildNarrativeExtractionPrompt(
  input: NarrativeExtractionPromptInput
): PromptPair {
  const systemPrompt = `You are a forensic narrative analyst for BSC meme-coin projects. Your task is to extract narrative structure from the provided source texts.

You MUST score exactly 6 dimensions on a 0-10 integer scale:
1. Symbolic Density — How rich, recognizable, and ownable is the core symbol system?
2. Lore Depth — How layered, self-sustaining, and internally consistent is the project mythology?
3. Ritual Repeatability — How naturally do community behaviors loop, reinforce, and compound?
4. Community Cohesion — How strong is the tribe identity, insider language, and internal trust?
5. Belief Elasticity — Can the narrative absorb contradiction, FUD, and external pressure without breaking?
6. Narrative Survivability — Can the story outlast its initial moment and keep evolving?

For EACH dimension provide:
- "score": integer 0-10 reflecting ONLY what the source material demonstrates
- "reading": 1-2 sentence diagnostic assessment in a clinical, decisive tone
- "evidenceQuotes": array of direct quotes extracted verbatim from the source texts that support the score

If any dimension lacks sufficient source material, include that dimension key in "uncertaintyNotes" — an array of strings explaining what is missing and why the score carries lower confidence.

Rules:
- NEVER invent facts, quotes, or signals not present in the sources.
- Scores must reflect ONLY what the provided texts show — do not extrapolate.
- Output strict JSON matching this schema:
{
  "symbolicDensity": { "score": <0-10>, "reading": "...", "evidenceQuotes": ["..."] },
  "loreDepth": { "score": <0-10>, "reading": "...", "evidenceQuotes": ["..."] },
  "ritualRepeatability": { "score": <0-10>, "reading": "...", "evidenceQuotes": ["..."] },
  "communityCohesion": { "score": <0-10>, "reading": "...", "evidenceQuotes": ["..."] },
  "beliefElasticity": { "score": <0-10>, "reading": "...", "evidenceQuotes": ["..."] },
  "narrativeSurvivability": { "score": <0-10>, "reading": "...", "evidenceQuotes": ["..."] },
  "uncertaintyNotes": ["..."]
}
- Output ONLY the JSON object. No markdown fences, no prose, no explanation.`;

  const sourceBlocks = input.narrativeSources
    .map((src, idx) => {
      const label = formatSourceLabel(src.sourceType);
      return `--- Source ${idx + 1} [${label}] ---\n${src.text}`;
    })
    .join("\n\n");

  const userPrompt = `Analyze the following meme project:

Project Name: ${input.project.name}
Contract Address: ${input.project.contract_address}${input.project.chain ? `\nChain: ${input.project.chain}` : ""}${input.project.description ? `\nDescription: ${input.project.description}` : ""}

=== NARRATIVE SOURCES ===

${sourceBlocks}

=== END SOURCES ===

Extract the narrative structure and score all 6 dimensions based strictly on the sources above. Respond with ONLY the JSON object.`;

  return { systemPrompt, userPrompt };
}

function formatSourceLabel(sourceType: string): string {
  switch (sourceType) {
    case "four_meme":
      return "four.meme project page";
    case "website":
      return "Project website";
    case "manual_narrative":
      return "Manual narrative input";
    case "manual_community":
      return "Manual community input";
    default:
      return sourceType;
  }
}
