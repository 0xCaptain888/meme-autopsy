import type { AutopsyReport } from "@/lib/types";

interface AutopsyReportViewProps {
  report: AutopsyReport;
  onReopen: () => void;
}

export default function AutopsyReportView({ report, onReopen }: AutopsyReportViewProps) {
  return (
    <div className="h-full overflow-y-auto pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Case Header */}
        <div className="reveal pt-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-critical">// AUTOPSY REPORT</span>
            <span className="font-mono text-[9px] text-forensic-muted">{report.caseId} &middot; {report.intakeTime}</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-bone">{report.specimenName}</h2>
          <div className="flex flex-wrap items-center gap-3 mt-2 font-mono text-[10px] text-forensic-muted">
            <span>{report.contractAddress}</span><span>&middot;</span><span>{report.chain}</span><span>&middot;</span><span>{report.sourceOrigin}</span>
          </div>
          <div className="mt-4 h-px bg-gradient-to-r from-verdict-critical/40 via-forensic-border to-transparent" />
        </div>

        <div className="space-y-10">
          {/* Pronounced Condition */}
          <Section label="PRONOUNCED CONDITION">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <p className="font-display text-2xl font-bold text-verdict-active">{report.pronouncedCondition}</p>
              <ConfidenceCircle value={report.confidenceOfDetermination} />
            </div>
            <p className="font-body text-sm text-forensic-text">{report.primaryCauseOfDeath}</p>
            {report.survivalOutlook && (
              <p className="font-mono text-xs text-verdict-signal mt-2">Survival Outlook: {report.survivalOutlook}</p>
            )}
          </Section>

          {/* Case Background */}
          <Section label="CASE BACKGROUND">
            <p className="font-body text-sm text-forensic-text leading-relaxed mb-2">{report.synopsis}</p>
            <p className="font-mono text-[11px] text-forensic-muted">{report.launchContext}</p>
          </Section>

          {/* Evidence Chain */}
          <Section label="EVIDENCE CHAIN">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {report.evidenceSources.map((src) => (
                <div key={src.name} className="bg-forensic-dark border border-forensic-border/50 rounded-sm p-3">
                  <span className="font-mono text-[9px] uppercase text-forensic-muted block mb-1">{src.name}</span>
                  <span className={`font-mono text-xs font-bold ${src.status === "acquired" ? "text-verdict-signal" : src.status === "partial" ? "text-verdict-active" : "text-verdict-critical"}`}>
                    {src.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </Section>

          {/* Diagnostic Protocol */}
          <Section label="DIAGNOSTIC PROTOCOL">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {([
                { key: "surfaceSignals", label: "Surface Signals" },
                { key: "structuralIntegrity", label: "Structural Integrity" },
                { key: "degenerationFactors", label: "Degeneration Factors" },
                { key: "survivalCapacity", label: "Survival Capacity" },
              ] as const).map((layer) => {
                const d = report.diagnosticProtocol[layer.key];
                const color = d.score >= 60 ? "text-verdict-signal" : d.score >= 35 ? "text-verdict-active" : "text-verdict-critical";
                const barColor = d.score >= 60 ? "bg-verdict-signal" : d.score >= 35 ? "bg-verdict-active" : "bg-verdict-critical";
                return (
                  <div key={layer.key} className="bg-forensic-dark border border-forensic-border/50 rounded-sm p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] tracking-wider uppercase text-forensic-muted">{layer.label}</span>
                      <span className={`font-mono text-xl font-bold ${color}`}>{d.score}</span>
                    </div>
                    <div className="w-full h-1 bg-forensic-panel rounded-full overflow-hidden mb-2">
                      <div className={`h-full rounded-full ${barColor}`} style={{ width: `${d.score}%` }} />
                    </div>
                    <p className="font-body text-[11px] text-forensic-muted leading-relaxed">{d.reading}</p>
                  </div>
                );
              })}
            </div>
          </Section>

          {/* External Examination */}
          <Section label="EXTERNAL EXAMINATION">
            <p className="font-body text-sm text-forensic-text mb-3">{report.externalExamination.surfaceFindings}</p>
            <div className="mb-3">
              <span className="font-mono text-[10px] text-forensic-muted uppercase block mb-1">Visible Markings</span>
              {report.externalExamination.visibleMarkings.map((m, i) => (
                <div key={i} className="flex items-start gap-2 font-mono text-[11px] text-forensic-text"><span className="text-verdict-active">▸</span>{m}</div>
              ))}
            </div>
            <p className="font-mono text-[11px] text-forensic-muted italic">{report.externalExamination.initialSignalProfile}</p>
          </Section>

          {/* Internal Examination */}
          <Section label="INTERNAL EXAMINATION">
            <SubSection title="Narrative Tissue Analysis" text={report.internalExamination.narrativeTissueAnalysis} />
            <SubSection title="Structural Condition" text={report.internalExamination.structuralCondition} />
            <SubSection title="Cohesion Findings" text={report.internalExamination.cohesionFindings} />
            <SubSection title="Belief Architecture" text={report.internalExamination.beliefArchitecture} />
          </Section>

          {/* Pathology Findings */}
          <Section label="PATHOLOGY FINDINGS">
            <div className="space-y-3">
              {report.pathologyFindings.map((p, i) => (
                <div key={i} className={`border-l-2 pl-3 py-1 ${p.severity === "terminal" ? "border-verdict-critical" : p.severity === "severe" ? "border-verdict-active" : "border-forensic-border"}`}>
                  <span className={`font-mono text-xs font-bold ${p.severity === "terminal" ? "text-verdict-critical" : p.severity === "severe" ? "text-verdict-active" : "text-forensic-text"}`}>{p.alert}</span>
                  <p className="font-body text-[11px] text-forensic-muted mt-0.5">{p.evidence}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Mechanism of Virality */}
          <Section label="MECHANISM OF VIRALITY">
            <FindingChainBlock chain={report.mechanismOfVirality} />
          </Section>

          {/* Mechanism of Death or Survival */}
          <Section label="MECHANISM OF DEATH OR SURVIVAL">
            <FindingChainBlock chain={report.mechanismOfDeathOrSurvival} />
          </Section>

          {/* Cause of Death */}
          <Section label="CAUSE OF DEATH">
            <p className="font-display text-lg font-bold text-bone mb-3">{report.primaryCauseOfDeath}</p>
            <span className="font-mono text-[10px] text-forensic-muted uppercase block mb-1">Manner of Death</span>
            <p className="font-mono text-sm text-verdict-active mb-4">{report.mannerOfDeath}</p>
            <span className="font-mono text-[10px] text-forensic-muted uppercase block mb-1">Contributing Factors</span>
            {report.contributingFactors.map((f, i) => (
              <div key={i} className="flex items-start gap-2 font-body text-[11px] text-forensic-text mb-1">
                <span className="text-verdict-critical">▸</span>
                <span>{f.factor}{f.evidence && <span className="text-forensic-muted"> — {f.evidence}</span>}</span>
              </div>
            ))}
          </Section>

          {/* Stage of Decay */}
          <Section label="ESTIMATED STAGE OF DECAY">
            <p className="font-body text-sm text-forensic-text">{report.stageOfDecay}</p>
            {report.estimatedFailureWindow && (
              <p className="font-mono text-xs text-verdict-critical mt-2">Estimated failure window: {report.estimatedFailureWindow}</p>
            )}
          </Section>

          {/* Evidence Log */}
          <Section label="EVIDENCE LOG">
            <EvidenceLogGroup title="Key Quotes" items={report.evidenceLog.keyQuotes} />
            <EvidenceLogGroup title="Market Evidence" items={report.evidenceLog.marketEvidence} />
            <EvidenceLogGroup title="Holder Evidence" items={report.evidenceLog.holderEvidence} />
            <EvidenceLogGroup title="Narrative Evidence" items={report.evidenceLog.narrativeEvidence} />
          </Section>

          {/* Final Autopsy Opinion */}
          <Section label="FINAL AUTOPSY OPINION">
            <p className="font-body text-sm text-bone leading-relaxed mb-4">{report.finalOpinion}</p>
            <span className="font-mono text-[10px] text-forensic-muted uppercase block mb-1">Uncertainty Notes</span>
            {report.uncertaintyNotes.map((n, i) => (
              <p key={i} className="font-body text-[11px] text-forensic-muted italic leading-relaxed mb-1">• {n}</p>
            ))}
          </Section>
        </div>

        {/* Action buttons */}
        <div className="mt-12 pt-6 border-t border-forensic-border flex items-center justify-center gap-4">
          <button onClick={onReopen} className="px-6 py-3 bg-verdict-active text-primary-foreground font-mono text-xs tracking-wider uppercase rounded-sm hover:bg-amber-600 transition-colors">
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

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="reveal bg-forensic-panel border border-forensic-border rounded-sm p-6">
      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-forensic-muted block mb-4">{label}</span>
      {children}
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

function FindingChainBlock({ chain }: { chain: { hypothesis: string; evidence: string; conclusion: string } }) {
  return (
    <div className="space-y-3">
      <div><span className="font-mono text-[10px] text-forensic-muted uppercase">Hypothesis</span><p className="font-body text-[12px] text-forensic-text mt-0.5">{chain.hypothesis}</p></div>
      <div><span className="font-mono text-[10px] text-forensic-muted uppercase">Evidence</span><p className="font-body text-[12px] text-forensic-text mt-0.5">{chain.evidence}</p></div>
      <div><span className="font-mono text-[10px] text-verdict-active uppercase">Conclusion</span><p className="font-body text-[12px] text-bone mt-0.5">{chain.conclusion}</p></div>
    </div>
  );
}

function EvidenceLogGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mb-3">
      <span className="font-mono text-[10px] text-forensic-muted uppercase block mb-1">{title}</span>
      {items.map((item, i) => (
        <p key={i} className="font-mono text-[11px] text-forensic-text mb-0.5">• {item}</p>
      ))}
    </div>
  );
}

function ConfidenceCircle({ value }: { value: number }) {
  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (value / 100) * circumference;
  const color = value >= 70 ? "text-verdict-signal" : value >= 40 ? "text-verdict-active" : "text-verdict-critical";
  return (
    <div className="relative w-16 h-16 flex-shrink-0">
      <svg className="w-16 h-16 -rotate-90" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" strokeWidth="3" className="text-forensic-border" />
        <circle cx="40" cy="40" r="36" fill="none" strokeWidth="3" strokeLinecap="round" className={color} stroke="currentColor"
          strokeDasharray={circumference} strokeDashoffset={offset} style={{ transition: "stroke-dashoffset 1s ease-out" }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`font-mono text-sm font-bold ${color}`}>{value}%</span>
      </div>
    </div>
  );
}
