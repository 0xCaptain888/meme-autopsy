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
  "hero.loadSample": { en: "Load Sample Case", zh: "加载示例案件" },

  // Sample Cases
  "samples.title": { en: "Sample Cases", zh: "示例案件" },
  "samples.subtitle": {
    en: "Explore pre-analyzed forensic reports across the meme lifecycle spectrum.",
    zh: "探索跨越 Meme 生命周期谱系的预分析法医报告。",
  },
  "samples.deadOnArrival": { en: "Dead on Arrival", zh: "到达即死亡" },
  "samples.viralButFragile": { en: "Viral but Fragile", zh: "病毒式但脆弱" },
  "samples.stableCult": { en: "Stable Cult Potential", zh: "稳定邪典潜力" },

  // Input
  "input.title": { en: "Open a New Case", zh: "开启新案件" },
  "input.subtitle": {
    en: "Submit a meme project\u2019s narrative, community language, and source context for forensic analysis.",
    zh: "提交 Meme 项目的叙事、社区语言和来源上下文进行法医分析。",
  },
  "input.projectName": { en: "Project Name", zh: "项目名称" },
  "input.narrative": { en: "Narrative Description", zh: "叙事描述" },
  "input.websiteUrl": { en: "Website URL (optional)", zh: "网站 URL（可选）" },
  "input.communityText": {
    en: "Tweets / Community Text (optional)",
    zh: "推文 / 社区文本（可选）",
  },
  "input.submit": { en: "Run Full Autopsy", zh: "执行完整尸检" },
  "input.note": {
    en: "No price charts. No hype metrics. Just narrative forensics.",
    zh: "没有价格图表。没有炒作指标。只有叙事法医学。",
  },
  "input.back": { en: "Back", zh: "返回" },

  // Loading
  "loading.0": { en: "Extracting symbolic patterns...", zh: "提取符号模式..." },
  "loading.1": {
    en: "Measuring narrative integrity...",
    zh: "测量叙事完整性...",
  },
  "loading.2": {
    en: "Scanning community language...",
    zh: "扫描社区语言...",
  },
  "loading.3": {
    en: "Detecting belief collapse signals...",
    zh: "检测信仰崩溃信号...",
  },
  "loading.4": {
    en: "Building forensic timeline...",
    zh: "构建法医时间线...",
  },
  "loading.5": {
    en: "Finalizing autopsy report...",
    zh: "最终确认尸检报告...",
  },

  // Report
  "report.label": { en: "CASE REPORT", zh: "案件报告" },
  "report.title": { en: "Autopsy Findings", zh: "尸检结果" },
  "report.subtitle": {
    en: "Forensic diagnosis of narrative survivability, symbolic strength, and collapse risk.",
    zh: "叙事生存能力、符号强度和崩溃风险的法医诊断。",
  },
  "report.verdict": { en: "Verdict", zh: "判定" },
  "report.primaryCause": { en: "Primary Cause", zh: "主要原因" },
  "report.secondaryCauses": { en: "Secondary Causes", zh: "次要原因" },
  "report.executiveSummary": { en: "Executive Summary", zh: "执行摘要" },
  "report.newCase": { en: "New Case", zh: "新案件" },

  // Verdict translations
  "verdict.Dead on Arrival": { en: "Dead on Arrival", zh: "到达即死亡" },
  "verdict.Viral but Fragile": { en: "Viral but Fragile", zh: "病毒式但脆弱" },
  "verdict.Stable Cult Potential": {
    en: "Stable Cult Potential",
    zh: "稳定邪典潜力",
  },
  "verdict.Decaying Fast": { en: "Decaying Fast", zh: "快速衰退" },

  // Badge translations
  "badge.CRITICAL": { en: "CRITICAL", zh: "危急" },
  "badge.ACTIVE CASE": { en: "ACTIVE CASE", zh: "活跃案件" },
  "badge.HIGH SIGNAL": { en: "HIGH SIGNAL", zh: "高信号" },

  // Forensic Breakdown
  "breakdown.title": { en: "Forensic Breakdown", zh: "法医分析" },
  "breakdown.subtitle": {
    en: "A structural analysis of the project\u2019s ability to spread, survive, and sustain belief.",
    zh: "对项目传播、生存和维持信仰能力的结构性分析。",
  },
  "score.narrativeCoherence": { en: "Narrative Coherence", zh: "叙事连贯性" },
  "score.memeSpreadability": { en: "Meme Spreadability", zh: "Meme 传播力" },
  "score.symbolStickiness": { en: "Symbol Stickiness", zh: "符号粘性" },
  "score.communityTrust": { en: "Community Trust", zh: "社区信任度" },
  "score.loreDepth": { en: "Lore Depth", zh: "传说深度" },
  "score.attentionResilience": {
    en: "Attention Resilience",
    zh: "注意力韧性",
  },

  // Timeline
  "timeline.title": { en: "Collapse Timeline", zh: "崩溃时间线" },
  "timeline.subtitle": {
    en: "Projected failure points across the lifecycle of narrative attention and belief formation.",
    zh: "叙事关注和信仰形成生命周期中的预计失败节点。",
  },
  "phase.Initial Hook": { en: "Initial Hook", zh: "初始钩子" },
  "phase.Social Spread": { en: "Social Spread", zh: "社会传播" },
  "phase.Identity Formation": { en: "Identity Formation", zh: "身份形成" },
  "phase.Fatigue Trigger": { en: "Fatigue Trigger", zh: "疲劳触发" },
  "phase.Belief Collapse": { en: "Belief Collapse", zh: "信仰崩溃" },

  // Interventions
  "interventions.title": { en: "Recommended Intervention", zh: "建议干预措施" },
  "interventions.subtitle": {
    en: "Specific actions to increase symbolic durability, community cohesion, and long-term survivability.",
    zh: "增强符号持久性、社区凝聚力和长期生存能力的具体行动。",
  },

  // Nav
  "nav.title": { en: "MEME AUTOPSY", zh: "MEME AUTOPSY" },
  "nav.tagline": { en: "Forensic Intelligence Engine", zh: "法医情报引擎" },

  // Footer
  "footer.text": {
    en: "Meme Autopsy \u2014 Forensic Intelligence for Internet-Native Assets",
    zh: "Meme Autopsy \u2014 互联网原生资产的法医情报",
  },
};

