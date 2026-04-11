import { useI18n } from "@/lib/i18n";
import { archivedCases } from "@/data/sampleCases";

interface ArchivedCaseFilesProps {
  onSelectCase: (key: string) => void;
}

export default function ArchivedCaseFiles({ onSelectCase }: ArchivedCaseFilesProps) {
  const { t } = useI18n();
  return (
    <section className="relative py-20 px-4" id="archived-cases">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-critical">
            // CASE FILES
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-3 mb-4 text-bone">
            {t("cases.title")}
          </h2>
          <p className="font-body text-forensic-text max-w-xl mx-auto">
            {t("cases.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {archivedCases.map((c, i) => {
            const isTerminal = c.accentClass === "verdict-critical";
            const isPreserved = c.accentClass === "verdict-signal";
            const borderHover = isTerminal ? "hover:border-verdict-critical/50" : isPreserved ? "hover:border-verdict-signal/50" : "hover:border-verdict-active/50";
            const accentBg = isTerminal ? "bg-verdict-critical" : isPreserved ? "bg-verdict-signal" : "bg-verdict-active";
            const labelColor = isTerminal ? "text-verdict-critical border-verdict-critical/40 bg-verdict-critical/10" : isPreserved ? "text-verdict-signal border-verdict-signal/40 bg-verdict-signal/10" : "text-verdict-active border-verdict-active/40 bg-verdict-active/10";
            const dotColor = isTerminal ? "bg-verdict-critical" : isPreserved ? "bg-verdict-signal" : "bg-verdict-active";

            return (
              <button
                key={c.key}
                onClick={() => onSelectCase(c.key)}
                className={`reveal group relative text-left bg-forensic-panel border border-forensic-border rounded-sm ${borderHover} transition-all duration-500 overflow-hidden`}
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <div className={`h-px ${accentBg}`} />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[9px] tracking-wider text-forensic-muted">{c.caseId}</span>
                    <span className={`inline-flex items-center gap-2 px-3 py-1 font-mono text-[10px] tracking-[0.15em] font-semibold uppercase border rounded-sm ${labelColor}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`} />
                      {c.specimenLabel}
                    </span>
                  </div>
                  <h3 className="font-mono text-xl font-bold text-bone mb-1 group-hover:text-foreground transition-colors tracking-tight">
                    {c.key}
                  </h3>
                  <p className="font-mono text-xs text-forensic-text mb-3">
                    {c.condition}
                  </p>
                  <p className="font-body text-sm text-forensic-muted leading-relaxed">
                    {c.causeOfDeath}
                  </p>
                  <div className="mt-4 pt-3 border-t border-forensic-border/50">
                    <span className="font-mono text-[10px] tracking-wider uppercase text-forensic-muted group-hover:text-bone transition-colors flex items-center gap-1.5">
                      View Autopsy Report
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
