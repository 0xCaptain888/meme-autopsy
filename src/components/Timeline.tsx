"use client";

import { useI18n } from "@/lib/i18n";
import type { TimelineItem } from "@/lib/types";

interface TimelineProps {
  timeline: TimelineItem[];
}

const phaseIcons = [
  <svg key="0" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/></svg>,
  <svg key="1" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v12M4 6l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg key="2" width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="4" y="4" width="8" height="8" stroke="currentColor" strokeWidth="1.5"/></svg>,
  <svg key="3" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  <svg key="4" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4l2-4z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>,
];

function getRiskColor(level?: string): string {
  switch (level) {
    case "LOW":
      return "text-verdict-signal border-verdict-signal/30";
    case "MODERATE":
      return "text-verdict-active border-verdict-active/30";
    case "ELEVATED":
      return "text-orange-400 border-orange-400/30";
    case "HIGH":
      return "text-verdict-critical border-verdict-critical/30";
    case "CRITICAL":
      return "text-red-400 border-red-400/30 bg-red-400/5";
    default:
      return "text-forensic-muted border-forensic-border";
  }
}

export default function Timeline({ timeline }: TimelineProps) {
  const { t } = useI18n();
  return (
    <div className="reveal" style={{ animationDelay: "0.2s" }}>
      {/* Section header */}
      <div className="mb-8">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-critical">
          // COLLAPSE TIMELINE
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
          {timeline.map((item, i) => (
            <div
              key={i}
              className="reveal relative flex gap-5 group"
              style={{ animationDelay: `${0.25 + i * 0.1}s` }}
            >
              {/* Node */}
              <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full border border-forensic-border bg-forensic-dark flex items-center justify-center group-hover:border-verdict-critical/50 transition-colors">
                <span className="text-forensic-muted group-hover:text-verdict-critical transition-colors">
                  {phaseIcons[i] || phaseIcons[0]}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 pb-8">
                <div className="bg-forensic-panel border border-forensic-border rounded-sm p-5 group-hover:border-forensic-muted/40 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs tracking-wider uppercase text-bone font-medium">
                      {item.phase}
                    </span>
                    {item.riskLevel && (
                      <span className={`font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 border rounded-sm ${getRiskColor(item.riskLevel)}`}>
                        {item.riskLevel}
                      </span>
                    )}
                  </div>
                  <p className="font-body text-sm text-forensic-text leading-relaxed">
                    {item.diagnosis}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
