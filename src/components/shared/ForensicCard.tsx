import { cn } from "@/lib/utils";

/**
 * ForensicCard — The standard panel/card wrapper used across the system.
 * Ensures consistent bg, border, padding, and rounded-sm treatment.
 */
export function ForensicCard({
  children,
  className,
  accentColor,
}: {
  children: React.ReactNode;
  className?: string;
  accentColor?: "critical" | "active" | "signal";
}) {
  const accentMap = {
    critical: "border-t-verdict-critical/30",
    active: "border-t-verdict-active/30",
    signal: "border-t-verdict-signal/30",
  };

  return (
    <div
      className={cn(
        "bg-forensic-panel border border-forensic-border rounded-sm",
        accentColor && accentMap[accentColor],
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * ForensicCardBody — Standard padding for card content.
 */
export function ForensicCardBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("p-6", className)}>{children}</div>;
}

/**
 * AccentBar — The thin horizontal accent bar at top of cards.
 */
export function AccentBar({ variant = "active" }: { variant?: "critical" | "active" | "signal" }) {
  const colorMap = {
    critical: "bg-verdict-critical",
    active: "bg-verdict-active",
    signal: "bg-verdict-signal",
  };
  return <div className={cn("h-px", colorMap[variant])} />;
}
