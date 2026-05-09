# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server at localhost:5173
npm run build     # tsc && vite build (TypeScript compile, then Vite bundle)
npm run preview   # Preview production build locally
npm run lint      # ESLint with strict TypeScript rules
npm run deploy    # Build and push to GitHub Pages via gh-pages CLI
```

Deployment also runs automatically via GitHub Actions on push to `main`.

## Architecture

Single-page React portfolio with a fixed left sidebar (Navbar), fixed top-right ThemeToggle, and vertically stacked sections that scroll through the page.

**Section layout** (`src/App.tsx` → `ThemeProvider`):
- `HeroSection` — animated DecryptText reveal + particles background
- `AboutSection` — work/education timeline using `TimelineItem`
- `AiAssistantSection` — Gemini API "company fit" prompt, calls `lib/api.ts`
- `ContactSection` — contact form

**Component layers** (`src/components/`):
- `ui/` — headless primitives (Button, Input, Textarea, LoadingSpinner, StarBorder)
- `layout/` — Navbar (scroll-spy active state) + ThemeToggle
- `features/` — DecryptText (char-by-char reveal animation), ParticlesBackground (canvas), TimelineItem
- `sections/` — full-page content sections listed above

**Key utilities:**
- `src/lib/api.ts` — `getGeminiResponse()` with exponential backoff for 429 rate limits; calls `generativelanguage.googleapis.com`
- `src/lib/utils.ts` — helpers + `RESUME_TEXT` constant (the AI prompt context)
- `src/hooks/useTheme.ts` — context-based dark/light mode, defaults dark, persists in `localStorage`
- `src/types/index.ts` — shared TypeScript interfaces

## Key Config Details

- **Path alias:** `@/*` resolves to `src/*` (configured in both `vite.config.ts` and `tsconfig.json`)
- **Dark mode:** Tailwind class-based (`darkMode: 'class'`); toggled by adding/removing `dark` on `<html>`
- **Base path:** Vite `base: '/'` — deployed to `kpatell.github.io` root
- **Custom Vite plugin:** writes `.nojekyll` into `dist/` at build time to disable GitHub Pages Jekyll processing
- **Environment variable:** `VITE_GEMINI_API_KEY` required for the AI assistant section

## TypeScript

Strict mode is on (`noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`). Fix all type errors before committing — `npm run build` will fail otherwise.
