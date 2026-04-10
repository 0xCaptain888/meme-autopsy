"use client";

import { useState } from "react";
import type { ForensicReport } from "@/types/domain";
import AnalyzeLoader from "@/components/analyze/AnalyzeLoader";
import CaseReport from "@/components/analyze/CaseReport";

type LaunchPlatform = "four.meme" | "manual" | "unknown";

export default function AnalyzePage() {
  /* ── Form state ── */
  const [contractAddress, setContractAddress] = useState("");
  const [coreNarrative, setCoreNarrative] = useState("");
  const [communityBehavior, setCommunityBehavior] = useState("");
  const [strategicContext, setStrategicContext] = useState("");
  const [launchPlatform, setLaunchPlatform] = useState<LaunchPlatform>("four.meme");

  /* ── Result state ── */
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<ForensicReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [project, setProject] = useState<any | null>(null);

  const canSubmit = contractAddress.trim().length > 0 && !loading;

  const inputClass =
    "w-full bg-forensic-dark border border-forensic-border rounded-sm px-4 py-3 font-mono text-sm text-bone placeholder:text-forensic-muted focus:border-verdict-active focus:outline-none transition-colors";

  /* ── Handlers ── */

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setReport(null);
    setError(null);
    setProject(null);

    try {
      const res = await fetch("/api/autopsy/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contractAddress: contractAddress.trim(),
          launchPlatform,
          coreNarrative: coreNarrative.trim() || undefined,
          communityBehavior: communityBehavior.trim() || undefined,
          strategicContext: strategicContext.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? `Request failed (${res.status})`);
      }

      const data = await res.json();
      setReport(data.report ?? data);
      setProject(data.project ?? null);
    } catch (err: any) {
      setError(err.message ?? "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  function handleRetry() {
    setError(null);
    handleSubmit(new Event("submit") as any);
  }

  /* ── Render ── */

  return (
    <div className="min-h-screen bg-forensic-black text-bone scanline-overlay noise-bg">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* ─── Left panel: Input form ─── */}
        <div className="w-full lg:w-[420px] xl:w-[460px] flex-shrink-0 border-b lg:border-b-0 lg:border-r border-forensic-border input-panel-container overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="mb-8">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-active">
                // CONTRACT ANALYSIS
              </span>
              <h2 className="font-display text-2xl font-bold mt-2 mb-2">
                Run Autopsy
              </h2>
              <p className="font-body text-sm text-forensic-text">
                Paste a BSC contract address to begin forensic analysis of any
                meme project.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Contract Address */}
              <div>
                <label className="block font-mono text-xs tracking-wider uppercase text-forensic-text mb-2">
                  Contract Address{" "}
                  <span className="text-verdict-critical">*</span>
                </label>
                <input
                  type="text"
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                  className={`${inputClass} font-mono`}
                  placeholder="0x..."
                  disabled={loading}
                />
              </div>

              {/* Launch Platform */}
              <div>
                <label className="block font-mono text-xs tracking-wider uppercase text-forensic-text mb-2">
                  Launch Platform
                </label>
                <div className="flex gap-2">
                  {(["four.meme", "manual", "unknown"] as LaunchPlatform[]).map(
                    (p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setLaunchPlatform(p)}
                        disabled={loading}
                        className={`px-3 py-2 font-mono text-xs tracking-wider rounded-sm border transition-colors ${
                          launchPlatform === p
                            ? "border-verdict-active text-verdict-active bg-verdict-active/10"
                            : "border-forensic-border text-forensic-muted hover:border-forensic-text hover:text-forensic-text"
                        } disabled:opacity-40 disabled:cursor-not-allowed`}
                      >
                        {p}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Core Narrative */}
              <div>
                <label className="block font-mono text-xs tracking-wider uppercase text-forensic-text mb-2">
                  Core Narrative{" "}
                  <span className="text-forensic-muted">(optional)</span>
                </label>
                <textarea
                  value={coreNarrative}
                  onChange={(e) => setCoreNarrative(e.target.value)}
                  className={`${inputClass} min-h-[100px] resize-y`}
                  placeholder="Describe the project's story, theme, cultural angle, or meme identity..."
                  disabled={loading}
                />
              </div>

              {/* Community Behavior */}
              <div>
                <label className="block font-mono text-xs tracking-wider uppercase text-forensic-text mb-2">
                  Community Behavior{" "}
                  <span className="text-forensic-muted">(optional)</span>
                </label>
                <textarea
                  value={communityBehavior}
                  onChange={(e) => setCommunityBehavior(e.target.value)}
                  className={`${inputClass} min-h-[80px] resize-y`}
                  placeholder="Paste tweets, slogans, Telegram messages, or community language samples..."
                  disabled={loading}
                />
              </div>

              {/* Strategic Context */}
              <div>
                <label className="block font-mono text-xs tracking-wider uppercase text-forensic-text mb-2">
                  Strategic Context{" "}
                  <span className="text-forensic-muted">(optional)</span>
                </label>
                <textarea
                  value={strategicContext}
                  onChange={(e) => setStrategicContext(e.target.value)}
                  className={`${inputClass} min-h-[80px] resize-y`}
                  placeholder="Any additional context: market conditions, comparable projects, known risks..."
                  disabled={loading}
                />
              </div>

              {/* Note */}
              <p className="font-mono text-[11px] text-forensic-muted tracking-wide">
                On-chain data is fetched automatically from DexScreener and
                BscScan.
              </p>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="w-full px-10 py-3.5 bg-verdict-active text-white font-mono text-sm font-medium tracking-wider uppercase rounded-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amber-600 transition-all duration-300 hover:shadow-lg hover:shadow-verdict-active/20 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Scanning...
                    </>
                  ) : (
                    "Run Autopsy"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ─── Right panel: Report / Loading / Empty / Error ─── */}
        <div className="flex-1 report-panel-container relative">
          {loading && <AnalyzeLoader />}

          {!loading && error && (
            <div className="h-full flex items-center justify-center px-6">
              <div className="max-w-md text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full border border-verdict-critical/40 flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="text-verdict-critical"
                  >
                    <path
                      d="M10 6v4m0 4h.01"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="10"
                      cy="10"
                      r="8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-critical">
                  // ANALYSIS FAILED
                </p>
                <p className="font-body text-sm text-forensic-text">{error}</p>
                <button
                  onClick={handleRetry}
                  className="px-6 py-2.5 border border-verdict-active text-verdict-active font-mono text-xs tracking-wider uppercase rounded-sm hover:bg-verdict-active/10 transition-colors"
                >
                  Retry Analysis
                </button>
              </div>
            </div>
          )}

          {!loading && !error && report && <CaseReport report={report} />}

          {!loading && !error && !report && (
            <div className="h-full flex items-center justify-center px-6">
              <div className="max-w-sm text-center space-y-4">
                <div className="w-16 h-16 mx-auto empty-state-icon">
                  <svg
                    viewBox="0 0 64 64"
                    fill="none"
                    className="text-forensic-border w-full h-full"
                  >
                    <rect
                      x="12"
                      y="8"
                      width="40"
                      height="48"
                      rx="4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M22 22h20M22 30h20M22 38h12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="32"
                      cy="18"
                      r="6"
                      stroke="currentColor"
                      strokeWidth="1"
                      opacity="0.3"
                    />
                  </svg>
                </div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-forensic-muted">
                  // AWAITING INPUT
                </p>
                <p className="font-body text-sm text-forensic-text">
                  Enter a BSC contract address on the left to begin forensic
                  analysis.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
