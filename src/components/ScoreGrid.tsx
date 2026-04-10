"use client";

import { useI18n } from "@/lib/i18n";
import { zhScoreExplanations } from "@/lib/i18n";
import type { AutopsyReport } from "@/lib/types";

interface ScoreGridProps {
  report: AutopsyReport;
}

const scoreKeys = [
  "narrativeCoherence",
  "memeSpreadability",
  "symbolStickiness",
  "communityTrust",
  "loreDepth",
  "attentionResilience",
] as const;

function getScoreColor(score: number): string {
  if (score >= 75) return "bg-verdict-signal";
  if (score >= 50) return "bg-verdict-active";
  return "bg-verdict-critical";
}

function getScoreTextColor(score: number): string {
  if (score >= 75) return "text-verdict-signal";
  if (score >= 50) return "text-verdict-active";
  return "text-verdict-critical";
}

export default function ScoreGrid({ report }: ScoreGridProps) {
  const { t, lang } = useI18n();
  const zhExplanations = zhScoreExplanations[report.projectName];

  return (
    <div className="reveal" style={{ animationDelay: "0.1s" }}>
      {/* Section header */}
      <div className="mb-8">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-critical">
          // DIAGNOSTIC SCORES
        </span>
        <h3 className="font-display text-2xl sm:text-3xl font-bold mt-2 mb-2">
          {t("breakdown.title")}
        </h3>
        <p className="font-body text-forensic-text text-sm">
          {t("breakdown.subtitle")}
        </p>
      </div>

      {/* Score cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {scoreKeys.map((key, i) => {
          const score = report.scores[key];
          const explanation =
            lang === "zh" && zhExplanations
              ? zhExplanations[key]
              : report.scoreExplanations[key];

          return (
            <div
              key={key}
              className="reveal bg-forensic-panel border border-forensic-border rounded-sm p-5 hover:border-forensic-muted/50 transition-colors duration-300"
              style={{ animationDelay: `${0.15 + i * 0.08}s` }}
            >
              {/* Score label + value */}
              <div className="flex items-start justify-between mb-3">
                <span className="font-mono text-[11px] tracking-wider uppercase text-forensic-text">
                  {t(`score.${key}`)}
                </span>
                <span
                  className={`font-mono text-2xl font-bold ${getScoreTextColor(
                    score
                  )}`}
                >
                  {score}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1 bg-forensic-dark rounded-full overflow-hidden mb-3">
                <div
                  className={`h-full rounded-full progress-bar-fill ${getScoreColor(
                    score
                  )}`}
                  style={
                    {
                      "--target-width": `${score}%`,
                      animationDelay: `${0.3 + i * 0.1}s`,
                    } as React.CSSProperties
                  }
                />
              </div>

              {/* Explanation */}
              <p className="font-body text-xs text-forensic-muted leading-relaxed">
                {explanation}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
