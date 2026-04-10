"use client";

import { useI18n } from "@/lib/i18n";
import { sampleReports } from "@/data/sampleCases";
import StatusBadge from "./StatusBadge";

interface SampleAutopsyPreviewProps {
  onViewFullReport: (caseName: string) => void;
}

const report = sampleReports["DogePriest"];

const scoreLabels: Record<string, { en: string; zh: string }> = {
  narrativeCoherence: { en: "Narrative", zh: "叙事" },
  memeSpreadability: { en: "Spread", zh: "传播" },
  symbolStickiness: { en: "Symbol", zh: "符号" },
  communityTrust: { en: "Trust", zh: "信任" },
  loreDepth: { en: "Lore", zh: "传说" },
  attentionResilience: { en: "Resilience", zh: "韧性" },
};

function getBarColor(v: number) {
  if (v >= 75) return "bg-verdict-signal";
  if (v >= 50) return "bg-verdict-active";
  return "bg-verdict-critical";
}

export default function SampleAutopsyPreview({ onViewFullReport }: SampleAutopsyPreviewProps) {
  const { lang } = useI18n();

  const primaryCause = lang === "zh"
    ? "强大的符号身份认同与薄弱的长期教义形成"
    : report.primaryCause;

  const timelineItems = lang === "zh"
    ? [
        { phase: "初始钩子", diagnosis: "宗教框架创造了即时的好奇心和对比度。" },
        { phase: "社会传播", diagnosis: "口号和反讽使项目具有高度可分享性。" },
        { phase: "疲劳触发", diagnosis: "缺乏更深层的叙事层次，核心笑话开始变平。" },
      ]
    : [
        report.timeline[0],
        report.timeline[1],
        report.timeline[3],
      ];

  const interventions = lang === "zh"
    ? [
        "引入更强大的神话弧线，设定反复出现的预言里程碑。",
        "创建超越价格反应的更多内部仪式。",
        "定义更清晰的敌人或世界观来加强部落身份认同。",
      ]
    : report.interventions;

  return (
    <section className="relative py-20 px-4">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-verdict-critical/[0.02] to-transparent" />

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-critical">
            // {lang === "zh" ? "示例尸检报告" : "SAMPLE AUTOPSY REPORT"}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-3 mb-3">
            {lang === "zh" ? "即时可见的法医诊断" : "Forensic diagnosis at a glance"}
          </h2>
          <p className="font-body text-forensic-text text-sm max-w-lg mx-auto">
            {lang === "zh"
              ? "无需点击。以下是一份完整的尸检报告预览。"
              : "No clicks needed. Here is what a complete autopsy report looks like."}
          </p>
        </div>

        {/* Report preview card */}
        <div className="reveal bg-forensic-panel border border-forensic-border rounded-sm overflow-hidden">
          {/* Top accent */}
          <div className="h-px bg-verdict-active" />

          <div className="p-6 sm:p-8">
            {/* Case header row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-4">
                <h3 className="font-mono text-2xl sm:text-3xl font-bold text-bone tracking-tight">
                  {report.projectName}
                </h3>
                <StatusBadge badge={report.statusBadge} />
              </div>
              <div className="font-mono text-[10px] text-forensic-muted tracking-wider">
                CASE-2024-0417 &middot; {lang === "zh" ? "分析于" : "Analyzed"} 2024-04-17T09:42:00Z
              </div>
            </div>

            {/* Verdict */}
            <div className="mb-6 pb-5 border-b border-forensic-border">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-forensic-muted">
                  {lang === "zh" ? "判定" : "VERDICT"}:
                </span>
                <span className="font-display text-lg font-semibold text-bone">
                  {lang === "zh" ? "病毒式但脆弱" : report.verdict}
                </span>
              </div>
              <p className="font-body text-sm text-forensic-text mt-1">
                {primaryCause}
              </p>
            </div>

            {/* Mini score grid */}
            <div className="mb-6">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-forensic-muted mb-3 block">
                {lang === "zh" ? "法医评分" : "FORENSIC SCORES"}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {Object.entries(report.scores).map(([key, value]) => (
                  <div key={key} className="bg-forensic-dark border border-forensic-border/50 rounded-sm p-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[9px] tracking-wider uppercase text-forensic-muted">
                        {lang === "zh" ? scoreLabels[key]?.zh : scoreLabels[key]?.en}
                      </span>
                      <span className={`font-mono text-sm font-bold ${
                        value >= 75 ? "text-verdict-signal" : value >= 50 ? "text-verdict-active" : "text-verdict-critical"
                      }`}>
                        {value}
                      </span>
                    </div>
                    <div className="w-full h-0.5 bg-forensic-border rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full progress-bar-fill ${getBarColor(value)}`}
                        style={{ "--target-width": `${value}%` } as React.CSSProperties}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Two columns: timeline + interventions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Timeline excerpt */}
              <div>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-forensic-muted mb-3 block">
                  {lang === "zh" ? "崩溃时间线（摘录）" : "COLLAPSE TIMELINE (EXCERPT)"}
                </span>
                <div className="space-y-2">
                  {timelineItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-forensic-dark border border-forensic-border/50 rounded-sm p-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full border border-forensic-border flex items-center justify-center mt-0.5">
                        <span className="font-mono text-[8px] text-forensic-muted">{i + 1}</span>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] tracking-wider uppercase text-bone block mb-0.5">
                          {item.phase}
                        </span>
                        <p className="font-body text-xs text-forensic-text leading-relaxed">
                          {item.diagnosis}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interventions */}
              <div>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-forensic-muted mb-3 block">
                  {lang === "zh" ? "建议干预" : "RECOMMENDED INTERVENTIONS"}
                </span>
                <div className="space-y-2">
                  {interventions.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-forensic-dark border border-forensic-border/50 rounded-sm p-3">
                      <span className="flex-shrink-0 font-mono text-[10px] font-semibold text-verdict-active mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="font-body text-xs text-forensic-text leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* View full report CTA */}
            <div className="mt-6 pt-5 border-t border-forensic-border flex items-center justify-between">
              <span className="font-mono text-[10px] text-forensic-muted tracking-wider">
                {lang === "zh" ? "这是完整报告的预览。" : "This is a preview of the full report."}
              </span>
              <button
                onClick={() => onViewFullReport("DogePriest")}
                className="group flex items-center gap-2 px-5 py-2 border border-verdict-critical/40 rounded-sm font-mono text-xs tracking-wider uppercase text-verdict-critical hover:bg-verdict-critical hover:text-white transition-all duration-300"
              >
                {lang === "zh" ? "查看完整报告" : "View Full Report"}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 6h8M7 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
