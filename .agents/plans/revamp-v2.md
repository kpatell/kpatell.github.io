# Plan: revamp-v2

Integration branch: `revamp-v2`
Status: draft — needs user content input (see "Open inputs") before Wave 1

## Goal
Replace the current terminal/particles aesthetic with an Apple × Material 3 design: hero, bento grid
mixing engineering work with NYC life and hobbies, clean experience timeline, contact. Keep the
Gemini "company fit" assistant but restyle it.

## Non-goals
- No backend, CMS, or router. Single page, static, GitHub Pages.
- No blog (can be a later plan).

## Open inputs (user)
- NYC cards: neighborhood, favorite spots (coffee / food / running route), photo(s).
- Hobbies to feature and any "currently" items (reading / listening / building).
- Which projects to feature (2–4) with one-line impact each.

## Wave 0 — Shared contracts (orchestrator, sequential)
- [x] `framer-motion` dependency
- [ ] Design tokens + Inter variable font in `tailwind.config.js` / `index.html` / `src/styles/index.css`
- [ ] Types: `src/types/content.ts` (Profile, Project, Experience, NycSpot, Hobby, NowItem)
- [ ] Stub data files in `src/data/` with placeholder content matching the types
- [ ] UI primitives in `src/components/ui/`: `Surface`, `BentoCard`, `Pill`, `SectionHeader`, `SegmentedControl`
- [ ] Barrel exports updated

## Wave 1 — Parallel tasks

| id | summary | writable scope (exclusive) | read-only refs |
|----|---------|----------------------------|----------------|
| hero | Hero v2: name, tagline, NYC local-time "status" pill, action pills | `src/components/sections/HeroV2.tsx`, `src/components/features/NycClock.tsx` | `src/data/profile.ts`, ui/* |
| bento | Bento grid + cards (projects, NYC, now-playing/reading, stack, photo) | `src/components/bento/**`, `src/components/sections/BentoSection.tsx` | `src/data/*`, ui/* |
| experience | Minimal expandable timeline | `src/components/sections/ExperienceV2.tsx`, `src/components/features/TimelineRow.tsx` | `src/data/experience.ts`, ui/* |
| chrome | Glass top nav (replaces left sidebar), theme toggle restyle, footer, contact | `src/components/layout/GlassNav.tsx`, `src/components/layout/Footer.tsx`, `src/components/sections/ContactV2.tsx` | ui/* |
| ai | Restyle Gemini assistant as a bento card / sheet | `src/components/features/FitAssistant.tsx` | `src/lib/api.ts`, ui/* |

## Wave 2 — Integration (orchestrator)
- [ ] Swap sections in `src/App.tsx`
- [ ] Delete `ParticlesBackground`, `DecryptText`, `StarBorder`, old sections
- [ ] Replace placeholder data with real content
- [ ] Full `AG_VALIDATION_RULES.md` pass, responsive + dark/light check

## Log
- 2026-10-25: plan drafted; Phase 1 scaffolding (AGENTS.md, skills, validation rules) done.
