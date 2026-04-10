"use client";

import { useI18n } from "@/lib/i18n";
import { zhReportContent } from "@/lib/i18n";
import type { AutopsyReport } from "@/lib/types";

interface InterventionListProps {
  report: AutopsyReport;
}

export default function InterventionList({ report }: InterventionListProps) {
  const { t, lang } = useI18n();
  const zhContent = zhReportContent[report.projectName];

  const interventions =
    lang === "zh" && zhContent ? zhContent.interventions : report.interventions;

  return (
    <div className="reveal" style={{ animationDelay: "0.3s" }}>
      {/* Section header */}
      <div className="mb-8">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-active">
          // RECOMMENDED ACTIONS
        </span>
        <h3 className="font-display text-2xl sm:text-3xl font-bold mt-2 mb-2">
          {t("interventions.title")}
        </h3>
        <p className="font-body text-forensic-text text-sm">
          {t("interventions.subtitle")}
        </p>
      </div>

      <div className="space-y-4">
        {interventions.map((intervention, i) => (
          <div
            key={i}
            className="reveal flex items-start gap-4 bg-forensic-panel border border-forensic-border rounded-sm p-5 hover:border-verdict-active/30 transition-colors duration-300"
            style={{ animationDelay: `${0.35 + i * 0.1}s` }}
          >
            {/* Number */}
            <div className="flex-shrink-0 w-8 h-8 rounded-full border border-verdict-active/40 bg-verdict-active/5 flex items-center justify-center">
              <span className="font-mono text-xs font-semibold text-verdict-active">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Text */}
            <p className="font-body text-sm text-bone/80 leading-relaxed pt-1">
              {intervention}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
