import type { AutopsyReport } from "@/lib/types";
import { SubLabel, getConfidenceDisplay } from "@/components/shared";

interface DeterminationBlockProps {
  report: AutopsyReport;
}

export default function DeterminationBlock({ report }: DeterminationBlockProps) {
  const confidence = getConfidenceDisplay(report.confidenceOfDetermination);

  return (
    <div className="bg-forensic-panel border border-forensic-border rounded-sm p-6">
      <SubLabel className="mb-5">CENTRAL DETERMINATION</SubLabel>

      {/* Pronounced Condition */}
      <div className="mb-6">
        <SubLabel className="mb-1">Pronounced Condition</SubLabel>
        <p className="font-display text-2xl sm:text-3xl font-bold text-verdict-active leading-tight">
          {report.pronouncedCondition}
        </p>
      </div>

      {/* Primary Determination */}
      <div className="mb-5">
        <SubLabel className="mb-1">
          {report.primaryCauseOfDeath ? "Primary Cause of Death" : "Primary Survival Mechanism"}
        </SubLabel>
        <p className="font-body text-sm text-bone leading-relaxed">
          {report.primaryCauseOfDeath || report.primarySurvivalMechanism || "Undetermined"}
        </p>
      </div>

      {/* Manner / Outlook */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-5">
        {report.mannerOfDeath && (
          <div>
            <SubLabel className="mb-1">Manner of Death</SubLabel>
            <p className="font-mono text-sm text-forensic-text">{report.mannerOfDeath}</p>
          </div>
        )}
        {report.survivalOutlook && (
          <div>
            <SubLabel className="mb-1">Survival Outlook</SubLabel>
            <p className="font-mono text-sm text-forensic-text">{report.survivalOutlook}</p>
          </div>
        )}
      </div>

      {/* Confidence */}
      <div className="pt-4 border-t border-forensic-border/50">
        <div className="flex items-center gap-3">
          <SubLabel>Confidence of Determination</SubLabel>
          <span className={`font-mono text-sm font-bold ${confidence.color}`}>
            {confidence.level} ({report.confidenceOfDetermination}%)
          </span>
        </div>
      </div>
    </div>
  );
}
