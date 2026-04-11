import type { AutopsyReport, FormData } from "@/lib/types";

// ── DogePriest: Viral but Fragile (Open Examination) ──
const dogePriestReport: AutopsyReport = {
  caseId: "MA-2026-0417",
  specimenName: "DogePriest",
  contractAddress: "0x3a...f7c2",
  chain: "BSC",
  sourceOrigin: "four.meme",
  intakeTime: "2026-04-11T14:32:00.000Z",
  examinationStatus: "Opinion Issued",
  pronouncedCondition: "Viral but Fragile",
  launchContext: "Launched via four.meme as a religious-irony meme project combining dog culture with prophetic framing.",
  synopsis: "DogePriest is a meme project built around the idea of a holy dog prophet guiding holders through market chaos. It uses religious irony, prophecy language, and anti-establishment humor.",
  evidenceSources: [
    { name: "four.meme", status: "acquired", timestamp: "2026-04-11T14:32:10Z" },
    { name: "DexScreener", status: "acquired", timestamp: "2026-04-11T14:32:15Z" },
    { name: "BscScan", status: "partial", timestamp: "2026-04-11T14:32:20Z" },
    { name: "Narrative Sources", status: "acquired", timestamp: "2026-04-11T14:32:25Z" },
  ],
  confidenceOfDetermination: 72,
  diagnosticProtocol: {
    surfaceSignals: { score: 84, reading: "Strong religious iconography fused with internet dog culture creates high initial legibility and spreadability." },
    structuralIntegrity: { score: 46, reading: "Surface-level prophetic framing without layered mythology. Doctrine is thin, identity formation active but shallow." },
    degenerationFactors: { score: 71, reading: "High concentration risk with weak cohesion. Ritual energy appears price-reactive rather than identity-driven." },
    survivalCapacity: { score: 38, reading: "Narrative cannot absorb contradiction or external pressure. Low adaptive resilience with no evidence of post-launch myth expansion." },
  },
  scores: {
    symbolicDensity: { score: 86, reading: "Strong religious iconography fused with internet dog culture" },
    loreDepth: { score: 52, reading: "Surface-level prophetic framing without layered mythology" },
    ritualRepeatability: { score: 88, reading: "Catchphrases are highly shareable but lack structured ritual cadence" },
    communityCohesion: { score: 63, reading: "Identity formation is active but doctrine is thin" },
    beliefElasticity: { score: 47, reading: "Narrative cannot absorb contradiction or external pressure" },
    narrativeSurvivability: { score: 42, reading: "Initial hook is strong but lacks recursive narrative depth" },
  },
  externalExamination: {
    surfaceFindings: "The specimen presents with strong visual iconography combining religious symbolism with internet dog culture. Surface branding is immediately distinctive and memorable.",
    visibleMarkings: [
      "Religious dog prophet archetype",
      "Prophetic language in launch description",
      "Anti-establishment humor framing",
      "Price movements framed as divine events",
    ],
    surfaceCondition: "Surface presentation is polished and distinctive. High initial signal density.",
    initialSignalProfile: "Examination indicates strong symbolic pull with high compression. The religious-irony fusion creates immediate pattern recognition across crypto-native audiences.",
  },
  internalExamination: {
    narrativeTissueAnalysis: "Narrative tissue appears thin. The prophet-dog archetype is visually strong but narratively shallow — there is no origin story or evolving doctrine. Community language is memetically potent in isolation but lacks connective tissue between phrases.",
    structuralCondition: "Structural integrity is compromised by the absence of expandable lore. The religious framing is compelling but ultimately decorative without layered mythology to back it up.",
    cohesionFindings: "Community cohesion is moderate. Price-action rituals ('blessings' and 'tests of faith') create engagement spikes but not durable belief. No clear escalation path from ironic humor to genuine community mission.",
    beliefArchitecture: "Belief architecture relies entirely on the initial symbolic hook. No evidence of doctrine formation, enemy framing, or worldview construction that could sustain conviction beyond novelty.",
  },
  pathologyFindings: [
    { alert: "Narrative exhaustion risk", evidence: "No expandable myth arc or adversarial worldview identified in the evidence set", severity: "severe" },
    { alert: "Price-reactive community behavior", evidence: "Community participation appears price-reactive rather than identity-driven", severity: "severe" },
    { alert: "Holder concentration fragility", evidence: "Top 10 holders control >40% of supply with weak doctrinal binding", severity: "moderate" },
    { alert: "Doctrine-free identity", evidence: "Repeatable slogans exist without expandable lore or mission structure", severity: "terminal" },
  ],
  mechanismOfVirality: {
    hypothesis: "Initial spread was driven by high symbolic compression — the religious-dog fusion created immediate novelty and pattern recognition.",
    evidence: "Launch description from four.meme contains concentrated religious irony. Community phrases show high repeatability. Slogan compression is unusually strong, supported by repeated priest and altar motifs across launch text and slogan variants.",
    conclusion: "Virality was primarily symbol-driven rather than community-driven. The project achieved spread through novelty and compression, not through deeper conviction or identity formation.",
  },
  mechanismOfDeathOrSurvival: {
    hypothesis: "The project will likely experience narrative exhaustion following novelty-driven spread, as no internal mechanism exists to replace the initial attention hook.",
    evidence: "Lore depth remains shallow with no expandable myth arc. Ritual repeatability is high but most rituals appear reactive to price movement. No evidence of post-launch adaptation or doctrine expansion.",
    conclusion: "Evidence suggests a trajectory toward narrative exhaustion. Without doctrine formation or enemy framing, the religious irony will flatten through repetition. The transition from launch energy to sustained belief requires structural elements that are not present.",
  },
  stageOfDecay: "Active but entering early decay phase. Novelty energy is present but structural elements for long-term survival are absent.",
  estimatedFailureWindow: "2-6 weeks without structural intervention",
  degenerationTimeline: [
    { phase: "Launch", description: "Strong initial symbolic compression creates rapid spread. Religious-irony fusion drives high surface engagement.", severity: "mild" },
    { phase: "Early Traction", description: "Novelty energy sustains participation. Price-reactive rituals emerge ('blessings', 'tests of faith').", severity: "mild" },
    { phase: "Structural Exposure", description: "Absence of expandable lore becomes apparent. Repetition of same phrases without narrative evolution.", severity: "moderate" },
    { phase: "Narrative Exhaustion", description: "Religious irony flattens through repetition. Community engagement decouples from identity, re-couples to price.", severity: "severe" },
    { phase: "Projected Failure", description: "Without doctrine formation or mission framing, belief architecture collapses under first sustained drawdown.", severity: "terminal" },
  ],
  primaryCauseOfDeath: "Narrative exhaustion following novelty-driven spread",
  contributingFactors: [
    { factor: "Shallow lore depth", evidence: "No expandable myth arc identified" },
    { factor: "Absent enemy framing", evidence: "No adversarial worldview in evidence set" },
    { factor: "Weak internal mission", evidence: "No mission beyond ironic humor" },
    { factor: "Low belief elasticity", evidence: "Narrative cannot absorb contradiction" },
    { factor: "Price-reactive participation", evidence: "Community rituals tied to price, not identity" },
  ],
  mannerOfDeath: "Natural decay",
  survivalOutlook: "Pre-terminal",
  evidenceLog: {
    keyQuotes: [
      '"the prophecy has begun"',
      '"non-believers will cope"',
      '"every dip is a test of faith"',
      '"the blessed hold"',
      '"we do not sell, we ascend"',
    ],
    marketEvidence: ["Market Cap: $42.1K (DexScreener)", "Holders: 1,247 (BscScan)", "Liquidity: $12.3K"],
    holderEvidence: ["Top 10 holders: ~42% of supply", "Holder visibility: partial"],
    narrativeEvidence: [
      "Launch description uses concentrated religious irony",
      "Community phrases are highly repeatable but contextually narrow",
      "No evidence of evolving doctrine or myth expansion",
    ],
  },
  finalOpinion: "DogePriest presents as a specimen with strong initial symbolic compression but critically deficient structural integrity. The religious-irony fusion created effective surface-level virality, but examination reveals no expandable lore, no doctrine formation, and no adaptive mechanisms. Evidence suggests the project's narrative will exhaust after the novelty period unless structural intervention introduces mission framing, enemy construction, or expandable mythology. Determination issued with moderate confidence due to partial holder visibility.",
  uncertaintyNotes: [
    "Determination limited by partial holder visibility from BscScan.",
    "Evidence suggests, but does not conclusively establish, post-launch identity persistence.",
    "The available record supports a probable mechanism rather than a definitive historical cause.",
  ],
  inputSnapshot: {
    contractAddress: "0x3a...f7c2",
    sceneNotes: "Religious irony meme project on BSC. Community uses prophecy language and anti-establishment humor.",
    launchPlatform: "four.meme",
  },
};