// Chinese translations for score explanations (per case)
export const zhScoreExplanations: Record<string, Record<string, string>> = {
  DogePriest: {
    narrativeCoherence: "叙事易于理解且内部一致。",
    memeSpreadability: "宗教反讽和可重复的语言创造了高转发潜力。",
    symbolStickiness: "先知狗的形象令人难忘且可视觉转移。",
    communityTrust: "语言创造了归属感，但尚未形成持久信任。",
    loreDepth: "有主题，但尚未形成完整的神话体系。",
    attentionResilience: "一旦笑话变得熟悉，项目可能会失去动力。",
  },
  BananaFax: {
    narrativeCoherence: "概念是随机的，但没有有意义的结构。",
    memeSpreadability: "一些短语很有趣，但不足以支撑反复分享。",
    symbolStickiness: "形象嘈杂而未成为标志性符号。",
    communityTrust: "没有稳定的身份认同框架让持有者归属。",
    loreDepth: "概念没有发展成一个世界或神话。",
    attentionResilience: "注意力很可能在第一个笑话周期后几乎立即消失。",
  },
  SaintMeme: {
    narrativeCoherence: "项目有清晰的世界观和一致的内部逻辑。",
    memeSpreadability: "其语言可混搭，为社区参与而构建。",
    symbolStickiness: "神圣与企业对立的框架在情感上令人难忘。",
    communityTrust: "仪式性语言和共同使命增强了凝聚力。",
    loreDepth: "项目有足够的神话结构来支撑更长的叙事生命。",
    attentionResilience: "使命可以超越最初的 Meme 时刻继续发展。",
  },
};

export const zhReportContent: Record<
  string,
  {
    primaryCause: string;
    secondaryCauses: string[];
    executiveSummary: string;
    interventions: string[];
    timeline: { phase: string; diagnosis: string }[];
  }
