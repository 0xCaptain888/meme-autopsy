import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import type { ChainType, FormData } from "@/lib/types";

interface CaseIntakePanelProps {
  formData: FormData;
  onChange: (data: FormData) => void;
  onSubmit: () => void;
  isAnalyzing: boolean;
  onBack: () => void;
}

const CHAINS: { key: ChainType; label: string }[] = [
  { key: "BSC", label: "BSC" },
  { key: "ETH", label: "ETH" },
  { key: "SOL", label: "SOL" },
  { key: "BASE", label: "BASE" },
  { key: "other", label: "Other" },
];

const EVIDENCE_SOURCES = [
  { name: "four.meme", desc: "Launch context & narrative" },
  { name: "DexScreener", desc: "Market & pair data" },
  { name: "BscScan", desc: "Holder & structural data" },
  { name: "Narrative Sources", desc: "Social & community text" },
];

type IntakePhase = "idle" | "validating" | "accepted";

export default function CaseIntakePanel({ formData, onChange, onSubmit, isAnalyzing, onBack }: CaseIntakePanelProps) {
  const { t } = useI18n();
  const [intakePhase, setIntakePhase] = useState<IntakePhase>("idle");

  const inputClass =
    "w-full bg-forensic-dark border border-forensic-border rounded-sm px-4 py-3 font-mono text-sm text-bone placeholder:text-forensic-muted focus:border-verdict-active focus:outline-none transition-colors";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.contractAddress.trim().length > 0 && !isAnalyzing && intakePhase === "idle") {
      // Staged intake feedback
      setIntakePhase("validating");
      setTimeout(() => {
        setIntakePhase("accepted");
        setTimeout(() => {
          onSubmit();
          // Reset phase after submission starts
          setTimeout(() => setIntakePhase("idle"), 500);
        }, 800);
      }, 1200);
    }
  };

  const caseId = formData.contractAddress.trim()
    ? `MA-${new Date().getFullYear()}-${String(Math.abs(hashCode(formData.contractAddress))).slice(0, 4).padStart(4, "0")}`
    : null;

  return (
    <div className="p-6 bg-forensic-dark h-full">
      {/* Back */}
      <button onClick={onBack} className="flex items-center gap-2 font-mono text-sm text-forensic-text hover:text-bone transition-colors mb-6">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        Back
      </button>

      {/* Header */}
      <div className="mb-8">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-active">
          // CASE INTAKE
        </span>
        <h2 className="font-display text-2xl font-bold mt-2 mb-2 text-bone">
          {t("intake.title")}
        </h2>
        <p className="font-body text-sm text-forensic-text">
          {t("intake.subtitle")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Contract Address / Specimen Identifier */}
        <div>
          <label className="block font-mono text-xs tracking-wider uppercase text-forensic-text mb-2">
            {t("intake.contractAddress")} <span className="text-verdict-critical">*</span>
          </label>
          <input
            type="text"
            value={formData.contractAddress}
            onChange={(e) => onChange({ ...formData, contractAddress: e.target.value })}
            className={inputClass}
            placeholder="0x..."
            disabled={isAnalyzing || intakePhase !== "idle"}
          />
        </div>

        {/* Project Name (optional) */}
        <div>
          <label className="block font-mono text-xs tracking-wider uppercase text-forensic-text mb-2">
            {t("intake.projectName")} <span className="text-forensic-muted">(optional)</span>
          </label>
          <input
            type="text"
            value={formData.projectName}
            onChange={(e) => onChange({ ...formData, projectName: e.target.value })}
            className={inputClass}
            placeholder="e.g. DogePriest"
            disabled={isAnalyzing || intakePhase !== "idle"}
          />
        </div>

        {/* Chain Selector */}
        <div>
          <label className="block font-mono text-xs tracking-wider uppercase text-forensic-text mb-2">
            {t("intake.chain")}
          </label>
          <div className="flex gap-2 flex-wrap">
            {CHAINS.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => onChange({ ...formData, chain: c.key })}
                disabled={isAnalyzing || intakePhase !== "idle"}
                className={`px-3 py-2 font-mono text-xs tracking-wider rounded-sm border transition-colors ${
                  formData.chain === c.key
                    ? "border-verdict-active text-verdict-active bg-verdict-active/10"
                    : "border-forensic-border text-forensic-muted hover:border-forensic-text hover:text-forensic-text"
                } disabled:opacity-40`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Source Origin / Launch Platform */}
        <div>
          <label className="block font-mono text-xs tracking-wider uppercase text-forensic-text mb-2">
            {t("intake.launchPlatform")}
          </label>
          <div className="flex gap-2">
            {(["four.meme", "manual", "unknown"] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => onChange({ ...formData, launchPlatform: p })}
                disabled={isAnalyzing || intakePhase !== "idle"}
                className={`px-3 py-2 font-mono text-xs tracking-wider rounded-sm border transition-colors ${
                  formData.launchPlatform === p
                    ? "border-verdict-active text-verdict-active bg-verdict-active/10"
                    : "border-forensic-border text-forensic-muted hover:border-forensic-text hover:text-forensic-text"
                } disabled:opacity-40`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Scene Notes */}
        <div>
          <label className="block font-mono text-xs tracking-wider uppercase text-forensic-text mb-2">
            {t("intake.sceneNotes")} <span className="text-forensic-muted">(optional)</span>
          </label>
          <textarea
            value={formData.sceneNotes}
            onChange={(e) => onChange({ ...formData, sceneNotes: e.target.value })}
            className={`${inputClass} min-h-[100px] resize-y`}
            placeholder="Describe the project's story, cultural context, community behavior, any observed signals..."
            disabled={isAnalyzing || intakePhase !== "idle"}
          />
        </div>

        {/* Evidence Checklist */}
        <div className="border border-forensic-border/60 rounded-sm p-4 bg-forensic-surface/30">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-forensic-muted block mb-3">
            {t("intake.evidenceChecklist")}
          </span>
          <div className="space-y-2">
            {EVIDENCE_SOURCES.map((src) => (
              <div key={src.name} className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-verdict-active/60 flex-shrink-0" />
                <span className="font-mono text-[11px] text-forensic-text">{src.name}</span>
                <span className="font-mono text-[10px] text-forensic-muted">— {src.desc}</span>
              </div>
            ))}
          </div>
          <p className="font-mono text-[10px] text-forensic-muted mt-3 leading-relaxed">
            {t("intake.note")}
          </p>
        </div>

        {/* Case ID Preview */}
        {caseId && formData.contractAddress.trim() && (
          <div className="flex items-center gap-2 px-3 py-2 border border-forensic-border/40 rounded-sm bg-forensic-surface/20">
            <span className="font-mono text-[10px] text-forensic-muted uppercase">Case ID:</span>
            <span className="font-mono text-[11px] text-verdict-active">{caseId}</span>
          </div>
        )}

        {/* Intake Phase Feedback */}
        {intakePhase !== "idle" && (
          <div className="border border-verdict-active/30 rounded-sm p-3 bg-verdict-active/5 animate-fade-in">
            {intakePhase === "validating" && (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-verdict-active animate-pulse" />
                <span className="font-mono text-[11px] text-verdict-active">
                  {t("intake.validating")}
                </span>
              </div>
            )}
            {intakePhase === "accepted" && (
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-verdict-signal" />
                  </svg>
                  <span className="font-mono text-[11px] text-verdict-signal">
                    {t("intake.caseAccepted")}
                  </span>
                </div>
                <div className="flex items-center gap-2 ml-5">
                  <span className="font-mono text-[10px] text-forensic-muted">
                    {t("intake.specimenLogged")} · {caseId}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={!formData.contractAddress.trim() || isAnalyzing || intakePhase !== "idle"}
            className="w-full px-10 py-3.5 bg-verdict-active text-primary-foreground font-mono text-sm font-medium tracking-wider uppercase rounded-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amber-600 transition-all duration-300 hover:shadow-lg hover:shadow-verdict-active/20 flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <span className="loader-dot" />
                <span className="loader-dot" />
                <span className="loader-dot" />
                <span className="ml-2">Examination Ongoing</span>
              </>
            ) : (
              t("intake.submit")
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

/** Simple hash for generating deterministic case IDs */
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}