// ── BananaFax: Dead on Arrival (Terminal Specimen) ──
const bananaFaxReport: AutopsyReport = {
  caseId: "MA-2026-0418",
  specimenName: "BananaFax",
  contractAddress: "0x7b...c4d1",
  chain: "BSC",
  sourceOrigin: "four.meme",
  intakeTime: "2026-04-11T15:10:00.000Z",
  examinationStatus: "Opinion Issued",
  pronouncedCondition: "Dead on Arrival",
  launchContext: "Launched via four.meme as a random absurdity meme project with no structural narrative.",
  synopsis: "BananaFax is a meme token based on the idea that monkeys send alpha through banana-powered fax machines. The brand is random, surreal, and intentionally stupid.",
  evidenceSources: [
    { name: "four.meme", status: "acquired", timestamp: "2026-04-11T15:10:08Z" },
    { name: "DexScreener", status: "acquired", timestamp: "2026-04-11T15:10:12Z" },
    { name: "BscScan", status: "acquired", timestamp: "2026-04-11T15:10:18Z" },
    { name: "Narrative Sources", status: "unavailable" },
  ],
  confidenceOfDetermination: 85,
  diagnosticProtocol: {
    surfaceSignals: { score: 45, reading: "Random absurdity creates novelty but no symbolic anchoring. Interchangeable branding." },
    structuralIntegrity: { score: 12, reading: "No lore, no doctrine, no community identity architecture. Narrative anatomy is absent." },
    degenerationFactors: { score: 89, reading: "Complete dependence on novelty. No mechanisms to prevent attention decay." },
    survivalCapacity: { score: 8, reading: "Zero adaptive resilience. No belief elasticity, no ritual persistence, no mission." },
  },
  scores: {
    symbolicDensity: { score: 35, reading: "Random imagery without symbolic coherence" },
    loreDepth: { score: 8, reading: "No mythology, no expandable lore" },
    ritualRepeatability: { score: 42, reading: "Some repeatable phrases but no ritual structure" },
    communityCohesion: { score: 15, reading: "No community identity beyond shared absurdity" },
    beliefElasticity: { score: 5, reading: "No belief system to test" },
    narrativeSurvivability: { score: 10, reading: "Narrative has no survival mechanism" },
  },
  externalExamination: {
    surfaceFindings: "The specimen presents with random absurdist imagery. No symbolic anchoring or cultural resonance detected.",
    visibleMarkings: ["Banana + fax machine combination", "Monkey imagery", "Random surreal humor"],
    surfaceCondition: "Surface is chaotic and interchangeable. No distinctive branding that couldn't be replaced by any other random concept.",
    initialSignalProfile: "Novelty-only spread. Low symbolic stickiness. Interchangeable branding.",
  },
  internalExamination: {
    narrativeTissueAnalysis: "No narrative tissue detected. The project consists entirely of surface-level absurdity with no internal structure.",
    structuralCondition: "Structural integrity is essentially absent. There is no lore, no doctrine, no community identity to analyze.",
    cohesionFindings: "No community cohesion mechanisms identified. Participation appears entirely novelty-driven.",
    beliefArchitecture: "No belief architecture exists. There is nothing to believe in beyond the initial joke.",
  },
  pathologyFindings: [
    { alert: "Complete narrative absence", evidence: "No lore, doctrine, or expandable mythology in any evidence source", severity: "terminal" },
    { alert: "Novelty-only virality", evidence: "All spread indicators are novelty-dependent with zero structural support", severity: "terminal" },
    { alert: "Interchangeable identity", evidence: "Branding could be replaced by any random concept without behavioral change", severity: "terminal" },
  ],
  mechanismOfVirality: {
    hypothesis: "Initial spread was entirely novelty-driven — random absurdity creates momentary curiosity.",
    evidence: "Launch phrasing relies on surreal humor. No symbolic anchoring or cultural resonance detected in any source.",
    conclusion: "Virality was novelty-only. No deeper mechanism supported spread.",
  },
  mechanismOfDeathOrSurvival: {
    hypothesis: "The project was structurally dead on arrival — no internal mechanism existed to sustain attention past novelty.",
    evidence: "Zero lore depth, zero doctrine, zero community identity. All engagement metrics are novelty-dependent.",
    conclusion: "Structural incoherence under scale. The specimen lacked any survival mechanism from inception.",
  },
  stageOfDecay: "Terminal. Specimen was structurally dead on arrival.",
  degenerationTimeline: [
    { phase: "Launch", description: "Random absurdity creates brief novelty curiosity. No symbolic anchoring.", severity: "moderate" },
    { phase: "Immediate Decay", description: "Zero structural support. No community formation mechanisms activate.", severity: "severe" },
    { phase: "Death", description: "Complete narrative absence leads to instant abandonment. Specimen was dead on arrival.", severity: "terminal" },
  ],
  primaryCauseOfDeath: "Slogan-only virality without doctrine formation",
  contributingFactors: [
    { factor: "No lore depth", evidence: "Zero expandable mythology" },
    { factor: "No community identity", evidence: "No identity language detected" },
    { factor: "No belief system", evidence: "Nothing to sustain conviction" },
    { factor: "Interchangeable branding", evidence: "Concept is fully replaceable" },
  ],
  mannerOfDeath: "Structural failure",
  evidenceLog: {
    keyQuotes: ['"banana alpha incoming"', '"fax the pump"', '"monkey line busy"', '"trust the fax"'],
    marketEvidence: ["Market Cap: $2.1K (DexScreener)", "Holders: 89 (BscScan)", "Liquidity: $800"],
    holderEvidence: ["Top 10 holders: ~78% of supply", "Severe concentration"],
    narrativeEvidence: ["No narrative structure detected", "All language is surface-level absurdity"],
  },
  finalOpinion: "BananaFax is pronounced Dead on Arrival. The specimen possessed no internal narrative anatomy, no doctrine, no community identity architecture, and no adaptive mechanisms. Initial spread was entirely novelty-driven with no structural support. This is a textbook case of slogan-only virality without doctrine formation. Determination issued with high confidence.",
  uncertaintyNotes: [
    "Narrative source data was unavailable. Opinion is based on available launch context and market data.",
  ],
  inputSnapshot: {
    contractAddress: "0x7b...c4d1",
    sceneNotes: "Random absurdity meme project. Monkeys sending alpha through banana fax machines.",
    launchPlatform: "four.meme",
  },
};

