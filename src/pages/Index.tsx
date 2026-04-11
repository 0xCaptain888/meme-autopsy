import { useState, useCallback } from "react";
import { I18nProvider } from "@/lib/i18n";
import type { AppView, AutopsyReport, FormData } from "@/lib/types";
import { sampleReports, sampleInputs } from "@/data/sampleCases";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SampleAutopsyPreview from "@/components/SampleAutopsyPreview";
import ExaminationProtocol from "@/components/ExaminationProtocol";
import ArchivedCaseFiles from "@/components/ArchivedCaseFiles";
import ThesisBlock from "@/components/ThesisBlock";
import CaseIntakePanel from "@/components/CaseIntakePanel";
import EmptyReportState from "@/components/EmptyReportState";
import ExaminationLoader from "@/components/ExaminationLoader";
import AutopsyReportView from "@/components/AutopsyReportView";

// GitHub Sync Test - v2.0.1
const Index = () => {
  const [view, setView] = useState<AppView>("landing");
  const [formData, setFormData] = useState<FormData>({
    contractAddress: "",
    sceneNotes: "",
    launchPlatform: "four.meme",
  });
  const [currentReport, setCurrentReport] = useState<AutopsyReport | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [rightPanel, setRightPanel] = useState<"empty" | "loading" | "report">("empty");

  const goToLanding = useCallback(() => {
    setView("landing");
    setCurrentReport(null);
    setFormData({ contractAddress: "", sceneNotes: "", launchPlatform: "four.meme" });
    setRightPanel("empty");
    setIsAnalyzing(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const goToWorkspace = useCallback(() => {
    setView("workspace");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const runAnalysis = useCallback((data: FormData) => {
    setRightPanel("loading");
    setIsAnalyzing(true);

    // Try to match sample cases by contract address or find closest match
    const matchKey = Object.keys(sampleInputs).find(
      (k) => sampleInputs[k].contractAddress === data.contractAddress
    );

    if (matchKey) {
      setCurrentReport(sampleReports[matchKey]);
    } else {
      // Default to DogePriest as fallback demo
      setCurrentReport(sampleReports["DogePriest"]);
    }
  }, []);

  const handleSelectSample = useCallback((key: string) => {
    const input = sampleInputs[key];
    if (input) {
      setFormData(input);
      setView("workspace");
      window.scrollTo({ top: 0, behavior: "smooth" });
      setCurrentReport(sampleReports[key]);
      setRightPanel("loading");
      setIsAnalyzing(true);
    }
  }, []);

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

  const handleSubmit = useCallback(() => {
    runAnalysis(formData);
  }, [formData, runAnalysis]);

  const handleLoadingComplete = useCallback(() => {
    if (currentReport) {
      setRightPanel("report");
    }
    setIsAnalyzing(false);
  }, [currentReport]);

  return (
    <I18nProvider>
      <div className="min-h-screen bg-background scanline-overlay noise-bg">
        <Navbar onNewCase={view === "workspace" ? goToLanding : undefined} />

        <div key={view} className="animate-fade-in">
          {view === "landing" && (
            <>
              <Hero onOpenCase={goToWorkspace} onViewArchived={handleViewSample} />
              <SampleAutopsyPreview onViewFullReport={handleViewSample} />
              <ExaminationProtocol />
              <div id="archived-cases">
                <ArchivedCaseFiles onSelectCase={handleSelectSample} />
              </div>
              <ThesisBlock />
            </>
          )}

          {view === "workspace" && (
            <div className="flex h-screen pt-14">
              <div className="w-full md:w-[420px] md:min-w-[420px] border-r border-forensic-border overflow-y-auto workspace-scroll-panel">
                <CaseIntakePanel
                  formData={formData}
                  onChange={setFormData}
                  onSubmit={handleSubmit}
                  isAnalyzing={isAnalyzing}
                  onBack={goToLanding}
                />
              </div>
              <div className="hidden md:flex flex-1 overflow-y-auto workspace-scroll-panel">
                <div className="flex-1">
                  {rightPanel === "empty" && <EmptyReportState />}
                  {rightPanel === "loading" && <ExaminationLoader onComplete={handleLoadingComplete} />}
                  {rightPanel === "report" && currentReport && (
                    <AutopsyReportView report={currentReport} onReopen={() => runAnalysis(formData)} />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </I18nProvider>
  );
};

export default Index;
