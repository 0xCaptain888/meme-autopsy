import { useState, useEffect, useCallback } from "react";
import { useI18n } from "@/lib/i18n";
import {
  EXAMINATION_STAGES,
  getInitialSourceAcquisition,
  type SourceAcquisitionRecord,
} from "@/lib/examinationStateMachine";
import ExaminationStageTracker from "./examination/ExaminationStageTracker";
import SourceAcquisitionPanel from "./examination/SourceAcquisitionPanel";

interface ExaminationLoaderProps {
  onComplete: () => void;
}

export default function ExaminationLoader({ onComplete }: ExaminationLoaderProps) {
  const { lang } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sources, setSources] = useState<SourceAcquisitionRecord[]>(getInitialSourceAcquisition);
  const [messageLog, setMessageLog] = useState<string[]>([]);

  const currentStage = EXAMINATION_STAGES[currentIndex];
  const isComplete = currentIndex >= EXAMINATION_STAGES.length;
  const progress = Math.min((currentIndex / EXAMINATION_STAGES.length) * 100, 100);

  // Simulate source acquisition when entering securing_evidence
  const updateSources = useCallback((stageId: string) => {
    if (stageId === "securing_evidence") {
      // Simulate sequential acquisition
      const timers: ReturnType<typeof setTimeout>[] = [];
      const updates: [number, string, SourceAcquisitionRecord["status"]][] = [
        [200, "four.meme", "acquiring"],
        [600, "four.meme", "acquired"],
        [700, "DexScreener", "acquiring"],
        [1200, "DexScreener", "acquired"],
        [1300, "BscScan", "acquiring"],
        [1800, "BscScan", "partial"],
        [1900, "Narrative Record", "acquiring"],
        [2200, "Narrative Record", "acquired"],
      ];
      updates.forEach(([delay, name, status]) => {
        timers.push(
          setTimeout(() => {
            setSources((prev) =>
              prev.map((s) => (s.name === name ? { ...s, status } : s))
            );
          }, delay)
        );
      });
      // Scene notes provided immediately
      setTimeout(() => {
        setSources((prev) =>
          prev.map((s) => (s.name === "Scene Notes" ? { ...s, status: "acquired" } : s))
        );
      }, 100);
      return () => timers.forEach(clearTimeout);
    }
  }, []);

  useEffect(() => {
    if (isComplete) {
      onComplete();
      return;
    }

    const stage = EXAMINATION_STAGES[currentIndex];
    const msg = lang === "zh" ? stage.systemMessageZh : stage.systemMessage;
    setMessageLog((prev) => [...prev, msg]);

    const cleanup = updateSources(stage.id);
    const timer = setTimeout(() => setCurrentIndex((i) => i + 1), stage.duration);

    return () => {
      clearTimeout(timer);
      cleanup?.();
    };
  }, [currentIndex, isComplete, onComplete, lang, updateSources]);

  const stageLabels = EXAMINATION_STAGES.map((s) => ({
    id: s.id,
    label: lang === "zh" ? s.labelZh : s.label,
  }));

  return (
    <div className="flex flex-col h-full p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 border border-verdict-critical/40 rounded-full flex items-center justify-center scan-pulse">
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="text-verdict-critical">
              <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-verdict-critical block">
              // FORENSIC EXAMINATION
            </span>
            <h3 className="font-display text-lg font-bold text-bone">Examination in Progress</h3>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-forensic-dark rounded-full overflow-hidden">
          <div
            className="h-full bg-verdict-active rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="font-mono text-[9px] text-forensic-muted">
            {currentStage ? (lang === "zh" ? currentStage.labelZh : currentStage.label) : "Complete"}
          </span>
          <span className="font-mono text-[9px] text-forensic-muted">{Math.round(progress)}%</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto workspace-scroll-panel space-y-5">
        {/* Two-column: Stage Tracker + Source Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Stage Tracker */}
          <div className="bg-forensic-panel border border-forensic-border rounded-sm p-4">
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-forensic-muted block mb-3">
              EXAMINATION STAGES
            </span>
            <ExaminationStageTracker stages={stageLabels} currentIndex={currentIndex} />
          </div>

          {/* Source Acquisition */}
          <div className="space-y-4">
            <SourceAcquisitionPanel sources={sources} />

            {/* Degraded evidence warning */}
            {sources.some((s) => s.status === "partial" || s.status === "unavailable") && currentIndex >= 4 && (
              <div className="bg-verdict-active/5 border border-verdict-active/20 rounded-sm p-3">
                <span className="font-mono text-[9px] tracking-wider uppercase text-verdict-active block mb-1">
                  ⚠ DEGRADED EVIDENCE
                </span>
                <p className="font-mono text-[10px] text-forensic-muted leading-relaxed">
                  {sources
                    .filter((s) => s.status === "partial" || s.status === "unavailable")
                    .map((s) => s.name)
                    .join(", ")}{" "}
                  — examination continues with reduced confidence.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Live Examiner Messages */}
        <div className="bg-forensic-panel border border-forensic-border rounded-sm p-4">
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-forensic-muted block mb-3">
            EXAMINER LOG
          </span>
          <div className="space-y-1 max-h-[200px] overflow-y-auto workspace-scroll-panel">
            {messageLog.map((msg, i) => {
              const isLatest = i === messageLog.length - 1;
              return (
                <div key={i} className={`flex items-start gap-2 ${isLatest ? "" : "opacity-50"}`}>
                  <span className="font-mono text-[9px] text-forensic-muted flex-shrink-0 mt-0.5">
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                  <p className={`font-mono text-[10px] leading-relaxed ${isLatest ? "text-verdict-active" : "text-forensic-text"}`}>
                    {msg}
                    {isLatest && <span className="inline-block w-1.5 h-3 bg-verdict-active ml-1 animate-pulse" />}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
