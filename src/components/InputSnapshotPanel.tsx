"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import type { AutopsyReport } from "@/lib/types";

interface InputSnapshotPanelProps {
  snapshot: AutopsyReport["input_snapshot"];
}

export default function InputSnapshotPanel({ snapshot }: InputSnapshotPanelProps) {
  const { t } = useI18n();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="reveal" style={{ animationDelay: "0.45s" }}>
      {/* Section header */}
      <div className="mb-6">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-forensic-muted">
          // INPUT SNAPSHOT
        </span>
      </div>

      <div className="bg-forensic-panel border border-forensic-border rounded-sm overflow-hidden">
        {/* Toggle header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-5 hover:bg-forensic-dark/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-forensic-muted"
            >
              <rect x="2" y="2" width="10" height="10" rx="1" strokeLinecap="round" />
              <path d="M5 5h4M5 7h3M5 9h2" strokeLinecap="round" />
            </svg>
            <span className="font-mono text-xs tracking-wider uppercase text-forensic-text">
              {t("inputSnapshot.title")}
            </span>
          </div>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className={`text-forensic-muted transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
          >
            <path d="M3 5l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Expandable content */}
        <div
          className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="px-5 pb-5 space-y-4 border-t border-forensic-border/50">
            {/* Project Name */}
            <div className="pt-4">
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-forensic-muted block mb-1">
                {t("input.projectName")}
              </span>
              <p className="font-mono text-sm text-bone">{snapshot.projectName}</p>
            </div>

            {/* Narrative */}
            <div>
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-forensic-muted block mb-1">
                {t("input.narrative")}
              </span>
              <p className="font-body text-sm text-forensic-text leading-relaxed">
                {snapshot.narrative}
              </p>
            </div>

            {/* Community Text */}
            {snapshot.communityText && (
              <div>
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-forensic-muted block mb-1">
                  {t("input.communityText")}
                </span>
                <p className="font-body text-sm text-forensic-text leading-relaxed whitespace-pre-line">
                  {snapshot.communityText}
                </p>
              </div>
            )}

            {/* Notes */}
            {snapshot.notes && (
              <div>
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-forensic-muted block mb-1">
                  {t("input.notes")}
                </span>
                <p className="font-body text-sm text-forensic-text leading-relaxed">
                  {snapshot.notes}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
