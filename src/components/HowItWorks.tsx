"use client";

import { useI18n } from "@/lib/i18n";

const steps = [
  {
    num: "01",
    titleEn: "Input a meme project narrative",
    titleZh: "输入 Meme 项目叙事",
    descEn: "Submit the project name, narrative description, community language, and any source context.",
    descZh: "提交项目名称、叙事描述、社区语言和任何来源上下文。",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="4" width="16" height="16" rx="1" strokeLinecap="round" />
        <path d="M8 9h8M8 12h6M8 15h4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "02",
    titleEn: "Run forensic analysis",
    titleZh: "运行法医分析",
    descEn: "The system scans symbolic patterns, narrative integrity, community signals, and belief collapse risk.",
    descZh: "系统扫描符号模式、叙事完整性、社区信号和信仰崩溃风险。",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 4v1M20 12h-1M12 20v-1M4 12h1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "03",
    titleEn: "Review verdict, failure points, and interventions",
    titleZh: "查看判定、失败节点和干预建议",
    descEn: "Get a structured forensic report with verdict, 6-dimension scoring, collapse timeline, and recovery actions.",
    descZh: "获取包含判定、6维评分、崩溃时间线和恢复行动的结构化法医报告。",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" strokeLinecap="round" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const { lang } = useI18n();

  return (
    <section className="relative py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-active">
            // {lang === "zh" ? "工作原理" : "HOW IT WORKS"}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-3 mb-4">
            {lang === "zh" ? "三步完成法医诊断" : "Forensic diagnosis in three steps"}
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="reveal relative bg-forensic-panel border border-forensic-border rounded-sm p-6 group hover:border-verdict-active/30 transition-all duration-500"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              {/* Step number */}
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-3xl font-bold text-forensic-border group-hover:text-verdict-active/40 transition-colors">
                  {step.num}
                </span>
                <span className="text-forensic-muted group-hover:text-verdict-active transition-colors">
                  {step.icon}
                </span>
              </div>

              <h3 className="font-mono text-sm font-medium text-bone mb-2 leading-snug">
                {lang === "zh" ? step.titleZh : step.titleEn}
              </h3>
              <p className="font-body text-xs text-forensic-text leading-relaxed">
                {lang === "zh" ? step.descZh : step.descEn}
              </p>

              {/* Connector line between cards (hidden on mobile) */}
              {i < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-forensic-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
