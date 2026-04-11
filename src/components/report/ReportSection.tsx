import { SubLabel } from "@/components/shared";

interface ReportSectionProps {
  label: string;
  children: React.ReactNode;
}

export default function ReportSection({ label, children }: ReportSectionProps) {
  return (
    <div className="bg-forensic-panel border border-forensic-border rounded-sm p-6">
      <SubLabel className="mb-4">{label}</SubLabel>
      {children}
    </div>
  );
}
