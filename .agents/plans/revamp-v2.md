# Plan: revamp-v2

Integration branch: `revamp-v2`
Status: wave-2-integrated — ready for visual preview & PR to main

## Goal
Replace the current terminal/particles aesthetic with an Apple × Material 3 design: hero, bento grid
mixing engineering work with NYC life and hobbies, clean experience timeline, contact. Keep the
Gemini "company fit" assistant but restyle it.

## Non-goals
- No backend, CMS, or router. Single page, static, GitHub Pages.
- No blog (can be a later plan).

## Content inputs (confirmed)
- **NYC (`src/data/nyc.ts`)**:
  - Neighborhood: Chelsea, NYC
  - Running: Central Park loops, occasional West Side Highway runs
  - Guilty pleasure food: Taco Bell on 23rd & 6th
- **Currently (`src/data/now.ts`)**:
  - Figuring out next project; actively building a dev AI workflow
- **Projects (`src/data/projects.ts`)**:
  - `generations` (`https://github.com/kpatell/generations`) — connecting family (grandma has 10 siblings) so everyone can keep track of who is who at reunions
  - `reds` (`https://github.com/kpatell/reds`) — multiplayer game built to play with college friends and stay in touch
  - `costume-creator` (`https://github.com/kpatell/costume-creator`) — SVG color editor for college Raas costumes to preview how guys' and girls' outfits look on stage

## Wave 0 — Shared contracts (orchestrator, sequential)
- [x] `framer-motion` dependency
- [x] Design tokens + Inter variable font in `tailwind.config.js` / `index.html` / `src/styles/index.css`
- [x] Types: `src/types/content.ts` (Profile, Project, Experience, NycSpot, NowItem)
- [x] Populated data files in `src/data/` (`profile.ts`, `projects.ts`, `experience.ts`, `nyc.ts`, `now.ts`) using confirmed content above
- [x] UI primitives in `src/components/ui/`: `Surface`, `BentoCard`, `Pill`, `SectionHeader`, `SegmentedControl`
- [x] Barrel exports updated

## Wave 1 — Parallel tasks (2 coarse-grained tracks, `Model: "flash"`)

Consolidated from 5 micro-tasks to 2 tracks to cut subagent cold-start tokens and build runs by 60%.

| id | summary | writable scope (exclusive) | read-only refs |
|----|---------|----------------------------|----------------|
| frame-hero | Glass top nav, theme toggle restyle, footer, Hero v2 with NYC local-time pill, Contact v2 | `src/components/layout/GlassNav.tsx`, `src/components/layout/Footer.tsx`, `src/components/sections/HeroV2.tsx`, `src/components/features/NycClock.tsx`, `src/components/sections/ContactV2.tsx` | `src/data/profile.ts`, `src/components/ui/*` |
| bento-exp | Bento grid & cards (projects, NYC Chelsea/running/Taco Bell, currently/AI workflow, stack), expandable experience timeline, restyled Gemini fit assistant | `src/components/bento/**`, `src/components/sections/BentoSection.tsx`, `src/components/sections/ExperienceV2.tsx`, `src/components/features/TimelineRow.tsx`, `src/components/features/FitAssistant.tsx` | `src/data/*`, `src/lib/api.ts`, `src/components/ui/*` |

## Wave 2 — Integration (orchestrator)
- [x] Swap sections in `src/App.tsx`
- [x] Delete `ParticlesBackground`, `DecryptText`, `StarBorder`, old sections
- [x] `AG_VALIDATION_RULES.md` static & build pass (`npm run build` exits 0; responsive 375px / 768px / 1280px+ & dark/light live browser check pending manual `npm run dev` / browser approval)

## Log
- 2026-10-25: plan drafted; Phase 1 scaffolding (AGENTS.md, skills, validation rules) done.
- 2026-11-17: added user content (Chelsea/Central Park/WSH/Taco Bell, dev AI workflow, generations/reds/costume-creator) and consolidated Wave 1 from 5 subagents to 2 `flash` tracks for token efficiency.
- 2026-11-17: Wave 0 & Wave 1 (`frame-hero`, `bento-exp`) completed and merged into `revamp-v2`.
- 2026-11-17: Wave 2 integrated in `src/App.tsx`, legacy v1 components removed, `npm run build` passed.
