import { SubLabel, ScoreBar, getConfidenceDisplay } from "@/components/shared";

interface ConfidenceUncertaintyBlockProps {
  confidence: number;
  uncertaintyNotes: string[];
}

export default function ConfidenceUncertaintyBlock({ confidence, uncertaintyNotes }: ConfidenceUncertaintyBlockProps) {
  const display = getConfidenceDisplay(confidence);

  return (
    <div className="bg-forensic-panel border border-forensic-border rounded-sm p-6">
      <SubLabel className="mb-4">CONFIDENCE &amp; UNCERTAINTY</SubLabel>

      <div className="mb-5">
        <SubLabel className="mb-1">Determination Confidence</SubLabel>
        <div className="flex items-center gap-3">
          <ScoreBar score={confidence} height="h-1.5" className="flex-1" />
          <span className={`font-mono text-sm font-bold ${display.color}`}>
            {display.level} ({confidence}%)
          </span>
        </div>
      </div>

      {uncertaintyNotes.length > 0 && (
        <div>
          <SubLabel className="mb-2">Uncertainty Notes</SubLabel>
          <div className="space-y-1.5">
            {uncertaintyNotes.map((note, i) => (
              <p key={i} className="font-body text-[12px] text-forensic-muted leading-relaxed pl-3 border-l border-forensic-border/50">
                {note}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
