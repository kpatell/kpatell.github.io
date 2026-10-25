# AG_VALIDATION_RULES.md

Checklist every agent must pass before marking a task complete. If a check fails, fix and re-run —
do not hand the failure back to the user.

## 1. Build
- [ ] `npm run build` exits 0 (covers `tsc` strict + Vite bundle).

## 2. Code quality
- [ ] No `any`, `@ts-ignore`, or `@ts-expect-error` introduced (`git diff` grep).
- [ ] No relative imports that climb directories (`../`); use `@/`.
- [ ] No arbitrary Tailwind values unless justified in a code comment.
- [ ] No component file over ~150 lines without a note suggesting a split.
- [ ] No leftover `console.log`.

## 3. UI / a11y
- [ ] Every interactive element has `hover:` and `focus-visible:` styles.
- [ ] Works in both light and dark mode.
- [ ] Animations respect `prefers-reduced-motion`.
- [ ] Images have `alt`; icon-only buttons have `aria-label`.
- [ ] Layout checked at mobile (375px), tablet (768px), desktop (1280px+).

## 4. Git (multi-agent work)
- [ ] Changes stay inside the file scope assigned by the orchestrator.
- [ ] Work is committed on the agent's own branch with a conventional commit message
      (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`).
- [ ] No edits to `package.json` / lockfile unless the task explicitly owns dependencies.

## 5. Secrets
- [ ] `.env` and API keys are not committed.
