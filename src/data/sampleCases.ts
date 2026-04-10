import type { AutopsyReport, SampleCase, FormData } from "@/lib/types";

// --- SAMPLE INPUTS ---

const dogePriestInput: FormData = {
  projectName: "DogePriest",
  narrative:
    'DogePriest is a meme project built around the idea of a holy dog prophet guiding holders through market chaos. It uses religious irony, prophecy language, and anti-establishment humor. The community calls price pumps "blessings" and dips "tests of faith." The tone is absurd but committed.',
  communityText:
    "the prophecy has begun\nnon-believers will cope\nevery dip is a test of faith\nthe blessed hold\nwe do not sell, we ascend\nthe sermon drops tonight",
  notes: "",
};

const bananaFaxInput: FormData = {
  projectName: "BananaFax",
  narrative:
    "BananaFax is a meme token based on the idea that monkeys send alpha through banana-powered fax machines. The brand is random, surreal, and intentionally stupid. There is no broader story beyond chaos and vibes.",
  communityText:
    "banana alpha incoming\nfax the pump\nmonkey line busy\nbananas never sleep\ntrust the fax\nyellow signal green candle",
  notes: "",
};

const saintMemeInput: FormData = {
  projectName: "SaintMeme",
  narrative:
    "SaintMeme is a meme movement framing itself as the last defense against dead internet culture. It treats meme creation as spiritual warfare against bland, corporate content. The community uses ritual language, canon texts, and remix challenges as signals of loyalty and participation.",
  communityText:
    "the feed has fallen\npost with conviction\ncanon drop at midnight\ncontent is dead, meme is sacred\njoin the final remix\nwe do not engage, we convert",
  notes: "",
};

// --- SAMPLE REPORTS ---

const dogePriestReport: AutopsyReport = {
  case_id: "CASE-2024-0417-A7F3",
  analysis_timestamp: "2024-04-17T14:32:00.000Z",
  project_name: "DogePriest",
  verdict: "Viral but Fragile",
  confidence: 78,
  statusBadge: "ACTIVE CASE",
  primary_cause: "Strong symbolic identity with weak long-term doctrine formation",
  summary:
    "DogePriest has the ingredients for early virality: clear symbolism, repeatable phrases, and emotionally sticky irony. However, the project risks fast cultural fatigue because it lacks a deeper mission structure that can sustain belief after the initial meme wave. The religious framing is compelling but ultimately decorative without layered mythology to back it up.",
  scores: {
    symbolicDensity: {
      score: 86,
      reading: "Strong religious iconography fused with internet dog culture",
    },
    loreDepth: {
      score: 52,
      reading: "Surface-level prophetic framing without layered mythology",
    },
    ritualRepeatability: {
      score: 88,
      reading: "Catchphrases are highly shareable but lack structured ritual cadence",
    },
    communityCohesion: {
      score: 63,
      reading: "Identity formation is active but doctrine is thin",
    },
    beliefElasticity: {
      score: 47,
      reading: "Narrative cannot absorb contradiction or external pressure",
    },
    narrativeSurvivability: {
      score: 82,
      reading: "Initial hook is strong but lacks recursive narrative depth",
    },
  },
  collapse_timeline: [
    {
      phase: "Initial Hook",
      diagnosis: "The religious framing creates immediate curiosity and contrast with typical meme tokens.",
      riskLevel: "LOW",
    },
    {
      phase: "Social Spread",
      diagnosis: "Catchphrases and irony make the project highly shareable across crypto Twitter.",
      riskLevel: "LOW",
    },
    {
      phase: "Identity Formation",
      diagnosis: "The community begins forming around insider language and ritualized phrases, but depth is limited.",
      riskLevel: "MODERATE",
    },
    {
      phase: "Fatigue Trigger",
      diagnosis: "Without deeper narrative layers, the core joke starts to flatten and repeat without evolution.",
      riskLevel: "HIGH",
    },
    {
      phase: "Belief Collapse",
      diagnosis: "If no mission or enemy emerges, the meme fails to convert irony into long-term conviction.",
      riskLevel: "CRITICAL",
    },
  ],
  interventions: [
    "Introduce a stronger myth arc with recurring prophecy milestones tied to community actions.",
    "Create internal rituals beyond price-based reactions to deepen participatory identity.",
    "Define a clearer enemy or worldview to strengthen tribe cohesion and long-term narrative tension.",
  ],
  forensic_notes: [
    "The prophet-dog archetype is visually strong but narratively shallow — there is no origin story or evolving doctrine.",
    "Community language is memetically potent in isolation but lacks connective tissue between phrases.",
    "Price-action rituals (\"blessings\" and \"tests of faith\") create engagement spikes but not durable belief.",
    "The project has no clear escalation path from ironic humor to genuine community mission.",
  ],
  reasoning_signals: [
    {
      label: "Symbol Resonance",
      detail: "Religious dog imagery triggers strong pattern recognition across crypto-native audiences.",
    },
    {
      label: "Lore Gap",
      detail: "No layered mythology exists beneath the surface-level prophetic framing.",
    },
    {
      label: "Ritual Surface",
      detail: "Catchphrases circulate well but do not compound into structured community rituals.",
    },
    {
      label: "Fragility Indicator",
      detail: "The narrative depends on novelty — once the joke is familiar, no deeper layer sustains attention.",
    },
  ],
  comparable_pattern: "Reminiscent of early Doge — iconic surface, shallow lore",
  input_snapshot: {
    projectName: "DogePriest",
    narrative: dogePriestInput.narrative,
    communityText: dogePriestInput.communityText,
  },
};