// ── SaintMeme: Stable Cult Potential (Preserved Specimen) ──
const saintMemeReport: AutopsyReport = {
  caseId: "MA-2026-0419",
  specimenName: "SaintMeme",
  contractAddress: "0x9f...a2e8",
  chain: "BSC",
  sourceOrigin: "four.meme",
  intakeTime: "2026-04-11T16:05:00.000Z",
  examinationStatus: "Opinion Issued",
  pronouncedCondition: "Stable Cult Potential",
  launchContext: "Launched via four.meme as a counter-culture movement framing meme creation as spiritual warfare against corporate content.",
  synopsis: "SaintMeme is a meme movement framing itself as the last defense against dead internet culture. It treats meme creation as spiritual warfare against bland, corporate content.",
  evidenceSources: [
    { name: "four.meme", status: "acquired", timestamp: "2026-04-11T16:05:10Z" },
    { name: "DexScreener", status: "acquired", timestamp: "2026-04-11T16:05:14Z" },
    { name: "BscScan", status: "acquired", timestamp: "2026-04-11T16:05:20Z" },
    { name: "Narrative Sources", status: "acquired", timestamp: "2026-04-11T16:05:28Z" },
  ],
  confidenceOfDetermination: 81,
  diagnosticProtocol: {
    surfaceSignals: { score: 72, reading: "Mission-driven framing with strong cultural contrast. Less compression than pure meme projects but deeper resonance." },
    structuralIntegrity: { score: 78, reading: "Strong doctrine presence with expandable worldview. Enemy framing creates durable narrative tension." },
    degenerationFactors: { score: 35, reading: "Moderate concentration risk offset by strong doctrinal binding. Community appears identity-driven rather than price-reactive." },
    survivalCapacity: { score: 74, reading: "Evidence of adaptive resilience through canon expansion and remix challenges. Mission cohesion is high." },
  },
  scores: {
    symbolicDensity: { score: 68, reading: "Mission-driven rather than symbol-first, but distinctive" },
    loreDepth: { score: 82, reading: "Rich expandable mythology with canon texts and remix culture" },
    ritualRepeatability: { score: 76, reading: "Structured rituals beyond price action — canon drops, remix challenges" },
    communityCohesion: { score: 85, reading: "Strong identity-driven participation with role language" },
    beliefElasticity: { score: 71, reading: "Worldview can absorb setbacks through enemy-framing reinterpretation" },
    narrativeSurvivability: { score: 79, reading: "Narrative has expansion mechanisms and adaptive resilience" },
  },
  externalExamination: {
    surfaceFindings: "The specimen presents with counter-cultural mission framing. Less immediately memetic than pure symbol projects but carries deeper cultural weight.",
    visibleMarkings: [
      "Spiritual warfare against corporate content",
      "Canon text system",
      "Remix challenge rituals",
      "Conversion language instead of engagement language",
    ],
    surfaceCondition: "Surface presentation is distinctive but requires more engagement to understand than pure symbol projects.",
    initialSignalProfile: "Mission-led spread rather than novelty-led. Lower initial compression but higher structural depth.",
  },
  internalExamination: {
    narrativeTissueAnalysis: "Narrative tissue is well-developed. The project possesses a coherent worldview (dead internet vs sacred meme), an enemy (corporate content), and expandable doctrine (canon texts, remix challenges).",
    structuralCondition: "Structural integrity is strong. The project has internal logic that supports expansion without contradicting its core identity.",
    cohesionFindings: "Community cohesion is high. Participation is identity-driven with role language ('we convert, not engage'). Rituals persist beyond price action.",
    beliefArchitecture: "Belief architecture is mission-led with elastic worldview. The enemy-framing allows setbacks to be reinterpreted as resistance rather than failure.",
  },
  pathologyFindings: [
    { alert: "Moderate holder concentration", evidence: "Top 10 holders at ~28% — manageable but worth monitoring", severity: "mild" },
    { alert: "Niche appeal limitation", evidence: "Mission framing may limit mainstream adoption", severity: "moderate" },
  ],
  mechanismOfVirality: {
    hypothesis: "Spread was driven by mission resonance rather than symbolic novelty — the counter-cultural framing attracted conviction-driven participation.",
    evidence: "Community language uses conversion framing ('we convert, not engage'). Canon text system creates participation rituals. Enemy framing against corporate content provides durable narrative tension.",
    conclusion: "Virality was mission-driven with strong identity anchoring. This suggests higher long-term retention than novelty-driven projects.",
  },
  mechanismOfDeathOrSurvival: {
    hypothesis: "The project possesses active survival mechanisms — mission cohesion, doctrine expansion, and elastic belief architecture create adaptive resilience.",
    evidence: "Canon drops and remix challenges create recurring engagement. Enemy framing allows setback absorption. Community language is identity-bound rather than price-reactive.",
    conclusion: "Evidence suggests sustained survival capacity. The project has structural elements for long-term cohesion provided mission intensity is maintained.",
  },
  stageOfDecay: "Preserved. Active survival mechanisms are present and functioning.",
  degenerationTimeline: [
    { phase: "Launch", description: "Mission-led framing creates strong initial identity. Counter-cultural positioning attracts conviction-first participants.", severity: "mild" },
    { phase: "Growth", description: "Canon text system and remix challenges create expandable lore. Community develops role language.", severity: "mild" },
    { phase: "Stress Test", description: "Market drawdown absorbed through enemy-framing reinterpretation. Belief elasticity holds.", severity: "mild" },
    { phase: "Stabilization", description: "Survival mechanisms active: doctrine expansion, ritual persistence, community retention logic functioning.", severity: "mild" },
  ],
  primaryCauseOfDeath: "N/A — Specimen is alive",
  primarySurvivalMechanism: "Mission-led cohesion with elastic belief reframing",
  survivalOutlook: "Guarded",
  contributingFactors: [
    { factor: "Strong enemy framing", evidence: "Durable narrative tension against corporate content" },
    { factor: "Canon expansion system", evidence: "Recurring doctrine drops maintain engagement" },
    { factor: "Identity-driven participation", evidence: "Community rituals persist beyond price action" },
    { factor: "Elastic worldview", evidence: "Setbacks can be reinterpreted through mission lens" },
  ],
  mannerOfDeath: "Undetermined",
  evidenceLog: {
    keyQuotes: [
      '"the feed has fallen"',
      '"post with conviction"',
      '"content is dead, meme is sacred"',
      '"we do not engage, we convert"',
    ],
    marketEvidence: ["Market Cap: $185K (DexScreener)", "Holders: 3,412 (BscScan)", "Liquidity: $45K"],
    holderEvidence: ["Top 10 holders: ~28% of supply", "Distribution improving over time"],
    narrativeEvidence: [
      "Canon text system creates structured engagement",
      "Remix challenges provide recurring participation incentive",
      "Enemy framing persists across market conditions",
    ],
  },
  finalOpinion: "SaintMeme is pronounced as possessing Stable Cult Potential. The specimen demonstrates strong structural integrity with active survival mechanisms including mission-led cohesion, doctrine expansion through canon texts, and elastic belief architecture. While surface-level viral compression is lower than pure symbol projects, the deeper structural elements suggest higher long-term survivability. Survival outlook is Guarded, dependent on continued mission intensity and canon expansion. Determination issued with moderate-high confidence.",
  uncertaintyNotes: [
    "Long-term mission persistence cannot be conclusively predicted from current evidence.",
    "Niche appeal may limit growth trajectory — structural strength does not guarantee scale.",
  ],
  inputSnapshot: {
    contractAddress: "0x9f...a2e8",
    sceneNotes: "Counter-culture meme movement. Spiritual warfare against dead internet. Canon texts and remix challenges.",
    launchPlatform: "four.meme",
  },
};

