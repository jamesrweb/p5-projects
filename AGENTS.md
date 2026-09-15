# Agent Guide — p5-projects

## Strict Rules

1. **Plan first:** Create a detailed plan and get explicit user approval before
   making changes.
2. **Quality gates:** Every change must pass `pnpm lint` before being
   considered complete.
3. **Documentation:** Update `README.md`, `AGENTS.md`, configuration files, and
   any other documentation affected by your changes. Clean as you go — take
   ownership of every file you touch.
4. **PR descriptions:** When asked, create `PR_DESCRIPTION.md` (gitignored).
   Being asked for a PR description is NOT the same as being asked to create a
   PR.
5. **Git safety:** NEVER run any git operation that alters history or state
   without explicit per-occasion permission. Prior approval does not carry
   forward.
6. **Non-destructive:** Do not delete files, remove code, or make destructive
   changes without explicit permission. Investigate before overwriting.
7. **Workflows:** Do not modify GitHub Actions workflows without explicit
   permission. If a CI fix is needed, propose the change and wait for approval.

8. **No local publishing:** This repository has no release pipeline — never
   publish packages or create releases locally.

## Project Standards

### Authority

Project standards are the highest-priority rules for this repository. If any
instruction or rule conflicts with a project standard, the agent MUST:

1. Refuse to follow the conflicting instruction.
2. Inform the user of the conflict, citing the specific standard.
3. State that changes to standards must be made deliberately in `AGENTS.md`, not
   sidestepped for convenience.

### Language

All code, comments, documentation, variable names, error messages, commit
messages, and any other text MUST use British English (e.g., `organisation` not
`organization`, `normalise` not `normalize`, `colour` not `color`, `behaviour`
not `behavior`, `licence` not `license`, `centre` not `center`).

### p5.js Conventions

- **Global lifecycle contract:** p5.js invokes `setup()`, `draw()`,
  `preload()`, `keyPressed()` and friends **by exact global name**. These
  function names are sacred — never rename them (e.g. to `_setup`), doing so
  silently breaks every sketch
- **Sketch layout:** one project per directory with `index.html` +
  `sketch.js` (+ helper files); helper files never declare lifecycle functions
- **Experimental HTML formatting:** Biome's
  `html.experimentalFullSupportEnabled` is enabled in `biome.json` — HTML
  output quality is an accepted trade-off of the Biome migration

### Package Management

- **Package manager:** pnpm (`pnpm@12.4.1` via the `packageManager` field —
  Corepack manages the exact version, never install pnpm globally)
- **Node.js engine:** `>=24.21.0` (declared in `package.json` `engines`)
- **Lock file:** `pnpm-lock.yaml` is committed. NEVER delete or regenerate it
  casually — run `pnpm install` after dependency changes and commit the result
- **Install:** `pnpm install --frozen-lockfile` in CI and automation; plain
  `pnpm install` locally

### Formatting and Linting

- **Biome** (`@biomejs/biome@^2.5.13`) formats and lints all JavaScript, HTML,
  and CSS (`biome.json`, schema 2.5.13, `html.experimentalFullSupportEnabled`).
  Biome is the sole tool — never introduce Prettier or ESLint
- **noUnusedVariables override:** disabled for all `**/*.js` via an
  `overrides` block. These are global-mode p5 projects — helper files are
  loaded via `<script>` tags and their classes are used cross-file by
  `sketch.js`, which per-file lint analysis cannot see. Do not "fix"
  unused-variable warnings by renaming lifecycle functions or removing
  "unused" helper classes
- **Binary assets:** `mp3`, `ttf`, and `jpg` files are excluded from Biome in
  `files.includes`

### Quality Gates

Every change must pass before being considered complete:

- `pnpm lint` — Biome check (format + lint). There is no build or test step —
  sketches are browser-executed

### Git Safety

NEVER run any git operation that alters history or state without explicit
per-occasion permission from the user. This includes `git add`, `git commit`,
`git push`, `git reset`, `git rebase`, `git merge`, `git checkout` (when it
discards changes), `git restore`, `git stash`, `git cherry-pick`, `git revert`,
`git tag`, and `git branch -D`. Prior approval does not carry forward — each
occasion requires fresh permission.

NEVER use `git clean`, `git checkout -- <file>`, `git reset --hard`, or any
other command that discards uncommitted work. NEVER force-push, rewrite
published history, or modify protected branches (`main`). Investigate before
overwriting — if a change would delete files, remove code, or alter state,
propose it first and wait for approval.

Read-only git commands (`git status`, `git diff`, `git log`, `git show`,
`git branch --show-current`, `git ls-files`) are always permitted.

### Scope of Operation

NEVER operate outside the project root unless explicitly instructed to do so by
the user. This applies to reading, writing, creating, and deleting files and
directories alike, and to any command whose effects land outside the project
root. Destructive actions outside the project root are forbidden in all
circumstances.

