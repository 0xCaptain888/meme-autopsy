"use client";

import { useI18n } from "@/lib/i18n";

interface SampleCasesProps {
  onSelectCase: (caseName: string) => void;
}

const cases = [
  {
    key: "BananaFax",
    verdictKey: "samples.deadOnArrival",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 7l6 6M13 7l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    descEn: "No symbolic anchor. No belief structure. Noise without signal.",
    descZh: "没有符号锚点。没有信仰结构。只有噪音没有信号。",
    iconColor: "text-verdict-critical",
    badgeClasses: "text-verdict-critical border-verdict-critical/30 bg-verdict-critical/5",
    hoverBorder: "hover:border-verdict-critical/50",
    gradientVia: "via-verdict-critical/40",
  },
  {
    key: "DogePriest",
    verdictKey: "samples.viralButFragile",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 3l1.5 4.5H16l-3.5 2.5 1.5 4.5L10 12l-4 2.5 1.5-4.5L4 7.5h4.5L10 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    descEn: "Strong initial identity. Weak long-term doctrine. Fragile conviction layer.",
    descZh: "强大的初始身份认同。薄弱的长期教义。脆弱的信念层。",
    iconColor: "text-verdict-active",
    badgeClasses: "text-verdict-active border-verdict-active/30 bg-verdict-active/5",
    hoverBorder: "hover:border-verdict-active/50",
    gradientVia: "via-verdict-active/40",
  },
  {
    key: "SaintMeme",
    verdictKey: "samples.stableCult",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2v16M6 6l4-4 4 4M4 10h12M6 14l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    descEn: "Mission-driven identity. Deep lore. Ritual structures sustain belief.",
    descZh: "使命驱动的身份认同。深厚传说。仪式结构维持信仰。",
    iconColor: "text-verdict-signal",
    badgeClasses: "text-verdict-signal border-verdict-signal/30 bg-verdict-signal/5",
    hoverBorder: "hover:border-verdict-signal/50",
    gradientVia: "via-verdict-signal/40",
  },
];

export default function SampleCases({ onSelectCase }: SampleCasesProps) {
  const { t, lang } = useI18n();

  return (
    <section className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-critical">
            // {t("samples.title")}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-3 mb-4">
            {t("samples.title")}
          </h2>
          <p className="font-body text-forensic-text max-w-xl mx-auto">
            {t("samples.subtitle")}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <button
              key={c.key}
              onClick={() => onSelectCase(c.key)}
              className={`reveal group relative text-left p-6 bg-forensic-panel border border-forensic-border rounded-sm ${c.hoverBorder} transition-all duration-500`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {/* Top row */}
              <div className="flex items-center justify-between mb-4">
                <span className={c.iconColor}>{c.icon}</span>
                <span
                  className={`font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 border rounded-sm ${c.badgeClasses}`}
                >
                  {t(c.verdictKey)}
                </span>
              </div>

              {/* Project name */}
              <h3 className="font-mono text-lg font-semibold text-bone mb-2 group-hover:text-white transition-colors">
                {c.key}
              </h3>

              {/* Description */}
              <p className="font-body text-sm text-forensic-text leading-relaxed">
                {lang === "zh" ? c.descZh : c.descEn}
              </p>

              {/* Bottom accent */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${c.gradientVia} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
