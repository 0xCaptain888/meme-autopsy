import type {
  DemoCase,
  Project,
  ForensicReport,
} from "@/types/domain";

// --- Demo Case 1: PepeWarrior ---

const pepeWarriorAddress = "0x4a1B3c9D7e2F6a8E5b0C4d3F1A9e7B6c2D8f5E01";

const pepeWarriorProject: Project = {
  id: "proj_pepe_warrior_001",
  name: "PepeWarrior",
  symbol: "PEPEW",
  contract_address: pepeWarriorAddress,
  chain: "bsc",
  launchPlatform: "four.meme",
  websiteUrl: "https://pepewarrior.meme",
  description:
    "PepeWarrior is a BSC meme token casting Pepe as an armored warlord leading a ragtag army of diamond-hand holders into battle against paper-hand sellers and rug-pull devs. The community frames every market event as a battlefield dispatch.",
  created_at: "2025-03-14T08:00:00.000Z",
  updated_at: "2025-03-28T16:22:00.000Z",
};

const pepeWarriorReport: ForensicReport = {
  id: "rpt_pepe_warrior_001",
  projectId: "proj_pepe_warrior_001",
  caseId: "CASE-2025-0314-7F2A",
  verdict: "Viral but Fragile",
  confidence: 0.72,
  primaryCause:
    "High-energy war narrative drives rapid adoption but lacks doctrine depth to survive a sustained downturn",
  summary:
    "PepeWarrior taps into one of crypto's most potent archetypes: the battle meme. The warlord Pepe imagery is immediately recognizable and the community's battlefield language creates strong short-term tribal bonding. However, the project's narrative is almost entirely reactive to price action. Every pump is a 'victory' and every dump is an 'ambush,' which means the identity collapses the moment the market stops providing exciting plot points. There is no internal mythology, no lore beyond the fight itself, and no mechanism for the community to generate meaning independent of the chart. Viral reach is high but structural longevity is doubtful without a narrative evolution.",
  whyThisVerdict: [
    {
      reason: "War framing creates instant tribal identity",
      evidence:
        "Community posts consistently use military language (\"hold the line,\" \"deploy the reserves,\" \"fallen soldiers\") which accelerates in-group formation but ties identity entirely to price movement.",
    },
    {
      reason: "No lore layer beneath the surface metaphor",
      evidence:
        "There is no origin story for the Pepe Warrior character, no antagonist lore, and no escalating narrative arc. The war is purely reactive and has no scripted chapters.",
    },
    {
      reason: "High meme velocity but low meme half-life",
      evidence:
        "Memes are produced rapidly during pumps but they are interchangeable and do not reference each other. No canonical moments or recurring inside jokes have emerged.",
    },
    {
      reason: "Community energy is high but structurally shallow",
      evidence:
        "Telegram activity spikes with price but drops sharply during consolidation. There are no scheduled events, rituals, or recurring community activities beyond chart-watching.",
    },
  ],
  scores: {
    symbolicDensity: {
      score: 7.8,
      reading:
        "The armored Pepe warlord is visually striking and immediately memeable across platforms",
    },
    loreDepth: {
      score: 3.2,
      reading:
        "No origin myth, no evolving story arcs, no canonical events beyond price milestones",
    },
    ritualRepeatability: {
      score: 6.9,
      reading:
        "Battle cries are repeatable but lack structured cadence or escalation mechanics",
    },
    communityCohesion: {
      score: 5.8,
      reading:
        "Strong during volatility but community dissolves into silence during sideways action",
    },
    beliefElasticity: {
      score: 3.5,
      reading:
        "Narrative cannot reframe sustained losses as anything other than defeat",
    },
    narrativeSurvivability: {
      score: 4.1,
      reading:
        "Without an evolving story, the war metaphor exhausts itself within two to three market cycles",
    },
  },
  structureRisks: [
    {
      risk: "Price-coupled identity",
      evidence:
        "Over 80% of community messages directly reference price action. Identity and narrative are indistinguishable from chart performance.",
    },
    {
      risk: "Single-layer metaphor",
      evidence:
        "The war framing has no sub-narratives, factions, or evolving lore. Once the initial metaphor is consumed, there is nothing beneath it.",
    },
    {
      risk: "No governance or ritual structure",
      evidence:
        "There are no community votes, scheduled events, or formalized roles. Engagement is entirely spontaneous and unstructured.",
    },
  ],
  collapseTimeline: [
    {
      stage: "Viral Ignition",
      diagnosis:
        "The armored Pepe visual and battle-cry language spread rapidly across BSC degen channels and crypto Twitter.",
      evidence:
        "First 48 hours saw 3,200+ unique wallet holders and trending mentions on four.meme leaderboard.",
    },
    {
      stage: "Tribal Bonding",
      diagnosis:
        "Community coalesces around shared war language and diamond-hand identity signals during the initial pump.",
      evidence:
        "Telegram grew to 4,800 members in week one with high message velocity during green candles.",
    },
    {
      stage: "Narrative Stall",
      diagnosis:
        "After the first major correction, the war metaphor has no mechanism to reframe losses as anything other than defeat.",
      evidence:
        "Telegram activity dropped 67% during a 3-day consolidation period. No new memes or narratives emerged.",
    },
    {
      stage: "Attention Bleed",
      diagnosis:
        "Without narrative evolution, holders migrate to the next high-energy launch. The war ends not with a bang but with silence.",
      evidence:
        "Comparable four.meme launches with similar profiles showed 80%+ holder churn within 21 days.",
    },
  ],
  interventionPath: [
    {
      action: "Introduce a serialized lore arc with named antagonists and chapter-based milestones",
      why: "A scripted narrative gives the community plot points to rally around independent of price, extending engagement through anticipation rather than reaction.",
    },
    {
      action: "Create weekly War Council events with community voting on narrative direction",
      why: "Scheduled rituals generate baseline engagement during quiet markets and give holders a reason to return regardless of chart activity.",
    },
    {
      action: "Establish ranked community roles tied to participation rather than bag size",
      why: "An identity ladder beyond wallet value creates durable social investment and raises the psychological cost of exiting the community.",
    },
  ],
  warningFlags: [
    "No locked liquidity detected at time of analysis",
    "Top 10 wallets hold an estimated 38% of supply",
    "No verifiable team identity or prior project history",
    "Contract is not renounced",
  ],
  dataProvenance: ["DexScreener", "four.meme", "manual_input"],
  missingDataFlags: [
    "missing_holder_data",
    "missing_social_metrics",
    "no_audit_report",
  ],
  comparablePattern:
    "Mirrors early WOJAK and CHAD token launches: strong visual identity, intense first week, rapid decay once the meme is consumed without narrative refill",
  inputSnapshot: {
    contractAddress: pepeWarriorAddress,
    chain: "bsc",
    launchPlatform: "four.meme",
    projectName: "PepeWarrior",
    symbol: "PEPEW",
  },
  createdAt: "2025-03-28T16:22:00.000Z",
};

