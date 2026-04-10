"use client";

import { useI18n } from "@/lib/i18n";

export default function NotAnotherMemeTool() {
  const { lang } = useI18n();

  return (
    <section className="relative py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="reveal relative bg-forensic-dark border border-forensic-border rounded-sm p-8 sm:p-12 text-center overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 grid-pattern opacity-30" />
          {/* Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-verdict-critical/[0.04] rounded-full blur-[80px]" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 mb-6 px-3 py-1 border border-verdict-critical/30 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-verdict-critical" />
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-verdict-critical">
                {lang === "zh" ? "重要区别" : "KEY DISTINCTION"}
              </span>
            </span>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-bone mb-5">
              {lang === "zh" ? "不是另一个 Meme 工具" : "Not another meme tool"}
            </h3>

            <p className="font-body text-base sm:text-lg text-forensic-text leading-relaxed max-w-2xl mx-auto mb-8">
              {lang === "zh"
                ? "Meme Autopsy 不做情绪分类。它诊断符号持久性、传说深度、社区凝聚力和信仰韧性。"
                : "Meme Autopsy does not classify mood. It diagnoses symbolic durability, lore depth, community cohesion, and belief resilience."}
            </p>

            {/* Comparison grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              <div className="bg-forensic-panel border border-forensic-border rounded-sm p-4">
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-forensic-muted block mb-2">
                  {lang === "zh" ? "其他工具" : "OTHER TOOLS"}
                </span>
                <ul className="space-y-1.5 text-left">
                  {(lang === "zh"
                    ? ["生成内容", "追踪价格", "分析情绪"]
                    : ["Generate content", "Track price", "Analyze sentiment"]
                  ).map((item, i) => (
                    <li key={i} className="flex items-center gap-2 font-body text-xs text-forensic-muted">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-forensic-panel border border-verdict-critical/20 rounded-sm p-4">
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-verdict-critical block mb-2">
                  MEME AUTOPSY
                </span>
                <ul className="space-y-1.5 text-left">
                  {(lang === "zh"
                    ? ["诊断叙事结构", "分析符号持久性", "预测信仰崩溃"]
                    : ["Diagnose narrative structure", "Analyze symbolic durability", "Predict belief collapse"]
                  ).map((item, i) => (
                    <li key={i} className="flex items-center gap-2 font-body text-xs text-bone/80">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 3" stroke="#dc2626" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
