"use client";

import type { AutopsyReport } from "@/lib/types";

interface HeroProps {
  onRunAutopsy: () => void;
  onViewSample: () => void;
}

function MiniReportCard() {
  return (
    <div className="hidden lg:block w-80 bg-forensic-panel border border-forensic-border rounded-sm overflow-hidden shadow-2xl shadow-black/40">
      <div className="h-px bg-verdict-active" />
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[9px] tracking-wider text-forensic-muted">MA-2026-0417</span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 font-mono text-[9px] tracking-wider uppercase border border-verdict-active/40 bg-verdict-active/10 text-verdict-active rounded-sm">
            <span className="w-1 h-1 rounded-full bg-verdict-active animate-pulse" />
            ACTIVE CASE
          </span>
        </div>
        <h4 className="font-mono text-lg font-bold text-bone mb-1">DogePriest</h4>
        <p className="font-mono text-xs text-verdict-active mb-3">Viral but Fragile</p>
        <div className="space-y-2 mb-3">
          {[
            { label: "Symbolic Density", value: 86 },
            { label: "Lore Depth", value: 52 },
            { label: "Ritual Repeat.", value: 88 },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <span className="font-mono text-[8px] tracking-wider text-forensic-muted w-24 truncate">{s.label}</span>
              <div className="flex-1 h-1 bg-forensic-dark rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${s.value >= 70 ? "bg-verdict-signal" : s.value >= 40 ? "bg-verdict-active" : "bg-verdict-critical"}`}
                  style={{ width: `${s.value}%` }}
                />
              </div>
              <span className={`font-mono text-[10px] font-bold w-6 text-right ${s.value >= 70 ? "text-verdict-signal" : s.value >= 40 ? "text-verdict-active" : "text-verdict-critical"}`}>
                {s.value}
              </span>
            </div>
          ))}
        </div>
        <div className="pt-2 border-t border-forensic-border/50">
          <span className="font-mono text-[8px] text-forensic-muted tracking-wider">78% CONFIDENCE</span>
        </div>
      </div>
    </div>
  );
}

export default function Hero({ onRunAutopsy, onViewSample }: HeroProps) {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 pt-14">
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-verdict-critical/[0.03] rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-6xl mx-auto flex items-center gap-12">
        <div className="flex-1 text-center lg:text-left">
          {/* Forensic label */}
          <div className="reveal inline-flex items-center gap-2 mb-8 px-4 py-1.5 border border-forensic-border rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-verdict-critical animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-forensic-text">
              Forensic Intelligence Engine v1.0
            </span>
          </div>

          {/* Headline */}
          <h1
            className="reveal font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="text-bone">Dissect the life and death of any meme project</span>
          </h1>

          {/* Subheadline */}
          <p
            className="reveal font-body text-lg sm:text-xl text-forensic-text max-w-2xl mx-auto lg:mx-0 mb-4 leading-relaxed"
            style={{ animationDelay: "0.2s" }}
          >
            Meme Autopsy is an AI forensic engine that diagnoses why meme narratives go viral, decay, or die.
          </p>

          {/* Supporting line */}
          <p
            className="reveal font-mono text-xs text-forensic-muted tracking-wider mb-10"
            style={{ animationDelay: "0.3s" }}
          >
            From hype to collapse, every meme leaves evidence.
          </p>

          {/* Buttons */}
          <div
            className="reveal flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
            style={{ animationDelay: "0.4s" }}
          >
            <button
              onClick={onRunAutopsy}
              className="group relative px-8 py-3.5 bg-verdict-active text-white font-mono text-sm font-medium tracking-wider uppercase rounded-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-verdict-active/20"
            >
              <span className="relative z-10">Run Autopsy</span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <button
              onClick={onViewSample}
              className="px-8 py-3.5 border border-forensic-border text-forensic-text font-mono text-sm tracking-wider uppercase rounded-sm hover:border-bone hover:text-bone transition-all duration-300"
            >
              View Sample Report
            </button>
          </div>
        </div>

        {/* Mini report preview on desktop */}
        <div className="reveal hidden lg:flex flex-shrink-0" style={{ animationDelay: "0.5s" }}>
          <MiniReportCard />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-forensic-border" />
        <div className="w-1 h-1 rounded-full bg-forensic-border animate-bounce" />
      </div>
    </section>
  );
}
