"use client";

import { useI18n } from "@/lib/i18n";

interface InputDemoCTAProps {
  onStartAnalysis: () => void;
}

export default function InputDemoCTA({ onStartAnalysis }: InputDemoCTAProps) {
  const { t } = useI18n();
  return (
    <section className="relative py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        {/* Decorative top line */}
        <div className="w-12 h-px bg-verdict-active mx-auto mb-8" />

        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-active block mb-4">
          // TRY IT NOW
        </span>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-bone mb-4 leading-tight">
          {t("inputCTA.title")}
        </h2>

        <p className="font-body text-lg text-forensic-text leading-relaxed max-w-lg mx-auto mb-10">
          {t("inputCTA.subtitle")}
        </p>

        <button
          onClick={onStartAnalysis}
          className="group relative inline-flex items-center gap-3 px-10 py-4 bg-verdict-active text-white font-mono text-sm font-medium tracking-wider uppercase rounded-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-verdict-active/20"
        >
          <span className="relative z-10">{t("inputCTA.button")}</span>
          <svg
            className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>

        {/* Decorative bottom line */}
        <div className="w-12 h-px bg-forensic-border mx-auto mt-10" />
      </div>
    </section>
  );
}
