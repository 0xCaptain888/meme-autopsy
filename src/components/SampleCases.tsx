"use client";

import { useI18n } from "@/lib/i18n";
import StatusBadge from "./StatusBadge";
import type { StatusBadge as StatusBadgeType, Verdict } from "@/lib/types";

interface SampleCasesProps {
  onSelectCase: (projectName: string) => void;
}

const cases: {
  key: string;
  badge: StatusBadgeType;
  verdict: Verdict;
  desc: string;
  caseId: string;
  hoverBorder: string;
  gradientVia: string;
}[] = [
  {
    key: "BananaFax",
    badge: "CRITICAL",
    verdict: "Dead on Arrival",
    desc: "Random absurdity without symbolic durability.",
    caseId: "MA-2026-0418",
    hoverBorder: "hover:border-verdict-critical/50",
    gradientVia: "via-verdict-critical/40",
  },
  {
    key: "DogePriest",
    badge: "ACTIVE CASE",
    verdict: "Viral but Fragile",
    desc: "Strong identity, weak doctrine, fragile long-term conviction.",
    caseId: "MA-2026-0417",
    hoverBorder: "hover:border-verdict-active/50",
    gradientVia: "via-verdict-active/40",
  },
  {
    key: "SaintMeme",
    badge: "HIGH SIGNAL",
    verdict: "Stable Cult Potential",
    desc: "Mission-driven narrative with repeatable ritual structures.",
    caseId: "MA-2026-0419",
    hoverBorder: "hover:border-verdict-signal/50",
    gradientVia: "via-verdict-signal/40",
  },
];

export default function SampleCases({ onSelectCase }: SampleCasesProps) {
  const { t } = useI18n();
  return (
    <section className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-critical">
            // CASE FILES
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
              className={`reveal group relative text-left bg-forensic-panel border border-forensic-border rounded-sm ${c.hoverBorder} transition-all duration-500 overflow-hidden`}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              {/* Top accent line */}
              <div className={`h-px ${
                c.badge === "CRITICAL" ? "bg-verdict-critical" :
                c.badge === "ACTIVE CASE" ? "bg-verdict-active" : "bg-verdict-signal"
              }`} />

              <div className="p-6">
                {/* Case ID */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[9px] tracking-wider text-forensic-muted">
                    {c.caseId}
                  </span>
                  <StatusBadge badge={c.badge} />
                </div>

                {/* Project name */}
                <h3 className="font-mono text-xl font-bold text-bone mb-1 group-hover:text-white transition-colors tracking-tight">
                  {c.key}
                </h3>

                {/* Verdict */}
                <p className="font-mono text-xs text-forensic-text mb-3">
                  {c.verdict}
                </p>

                {/* Description */}
                <p className="font-body text-sm text-forensic-muted leading-relaxed">
                  {c.desc}
                </p>

                {/* View report link */}
                <div className="mt-4 pt-3 border-t border-forensic-border/50">
                  <span className="font-mono text-[10px] tracking-wider uppercase text-forensic-muted group-hover:text-bone transition-colors flex items-center gap-1.5">
                    View Report
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.3">
                      <path d="M2 5h6M6 3l2 2-2 2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>

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