> = {
  DogePriest: {
    primaryCause: "强大的符号身份认同与薄弱的长期教义形成",
    secondaryCauses: [
      "社区语言令人难忘但范围狭窄",
      "叙事升级路径有限",
      "幽默感强但使命清晰度弱",
    ],
    executiveSummary:
      "DogePriest 具有早期病毒传播的要素：清晰的象征主义、可重复的短语和情感粘性反讽。然而，该项目面临快速文化疲劳的风险，因为它缺乏更深层的使命结构来在初始 Meme 浪潮后维持信仰。",
    interventions: [
      "引入更强大的神话弧线，设定反复出现的预言里程碑。",
      "创建超越价格反应的更多内部仪式。",
      "定义更清晰的敌人或世界观来加强部落身份认同。",
    ],
    timeline: [
      { phase: "初始钩子", diagnosis: "宗教框架创造了即时的好奇心和对比度。" },
      {
        phase: "社会传播",
        diagnosis: "口号和反讽使项目具有高度可分享性。",
      },
      {
        phase: "身份形成",
        diagnosis: "社区开始围绕内部语言和仪式化短语形成。",
      },
      {
        phase: "疲劳触发",
        diagnosis: "缺乏更深层的叙事层次，核心笑话开始变平。",
      },
      {
        phase: "信仰崩溃",
        diagnosis:
          "如果没有使命或敌人出现，Meme 无法将反讽转化为长期信念。",
      },
    ],
  },
  BananaFax: {
    primaryCause: "高随机性，没有持久的符号或社会锚点",
    secondaryCauses: [
      "叙事缺乏连贯的进展",
      "社区语言是一次性的",
      "不存在信仰结构或身份阶梯",
    ],
    executiveSummary:
      "BananaFax 具有表面层次的荒谬性，但缺乏持续文化传播所需的符号清晰度和内部逻辑。它可能产生短暂的关注，但结构上太浅薄，无法形成持久的 Meme 社区。",
    interventions: [
      "围绕更强大的中心符号重建概念。",
      "引入更清晰的世界观或文化敌人。",
      "用结构化的传说替代随机的荒谬。",
    ],
    timeline: [
      { phase: "初始钩子", diagnosis: "荒谬性可能在短时间内触发好奇心。" },
      {
        phase: "社会传播",
        diagnosis: "传播是可能的，但由于符号精确度低而较弱。",
      },
      {
        phase: "身份形成",
        diagnosis: "项目未能创造出具有深度的内部语言。",
      },
      { phase: "疲劳触发", diagnosis: "笑话几乎立即耗尽自身。" },
      {
        phase: "信仰崩溃",
        diagnosis: "从未有足够的叙事重量来形成信仰。",
      },
    ],
  },
  SaintMeme: {
    primaryCause: "强大的符号清晰度与使命驱动的社区身份认同相结合",
    secondaryCauses: [
      "语言强化了群体内参与",
      "项目有清晰的敌人和世界观",
      "传说系统支持反复参与",
    ],
    executiveSummary:
      "SaintMeme 展示了示例案件中最强的长期文化生存能力。它不仅仅是一个笑话，而是一个具有符号深度、清晰身份边界和可重复仪式结构的使命驱动型 Meme 框架。",
    interventions: [
      "将经典发布扩展为反复的社区活动。",
      "将社区仪式正式化以深化承诺。",
      "创建奖励混搭参与的叙事里程碑。",
    ],
    timeline: [
      {
        phase: "初始钩子",
        diagnosis: "反企业框架创造了即时的意识形态对比。",
      },
      {
        phase: "社会传播",
        diagnosis: "可混搭的口号和符号语言支持快速社区传播。",
      },
      {
        phase: "身份形成",
        diagnosis: "项目为参与者提供了清晰的内部人士身份标记。",
      },
      {
        phase: "疲劳触发",
        diagnosis: "疲劳风险存在，但可以通过不断发展的经典和仪式来延迟。",
      },
      {
        phase: "信仰崩溃",
        diagnosis: "崩溃的可能性较小，因为 Meme 已将幽默转化为使命。",
      },
    ],
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
