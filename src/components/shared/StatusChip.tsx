import { cn } from "@/lib/utils";

export type ChipVariant = "critical" | "active" | "signal" | "muted";

const variantStyles: Record<ChipVariant, string> = {
  critical: "text-verdict-critical border-verdict-critical/30",
  active: "text-verdict-active border-verdict-active/30",
  signal: "text-verdict-signal border-verdict-signal/30",
  muted: "text-forensic-muted border-forensic-border",
};

/**
 * StatusChip — Unified small status indicator.
 * Used for evidence source status, case status, specimen state, etc.
 */
export function StatusChip({
  label,
  variant = "muted",
  pulse = false,
  className,
}: {
  label: string;
  variant?: ChipVariant;
  pulse?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-[8px] tracking-wider uppercase px-2 py-0.5 border rounded-sm",
        variantStyles[variant],
        className
      )}
    >
      {pulse && (
        <span
          className={cn("w-1 h-1 rounded-full animate-pulse", {
            "bg-verdict-critical": variant === "critical",
            "bg-verdict-active": variant === "active",
            "bg-verdict-signal": variant === "signal",
            "bg-forensic-muted": variant === "muted",
          })}
        />
      )}
      {label}
    </span>
  );
}

/**
 * Map common statuses to chip variants for consistent rendering.
 */
export function getStatusVariant(status: string): ChipVariant {
  switch (status) {
    case "acquired":
    case "Preserved":
    case "report_ready":
      return "signal";
    case "partial":
    case "stale":
    case "Viral but Fragile":
    case "Under Examination":
    case "Examination Ongoing":
      return "active";
    case "unavailable":
    case "Dead on Arrival":
    case "terminal":
    case "failed":
      return "critical";
    default:
      return "muted";
  }
}
