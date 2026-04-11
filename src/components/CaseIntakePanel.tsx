import { useI18n } from "@/lib/i18n";
import type { FormData } from "@/lib/types";

interface CaseIntakePanelProps {
  formData: FormData;
  onChange: (data: FormData) => void;
  onSubmit: () => void;
  isAnalyzing: boolean;
  onBack: () => void;
}

export default function CaseIntakePanel({ formData, onChange, onSubmit, isAnalyzing, onBack }: CaseIntakePanelProps) {
  const { t } = useI18n();

  const inputClass =
    "w-full bg-forensic-dark border border-forensic-border rounded-sm px-4 py-3 font-mono text-sm text-bone placeholder:text-forensic-muted focus:border-verdict-active focus:outline-none transition-colors";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.contractAddress.trim().length > 0 && !isAnalyzing) {
      onSubmit();
    }
  };

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
            disabled={isAnalyzing}
          />
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
                disabled={isAnalyzing}
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
            className={`${inputClass} min-h-[120px] resize-y`}
            placeholder="Describe the project's story, cultural context, community behavior, any observed signals..."
            disabled={isAnalyzing}
          />
        </div>

        {/* Note */}
        <p className="font-mono text-[11px] text-forensic-muted tracking-wide">
          {t("intake.note")}
        </p>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={!formData.contractAddress.trim() || isAnalyzing}
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
