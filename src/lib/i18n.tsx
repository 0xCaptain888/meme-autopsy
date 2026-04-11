import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { Language } from "./types";

type TranslationDict = Record<string, Record<string, string>>;

const translations: TranslationDict = {
  // Navbar
  "nav.title": { en: "MEME AUTOPSY", zh: "MEME 尸检" },
  "nav.tagline": { en: "Forensic Autopsy System", zh: "法医尸检系统" },

  // Hero - V2 forensic identity
  "hero.headline": { en: "Forensic Autopsy for Meme Projects", zh: "Meme 项目的法医尸检" },
  "hero.subheadline": {
    en: "Reconstructs why a project spread, why it decayed, and what caused death — or what preserved survival. Formal digital autopsy from intake through opinion issuance.",
    zh: "重建项目传播的原因、衰退的原因、死亡的原因——或存活的机制。从受理到意见出具的正式数字尸检。",
  },
  "hero.supporting": {
    en: "BSC-first. four.meme-first. Evidence-based forensic examination, not vibes.",
    zh: "BSC 优先。four.meme 优先。基于证据的法医检查，而非臆测。",
  },
  "hero.openCase": { en: "Open Case", zh: "开启案件" },
  "hero.viewArchived": { en: "View Archived Case File", zh: "查看已归档案件" },

  // Sources
  "source.label": { en: "EVIDENCE SOURCES", zh: "证据来源" },
  "source.fourmeme": { en: "four.meme", zh: "four.meme" },
  "source.dexscreener": { en: "DexScreener", zh: "DexScreener" },
  "source.bscscan": { en: "BscScan", zh: "BscScan" },
  "source.openai": { en: "OpenAI", zh: "OpenAI" },

  // Examination Protocol (formerly Framework Grid)
  "protocol.title": { en: "Examination Protocol", zh: "检查协议" },
  "protocol.subtitle": {
    en: "A proprietary diagnostic protocol combining rules-based measurement with AI interpretation across four forensic layers.",
    zh: "结合规则测量与 AI 解释的四层法医专有诊断协议。",
  },

  // Diagnostic Layers
  "layer.surfaceSignals": { en: "Surface Signals", zh: "表面信号" },
  "layer.surfaceSignals.desc": {
    en: "Measures why the specimen became immediately legible and spreadable on contact. Symbolic recognizability, slogan compression, memetic distinctiveness.",
    zh: "衡量标本为何在接触时立即可读且可传播。符号识别度、口号压缩、模因独特性。",
  },
  "layer.structuralIntegrity": { en: "Structural Integrity", zh: "结构完整性" },
  "layer.structuralIntegrity.desc": {
    en: "Whether the project has internal narrative anatomy strong enough to survive beyond initial attention. Lore depth, doctrine, community identity.",
    zh: "项目是否具有足够强的内部叙事结构以超越初始关注。传说深度、教义、社区身份。",
  },
  "layer.degenerationFactors": { en: "Degeneration Factors", zh: "退化因素" },
  "layer.degenerationFactors.desc": {
    en: "What actively destabilizes the specimen. Holder concentration, liquidity fragility, price-dependent participation, narrative exhaustion.",
    zh: "主动破坏标本稳定性的因素。持有者集中度、流动性脆弱性、价格依赖参与、叙事枯竭。",
  },
  "layer.survivalCapacity": { en: "Survival Capacity", zh: "生存能力" },
  "layer.survivalCapacity.desc": {
    en: "Whether the specimen possesses mechanisms to adapt, retain believers, and survive past novelty. Belief elasticity, ritual persistence, narrative survivability.",
    zh: "标本是否具备适应、留住信徒并超越新奇感的生存机制。信仰弹性、仪式持久性、叙事生存能力。",
  },

  // Case Intake (formerly Analyze)
  "intake.title": { en: "New Case Intake", zh: "新案件受理" },
  "intake.subtitle": {
    en: "Submit specimen identifier and attach scene context to initiate examination.",
    zh: "提交标本标识符并附上现场背景以启动检查。",
  },
  "intake.contractAddress": { en: "Specimen Identifier (Contract Address)", zh: "标本标识符（合约地址）" },
  "intake.sceneNotes": { en: "Scene Notes", zh: "现场笔记" },
  "intake.launchPlatform": { en: "Source Origin", zh: "来源平台" },
  "intake.submit": { en: "Register Case", zh: "登记案件" },
  "intake.note": {
    en: "On-chain evidence is secured automatically from DexScreener, BscScan, and four.meme.",
    zh: "链上证据从 DexScreener、BscScan 和 four.meme 自动获取。",
  },

  // Archived Case Files (formerly Sample Cases)
  "cases.title": { en: "Archived Case Files", zh: "已归档案件" },
  "cases.subtitle": {
    en: "Prior examinations representing distinct death modes and survival modes across the meme lifecycle.",
    zh: "代表 Meme 生命周期中不同死亡模式和存活模式的先前检查。",
  },

  // Specimen Labels
  "specimen.terminal": { en: "TERMINAL SPECIMEN", zh: "终末标本" },
  "specimen.preserved": { en: "PRESERVED SPECIMEN", zh: "保存标本" },
  "specimen.open": { en: "OPEN EXAMINATION", zh: "在检标本" },

  // Report sections - V2 autopsy structure
  "report.label": { en: "AUTOPSY REPORT", zh: "尸检报告" },
  "report.caseHeader": { en: "Case Header", zh: "案件头部" },
  "report.caseBackground": { en: "Case Background", zh: "案件背景" },
  "report.externalExam": { en: "External Examination", zh: "外部检查" },
  "report.internalExam": { en: "Internal Examination", zh: "内部检查" },
  "report.pathologyFindings": { en: "Pathology Findings", zh: "病理发现" },
  "report.viralityMechanism": { en: "Mechanism of Virality", zh: "传播机制" },
  "report.deathMechanism": { en: "Mechanism of Death or Survival", zh: "死亡或存活机制" },
  "report.causeOfDeath": { en: "Cause of Death", zh: "死亡原因" },
  "report.contributingFactors": { en: "Contributing Factors", zh: "促成因素" },
  "report.mannerOfDeath": { en: "Manner of Death", zh: "死亡方式" },
  "report.evidenceLog": { en: "Evidence Log", zh: "证据日志" },
  "report.finalOpinion": { en: "Final Autopsy Opinion", zh: "最终尸检意见" },
  "report.diagnosticProtocol": { en: "Diagnostic Protocol", zh: "诊断协议" },
  "report.vitalSigns": { en: "Vital Signs", zh: "生命体征" },
  "report.confidenceOfDetermination": { en: "Confidence of Determination", zh: "判定置信度" },
  "report.uncertaintyNotes": { en: "Uncertainty Notes", zh: "不确定性说明" },
  "report.stageOfDecay": { en: "Estimated Stage of Decay", zh: "预估衰败阶段" },
  "report.survivalOutlook": { en: "Survival Outlook", zh: "存活前景" },

  // Buttons
  "btn.openCase": { en: "Open Case", zh: "开启案件" },
  "btn.reopenExam": { en: "Reopen Examination", zh: "重新检查" },
  "btn.viewReport": { en: "View Autopsy Report", zh: "查看尸检报告" },
  "btn.registerNew": { en: "Register New Case", zh: "登记新案件" },
  "btn.viewEvidence": { en: "View Evidence Chain", zh: "查看证据链" },

  // Loading States - V2 forensic stages
  "loading.intake": { en: "Case intake in progress", zh: "案件受理中" },
  "loading.validating": { en: "Validating specimen identity", zh: "验证标本身份" },
  "loading.accepted": { en: "Case accepted", zh: "案件已受理" },
  "loading.assigningId": { en: "Assigning case ID", zh: "分配案件编号" },
  "loading.securingFourmeme": { en: "Securing evidence from four.meme", zh: "从 four.meme 获取证据" },
  "loading.securingDex": { en: "Securing evidence from DexScreener", zh: "从 DexScreener 获取证据" },
  "loading.securingBsc": { en: "Securing evidence from BscScan", zh: "从 BscScan 获取证据" },
  "loading.verifyingChain": { en: "Verifying evidence chain", zh: "验证证据链" },
  "loading.externalExam": { en: "Performing external examination", zh: "执行外部检查" },
  "loading.catalogingMarkings": { en: "Cataloging visible markings", zh: "编录可见标记" },
  "loading.internalExam": { en: "Performing internal examination", zh: "执行内部检查" },
  "loading.parsingNarrative": { en: "Parsing narrative tissue", zh: "解析叙事组织" },
  "loading.evaluatingIntegrity": { en: "Evaluating structural integrity", zh: "评估结构完整性" },
  "loading.toxicology": { en: "Running toxicology screen", zh: "运行毒理学筛查" },
  "loading.degenerative": { en: "Screening for degenerative patterns", zh: "筛查退化模式" },
  "loading.viralityRecon": { en: "Reconstructing mechanism of virality", zh: "重建传播机制" },
  "loading.deathRecon": { en: "Reconstructing mechanism of death", zh: "重建死亡机制" },
  "loading.stageOfDecay": { en: "Estimating stage of decay", zh: "估算衰败阶段" },
  "loading.probableCause": { en: "Determining probable cause", zh: "确定可能原因" },
  "loading.mannerOfDeath": { en: "Classifying manner of death", zh: "分类死亡方式" },
  "loading.draftingOpinion": { en: "Drafting autopsy opinion", zh: "起草尸检意见" },
  "loading.opinionIssued": { en: "Final opinion issued", zh: "最终意见已出具" },

  // Thesis
  "thesis.label": { en: "AUTOPSY RATIONALE", zh: "尸检原理" },
  "thesis.title": { en: "From generation to cause-of-death reconstruction", zh: "从生成到死因重建" },
  "thesis.body": {
    en: "Most meme tools help analyze sentiment. Meme Autopsy reconstructs why projects spread, why they decayed, and what ultimately caused death — or what mechanisms preserved survival.",
    zh: "大多数 Meme 工具帮助分析情绪。Meme Autopsy 重建项目传播的原因、衰退的原因、以及最终导致死亡的原因——或保持存活的机制。",
  },
};

interface I18nContext {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
}

const I18nCtx = createContext<I18nContext>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  const t = useCallback(
    (key: string): string => {
      const entry = translations[key];
      if (!entry) return key;
      return entry[lang] ?? entry.en ?? key;
    },
    [lang]
  );

  return (
    <I18nCtx.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nCtx.Provider>
  );
}

export function useI18n() {
  return useContext(I18nCtx);
}
