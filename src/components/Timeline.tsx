"use client";

import { useI18n } from "@/lib/i18n";
import { zhReportContent } from "@/lib/i18n";
import type { AutopsyReport } from "@/lib/types";

interface TimelineProps {
  report: AutopsyReport;
}

const phaseIcons = [
  // Initial Hook
  <svg key="0" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/></svg>,
  // Social Spread
  <svg key="1" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v12M4 6l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  // Identity Formation
  <svg key="2" width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="4" y="4" width="8" height="8" stroke="currentColor" strokeWidth="1.5"/></svg>,
  // Fatigue Trigger
  <svg key="3" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  // Belief Collapse
  <svg key="4" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4l2-4z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>,
];

const riskLevels = ["LOW", "MODERATE", "ELEVATED", "HIGH", "CRITICAL"];

function getRiskColor(index: number): string {
  if (index <= 1) return "text-verdict-signal border-verdict-signal/30";
  if (index === 2) return "text-verdict-active border-verdict-active/30";
  return "text-verdict-critical border-verdict-critical/30";
}

export default function Timeline({ report }: TimelineProps) {
  const { t, lang } = useI18n();
  const zhContent = zhReportContent[report.projectName];

  const timelineItems =
    lang === "zh" && zhContent ? zhContent.timeline : report.timeline;

  return (
    <div className="reveal" style={{ animationDelay: "0.2s" }}>
      {/* Section header */}
      <div className="mb-8">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-critical">
          // LIFECYCLE PROJECTION
        </span>
        <h3 className="font-display text-2xl sm:text-3xl font-bold mt-2 mb-2">
          {t("timeline.title")}
        </h3>
        <p className="font-body text-forensic-text text-sm">
          {t("timeline.subtitle")}
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-forensic-border via-verdict-critical/40 to-forensic-border" />

        <div className="space-y-1">
          {timelineItems.map((item, i) => {
            const phaseKey = report.timeline[i]?.phase || item.phase;
            return (
              <div
                key={i}
                className="reveal relative flex gap-5 group"
                style={{ animationDelay: `${0.25 + i * 0.1}s` }}
              >
                {/* Node */}
                <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full border border-forensic-border bg-forensic-dark flex items-center justify-center group-hover:border-verdict-critical/50 transition-colors">
                  <span className="text-forensic-muted group-hover:text-verdict-critical transition-colors">
                    {phaseIcons[i]}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <div className="bg-forensic-panel border border-forensic-border rounded-sm p-5 group-hover:border-forensic-muted/40 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs tracking-wider uppercase text-bone font-medium">
                        {lang === "zh" ? item.phase : t(`phase.${phaseKey}`)}
                      </span>
                      <span
                        className={`font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 border rounded-sm ${getRiskColor(
                          i
                        )}`}
                      >
                        {riskLevels[i]}
                      </span>
                    </div>
                    <p className="font-body text-sm text-forensic-text leading-relaxed">
                      {item.diagnosis}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
