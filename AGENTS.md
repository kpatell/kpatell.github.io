# AGENTS.md

Project rules for any AI agent (Antigravity, Claude Code, Codex, etc.) working in this repo.
Antigravity loads this file automatically. `CLAUDE.md` imports it so Claude Code stays in sync.

## Project

Personal site for Krishan Patel — software engineer living in NYC. Deployed to `kpatell.github.io`
(GitHub Pages, root path). Goal of the v2 revamp: Apple/Google-grade polish with real personality
(NYC life, hobbies, taste) — not a generic dev portfolio.

## Commands

```bash
npm run dev       # Vite dev server at localhost:5173
npm run build     # tsc && vite build — the primary validation gate
npm run preview   # Preview production build
npm run deploy    # Manual gh-pages deploy (CI deploys automatically on push to main)
```

> `npm run lint` currently has no ESLint config in the repo and will fail. Do not treat it as a gate
> until an `eslint.config.js` is added.

## Stack

- React 18 (function components only), TypeScript strict, Vite 5
- TailwindCSS 3, class-based dark mode (`dark` on `<html>`)
- `framer-motion` for spring/layout animation, `lucide-react` for icons
- Path alias `@/*` → `src/*`. Always use absolute imports.
- `VITE_GEMINI_API_KEY` powers the AI assistant section (`src/lib/api.ts`). Never commit `.env`.

## Architecture

- `src/App.tsx` — composes layout + sections inside `ThemeProvider`
- `src/components/ui/` — primitives (no data, no sections)
- `src/components/layout/` — Navbar, ThemeToggle, global chrome
- `src/components/features/` — self-contained interactive widgets
- `src/components/sections/` — page sections; compose from ui/features only
- `src/data/` — (v2) typed content files: projects, experience, NYC, hobbies. Content lives here, not in JSX.
- `src/lib/` — API + utilities; `src/hooks/` — hooks; `src/types/` — shared types

## Rules

- No `any`, no `@ts-ignore`. Explain type errors instead of suppressing them.
- Tailwind: standard scale only (no arbitrary values like `w-[350px]` unless unavoidable).
  Every interactive element needs `hover:` and `focus-visible:` states.
- Respect `prefers-reduced-motion` for every framer-motion animation (use `useReducedMotion`).
- Components > ~150 lines should be split.
- Follow the design system in `.agents/skills/apple-google-design-kit/SKILL.md` for any UI work.
- Multi-part features: use the `feature-orchestrator` skill (`.agents/skills/feature-orchestrator/`).

## Done means

Read and satisfy `AG_VALIDATION_RULES.md` before declaring any task complete.