const bananaFaxReport: AutopsyReport = {
  case_id: "CASE-2024-0412-B2E1",
  analysis_timestamp: "2024-04-12T09:15:00.000Z",
  project_name: "BananaFax",
  verdict: "Dead on Arrival",
  confidence: 91,
  statusBadge: "CRITICAL",
  primary_cause: "Random absurdity without symbolic durability or community anchor",
  summary:
    "BananaFax has surface-level absurdity but lacks the symbolic clarity and internal logic needed for sustained cultural spread. The concept is noise without signal. It may generate brief attention, but it is structurally too shallow to form a durable meme community or convert curiosity into loyalty.",
  scores: {
    symbolicDensity: {
      score: 28,
      reading: "Imagery is noisy and random without becoming iconic or recognizable",
    },
    loreDepth: {
      score: 18,
      reading: "The concept does not evolve into a world, myth, or internally consistent logic",
    },
    ritualRepeatability: {
      score: 45,
      reading: "Some phrases are funny but they are too disposable to form repeating behaviors",
    },
    communityCohesion: {
      score: 22,
      reading: "There is no stable identity framework for holders to belong to or defend",
    },
    beliefElasticity: {
      score: 19,
      reading: "The narrative has no structural resilience against any form of pressure or doubt",
    },
    narrativeSurvivability: {
      score: 15,
      reading: "Attention is likely to disappear almost immediately after the first joke cycle",
    },
  },
  collapse_timeline: [
    {
      phase: "Initial Hook",
      diagnosis: "The absurdity may trigger curiosity for a short burst among degen audiences.",
      riskLevel: "MODERATE",
    },
    {
      phase: "Social Spread",
      diagnosis: "Spread is possible but weak due to low symbolic precision and no clear hook.",
      riskLevel: "HIGH",
    },
    {
      phase: "Identity Formation",
      diagnosis: "The project fails to create insider language with any meaningful depth or exclusivity.",
      riskLevel: "CRITICAL",
    },
    {
      phase: "Fatigue Trigger",
      diagnosis: "The joke exhausts itself almost instantly as there is nothing beneath the surface.",
      riskLevel: "CRITICAL",
    },
    {
      phase: "Belief Collapse",
      diagnosis: "There was never enough narrative weight to form belief — collapse is the default state.",
      riskLevel: "CRITICAL",
    },
  ],
  interventions: [
    "Rebuild the concept around a stronger central symbol with visual and narrative clarity.",
    "Introduce a clearer worldview or cultural enemy to give the community something to rally behind.",
    "Replace random absurdity with structured lore that can evolve and be built upon by the community.",
  ],
  forensic_notes: [
    "The banana-fax-monkey chain is three layers of randomness stacked without connective logic.",
    "Community language reads as placeholder slogans with no internal mythology or progression.",
    "No identity ladder exists — there is no path from casual observer to committed believer.",
    "The project is indistinguishable from hundreds of disposable tokens launched weekly.",
  ],
  reasoning_signals: [
    {
      label: "Symbol Noise",
      detail: "The imagery combines unrelated elements without creating a recognizable or ownable symbol.",
    },
    {
      label: "Lore Absence",
      detail: "There is no underlying story, no world, and no mythology to sustain engagement.",
    },
    {
      label: "Community Vacuum",
      detail: "No identity markers exist for community members to adopt or defend.",
    },
  ],
  comparable_pattern: "Pattern matches disposable shitcoin wave — no narrative skeleton",
  input_snapshot: {
    projectName: "BananaFax",
    narrative: bananaFaxInput.narrative,
    communityText: bananaFaxInput.communityText,
  },
};

