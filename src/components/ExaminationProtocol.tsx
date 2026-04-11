import { useI18n } from "@/lib/i18n";

const layers = [
  { key: "surfaceSignals", num: "01" },
  { key: "structuralIntegrity", num: "02" },
  { key: "degenerationFactors", num: "03" },
  { key: "survivalCapacity", num: "04" },
] as const;

export default function ExaminationProtocol() {
  const { t, lang } = useI18n();
  return (
    <section className="relative py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-critical block mb-3">
            // DIAGNOSTIC PROTOCOL
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-bone mb-3">
            {t("protocol.title")}
          </h2>
          <p className="font-body text-sm text-forensic-text max-w-lg">
            {t("protocol.subtitle")}
          </p>
        </div>

        <div className="space-y-4">
          {layers.map((layer, i) => (
            <div
              key={layer.key}
              className="reveal group bg-forensic-panel border border-forensic-border rounded-sm p-5 hover:border-forensic-muted/30 transition-all duration-300"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-forensic-dark border border-forensic-border rounded-sm flex items-center justify-center">
                  <span className="font-mono text-[10px] font-bold text-forensic-muted group-hover:text-verdict-critical transition-colors">
                    {layer.num}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-mono text-sm font-medium text-bone mb-1.5 tracking-tight">
                    {t(`layer.${layer.key}`)}
                  </h3>
                  <p className="font-body text-xs text-forensic-text leading-relaxed">
                    {t(`layer.${layer.key}.desc`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="font-mono text-[10px] text-forensic-muted mt-6 tracking-wider">
          {lang === "zh"
            ? "诊断协议层为判定提供结构化支撑，不作为独立指标使用。"
            : "Protocol layers provide structured support to the determination. They are not standalone metrics."}
        </p>
      </div>
    </section>
  );
}
