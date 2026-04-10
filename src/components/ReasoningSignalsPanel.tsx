"use client";

import type { ReasoningSignal } from "@/lib/types";

interface ReasoningSignalsPanelProps {
  signals: ReasoningSignal[];
}

export default function ReasoningSignalsPanel({ signals }: ReasoningSignalsPanelProps) {
  return (
    <div className="reveal" style={{ animationDelay: "0.4s" }}>
      {/* Section header */}
      <div className="mb-8">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-active">
          // REASONING SIGNALS
        </span>
        <h3 className="font-display text-2xl sm:text-3xl font-bold mt-2 mb-2">
          Signal Analysis
        </h3>
        <p className="font-body text-forensic-text text-sm">
          Key reasoning signals that shaped the forensic verdict.
        </p>
      </div>

      <div className="space-y-3">
        {signals.map((signal, i) => (
          <div
            key={i}
            className="reveal flex items-start gap-4 bg-forensic-panel border border-forensic-border rounded-sm p-5 hover:border-verdict-active/30 transition-colors duration-300"
            style={{ animationDelay: `${0.45 + i * 0.08}s` }}
          >
            {/* Signal indicator */}
            <div className="flex-shrink-0 flex flex-col items-center gap-1 pt-0.5">
              <div className="w-2 h-2 rounded-full bg-verdict-active animate-pulse" />
              <div className="w-px h-6 bg-forensic-border" />
            </div>

            <div className="flex-1">
              <span className="font-mono text-xs tracking-wider uppercase text-verdict-active font-semibold block mb-1">
                {signal.label}
              </span>
              <p className="font-body text-sm text-forensic-text leading-relaxed">
                {signal.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
