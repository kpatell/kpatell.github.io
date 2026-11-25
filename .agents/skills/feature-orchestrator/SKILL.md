---
name: feature-orchestrator
description: >-
  Plans a multi-part feature, splits it into conflict-free tasks, and dispatches parallel subagents
  that each work on their own git branch, then merges and validates their work. Use this skill when
  the user asks to build a large feature, a redesign/revamp, or anything touching more than ~3 files
  that could be parallelized across agents.
---

# Feature Orchestrator

You are the **orchestrator**. You plan, dispatch, review, and merge. You do not write feature code
yourself except for small integration glue after merging.

## Phase 0 — Preflight

1. `git branch --show-current`. If on `main`, create the integration branch: `git switch -c <feature>`
   (e.g. `revamp-v2`). All subagent branches fork from and merge back into this branch.
2. `git status` must be clean. Commit or stash first.
3. `npm run build` must pass on the integration branch before dispatching anything.

## Phase 1 — Plan (get user approval before Phase 2)

Write `.agents/plans/<feature>.md` using [plan-template.md](./resources/plan-template.md). It must contain:

- **Goal** and non-goals.
- **Shared contracts first**: types (`src/types/`), design tokens (`tailwind.config.js`), data
  shapes (`src/data/`), new dependencies. These are done in a **Wave 0** by the orchestrator or one
  agent *before* parallel work starts, so parallel agents never need to edit shared files.
- **Task list** — each task has: id, owner agent, **exclusive file scope** (globs), files it may
  *read* but not edit, dependencies, acceptance criteria.
- **Waves** — tasks in the same wave must have non-overlapping file scopes.

### Token & cost efficiency rules

Each subagent cold-starts with full system/rules context and runs its own build check. Minimize
spawn overhead:

- **Coarse-grained batching (2–3 subagents max per wave)**: Bundle related sections/components into
  2–3 substantial tracks (4+ files each) instead of 1-file micro-tasks. If a task is < 3 files, fold
  it into a larger track or do it in the orchestrator.
- **Model tiering**: Pass `Model: "flash"` to `invoke_subagent` for well-scoped implementation tasks
  where Wave 0 already locked down types, tokens, and UI primitives. Reserve the primary model for
  orchestration, Wave 0 contracts, and Wave 2 review/integration.
- **Pre-digest context in the brief**: Include exact prop signatures, file paths, and token cheat
  sheets in the brief so subagents don't burn turns grepping or reading unrelated files.
- **Real data in Wave 0**: When user content is already known, put it in `src/data/` in Wave 0 so
  Wave 2 doesn't rewrite data twice.

### Conflict rules (the important part)

- Two tasks in the same wave may **never** share a writable file.
- Hot files — `package.json`, `package-lock.json`, `tailwind.config.js`, `src/App.tsx`,
  `src/components/*/index.ts`, `src/types/index.ts` — are owned by the orchestrator. Subagents
  report "please add export X to index.ts" in their final message instead of editing them.
- Prefer new files over editing existing ones. A section rewrite = new file, orchestrator swaps
  the import in `App.tsx` at merge time.

## Phase 2 — Dispatch

For each task in the current wave, call `invoke_subagent` in parallel (one call block):

- `TypeName`: `self`
- `Model`: `flash` for bounded UI/feature implementation after Wave 0; `inherit` only for complex
  architectural or ambiguous tasks.
- `Workspace`: `share` (own worktree on the same repo — branches it creates are immediately
  visible to you for merging). Use `branch` only if `share` is unavailable; then ask the subagent to
  report its final commit SHA and workspace path so you can `git fetch` from it.
- `Prompt`: fill in [subagent-brief.md](./resources/subagent-brief.md). Always include the branch
  name `<feature>/<task-id>`, the exclusive file scope, and acceptance criteria.

Then stop calling tools and wait — subagents message you when done.

## Phase 3 — Review & merge (per finished task)

1. `git log <feature>..<feature>/<task-id> --stat` — reject if it touched files outside its scope.
2. `git diff <feature>...<feature>/<task-id>` — review for rule violations (AGENTS.md).
3. `git merge --no-ff <feature>/<task-id>` into the integration branch.
4. Apply any hot-file edits the subagent requested (exports, App.tsx wiring, deps).
5. `npm run build`. If it fails, fix it or send the task back via `send_message` to that subagent.
6. Commit: `chore(<feature>): integrate <task-id>`.

Merge tasks one at a time. If a merge conflicts, the plan was wrong — resolve, then note why in the
plan file so later waves avoid it.

## Phase 4 — Close out

1. Run the full checklist in `AG_VALIDATION_RULES.md` on the integration branch.
2. Delete merged task branches: `git branch -d <feature>/<task-id>`; `git worktree prune`.
3. Update the plan file with status, then summarize for the user and suggest opening a PR to `main`.
