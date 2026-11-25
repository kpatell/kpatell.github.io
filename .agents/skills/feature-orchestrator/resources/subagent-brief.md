You are a subagent working on task `<task-id>` of the `<feature>` plan in this repo.

## Setup
1. `git switch -c <feature>/<task-id> <feature>` (fork from the integration branch).
2. Read `AGENTS.md` and `.agents/skills/apple-google-design-kit/SKILL.md`. Do NOT read unrelated
   sections or explore the whole repo — use only the contracts below.

## Contracts (pre-digested)
- Types & data: `<exact files/exports>`
- UI primitives available from `@/components/ui`: `<exact component names + key props>`

## Task
<what to build, in concrete terms>

## Scope
- You may create/edit ONLY: <globs>
- You may read: <files>
- Do NOT edit: `package.json`, lockfile, `tailwind.config.js`, `src/App.tsx`, any `index.ts`
  barrel, `src/types/index.ts`. If you need a change there, list it in your final message.

## Acceptance criteria
- <criteria>
- `npm run build` passes on your branch.
- All checks in `AG_VALIDATION_RULES.md` that apply to your scope pass.

## Finish
1. Commit on `<feature>/<task-id>` with a conventional message. Do not merge, do not push.
2. Reply to the orchestrator with: branch name, final commit SHA, files changed, any hot-file
   edits you need (exact code), and open questions.
