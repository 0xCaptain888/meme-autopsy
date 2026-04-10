-- 006_create_forensic_reports.sql
-- Final forensic verdict reports generated per project

create table if not exists forensic_reports (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  case_id text unique not null,

  verdict text not null
    check (verdict in (
      'Alive and Evolving',
      'Stagnant but Stable',
      'Declining — Loss of Narrative Energy',
      'Critical — Structural Collapse Likely',
      'Dead — No Recovery Path',
      'Undetermined — Insufficient Data'
    )),
  confidence numeric not null
    check (confidence >= 0 and confidence <= 1),

  primary_cause text,
  summary text,

  why_this_verdict jsonb,
  scores jsonb,
  structure_risks jsonb,
  collapse_timeline jsonb,
  intervention_path jsonb,
  warning_flags jsonb,
  data_provenance jsonb,
  missing_data_flags jsonb,

  comparable_pattern text,
  input_snapshot jsonb,

  created_at timestamptz not null default now()
);

comment on table forensic_reports is 'Complete forensic autopsy reports with verdict, evidence, and risk assessment';
comment on column forensic_reports.case_id is 'Human-readable unique case identifier (e.g. MA-2026-0001)';
comment on column forensic_reports.confidence is 'Model confidence in the verdict, 0.0 to 1.0';
