import type { AutopsyReport, SampleCaseInput } from "@/lib/types";

export const sampleInputs: Record<string, SampleCaseInput> = {
  DogePriest: {
    projectName: "DogePriest",
    narrative:
      'DogePriest is a meme project built around the idea of a holy dog prophet guiding holders through market chaos. It uses religious irony, prophecy language, and anti-establishment humor. The community calls price pumps "blessings" and dips "tests of faith." The tone is absurd but committed.',
    websiteUrl: "https://dogepriest.fun",
    communityText:
      "the prophecy has begun\nnon-believers will cope\nevery dip is a test of faith\nthe blessed hold\nwe do not sell, we ascend\nthe sermon drops tonight",
  },
  BananaFax: {
    projectName: "BananaFax",
    narrative:
      "BananaFax is a meme token based on the idea that monkeys send alpha through banana-powered fax machines. The brand is random, surreal, and intentionally stupid. There is no broader story beyond chaos and vibes.",
    communityText:
      "banana alpha incoming\nfax the pump\nmonkey line busy\nbananas never sleep\ntrust the fax\nyellow signal green candle",
  },
  SaintMeme: {
    projectName: "SaintMeme",
    narrative:
      "SaintMeme is a meme movement framing itself as the last defense against dead internet culture. It treats meme creation as spiritual warfare against bland, corporate content. The community uses ritual language, canon texts, and remix challenges as signals of loyalty and participation.",
    communityText:
      "the feed has fallen\npost with conviction\ncanon drop at midnight\ncontent is dead, meme is sacred\njoin the final remix\nwe do not engage, we convert",
  },
};

