"use client";

import type { ScoreSet } from "@/lib/types";

interface ScoreGridProps {
  scores: ScoreSet;
}

const dimensionKeys: (keyof ScoreSet)[] = [
  "symbolicDensity",
  "loreDepth",
  "ritualRepeatability",
  "communityCohesion",
  "beliefElasticity",
  "narrativeSurvivability",
];

const dimensionLabels: Record<keyof ScoreSet, string> = {
  symbolicDensity: "Symbolic Density",
  loreDepth: "Lore Depth",
  ritualRepeatability: "Ritual Repeatability",
  communityCohesion: "Community Cohesion",
  beliefElasticity: "Belief Elasticity",
  narrativeSurvivability: "Narrative Survivability",
};

function getScoreColor(score: number): string {
  if (score >= 70) return "bg-verdict-signal";
  if (score >= 40) return "bg-verdict-active";
  return "bg-verdict-critical";
}

function getScoreTextColor(score: number): string {
  if (score >= 70) return "text-verdict-signal";
  if (score >= 40) return "text-verdict-active";
  return "text-verdict-critical";
}

export default function ScoreGrid({ scores }: ScoreGridProps) {
  return (
    <div className="reveal" style={{ animationDelay: "0.1s" }}>
      {/* Section header */}
      <div className="mb-8">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-critical">
          // DIAGNOSTIC SCORES
        </span>
        <h3 className="font-display text-2xl sm:text-3xl font-bold mt-2 mb-2">
          Forensic Breakdown
        </h3>
        <p className="font-body text-forensic-text text-sm">
          Six-dimension structural analysis of narrative strength and collapse risk.
        </p>
      </div>

      {/* Score cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dimensionKeys.map((key, i) => {
          const dim = scores[key];
          return (
            <div
              key={key}
              className="reveal bg-forensic-panel border border-forensic-border rounded-sm p-5 hover:border-forensic-muted/50 transition-colors duration-300"
              style={{ animationDelay: `${0.15 + i * 0.08}s` }}
            >
              {/* Score label + value */}
              <div className="flex items-start justify-between mb-3">
                <span className="font-mono text-[11px] tracking-wider uppercase text-forensic-text">
                  {dimensionLabels[key]}
                </span>
                <span className={`font-mono text-2xl font-bold ${getScoreTextColor(dim.score)}`}>
                  {dim.score}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1 bg-forensic-dark rounded-full overflow-hidden mb-3">
                <div
                  className={`h-full rounded-full progress-bar-fill ${getScoreColor(dim.score)}`}
                  style={{
                    "--target-width": `${dim.score}%`,
                    animationDelay: `${0.3 + i * 0.1}s`,
                  } as React.CSSProperties}
                />
              </div>

              {/* Reading */}
              <p className="font-body text-xs text-forensic-muted leading-relaxed">
                {dim.reading}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
