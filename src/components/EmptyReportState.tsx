"use client";

export default function EmptyReportState() {
  return (
    <div className="h-full flex items-center justify-center relative overflow-hidden">
      {/* Subtle forensic grid background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Ghost corners */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-forensic-border/30" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-forensic-border/30" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-forensic-border/30" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-forensic-border/30" />

      <div className="relative z-10 text-center px-8 max-w-sm">
        {/* Ghost icon */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 border border-forensic-border/30 rounded-full" />
          <div className="absolute inset-3 border border-forensic-border/20 rounded-full" />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              className="text-forensic-border"
            >
              <path
                d="M14 4v20M4 14h20"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.5"
              />
              <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            </svg>
          </div>
        </div>

        {/* Text */}
        <p className="font-mono text-sm text-forensic-muted tracking-wider mb-2">
          NO REPORT LOADED
        </p>
        <p className="font-body text-sm text-forensic-text leading-relaxed">
          Submit a case to generate a forensic report. The analysis engine will evaluate your meme project across six diagnostic dimensions.
        </p>

        {/* Decorative scan line */}
        <div className="mt-8 w-full h-px bg-gradient-to-r from-transparent via-forensic-border/40 to-transparent" />
        <p className="mt-3 font-mono text-[9px] tracking-[0.3em] uppercase text-forensic-border">
          AWAITING INPUT
        </p>
      </div>
    </div>
  );
}
