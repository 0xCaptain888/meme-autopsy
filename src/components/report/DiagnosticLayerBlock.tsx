import type { DiagnosticProtocol } from "@/lib/types";
import { SubLabel, ScoreBar, ScoreValue } from "@/components/shared";

interface DiagnosticLayerBlockProps {
  protocol: DiagnosticProtocol;
}

const layers = [
  { key: "surfaceSignals" as const, label: "Surface Signals" },
  { key: "structuralIntegrity" as const, label: "Structural Integrity" },
  { key: "degenerationFactors" as const, label: "Degeneration Factors" },
  { key: "survivalCapacity" as const, label: "Survival Capacity" },
];

export default function DiagnosticLayerBlock({ protocol }: DiagnosticLayerBlockProps) {
  return (
    <div className="bg-forensic-panel border border-forensic-border rounded-sm p-6">
      <SubLabel className="mb-4">DIAGNOSTIC PROTOCOL SUMMARY</SubLabel>

      <div className="space-y-4">
        {layers.map((layer) => {
          const d = protocol[layer.key];
          return (
            <div key={layer.key}>
              <div className="flex items-center justify-between mb-1">
                <SubLabel>{layer.label}</SubLabel>
                <ScoreValue score={d.score} className="text-xs" />
              </div>
              <ScoreBar score={d.score} className="mb-1.5" />
              <p className="font-body text-[11px] text-forensic-muted leading-relaxed">{d.reading}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
