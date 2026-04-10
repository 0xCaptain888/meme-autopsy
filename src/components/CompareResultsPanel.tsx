"use client";

import type { AutopsyReport, ScoreSet } from "@/lib/types";
import StatusBadge from "./StatusBadge";

interface CompareResultsPanelProps {
  original: AutopsyReport;
  revised: AutopsyReport;
}

const dimensionLabels: Record<keyof ScoreSet, string> = {
  symbolicDensity: "Symbolic Density",
  loreDepth: "Lore Depth",
  ritualRepeatability: "Ritual Repeatability",
  communityCohesion: "Community Cohesion",
  beliefElasticity: "Belief Elasticity",
  narrativeSurvivability: "Narrative Survivability",
};

const dimensionKeys = Object.keys(dimensionLabels) as (keyof ScoreSet)[];

function getDiffColor(diff: number): string {
  if (diff > 0) return "text-verdict-signal";
  if (diff < 0) return "text-verdict-critical";
  return "text-forensic-muted";
}

function getDiffPrefix(diff: number): string {
  if (diff > 0) return "+";
  return "";
}

function getScoreBarColor(score: number): string {
  if (score >= 70) return "bg-verdict-signal";
  if (score >= 40) return "bg-verdict-active";
  return "bg-verdict-critical";
}

export default function CompareResultsPanel({ original, revised }: CompareResultsPanelProps) {
  return (
    <div className="h-full overflow-y-auto pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="pt-6 mb-8">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-active">
            // COMPARISON VIEW
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold mt-2 text-bone">
            Report Comparison
          </h2>
          <div className="mt-4 h-px bg-gradient-to-r from-verdict-active/40 via-forensic-border to-transparent" />
        </div>

        {/* Verdict comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[
            { label: "ORIGINAL", report: original },
            { label: "REVISED", report: revised },
          ].map(({ label, report }) => (
            <div key={label} className="bg-forensic-panel border border-forensic-border rounded-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-forensic-muted">
                  {label}
                </span>
                <StatusBadge badge={report.statusBadge} />
              </div>
              <p className="font-display text-lg font-bold text-bone mb-1">{report.verdict}</p>
              <p className="font-mono text-xs text-verdict-active">{report.confidence}% confidence</p>
              <p className="font-body text-sm text-forensic-text mt-2">{report.primary_cause}</p>
            </div>
          ))}
        </div>

        {/* Score comparison */}
        <div className="mb-8">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-critical block mb-4">
            // SCORE COMPARISON
          </span>
          <div className="space-y-3">
            {dimensionKeys.map((key) => {
              const origScore = original.scores[key].score;
              const revScore = revised.scores[key].score;
              const diff = revScore - origScore;

              return (
                <div key={key} className="bg-forensic-panel border border-forensic-border rounded-sm p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs tracking-wider uppercase text-forensic-text">
                      {dimensionLabels[key]}
                    </span>
                    <span className={`font-mono text-xs font-bold ${getDiffColor(diff)}`}>
                      {getDiffPrefix(diff)}{diff}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[9px] text-forensic-muted">Original</span>
                        <span className="font-mono text-sm font-bold text-forensic-text">{origScore}</span>
                      </div>
                      <div className="w-full h-1 bg-forensic-dark rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${getScoreBarColor(origScore)}`} style={{ width: `${origScore}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[9px] text-forensic-muted">Revised</span>
                        <span className="font-mono text-sm font-bold text-bone">{revScore}</span>
                      </div>
                      <div className="w-full h-1 bg-forensic-dark rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${getScoreBarColor(revScore)}`} style={{ width: `${revScore}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key differences summary */}
        <div className="bg-forensic-panel border border-forensic-border rounded-sm p-5">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-forensic-muted block mb-3">
            SUMMARY DELTA
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <span className="font-mono text-[9px] text-forensic-muted block mb-1">VERDICT CHANGE</span>
              <p className="font-mono text-sm text-bone">
                {original.verdict === revised.verdict ? "No change" : `${original.verdict} → ${revised.verdict}`}
              </p>
            </div>
            <div>
              <span className="font-mono text-[9px] text-forensic-muted block mb-1">CONFIDENCE SHIFT</span>
              <p className={`font-mono text-sm font-bold ${getDiffColor(revised.confidence - original.confidence)}`}>
                {getDiffPrefix(revised.confidence - original.confidence)}{revised.confidence - original.confidence}%
              </p>
            </div>
            <div>
              <span className="font-mono text-[9px] text-forensic-muted block mb-1">AVG SCORE DELTA</span>
              <p className={`font-mono text-sm font-bold ${getDiffColor(
                dimensionKeys.reduce((sum, k) => sum + (revised.scores[k].score - original.scores[k].score), 0) / dimensionKeys.length
              )}`}>
                {getDiffPrefix(
                  Math.round(dimensionKeys.reduce((sum, k) => sum + (revised.scores[k].score - original.scores[k].score), 0) / dimensionKeys.length)
                )}
                {Math.round(dimensionKeys.reduce((sum, k) => sum + (revised.scores[k].score - original.scores[k].score), 0) / dimensionKeys.length)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
