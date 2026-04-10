"use client";

import type { ForensicReport, ForensicScores } from "@/types/domain";

interface CaseReportProps {
  report: ForensicReport;
}

/* ── Verdict colour mapping ── */

const verdictColors: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  "Dead on Arrival": { bg: "bg-red-900/20", text: "text-red-400", border: "border-red-500/40", glow: "glow-red" },
  "Viral but Fragile": { bg: "bg-amber-900/20", text: "text-amber-400", border: "border-amber-500/40", glow: "glow-amber" },
  "Short-Term Attention Trap": { bg: "bg-orange-900/20", text: "text-orange-400", border: "border-orange-500/40", glow: "glow-amber" },
  "Stable Cult Potential": { bg: "bg-green-900/20", text: "text-green-400", border: "border-green-500/40", glow: "glow-green" },
  "High Conviction Meme": { bg: "bg-emerald-900/20", text: "text-emerald-400", border: "border-emerald-500/40", glow: "glow-green" },
  "Chaos Without Cohesion": { bg: "bg-red-900/20", text: "text-red-400", border: "border-red-500/40", glow: "glow-red" },
};

const fallbackColor = { bg: "bg-forensic-card", text: "text-bone", border: "border-forensic-border", glow: "" };

function getVerdictColor(verdict: string) {
  return verdictColors[verdict] ?? fallbackColor;
}

/* ── Score bar colour by value ── */

function scoreBarColor(score: number): string {
  if (score >= 7.5) return "bg-emerald-500";
  if (score >= 5) return "bg-amber-500";
  return "bg-red-500";
}

/* ── Dimension labels ── */

const dimensionLabels: Record<keyof ForensicScores, string> = {
  symbolicDensity: "Symbolic Density",
  loreDepth: "Lore Depth",
  ritualRepeatability: "Ritual Repeatability",
  communityCohesion: "Community Cohesion",
  beliefElasticity: "Belief Elasticity",
  narrativeSurvivability: "Narrative Survivability",
};

/* ── Section header helper ── */

function SectionHeader({ label, sub }: { label: string; sub?: string }) {
  return (
    <div className="mb-4">
      <h3 className="font-mono text-[11px] tracking-[0.2em] uppercase text-forensic-muted">
        {label}
      </h3>
      {sub && <p className="font-body text-xs text-forensic-text mt-1">{sub}</p>}
    </div>
  );
}

/* ── Main component ── */

