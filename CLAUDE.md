# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

This is a fresh `create-vue` scaffold (Vue 3 + TypeScript + Vite). Aside from the app name, no custom application code has been written yet — `src/App.vue` still shows the default "You did it!" template, `src/router/index.ts` has no routes, and `src/stores/counter.ts` is the default Pinia example store. Treat existing files as placeholders to be replaced, not established patterns to imitate.

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

- Standard `create-vue` layout: `src/main.ts` bootstraps the app, installing Pinia and Vue Router before mounting `src/App.vue` to `#app`.
- Routing: `vue-router` with `createWebHistory`, configured in `src/router/index.ts`. Route list is currently empty.
- State: Pinia stores live under `src/stores/`, using the Composition API store style (`defineStore(name, () => { ... })`), as seen in `src/stores/counter.ts`.
- Path alias `@` maps to `src/` (configured in `vite.config.ts`, shared into Vitest since `vitest.config.ts` merges `viteConfig`).
- Unit tests live alongside source in `__tests__` directories (e.g. `src/__tests__/`) and run under Vitest with jsdom; e2e tests live in the top-level `e2e/` directory and run under Playwright against a live server.
- Linting is two-layered: `oxlint` runs first (fast correctness-focused rules, config in `.oxlintrc.json`) and its results are merged into the `eslint` flat config (`eslint.config.ts`) via `eslint-plugin-oxlint`, so oxlint's disables suppress overlapping ESLint rules rather than conflicting with them. Prettier formatting concerns are excluded from ESLint via `eslint-config-prettier`.
