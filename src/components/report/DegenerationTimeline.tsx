import { cn } from "@/lib/utils";
import type { DegenerationEvent } from "@/lib/types";
import ReportSection from "./ReportSection";

const severityColor: Record<DegenerationEvent["severity"], string> = {
  mild: "bg-forensic-muted",
  moderate: "bg-amber-500",
  severe: "bg-orange-500",
  terminal: "bg-verdict-critical",
};

const severityDot: Record<DegenerationEvent["severity"], string> = {
  mild: "border-forensic-muted",
  moderate: "border-amber-500",
  severe: "border-orange-500",
  terminal: "border-verdict-critical",
};

const severityText: Record<DegenerationEvent["severity"], string> = {
  mild: "text-forensic-muted",
  moderate: "text-amber-500",
  severe: "text-orange-500",
  terminal: "text-verdict-critical",
};

interface DegenerationTimelineProps {
  events: DegenerationEvent[];
}

export default function DegenerationTimeline({ events }: DegenerationTimelineProps) {
  if (!events || events.length === 0) return null;

  return (
    <ReportSection label="DEGENERATION TIMELINE">
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[7px] top-3 bottom-3 w-px bg-gradient-to-b from-forensic-border via-verdict-critical/40 to-verdict-critical/80" />

        <div className="space-y-4">
          {events.map((event, i) => (
            <div key={i} className="relative flex gap-4 pl-0">
              {/* Timeline node */}
              <div className="flex-shrink-0 relative z-10 mt-1">
                <div
                  className={cn(
                    "w-[15px] h-[15px] rounded-full border-2 bg-forensic-dark flex items-center justify-center",
                    severityDot[event.severity]
                  )}
                >
                  <div className={cn("w-[5px] h-[5px] rounded-full", severityColor[event.severity])} />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pb-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn("font-mono text-[11px] font-bold uppercase tracking-wider", severityText[event.severity])}>
                    {event.phase}
                  </span>
                  <span
                    className={cn(
                      "font-mono text-[9px] tracking-wider uppercase px-1.5 py-0.5 rounded-sm border",
                      event.severity === "terminal"
                        ? "border-verdict-critical/40 text-verdict-critical bg-verdict-critical/5"
                        : event.severity === "severe"
                        ? "border-orange-500/40 text-orange-500 bg-orange-500/5"
                        : event.severity === "moderate"
                        ? "border-amber-500/40 text-amber-500 bg-amber-500/5"
                        : "border-forensic-border text-forensic-muted bg-forensic-surface/30"
                    )}
                  >
                    {event.severity}
                  </span>
                </div>
                <p className="font-body text-[12px] text-forensic-text leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ReportSection>
  );
}
