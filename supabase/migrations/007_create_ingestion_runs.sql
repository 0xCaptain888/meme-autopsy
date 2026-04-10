-- 007_create_ingestion_runs.sql
-- Tracks data ingestion pipeline executions per project

create table if not exists ingestion_runs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  status text not null default 'pending'
    check (status in ('pending', 'running', 'completed', 'failed')),
  started_at timestamptz,
  ended_at timestamptz,
  details_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

comment on table ingestion_runs is 'Audit log of data collection pipeline runs';
comment on column ingestion_runs.details_json is 'Freeform metadata: error messages, step durations, record counts';
