import { SubLabel } from "@/components/shared";

interface EvidenceLogPanelProps {
  evidenceLog: {
    keyQuotes: string[];
    marketEvidence: string[];
    holderEvidence: string[];
    narrativeEvidence: string[];
  };
}

function LogGroup({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="mb-4 last:mb-0">
      <SubLabel className="mb-2">{title}</SubLabel>
      <div className="space-y-1">
        {items.map((item, i) => (
          <p key={i} className="font-mono text-[11px] text-forensic-text pl-3 border-l border-forensic-border/30">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function EvidenceLogPanel({ evidenceLog }: EvidenceLogPanelProps) {
  return (
    <div className="bg-forensic-panel border border-forensic-border rounded-sm p-6">
      <SubLabel className="mb-4">EVIDENCE LOG</SubLabel>

      <LogGroup title="Key Quotes" items={evidenceLog.keyQuotes} />
      <LogGroup title="Market Evidence" items={evidenceLog.marketEvidence} />
      <LogGroup title="Holder Evidence" items={evidenceLog.holderEvidence} />
      <LogGroup title="Narrative Evidence" items={evidenceLog.narrativeEvidence} />
    </div>
  );
}