// ── MoonChadz: Chaos Without Cohesion (Terminal — Price-dependent identity collapse) ──
const moonChadzReport: AutopsyReport = {
  caseId: "MA-2026-0420",
  specimenName: "MoonChadz",
  contractAddress: "0x4e...d3a9",
  chain: "BSC",
  sourceOrigin: "four.meme",
  intakeTime: "2026-04-10T09:15:00.000Z",
  examinationStatus: "Opinion Issued",
  pronouncedCondition: "Chaos Without Cohesion",
  launchContext: "Launched via four.meme as an aggressive alpha-male trading culture token centered on gains, flexing, and market dominance.",
  synopsis: "MoonChadz positioned itself as a hypermasculine trading cult — all engagement was price-anchored. When the market turned, the identity collapsed because nothing existed beyond price.",
  evidenceSources: [
    { name: "four.meme", status: "acquired", timestamp: "2026-04-10T09:15:08Z" },
    { name: "DexScreener", status: "acquired", timestamp: "2026-04-10T09:15:14Z" },
    { name: "BscScan", status: "acquired", timestamp: "2026-04-10T09:15:20Z" },
    { name: "Narrative Sources", status: "partial", timestamp: "2026-04-10T09:15:30Z" },
  ],
  confidenceOfDetermination: 79,
  diagnosticProtocol: {
    surfaceSignals: { score: 62, reading: "Aggressive alpha framing creates recognition but lacks symbolic depth." },
    structuralIntegrity: { score: 22, reading: "Identity entirely price-constructed. No lore, doctrine, or mission." },
    degenerationFactors: { score: 88, reading: "Extreme price-dependence. Community evaporated during 60% drawdown." },
    survivalCapacity: { score: 11, reading: "Zero adaptive resilience. Identity IS price." },
  },
  scores: {
    symbolicDensity: { score: 55, reading: "Chad/alpha imagery recognizable but culturally generic" },
    loreDepth: { score: 12, reading: "No mythology — only price narratives" },
    ritualRepeatability: { score: 68, reading: "High ritual energy but entirely price-reactive" },
    communityCohesion: { score: 18, reading: "Community dissolved under drawdown" },
    beliefElasticity: { score: 8, reading: "Cannot absorb price decline" },
    narrativeSurvivability: { score: 14, reading: "No narrative beyond price performance" },
  },
  externalExamination: {
    surfaceFindings: "Aggressive trading culture imagery. Loud, price-focused, and culturally generic.",
    visibleMarkings: ["Chad/alpha male archetypes", "Rocket and moon iconography", "Screenshots of gains as content", "Flexing language dominates all channels"],
    surfaceCondition: "High-energy but interchangeable with dozens of similar projects.",
    initialSignalProfile: "Price-anchored identity with no symbolic differentiation.",
  },
  internalExamination: {
    narrativeTissueAnalysis: "No narrative tissue exists independent of price. Every artifact references gains, charts, or market position.",
    structuralCondition: "Critically absent. No internal logic beyond 'number go up.'",
    cohesionFindings: "Cohesion collapsed during 60% drawdown. Holder count dropped 70% in 48 hours.",
    beliefArchitecture: "Belief architecture is price itself. When price failed, belief failed.",
  },
  pathologyFindings: [
    { alert: "Price-dependent identity", evidence: "100% of community language references price or gains", severity: "terminal" },
    { alert: "Community fragmentation under drawdown", evidence: "70% holder flight within 48 hours", severity: "terminal" },
    { alert: "Zero narrative resilience", evidence: "No reframing or belief-preserving behavior during stress", severity: "severe" },
    { alert: "Concentrated early holders", evidence: "Top 5 wallets controlled 55%, aggressive sell-off triggered cascade", severity: "severe" },
  ],
  mechanismOfVirality: {
    hypothesis: "Spread driven by price performance and FOMO rather than narrative resonance.",
    evidence: "Growth correlated exactly with price increases. No organic content beyond gain screenshots.",
    conclusion: "Virality was entirely market-driven. No independent spread mechanism.",
  },
  mechanismOfDeathOrSurvival: {
    hypothesis: "Price-dependent identity collapse — when chart turned, community identity disintegrated.",
    evidence: "60% decline triggered 70% holder exodus. Channels silent within 72 hours. Top holders sold first.",
    conclusion: "Decisive mechanism: price-dependent identity collapse under drawdown, accelerated by concentrated sell-off.",
  },
  stageOfDecay: "Terminal. Community channels inactive for 14+ days. No recovery signals.",
  estimatedFailureWindow: "Collapse within 72 hours of initial drawdown",
  degenerationTimeline: [
    { phase: "Launch", description: "Alpha-male trading culture creates immediate tribal identity. High engagement through competition framing.", severity: "mild" },
    { phase: "Peak Hype", description: "Price surge reinforces identity. 'Diamond hands' language masks structural weakness.", severity: "moderate" },
    { phase: "Drawdown", description: "Price decline triggers identity crisis. Participation rapidly decouples from community, recouples to exit strategy.", severity: "severe" },
    { phase: "Collapse", description: "Concentrated holders exit. Remaining community fragments. No belief mechanism survives price action.", severity: "terminal" },
  ],
  primaryCauseOfDeath: "Price-dependent identity collapse under drawdown pressure",
  contributingFactors: [
    { factor: "Zero narrative beyond price", evidence: "All content references market performance" },
    { factor: "Concentrated holder sell-off", evidence: "Top 5 wallets dumped during drawdown" },
    { factor: "No adaptive resilience", evidence: "No attempt to reframe setback" },
    { factor: "Generic branding", evidence: "Interchangeable alpha-male trading culture" },
  ],
  mannerOfDeath: "Market-shock accelerated decline",
  evidenceLog: {
    keyQuotes: ['"we only go up"', '"paper hands get rekt"', '"chad holders never sell"', '"where lambo"'],
    marketEvidence: ["Peak Cap: $320K", "Current: $8.2K (97% decline)", "Liquidity: $1.2K"],
    holderEvidence: ["Peak holders: 4,200", "Current: ~380", "Top 5 sold 85% of holdings"],
    narrativeEvidence: ["No content beyond price commentary", "Telegram inactive 14+ days"],
  },
  finalOpinion: "MoonChadz is pronounced Chaos Without Cohesion. Textbook price-dependent identity collapse. All identity was price-constructed; when the chart declined, identity disintegrated completely. No adaptive mechanism, no reframing, no residual belief. Concentrated holder structure accelerated collapse. Determination issued with moderate-high confidence.",
  uncertaintyNotes: [
    "Narrative source data was partial.",
    "Concentrated sell-off may have been coordinated, but evidence insufficient to determine intent.",
  ],
  inputSnapshot: { contractAddress: "0x4e...d3a9", sceneNotes: "Alpha-male trading culture token. Collapsed after drawdown.", launchPlatform: "four.meme" },
};

