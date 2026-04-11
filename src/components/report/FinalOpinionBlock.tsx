interface FinalOpinionBlockProps {
  opinion: string;
}

export default function FinalOpinionBlock({ opinion }: FinalOpinionBlockProps) {
  return (
    <div className="bg-forensic-panel border border-verdict-critical/20 rounded-sm p-6">
      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-verdict-critical block mb-4">
        FINAL AUTOPSY OPINION
      </span>

      <p className="font-body text-sm text-bone leading-relaxed">{opinion}</p>
    </div>
  );
}
