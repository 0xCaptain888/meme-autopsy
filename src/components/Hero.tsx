import { useI18n } from "@/lib/i18n";

interface HeroProps {
  onOpenCase: () => void;
  onViewArchived: () => void;
}

export default function Hero({ onOpenCase, onViewArchived }: HeroProps) {
  const { t } = useI18n();
  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center px-4 pt-14">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-verdict-critical/[0.02] rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* System identifier */}
        <div className="reveal mb-10">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-8 border border-verdict-critical/40 rounded-full flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="text-verdict-critical">
                <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-forensic-muted">
              Forensic Autopsy System v2.0
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08] tracking-tight text-bone mb-6">
            {t("hero.headline")}
          </h1>

          <p className="font-body text-lg text-forensic-text max-w-2xl leading-relaxed mb-3">
            {t("hero.subheadline")}
          </p>

          <p className="font-mono text-xs text-forensic-muted tracking-wider">
            {t("hero.supporting")}
          </p>
        </div>

        {/* Two CTAs */}
        <div className="reveal flex flex-col sm:flex-row gap-4 mb-16" style={{ animationDelay: "0.15s" }}>
          <button
            onClick={onOpenCase}
            className="group relative px-8 py-3.5 bg-verdict-active text-primary-foreground font-mono text-sm font-medium tracking-wider uppercase rounded-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-verdict-active/20"
          >
            <span className="relative z-10">{t("hero.openCase")}</span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
          <button
            onClick={onViewArchived}
            className="px-8 py-3.5 border border-forensic-border text-forensic-text font-mono text-sm tracking-wider uppercase rounded-sm hover:border-bone hover:text-bone transition-all duration-300"
          >
            {t("hero.viewArchived")}
          </button>
        </div>

        {/* Procedural summary strip */}
        <div className="reveal grid grid-cols-2 sm:grid-cols-4 gap-px bg-forensic-border/50 rounded-sm overflow-hidden" style={{ animationDelay: "0.25s" }}>
          {[
            { value: "BSC", label: "Chain Focus" },
            { value: "4", label: "Diagnostic Layers" },
            { value: "12", label: "Examination Stages" },
            { value: "5", label: "Evidence Sources" },
          ].map((stat) => (
            <div key={stat.label} className="bg-forensic-panel p-4 text-center">
              <span className="font-mono text-xl font-bold text-bone block">{stat.value}</span>
              <span className="font-mono text-[9px] tracking-wider uppercase text-forensic-muted">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-forensic-border" />
        <div className="w-1 h-1 rounded-full bg-forensic-border animate-bounce" />
      </div>
    </section>
  );
}
