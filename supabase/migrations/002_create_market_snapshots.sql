-- 002_create_market_snapshots.sql
-- Point-in-time market data snapshots for each project

create table if not exists market_snapshots (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  price_usd numeric,
  price_change_24h numeric,
  volume_24h numeric,
  liquidity numeric,
  market_cap numeric,
  fdv numeric,
  pair_address text,
  dex_id text,
  snapshot_time timestamptz not null default now(),
  source text not null
    check (source in ('DexScreener', 'CoinGecko')),
  created_at timestamptz not null default now()
);

comment on table market_snapshots is 'Time-series market data captured from external APIs';
comment on column market_snapshots.fdv is 'Fully diluted valuation at snapshot time';
comment on column market_snapshots.source is 'Data provider that supplied this snapshot';