// --- Demo Case 2: ChainMonk ---

const chainMonkAddress = "0x7B2e5A3d1C8F4a6E9D0b7c5F2A1e3B8d6C4f9A02";

const chainMonkProject: Project = {
  id: "proj_chain_monk_001",
  name: "ChainMonk",
  symbol: "CMONK",
  contract_address: chainMonkAddress,
  chain: "bsc",
  launchPlatform: "four.meme",
  websiteUrl: "https://chainmonk.xyz",
  description:
    "ChainMonk frames crypto trading as a spiritual discipline. Holders are 'monks' who practice patience, meditation on charts, and detachment from FUD. The project blends Eastern philosophy aesthetics with degen trading culture, creating an ironic but oddly sincere community identity.",
  created_at: "2025-02-19T12:00:00.000Z",
  updated_at: "2025-03-22T09:15:00.000Z",
};

const chainMonkReport: ForensicReport = {
  id: "rpt_chain_monk_001",
  projectId: "proj_chain_monk_001",
  caseId: "CASE-2025-0219-3B8E",
  verdict: "Stable Cult Potential",
  confidence: 0.84,
  primaryCause:
    "Mission-driven identity framework with layered philosophy, structured rituals, and a durable enemy archetype that can absorb market volatility",
  summary:
    "ChainMonk is a rare specimen in the BSC meme landscape: a project whose narrative actually deepens under pressure rather than cracking. The monk framing transforms typical degen behavior into a disciplined practice, which means dips become 'tests of patience' and FUD becomes 'noise to transcend.' This is structurally resilient because the narrative does not depend on price going up to remain coherent. The community has organically developed tiered identity markers (Novice, Disciple, Elder Monk) and daily rituals ('Morning Meditation' chart reviews, 'Evening Sutras' alpha threads). The philosophical backbone gives contributors raw material to generate new content indefinitely. The primary risk is over-seriousness: if the ironic layer collapses and the project becomes genuinely preachy, it will lose the degen audience that makes it culturally relevant.",
  whyThisVerdict: [
    {
      reason: "Narrative survives and strengthens during downturns",
      evidence:
        "During a 45% drawdown in week three, community activity actually increased by 22%. Members posted 'meditation on loss' threads and reframed the dip as 'the great silence before enlightenment.' The narrative absorbed the shock.",
    },
    {
      reason: "Multi-layered identity system creates durable social investment",
      evidence:
        "Community members self-assign monk ranks based on hold duration and participation. These ranks are referenced in conversation and meme creation, creating social capital that is lost upon selling.",
    },
    {
      reason: "The enemy archetype is permanent and emotionally resonant",
      evidence:
        "ChainMonk positions FUD, panic sellers, and rug-pull devs as 'agents of chaos' that monks must transcend. This enemy never disappears, providing indefinite narrative fuel.",
    },
    {
      reason: "Content generation is self-sustaining through philosophical source material",
      evidence:
        "The blend of Eastern philosophy with crypto jargon creates a nearly infinite content template. Community members produce original 'sutras,' 'koans,' and 'meditations' without requiring dev-led content.",
    },
  ],
  scores: {
    symbolicDensity: {
      score: 8.4,
      reading:
        "The monk-in-the-market archetype is visually distinctive and emotionally resonant across cultures",
    },
    loreDepth: {
      score: 7.9,
      reading:
        "Philosophy provides deep source material and the community actively builds canonical lore through sutras and koans",
    },
    ritualRepeatability: {
      score: 8.7,
      reading:
        "Daily meditations, weekly sutra drops, and rank progression create structured recurring engagement",
    },
    communityCohesion: {
      score: 8.1,
      reading:
        "Tiered identity system and shared philosophical language create strong in-group bonding with clear insider markers",
    },
    beliefElasticity: {
      score: 7.6,
      reading:
        "The detachment philosophy is specifically designed to absorb market stress and reframe adversity as growth",
    },
    narrativeSurvivability: {
      score: 8.2,
      reading:
        "The mission transcends price action and can evolve indefinitely through new philosophical content and community canon",
    },
  },
  structureRisks: [
    {
      risk: "Irony collapse risk",
      evidence:
        "The project balances ironic detachment with genuine community sincerity. If the ironic layer disappears, the tone becomes preachy and alienates the degen core audience.",
    },
    {
      risk: "Over-reliance on organic leadership",
      evidence:
        "Three to four prolific community members produce the majority of canonical content. If these contributors leave, content quality and ritual consistency could degrade rapidly.",
    },
  ],
  collapseTimeline: [
    {
      stage: "Spiritual Ignition",
      diagnosis:
        "The monk aesthetic and philosophical tone cut through the noise of typical BSC meme launches, attracting curiosity from both degens and philosophy-adjacent crypto users.",
      evidence:
        "Launch day saw organic Twitter engagement 3x higher than comparable four.meme tokens, driven by the novelty of the monk-meets-degen framing.",
    },
    {
      stage: "Ritual Entrenchment",
      diagnosis:
        "Daily and weekly rituals become habitual for core holders. The identity system creates switching costs that go beyond financial investment.",
      evidence:
        "By week two, Morning Meditation threads averaged 120+ participants and Elder Monk ranks were referenced in 40% of community messages.",
    },
    {
      stage: "Doctrine Testing",
      diagnosis:
        "A major market correction tests whether the philosophical framing holds under genuine financial stress or whether it was just a bull-market aesthetic.",
      evidence:
        "The 45% drawdown in week three was the critical test. Community retention at 78% through the dip confirms the narrative has structural resilience beyond speculation.",
    },
    {
      stage: "Canon Expansion or Stagnation",
      diagnosis:
        "Long-term survival depends on whether the community continues producing fresh canonical content or whether the philosophical well runs dry.",
      evidence:
        "Current trajectory shows 15-20 new community sutras per week. If this rate drops below 5, narrative fatigue becomes likely within 60 days.",
    },
  ],
  interventionPath: [
    {
      action: "Formalize the rank system with on-chain attestations or soul-bound tokens",
      why: "On-chain identity markers make social investment tangible and visible, dramatically increasing the psychological cost of leaving the community.",
    },
    {
      action: "Establish a rotating 'Abbot' role for community content curation to distribute leadership",
      why: "Reducing dependence on a small number of prolific contributors makes the content pipeline resilient against individual contributor attrition.",
    },
    {
      action: "Introduce seasonal 'Pilgrimage' narrative arcs with milestone-based community goals",
      why: "Seasonal arcs create anticipation cycles and give the community shared objectives that are independent of price targets, sustaining engagement through flat markets.",
    },
  ],
  warningFlags: [
    "Liquidity lock expires in 90 days — renewal commitment not yet confirmed",
    "Top 10 wallets hold approximately 24% of supply",
    "No formal audit but contract is a standard four.meme template",
  ],
  dataProvenance: ["DexScreener", "four.meme", "manual_input", "BscScan"],
  missingDataFlags: ["missing_holder_data", "no_audit_report"],
  comparablePattern:
    "Echoes the early trajectory of Cult DAO and to a lesser extent Bitcoin maximalist culture: ideological conviction as the primary cohesion engine, with identity investment replacing financial logic as the core retention mechanism",
  inputSnapshot: {
    contractAddress: chainMonkAddress,
    chain: "bsc",
    launchPlatform: "four.meme",
    projectName: "ChainMonk",
    symbol: "CMONK",
  },
  createdAt: "2025-03-22T09:15:00.000Z",
};

// --- Assembled demo cases ---

export const demoCases: DemoCase[] = [
  {
    contractAddress: pepeWarriorAddress,
    project: pepeWarriorProject,
    report: pepeWarriorReport,
  },
  {
    contractAddress: chainMonkAddress,
    project: chainMonkProject,
    report: chainMonkReport,
  },
];

/**
 * Look up a demo case by contract address (case-insensitive).
 * Returns undefined if no match is found.
 */
export function getDemoCaseByAddress(address: string): DemoCase | undefined {
  const normalized = address.toLowerCase();
  return demoCases.find(
    (c) => c.contractAddress.toLowerCase() === normalized,
  );
}

/**
 * Return the first demo case (PepeWarrior) as the default.
 */
export function getDefaultDemoCase(): DemoCase {
  return demoCases[0];
}
