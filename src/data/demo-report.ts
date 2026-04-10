/**
 * Demo / cached report returned when DEMO_MODE=true.
 */

import type { DiagnosisOutput } from "@/lib/validation/zod";
import type { Project } from "@/types/domain";

export const demoProject: Project = {
  id: "demo-00000000-0000-0000-0000-000000000000",
  name: "DemoMeme",
  contract_address: "0x0000000000000000000000000000000000000000",
  chain: "bsc",
  description: "A demo meme project for testing the autopsy pipeline.",
};

export const demoReport: DiagnosisOutput = {
  verdict: "Viral but Fragile",
  confidence: 0.72,
  primaryCause:
    "Strong initial symbolism with insufficient lore depth to sustain attention past the first viral cycle.",
  summary:
    "DemoMeme has memetic punch but lacks the narrative infrastructure for long-term survival. The community is engaged but shallow. Expect a bright flash followed by rapid decay unless deeper lore layers are introduced.",
  whyThisVerdict: [
    {
      reason: "High symbolic density but low lore depth",
      evidence:
        "Core imagery is recognizable but there is no mythology beneath it.",
    },
    {
      reason: "Rituals are surface-level",
      evidence:
        "Community repeats catchphrases but has no structured participation loops.",
    },
    {
      reason: "Belief elasticity is untested",
      evidence:
        "No significant FUD event has occurred to reveal narrative resilience.",
    },
  ],
  scores: {
    symbolicDensity: { score: 7, reading: "Clear iconography, easy to remix." },
    loreDepth: { score: 3, reading: "Shallow backstory, no evolving canon." },
    ritualRepeatability: {
      score: 6,
      reading: "Catchphrases circulate but do not compound.",
    },
    communityCohesion: {
      score: 5,
      reading: "Active chat but weak identity boundaries.",
    },
    beliefElasticity: {
      score: 4,
      reading: "Untested under pressure; likely brittle.",
    },
    narrativeSurvivability: {
      score: 4,
      reading: "Depends entirely on the initial hook staying fresh.",
    },
  },
  structureRisks: [
    {
      risk: "Single-layer narrative",
      evidence: "No secondary story arcs or community-created lore.",
    },
    {
      risk: "Price-dependent engagement",
      evidence: "Community activity correlates directly with token price.",
    },
  ],
  collapseTimeline: [
    {
      stage: "Launch Hype",
      diagnosis: "Initial attention spike driven by novelty.",
      evidence: "Social mentions peak within 48 hours of launch.",
    },
    {
      stage: "Plateau",
      diagnosis: "Engagement flatlines as the core joke becomes familiar.",
      evidence: "Repeat memes with no variation.",
    },
    {
      stage: "Drift",
      diagnosis: "Community fragments as holders lose conviction.",
      evidence: "Telegram activity drops 60%+ within two weeks.",
    },
  ],
  interventionPath: [
    {
      action: "Introduce evolving lore drops tied to holder milestones.",
      why: "Creates anticipation loops beyond price action.",
    },
    {
      action: "Define a clear cultural enemy or mission statement.",
      why: "Gives the community a reason to stay beyond speculation.",
    },
  ],
  warningFlags: [
    "No on-chain data available — diagnosis is narrative-only.",
    "Community signals are self-reported, not independently verified.",
  ],
  comparablePattern:
    "Early Dogecoin — iconic surface symbol, shallow lore, price-driven community.",
};
