# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

Built on a `create-vue` scaffold (Vue 3 + TypeScript + Vite). The start screen (`src/views/StartView.vue`) is implemented and routed at `/`; `src/views/QuestionView.vue`, `LoadingView.vue`, and `ResultsView.vue` exist as empty placeholder files but have no markup or routes yet. `src/stores/counter.ts` is still the untouched default Pinia example store — the quiz hasn't needed shared state yet, so treat it as a placeholder to replace once question/answer/rating state is needed, not as a pattern to imitate.

## Project brief

The task (see `README.md`) is to build a quiz for runners to find their best-fit shoe from the On "Cloud" line, matching four reference layouts in `public/1_start_screen.png` through `public/4_results_screen.png`:

1. **Start screen** — intro/CTA to begin the quiz.
2. **Question screen** — one question at a time, multiple-choice answers.
3. **Loading screen** — transition shown while results are computed.
4. **Results screen** — best-fitting shoe(s) presented.

Data model, already provided under `src/data/`:

- `questions.json` — an array of questions, each with `id`, `copy`, and `answers`. Each answer has `copy`, a `nextQuestion` (the id of the next question to branch to — an empty string means the quiz is over and results should be shown), and a `ratingIncrease` map of shoe-id → point value to add to that shoe's score when the answer is chosen. Question flow is a graph, not a fixed sequence — the next question depends on the answer picked.
- `shoes.json` — the catalog of shoe ids/names to accumulate ratings against and rank at the end.

Assets (photos, shoe images, loader) are in `src/assets/`. No CSS framework — write plain SCSS, not Tailwind/Bootstrap. Google Fonts are an acceptable substitute for the original typography. Main navigation is out of scope; animations/transitions are at the implementer's discretion.

## Commands

- `npm run dev` — start the Vite dev server
- `npm run build` — type-check (`vue-tsc --build`) then production-build via Vite
- `npm run preview` — preview the production build
- `npm run test:unit` — run Vitest unit tests (jsdom environment)
- `npm run test:unit -- src/path/to/File.spec.ts` — run a single unit test file
- `npm run test:unit -- -t "test name"` — run tests matching a name pattern
- `npm run test:e2e` — run Playwright e2e tests (auto-starts the dev server; on CI it builds first and uses the preview server instead)
- `npm run test:e2e -- --project=chromium` — restrict e2e run to one browser
- `npm run test:e2e -- e2e/vue.spec.ts` — run a single e2e spec
- `npm run type-check` — type-check only, via `vue-tsc --build`
- `npm run lint` — runs both `lint:oxlint` and `lint:eslint` (both auto-fix)
- `npm run format` — Prettier write over `src/`

## Architecture

- Standard `create-vue` layout: `src/main.ts` bootstraps the app, importing the global SCSS entrypoint, installing Pinia and Vue Router, then mounting `src/App.vue` to `#app`. `App.vue` just wraps `<RouterView />` in a `.app-shell` that caps content width (mobile-first, wider on desktop via the `$bp-desktop` breakpoint).
- Routing: `vue-router` with `createWebHistory`, configured in `src/router/index.ts`. Only `/` (→ `StartView`) is wired up so far; add routes there as the question/loading/results views are built out.
- Views live in `src/views/` (one per quiz screen); shared chrome (currently just the white hamburger+logo header) lives in `src/components/` as `AppHeader.vue` and is reused across screens rather than duplicated per view.
- Styling is plain SCSS, no CSS framework. Shared variables (colors, fonts, layout sizes, breakpoints) live in `src/assets/styles/_variables.scss`; the global reset/base styles are in `src/assets/styles/main.scss` (imported once from `main.ts`). Individual components pull in variables explicitly via `@use '@/assets/styles/variables' as *;` at the top of their `<style lang="scss" scoped>` block — there's no Vite-level auto-injection, so new components need that same `@use` line to access `$color-*`/`$font-*`/`$bp-*` variables.
- Fonts are loaded via Google Fonts `<link>` tags in `index.html` (Fraunces for serif headings, Inter for sans body/UI) rather than self-hosted `@font-face` files.
- State: Pinia stores live under `src/stores/`, using the Composition API store style (`defineStore(name, () => { ... })`), as seen in `src/stores/counter.ts` (still the default example store, unused by the app).
- Path alias `@` maps to `src/` (configured in `vite.config.ts`, shared into Vitest since `vitest.config.ts` merges `viteConfig`).
- Unit tests live alongside source in `__tests__` directories (e.g. `src/__tests__/`) and run under Vitest with jsdom; e2e tests live in the top-level `e2e/` directory and run under Playwright against a live server.
- Linting is two-layered: `oxlint` runs first (fast correctness-focused rules, config in `.oxlintrc.json`) and its results are merged into the `eslint` flat config (`eslint.config.ts`) via `eslint-plugin-oxlint`, so oxlint's disables suppress overlapping ESLint rules rather than conflicting with them. Prettier formatting concerns are excluded from ESLint via `eslint-config-prettier`.
