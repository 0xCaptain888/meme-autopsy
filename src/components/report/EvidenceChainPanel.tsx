import type { EvidenceSource } from "@/lib/types";
import { SubLabel, StatusChip, getStatusVariant } from "@/components/shared";

interface EvidenceChainPanelProps {
  sources: EvidenceSource[];
}

export default function EvidenceChainPanel({ sources }: EvidenceChainPanelProps) {
  return (
    <div className="bg-forensic-panel border border-forensic-border rounded-sm p-6">
      <SubLabel className="mb-4">EVIDENCE CHAIN</SubLabel>

      <div className="space-y-3">
        {sources.map((src) => (
          <div key={src.name} className="flex items-center justify-between py-2 border-b border-forensic-border/30 last:border-0">
            <div>
              <span className="font-mono text-xs text-bone">{src.name}</span>
              {src.timestamp && (
                <span className="font-mono text-[9px] text-forensic-muted ml-2">
                  {new Date(src.timestamp).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                </span>
              )}
            </div>
            <StatusChip label={src.status.toUpperCase()} variant={getStatusVariant(src.status)} />
          </div>
        ))}
      </div>
    </div>
  );
}
