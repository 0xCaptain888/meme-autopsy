"use client";

import { useI18n } from "@/lib/i18n";

export default function ThesisBlock() {
  const { lang } = useI18n();

  return (
    <section className="relative py-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        {/* Decorative line */}
        <div className="w-12 h-px bg-verdict-critical mx-auto mb-8" />

        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-critical block mb-4">
          // {lang === "zh" ? "产品论点" : "PRODUCT THESIS"}
        </span>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-bone mb-6 leading-tight">
          {lang === "zh" ? "从生成到诊断" : "From generation to diagnosis"}
        </h2>

        <p className="font-body text-lg sm:text-xl text-forensic-text leading-relaxed max-w-xl mx-auto mb-8">
          {lang === "zh"
            ? "大多数 Meme 工具帮助创建叙事。Meme Autopsy 帮助解释叙事为何失败。"
            : "Most meme tools help create narratives. Meme Autopsy helps explain why narratives fail."}
        </p>

        {/* Decorative line */}
        <div className="w-12 h-px bg-forensic-border mx-auto" />
      </div>
    </section>
  );
}
