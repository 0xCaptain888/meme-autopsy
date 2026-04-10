-- 001_create_projects.sql
-- Core projects table representing meme token projects under analysis

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  name text,
  symbol text,
  contract_address text unique not null,
  launch_platform text not null default 'unknown'
    check (launch_platform in ('four.meme', 'manual', 'unknown')),
  status text not null default 'active'
    check (status in ('active', 'archived')),
  website_url text,
  twitter_url text,
  telegram_url text,
  source_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table projects is 'Meme token projects tracked for forensic analysis';
comment on column projects.contract_address is 'On-chain contract address (unique identifier)';
comment on column projects.launch_platform is 'Platform where the token was launched';
