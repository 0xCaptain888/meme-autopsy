import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";

const examinationStages = [
  "loading.intake",
  "loading.validating",
  "loading.accepted",
  "loading.assigningId",
  "loading.securingFourmeme",
  "loading.securingDex",
  "loading.securingBsc",
  "loading.verifyingChain",
  "loading.externalExam",
  "loading.catalogingMarkings",
  "loading.internalExam",
  "loading.parsingNarrative",
  "loading.evaluatingIntegrity",
  "loading.toxicology",
  "loading.degenerative",
  "loading.viralityRecon",
  "loading.deathRecon",
  "loading.stageOfDecay",
  "loading.probableCause",
  "loading.mannerOfDeath",
  "loading.draftingOpinion",
  "loading.opinionIssued",
];

interface ExaminationLoaderProps {
  onComplete: () => void;
}

export default function ExaminationLoader({ onComplete }: ExaminationLoaderProps) {
  const { t } = useI18n();
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    if (currentStage >= examinationStages.length) {
      onComplete();
      return;
    }
    // Variable timing to simulate real forensic work
    const delays = [800, 600, 400, 500, 1200, 1000, 1000, 600, 1200, 800, 1200, 1000, 800, 1000, 800, 1200, 1200, 600, 800, 600, 1000, 500];
    const delay = delays[currentStage] || 700;
    const timer = setTimeout(() => setCurrentStage((s) => s + 1), delay);
    return () => clearTimeout(timer);
  }, [currentStage, onComplete]);

  const progress = Math.min((currentStage / examinationStages.length) * 100, 100);

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] p-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 border border-verdict-critical/40 rounded-full flex items-center justify-center scan-pulse">
            <svg width="24" height="24" viewBox="0 0 14 14" fill="none" className="text-verdict-critical">
              <path d="M7 1v12M1 7h12M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-critical block mb-2">
            // FORENSIC EXAMINATION
          </span>
          <h3 className="font-display text-xl font-bold text-bone">Examination in Progress</h3>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-forensic-panel rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-verdict-active rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Stage list */}
        <div className="space-y-1.5 max-h-[400px] overflow-y-auto workspace-scroll-panel">
          {examinationStages.map((stage, i) => {
            const isComplete = i < currentStage;
            const isActive = i === currentStage;
            const isPending = i > currentStage;

            return (
              <div
                key={stage}
                className={`flex items-center gap-3 px-3 py-2 rounded-sm transition-all duration-300 ${
                  isActive ? "bg-forensic-panel border border-forensic-border" :
                  isComplete ? "opacity-60" : "opacity-30"
                }`}
              >
                {/* Status icon */}
                <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                  {isComplete && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7l3 3 5-5" stroke="hsl(var(--verdict-signal))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-verdict-active animate-pulse" />
                  )}
                  {isPending && (
                    <span className="w-1.5 h-1.5 rounded-full bg-forensic-border" />
                  )}
                </div>
                <span className={`font-mono text-xs tracking-wider ${
                  isActive ? "text-verdict-active" :
                  isComplete ? "text-forensic-text" : "text-forensic-muted"
                }`}>
                  {t(stage)}
                </span>
              </div>
            );
          })}
        </div>

        {/* System message */}
        {currentStage > 0 && currentStage < examinationStages.length && (
          <div className="mt-6 p-3 bg-forensic-panel border border-forensic-border rounded-sm">
            <p className="font-mono text-[11px] text-forensic-text leading-relaxed">
              {getSystemMessage(currentStage)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function getSystemMessage(stage: number): string {
  const messages = [
    "",
    "Specimen identity validation in progress...",
    "Case accepted. Proceeding to evidence securing.",
    "Case ID assigned. Evidence acquisition commencing.",
    "Acquiring launch context from four.meme...",
    "Acquiring market data from DexScreener...",
    "Acquiring holder structure from BscScan...",
    "Evidence acquisition complete. Internal examination may proceed.",
    "External examination initiated. Documenting visible markings...",
    "Cataloging surface-level signals and presentation...",
    "Internal examination initiated. Parsing narrative tissue...",
    "Analyzing narrative structure and doctrine presence...",
    "Evaluating structural integrity of belief architecture...",
    "Running toxicology screen for degenerative patterns...",
    "Screening for concentration-driven fragility and narrative exhaustion...",
    "Reconstructing initial spread mechanism...",
    "Reconstructing death or survival mechanism...",
    "Estimating lifecycle position and stage of decay...",
    "Determining probable cause from evidence chain...",
    "Classifying manner of death based on pathology findings...",
    "Consolidating examination. Drafting final opinion...",
    "Final opinion issued.",
  ];
  return messages[stage] || "";
}