// ── GhostDAO: Short-Term Attention Trap (Terminal — Self-inflicted collapse via community fragmentation) ──
const ghostDAOReport: AutopsyReport = {
  caseId: "MA-2026-0421",
  specimenName: "GhostDAO",
  contractAddress: "0x2c...e5b7",
  chain: "BSC",
  sourceOrigin: "four.meme",
  intakeTime: "2026-04-09T11:22:00.000Z",
  examinationStatus: "Opinion Issued",
  pronouncedCondition: "Short-Term Attention Trap",
  launchContext: "Launched via four.meme as a ghost-themed DAO governance project with spectral council lore.",
  synopsis: "GhostDAO combined ghost mythology with DAO governance. Initial narrative was compelling but community fragmented into competing factions claiming authority over the 'ghost council.'",
  evidenceSources: [
    { name: "four.meme", status: "acquired", timestamp: "2026-04-09T11:22:10Z" },
    { name: "DexScreener", status: "acquired", timestamp: "2026-04-09T11:22:16Z" },
    { name: "BscScan", status: "acquired", timestamp: "2026-04-09T11:22:22Z" },
    { name: "Narrative Sources", status: "acquired", timestamp: "2026-04-09T11:22:30Z" },
  ],
  confidenceOfDetermination: 76,
  diagnosticProtocol: {
    surfaceSignals: { score: 71, reading: "Ghost mythology provides strong atmospheric framing." },
    structuralIntegrity: { score: 55, reading: "Initial lore structured but governance framing fractured cohesion." },
    degenerationFactors: { score: 74, reading: "Internal faction wars consumed all community energy." },
    survivalCapacity: { score: 28, reading: "Community cannot unify. Each faction claims legitimacy." },
  },
  scores: {
    symbolicDensity: { score: 72, reading: "Ghost council imagery is distinctive" },
    loreDepth: { score: 62, reading: "Structured mythology but stalled by faction conflict" },
    ritualRepeatability: { score: 48, reading: "Rituals performed by competing factions independently" },
    communityCohesion: { score: 20, reading: "Actively fragmented — cohesion is negative" },
    beliefElasticity: { score: 35, reading: "Belief channeled into internal conflict" },
    narrativeSurvivability: { score: 30, reading: "Narrative energy consumed by governance disputes" },
  },
  externalExamination: {
    surfaceFindings: "Atmospheric ghost mythology. Visual identity is cohesive and distinctive.",
    visibleMarkings: ["Ghost council governance", "Spectral hierarchy lore", "Decentralized decision-making promise", "Multiple competing council claims"],
    surfaceCondition: "Visually strong but community fracture visible externally.",
    initialSignalProfile: "Strong atmospheric branding undermined by visible internal conflict.",
  },
  internalExamination: {
    narrativeTissueAnalysis: "Initially well-formed — ghost council lore, spectral hierarchy. DAO governance introduced competing authority claims that tore narrative apart.",
    structuralCondition: "Critically damaged by faction conflict. Three competing 'councils' claim legitimacy.",
    cohesionFindings: "Actively fragmented. Each faction ~200-400 members. Cross-faction hostility exceeds external engagement.",
    beliefArchitecture: "Present but fractured. Each faction believes strongly in their version, creating irreconcilable contradiction.",
  },
  pathologyFindings: [
    { alert: "Community fragmentation", evidence: "Three competing factions with irreconcilable claims", severity: "terminal" },
    { alert: "Governance-induced paralysis", evidence: "No decisions in 21 days due to deadlock", severity: "severe" },
    { alert: "Internal conflict consuming energy", evidence: "80%+ activity is inter-faction disputes", severity: "severe" },
  ],
  mechanismOfVirality: {
    hypothesis: "Atmospheric ghost mythology with governance experimentation drove initial spread.",
    evidence: "Structurally compelling launch — spectral council, hierarchical lore. Early growth through narrative curiosity.",
    conclusion: "Virality was narrative-driven with genuine potential. Initial mechanism was sound.",
  },
  mechanismOfDeathOrSurvival: {
    hypothesis: "DAO governance structure became the mechanism of destruction through community fragmentation.",
    evidence: "Three factions in 2 weeks. Proposals deadlocked. Channels became battlegrounds.",
    conclusion: "Self-inflicted collapse. Governance meant to strengthen became fatal structural flaw.",
  },
  stageOfDecay: "Terminal. Community fragmented into irreconcilable factions.",
  estimatedFailureWindow: "Complete inactivity within 2-4 weeks",
  degenerationTimeline: [
    { phase: "Formation", description: "DAO structure creates initial governance framework. Community organized around ghost-themed collective.", severity: "mild" },
    { phase: "Governance Friction", description: "Decision-making disputes emerge. Transparency theater escalates factional tensions.", severity: "moderate" },
    { phase: "Fragmentation", description: "Community splits into irreconcilable factions. Governance becomes weapon rather than structure.", severity: "severe" },
    { phase: "Dissolution", description: "Active governance ceases. Community fragments completely. No recovery mechanism exists.", severity: "terminal" },
  ],
  primaryCauseOfDeath: "Community fragmentation under governance disputes",
  contributingFactors: [
    { factor: "DAO without conflict resolution", evidence: "No mechanism to resolve competing claims" },
    { factor: "Lore weaponized for legitimacy", evidence: "Each faction cites ghost council lore" },
    { factor: "Energy redirected internally", evidence: "80%+ activity is inter-faction" },
  ],
  mannerOfDeath: "Self-inflicted collapse",
  evidenceLog: {
    keyQuotes: ['"the true council speaks"', '"fake ghosts will be exorcised"', '"we are the original spectral order"'],
    marketEvidence: ["Peak Cap: $180K", "Current: $22K", "Liquidity: $5.8K"],
    holderEvidence: ["Peak: 2,800", "Current: ~950 split across factions"],
    narrativeEvidence: ["Three competing Telegram groups", "No unified content in 3 weeks"],
  },
  finalOpinion: "GhostDAO is pronounced Short-Term Attention Trap. Genuine narrative potential destroyed by self-inflicted governance fragmentation. The DAO framing introduced a fatal structural flaw — competing authority claims fractured community into irreconcilable factions. Determination issued with moderate confidence.",
  uncertaintyNotes: [
    "Faction reconciliation cannot be ruled out.",
    "Community members may migrate carrying the ghost council concept.",
  ],
  inputSnapshot: { contractAddress: "0x2c...e5b7", sceneNotes: "Ghost DAO with spectral council lore. Fragmented.", launchPlatform: "four.meme" },
};

