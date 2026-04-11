import type { AutopsyReport } from "@/lib/types";

interface CaseHeaderProps {
  report: AutopsyReport;
}

export default function CaseHeader({ report }: CaseHeaderProps) {
  return (
    <div className="pt-6 mb-6">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-critical">
          // FORENSIC AUTOPSY REPORT
        </span>
        <span className="font-mono text-[9px] text-forensic-muted">
          {report.examinationStatus}
        </span>
      </div>

      <h1 className="font-display text-2xl sm:text-3xl font-bold text-bone mb-2">
        {report.specimenName}
      </h1>

      <div className="grid grid-cols-2 gap-x-6 gap-y-1 mt-3 font-mono text-[11px]">
        <div>
          <span className="text-forensic-muted">Case ID</span>
          <span className="ml-2 text-forensic-text">{report.caseId}</span>
        </div>
        <div>
          <span className="text-forensic-muted">Chain</span>
          <span className="ml-2 text-forensic-text">{report.chain}</span>
        </div>
        <div>
          <span className="text-forensic-muted">Contract</span>
          <span className="ml-2 text-forensic-text">{report.contractAddress}</span>
        </div>
        <div>
          <span className="text-forensic-muted">Source</span>
          <span className="ml-2 text-forensic-text">{report.sourceOrigin}</span>
        </div>
        <div>
          <span className="text-forensic-muted">Intake</span>
          <span className="ml-2 text-forensic-text">
            {new Date(report.intakeTime).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
          </span>
        </div>
        <div>
          <span className="text-forensic-muted">Status</span>
          <span className="ml-2 text-verdict-active">{report.examinationStatus}</span>
        </div>
      </div>

      <div className="mt-4 h-px bg-gradient-to-r from-verdict-critical/40 via-forensic-border to-transparent" />
    </div>
  );
}
