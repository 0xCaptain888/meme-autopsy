"use client";

import { useI18n } from "@/lib/i18n";
import type { AutopsyReport } from "@/lib/types";
import VerdictCard from "./VerdictCard";
import ScoreGrid from "./ScoreGrid";
import Timeline from "./Timeline";
import InterventionList from "./InterventionList";

interface ReportViewProps {
  report: AutopsyReport;
  onNewCase: () => void;
}

export default function ReportView({ report, onNewCase }: ReportViewProps) {
  const { t } = useI18n();

  return (
    <section className="min-h-screen pt-14 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Report header */}
        <div className="reveal pt-10 mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-critical">
                // {t("report.label")}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mt-1">
                {t("report.title")}
              </h2>
            </div>
            <button
              onClick={onNewCase}
              className="hidden sm:flex items-center gap-2 px-4 py-2 border border-forensic-border rounded-sm font-mono text-xs tracking-wider uppercase text-forensic-text hover:text-bone hover:border-bone transition-colors"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M6 1v10M1 6h10" strokeLinecap="round" />
              </svg>
              {t("report.newCase")}
            </button>
          </div>
          <p className="font-body text-forensic-text text-sm">
            {t("report.subtitle")}
          </p>
          {/* Divider */}
          <div className="mt-6 h-px bg-gradient-to-r from-verdict-critical/40 via-forensic-border to-transparent" />
        </div>

        {/* Report sections */}
        <div className="space-y-16">
          <VerdictCard report={report} />
          <ScoreGrid report={report} />
          <Timeline report={report} />
          <InterventionList report={report} />
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-forensic-border text-center">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-forensic-muted">
            {t("footer.text")}
          </p>
          {/* Mobile new case button */}
          <button
            onClick={onNewCase}
            className="sm:hidden mt-6 px-6 py-3 border border-forensic-border rounded-sm font-mono text-xs tracking-wider uppercase text-forensic-text hover:text-bone hover:border-bone transition-colors"
          >
            + {t("report.newCase")}
          </button>
        </div>
      </div>
    </section>
  );
}
