"use client";

import { useI18n } from "@/lib/i18n";
import type { FormData } from "@/lib/types";

interface InputPanelProps {
  formData: FormData;
  onChange: (data: FormData) => void;
  onSubmit: () => void;
  isAnalyzing: boolean;
}

export default function InputPanel({ formData, onChange, onSubmit, isAnalyzing }: InputPanelProps) {
  const { t } = useI18n();
  const canSubmit = formData.projectName.trim() && formData.narrative.trim() && !isAnalyzing;

  const handleChange = (field: keyof FormData, value: string) => {
    onChange({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit();
  };

  const inputClass =
    "w-full bg-forensic-dark border border-forensic-border rounded-sm px-4 py-3 font-mono text-sm text-bone placeholder:text-forensic-muted focus:border-verdict-active focus:outline-none transition-colors";

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-active">
            // CASE INTAKE
          </span>
          <h2 className="font-display text-2xl font-bold mt-2 mb-2">
            {t("input.title")}
          </h2>
          <p className="font-body text-sm text-forensic-text">
            {t("input.subtitle")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Project Name */}
          <div>
            <label className="block font-mono text-xs tracking-wider uppercase text-forensic-text mb-2">
              {t("input.projectName")} <span className="text-verdict-critical">*</span>
            </label>
            <input
              type="text"
              value={formData.projectName}
              onChange={(e) => handleChange("projectName", e.target.value)}
              className={inputClass}
              placeholder="e.g. DogePriest"
              disabled={isAnalyzing}
            />
          </div>

          {/* Narrative */}
          <div>
            <label className="block font-mono text-xs tracking-wider uppercase text-forensic-text mb-2">
              {t("input.narrative")} <span className="text-verdict-critical">*</span>
            </label>
            <textarea
              value={formData.narrative}
              onChange={(e) => handleChange("narrative", e.target.value)}
              className={`${inputClass} min-h-[140px] resize-y`}
              placeholder="Describe the project's narrative, theme, and cultural positioning..."
              disabled={isAnalyzing}
            />
          </div>

          {/* Community Behavior */}
          <div>
            <label className="block font-mono text-xs tracking-wider uppercase text-forensic-text mb-2">
              {t("input.communityText")}
            </label>
            <textarea
              value={formData.communityText}
              onChange={(e) => handleChange("communityText", e.target.value)}
              className={`${inputClass} min-h-[100px] resize-y`}
              placeholder="Paste tweets, community posts, slogans..."
              disabled={isAnalyzing}
            />
          </div>

          {/* Optional Notes */}
          <div>
            <label className="block font-mono text-xs tracking-wider uppercase text-forensic-text mb-2">
              {t("input.notes")}
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              className={`${inputClass} min-h-[80px] resize-y`}
              placeholder="Any additional context or observations..."
              disabled={isAnalyzing}
            />
          </div>

          {/* Note */}
          <p className="font-mono text-[11px] text-forensic-muted tracking-wide">
            {t("input.note")}
          </p>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full px-10 py-3.5 bg-verdict-active text-white font-mono text-sm font-medium tracking-wider uppercase rounded-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amber-600 transition-all duration-300 hover:shadow-lg hover:shadow-verdict-active/20 flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Analyzing...
                </>
              ) : (
                t("input.submit")
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
