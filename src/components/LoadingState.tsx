"use client";

import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";

interface LoadingStateProps {
  onComplete: () => void;
}

export default function LoadingState({ onComplete }: LoadingStateProps) {
  const { t, lang } = useI18n();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showComplete, setShowComplete] = useState(false);
  const totalSteps = 6;

  useEffect(() => {
    const stepDuration = 900;
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= totalSteps - 1) {
          clearInterval(interval);
          setTimeout(() => setShowComplete(true), 400);
          setTimeout(onComplete, 1200);
          return prev;
        }
        return prev + 1;
      });
    }, stepDuration);
    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const targetProgress = ((currentStep + 1) / totalSteps) * 100;
    const timer = setTimeout(() => setProgress(targetProgress), 50);
    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Sweeping scan line */}
      <div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-verdict-critical/40 to-transparent"
        style={{
          top: `${(progress / 100) * 80 + 10}%`,
          transition: "top 0.8s ease-out",
          boxShadow: "0 0 20px rgba(220,38,38,0.2), 0 0 60px rgba(220,38,38,0.05)",
        }}
      />

      {/* Corner markers */}
      <div className="absolute top-20 left-8 w-8 h-8 border-l border-t border-verdict-critical/20" />
      <div className="absolute top-20 right-8 w-8 h-8 border-r border-t border-verdict-critical/20" />
      <div className="absolute bottom-20 left-8 w-8 h-8 border-l border-b border-verdict-critical/20" />
      <div className="absolute bottom-20 right-8 w-8 h-8 border-r border-b border-verdict-critical/20" />

      <div className="relative z-10 w-full max-w-lg text-center">
        {/* Scanning icon */}
        <div className="relative w-28 h-28 mx-auto mb-10">
          <div className="absolute inset-0 border border-verdict-critical/20 rounded-full animate-ping" style={{ animationDuration: "2s" }} />
          <div className="absolute inset-2 border border-verdict-critical/30 rounded-full scan-pulse" />
          <div className="absolute inset-5 border border-verdict-critical/50 rounded-full" />
          {/* Rotating crosshair */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              animation: "spin 8s linear infinite",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-verdict-critical">
              <path d="M16 4v24M4 16h24" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
              <path d="M8 8l16 16M24 8L8 24" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
            </svg>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-verdict-critical">
              <path d="M14 6v16M6 14h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
              <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1" opacity="0.6" />
            </svg>
          </div>
        </div>

        {/* Label */}
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-critical mb-2 animate-flicker">
          {lang === "zh" ? "法医分析进行中" : "FORENSIC ANALYSIS IN PROGRESS"}
        </div>
        <div className="font-mono text-[9px] tracking-wider text-forensic-muted mb-6">
          {lang === "zh" ? "引擎版本" : "ENGINE"} v1.0 &middot; {Math.round(progress)}% {lang === "zh" ? "完成" : "COMPLETE"}
        </div>

        {/* Progress bar */}
        <div className="w-full h-[2px] bg-forensic-border mb-8 rounded overflow-hidden relative">
          <div
            className="h-full bg-verdict-critical transition-all duration-700 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-verdict-critical blur-sm" />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-3 text-left max-w-sm mx-auto">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`font-mono text-sm transition-all duration-500 flex items-center gap-3 ${
                i < currentStep
                  ? "text-forensic-muted opacity-40"
                  : i === currentStep
                  ? "text-bone"
                  : "text-forensic-border"
              }`}
            >
              {/* Status indicator */}
              <span className="flex-shrink-0 w-4 flex justify-center">
                {i < currentStep ? (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="#666" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : i === currentStep ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-verdict-critical animate-pulse" />
                ) : (
                  <span className="w-1 h-1 rounded-full bg-forensic-border" />
                )}
              </span>
              <span className="text-forensic-muted text-xs w-5 text-right flex-shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={i === currentStep ? "cursor-blink" : ""}>
                {t(`loading.${i}`)}
              </span>
            </div>
          ))}
        </div>

        {/* Complete flash */}
        {showComplete && (
          <div className="mt-8 font-mono text-xs tracking-[0.3em] uppercase text-verdict-signal animate-fade-in">
            {lang === "zh" ? "分析完成 — 生成报告" : "ANALYSIS COMPLETE — GENERATING REPORT"}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
