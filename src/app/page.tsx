"use client";

import { useState, useCallback } from "react";
import { I18nProvider } from "@/lib/i18n";
import type { AppView, AutopsyReport, FormData } from "@/lib/types";
import { sampleReports, sampleInputs } from "@/data/sampleCases";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SampleAutopsyPreview from "@/components/SampleAutopsyPreview";
import FrameworkGrid from "@/components/FrameworkGrid";
import InputDemoCTA from "@/components/InputDemoCTA";
import SampleCases from "@/components/SampleCases";
import ThesisBlock from "@/components/ThesisBlock";
import InputPanel from "@/components/InputPanel";
import EmptyReportState from "@/components/EmptyReportState";
import AnalysisLoader from "@/components/AnalysisLoader";
import ReportView from "@/components/ReportView";
import CompareResultsPanel from "@/components/CompareResultsPanel";

export default function Home() {
  const [view, setView] = useState<AppView>("landing");
  const [formData, setFormData] = useState<FormData>({
    projectName: "",
    narrative: "",
    communityText: "",
    notes: "",
  });
  const [currentReport, setCurrentReport] = useState<AutopsyReport | null>(
    null
  );
  const [previousReport, setPreviousReport] = useState<AutopsyReport | null>(
    null
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [rightPanel, setRightPanel] = useState<"empty" | "loading" | "report">(
    "empty"
  );

  const goToLanding = useCallback(() => {
    setView("landing");
    setCurrentReport(null);
    setPreviousReport(null);
    setFormData({ projectName: "", narrative: "", communityText: "", notes: "" });
    setRightPanel("empty");
    setShowCompare(false);
    setIsAnalyzing(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const goToWorkspace = useCallback(() => {
    setView("workspace");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const runAnalysis = useCallback(
    async (data: FormData) => {
      setRightPanel("loading");
      setIsAnalyzing(true);
      setShowCompare(false);

      try {
        const res = await fetch("/api/autopsy", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const report: AutopsyReport = await res.json();
        setCurrentReport(report);
        setRightPanel("report");
        setIsAnalyzing(false);
      } catch {
        // Fallback: try to load from sample reports
        const fallback = sampleReports[data.projectName];
        if (fallback) {
          setCurrentReport(fallback);
          setRightPanel("report");
        } else {
          setRightPanel("empty");
        }
        setIsAnalyzing(false);
      }
    },
    []
  );

  const handleSelectSample = useCallback(
    (projectName: string) => {
      const input = sampleInputs[projectName];
      if (input) {
        setFormData(input);
        setView("workspace");
        window.scrollTo({ top: 0, behavior: "smooth" });
        runAnalysis(input);
      }
    },
    [runAnalysis]
  );

  const handleViewSample = useCallback(() => {
    const report = sampleReports["DogePriest"];
    if (report) {
      setCurrentReport(report);
      const input = sampleInputs["DogePriest"];
      if (input) setFormData(input);
      setView("workspace");
      setRightPanel("report");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const handleSubmit = useCallback(
    (data: FormData) => {
      setFormData(data);
      if (currentReport) {
        setPreviousReport(currentReport);
      }
      runAnalysis(data);
    },
    [runAnalysis, currentReport]
  );

  const handleRerun = useCallback(() => {
    if (currentReport) {
      setPreviousReport(currentReport);
    }
    runAnalysis(formData);
  }, [formData, currentReport, runAnalysis]);

  const handleCompare = useCallback(() => {
    setShowCompare(true);
  }, []);

  const handleLoadingComplete = useCallback(() => {
    if (currentReport) {
      setRightPanel("report");
    }
    setIsAnalyzing(false);
  }, [currentReport]);

  return (
    <I18nProvider>
      <div className="min-h-screen bg-forensic-black">
        <Navbar
          onNewCase={view === "workspace" ? goToLanding : undefined}
        />

        <div
          key={view}
          className="animate-fade-in"
          style={{ animation: "fadeIn 0.4s ease-out" }}
        >
          {view === "landing" && (
            <>
              <Hero onViewSample={handleViewSample} />
              <SampleAutopsyPreview onViewFullReport={handleViewSample} />
              <FrameworkGrid />
              <InputDemoCTA />
              <div id="sample-cases">
                <SampleCases onSelectCase={handleSelectSample} />
              </div>
              <ThesisBlock />
            </>
          )}

          {view === "workspace" && (
            <div className="flex h-screen pt-14">
              <div className="w-full md:w-[420px] md:min-w-[420px] border-r border-forensic-border overflow-y-auto workspace-scroll-panel">
                <InputPanel
                  formData={formData}
                  onChange={setFormData}
                  onSubmit={() => handleSubmit(formData)}
                  isAnalyzing={isAnalyzing}
                />
              </div>
              <div className="hidden md:flex flex-1 overflow-y-auto workspace-scroll-panel">
                <div className="flex-1">
                  {rightPanel === "empty" && <EmptyReportState />}
                  {rightPanel === "loading" && (
                    <AnalysisLoader onComplete={handleLoadingComplete} />
                  )}
                  {rightPanel === "report" && currentReport && (
                    <>
                      <ReportView
                        report={currentReport}
                        onRerun={handleRerun}
                        onCompare={previousReport ? handleCompare : undefined}
                      />
                      {showCompare && previousReport && (
                        <CompareResultsPanel
                          original={previousReport}
                          revised={currentReport}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </I18nProvider>
  );
}
