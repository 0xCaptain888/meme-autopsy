"use client";

import { sampleReports } from "@/data/sampleCases";
import type { ScoreSet } from "@/lib/types";
import StatusBadge from "./StatusBadge";

interface SampleAutopsyPreviewProps {
  onViewFullReport: () => void;
}

const report = sampleReports["DogePriest"];

const dimensionLabels: Record<keyof ScoreSet, string> = {
  symbolicDensity: "Symbolic Density",
  loreDepth: "Lore Depth",
  ritualRepeatability: "Ritual Repeat.",
  communityCohesion: "Community Coh.",
  beliefElasticity: "Belief Elast.",
  narrativeSurvivability: "Narrative Surv.",
};

function getBarColor(v: number) {
  if (v >= 70) return "bg-verdict-signal";
  if (v >= 40) return "bg-verdict-active";
  return "bg-verdict-critical";
}

function getTextColor(v: number) {
  if (v >= 70) return "text-verdict-signal";
  if (v >= 40) return "text-verdict-active";
  return "text-verdict-critical";
}

export default function SampleAutopsyPreview({ onViewFullReport }: SampleAutopsyPreviewProps) {
  const timelineItems = report.collapse_timeline.slice(0, 3);
  const interventions = report.interventions;

  return (
    <section className="relative py-20 px-4">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-verdict-critical/[0.02] to-transparent" />

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-critical">
            // SAMPLE AUTOPSY REPORT
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-3 mb-3">
            Forensic diagnosis at a glance
          </h2>
          <p className="font-body text-forensic-text text-sm max-w-lg mx-auto">
            No clicks needed. Here is what a complete autopsy report looks like.
          </p>
        </div>

        {/* Report preview card */}
        <div className="reveal bg-forensic-panel border border-forensic-border rounded-sm overflow-hidden">
          {/* Top accent */}
          <div className="h-px bg-verdict-active" />

          <div className="p-6 sm:p-8">
            {/* Case header row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-4">
                <h3 className="font-mono text-2xl sm:text-3xl font-bold text-bone tracking-tight">
                  {report.project_name}
                </h3>
                <StatusBadge badge={report.statusBadge} />
              </div>
              <div className="font-mono text-[10px] text-forensic-muted tracking-wider">
                {report.case_id} &middot; {report.analysis_timestamp}
              </div>
            </div>

            {/* Verdict + confidence */}
            <div className="mb-6 pb-5 border-b border-forensic-border">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-forensic-muted">
                  VERDICT:
                </span>
                <span className="font-display text-lg font-semibold text-bone">
                  {report.verdict}
                </span>
                <span className="font-mono text-[10px] text-verdict-active">
                  {report.confidence}% confidence
                </span>
              </div>
              <p className="font-body text-sm text-forensic-text mt-1">
                {report.primary_cause}
              </p>
            </div>

            {/* Mini score grid */}
            <div className="mb-6">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-forensic-muted mb-3 block">
                FORENSIC SCORES
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {(Object.keys(dimensionLabels) as (keyof ScoreSet)[]).map((key) => {
                  const dim = report.scores[key];
                  return (
                    <div key={key} className="bg-forensic-dark border border-forensic-border/50 rounded-sm p-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[9px] tracking-wider uppercase text-forensic-muted">
                          {dimensionLabels[key]}
                        </span>
                        <span className={`font-mono text-sm font-bold ${getTextColor(dim.score)}`}>
                          {dim.score}
                        </span>
                      </div>
                      <div className="w-full h-0.5 bg-forensic-border rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full progress-bar-fill ${getBarColor(dim.score)}`}
                          style={{ "--target-width": `${dim.score}%` } as React.CSSProperties}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Two columns: timeline + interventions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Timeline excerpt */}
              <div>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-forensic-muted mb-3 block">
                  COLLAPSE TIMELINE (EXCERPT)
                </span>
                <div className="space-y-2">
                  {timelineItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-forensic-dark border border-forensic-border/50 rounded-sm p-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full border border-forensic-border flex items-center justify-center mt-0.5">
                        <span className="font-mono text-[8px] text-forensic-muted">{i + 1}</span>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] tracking-wider uppercase text-bone block mb-0.5">
                          {item.phase}
                        </span>
                        <p className="font-body text-xs text-forensic-text leading-relaxed">
                          {item.diagnosis}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interventions */}
              <div>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-forensic-muted mb-3 block">
                  RECOMMENDED INTERVENTIONS
                </span>
                <div className="space-y-2">
                  {interventions.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-forensic-dark border border-forensic-border/50 rounded-sm p-3">
                      <span className="flex-shrink-0 font-mono text-[10px] font-semibold text-verdict-active mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="font-body text-xs text-forensic-text leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* View full report CTA */}
            <div className="mt-6 pt-5 border-t border-forensic-border flex items-center justify-between">
              <span className="font-mono text-[10px] text-forensic-muted tracking-wider">
                This is a preview of the full report.
              </span>
              <button
                onClick={onViewFullReport}
                className="group flex items-center gap-2 px-5 py-2 border border-verdict-critical/40 rounded-sm font-mono text-xs tracking-wider uppercase text-verdict-critical hover:bg-verdict-critical hover:text-white transition-all duration-300"
              >
                View Full Report
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 6h8M7 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
