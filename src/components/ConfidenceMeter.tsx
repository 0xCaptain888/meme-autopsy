"use client";

interface ConfidenceMeterProps {
  confidence: number;
}

function getColor(confidence: number) {
  if (confidence >= 70) return { bar: "bg-verdict-signal", text: "text-verdict-signal" };
  if (confidence >= 40) return { bar: "bg-verdict-active", text: "text-verdict-active" };
  return { bar: "bg-verdict-critical", text: "text-verdict-critical" };
}

export default function ConfidenceMeter({ confidence }: ConfidenceMeterProps) {
  const { bar, text } = getColor(confidence);
  const clampedConfidence = Math.min(100, Math.max(0, confidence));
  const circumference = 2 * Math.PI * 36;
  const strokeDashoffset = circumference - (clampedConfidence / 100) * circumference;

  return (
    <div className="flex items-center gap-4">
      {/* Circular meter */}
      <div className="relative w-20 h-20 flex-shrink-0">
        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
          {/* Background circle */}
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-forensic-border"
          />
          {/* Progress circle */}
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            className={bar.replace("bg-", "text-")}
            stroke="currentColor"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: "stroke-dashoffset 1s ease-out" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-mono text-lg font-bold ${text}`}>
            {clampedConfidence}%
          </span>
        </div>
      </div>
      <div>
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-forensic-muted block">
          CONFIDENCE
        </span>
        <span className={`font-mono text-sm font-medium ${text}`}>
          {clampedConfidence >= 70 ? "High" : clampedConfidence >= 40 ? "Moderate" : "Low"}
        </span>
      </div>
    </div>
  );
}
