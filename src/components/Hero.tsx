"use client";

import { useI18n } from "@/lib/i18n";

interface HeroProps {
  onRunAutopsy: () => void;
  onLoadSample: () => void;
}

export default function Hero({ onRunAutopsy, onLoadSample }: HeroProps) {
  const { t } = useI18n();

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 pt-14">
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-verdict-critical/[0.03] rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Forensic label */}
        <div className="reveal inline-flex items-center gap-2 mb-8 px-4 py-1.5 border border-forensic-border rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-verdict-critical animate-pulse" />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-forensic-text">
            Forensic Intelligence Engine v1.0
          </span>
        </div>

        {/* Headline */}
        <h1
          className="reveal font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="text-bone">{t("hero.headline")}</span>
        </h1>

        {/* Subheadline */}
        <p
          className="reveal font-body text-lg sm:text-xl text-forensic-text max-w-2xl mx-auto mb-4 leading-relaxed"
          style={{ animationDelay: "0.2s" }}
        >
          {t("hero.subheadline")}
        </p>

        {/* Supporting line */}
        <p
          className="reveal font-mono text-xs text-forensic-muted tracking-wider mb-10"
          style={{ animationDelay: "0.3s" }}
        >
          {t("hero.supporting")}
        </p>

        {/* Buttons */}
        <div
          className="reveal flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ animationDelay: "0.4s" }}
        >
          <button
            onClick={onRunAutopsy}
            className="group relative px-8 py-3.5 bg-verdict-critical text-white font-mono text-sm font-medium tracking-wider uppercase rounded-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-verdict-critical/20"
          >
            <span className="relative z-10">{t("hero.runAutopsy")}</span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
          <button
            onClick={onLoadSample}
            className="px-8 py-3.5 border border-forensic-border text-forensic-text font-mono text-sm tracking-wider uppercase rounded-sm hover:border-bone hover:text-bone transition-all duration-300"
          >
            {t("hero.loadSample")}
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-forensic-border" />
        <div className="w-1 h-1 rounded-full bg-forensic-border animate-bounce" />
      </div>
    </section>
  );
}
