import { useI18n } from "@/lib/i18n";

export default function WorkflowSection() {
  const { lang } = useI18n();

  const steps = [
    {
      num: "01",
      title: lang === "zh" ? "案件受理" : "Case Intake",
      desc: lang === "zh"
        ? "提交合约地址和现场笔记。系统验证标本身份并分配案件编号。"
        : "Submit contract address and scene notes. System validates specimen identity and assigns a case ID.",
    },
    {
      num: "02",
      title: lang === "zh" ? "证据获取" : "Evidence Acquisition",
      desc: lang === "zh"
        ? "自动从 four.meme、DexScreener、BscScan 获取链上证据。记录获取状态和可靠性说明。"
        : "Automatically acquire on-chain evidence from four.meme, DexScreener, and BscScan. Record acquisition status and reliability notes.",
    },
    {
      num: "03",
      title: lang === "zh" ? "法医检查" : "Forensic Examination",
      desc: lang === "zh"
        ? "外部检查记录表面标记。内部检查解析叙事组织和信仰架构。病理筛查识别退化因素。"
        : "External exam documents surface markings. Internal exam parses narrative tissue and belief architecture. Pathology screen identifies degeneration factors.",
    },
    {
      num: "04",
      title: lang === "zh" ? "因果重建" : "Causal Reconstruction",
      desc: lang === "zh"
        ? "重建传播机制、死亡或存活机制。通过假设→证据→结论链确定死因或存活原因。"
        : "Reconstruct mechanism of virality, death, or survival. Determine cause through hypothesis → evidence → conclusion chains.",
    },
    {
      num: "05",
      title: lang === "zh" ? "意见出具" : "Opinion Issuance",
      desc: lang === "zh"
        ? "出具包含判定、置信度和不确定性说明的正式尸检意见。所有结论可追溯至证据来源。"
        : "Issue formal autopsy opinion with determination, confidence level, and uncertainty notes. All conclusions traceable to evidence sources.",
    },
  ];

  return (
    <section className="relative py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdict-critical block mb-3">
            // EXAMINATION WORKFLOW
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-bone mb-3">
            {lang === "zh" ? "法医检查流程" : "Forensic Examination Workflow"}
          </h2>
          <p className="font-body text-sm text-forensic-text max-w-lg">
            {lang === "zh"
              ? "从受理到意见出具的每个阶段都可见、可审查、可追溯。"
              : "Every stage from intake to opinion issuance is visible, auditable, and traceable."}
          </p>
        </div>

        <div className="relative">
          {/* Vertical connector */}
          <div className="absolute left-[15px] top-0 bottom-0 w-px bg-gradient-to-b from-verdict-critical/40 via-forensic-border to-transparent hidden sm:block" />

          <div className="space-y-6">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="reveal flex items-start gap-5"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {/* Node */}
                <div className="flex-shrink-0 w-[30px] h-[30px] bg-forensic-panel border border-forensic-border rounded-sm flex items-center justify-center z-10">
                  <span className="font-mono text-[10px] font-bold text-verdict-active">{step.num}</span>
                </div>

                {/* Content */}
                <div className="flex-1 bg-forensic-panel border border-forensic-border rounded-sm p-5 hover:border-forensic-muted/30 transition-colors">
                  <h3 className="font-mono text-sm font-medium text-bone mb-2 tracking-tight">{step.title}</h3>
                  <p className="font-body text-xs text-forensic-text leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
