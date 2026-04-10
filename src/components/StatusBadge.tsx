"use client";

import type { StatusBadge as StatusBadgeType } from "@/lib/types";

interface StatusBadgeProps {
  badge: StatusBadgeType;
}

export default function StatusBadge({ badge }: StatusBadgeProps) {
  const colorMap: Record<StatusBadgeType, { text: string; border: string; bg: string; dot: string }> = {
    CRITICAL: {
      text: "text-verdict-critical",
      border: "border-verdict-critical/40",
      bg: "bg-verdict-critical/10",
      dot: "bg-verdict-critical",
    },
    "ACTIVE CASE": {
      text: "text-verdict-active",
      border: "border-verdict-active/40",
      bg: "bg-verdict-active/10",
      dot: "bg-verdict-active",
    },
    "HIGH SIGNAL": {
      text: "text-verdict-signal",
      border: "border-verdict-signal/40",
      bg: "bg-verdict-signal/10",
      dot: "bg-verdict-signal",
    },
    WARNING: {
      text: "text-orange-400",
      border: "border-orange-400/40",
      bg: "bg-orange-400/10",
      dot: "bg-orange-400",
    },
    NEUTRAL: {
      text: "text-gray-400",
      border: "border-gray-400/40",
      bg: "bg-gray-400/10",
      dot: "bg-gray-400",
    },
  };

  const colors = colorMap[badge] || colorMap["NEUTRAL"];

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 font-mono text-[11px] tracking-[0.15em] font-semibold uppercase border rounded-sm ${colors.text} ${colors.border} ${colors.bg}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} animate-pulse`} />
      {badge}
    </span>
  );
}
