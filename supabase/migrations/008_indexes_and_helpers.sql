-- 008_indexes_and_helpers.sql
-- Performance indexes and utility functions

-- Lookup projects by contract address
create index if not exists idx_projects_contract_address
  on projects (contract_address);

-- Time-series queries on market snapshots
create index if not exists idx_market_snapshots_project_time
  on market_snapshots (project_id, snapshot_time desc);

-- Latest forensic report per project
create index if not exists idx_forensic_reports_project_created
  on forensic_reports (project_id, created_at desc);

-- Latest narrative features per project
create index if not exists idx_narrative_features_project_extracted
  on narrative_features (project_id, extracted_at desc);

-- Latest ingestion runs per project
create index if not exists idx_ingestion_runs_project_created
  on ingestion_runs (project_id, created_at desc);

-- Trigger function: auto-update updated_at on row modification
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply updated_at trigger to projects table
drop trigger if exists trg_projects_updated_at on projects;
create trigger trg_projects_updated_at
  before update on projects
  for each row
  execute function update_updated_at_column();
