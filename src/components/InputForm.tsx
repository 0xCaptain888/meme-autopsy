"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

interface InputFormProps {
  onSubmit: (data: {
    projectName: string;
    narrative: string;
    websiteUrl: string;
    communityText: string;
  }) => void;
  onBack: () => void;
  initialData?: {
    projectName?: string;
    narrative?: string;
    websiteUrl?: string;
    communityText?: string;
  };
}

export default function InputForm({
  onSubmit,
  onBack,
  initialData,
}: InputFormProps) {
  const { t } = useI18n();
  const [projectName, setProjectName] = useState(
    initialData?.projectName || ""
  );
  const [narrative, setNarrative] = useState(initialData?.narrative || "");
  const [websiteUrl, setWebsiteUrl] = useState(initialData?.websiteUrl || "");
  const [communityText, setCommunityText] = useState(
    initialData?.communityText || ""
  );

  const canSubmit = projectName.trim() && narrative.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit({ projectName, narrative, websiteUrl, communityText });
  };

  const inputClass =
    "w-full bg-forensic-dark border border-forensic-border rounded-sm px-4 py-3 font-mono text-sm text-bone placeholder:text-forensic-muted focus:border-verdict-active transition-colors";

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-14 pb-20">
      <div className="w-full max-w-2xl">
        {/* Back */}
        <button
          onClick={onBack}
          className="reveal mb-8 font-mono text-xs text-forensic-text hover:text-bone transition-colors flex items-center gap-2"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M9 2L4 7l5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t("input.back")}
        </button>

        {/* Header */}
        <div className="reveal mb-10" style={{ animationDelay: "0.05s" }}>
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-active">
            // CASE INTAKE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2 mb-3">
            {t("input.title")}
          </h2>
          <p className="font-body text-forensic-text">{t("input.subtitle")}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Name */}
          <div
            className="reveal"
            style={{ animationDelay: "0.1s" }}
          >
            <label className="block font-mono text-xs tracking-wider uppercase text-forensic-text mb-2">
              {t("input.projectName")}
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className={inputClass}
              placeholder="e.g. DogePriest"
            />
          </div>

          {/* Narrative */}
          <div
            className="reveal"
            style={{ animationDelay: "0.15s" }}
          >
            <label className="block font-mono text-xs tracking-wider uppercase text-forensic-text mb-2">
              {t("input.narrative")}
            </label>
            <textarea
              value={narrative}
              onChange={(e) => setNarrative(e.target.value)}
              className={`${inputClass} min-h-[120px] resize-y`}
              placeholder="Describe the project's narrative, theme, and cultural positioning..."
            />
          </div>

          {/* Website URL */}
          <div
            className="reveal"
            style={{ animationDelay: "0.2s" }}
          >
            <label className="block font-mono text-xs tracking-wider uppercase text-forensic-text mb-2">
              {t("input.websiteUrl")}
            </label>
            <input
              type="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              className={inputClass}
              placeholder="https://"
            />
          </div>

          {/* Community Text */}
          <div
            className="reveal"
            style={{ animationDelay: "0.25s" }}
          >
            <label className="block font-mono text-xs tracking-wider uppercase text-forensic-text mb-2">
              {t("input.communityText")}
            </label>
            <textarea
              value={communityText}
              onChange={(e) => setCommunityText(e.target.value)}
              className={`${inputClass} min-h-[100px] resize-y`}
              placeholder="Paste tweets, community posts, slogans..."
            />
          </div>

          {/* Note */}
          <p
            className="reveal font-mono text-[11px] text-forensic-muted tracking-wide"
            style={{ animationDelay: "0.3s" }}
          >
            {t("input.note")}
          </p>

          {/* Submit */}
          <div className="reveal pt-2" style={{ animationDelay: "0.35s" }}>
            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full sm:w-auto px-10 py-3.5 bg-verdict-critical text-white font-mono text-sm font-medium tracking-wider uppercase rounded-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-red-700 transition-all duration-300 hover:shadow-lg hover:shadow-verdict-critical/20"
            >
              {t("input.submit")}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
