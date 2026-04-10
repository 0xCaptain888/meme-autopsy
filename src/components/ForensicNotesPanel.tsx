"use client";

interface ForensicNotesPanelProps {
  notes: string[];
}

export default function ForensicNotesPanel({ notes }: ForensicNotesPanelProps) {
  return (
    <div className="reveal" style={{ animationDelay: "0.35s" }}>
      {/* Section header */}
      <div className="mb-8">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-forensic-muted">
          // FORENSIC NOTES
        </span>
        <h3 className="font-display text-2xl sm:text-3xl font-bold mt-2 mb-2">
          Supplementary Observations
        </h3>
        <p className="font-body text-forensic-text text-sm">
          Additional diagnostic observations from the forensic analysis pipeline.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {notes.map((note, i) => (
          <div
            key={i}
            className="reveal bg-forensic-panel border border-forensic-border rounded-sm p-5 hover:border-forensic-muted/40 transition-colors duration-300"
            style={{ animationDelay: `${0.4 + i * 0.08}s` }}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-verdict-critical" />
              </div>
              <p className="font-body text-sm text-bone/80 leading-relaxed">
                {note}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
