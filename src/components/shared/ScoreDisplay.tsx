import { cn } from "@/lib/utils";

/**
 * ScoreBar — Horizontal score bar with color coding.
 * Used in diagnostic layers, confidence displays, etc.
 */
export function ScoreBar({
  score,
  height = "h-1",
  className,
}: {
  score: number;
  height?: string;
  className?: string;
}) {
  const barColor =
    score >= 60 ? "bg-verdict-signal" : score >= 35 ? "bg-verdict-active" : "bg-verdict-critical";

  return (
    <div className={cn("w-full bg-forensic-dark rounded-full overflow-hidden", height, className)}>
      <div className={cn("h-full rounded-full", barColor)} style={{ width: `${score}%` }} />
    </div>
  );
}

/**
 * ScoreValue — Colored numeric score display.
 */
export function ScoreValue({
  score,
  className,
}: {
  score: number;
  className?: string;
}) {
  const color =
    score >= 60 ? "text-verdict-signal" : score >= 35 ? "text-verdict-active" : "text-verdict-critical";

  return <span className={cn("font-mono font-bold", color, className)}>{score}</span>;
}

/**
 * ConfidenceLevel — Returns "High" | "Moderate" | "Low" and associated color.
 */
export function getConfidenceDisplay(value: number) {
  if (value >= 70) return { level: "High", color: "text-verdict-signal", bgColor: "bg-verdict-signal" };
  if (value >= 40) return { level: "Moderate", color: "text-verdict-active", bgColor: "bg-verdict-active" };
  return { level: "Low", color: "text-verdict-critical", bgColor: "bg-verdict-critical" };
}
