"use client";

import { useI18n } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n();

  return (
    <button
      onClick={() => setLang(lang === "en" ? "zh" : "en")}
      className="relative group px-3 py-1.5 border border-forensic-border rounded font-mono text-xs tracking-wider text-forensic-text hover:text-bone hover:border-verdict-active transition-all duration-300"
    >
      <span className="relative z-10">
        {lang === "en" ? "中文" : "EN"}
      </span>
      <div className="absolute inset-0 bg-verdict-active/5 opacity-0 group-hover:opacity-100 transition-opacity rounded" />
    </button>
  );
}
