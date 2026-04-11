import type { SourceAcquisitionRecord } from "@/lib/examinationStateMachine";

interface SourceAcquisitionPanelProps {
  sources: SourceAcquisitionRecord[];
}

const statusDisplay: Record<string, { label: string; className: string }> = {
  not_requested: { label: "PENDING", className: "text-forensic-muted border-forensic-border" },
  acquiring: { label: "ACQUIRING", className: "text-verdict-active border-verdict-active/40 animate-pulse" },
  acquired: { label: "ACQUIRED", className: "text-verdict-signal border-verdict-signal/30" },
  partial: { label: "PARTIAL", className: "text-verdict-active border-verdict-active/30" },
  unavailable: { label: "UNAVAILABLE", className: "text-verdict-critical border-verdict-critical/30" },
  stale: { label: "STALE", className: "text-forensic-muted border-forensic-border" },
};

export default function SourceAcquisitionPanel({ sources }: SourceAcquisitionPanelProps) {
  return (
    <div className="bg-forensic-panel border border-forensic-border rounded-sm p-4">
      <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-forensic-muted block mb-3">
        EVIDENCE ACQUISITION
      </span>

      <div className="space-y-2">
        {sources.map((src) => {
          const display = statusDisplay[src.status] || statusDisplay.not_requested;
          return (
            <div key={src.name} className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-forensic-text">{src.name}</span>
              <span className={`font-mono text-[8px] tracking-wider uppercase px-1.5 py-0.5 border rounded-sm ${display.className}`}>
                {display.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
