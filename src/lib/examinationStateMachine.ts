// Examination state machine types matching the engineering spec

export type ExaminationState =
  | "intake_submitted"
  | "validating_identity"
  | "case_registered"
  | "securing_evidence"
  | "external_exam"
  | "internal_exam"
  | "pathology_screen"
  | "virality_reconstruction"
  | "collapse_or_survival_reconstruction"
  | "probable_cause_determination"
  | "final_opinion_draft"
  | "report_ready"
  | "failed";

export interface ExaminationStageDefinition {
  id: ExaminationState;
  label: string;
  labelZh: string;
  systemMessage: string;
  systemMessageZh: string;
  duration: number; // ms for simulation
}

export const EXAMINATION_STAGES: ExaminationStageDefinition[] = [
  {
    id: "intake_submitted",
    label: "Case Intake Submitted",
    labelZh: "案件已提交",
    systemMessage: "Submission received. Validating specimen payload...",
    systemMessageZh: "提交已收到，正在验证标本数据...",
    duration: 800,
  },
  {
    id: "validating_identity",
    label: "Validating Specimen Identity",
    labelZh: "验证标本身份",
    systemMessage: "Verifying contract address and basic specimen identity on-chain...",
    systemMessageZh: "正在链上验证合约地址和标本基本身份...",
    duration: 1200,
  },
  {
    id: "case_registered",
    label: "Case Registered",
    labelZh: "案件已登记",
    systemMessage: "Case officially created. Case ID assigned. Proceeding to evidence acquisition.",
    systemMessageZh: "案件已正式创建，已分配案件编号，进入证据获取阶段。",
    duration: 600,
  },
  {
    id: "securing_evidence",
    label: "Securing Evidence",
    labelZh: "获取证据",
    systemMessage: "Acquiring evidence from four.meme, DexScreener, and BscScan. Normalizing source records...",
    systemMessageZh: "正在从 four.meme、DexScreener 和 BscScan 获取证据，标准化来源记录...",
    duration: 2400,
  },
  {
    id: "external_exam",
    label: "External Examination",
    labelZh: "外部检查",
    systemMessage: "Analyzing surface-level presentation. Documenting visible markings and initial signal profile...",
    systemMessageZh: "分析表面呈现，记录可见标记和初始信号特征...",
    duration: 1800,
  },
  {
    id: "internal_exam",
    label: "Internal Examination",
    labelZh: "内部检查",
    systemMessage: "Parsing narrative tissue. Evaluating lore depth, doctrine presence, and belief architecture...",
    systemMessageZh: "解析叙事组织，评估传说深度、教义存在和信仰架构...",
    duration: 2000,
  },
  {
    id: "pathology_screen",
    label: "Pathology Screen",
    labelZh: "病理筛查",
    systemMessage: "Detecting degenerative factors and structural weaknesses. Screening for concentration fragility...",
    systemMessageZh: "检测退化因素和结构弱点，筛查集中度脆弱性...",
    duration: 1500,
  },
  {
    id: "virality_reconstruction",
    label: "Virality Reconstruction",
    labelZh: "传播机制重建",
    systemMessage: "Reconstructing initial spread mechanism. Analyzing symbolic compression and cultural resonance...",
    systemMessageZh: "重建初始传播机制，分析符号压缩和文化共鸣...",
    duration: 1800,
  },
  {
    id: "collapse_or_survival_reconstruction",
    label: "Collapse / Survival Reconstruction",
    labelZh: "崩溃/存活重建",
    systemMessage: "Determining whether specimen collapsed, survived, or remains unstable...",
    systemMessageZh: "判断标本是否已崩溃、存活还是仍然不稳定...",
    duration: 1600,
  },
  {
    id: "probable_cause_determination",
    label: "Probable Cause Determination",
    labelZh: "可能原因确定",
    systemMessage: "Assigning primary cause of death or survival mechanism from evidence chain...",
    systemMessageZh: "根据证据链确定主要死因或存活机制...",
    duration: 1200,
  },
  {
    id: "final_opinion_draft",
    label: "Drafting Final Opinion",
    labelZh: "起草最终意见",
    systemMessage: "Assembling final report narrative. Populating structured output fields...",
    systemMessageZh: "汇编最终报告叙述，填充结构化输出字段...",
    duration: 1400,
  },
  {
    id: "report_ready",
    label: "Report Ready",
    labelZh: "报告完成",
    systemMessage: "Final autopsy report is complete and ready for review.",
    systemMessageZh: "最终尸检报告已完成，可供审阅。",
    duration: 500,
  },
];

export type SourceAcquisitionStatus = "not_requested" | "acquiring" | "acquired" | "partial" | "unavailable" | "stale";

export interface SourceAcquisitionRecord {
  name: string;
  status: SourceAcquisitionStatus;
}

export function getInitialSourceAcquisition(): SourceAcquisitionRecord[] {
  return [
    { name: "four.meme", status: "not_requested" },
    { name: "DexScreener", status: "not_requested" },
    { name: "BscScan", status: "not_requested" },
    { name: "Narrative Record", status: "not_requested" },
    { name: "Scene Notes", status: "not_requested" },
  ];
}
