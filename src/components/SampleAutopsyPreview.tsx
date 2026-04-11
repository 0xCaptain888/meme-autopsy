import { useI18n } from "@/lib/i18n";

interface SampleAutopsyPreviewProps {
  onViewFullReport: () => void;
}

export default function SampleAutopsyPreview({ onViewFullReport }: SampleAutopsyPreviewProps) {
  const { lang } = useI18n();
  return (
    <section className="relative py-20 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-verdict-critical/[0.015] to-transparent" />
      <div className="relative max-w-4xl mx-auto">
        <div className="mb-12">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-critical block mb-3">
            // SAMPLE FINAL OPINION
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-bone mb-3">
            {lang === "zh" ? "最终意见样本" : "Sample Final Opinion"}
          </h2>
          <p className="font-body text-sm text-forensic-text max-w-lg">
            {lang === "zh"
              ? "完整法医检查的最终产物——正式尸检意见，附带判定、证据链和不确定性说明。"
              : "The final product of a complete forensic examination — a formal autopsy opinion with determination, evidence chain, and uncertainty notes."}
          </p>
        </div>

        <div className="reveal bg-forensic-panel border border-forensic-border rounded-sm overflow-hidden">
          <div className="h-px bg-verdict-active" />
          <div className="p-6 sm:p-8">
            {/* Case identity */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xl font-bold text-bone">DogePriest</span>
                <span className="font-mono text-[9px] text-forensic-muted">MA-2026-0417</span>
              </div>
              <span className="font-mono text-[9px] tracking-wider uppercase text-verdict-active px-2 py-0.5 border border-verdict-active/30 rounded-sm">
                Opinion Issued
              </span>
            </div>

            {/* Determination */}
            <div className="mb-5 pb-4 border-b border-forensic-border/50">
              <span className="font-mono text-[9px] text-forensic-muted uppercase block mb-1">Pronounced Condition</span>
              <p className="font-display text-2xl font-bold text-verdict-active mb-2">Viral but Fragile</p>
              <div className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-[11px]">
                <span className="text-forensic-muted">
                  Cause: <span className="text-forensic-text">Narrative exhaustion following novelty-driven spread</span>
                </span>
                <span className="text-forensic-muted">
                  Manner: <span className="text-forensic-text">Natural decay</span>
                </span>
                <span className="text-forensic-muted">
                  Confidence: <span className="text-verdict-active">72%</span>
                </span>
              </div>
            </div>

            {/* Final Opinion excerpt */}
            <div className="mb-5">
              <span className="font-mono text-[9px] text-verdict-critical uppercase block mb-2">Final Opinion</span>
              <p className="font-body text-sm text-bone leading-relaxed">
                DogePriest presents as a specimen with strong initial symbolic compression but critically deficient structural integrity. The religious-irony fusion created effective surface-level virality, but examination reveals no expandable lore, no doctrine formation, and no adaptive mechanisms...
              </p>
            </div>

            {/* Uncertainty */}
            <div className="mb-5">
              <span className="font-mono text-[9px] text-forensic-muted uppercase block mb-1">Uncertainty</span>
              <p className="font-body text-[11px] text-forensic-muted italic leading-relaxed">
                Determination limited by partial holder visibility from BscScan. Evidence suggests, but does not conclusively establish, post-launch identity persistence.
              </p>
            </div>

            {/* View full */}
            <div className="pt-4 border-t border-forensic-border/50">
              <button
                onClick={onViewFullReport}
                className="font-mono text-[11px] tracking-wider uppercase text-verdict-active hover:text-bone transition-colors flex items-center gap-1.5"
              >
                {lang === "zh" ? "查看完整尸检报告" : "View Full Autopsy Report"}
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
