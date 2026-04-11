export default function EmptyReportState() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] p-8">
      <div className="empty-state-icon mb-6">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="text-forensic-border">
          <rect x="12" y="8" width="40" height="48" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M20 20h24M20 28h18M20 36h12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <path d="M32 2v8M2 32h8M62 32h-8M32 62v-8" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" opacity="0.3" />
        </svg>
      </div>
      <h3 className="font-display text-xl font-bold text-forensic-border mb-2">No Report Yet</h3>
      <p className="font-body text-sm text-forensic-muted text-center max-w-xs">
        Submit a specimen identifier on the left to initiate forensic examination.
      </p>
    </div>
  );
}