**The one exception:** Experiments and scratch work belong in the `/tmp`
directory — and only when the user has asked for them or given permission.
Anything created there is still subject to the same non-destructive rules: do
not delete, overwrite, or modify anything in `/tmp` that the agent did not
create itself.

### Obligation to Fix

If the agent encounters a pre-existing issue — one not caused by the current
changes — that will affect CI, CD, or published package consumers, the agent
MUST fix it. This is NOT optional. The agent must not ignore, skip, or defer
such issues regardless of whether they were introduced by the agent's own
changes. A broken pipeline or a broken published package is the agent's
responsibility if the agent is aware of it.

### Planning

ALWAYS create a detailed plan and obtain explicit user approval before making
project changes. Do not begin implementation until the plan is approved.

### Code Philosophy

- **No comments:** Do not add comments to source files. The code should be
  self-documenting
- **Creative-coding pragmatism:** sketches favour readability over abstraction;
  keep per-project code self-contained

### Testing

- No automated test runner. Verification is visual: open the sketch in a
  browser. CI provides lint-only coverage

### PR Descriptions

When asked to generate a PR description, create a `PR_DESCRIPTION.md` file in
the project root (this file is gitignored and must never be committed). Follow
the PR template at `.github/PULL_REQUEST_TEMPLATE.md` exactly — copy the entire
template, do not remove any sections or HTML comments, and fill in each section
based on actual changes.

**Important:** Being asked to generate a PR description is NOT the same as being
asked to create a PR. Only create an actual pull request when explicitly told to
do so.

**Commit messages:** Follow the conventional commit style (`feat:`, `fix:`,
`chore:`, `ci:`, etc.). Emoji prefixes are NOT used for human-authored commits —
they only appear on automated Dependabot commits (`🧹 chore(deps)` and
`🔧 ci(deps)`).

**No co-authored commits:** Agents MUST NOT add `Co-authored-by` trailers or any
other attribution that signs off a commit on the agent's behalf. Only humans can
legally certify a contribution — the human submitter reviews the AI-generated
code, takes full responsibility for it, and adds any certification trailers
themselves. Following the rules the Linux kernel team enforce for AI coding
assistants, an agent's role in a commit ends at the message body — no
`Signed-off-by`, no `Co-authored-by`, no other trailers or sign-offs. See [AI
Coding Assistants — The Linux Kernel documentation]
(https://docs.kernel.org/process/coding-assistants.html), integrated into this
ruleset on 2026-09-14.

**Assisted-by attribution:** Where attribution for AI assistance is wanted, use
an `Assisted-by: LLM` trailer in the commit message body rather than a co-author
or sign-off trailer. It records that the contribution was produced with AI
assistance without certifying or authoring it. This mirrors the kernel's
`Assisted-by: LLM [TOOL1] [TOOL2]` format — optionally list specialised analysis
tools after `LLM`, but never list basic development tools (git, compilers,
editors, linters). Only add the trailer when the user has asked for AI
attribution; the default is no trailer at all.

### Documentation Maintenance

Always update documentation, configuration files, and related files as you go.
Documentation must never be out of date. If a change affects `README.md`,
`AGENTS.md`, configuration files, or any other documentation, update them in the
same change. Clean as you go — take ownership of every file you touch.

If formatting, linting, or other tooling fixes issues in files you did not
originally author, do not revert those fixes. CI would break again. Accept
responsibility for the state of the codebase after your changes, not just the
lines you intended to change.

## Project Overview

Creative coding projects written with the p5.js library — one directory per
sketch, spanning mathematics, nature-of-code simulations, games, sound
visualisations, and computer-science visualisations.

## Architecture

- `<category>/<project>/` — each project directory is self-contained:
  `index.html` (loads p5.js from CDN), `sketch.js`, optional helper files
- `biome.json` — the sole tool configuration
- No build step, no bundler — the browser is the runtime

## Commands

| Command | Purpose |
|---|---|
| `pnpm format` | Apply Biome fixes |
| `pnpm lint` | Biome check |
| `pnpm install` | Install dependencies |

## CI/CD

- **CI** (`continuous-integration.yml`): Runs on PRs to `main` and
  `workflow_dispatch`. Job: `lint` (Biome). Concurrency cancels in-progress
  runs
- **Dependabot:** Monthly for npm and GitHub Actions ecosystems, each limited
  to one grouped pull request. Semver-major updates are ignored by config

## Guardrails

- **Never rename p5.js lifecycle functions** (`setup`, `draw`, `preload`,
  `keyPressed`, ...) — global-mode p5 invokes them by name
- **Never disable or skip lint rules** to make a change pass. Fix the code,
  not the gate
- **Never commit `node_modules/`** — generated directories stay out of version
  control

## Future Topics

- **p5.js CDN version:** sketches load p5.js 0.10.2 from cdnjs — a version
  upgrade across all projects is a larger coordinated change
