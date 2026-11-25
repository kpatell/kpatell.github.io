---
name: apple-google-design-kit
description: >-
  Design system for the kpatell.github.io v2 revamp, blending Apple Human Interface Guidelines
  (restraint, typography, materials) with Google Material 3 (motion, shape, tonal color). Use this
  skill whenever building or restyling any UI component, section, layout, or animation in this repo.
---

# Apple × Google Design Kit

Vibe: a mid-20s NYC engineer with taste. Calm, precise, confident — with small moments of play.
Think apple.com product pages + Material 3 expressiveness + a personal zine. Never "hacker terminal".

## Principles
1. **Content first, chrome last.** Big type, generous whitespace, few borders.
2. **One accent at a time.** Neutral canvas; color is earned (links, active state, one hero moment).
3. **Materials over shadows.** Frosted glass + hairline borders, not heavy drop shadows.
4. **Motion explains.** Springs for layout/state changes; no decorative looping animation.
5. **Personality in details.** Local NYC time, a "currently" line, hover easter eggs — not gimmicks.

## Tokens (Tailwind)

| Role | Light | Dark |
|------|-------|------|
| Canvas | `bg-zinc-50` | `bg-zinc-950` |
| Surface (cards) | `bg-white/70` + `backdrop-blur-xl` | `bg-zinc-900/60` + `backdrop-blur-xl` |
| Hairline | `border-zinc-900/10` | `border-white/10` |
| Text primary | `text-zinc-900` | `text-zinc-50` |
| Text secondary | `text-zinc-500` | `text-zinc-400` |
| Accent | `text-blue-600` / `bg-blue-600` | `text-blue-400` / `bg-blue-500` |

- **Radius**: cards `rounded-3xl`, controls `rounded-full` (pills), inputs `rounded-2xl`.
- **Spacing**: section padding `py-24 md:py-32`; bento gap `gap-4 md:gap-6`; card padding `p-6 md:p-8`.
- **Max width**: content `max-w-6xl mx-auto px-6`.

## Typography
- Sans: `Inter` (variable) with `font-feature-settings: "ss01", "cv11"`; tighten display text.
- Display: `text-5xl md:text-7xl font-semibold tracking-tight` (Apple-style tight tracking).
- Section title: `text-3xl md:text-4xl font-semibold tracking-tight`.
- Eyebrow: `text-sm font-medium text-zinc-500 dark:text-zinc-400` (sentence case, not ALL CAPS mono).
- Body: `text-base md:text-lg leading-relaxed text-zinc-600 dark:text-zinc-300`.
- Mono only for code/metadata snippets, never for headings.

## Motion (framer-motion)
- Default spring: `{ type: "spring", stiffness: 260, damping: 30 }` (Material "standard" feel).
- Entrance: fade + `y: 16 → 0`, stagger children `0.06s`, trigger `whileInView` with `once: true`.
- Hover on cards: `scale: 1.01` + border/brightness shift. No rotation, no bounce > 1.02.
- Shared layout: use `layoutId` for pill/tab indicators (Apple segmented control feel).
- **Always** gate with `useReducedMotion()` — when true, skip transforms, keep opacity only.

## Components to reuse (build once in `src/components/ui/`)
- `Surface` / `BentoCard` — glass card with hairline border, `col-span`/`row-span` props, hover state.
- `Pill` — rounded-full label/button, optional leading lucide icon.
- `SegmentedControl` — `layoutId` sliding indicator.
- `SectionHeader` — eyebrow + title + optional description.

## Interaction checklist
- Every clickable: `hover:` + `focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950`.
- Hit targets ≥ 44px (Apple HIG) — `min-h-11`.
- Contrast ≥ 4.5:1 for body text in both themes.

## Avoid
- Particle backgrounds, decrypt/glitch text, neon gradients, star borders, glow spam.
- Arbitrary Tailwind values, more than one accent hue per view, emoji as UI icons.

## References
- Apple HIG: https://developer.apple.com/design/human-interface-guidelines
- Material 3: https://m3.material.io (motion, shape, color roles)