// ── PixelSamurai: High Conviction Meme (Preserved — Ritualized identity retention) ──
const pixelSamuraiReport: AutopsyReport = {
  caseId: "MA-2026-0422",
  specimenName: "PixelSamurai",
  contractAddress: "0x6d...b1f4",
  chain: "BSC",
  sourceOrigin: "four.meme",
  intakeTime: "2026-04-08T08:45:00.000Z",
  examinationStatus: "Opinion Issued",
  pronouncedCondition: "High Conviction Meme",
  launchContext: "Launched via four.meme as a bushido-coded pixel art project. Holding framed as warrior discipline.",
  synopsis: "PixelSamurai built identity around bushido code adapted to crypto. Selling is dishonor, drawdowns are training, holders are ronin. Ritualized identity retention is exceptionally strong.",
  evidenceSources: [
    { name: "four.meme", status: "acquired", timestamp: "2026-04-08T08:45:10Z" },
    { name: "DexScreener", status: "acquired", timestamp: "2026-04-08T08:45:16Z" },
    { name: "BscScan", status: "acquired", timestamp: "2026-04-08T08:45:22Z" },
    { name: "Narrative Sources", status: "acquired", timestamp: "2026-04-08T08:45:30Z" },
  ],
  confidenceOfDetermination: 83,
  diagnosticProtocol: {
    surfaceSignals: { score: 78, reading: "Pixel art bushido aesthetic is distinctive with immediate cultural anchoring." },
    structuralIntegrity: { score: 82, reading: "Bushido code provides expandable doctrine with internal behavioral norms." },
    degenerationFactors: { score: 30, reading: "Low pressure. Community held through two major drawdowns." },
    survivalCapacity: { score: 85, reading: "Ritualized identity retention exceptionally strong. Drawdowns reframed as trials." },
  },
  scores: {
    symbolicDensity: { score: 80, reading: "Samurai + pixel art is distinctive" },
    loreDepth: { score: 84, reading: "Bushido adapted to crypto — deep expandable mythology" },
    ritualRepeatability: { score: 86, reading: "Daily training rituals, honor pledges, rank progression" },
    communityCohesion: { score: 88, reading: "Strong identity-driven participation" },
    beliefElasticity: { score: 82, reading: "Drawdowns absorbed as warrior tests" },
    narrativeSurvivability: { score: 85, reading: "Bushido can expand indefinitely through new trials" },
  },
  externalExamination: {
    surfaceFindings: "Cohesive pixel art samurai aesthetic. Distinctive and internally consistent.",
    visibleMarkings: ["Pixel samurai avatars", "Bushido code references", "Rank-based hierarchy", "Market events as battlefield"],
    surfaceCondition: "Polished, distinctive, deeply integrated with community behavior.",
    initialSignalProfile: "Identity-coded aesthetic with behavioral doctrine. Surface and structure aligned.",
  },
  internalExamination: {
    narrativeTissueAnalysis: "Exceptionally developed. Bushido-to-crypto provides complete behavioral framework — honor (holding), discipline (DCA), training (drawdowns), mastery (long-term conviction).",
    structuralCondition: "Strong. Infinite expansion through new ranks, trials, and warrior archetypes.",
    cohesionFindings: "High cohesion. Peer honor dynamics enforce norms. Selling is dishonor.",
    beliefArchitecture: "Mission-led with strong ritual reinforcement. Elastic meaning-making absorbs market stress.",
  },
  pathologyFindings: [
    { alert: "Potential cult dynamics", evidence: "Social pressure against selling may trap holders", severity: "moderate" },
    { alert: "Moderate liquidity constraints", evidence: "Sufficient but not deep for large exits", severity: "mild" },
  ],
  mechanismOfVirality: {
    hypothesis: "Bushido warrior culture adaptation to crypto drove spread.",
    evidence: "Growth accelerated after first drawdown — warrior framing proved retention. New members joined because community held.",
    conclusion: "Identity-driven virality through demonstrated conviction.",
  },
  mechanismOfDeathOrSurvival: {
    hypothesis: "Ritualized identity retention transforms market stress into identity reinforcement.",
    evidence: "Held through two 50%+ drawdowns. Drawdowns produced highest engagement. New ranks during stress.",
    conclusion: "Active survival through ritualized retention. Warrior path converts pressure into conviction.",
  },
  stageOfDecay: "Preserved. Active survival mechanisms with growth under stress.",
  degenerationTimeline: [
    { phase: "Launch", description: "Bushido-coded pixel art creates distinctive visual identity. Honor-based behavioral code attracts conviction holders.", severity: "mild" },
    { phase: "Identity Formation", description: "Warrior path doctrine develops. Community adopts code of conduct as genuine behavioral framework.", severity: "mild" },
    { phase: "Stress Resistance", description: "Market pressure converted into test narrative. 'Samurai endure' framing activates during drawdowns.", severity: "mild" },
    { phase: "Active Growth", description: "Ritual persistence expands. Community generates new lore and recruits through identity rather than price.", severity: "mild" },
  ],
  primaryCauseOfDeath: "N/A — Specimen is alive",
  primarySurvivalMechanism: "Ritualized identity retention through bushido-coded behavioral doctrine",
  survivalOutlook: "Preserved",
  contributingFactors: [
    { factor: "Bushido behavioral framework", evidence: "Complete doctrine for all market conditions" },
    { factor: "Rank progression system", evidence: "Ongoing engagement incentive" },
    { factor: "Drawdown-as-training", evidence: "Stress strengthens identity" },
    { factor: "Identity-driven retention", evidence: "Selling = dishonor" },
  ],
  mannerOfDeath: "Undetermined",
  evidenceLog: {
    keyQuotes: ['"the path does not bend for the market"', '"paper hands have no honor"', '"every dip is a training arc"', '"ronin hold through the storm"'],
    marketEvidence: ["Cap: $420K", "Holders: 5,800", "Liquidity: $95K"],
    holderEvidence: ["Top 10: ~22%", "92% retention through two drawdowns"],
    narrativeEvidence: ["Daily training rituals", "Rank ceremonies", "3x engagement during drawdowns"],
  },
  finalOpinion: "PixelSamurai is pronounced High Conviction Meme with exceptional structural integrity. Bushido-coded doctrine creates ritualized identity retention converting stress into conviction reinforcement. Survived two major drawdowns with minimal attrition and increased engagement. Survival outlook: Preserved. Determination issued with high confidence.",
  uncertaintyNotes: [
    "Cult dynamics could trap holders in deteriorating positions.",
    "Preservation assumes continued rank system expansion.",
  ],
  inputSnapshot: { contractAddress: "0x6d...b1f4", sceneNotes: "Bushido pixel art project. Held through drawdowns.", launchPlatform: "four.meme" },
};

