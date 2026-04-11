import type { AutopsyReport } from "@/lib/types";

interface CauseOfDeathCardProps {
  report: AutopsyReport;
}

export default function CauseOfDeathCard({ report }: CauseOfDeathCardProps) {
  if (!report.primaryCauseOfDeath) return null;

  return (
    <div className="bg-forensic-panel border border-forensic-border rounded-sm p-6">
      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-forensic-muted block mb-4">
        CAUSE OF DEATH
      </span>

      <p className="font-display text-lg font-bold text-bone mb-4">{report.primaryCauseOfDeath}</p>

      <div className="mb-4">
        <span className="font-mono text-[10px] text-forensic-muted uppercase block mb-1">Manner of Death</span>
        <p className="font-mono text-sm text-verdict-active">{report.mannerOfDeath}</p>
      </div>

      {report.contributingFactors.length > 0 && (
        <div>
          <span className="font-mono text-[10px] text-forensic-muted uppercase block mb-2">Contributing Factors</span>
          <div className="space-y-1.5">
            {report.contributingFactors.map((f, i) => (
              <div key={i} className="flex items-start gap-2 font-body text-[12px] text-forensic-text">
                <span className="text-verdict-critical mt-0.5">▸</span>
                <span>
                  {f.factor}
                  {f.evidence && <span className="text-forensic-muted"> — {f.evidence}</span>}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
