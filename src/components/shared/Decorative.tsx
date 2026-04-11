/**
 * EvidenceBullet — Consistent bullet point for evidence items and findings.
 */
export function EvidenceBullet({
  children,
  variant = "critical",
}: {
  children: React.ReactNode;
  variant?: "critical" | "active" | "signal" | "muted";
}) {
  const colorMap = {
    critical: "text-verdict-critical",
    active: "text-verdict-active",
    signal: "text-verdict-signal",
    muted: "text-forensic-muted",
  };

  return (
    <div className="flex items-start gap-2 font-body text-[12px] text-forensic-text">
      <span className={`mt-0.5 ${colorMap[variant]}`}>▸</span>
      <span>{children}</span>
    </div>
  );
}

/**
 * Divider — Consistent horizontal separator.
 */
export function Divider({ variant = "default" }: { variant?: "default" | "gradient" }) {
  if (variant === "gradient") {
    return <div className="h-px bg-gradient-to-r from-verdict-critical/40 via-forensic-border to-transparent" />;
  }
  return <div className="h-px bg-forensic-border/50" />;
}
