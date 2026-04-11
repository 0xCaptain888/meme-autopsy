import type { ExaminationState } from "@/lib/examinationStateMachine";

interface ExaminationStageTrackerProps {
  stages: { id: ExaminationState; label: string }[];
  currentIndex: number;
}

export default function ExaminationStageTracker({ stages, currentIndex }: ExaminationStageTrackerProps) {
  return (
    <div className="relative">
      {stages.map((stage, i) => {
        const isComplete = i < currentIndex;
        const isActive = i === currentIndex;
        const isPending = i > currentIndex;

        return (
          <div key={stage.id} className="flex items-start gap-3 relative">
            {/* Vertical connector line */}
            {i < stages.length - 1 && (
              <div
                className="absolute left-[9px] top-[20px] w-px h-[calc(100%-4px)]"
                style={{
                  background: isComplete
                    ? "hsl(var(--verdict-signal))"
                    : isActive
                    ? "linear-gradient(to bottom, hsl(var(--verdict-active)), hsl(var(--forensic-border)))"
                    : "hsl(var(--forensic-border))",
                }}
              />
            )}

            {/* Node */}
            <div className="flex-shrink-0 w-[18px] h-[18px] flex items-center justify-center z-10">
              {isComplete && (
                <div className="w-[18px] h-[18px] rounded-full bg-verdict-signal/20 flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="hsl(var(--verdict-signal))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
              {isActive && (
                <div className="w-[18px] h-[18px] rounded-full border-2 border-verdict-active flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-verdict-active animate-pulse" />
                </div>
              )}
              {isPending && (
                <div className="w-[18px] h-[18px] rounded-full border border-forensic-border flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-forensic-border" />
                </div>
              )}
            </div>

            {/* Label */}
            <div className={`pb-4 ${isPending ? "opacity-30" : ""}`}>
              <span
                className={`font-mono text-xs tracking-wider leading-tight block ${
                  isActive ? "text-verdict-active font-medium" : isComplete ? "text-forensic-text" : "text-forensic-muted"
                }`}
              >
                {stage.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
