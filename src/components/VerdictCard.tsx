"use client";

import { useI18n } from "@/lib/i18n";
import { zhReportContent } from "@/lib/i18n";
import type { AutopsyReport } from "@/lib/types";
import StatusBadge from "./StatusBadge";

interface VerdictCardProps {
  report: AutopsyReport;
}

export default function VerdictCard({ report }: VerdictCardProps) {
  const { t, lang } = useI18n();
  const zhContent = zhReportContent[report.projectName];

  const primaryCause =
    lang === "zh" && zhContent ? zhContent.primaryCause : report.primaryCause;
  const secondaryCauses =
    lang === "zh" && zhContent
      ? zhContent.secondaryCauses
      : report.secondaryCauses;
  const executiveSummary =
    lang === "zh" && zhContent
      ? zhContent.executiveSummary
      : report.executiveSummary;

  return (
    <div className="reveal bg-forensic-panel border border-forensic-border rounded-sm overflow-hidden">
      {/* Top accent bar */}
      <div
        className={`h-px ${
          report.statusBadge === "CRITICAL"
            ? "bg-verdict-critical"
            : report.statusBadge === "ACTIVE CASE"
            ? "bg-verdict-active"
            : "bg-verdict-signal"
        }`}
      />

      <div className="p-6 sm:p-8">
        {/* Project name + Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <h3 className="font-mono text-2xl sm:text-3xl font-bold text-bone tracking-tight">
            {report.projectName}
          </h3>
          <StatusBadge badge={report.statusBadge} />
        </div>

        {/* Verdict */}
        <div className="mb-6 pb-6 border-b border-forensic-border">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-forensic-muted">
            {t("report.verdict")}
          </span>
          <p className="font-display text-xl sm:text-2xl font-semibold mt-1 text-bone">
            {t(`verdict.${report.verdict}`)}
          </p>
        </div>

        {/* Primary cause */}
        <div className="mb-6">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-forensic-muted">
            {t("report.primaryCause")}
          </span>
          <p className="font-body text-base text-bone/90 mt-1">
            {primaryCause}
          </p>
        </div>

        {/* Secondary causes */}
        <div className="mb-6">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-forensic-muted">
            {t("report.secondaryCauses")}
          </span>
          <ul className="mt-2 space-y-2">
            {secondaryCauses.map((cause, i) => (
              <li
                key={i}
                className="flex items-start gap-2 font-body text-sm text-forensic-text"
              >
                <span className="text-verdict-critical mt-0.5 text-xs">&#9654;</span>
                {cause}
              </li>
            ))}
          </ul>
        </div>

        {/* Executive summary */}
        <div className="pt-6 border-t border-forensic-border">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-forensic-muted">
            {t("report.executiveSummary")}
          </span>
          <p className="font-body text-sm text-forensic-text leading-relaxed mt-2">
            {executiveSummary}
          </p>
        </div>
      </div>
    </div>
  );
}
