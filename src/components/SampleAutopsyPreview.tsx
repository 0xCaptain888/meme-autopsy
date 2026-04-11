import { useI18n } from "@/lib/i18n";

interface SampleAutopsyPreviewProps {
  onViewFullReport: () => void;
}

export default function SampleAutopsyPreview({ onViewFullReport }: SampleAutopsyPreviewProps) {
  const { t } = useI18n();
  return (
    <section className="relative py-20 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-verdict-critical/[0.02] to-transparent" />
      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-critical">
            // SAMPLE AUTOPSY REPORT
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-3 mb-3 text-bone">
            Cause-of-death reconstruction at a glance
          </h2>
          <p className="font-body text-forensic-text text-sm max-w-lg mx-auto">
            Here is what a complete forensic examination produces. From evidence securing through final opinion issuance.
          </p>
        </div>

        <div className="reveal bg-forensic-panel border border-forensic-border rounded-sm overflow-hidden">
          <div className="h-px bg-verdict-active" />
          <div className="p-6 sm:p-8">
            {/* Case header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-4">
                <h3 className="font-mono text-2xl sm:text-3xl font-bold text-bone tracking-tight">DogePriest</h3>
                <span className="inline-flex items-center gap-2 px-3 py-1 font-mono text-[10px] tracking-[0.15em] font-semibold uppercase border border-verdict-active/40 bg-verdict-active/10 text-verdict-active rounded-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-verdict-active animate-pulse" />
                  OPEN EXAMINATION
                </span>
              </div>
              <span className="font-mono text-[10px] text-forensic-muted">MA-2026-0417</span>
            </div>

            {/* Pronounced condition */}
            <div className="mb-6 pb-5 border-b border-forensic-border">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-forensic-muted">PRONOUNCED CONDITION:</span>
                <span className="font-display text-lg font-semibold text-bone">Viral but Fragile</span>
                <span className="font-mono text-[10px] text-verdict-active">72% confidence</span>
              </div>
              <p className="font-body text-sm text-forensic-text mt-1">
                Probable Cause of Death: narrative exhaustion following novelty-driven spread
              </p>
            </div>

            {/* Diagnostic Protocol */}
            <div className="mb-6">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-forensic-muted mb-3 block">
                DIAGNOSTIC PROTOCOL
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Surface Signals", value: 84, color: "text-verdict-signal" },
                  { label: "Structural Integrity", value: 46, color: "text-verdict-active" },
                  { label: "Degeneration", value: 71, color: "text-verdict-critical" },
                  { label: "Survival Capacity", value: 38, color: "text-verdict-critical" },
                ].map((s) => (
                  <div key={s.label} className="bg-forensic-dark border border-forensic-border/50 rounded-sm p-3 text-center">
                    <span className="font-mono text-[9px] tracking-wider uppercase text-forensic-muted block mb-1">{s.label}</span>
                    <span className={`font-mono text-2xl font-bold ${s.color}`}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pathology alerts */}
            <div className="mb-6">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-forensic-muted mb-2 block">
                PATHOLOGY ALERTS
              </span>
              <div className="space-y-1.5">
                {[
                  "Doctrine-free identity — repeatable slogans without expandable lore",
                  "Price-reactive community behavior — participation tied to price, not identity",
                  "Narrative exhaustion risk — no expandable myth arc identified",
                ].map((a, i) => (
                  <div key={i} className="flex items-start gap-2 font-mono text-[11px] text-verdict-critical">
                    <span className="text-verdict-critical mt-0.5">▸</span>
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* View full report */}
            <div className="pt-4 border-t border-forensic-border flex items-center justify-between">
              <span className="font-mono text-[9px] text-forensic-muted tracking-wider">
                Manner of Death: Natural decay &middot; Survival Outlook: Pre-terminal
              </span>
              <button
                onClick={onViewFullReport}
                className="font-mono text-[11px] tracking-wider uppercase text-verdict-active hover:text-bone transition-colors flex items-center gap-1.5"
              >
                View Full Autopsy Report
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <path d="M2 5h6M6 3l2 2-2 2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
