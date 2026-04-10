-- 005_create_narrative_features.sql
-- Six-dimension narrative scoring extracted by LLM analysis

create table if not exists narrative_features (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,

  -- Dimension 1: Symbolic Density
  symbolic_density_score numeric,
  symbolic_density_reading text,
  symbolic_density_evidence jsonb,

  -- Dimension 2: Lore Depth
  lore_depth_score numeric,
  lore_depth_reading text,
  lore_depth_evidence jsonb,

  -- Dimension 3: Ritual Repeatability
  ritual_repeatability_score numeric,
  ritual_repeatability_reading text,
  ritual_repeatability_evidence jsonb,

  -- Dimension 4: Community Cohesion
  community_cohesion_score numeric,
  community_cohesion_reading text,
  community_cohesion_evidence jsonb,

  -- Dimension 5: Belief Elasticity
  belief_elasticity_score numeric,
  belief_elasticity_reading text,
  belief_elasticity_evidence jsonb,

  -- Dimension 6: Narrative Survivability
  narrative_survivability_score numeric,
  narrative_survivability_reading text,
  narrative_survivability_evidence jsonb,

  uncertainty_notes jsonb not null default '[]'::jsonb,
  extracted_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

comment on table narrative_features is 'LLM-extracted narrative dimension scores for meme forensic analysis';
comment on column narrative_features.uncertainty_notes is 'Array of caveats or low-confidence flags from the extraction';
