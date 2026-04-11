import { cn } from "@/lib/utils";

/**
 * SectionLabel — The "// SECTION NAME" forensic label used at the top of every section.
 * Replaces all manually typed `font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-critical` patterns.
 */
export function SectionLabel({
  children,
  variant = "critical",
  className,
}: {
  children: React.ReactNode;
  variant?: "critical" | "muted" | "active";
  className?: string;
}) {
  const colorMap = {
    critical: "text-verdict-critical",
    muted: "text-forensic-muted",
    active: "text-verdict-active",
  };
  return (
    <span className={cn("font-mono text-[10px] tracking-[0.3em] uppercase block", colorMap[variant], className)}>
      {children}
    </span>
  );
}

/**
 * SubLabel — Smaller section/field labels used inside panels.
 * Replaces `font-mono text-[10px] tracking-[0.2em] uppercase text-forensic-muted`.
 */
export function SubLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("font-mono text-[10px] tracking-[0.2em] uppercase text-forensic-muted block", className)}>
      {children}
    </span>
  );
}

/**
 * FieldLabel — Smallest inline field labels.
 * Replaces `font-mono text-[9px/10px] text-forensic-muted uppercase`.
 */
export function FieldLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("font-mono text-[9px] text-forensic-muted uppercase", className)}>
      {children}
    </span>
  );
}
