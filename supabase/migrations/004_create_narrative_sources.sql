-- 004_create_narrative_sources.sql
-- Raw text sources collected for narrative analysis

create table if not exists narrative_sources (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  source_type text not null
    check (source_type in ('platform_description', 'website', 'twitter', 'telegram', 'manual_input')),
  raw_text text not null,
  extracted_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

comment on table narrative_sources is 'Raw text collected from various sources for NLP-based narrative scoring';
comment on column narrative_sources.source_type is 'Channel from which the text was harvested';
