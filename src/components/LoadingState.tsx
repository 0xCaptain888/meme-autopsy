"use client";

import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";

interface LoadingStateProps {
  onComplete: () => void;
}

export default function LoadingState({ onComplete }: LoadingStateProps) {
  const { t } = useI18n();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const totalSteps = 6;

  useEffect(() => {
    const stepDuration = 800;
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= totalSteps - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 600);
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
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-lg text-center">
        {/* Scanning icon */}
        <div className="relative w-24 h-24 mx-auto mb-10">
          <div className="absolute inset-0 border border-verdict-critical/30 rounded-full animate-ping" />
          <div className="absolute inset-2 border border-verdict-critical/50 rounded-full scan-pulse" />
          <div className="absolute inset-4 border border-verdict-critical/70 rounded-full" />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              className="text-verdict-critical"
            >
              <path
                d="M14 4v20M4 14h20M8 8l12 12M20 8L8 20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.8"
              />
            </svg>
          </div>
        </div>

        {/* Label */}
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-critical mb-6">
          FORENSIC ANALYSIS IN PROGRESS
        </div>

        {/* Progress bar */}
        <div className="w-full h-px bg-forensic-border mb-8 rounded overflow-hidden">
          <div
            className="h-full bg-verdict-critical transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`font-mono text-sm transition-all duration-500 ${
                i < currentStep
                  ? "text-forensic-muted line-through opacity-50"
                  : i === currentStep
                  ? "text-bone cursor-blink"
                  : "text-forensic-border"
              }`}
            >
              <span className="inline-block w-6 text-right mr-3 text-forensic-muted text-xs">
                {String(i + 1).padStart(2, "0")}
              </span>
              {t(`loading.${i}`)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
