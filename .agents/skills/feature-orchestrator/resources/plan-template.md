# Plan: <feature name>

Integration branch: `<feature>`
Status: draft | approved | in-progress | done

## Goal
<1-3 sentences>

## Non-goals
- ...

## Wave 0 — Shared contracts (orchestrator-owned, sequential)
- [ ] Dependencies: ...
- [ ] Types in `src/types/...`: ...
- [ ] Design tokens in `tailwind.config.js`: ...
- [ ] Data shapes / stub files in `src/data/...`: ...

## Wave 1 — Parallel tasks

| id | summary | writable scope (exclusive) | read-only refs | depends on |
|----|---------|----------------------------|----------------|------------|
| t1 | ... | `src/components/sections/HeroV2.tsx` | `src/data/profile.ts` | wave 0 |
| t2 | ... | `src/components/bento/**` | `src/types/bento.ts` | wave 0 |

### t1 — acceptance criteria
- ...

## Wave 2 — Integration (orchestrator)
- [ ] Wire new sections into `src/App.tsx`
- [ ] Remove dead components
- [ ] Full validation pass

## Log
- <date>: <what happened / plan changes>
