import { useI18n } from "@/lib/i18n";
import { archivedCases } from "@/data/sampleCases";

interface ArchivedCaseFilesProps {
  onSelectCase: (key: string) => void;
}

export default function ArchivedCaseFiles({ onSelectCase }: ArchivedCaseFilesProps) {
  const { t, lang } = useI18n();
  return (
    <section className="relative py-20 px-4" id="archived-cases">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-critical block mb-3">
            // CASE FILES
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-bone mb-3">
            {t("cases.title")}
          </h2>
          <p className="font-body text-sm text-forensic-text max-w-lg">
            {t("cases.subtitle")}
          </p>
        </div>

        <div className="space-y-4">
          {archivedCases.map((c, i) => {
            const isTerminal = c.accentClass === "verdict-critical";
            const isPreserved = c.accentClass === "verdict-signal";
            const borderHover = isTerminal
              ? "hover:border-verdict-critical/40"
              : isPreserved
              ? "hover:border-verdict-signal/40"
              : "hover:border-verdict-active/40";
            const labelColor = isTerminal
              ? "text-verdict-critical border-verdict-critical/30"
              : isPreserved
              ? "text-verdict-signal border-verdict-signal/30"
              : "text-verdict-active border-verdict-active/30";
            const conditionColor = isTerminal
              ? "text-verdict-critical"
              : isPreserved
              ? "text-verdict-signal"
              : "text-verdict-active";

            return (
              <button
                key={c.key}
                onClick={() => onSelectCase(c.key)}
                className={`reveal w-full text-left bg-forensic-panel border border-forensic-border rounded-sm ${borderHover} transition-all duration-300 group`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-lg font-bold text-bone tracking-tight">{c.key}</span>
                        <span className="font-mono text-[9px] text-forensic-muted">{c.caseId}</span>
                      </div>
                      <p className={`font-mono text-sm ${conditionColor} mb-1`}>{c.condition}</p>
                      <p className="font-body text-xs text-forensic-muted leading-relaxed">{c.causeOfDeath}</p>
                    </div>
                    <span className={`flex-shrink-0 font-mono text-[8px] tracking-wider uppercase px-2 py-1 border rounded-sm ${labelColor}`}>
                      {c.specimenLabel}
                    </span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-forensic-border/30">
                    <span className="font-mono text-[10px] tracking-wider uppercase text-forensic-muted group-hover:text-bone transition-colors flex items-center gap-1.5">
                      {lang === "zh" ? "查看尸检报告" : "View Autopsy Report"}
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.3">
                        <path d="M2 5h6M6 3l2 2-2 2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
