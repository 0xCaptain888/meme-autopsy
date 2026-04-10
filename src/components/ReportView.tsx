"use client";

import { useI18n } from "@/lib/i18n";
import type { AutopsyReport } from "@/lib/types";
import VerdictCard from "./VerdictCard";
import ScoreGrid from "./ScoreGrid";
import Timeline from "./Timeline";
import InterventionPanel from "./InterventionPanel";
import ForensicNotesPanel from "./ForensicNotesPanel";
import ReasoningSignalsPanel from "./ReasoningSignalsPanel";
import InputSnapshotPanel from "./InputSnapshotPanel";

interface ReportViewProps {
  report: AutopsyReport;
  onRerun: () => void;
  onCompare?: () => void;
}

export default function ReportView({ report, onRerun, onCompare }: ReportViewProps) {
  const { t } = useI18n();
  return (
    <div className="h-full overflow-y-auto pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Report header */}
        <div className="reveal pt-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-critical">
              {`// ${t("report.label")}`}
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] tracking-wider text-forensic-muted">
                {report.case_id}
              </span>
              <span className="text-forensic-border text-xs">&middot;</span>
              <span className="font-mono text-[9px] tracking-wider text-forensic-muted">
                {report.analysis_timestamp}
              </span>
            </div>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-bone">
            {report.project_name}
          </h2>
          <div className="mt-4 h-px bg-gradient-to-r from-verdict-critical/40 via-forensic-border to-transparent" />
        </div>

        {/* Report sections */}
        <div className="space-y-12">
          {/* Verdict */}
          <VerdictCard
            verdict={report.verdict}
            confidence={report.confidence}
            primaryCause={report.primary_cause}
            statusBadge={report.statusBadge}
          />

          {/* Executive Summary */}
          <div className="reveal bg-forensic-panel border border-forensic-border rounded-sm p-6">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-forensic-muted block mb-3">
              {t("report.summary")}
            </span>
            <p className="font-body text-sm text-forensic-text leading-relaxed">
              {report.summary}
            </p>
          </div>

          {/* Scores */}
          <ScoreGrid scores={report.scores} />

          {/* Timeline */}
          <Timeline timeline={report.collapse_timeline} />

          {/* Interventions */}
          <InterventionPanel interventions={report.interventions} />

          {/* Forensic Notes */}
          <ForensicNotesPanel notes={report.forensic_notes} />

          {/* Reasoning Signals */}
          <ReasoningSignalsPanel signals={report.reasoning_signals} />

          {/* Input Snapshot */}
          <InputSnapshotPanel snapshot={report.input_snapshot} />
        </div>

        {/* Action buttons */}
        <div className="mt-12 pt-6 border-t border-forensic-border flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onRerun}
            className="px-6 py-3 bg-verdict-active text-white font-mono text-xs tracking-wider uppercase rounded-sm hover:bg-amber-600 transition-colors duration-300"
          >
            {t("report.rerun")}
          </button>
          <button
            onClick={onCompare}
            className="px-6 py-3 border border-forensic-border text-forensic-text font-mono text-xs tracking-wider uppercase rounded-sm hover:border-bone hover:text-bone transition-colors duration-300"
          >
            {t("report.compare")}
          </button>
        </div>

        {/* Footer */}
        <div className="mt-10 pb-8 text-center">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-forensic-muted">
            Meme Autopsy &mdash; Forensic Intelligence for Internet-Native Assets
          </p>
        </div>
      </div>
    </div>
  );
}