const saintMemeReport: AutopsyReport = {
  case_id: "CASE-2024-0421-C9D4",
  analysis_timestamp: "2024-04-21T18:45:00.000Z",
  project_name: "SaintMeme",
  verdict: "Stable Cult Potential",
  confidence: 85,
  statusBadge: "HIGH SIGNAL",
  primary_cause: "Mission-driven narrative with repeatable ritual structures and strong tribe identity",
  summary:
    "SaintMeme shows the strongest long-term cultural survivability of any project in the sample set. It is not just a joke but a mission-driven meme framework with symbolic depth, clear identity boundaries, and repeatable ritual structures. The anti-corporate framing gives the community a durable enemy, which is the single most reliable fuel for sustained meme longevity.",
  scores: {
    symbolicDensity: {
      score: 89,
      reading: "The sacred-versus-corporate framing is emotionally memorable and visually transferable",
    },
    loreDepth: {
      score: 87,
      reading: "The project has enough myth structure to support longer narrative life and community canon",
    },
    ritualRepeatability: {
      score: 91,
      reading: "Canon drops and remix challenges create self-reinforcing participation loops",
    },
    communityCohesion: {
      score: 81,
      reading: "Ritual language and shared mission increase cohesion and create clear insider markers",
    },
    beliefElasticity: {
      score: 79,
      reading: "The ideological framing can absorb market pressure by reframing setbacks as part of the mission",
    },
    narrativeSurvivability: {
      score: 88,
      reading: "The mission can evolve beyond the initial meme moment into a sustained cultural identity",
    },
  },
  collapse_timeline: [
    {
      phase: "Initial Hook",
      diagnosis: "The anti-corporate framing creates immediate ideological contrast and emotional resonance.",
      riskLevel: "LOW",
    },
    {
      phase: "Social Spread",
      diagnosis: "Remixable slogans and symbolic language support rapid community circulation and onboarding.",
      riskLevel: "LOW",
    },
    {
      phase: "Identity Formation",
      diagnosis: "The project gives participants clear insider status markers and a sense of belonging to a cause.",
      riskLevel: "LOW",
    },
    {
      phase: "Fatigue Trigger",
      diagnosis: "Fatigue risk exists but can be delayed through evolving canon, new rituals, and remix cycles.",
      riskLevel: "MODERATE",
    },
    {
      phase: "Belief Collapse",
      diagnosis: "Collapse is less likely because the meme has converted humor into mission-driven conviction.",
      riskLevel: "LOW",
    },
  ],
  interventions: [
    "Expand canon drops into recurring community events with escalating narrative stakes.",
    "Formalize community rituals to deepen commitment and create progression milestones.",
    "Create narrative milestones that reward remix participation and elevate top contributors.",
  ],
  forensic_notes: [
    "The enemy archetype (corporate internet culture) is durable and unlikely to lose relevance.",
    "Canon texts and remix challenges function as both content and loyalty signals simultaneously.",
    "The community has multiple identity layers — from casual participants to canon contributors.",
    "The spiritual warfare framing transforms typical meme fatigue into ideological commitment.",
  ],
  reasoning_signals: [
    {
      label: "Mission Clarity",
      detail: "The project has a clearly defined enemy and purpose that transcends price action.",
    },
    {
      label: "Ritual Density",
      detail: "Multiple overlapping rituals (canon drops, remixes, conversion language) sustain engagement.",
    },
    {
      label: "Identity Ladder",
      detail: "Clear progression from observer to participant to contributor to canon author.",
    },
    {
      label: "Narrative Elasticity",
      detail: "The mission framing allows setbacks to be reinterpreted as tests rather than failures.",
    },
    {
      label: "Enemy Durability",
      detail: "Corporate internet culture is a permanent antagonist — the enemy never runs out.",
    },
  ],
  comparable_pattern: "Echoes early Bitcoin maximalist culture — ideological conviction as cohesion engine",
  input_snapshot: {
    projectName: "SaintMeme",
    narrative: saintMemeInput.narrative,
    communityText: saintMemeInput.communityText,
  },
};

// --- EXPORTS ---

export const sampleCases: SampleCase[] = [
  {
    case_id: "CASE-2024-0417-A7F3",
    input: dogePriestInput,
    report: dogePriestReport,
  },
  {
    case_id: "CASE-2024-0412-B2E1",
    input: bananaFaxInput,
    report: bananaFaxReport,
  },
  {
    case_id: "CASE-2024-0421-C9D4",
    input: saintMemeInput,
    report: saintMemeReport,
  },
];

export const sampleReports: Record<string, AutopsyReport> = {
  DogePriest: dogePriestReport,
  BananaFax: bananaFaxReport,
  SaintMeme: saintMemeReport,
};

export const sampleInputs: Record<string, FormData> = {
  DogePriest: dogePriestInput,
  BananaFax: bananaFaxInput,
  SaintMeme: saintMemeInput,
};
