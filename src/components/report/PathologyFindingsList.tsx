import type { PathologyAlert } from "@/lib/types";
import { SubLabel, SeverityBadge, getSeverityBorder, getSeverityText } from "@/components/shared";

interface PathologyFindingsListProps {
  findings: PathologyAlert[];
}

export default function PathologyFindingsList({ findings }: PathologyFindingsListProps) {
  if (findings.length === 0) return null;

  return (
    <div className="bg-forensic-panel border border-forensic-border rounded-sm p-6">
      <SubLabel className="mb-4">PATHOLOGY FINDINGS</SubLabel>

      <div className="space-y-3">
        {findings.map((f, i) => (
          <div key={i} className={`border-l-2 ${getSeverityBorder(f.severity)} pl-4 py-2`}>
            <div className="flex items-center gap-2 mb-1">
              <span className={`font-mono text-xs font-bold ${getSeverityText(f.severity)}`}>{f.alert}</span>
              <SeverityBadge severity={f.severity} />
            </div>
            <p className="font-body text-[12px] text-forensic-muted leading-relaxed">{f.evidence}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
