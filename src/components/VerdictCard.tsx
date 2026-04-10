"use client";

import type { Verdict, StatusBadge as StatusBadgeType } from "@/lib/types";
import StatusBadge from "./StatusBadge";
import ConfidenceMeter from "./ConfidenceMeter";

interface VerdictCardProps {
  verdict: Verdict;
  confidence: number;
  primaryCause: string;
  statusBadge: StatusBadgeType;
}

function getVerdictColor(verdict: Verdict): string {
  switch (verdict) {
    case "Dead on Arrival":
    case "Chaos Without Cohesion":
      return "text-verdict-critical";
    case "Viral but Fragile":
    case "Short-Term Attention Trap":
      return "text-verdict-active";
    case "Stable Cult Potential":
    case "High Conviction Meme":
      return "text-verdict-signal";
    default:
      return "text-bone";
  }
}

function getAccentColor(verdict: Verdict): string {
  switch (verdict) {
    case "Dead on Arrival":
    case "Chaos Without Cohesion":
      return "bg-verdict-critical";
    case "Viral but Fragile":
    case "Short-Term Attention Trap":
      return "bg-verdict-active";
    case "Stable Cult Potential":
    case "High Conviction Meme":
      return "bg-verdict-signal";
    default:
      return "bg-forensic-border";
  }
}

export default function VerdictCard({ verdict, confidence, primaryCause, statusBadge }: VerdictCardProps) {
  return (
    <div className="reveal bg-forensic-panel border border-forensic-border rounded-sm overflow-hidden">
      {/* Top accent bar */}
      <div className={`h-px ${getAccentColor(verdict)}`} />

      <div className="p-6 sm:p-8">
        {/* Badge + Verdict */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-forensic-muted">
                VERDICT
              </span>
              <StatusBadge badge={statusBadge} />
            </div>
            <p className={`font-display text-2xl sm:text-3xl font-bold ${getVerdictColor(verdict)}`}>
              {verdict}
            </p>
          </div>
          <ConfidenceMeter confidence={confidence} />
        </div>

        {/* Primary cause */}
        <div className="pt-5 border-t border-forensic-border">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-forensic-muted">
            PRIMARY CAUSE
          </span>
          <p className="font-body text-base text-bone/90 mt-1 leading-relaxed">
            {primaryCause}
          </p>
        </div>
      </div>
    </div>
  );
}
