import { useI18n } from "@/lib/i18n";

const sources = [
  {
    name: "four.meme",
    role: { en: "Launch context, creator description, initial framing, slogan variants", zh: "启动上下文、创建者描述、初始框架、标语变体" },
    type: { en: "Launch platform record", zh: "启动平台记录" },
  },
  {
    name: "DexScreener",
    role: { en: "Market cap, price action, liquidity depth, trading volume, pair data", zh: "市值、价格走势、流动性深度、交易量、交易对数据" },
    type: { en: "Market structure data", zh: "市场结构数据" },
  },
  {
    name: "BscScan",
    role: { en: "Holder count, holder concentration, top wallet distribution, contract metadata", zh: "持有人数、持有集中度、顶部钱包分布、合约元数据" },
    type: { en: "On-chain holder data", zh: "链上持有人数据" },
  },
  {
    name: "Narrative Record",
    role: { en: "Community language, doctrine presence, ritual patterns, lore expansion signals", zh: "社区语言、教义存在、仪式模式、传说扩展信号" },
    type: { en: "Qualitative narrative signal", zh: "定性叙事信号" },
  },
  {
    name: "Scene Notes",
    role: { en: "User-provided context, observed community behavior, cultural framing", zh: "用户提供的上下文、观察到的社区行为、文化框架" },
    type: { en: "Examiner-submitted context", zh: "检验员提交的上下文" },
  },
];

export default function EvidenceSourcesSection() {
  const { lang } = useI18n();
  return (
    <section className="relative py-20 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-verdict-critical/[0.01] to-transparent" />
      <div className="relative max-w-4xl mx-auto">
        <div className="mb-12">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-critical block mb-3">
            // EVIDENCE SOURCES
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-bone mb-3">
            {lang === "zh" ? "证据来源" : "Evidence Sources"}
          </h2>
          <p className="font-body text-sm text-forensic-text max-w-lg">
            {lang === "zh"
              ? "每项判定都可追溯至具体的证据来源。不透明的结论不被接受。"
              : "Every determination is traceable to specific evidence sources. Opaque conclusions are not accepted."}
          </p>
        </div>

        <div className="space-y-3">
          {sources.map((src, i) => (
            <div
              key={src.name}
              className="reveal flex items-start gap-4 bg-forensic-panel border border-forensic-border rounded-sm p-4 hover:border-forensic-muted/30 transition-colors"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="flex-shrink-0 w-8 h-8 bg-forensic-dark border border-forensic-border rounded-sm flex items-center justify-center">
                <span className="font-mono text-[9px] font-bold text-verdict-active">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-mono text-sm font-medium text-bone">{src.name}</span>
                  <span className="font-mono text-[8px] tracking-wider uppercase text-forensic-muted px-1.5 py-0.5 border border-forensic-border rounded-sm">
                    {lang === "zh" ? src.type.zh : src.type.en}
                  </span>
                </div>
                <p className="font-body text-xs text-forensic-text leading-relaxed">
                  {lang === "zh" ? src.role.zh : src.role.en}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
