"use client";

import { useState, useCallback } from "react";
import { I18nProvider } from "@/lib/i18n";
import type { AppView, AutopsyReport } from "@/lib/types";
import { sampleReports, sampleInputs } from "@/data/sampleCases";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SampleCases from "@/components/SampleCases";
import InputForm from "@/components/InputForm";
import LoadingState from "@/components/LoadingState";
import ReportView from "@/components/ReportView";

export default function Home() {
  const [view, setView] = useState<AppView>("landing");
  const [currentReport, setCurrentReport] = useState<AutopsyReport | null>(
    null
  );
  const [formData, setFormData] = useState<{
    projectName?: string;
    narrative?: string;
    websiteUrl?: string;
    communityText?: string;
  }>({});

  const goToLanding = useCallback(() => {
    setView("landing");
    setCurrentReport(null);
    setFormData({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const goToInput = useCallback(() => {
    setView("input");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSelectSample = useCallback((caseName: string) => {
    const input = sampleInputs[caseName];
    if (input) {
      setFormData({
        projectName: input.projectName,
        narrative: input.narrative,
        websiteUrl: input.websiteUrl,
        communityText: input.communityText,
      });
    }
    setView("input");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSubmit = useCallback(
    (data: {
      projectName: string;
      narrative: string;
      websiteUrl: string;
      communityText: string;
    }) => {
      // Check if it matches a sample case
      const report = sampleReports[data.projectName];
      if (report) {
        setCurrentReport(report);
      } else {
        // Generate a mock report for custom input
        setCurrentReport({
          projectName: data.projectName,
          verdict: "Decaying Fast",
          statusBadge: "ACTIVE CASE",
          primaryCause:
            "Insufficient narrative data for definitive classification",
          secondaryCauses: [
            "Narrative structure requires deeper analysis",
            "Community signal density is below threshold",
            "Symbolic framework not yet fully mapped",
          ],
          executiveSummary: `${data.projectName} has been submitted for forensic analysis. Based on the provided narrative and community language, the project shows signs of active cultural formation but requires further monitoring to determine long-term survivability. The current evidence suggests a project in early-stage development with potential but unproven durability.`,
          scores: {
            narrativeCoherence: 55,
            memeSpreadability: 48,
            symbolStickiness: 42,
            communityTrust: 38,
            loreDepth: 35,
            attentionResilience: 30,
          },
          scoreExplanations: {
            narrativeCoherence:
              "The narrative shows basic structure but lacks distinctive framing.",
            memeSpreadability:
              "Spreadability potential exists but requires stronger hooks.",
            symbolStickiness:
              "Symbolic elements are present but not yet iconic.",
            communityTrust:
              "Community formation is in early stages.",
            loreDepth:
              "Lore framework is minimal and needs expansion.",
            attentionResilience:
              "Long-term attention sustainability is uncertain.",
          },
          timeline: [
            {
              phase: "Initial Hook",
              diagnosis:
                "The concept has basic curiosity triggers but lacks sharp differentiation.",
            },
            {
              phase: "Social Spread",
              diagnosis:
                "Spread potential is moderate but depends on community activation.",
            },
            {
              phase: "Identity Formation",
              diagnosis:
                "Identity markers are weak and need stronger insider language.",
            },
            {
              phase: "Fatigue Trigger",
              diagnosis:
                "Without narrative escalation, fatigue may arrive quickly.",
            },
            {
              phase: "Belief Collapse",
              diagnosis:
                "Belief structure is fragile and requires mission clarity to sustain.",
            },
          ],
          interventions: [
            "Develop a clearer symbolic identity with memorable visual and verbal anchors.",
            "Build community rituals and recurring engagement patterns.",
            "Establish a narrative arc with escalation points and mission clarity.",
          ],
        });
      }
      setView("loading");
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    []
  );

  const handleLoadingComplete = useCallback(() => {
    setView("report");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <I18nProvider>
      <div className="min-h-screen bg-forensic-black">
        <Navbar onNewCase={view === "report" ? goToLanding : undefined} />

        {/* View transitions */}
        <div
          key={view}
          className="animate-fade-in"
          style={{ animation: "fadeIn 0.4s ease-out" }}
        >
          {view === "landing" && (
            <>
              <Hero onRunAutopsy={goToInput} onLoadSample={() => {
                const el = document.getElementById("sample-cases");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }} />
              <div id="sample-cases">
                <SampleCases onSelectCase={handleSelectSample} />
              </div>
            </>
          )}

          {view === "input" && (
            <InputForm
              onSubmit={handleSubmit}
              onBack={goToLanding}
              initialData={formData}
            />
          )}

          {view === "loading" && (
            <LoadingState onComplete={handleLoadingComplete} />
          )}

          {view === "report" && currentReport && (
            <ReportView report={currentReport} onNewCase={goToLanding} />
          )}
        </div>
      </div>
    </I18nProvider>
  );
}
