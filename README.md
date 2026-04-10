# Meme Autopsy

**AI forensic engine for meme projects**

Meme Autopsy diagnoses why meme narratives go viral, decay, or die.

**Live Demo:** [https://73qyf3ly.mule.page](https://73qyf3ly.mule.page/)

![Homepage](public/screenshots/hero.png)

![Sample Cases](public/screenshots/cases.png)

![Autopsy Report](public/screenshots/report.png)

## Why it matters

Most meme tools focus on creation, hype, or surface-level sentiment. Meme Autopsy takes a different angle: it analyzes symbolic density, lore depth, community cohesion, and belief resilience to explain why a meme project survives, fractures, or collapses.

## Why it's innovative

Meme Autopsy reframes meme analysis as forensic diagnosis rather than generation. Instead of helping users make memes, it helps them understand structural strengths, narrative weaknesses, and collapse signals through a case-report interface that feels immediate, visual, and productized.

## How the analysis works

1. **Input** — Submit a meme project's name, narrative description, community language, and source context
2. **Analyze** — The AI forensic engine scans symbolic patterns, narrative integrity, community signals, and belief collapse risk via a real LLM backend
3. **Report** — Get a structured forensic report with verdict, confidence score, 6-dimension scoring, collapse timeline, reasoning signals, and intervention recommendations

## Features

- Real AI backend (POST /api/autopsy) with OpenAI-compatible LLM integration, schema validation, and retry logic
- Split-panel analysis workspace (left input panel + right report panel)
- Forensic case-file UI with dark cinematic aesthetic
- Verdict classification (Dead on Arrival / Viral but Fragile / Short-Term Attention Trap / Stable Cult Potential / High Conviction Meme / Chaos Without Cohesion)
- Six-dimension forensic scoring (0-100) with readings and animated progress bars
- Confidence meter for each analysis
- Collapse timeline with risk-tagged phases
- Intervention recommendations
- Reasoning signals showing how the AI reached its verdict
- Input snapshot for audit trail
- Compare mode (side-by-side original vs. revised analysis)
- Re-run analysis with feedback loops
- CASE ID and analysis timestamps
- Demo-ready sample cases (DogePriest, BananaFax, SaintMeme)
- Chinese / English language switching (full i18n)
- Responsive design

## Forensic dimensions

| Dimension | What it measures |
|-----------|-----------------|
| Symbolic Density | How layered and resonant are the core symbols |
| Lore Depth | How rich and self-sustaining is the mythology |
| Ritual Repeatability | Can community behaviors become recurring rituals |
| Community Cohesion | How strong is the in-group identity and belonging |
| Belief Elasticity | Can the narrative absorb contradiction and evolve |
| Narrative Survivability | Will the story endure beyond the initial wave |

## Tech stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Context for i18n
- OpenAI-compatible LLM backend with structured JSON output
- Schema validation and graceful retry

## Getting started

```bash
npm install
cp .env.example .env.local
# Add your OpenAI API key to .env.local
npm run dev
```

## Demo flow

1. Open the landing page
2. View the sample autopsy preview (DogePriest)
3. Explore the forensic framework (6 dimensions)
4. Load a sample case or enter a custom meme project in the workspace
5. Run the autopsy and watch the forensic loading sequence
6. Review the verdict, confidence, root cause, and forensic breakdown
7. Explore the collapse timeline, reasoning signals, and interventions
8. Re-run analysis or compare results
9. Switch between English and Chinese

## Project thesis

Most meme tools help create narratives. Meme Autopsy helps explain why narratives fail.

## License

MIT