// ── FrogVault: Viral but Fragile (Critically Dependent — Symbolic strength without social structure) ──
const frogVaultReport: AutopsyReport = {
  caseId: "MA-2026-0423",
  specimenName: "FrogVault",
  contractAddress: "0x1a...c7e3",
  chain: "BSC",
  sourceOrigin: "four.meme",
  intakeTime: "2026-04-07T13:30:00.000Z",
  examinationStatus: "Opinion Issued",
  pronouncedCondition: "Viral but Fragile",
  launchContext: "Launched via four.meme as a luxury frog aesthetic project with vault/treasury imagery.",
  synopsis: "FrogVault has the strongest visual identity in its cohort — luxury frog + vault aesthetics. But behind exceptional surface: no community structure, no doctrine, no rituals. A beautiful shell without internal organs.",
  evidenceSources: [
    { name: "four.meme", status: "acquired", timestamp: "2026-04-07T13:30:10Z" },
    { name: "DexScreener", status: "acquired", timestamp: "2026-04-07T13:30:14Z" },
    { name: "BscScan", status: "partial", timestamp: "2026-04-07T13:30:20Z" },
    { name: "Narrative Sources", status: "acquired", timestamp: "2026-04-07T13:30:28Z" },
  ],
  confidenceOfDetermination: 74,
  diagnosticProtocol: {
    surfaceSignals: { score: 92, reading: "Exceptional visual identity. Strongest surface signals in cohort." },
    structuralIntegrity: { score: 28, reading: "No internal narrative structure. Community is passive audience." },
    degenerationFactors: { score: 65, reading: "Symbol alone cannot sustain. Relies entirely on creator output." },
    survivalCapacity: { score: 22, reading: "Critically dependent on creator. Art stops = engagement stops." },
  },
  scores: {
    symbolicDensity: { score: 94, reading: "Exceptional — strongest visual identity examined" },
    loreDepth: { score: 18, reading: "No mythology beyond visuals" },
    ritualRepeatability: { score: 25, reading: "No rituals. Passive art consumption" },
    communityCohesion: { score: 20, reading: "Audience, not tribe" },
    beliefElasticity: { score: 15, reading: "No belief system. Aesthetic attachment only" },
    narrativeSurvivability: { score: 22, reading: "Depends on creator output" },
  },
  externalExamination: {
    surfaceFindings: "Exceptionally strong visual identity. Luxury frog + vault creates premium positioning.",
    visibleMarkings: ["High-quality frog artwork", "Vault/treasury motifs", "Luxury aesthetic", "Premium content production"],
    surfaceCondition: "Strongest surface in cohort.",
    initialSignalProfile: "Exceptional symbolic density. Surface far exceeds structural depth.",
  },
  internalExamination: {
    narrativeTissueAnalysis: "No narrative beyond visual aesthetic. Curated art gallery with token attached.",
    structuralCondition: "Critically low despite exceptional surface. Beautiful shell, no internal organs.",
    cohesionFindings: "Passive audience. Members share art but create no identity language or rituals.",
    beliefArchitecture: "No belief architecture. Aesthetic appreciation, not conviction.",
  },
  pathologyFindings: [
    { alert: "Symbolic strength without social structure", evidence: "92/100 surface vs 28/100 structural integrity", severity: "severe" },
    { alert: "Creator dependency", evidence: "All engagement from creator output. No community content", severity: "severe" },
    { alert: "Passive audience", evidence: "No identity language, rituals, or norms", severity: "moderate" },
  ],
  mechanismOfVirality: {
    hypothesis: "Visual quality drove spread — artistic excellence cut through noise.",
    evidence: "All viral moments correlate with art drops. No community-driven spread.",
    conclusion: "Symbol-driven through aesthetic excellence. Effective but unsustainable.",
  },
  mechanismOfDeathOrSurvival: {
    hypothesis: "Critically dependent on creator output.",
    evidence: "10-day art gap = 80% engagement drop. Zero organic activity. Recovered on new post.",
    conclusion: "Survival critically dependent on continuous creator output. Symbolic strength without community structure.",
  },
  stageOfDecay: "Active but critically dependent. Survives through external support, not internal mechanisms.",
  estimatedFailureWindow: "Collapse within 2-3 weeks of creator output cessation",
  degenerationTimeline: [
    { phase: "Launch", description: "Strong visual identity through luxury frog vault aesthetic. Creator-driven content generates initial interest.", severity: "mild" },
    { phase: "Creator Dependency", description: "All engagement tied to creator output. No community-generated content or autonomous rituals emerge.", severity: "moderate" },
    { phase: "Structural Exposure", description: "Community lacks internal cohesion mechanisms. Participation drops when creator pauses.", severity: "severe" },
    { phase: "Critical Dependency", description: "Survival entirely dependent on external support. Any cessation of creator output triggers rapid decay.", severity: "terminal" },
  ],
  primaryCauseOfDeath: "Symbolic strength without social structure",
  contributingFactors: [
    { factor: "No community architecture", evidence: "Passive audience" },
    { factor: "Zero lore depth", evidence: "Visual excellence without narrative" },
    { factor: "Creator dependency", evidence: "All engagement tied to art drops" },
  ],
  mannerOfDeath: "Chronic fragility with acute trigger",
  survivalOutlook: "Critically Dependent",
  evidenceLog: {
    keyQuotes: ['"this art is insane"', '"frog vault goes hard"', '"when next drop?"', '"the vault stays locked"'],
    marketEvidence: ["Cap: $95K", "Holders: 1,850", "Liquidity: $18K"],
    holderEvidence: ["Top 10: ~35%", "Holder visibility: partial"],
    narrativeEvidence: ["Engagement correlates with art drops", "10-day gap = 80% decline", "No community content"],
  },
  finalOpinion: "FrogVault is pronounced Viral but Fragile, survival outlook Critically Dependent. Strongest visual identity in cohort conceals critical structural absence. No community architecture, doctrine, or rituals. Textbook symbolic strength without social structure. Unless community infrastructure is built, specimen will not survive beyond creator's output capacity. Determination with moderate confidence.",
  uncertaintyNotes: [
    "Creator may build community infrastructure.",
    "Partial holder visibility limits concentration assessment.",
  ],
  inputSnapshot: { contractAddress: "0x1a...c7e3", sceneNotes: "Luxury frog vault. Exceptional visuals, no community.", launchPlatform: "four.meme" },
};

