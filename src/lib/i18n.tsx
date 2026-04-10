"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { Language } from "./types";

type TranslationDict = Record<string, Record<string, string>>;

const translations: TranslationDict = {
  // Hero
  "hero.headline": {
    en: "Dissect the life and death of any meme project",
    zh: "解剖任何 Meme 项目的生与死",
  },
  "hero.subheadline": {
    en: "Meme Autopsy is an AI forensic engine that diagnoses why meme narratives go viral, decay, or die.",
    zh: "Meme Autopsy 是一个 AI 法医引擎，诊断 Meme 叙事为何会病毒传播、衰退或死亡。",
  },
  "hero.supporting": {
    en: "From hype to collapse, every meme leaves evidence.",
    zh: "从炒作到崩溃，每个 Meme 都会留下证据。",
  },
  "hero.runAutopsy": { en: "Run Autopsy", zh: "执行尸检" },
  "hero.loadSample": { en: "View Sample Report", zh: "查看示例报告" },

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
  "inputCTA.title": { en: "Ready to Run Your Own Autopsy?", zh: "准备执行你自己的尸检？" },
  "inputCTA.subtitle": {
    en: "Submit any meme project's narrative, community language, and context for a full forensic analysis.",
    zh: "提交任何 Meme 项目的叙事、社区语言和上下文进行完整法医分析。",
  },
  "inputCTA.button": { en: "Open Workspace", zh: "打开工作台" },

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
  "nav.tagline": { en: "Forensic Intelligence Engine", zh: "法医情报引擎" },

  // Footer
  "footer.text": {
    en: "Meme Autopsy \u2014 Forensic Intelligence for Internet-Native Assets",
    zh: "Meme Autopsy \u2014 互联网原生资产的法医情报",
  },
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
