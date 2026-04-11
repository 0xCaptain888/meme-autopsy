import { useI18n } from "@/lib/i18n";

function SourceBadges() {
  const { t } = useI18n();
  const sources = [
    { key: "source.fourmeme", color: "border-verdict-active/40 text-verdict-active" },
    { key: "source.dexscreener", color: "border-verdict-signal/40 text-verdict-signal" },
    { key: "source.bscscan", color: "border-blue-400/40 text-blue-400" },
    { key: "source.openai", color: "border-forensic-border text-forensic-text" },
  ];
  return (
    <div className="flex flex-col items-center lg:items-start gap-2">
      <span className="font-mono text-[8px] tracking-[0.25em] uppercase text-forensic-muted">
        {t("source.label")}
      </span>
      <div className="flex flex-wrap items-center gap-2">
        {sources.map((s) => (
          <span key={s.key} className={`inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[10px] tracking-wider border rounded-sm ${s.color}`}>
            <span className="w-1 h-1 rounded-full bg-current opacity-60" />
            {t(s.key)}
          </span>
        ))}
      </div>
    </div>
  );
}

function MiniCasePreview() {
  return (
    <div className="hidden lg:block w-80 bg-forensic-panel border border-forensic-border rounded-sm overflow-hidden shadow-2xl shadow-black/40">
      <div className="h-px bg-verdict-active" />
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[9px] tracking-wider text-forensic-muted">MA-2026-0417</span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 font-mono text-[9px] tracking-wider uppercase border border-verdict-active/40 bg-verdict-active/10 text-verdict-active rounded-sm">
            <span className="w-1 h-1 rounded-full bg-verdict-active animate-pulse" />
            UNDER EXAMINATION
          </span>
        </div>
        <h4 className="font-mono text-lg font-bold text-bone mb-1">DogePriest</h4>
        <p className="font-mono text-[10px] text-forensic-muted mb-1">four.meme launch &middot; BSC</p>
        <p className="font-mono text-xs text-verdict-active mb-3">Pronounced: Viral but Fragile</p>
        <div className="space-y-2 mb-3">
          {[
            { label: "Surface Signals", value: 84, color: "bg-verdict-signal" },
            { label: "Structural Integrity", value: 46, color: "bg-verdict-active" },
            { label: "Degeneration", value: 71, color: "bg-verdict-critical" },
            { label: "Survival Capacity", value: 38, color: "bg-verdict-critical" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <span className="font-mono text-[8px] tracking-wider text-forensic-muted w-28 truncate">{s.label}</span>
              <div className="flex-1 h-1 bg-forensic-dark rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.value}%` }} />
              </div>
              <span className="font-mono text-[10px] font-bold w-6 text-right text-bone">{s.value}</span>
            </div>
          ))}
        </div>
        <div className="pt-2 border-t border-forensic-border/50">
          <span className="font-mono text-[8px] text-forensic-muted tracking-wider">
            Probable Cause: narrative exhaustion following novelty-driven spread
          </span>
        </div>
      </div>
    </div>
  );
}

interface HeroProps {
  onOpenCase: () => void;
  onViewArchived: () => void;
}

export default function Hero({ onOpenCase, onViewArchived }: HeroProps) {
  const { t } = useI18n();
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 pt-14">
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-verdict-critical/[0.03] rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-6xl mx-auto flex items-center gap-12">
        <div className="flex-1 text-center lg:text-left">
          <div className="reveal inline-flex items-center gap-2 mb-8 px-4 py-1.5 border border-forensic-border rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-verdict-critical animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-forensic-text">
              Forensic Autopsy System v2.0
            </span>
          </div>

          <h1 className="reveal font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6 text-bone" style={{ animationDelay: "0.1s" }}>
            {t("hero.headline")}
          </h1>

          <p className="reveal font-body text-lg sm:text-xl text-forensic-text max-w-2xl mx-auto lg:mx-0 mb-4 leading-relaxed" style={{ animationDelay: "0.2s" }}>
            {t("hero.subheadline")}
          </p>

          <p className="reveal font-mono text-xs text-forensic-muted tracking-wider mb-6" style={{ animationDelay: "0.3s" }}>
            {t("hero.supporting")}
          </p>

          <div className="reveal mb-10" style={{ animationDelay: "0.35s" }}>
            <SourceBadges />
          </div>

          <div className="reveal flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4" style={{ animationDelay: "0.4s" }}>
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
        </div>

        <div className="reveal hidden lg:flex flex-shrink-0" style={{ animationDelay: "0.5s" }}>
          <MiniCasePreview />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-forensic-border" />
        <div className="w-1 h-1 rounded-full bg-forensic-border animate-bounce" />
      </div>
    </section>
  );
}
