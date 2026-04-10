"use client";

import { useI18n } from "@/lib/i18n";
import type { AutopsyReport } from "@/lib/types";

interface ForensicNotesProps {
  report: AutopsyReport;
}

// Forensic notes data per case
const notesData: Record<
  string,
  {
    en: { strongestSymbol: string; missingLayer: string; communityPattern: string; coreWeakness: string };
    zh: { strongestSymbol: string; missingLayer: string; communityPattern: string; coreWeakness: string };
  }
> = {
  DogePriest: {
    en: {
      strongestSymbol: "The prophet-dog archetype — a fusion of religious authority and meme absurdity that creates instant recognition.",
      missingLayer: "Long-term doctrine and escalation narrative. The project lacks a mythology beyond the initial joke.",
      communityPattern: "Ritualized language (\"blessings\", \"tests of faith\") creates belonging but remains price-dependent.",
      coreWeakness: "Without a mission beyond irony, the meme cannot convert humor into lasting conviction.",
    },
    zh: {
      strongestSymbol: "先知狗原型 — 宗教权威与 Meme 荒谬的融合，创造了即时辨识度。",
      missingLayer: "长期教义和升级叙事。项目缺乏超越最初笑话的神话体系。",
      communityPattern: "仪式化语言（\"祝福\"、\"信仰考验\"）创造归属感，但仍依赖于价格。",
      coreWeakness: "没有超越反讽的使命，Meme 无法将幽默转化为持久的信念。",
    },
  },
  BananaFax: {
    en: {
      strongestSymbol: "None identified. The banana-fax combination is random and lacks symbolic weight.",
      missingLayer: "Every layer — narrative, identity, belief structure, and community ritual are all absent.",
      communityPattern: "Disposable catchphrases with no identity reinforcement or insider status markers.",
      coreWeakness: "Pure randomness without internal logic. The concept has no structural basis for cultural survival.",
    },
    zh: {
      strongestSymbol: "未识别。香蕉-传真组合是随机的，缺乏符号重量。",
      missingLayer: "每一层都缺失 — 叙事、身份、信仰结构和社区仪式全部不存在。",
      communityPattern: "一次性口号，没有身份强化或内部人士身份标记。",
      coreWeakness: "纯粹的随机性，没有内部逻辑。概念没有文化生存的结构基础。",
    },
  },
  SaintMeme: {
    en: {
      strongestSymbol: "The \"sacred vs. corporate\" opposition — frames meme creation as spiritual warfare, giving participants moral purpose.",
      missingLayer: "Minimal. The framework is nearly complete. Minor gap in formalized governance rituals.",
      communityPattern: "Canon drops, remix challenges, and conversion language create layered engagement and insider escalation.",
      coreWeakness: "Potential over-reliance on anti-corporate framing. If the enemy weakens, the mission needs independent purpose.",
    },
    zh: {
      strongestSymbol: "\"神圣 vs. 企业\" 的对立 — 将 Meme 创作框架为精神战争，赋予参与者道德目的。",
      missingLayer: "很少。框架几乎完整。正式化治理仪式存在轻微差距。",
      communityPattern: "经典发布、混搭挑战和转化语言创造了分层参与和内部人士升级。",
      coreWeakness: "可能过度依赖反企业框架。如果敌人弱化，使命需要独立目的。",
    },
  },
};

// Fallback for custom entries
const defaultNotes = {
  en: {
    strongestSymbol: "Insufficient data to identify a dominant symbol. Submit more narrative context.",
    missingLayer: "Further analysis required to map structural gaps.",
    communityPattern: "Community signal density is below diagnostic threshold.",
    coreWeakness: "Narrative foundation requires deeper investigation.",
  },
  zh: {
    strongestSymbol: "数据不足以识别主导符号。请提交更多叙事上下文。",
    missingLayer: "需要进一步分析来映射结构性差距。",
    communityPattern: "社区信号密度低于诊断阈值。",
    coreWeakness: "叙事基础需要更深入的调查。",
  },
};

const noteFields = [
  { key: "strongestSymbol", labelEn: "Strongest Symbol", labelZh: "最强符号" },
  { key: "missingLayer", labelEn: "Missing Layer", labelZh: "缺失层" },
  { key: "communityPattern", labelEn: "Community Pattern", labelZh: "社区模式" },
  { key: "coreWeakness", labelEn: "Core Weakness", labelZh: "核心弱点" },
] as const;

export default function ForensicNotes({ report }: ForensicNotesProps) {
  const { lang } = useI18n();
  const caseNotes = notesData[report.projectName];
  const notes = caseNotes ? caseNotes[lang] : defaultNotes[lang];

  const titleEn = "Forensic Notes";
  const titleZh = "法医备注";
  const subtitleEn = "Supplementary diagnostic observations from the forensic analysis pipeline.";
  const subtitleZh = "来自法医分析管道的补充诊断观察。";

  return (
    <div className="reveal" style={{ animationDelay: "0.35s" }}>
      {/* Section header */}
      <div className="mb-8">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-forensic-muted">
          // SUPPLEMENTARY DATA
        </span>
        <h3 className="font-display text-2xl sm:text-3xl font-bold mt-2 mb-2">
          {lang === "zh" ? titleZh : titleEn}
        </h3>
        <p className="font-body text-forensic-text text-sm">
          {lang === "zh" ? subtitleZh : subtitleEn}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {noteFields.map((field, i) => (
          <div
            key={field.key}
            className="reveal bg-forensic-panel border border-forensic-border rounded-sm p-5 hover:border-forensic-muted/40 transition-colors duration-300"
            style={{ animationDelay: `${0.4 + i * 0.08}s` }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-1 rounded-full bg-verdict-critical" />
              <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-forensic-muted">
                {lang === "zh" ? field.labelZh : field.labelEn}
              </span>
            </div>
            <p className="font-body text-sm text-bone/80 leading-relaxed">
              {notes[field.key]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
