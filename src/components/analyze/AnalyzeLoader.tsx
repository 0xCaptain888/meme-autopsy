"use client";

import { useState, useEffect } from "react";

interface AnalyzeLoaderProps {
  /** Called when the animation sequence finishes. */
  onComplete?: () => void;
}

const steps = [
  "Fetching market data from DexScreener...",
  "Checking holder structure on BscScan...",
  "Collecting narrative sources...",
  "Extracting narrative features...",
  "Running forensic diagnosis...",
  "Compiling case report...",
];

const sourceBadges: Record<number, string> = {
  0: "DexScreener",
  1: "BscScan",
  2: "four.meme",
  4: "Forensic Engine",
};

export default function AnalyzeLoader({ onComplete }: AnalyzeLoaderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showComplete, setShowComplete] = useState(false);
  const [completedBadges, setCompletedBadges] = useState<string[]>([]);
  const totalSteps = steps.length;

  useEffect(() => {
    const stepDuration = 1200;
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= totalSteps - 1) {
          clearInterval(interval);
          setTimeout(() => setShowComplete(true), 400);
          if (onComplete) setTimeout(onComplete, 1200);
          return prev;
        }
        const next = prev + 1;
        // Add source badge when a step completes
        const badge = sourceBadges[prev];
        if (badge) {
          setCompletedBadges((b) => [...b, badge]);
        }
        return next;
      });
    }, stepDuration);
    return () => clearInterval(interval);
  }, [onComplete, totalSteps]);

  useEffect(() => {
    const targetProgress = ((currentStep + 1) / totalSteps) * 100;
    const timer = setTimeout(() => setProgress(targetProgress), 50);
    return () => clearTimeout(timer);
  }, [currentStep, totalSteps]);

  return (
    <div className="h-full flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Sweeping scan line */}
      <div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-verdict-critical/40 to-transparent"
        style={{
          top: `${(progress / 100) * 80 + 10}%`,
          transition: "top 0.8s ease-out",
          boxShadow:
            "0 0 20px rgba(220,38,38,0.2), 0 0 60px rgba(220,38,38,0.05)",
        }}
      />

      {/* Corner markers */}
      <div className="absolute top-8 left-8 w-8 h-8 border-l border-t border-verdict-critical/20" />
      <div className="absolute top-8 right-8 w-8 h-8 border-r border-t border-verdict-critical/20" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-l border-b border-verdict-critical/20" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-r border-b border-verdict-critical/20" />

      <div className="relative z-10 w-full max-w-sm text-center">
        {/* Scanning icon */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div
            className="absolute inset-0 border border-verdict-critical/20 rounded-full animate-ping"
            style={{ animationDuration: "2s" }}
          />
          <div className="absolute inset-2 border border-verdict-critical/30 rounded-full scan-pulse" />
          <div className="absolute inset-5 border border-verdict-critical/50 rounded-full" />
          {/* Rotating crosshair */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ animation: "spin 8s linear infinite" }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              className="text-verdict-critical"
            >
              <path
                d="M14 4v20M4 14h20"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <path
                d="M7 7l14 14M21 7L7 21"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.2"
              />
            </svg>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-verdict-critical"
            >
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.9"
              />
              <circle
                cx="12"
                cy="12"
                r="3.5"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.6"
              />
            </svg>
          </div>
        </div>

        {/* Label */}
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-critical mb-2 animate-pulse">
          FORENSIC ANALYSIS IN PROGRESS
        </div>
        <div className="font-mono text-[9px] tracking-wider text-forensic-muted mb-6">
          BSC CONTRACT SCAN &middot; {Math.round(progress)}% COMPLETE
        </div>

        {/* Progress bar */}
        <div className="w-full h-[2px] bg-forensic-border mb-6 rounded overflow-hidden relative">
          <div
            className="h-full bg-verdict-critical transition-all duration-700 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-verdict-critical blur-sm" />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-2.5 text-left max-w-xs mx-auto">
          {steps.map((step, i) => (
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
              <span className="flex-shrink-0 w-4 flex justify-center">
                {i < currentStep ? (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M2 5l2.5 2.5L8 3"
                      stroke="#666"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
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
              <span>{step}</span>
            </div>
          ))}
        </div>

        {/* Source badges */}
        {completedBadges.length > 0 && (
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {completedBadges.map((badge) => (
              <span
                key={badge}
                className="font-mono text-[10px] tracking-wider px-2.5 py-1 rounded-sm border border-verdict-signal/30 text-verdict-signal/80 bg-verdict-signal/5 animate-fade-in"
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* Complete flash */}
        {showComplete && (
          <div className="mt-6 font-mono text-xs tracking-[0.3em] uppercase text-verdict-signal animate-pulse">
            ANALYSIS COMPLETE — GENERATING REPORT
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