export const sampleReports: Record<string, AutopsyReport> = {
  DogePriest: {
    projectName: "DogePriest",
    verdict: "Viral but Fragile",
    statusBadge: "ACTIVE CASE",
    primaryCause:
      "Strong symbolic identity with weak long-term doctrine formation",
    secondaryCauses: [
      "Community language is memorable but narrow",
      "Narrative escalation path is limited",
      "Humor is strong but mission clarity is weak",
    ],
    executiveSummary:
      "DogePriest has the ingredients for early virality: clear symbolism, repeatable phrases, and emotionally sticky irony. However, the project risks fast cultural fatigue because it lacks a deeper mission structure that can sustain belief after the initial meme wave.",
    scores: {
      narrativeCoherence: 82,
      memeSpreadability: 88,
      symbolStickiness: 86,
      communityTrust: 63,
      loreDepth: 52,
      attentionResilience: 47,
    },
    scoreExplanations: {
      narrativeCoherence:
        "The narrative is easy to grasp and internally consistent.",
      memeSpreadability:
        "Religious irony and repeatable language create high repost potential.",
      symbolStickiness:
        "The prophet-dog imagery is memorable and visually transferable.",
      communityTrust:
        "The language creates belonging, but not yet durable trust.",
      loreDepth: "There is a theme, but not yet a full mythology.",
      attentionResilience:
        "The project may lose momentum once the joke becomes familiar.",
    },
    timeline: [
      {
        phase: "Initial Hook",
        diagnosis:
          "The religious framing creates immediate curiosity and contrast.",
      },
      {
        phase: "Social Spread",
        diagnosis:
          "Catchphrases and irony make the project highly shareable.",
      },
      {
        phase: "Identity Formation",
        diagnosis:
          "The community begins to form around insider language and ritualized phrases.",
      },
      {
        phase: "Fatigue Trigger",
        diagnosis:
          "Without deeper narrative layers, the core joke starts to flatten.",
      },
      {
        phase: "Belief Collapse",
        diagnosis:
          "If no mission or enemy emerges, the meme fails to convert irony into long-term conviction.",
      },
    ],
    interventions: [
      "Introduce a stronger myth arc with recurring prophecy milestones.",
      "Create more internal rituals beyond price-based reactions.",
      "Define a clearer enemy or worldview to strengthen tribe identity.",
    ],
  },
  BananaFax: {
    projectName: "BananaFax",
    verdict: "Dead on Arrival",
    statusBadge: "CRITICAL",
    primaryCause:
      "High randomness with no durable symbolic or social anchor",
    secondaryCauses: [
      "Narrative lacks coherent progression",
      "Community language is disposable",
      "No belief structure or identity ladder exists",
    ],
    executiveSummary:
      "BananaFax has surface-level absurdity but lacks the symbolic clarity and internal logic needed for sustained cultural spread. It may generate brief attention, but it is structurally too shallow to form a durable meme community.",
    scores: {
      narrativeCoherence: 34,
      memeSpreadability: 59,
      symbolStickiness: 41,
      communityTrust: 22,
      loreDepth: 18,
      attentionResilience: 15,
    },
    scoreExplanations: {
      narrativeCoherence:
        "The concept is random but not meaningfully structured.",
      memeSpreadability:
        "Some phrases are funny, but they are not strong enough to carry repeated sharing.",
      symbolStickiness:
        "The imagery is noisy without becoming iconic.",
      communityTrust:
        "There is no stable identity framework for holders to belong to.",
      loreDepth: "The concept does not evolve into a world or myth.",
      attentionResilience:
        "Attention is likely to disappear almost immediately after the first joke cycle.",
    },
    timeline: [
      {
        phase: "Initial Hook",
        diagnosis:
          "The absurdity may trigger curiosity for a short burst.",
      },
      {
        phase: "Social Spread",
        diagnosis:
          "Spread is possible, but weak due to low symbolic precision.",
      },
      {
        phase: "Identity Formation",
        diagnosis:
          "The project fails to create insider language with depth.",
      },
      {
        phase: "Fatigue Trigger",
        diagnosis: "The joke exhausts itself almost instantly.",
      },
      {
        phase: "Belief Collapse",
        diagnosis:
          "There was never enough narrative weight to form belief.",
      },
    ],
    interventions: [
      "Rebuild the concept around a stronger central symbol.",
      "Introduce a clearer worldview or cultural enemy.",
      "Replace random absurdity with structured lore.",
    ],
  },
  SaintMeme: {
    projectName: "SaintMeme",
    verdict: "Stable Cult Potential",
    statusBadge: "HIGH SIGNAL",
    primaryCause:
      "Strong symbolic clarity combined with mission-driven community identity",
    secondaryCauses: [
      "Language reinforces in-group participation",
      "The project has a clear enemy and worldview",
      "The lore system supports repeated engagement",
    ],
    executiveSummary:
      "SaintMeme shows the strongest long-term cultural survivability of the sample cases. It is not just a joke but a mission-driven meme framework with symbolic depth, clear identity boundaries, and repeatable ritual structures.",
    scores: {
      narrativeCoherence: 91,
      memeSpreadability: 84,
      symbolStickiness: 89,
      communityTrust: 81,
      loreDepth: 87,
      attentionResilience: 79,
    },
    scoreExplanations: {
      narrativeCoherence:
        "The project has a sharp worldview and consistent internal logic.",
      memeSpreadability:
        "Its language is remixable and built for community participation.",
      symbolStickiness:
        "The sacred-versus-corporate framing is emotionally memorable.",
      communityTrust:
        "Ritual language and shared mission increase cohesion.",
      loreDepth:
        "The project has enough myth structure to support longer narrative life.",
      attentionResilience:
        "The mission can evolve beyond the initial meme moment.",
    },
    timeline: [
      {
        phase: "Initial Hook",
        diagnosis:
          "The anti-corporate framing creates immediate ideological contrast.",
      },
      {
        phase: "Social Spread",
        diagnosis:
          "Remixable slogans and symbolic language support rapid community circulation.",
      },
      {
        phase: "Identity Formation",
        diagnosis:
          "The project gives participants clear insider status markers.",
      },
      {
        phase: "Fatigue Trigger",
        diagnosis:
          "Fatigue risk exists, but can be delayed through evolving canon and rituals.",
      },
      {
        phase: "Belief Collapse",
        diagnosis:
          "Collapse is less likely because the meme has converted humor into mission.",
      },
    ],
    interventions: [
      "Expand canon drops into recurring community events.",
      "Formalize community rituals to deepen commitment.",
      "Create narrative milestones that reward remix participation.",
    ],
  },
};
