import { SubLabel } from "@/components/shared";

interface HECBlockProps {
  title: string;
  hypothesis: string;
  evidence: string;
  conclusion: string;
}

export default function HypothesisEvidenceConclusionBlock({ title, hypothesis, evidence, conclusion }: HECBlockProps) {
  return (
    <div className="bg-forensic-panel border border-forensic-border rounded-sm p-6">
      <SubLabel className="mb-4">{title}</SubLabel>

      <div className="space-y-4">
        <div>
          <SubLabel className="mb-1">Hypothesis</SubLabel>
          <p className="font-body text-[12px] text-forensic-text leading-relaxed">{hypothesis}</p>
        </div>
        <div>
          <SubLabel className="mb-1">Evidence</SubLabel>
          <p className="font-body text-[12px] text-forensic-text leading-relaxed">{evidence}</p>
        </div>
        <div>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-verdict-active block mb-1">Conclusion</span>
          <p className="font-body text-[12px] text-bone leading-relaxed">{conclusion}</p>
        </div>
      </div>
    </div>
  );
}
