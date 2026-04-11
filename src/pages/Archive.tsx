import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import { archivedCases, sampleReports, sampleInputs } from "@/data/sampleCases";
import { SubLabel, StatusChip } from "@/components/shared";
import Navbar from "@/components/Navbar";
import type { ArchivedCaseFile } from "@/data/sampleCases";

type FilterType = "all" | "TERMINAL SPECIMEN" | "PRESERVED SPECIMEN" | "OPEN EXAMINATION";

export default function ArchivePage() {
  const { lang } = useI18n();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterType>("all");

  const filtered = useMemo(
    () => (filter === "all" ? archivedCases : archivedCases.filter((c) => c.specimenLabel === filter)),
    [filter]
  );

  const filters: { label: string; value: FilterType }[] = [
    { label: lang === "zh" ? "全部" : "All", value: "all" },
    { label: lang === "zh" ? "终末标本" : "Terminal", value: "TERMINAL SPECIMEN" },
    { label: lang === "zh" ? "在检标本" : "Open", value: "OPEN EXAMINATION" },
    { label: lang === "zh" ? "保存标本" : "Preserved", value: "PRESERVED SPECIMEN" },
  ];

  const handleSelect = (c: ArchivedCaseFile) => {
    // Navigate back to index with state to show report
    navigate("/", { state: { viewCase: c.key } });
  };

  return (
    <div className="min-h-screen bg-background scanline-overlay noise-bg">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 pt-20 pb-16">
        {/* Header */}
        <div className="mb-8">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-critical block mb-3">
            // ARCHIVED CASE FILES
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-bone mb-3">
            {lang === "zh" ? "已归档案件" : "Archived Case Files"}
          </h1>
          <p className="font-body text-sm text-forensic-text max-w-lg">
            {lang === "zh"
              ? "已完成检查的案件档案。每份记录可追溯至原始证据来源。"
              : "Completed examination records. Each file is traceable to its original evidence sources."}
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-8">
          <SubLabel className="mr-2">Filter</SubLabel>
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 font-mono text-[10px] tracking-wider uppercase rounded-sm border transition-colors ${
                filter === f.value
                  ? "border-verdict-active text-verdict-active bg-verdict-active/10"
                  : "border-forensic-border text-forensic-muted hover:border-forensic-text hover:text-forensic-text"
              }`}
            >
              {f.label}
            </button>
          ))}
          <span className="font-mono text-[9px] text-forensic-muted ml-auto">
            {filtered.length} {lang === "zh" ? "份案件" : "cases"}
          </span>
        </div>

        {/* Case list */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-mono text-sm text-forensic-muted">
              {lang === "zh" ? "没有匹配的案件。" : "No matching cases found."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((c) => (
              <CaseArchiveCard key={c.key} caseFile={c} onClick={() => handleSelect(c)} lang={lang} />
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 pt-6 border-t border-forensic-border text-center">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-forensic-muted">
            Meme Autopsy — Forensic Autopsy System for Meme Projects
          </p>
        </div>
      </div>
    </div>
  );
}

function CaseArchiveCard({
  caseFile,
  onClick,
  lang,
}: {
  caseFile: ArchivedCaseFile;
  onClick: () => void;
  lang: string;
}) {
  const isTerminal = caseFile.accentClass === "verdict-critical";
  const isPreserved = caseFile.accentClass === "verdict-signal";

  const conditionColor = isTerminal
    ? "text-verdict-critical"
    : isPreserved
    ? "text-verdict-signal"
    : "text-verdict-active";

  const chipVariant = isTerminal ? "critical" : isPreserved ? "signal" : "active";

  const confidenceColor =
    caseFile.confidence >= 70
      ? "text-verdict-signal"
      : caseFile.confidence >= 40
      ? "text-verdict-active"
      : "text-verdict-critical";

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-forensic-panel border border-forensic-border rounded-sm hover:border-forensic-muted/40 transition-all duration-200 group"
    >
      <div className="p-5">
        {/* Top row: name, case ID, specimen label */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-mono text-lg font-bold text-bone tracking-tight">{caseFile.key}</span>
            <span className="font-mono text-[9px] text-forensic-muted">{caseFile.caseId}</span>
          </div>
          <StatusChip label={caseFile.specimenLabel} variant={chipVariant} />
        </div>

        {/* Condition + determination */}
        <div className="mb-3">
          <span className={`font-mono text-sm font-medium ${conditionColor}`}>{caseFile.condition}</span>
          <p className="font-body text-xs text-forensic-muted leading-relaxed mt-1">{caseFile.oneLineSummary}</p>
        </div>

        {/* Metadata row */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-[10px] mb-3">
          <span className="text-forensic-muted">
            {isTerminal || !isPreserved ? "Cause" : "Mechanism"}:{" "}
            <span className="text-forensic-text">{caseFile.causeOfDeath}</span>
          </span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-forensic-border/30">
          <div className="flex items-center gap-4 font-mono text-[10px]">
            <span className="text-forensic-muted">
              {caseFile.mannerOrOutlook}
            </span>
            <span className={confidenceColor}>
              {caseFile.confidence}% confidence
            </span>
            <span className="text-forensic-muted">
              {new Date(caseFile.filedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-wider uppercase text-forensic-muted group-hover:text-bone transition-colors flex items-center gap-1">
            {lang === "zh" ? "查看" : "View"}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.3">
              <path d="M2 5h6M6 3l2 2-2 2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </button>
  );
}
