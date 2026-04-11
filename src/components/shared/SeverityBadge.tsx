import { cn } from "@/lib/utils";

export type SeverityLevel = "terminal" | "severe" | "moderate" | "mild";

const severityStyles: Record<SeverityLevel, { border: string; text: string; label: string }> = {
  terminal: { border: "border-verdict-critical", text: "text-verdict-critical", label: "TERMINAL" },
  severe: { border: "border-verdict-active", text: "text-verdict-active", label: "SEVERE" },
  moderate: { border: "border-forensic-muted", text: "text-forensic-text", label: "MODERATE" },
  mild: { border: "border-forensic-border", text: "text-forensic-muted", label: "MILD" },
};

/**
 * SeverityBadge — Inline severity indicator for pathology findings.
 */
export function SeverityBadge({
  severity,
  className,
}: {
  severity: SeverityLevel;
  className?: string;
}) {
  const config = severityStyles[severity];
  return (
    <span
      className={cn(
        "font-mono text-[8px] tracking-wider uppercase opacity-70",
        config.text,
        className
      )}
    >
      {config.label}
    </span>
  );
}

/**
 * Get border class for severity-based left-border treatment.
 */
export function getSeverityBorder(severity: SeverityLevel): string {
  return severityStyles[severity].border;
}

/**
 * Get text class for severity-based coloring.
 */
export function getSeverityText(severity: SeverityLevel): string {
  return severityStyles[severity].text;
}