export const sampleReports: Record<string, AutopsyReport> = {
  DogePriest: dogePriestReport,
  BananaFax: bananaFaxReport,
  SaintMeme: saintMemeReport,
  MoonChadz: moonChadzReport,
  GhostDAO: ghostDAOReport,
  PixelSamurai: pixelSamuraiReport,
  FrogVault: frogVaultReport,
};

export const sampleInputs: Record<string, FormData> = {
  DogePriest: { contractAddress: "0x3a...f7c2", projectName: "DogePriest", chain: "BSC", sceneNotes: "Religious irony meme project on BSC.", launchPlatform: "four.meme" },
  BananaFax: { contractAddress: "0x7b...c4d1", projectName: "BananaFax", chain: "BSC", sceneNotes: "Random absurdity meme project.", launchPlatform: "four.meme" },
  SaintMeme: { contractAddress: "0x9f...a2e8", projectName: "SaintMeme", chain: "BSC", sceneNotes: "Counter-culture meme movement.", launchPlatform: "four.meme" },
  MoonChadz: { contractAddress: "0x4e...d3a9", projectName: "MoonChadz", chain: "BSC", sceneNotes: "Alpha-male trading culture token.", launchPlatform: "four.meme" },
  GhostDAO: { contractAddress: "0x2c...e5b7", projectName: "GhostDAO", chain: "ETH", sceneNotes: "Ghost-themed DAO.", launchPlatform: "four.meme" },
  PixelSamurai: { contractAddress: "0x6d...b1f4", projectName: "PixelSamurai", chain: "BSC", sceneNotes: "Bushido pixel art project.", launchPlatform: "four.meme" },
  FrogVault: { contractAddress: "0x1a...c7e3", projectName: "FrogVault", chain: "SOL", sceneNotes: "Luxury frog vault aesthetic.", launchPlatform: "four.meme" },
};

export interface ArchivedCaseFile {
  key: string;
  specimenLabel: "TERMINAL SPECIMEN" | "PRESERVED SPECIMEN" | "OPEN EXAMINATION";
  condition: string;
  causeOfDeath: string;
  caseId: string;
  accentClass: string;
  confidence: number;
  mannerOrOutlook: string;
  filedAt: string;
  oneLineSummary: string;
}

export const archivedCases: ArchivedCaseFile[] = [
  { key: "BananaFax", specimenLabel: "TERMINAL SPECIMEN", condition: "Dead on Arrival", causeOfDeath: "Slogan-only virality without doctrine formation", caseId: "MA-2026-0418", accentClass: "verdict-critical", confidence: 85, mannerOrOutlook: "Structural failure", filedAt: "2026-04-11T15:10:00Z", oneLineSummary: "No internal narrative anatomy. Novelty-only virality with zero structural support." },
  { key: "MoonChadz", specimenLabel: "TERMINAL SPECIMEN", condition: "Chaos Without Cohesion", causeOfDeath: "Price-dependent identity collapse under drawdown pressure", caseId: "MA-2026-0420", accentClass: "verdict-critical", confidence: 79, mannerOrOutlook: "Market-shock accelerated decline", filedAt: "2026-04-10T09:15:00Z", oneLineSummary: "All identity was price-constructed. Drawdown erased community entirely." },
  { key: "GhostDAO", specimenLabel: "TERMINAL SPECIMEN", condition: "Short-Term Attention Trap", causeOfDeath: "Community fragmentation under governance disputes", caseId: "MA-2026-0421", accentClass: "verdict-critical", confidence: 76, mannerOrOutlook: "Self-inflicted collapse", filedAt: "2026-04-09T11:22:00Z", oneLineSummary: "Genuine narrative potential destroyed by DAO governance faction wars." },
  { key: "DogePriest", specimenLabel: "OPEN EXAMINATION", condition: "Viral but Fragile", causeOfDeath: "Narrative exhaustion following novelty-driven spread", caseId: "MA-2026-0417", accentClass: "verdict-active", confidence: 72, mannerOrOutlook: "Natural decay", filedAt: "2026-04-11T14:32:00Z", oneLineSummary: "Strong symbolic compression but critically deficient structural integrity." },
  { key: "FrogVault", specimenLabel: "OPEN EXAMINATION", condition: "Viral but Fragile", causeOfDeath: "Symbolic strength without social structure", caseId: "MA-2026-0423", accentClass: "verdict-active", confidence: 74, mannerOrOutlook: "Critically Dependent", filedAt: "2026-04-07T13:30:00Z", oneLineSummary: "Strongest visual identity in cohort but no community infrastructure." },
  { key: "SaintMeme", specimenLabel: "PRESERVED SPECIMEN", condition: "Stable Cult Potential", causeOfDeath: "N/A — Mission-led cohesion with elastic belief reframing", caseId: "MA-2026-0419", accentClass: "verdict-signal", confidence: 81, mannerOrOutlook: "Preserved", filedAt: "2026-04-11T16:05:00Z", oneLineSummary: "Counter-culture mission framing with expandable doctrine." },
  { key: "PixelSamurai", specimenLabel: "PRESERVED SPECIMEN", condition: "High Conviction Meme", causeOfDeath: "N/A — Ritualized identity retention through bushido doctrine", caseId: "MA-2026-0422", accentClass: "verdict-signal", confidence: 83, mannerOrOutlook: "Preserved", filedAt: "2026-04-08T08:45:00Z", oneLineSummary: "Bushido-coded doctrine converts market stress into conviction reinforcement." },
];
