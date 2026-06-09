# Parabank Automation

End-to-end test automation for [Parabank](https://parabank.parasoft.com/parabank/index.htm), Parasoft's public demo banking application. Covers UI flows in the browser and the REST API exposed under `/parabank/services/bank/`.

## Stack

- **Node.js** (LTS) + **TypeScript**
- **[Playwright Test](https://playwright.dev/)** — browser automation and HTTP via the `request` fixture
- **dotenv** — environment configuration
- **npm** — package management

## Prerequisites

- Node.js 18 or newer
- npm 9 or newer

## Setup

```bash
git clone <repo-url>
cd parabank_automation
npm install
npx playwright install      # downloads Chromium, Firefox, WebKit
cp .env.example .env        # then fill in TEST_USERNAME / TEST_PASSWORD
```

## Configuration

All environment-specific values are read from `.env` (gitignored). See `.env.example` for the full list.

| Variable | Description |
| --- | --- |
| `BASE_URL` | Web UI base URL — defaults to the public demo |
| `API_BASE_URL` | REST API base URL |
| `TEST_USERNAME` / `TEST_PASSWORD` | Credentials for a pre-registered Parabank user |

The public demo at `parabank.parasoft.com` resets on its own schedule, so if login starts failing, register a fresh user via the UI and update `.env`.

## Running tests

```bash
npm test                    # all tests (UI + API)
npm run test:ui             # UI tests across Chromium / Firefox / WebKit
npm run test:api            # API tests only
npm run test:headed         # watch a run in a real browser
npm run test:debug          # step through with the Playwright Inspector
npm run report              # open the HTML report from the last run
npm run codegen             # record a flow to bootstrap a new test
npm run typecheck           # tsc --noEmit
```

Filter examples:

```bash
npx playwright test path/to/file.spec.ts        # single file
npx playwright test -g "transfer funds"         # by test name
```

## Project structure

```
tests/
  ui/        # browser tests, one spec per user flow
  api/       # REST tests using Playwright's request fixture
pages/       # Page Object Models — one class per Parabank screen
src/         # contains the configuration files for the fixtures
  config/    # contains the utility functions for the fixtures
api/         # typed wrappers around Parabank REST endpoints
fixtures/    # custom Playwright fixtures (auth, seeded user, API client)
utils/       # utility functions and models
  models/    # for modeling the data types and interfaces of the application
  helpers    # pure utility functions not belonging to a specific page (page-agnostic)
playwright.config.ts
```

## Conventions

- **Page Object Model** for UI — selectors live in page classes; specs read like user stories.
- **API tests use Playwright's `request` fixture**, wrapped in typed `api/` modules.
- **Auth via fixtures**, leveraging Playwright [storage state](https://playwright.dev/docs/auth) — only login specs hit the login screen directly.
- **Treat the public demo as shared mutable state** — generate unique data (timestamps, UUIDs) and never assume a clean slate.
- **Prefer role/label selectors** (`getByRole`, `getByLabel`) over CSS/XPath.

## Working with agents

See [`CLAUDE.md`](./CLAUDE.md) for guidance given to [Claude Code](https://claude.com/claude-code) when operating in this repo.
