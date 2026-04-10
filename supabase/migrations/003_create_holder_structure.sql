-- 003_create_holder_structure.sql
-- Holder distribution snapshots for concentration analysis

create table if not exists holder_structure (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  total_holders integer,
  top_10_pct numeric,
  top_20_pct numeric,
  top_50_pct numeric,
  unique_holders_24h integer,
  suspicious_concentration_flag boolean not null default false,
  snapshot_time timestamptz not null default now(),
  source text,
  created_at timestamptz not null default now()
);

comment on table holder_structure is 'Token holder distribution snapshots for risk analysis';
comment on column holder_structure.top_10_pct is 'Percentage of supply held by top 10 holders';
comment on column holder_structure.suspicious_concentration_flag is 'True when concentration exceeds risk thresholds';
