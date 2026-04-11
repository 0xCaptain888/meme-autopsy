import type { AutopsyReport } from "@/lib/types";

interface SurvivalMechanismCardProps {
  report: AutopsyReport;
}

export default function SurvivalMechanismCard({ report }: SurvivalMechanismCardProps) {
  if (!report.primarySurvivalMechanism) return null;

  return (
    <div className="bg-forensic-panel border border-forensic-border rounded-sm p-6">
      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-forensic-muted block mb-4">
        SURVIVAL MECHANISM
      </span>

      <p className="font-display text-lg font-bold text-bone mb-4">{report.primarySurvivalMechanism}</p>

      {report.survivalOutlook && (
        <div>
          <span className="font-mono text-[10px] text-forensic-muted uppercase block mb-1">Survival Outlook</span>
          <p className="font-mono text-sm text-verdict-signal">{report.survivalOutlook}</p>
        </div>
      )}
    </div>
  );
}