export default function CaseReport({ report }: CaseReportProps) {
  const vc = getVerdictColor(report.verdict);

  return (
    <div className="h-full overflow-y-auto pb-20 workspace-scroll-panel">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10 pt-6">
        {/* 1. Case header */}
        <CaseHeader report={report} vc={vc} />

        {/* 2. Why this verdict */}
        <WhySection items={report.whyThisVerdict} />

        {/* 3. Forensic score grid */}
        <ScoreGridSection scores={report.scores} />

        {/* 4. Structure risks */}
        <StructureRisksSection items={report.structureRisks} />

        {/* 5. Collapse timeline */}
        <CollapseTimelineSection stages={report.collapseTimeline} />

        {/* 6. Interventions */}
        <InterventionsSection items={report.interventionPath} />

        {/* 7. Warning flags */}
        <WarningFlagsSection flags={report.warningFlags} />

        {/* 8. Provenance */}
        <ProvenanceSection sources={report.dataProvenance} />

        {/* 9. Missing data */}
        {report.missingDataFlags.length > 0 && (
          <MissingDataSection flags={report.missingDataFlags} />
        )}

        {/* Footer */}
        <div className="pt-4 pb-8 text-center">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-forensic-muted">
            Meme Autopsy &mdash; Forensic Intelligence for Internet-Native Assets
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ── */

function CaseHeader({
  report,
  vc,
}: {
  report: ForensicReport;
  vc: ReturnType<typeof getVerdictColor>;
}) {
  return (
    <section className="reveal">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-critical">
          // CASE REPORT
        </span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] tracking-wider text-forensic-muted">
            {report.caseId}
          </span>
          <span className="text-forensic-border text-xs">&middot;</span>
          <span className="font-mono text-[9px] tracking-wider text-forensic-muted">
            {new Date(report.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Verdict badge */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <span
          className={`inline-block px-4 py-2 rounded-xl text-sm font-mono font-semibold tracking-wide border ${vc.bg} ${vc.text} ${vc.border} ${vc.glow}`}
        >
          {report.verdict}
        </span>
        <span className="font-mono text-xs text-forensic-muted">
          Confidence: {Math.round(report.confidence * 100)}%
        </span>
      </div>

      <p className="font-body text-sm text-forensic-text leading-relaxed">
        {report.summary}
      </p>
      <div className="mt-4 h-px bg-gradient-to-r from-verdict-critical/40 via-forensic-border to-transparent" />
    </section>
  );
}

function WhySection({ items }: { items: ForensicReport["whyThisVerdict"] }) {
  return (
    <section className="bg-forensic-panel border border-forensic-border rounded-xl p-6 reveal">
      <SectionHeader label="Why This Verdict" />
      <ul className="space-y-4">
        {items.map((item, i) => (
          <li key={i} className="pl-4 border-l border-verdict-active/40">
            <p className="font-body text-sm text-bone font-medium mb-1">{item.reason}</p>
            <p className="font-body text-xs text-forensic-text leading-relaxed">{item.evidence}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ScoreGridSection({ scores }: { scores: ForensicScores }) {
  const keys = Object.keys(dimensionLabels) as (keyof ForensicScores)[];
  return (
    <section className="bg-forensic-panel border border-forensic-border rounded-xl p-6 reveal">
      <SectionHeader
        label="Forensic Score Grid"
        sub="Six structural dimensions scored 0-10"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {keys.map((key) => {
          const dim = scores[key];
          return (
            <div key={key} className="bg-forensic-dark/60 rounded-lg p-4 border border-forensic-border/50">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[11px] tracking-wider uppercase text-bone">
                  {dimensionLabels[key]}
                </span>
                <span className="font-mono text-sm font-semibold text-bone">
                  {dim.score}<span className="text-forensic-muted text-xs">/10</span>
                </span>
              </div>
              <div className="w-full h-1.5 bg-forensic-border/50 rounded-full overflow-hidden mb-2">
                <div
                  className={`h-full rounded-full dimension-bar-fill ${scoreBarColor(dim.score)}`}
                  style={{ "--score-width": `${dim.score * 10}%` } as React.CSSProperties}
                />
              </div>
              <p className="font-body text-[11px] text-forensic-text leading-relaxed">
                {dim.reading}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function StructureRisksSection({ items }: { items: ForensicReport["structureRisks"] }) {
  return (
    <section className="bg-forensic-panel border border-forensic-border rounded-xl p-6 reveal">
      <SectionHeader label="Structure Risks" />
      <ul className="space-y-4">
        {items.map((item, i) => (
          <li key={i} className="pl-4 border-l border-verdict-critical/40">
            <p className="font-body text-sm text-bone font-medium mb-1">{item.risk}</p>
            <p className="font-body text-xs text-forensic-text leading-relaxed">{item.evidence}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CollapseTimelineSection({ stages }: { stages: ForensicReport["collapseTimeline"] }) {
  return (
    <section className="bg-forensic-panel border border-forensic-border rounded-xl p-6 reveal">
      <SectionHeader label="Collapse Timeline" />
      <div className="relative ml-4">
        {/* Vertical line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-verdict-critical/60 via-forensic-border to-forensic-border/20" />
        <div className="space-y-6">
          {stages.map((stage, i) => (
            <div key={i} className="relative pl-6">
              {/* Dot */}
              <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-verdict-critical -translate-x-[3.5px]" />
              <p className="font-mono text-xs tracking-wider uppercase text-verdict-active mb-1">
                {stage.stage}
              </p>
              <p className="font-body text-sm text-bone mb-1">{stage.diagnosis}</p>
              <p className="font-body text-[11px] text-forensic-text leading-relaxed">
                {stage.evidence}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InterventionsSection({ items }: { items: ForensicReport["interventionPath"] }) {
  return (
    <section className="bg-forensic-panel border border-forensic-border rounded-xl p-6 reveal">
      <SectionHeader label="Recommended Interventions" />
      <ol className="space-y-4">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-verdict-active/20 text-verdict-active font-mono text-xs flex items-center justify-center">
              {i + 1}
            </span>
            <div>
              <p className="font-body text-sm text-bone font-medium mb-1">{item.action}</p>
              <p className="font-body text-xs text-forensic-text leading-relaxed">{item.why}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function WarningFlagsSection({ flags }: { flags: string[] }) {
  return (
    <section className="bg-forensic-panel border border-forensic-border rounded-xl p-6 reveal">
      <SectionHeader label="Warning Flags" />
      <div className="flex flex-wrap gap-2">
        {flags.map((flag, i) => (
          <span
            key={i}
            className="font-mono text-[11px] px-3 py-1.5 rounded-lg border border-verdict-critical/30 text-verdict-critical/90 bg-verdict-critical/5"
          >
            {flag}
          </span>
        ))}
      </div>
    </section>
  );
}

function ProvenanceSection({ sources }: { sources: string[] }) {
  return (
    <section className="bg-forensic-panel border border-forensic-border rounded-xl p-6 reveal">
      <SectionHeader label="Data Provenance" />
      <div className="flex flex-wrap gap-2">
        {sources.map((src) => (
          <span
            key={src}
            className="font-mono text-[11px] px-3 py-1.5 rounded-lg border border-verdict-signal/30 text-verdict-signal/80 bg-verdict-signal/5"
          >
            {src}
          </span>
        ))}
      </div>
    </section>
  );
}

function MissingDataSection({ flags }: { flags: string[] }) {
  return (
    <section className="bg-forensic-panel border border-amber-500/20 rounded-xl p-6 reveal">
      <SectionHeader label="Missing Data Notices" />
      <div className="flex flex-wrap gap-2">
        {flags.map((flag) => (
          <span
            key={flag}
            className="font-mono text-[11px] px-3 py-1.5 rounded-lg border border-amber-500/30 text-amber-400/90 bg-amber-500/5"
          >
            {flag.replace(/_/g, " ")}
          </span>
        ))}
      </div>
    </section>
  );
}
