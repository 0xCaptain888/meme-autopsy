"use client";

interface StatusBadgeProps {
  badge: string;
}

export default function StatusBadge({ badge }: StatusBadgeProps) {
  const colorMap: Record<string, { text: string; border: string; bg: string; glow: string }> = {
    CRITICAL: {
      text: "text-verdict-critical",
      border: "border-verdict-critical/40",
      bg: "bg-verdict-critical/10",
      glow: "glow-red",
    },
    "ACTIVE CASE": {
      text: "text-verdict-active",
      border: "border-verdict-active/40",
      bg: "bg-verdict-active/10",
      glow: "glow-amber",
    },
    "HIGH SIGNAL": {
      text: "text-verdict-signal",
      border: "border-verdict-signal/40",
      bg: "bg-verdict-signal/10",
      glow: "glow-green",
    },
  };

  const colors = colorMap[badge] || colorMap["CRITICAL"];

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 font-mono text-[11px] tracking-[0.15em] font-semibold uppercase border rounded-sm ${colors.text} ${colors.border} ${colors.bg} ${colors.glow}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          badge === "CRITICAL"
            ? "bg-verdict-critical"
            : badge === "ACTIVE CASE"
            ? "bg-verdict-active"
            : "bg-verdict-signal"
        } animate-pulse`}
      />
      {badge}
    </span>
  );
}
