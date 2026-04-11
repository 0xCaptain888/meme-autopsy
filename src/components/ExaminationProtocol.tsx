import { useI18n } from "@/lib/i18n";

const layers = [
  { key: "surfaceSignals", num: "A" },
  { key: "structuralIntegrity", num: "B" },
  { key: "degenerationFactors", num: "C" },
  { key: "survivalCapacity", num: "D" },
] as const;

export default function ExaminationProtocol() {
  const { t } = useI18n();
  return (
    <section className="relative py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-critical">
            // DIAGNOSTIC PROTOCOL
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-3 mb-4 text-bone">
            {t("protocol.title")}
          </h2>
          <p className="font-body text-forensic-text max-w-xl mx-auto">
            {t("protocol.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {layers.map((layer, i) => (
            <div
              key={layer.key}
              className="reveal group relative bg-forensic-panel border border-forensic-border rounded-sm p-6 hover:border-verdict-critical/30 transition-all duration-500"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-3xl font-bold text-forensic-border group-hover:text-verdict-critical/40 transition-colors">
                  {layer.num}
                </span>
                <div className="w-2 h-2 rounded-full bg-verdict-critical/30 group-hover:bg-verdict-critical/60 transition-colors" />
              </div>
              <h3 className="font-mono text-sm font-medium text-bone mb-2 tracking-tight">
                {t(`layer.${layer.key}`)}
              </h3>
              <p className="font-body text-xs text-forensic-text leading-relaxed">
                {t(`layer.${layer.key}.desc`)}
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-verdict-critical/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
