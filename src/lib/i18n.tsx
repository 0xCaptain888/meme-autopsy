"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { Language } from "./types";

type TranslationDict = Record<string, Record<string, string>>;

const translations: TranslationDict = {
  // Hero
  "hero.headline": {
    en: "AI Forensic Intelligence for BSC Meme Narratives",
    zh: "BSC Meme 叙事的 AI 法医情报",
  },
  "hero.subheadline": {
    en: "Ingests live data from DexScreener, BscScan, and four.meme. Extracts narrative structure. Delivers structured forensic verdicts.",
    zh: "从 DexScreener、BscScan 和 four.meme 获取实时数据。提取叙事结构。提供结构化法医判定。",
  },
  "hero.supporting": {
    en: "BSC-first. four.meme-first. Real chain data, not vibes.",
    zh: "BSC 优先。four.meme 优先。真实链上数据，而非臆测。",
  },
  "hero.runAutopsy": { en: "Analyze Contract", zh: "分析合约" },
  "hero.loadSample": { en: "View Sample Report", zh: "查看示例报告" },

  // Source Badges
  "source.dexscreener": { en: "DexScreener", zh: "DexScreener" },
  "source.bscscan": { en: "BscScan", zh: "BscScan" },
  "source.fourmeme": { en: "four.meme", zh: "four.meme" },
  "source.openai": { en: "OpenAI", zh: "OpenAI" },
  "source.label": { en: "LIVE DATA SOURCES", zh: "实时数据来源" },

  // Framework Grid (dimensions)
  "framework.title": { en: "The Six Forensic Dimensions", zh: "六大法医维度" },
  "framework.subtitle": {
    en: "Every meme project is scored across six structural dimensions that determine its cultural survivability.",
    zh: "每个 Meme 项目都按照决定其文化生存能力的六个结构维度进行评分。",
  },
  "framework.symbolicDensity": { en: "Symbolic Density", zh: "符号密度" },
  "framework.symbolicDensity.desc": {
    en: "How visually and conceptually memorable the core symbols are.",
    zh: "核心符号在视觉和概念上的记忆度。",
  },
  "framework.loreDepth": { en: "Lore Depth", zh: "传说深度" },
  "framework.loreDepth.desc": {
    en: "The richness and expandability of the project's mythology.",
    zh: "项目神话体系的丰富性和可扩展性。",
  },
  "framework.ritualRepeatability": { en: "Ritual Repeatability", zh: "仪式可重复性" },
  "framework.ritualRepeatability.desc": {
    en: "Whether the community language supports repeatable, shareable engagement.",
    zh: "社区语言是否支持可重复、可分享的参与。",
  },
  "framework.communityCohesion": { en: "Community Cohesion", zh: "社区凝聚力" },
  "framework.communityCohesion.desc": {
    en: "How strongly the group identity holds under pressure and over time.",
    zh: "群体身份认同在压力下和时间推移中的坚固程度。",
  },
  "framework.beliefElasticity": { en: "Belief Elasticity", zh: "信仰弹性" },
  "framework.beliefElasticity.desc": {
    en: "The project's capacity to evolve without losing core believers.",
    zh: "项目在不失去核心信徒的情况下进化的能力。",
  },
  "framework.narrativeSurvivability": { en: "Narrative Survivability", zh: "叙事生存能力" },
  "framework.narrativeSurvivability.desc": {
    en: "Whether the story can outlast its initial attention window.",
    zh: "故事是否能超越其初始关注窗口期。",
  },

  // Input Demo CTA
  "inputCTA.title": { en: "Ready to Analyze a BSC Contract?", zh: "准备分析 BSC 合约？" },
  "inputCTA.subtitle": {
    en: "Paste any BSC contract address to get a full forensic diagnosis with live data from DexScreener, BscScan, and four.meme.",
    zh: "粘贴任何 BSC 合约地址，获取来自 DexScreener、BscScan 和 four.meme 实时数据的完整法医诊断。",
  },
  "inputCTA.button": { en: "Analyze a BSC Contract", zh: "分析 BSC 合约" },

  // Sample Cases
  "samples.title": { en: "Sample Cases", zh: "示例案件" },
  "samples.subtitle": {
    en: "Explore pre-analyzed forensic reports across the meme lifecycle spectrum.",
    zh: "探索跨越 Meme 生命周期谱系的预分析法医报告。",
  },

  // Input Panel
  "input.title": { en: "Open a New Case", zh: "开启新案件" },
  "input.subtitle": {
    en: "Submit a meme project's narrative, community language, and context for forensic analysis.",
    zh: "提交 Meme 项目的叙事、社区语言和上下文进行法医分析。",
  },
  "input.projectName": { en: "Project Name", zh: "项目名称" },
  "input.narrative": { en: "Narrative Description", zh: "叙事描述" },
  "input.communityText": {
    en: "Tweets / Community Text (optional)",
    zh: "推文 / 社区文本（可选）",
  },
  "input.notes": { en: "Additional Notes (optional)", zh: "附加备注（可选）" },
  "input.submit": { en: "Run Full Autopsy", zh: "执行完整尸检" },
  "input.note": {
    en: "No price charts. No hype metrics. Just narrative forensics.",
    zh: "没有价格图表。没有炒作指标。只有叙事法医学。",
  },
  "input.back": { en: "Back", zh: "返回" },

  // Loading Steps
  "loading.title": { en: "Analyzing Case", zh: "分析案件中" },
  "loading.0": { en: "Parsing narrative structure...", zh: "解析叙事结构..." },
  "loading.1": { en: "Extracting symbolic anchors...", zh: "提取符号锚点..." },
  "loading.2": { en: "Evaluating ritual repeatability...", zh: "评估仪式可重复性..." },
  "loading.3": { en: "Estimating collapse risks...", zh: "估算崩溃风险..." },
  "loading.4": { en: "Building report...", zh: "构建报告..." },

  // Report
  "report.label": { en: "CASE REPORT", zh: "案件报告" },
  "report.title": { en: "Autopsy Findings", zh: "尸检结果" },
  "report.subtitle": {
    en: "Forensic diagnosis of narrative survivability, symbolic strength, and collapse risk.",
    zh: "叙事生存能力、符号强度和崩溃风险的法医诊断。",
  },
  "report.verdict": { en: "Verdict", zh: "判定" },
  "report.confidence": { en: "Confidence", zh: "置信度" },
  "report.primaryCause": { en: "Primary Cause", zh: "主要原因" },
  "report.summary": { en: "Summary", zh: "摘要" },
  "report.rerun": { en: "Re-run Analysis", zh: "重新分析" },
  "report.compare": { en: "Compare Results", zh: "比较结果" },

  // Verdict translations
  "verdict.Dead on Arrival": { en: "Dead on Arrival", zh: "到达即死亡" },
  "verdict.Viral but Fragile": { en: "Viral but Fragile", zh: "病毒式但脆弱" },
  "verdict.Short-Term Attention Trap": { en: "Short-Term Attention Trap", zh: "短期注意力陷阱" },
  "verdict.Stable Cult Potential": { en: "Stable Cult Potential", zh: "稳定邪典潜力" },
  "verdict.High Conviction Meme": { en: "High Conviction Meme", zh: "高信念 Meme" },
  "verdict.Chaos Without Cohesion": { en: "Chaos Without Cohesion", zh: "无凝聚力的混沌" },

  // Badge translations
  "badge.CRITICAL": { en: "CRITICAL", zh: "危急" },
  "badge.ACTIVE CASE": { en: "ACTIVE CASE", zh: "活跃案件" },
  "badge.HIGH SIGNAL": { en: "HIGH SIGNAL", zh: "高信号" },
  "badge.WARNING": { en: "WARNING", zh: "警告" },
  "badge.NEUTRAL": { en: "NEUTRAL", zh: "中性" },

  // Forensic Breakdown (score dimensions)
  "breakdown.title": { en: "Forensic Breakdown", zh: "法医分析" },
  "breakdown.subtitle": {
    en: "A structural analysis of the project's ability to spread, survive, and sustain belief.",
    zh: "对项目传播、生存和维持信仰能力的结构性分析。",
  },
  "score.symbolicDensity": { en: "Symbolic Density", zh: "符号密度" },
  "score.loreDepth": { en: "Lore Depth", zh: "传说深度" },
  "score.ritualRepeatability": { en: "Ritual Repeatability", zh: "仪式可重复性" },
  "score.communityCohesion": { en: "Community Cohesion", zh: "社区凝聚力" },
  "score.beliefElasticity": { en: "Belief Elasticity", zh: "信仰弹性" },
  "score.narrativeSurvivability": { en: "Narrative Survivability", zh: "叙事生存能力" },

  // Timeline
  "timeline.title": { en: "Collapse Timeline", zh: "崩溃时间线" },
  "timeline.subtitle": {
    en: "Projected failure points across the lifecycle of narrative attention and belief formation.",
    zh: "叙事关注和信仰形成生命周期中的预计失败节点。",
  },

  // Interventions
  "interventions.title": { en: "Recommended Interventions", zh: "建议干预措施" },
  "interventions.subtitle": {
    en: "Specific actions to increase symbolic durability, community cohesion, and long-term survivability.",
    zh: "增强符号持久性、社区凝聚力和长期生存能力的具体行动。",
  },

  // Forensic Notes
  "forensicNotes.title": { en: "Forensic Notes", zh: "法医备注" },

  // Reasoning Signals
  "reasoningSignals.title": { en: "Reasoning Signals", zh: "推理信号" },
  "reasoningSignals.subtitle": {
    en: "Key signals detected during analysis that informed the verdict.",
    zh: "分析过程中检测到的影响判定的关键信号。",
  },

  // Input Snapshot
  "inputSnapshot.title": { en: "Input Snapshot", zh: "输入快照" },
  "inputSnapshot.subtitle": {
    en: "The original data submitted for this analysis.",
    zh: "提交用于本次分析的原始数据。",
  },

  // Compare Results
  "compare.title": { en: "Compare Results", zh: "比较结果" },
  "compare.subtitle": {
    en: "Side-by-side comparison between the original and revised analysis.",
    zh: "原始分析与修订分析的并排比较。",
  },
  "compare.original": { en: "Original", zh: "原始" },
  "compare.revised": { en: "Revised", zh: "修订" },
  "compare.improved": { en: "Improved", zh: "提升" },
  "compare.declined": { en: "Declined", zh: "下降" },
  "compare.unchanged": { en: "Unchanged", zh: "未变" },

  // Empty State
  "empty.title": { en: "No Report Yet", zh: "暂无报告" },
  "empty.subtitle": {
    en: "Submit a meme project on the left to begin forensic analysis.",
    zh: "在左侧提交一个 Meme 项目以开始法医分析。",
  },

  // Comparable Pattern
  "comparable.title": { en: "Comparable Pattern", zh: "可比模式" },

  // Nav
  "nav.title": { en: "MEME AUTOPSY", zh: "MEME AUTOPSY" },
  "nav.tagline": { en: "BSC Forensic Intelligence", zh: "BSC 法医情报" },

  // Footer
  "footer.text": {
    en: "Meme Autopsy \u2014 AI Forensic Intelligence for BSC Meme Narratives",
    zh: "Meme Autopsy \u2014 BSC Meme 叙事的 AI 法医情报",
  },

  // HowItWorks
  "howItWorks.title": { en: "Forensic diagnosis in three steps", zh: "三步法医诊断" },
  "howItWorks.step1.title": { en: "Paste a BSC contract address", zh: "粘贴 BSC 合约地址" },
  "howItWorks.step1.desc": {
    en: "Input any BSC token contract address. The engine identifies the project and begins data ingestion.",
    zh: "输入任何 BSC 代币合约地址。引擎识别项目并开始数据摄取。",
  },
  "howItWorks.step2.title": { en: "Live data ingestion & analysis", zh: "实时数据摄取与分析" },
  "howItWorks.step2.desc": {
    en: "Live market, holder, and narrative data ingestion from DexScreener, BscScan, and four.meme.",
    zh: "从 DexScreener、BscScan 和 four.meme 摄取实时市场、持有者和叙事数据。",
  },
  "howItWorks.step3.title": { en: "Structured forensic verdict", zh: "结构化法医判定" },
  "howItWorks.step3.desc": {
    en: "Structured forensic verdict with data provenance, warning flags, and missing-data disclosure.",
    zh: "结构化法医判定，附带数据来源、警告标志和缺失数据披露。",
  },

  // NotAnotherMemeTool
  "distinction.title": { en: "Not another meme tool", zh: "不只是另一个 Meme 工具" },
  "distinction.desc": {
    en: "Meme Autopsy is built on real chain data from BSC, not vibes. Every data point shows its source. When data is missing, we say so.",
    zh: "Meme Autopsy 基于 BSC 的真实链上数据构建，而非臆测。每个数据点都显示其来源。当数据缺失时，我们会如实告知。",
  },
  "distinction.other.1": { en: "Black box AI", zh: "黑箱 AI" },
  "distinction.other.2": { en: "Always 100% confident", zh: "始终 100% 自信" },
  "distinction.other.3": { en: "Generic multi-chain", zh: "通用多链" },
  "distinction.ma.1": { en: "Shows where data came from", zh: "显示数据来源" },
  "distinction.ma.2": { en: "Admits when data is missing", zh: "承认数据缺失" },
  "distinction.ma.3": { en: "BSC-first, four.meme-first", zh: "BSC 优先，four.meme 优先" },
};

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  lang: "en",
  setLang: () => {},
  t: (key: string) => key,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  const t = useCallback(
    (key: string) => {
      const entry = translations[key];
      if (!entry) return key;
      return entry[lang] || entry["en"] || key;
    },
    [lang]
  );

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
