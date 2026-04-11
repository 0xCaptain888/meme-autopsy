import type { AutopsyReport } from "@/lib/types";
import CaseHeader from "./report/CaseHeader";
import DeterminationBlock from "./report/DeterminationBlock";
import CauseOfDeathCard from "./report/CauseOfDeathCard";
import SurvivalMechanismCard from "./report/SurvivalMechanismCard";
import EvidenceChainPanel from "./report/EvidenceChainPanel";
import PathologyFindingsList from "./report/PathologyFindingsList";
import DiagnosticLayerBlock from "./report/DiagnosticLayerBlock";
import HypothesisEvidenceConclusionBlock from "./report/HypothesisEvidenceConclusionBlock";
import ConfidenceUncertaintyBlock from "./report/ConfidenceUncertaintyBlock";
import FinalOpinionBlock from "./report/FinalOpinionBlock";
import EvidenceLogPanel from "./report/EvidenceLogPanel";
import ReportSection from "./report/ReportSection";

interface AutopsyReportViewProps {
  report: AutopsyReport;
  onReopen: () => void;
}

export default function AutopsyReportView({ report, onReopen }: AutopsyReportViewProps) {
  return (
    <div className="h-full overflow-y-auto pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* 1. Case Header */}
        <CaseHeader report={report} />

        <div className="space-y-6">
          {/* 2. Central Determination — primary focal block */}
          <DeterminationBlock report={report} />

          {/* 3. Case Background */}
          <ReportSection label="CASE BACKGROUND">
            <p className="font-body text-sm text-forensic-text leading-relaxed mb-2">{report.synopsis}</p>
            <p className="font-mono text-[11px] text-forensic-muted">{report.launchContext}</p>
          </ReportSection>

          {/* 4. Evidence Chain */}
          <EvidenceChainPanel sources={report.evidenceSources} />

          {/* 5. External Examination */}
          <ReportSection label="EXTERNAL EXAMINATION">
            <p className="font-body text-sm text-forensic-text leading-relaxed mb-3">{report.externalExamination.surfaceFindings}</p>
            <div className="mb-3">
              <span className="font-mono text-[10px] text-forensic-muted uppercase block mb-1">Visible Markings</span>
              {report.externalExamination.visibleMarkings.map((m, i) => (
                <div key={i} className="flex items-start gap-2 font-mono text-[11px] text-forensic-text">
                  <span className="text-verdict-active">▸</span>{m}
                </div>
              ))}
            </div>
            <p className="font-mono text-[11px] text-forensic-muted italic">{report.externalExamination.initialSignalProfile}</p>
          </ReportSection>

          {/* 6. Internal Examination */}
          <ReportSection label="INTERNAL EXAMINATION">
            <SubSection title="Narrative Tissue Analysis" text={report.internalExamination.narrativeTissueAnalysis} />
            <SubSection title="Structural Condition" text={report.internalExamination.structuralCondition} />
            <SubSection title="Cohesion Findings" text={report.internalExamination.cohesionFindings} />
            <SubSection title="Belief Architecture" text={report.internalExamination.beliefArchitecture} />
          </ReportSection>

          {/* 7. Pathology Findings */}
          <PathologyFindingsList findings={report.pathologyFindings} />

          {/* 8. Mechanism of Virality */}
          <HypothesisEvidenceConclusionBlock
            title="MECHANISM OF VIRALITY"
            hypothesis={report.mechanismOfVirality.hypothesis}
            evidence={report.mechanismOfVirality.evidence}
            conclusion={report.mechanismOfVirality.conclusion}
          />

          {/* 9. Mechanism of Death or Survival */}
          <HypothesisEvidenceConclusionBlock
            title="MECHANISM OF DEATH OR SURVIVAL"
            hypothesis={report.mechanismOfDeathOrSurvival.hypothesis}
            evidence={report.mechanismOfDeathOrSurvival.evidence}
            conclusion={report.mechanismOfDeathOrSurvival.conclusion}
          />

          {/* 10. Cause of Death / Survival Mechanism */}
          <CauseOfDeathCard report={report} />
          <SurvivalMechanismCard report={report} />

          {/* 11. Stage of Decay */}
          <ReportSection label="ESTIMATED STAGE OF DECAY">
            <p className="font-body text-sm text-forensic-text leading-relaxed">{report.stageOfDecay}</p>
            {report.estimatedFailureWindow && (
              <p className="font-mono text-xs text-verdict-critical mt-2">
                Estimated failure window: {report.estimatedFailureWindow}
              </p>
            )}
          </ReportSection>

          {/* 12. Diagnostic Protocol — subordinate support, not hero */}
          <DiagnosticLayerBlock protocol={report.diagnosticProtocol} />

          {/* 13. Evidence Log */}
          <EvidenceLogPanel evidenceLog={report.evidenceLog} />

          {/* 14. Confidence & Uncertainty — always visible */}
          <ConfidenceUncertaintyBlock
            confidence={report.confidenceOfDetermination}
            uncertaintyNotes={report.uncertaintyNotes}
          />

          {/* 15. Final Opinion — closing block */}
          <FinalOpinionBlock opinion={report.finalOpinion} />
        </div>

        {/* Actions */}
        <div className="mt-12 pt-6 border-t border-forensic-border flex items-center justify-center gap-4">
          <button
            onClick={onReopen}
            className="px-6 py-3 bg-verdict-active text-primary-foreground font-mono text-xs tracking-wider uppercase rounded-sm hover:bg-amber-600 transition-colors"
          >
            Reopen Examination
          </button>
        </div>
        <div className="mt-10 pb-8 text-center">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-forensic-muted">
            Meme Autopsy — Forensic Autopsy System for Meme Projects
          </p>
        </div>
      </div>
    </div>
  );
}

function SubSection({ title, text }: { title: string; text: string }) {
  return (
    <div className="mb-3">
      <span className="font-mono text-[10px] text-verdict-active uppercase block mb-1">{title}</span>
      <p className="font-body text-[12px] text-forensic-text leading-relaxed">{text}</p>
    </div>
  );
}
