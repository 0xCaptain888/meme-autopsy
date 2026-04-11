import { cn } from "@/lib/utils";
import ReportSection from "./ReportSection";

type LifecycleStage = "active" | "decaying" | "terminal" | "preserved";

const LIFECYCLE_STAGES: { key: LifecycleStage; label: string }[] = [
  { key: "preserved", label: "Preserved" },
  { key: "active", label: "Active" },
  { key: "decaying", label: "Decaying" },
  { key: "terminal", label: "Terminal" },
];

function inferStage(stageText: string): LifecycleStage {
  const lower = stageText.toLowerCase();
  if (lower.includes("terminal") || lower.includes("dead")) return "terminal";
  if (lower.includes("decay") || lower.includes("entering")) return "decaying";
  if (lower.includes("preserved") || lower.includes("stable") || lower.includes("resilient")) return "preserved";
  return "active";
}

const stageColor: Record<LifecycleStage, string> = {
  preserved: "bg-verdict-signal",
  active: "bg-verdict-active",
  decaying: "bg-amber-500",
  terminal: "bg-verdict-critical",
};

const stageTextColor: Record<LifecycleStage, string> = {
  preserved: "text-verdict-signal",
  active: "text-verdict-active",
  decaying: "text-amber-500",
  terminal: "text-verdict-critical",
};

interface StageOfDecayBlockProps {
  stageOfDecay: string;
  estimatedFailureWindow?: string;
}

export default function StageOfDecayBlock({ stageOfDecay, estimatedFailureWindow }: StageOfDecayBlockProps) {
  const current = inferStage(stageOfDecay);

  return (
    <ReportSection label="ESTIMATED TIME OF DEATH / STAGE OF DECAY">
      {/* Lifecycle bar */}
      <div className="flex items-center gap-1 mb-4">
        {LIFECYCLE_STAGES.map((s) => {
          const isActive = s.key === current;
          return (
            <div key={s.key} className="flex-1 flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "w-full h-1.5 rounded-full transition-all",
                  isActive ? stageColor[s.key] : "bg-forensic-border/40"
                )}
              />
              <span
                className={cn(
                  "font-mono text-[9px] tracking-wider uppercase transition-colors",
                  isActive ? stageTextColor[s.key] : "text-forensic-muted/50"
                )}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Stage description */}
      <p className="font-body text-sm text-forensic-text leading-relaxed">{stageOfDecay}</p>

      {/* Failure window */}
      {estimatedFailureWindow && (
        <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-verdict-critical/5 border border-verdict-critical/20 rounded-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-verdict-critical animate-pulse flex-shrink-0" />
          <span className="font-mono text-[11px] text-verdict-critical">
            Estimated failure window: {estimatedFailureWindow}
          </span>
        </div>
      )}
    </ReportSection>
  );
}
