# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

End-to-end test automation for [Parabank](https://parabank.parasoft.com/parabank/index.htm), Parasoft's public demo banking application. Covers both browser-driven UI flows (login, account overview, transfers, bill pay, etc.) and the REST API exposed under `/parabank/services_proxy/bank/`.

> Status: scaffold-only. The repo is currently empty; this file documents the intended setup so the first wave of code lands consistently. Update sections as real conventions emerge.

## Stack

- **Runtime:** Node.js (LTS) + TypeScript
- **Test runner / browser automation:** [Playwright Test](https://playwright.dev/) (`@playwright/test`)
- **HTTP for API tests:** Playwright's built-in `request` fixture (no separate HTTP client needed)
- **Package manager:** npm
- **Config:** `dotenv` — environment-specific values live in `.env` (gitignored); commit a `.env.example` template

## Common commands

```bash
npm install                          # install deps
npx playwright install               # install browser binaries (run once after install)

npm test                             # run all tests (UI + API)
npx playwright test tests/ui         # run only UI tests
npx playwright test tests/api        # run only API tests
npx playwright test path/to/file.spec.ts            # single file
npx playwright test -g "transfer funds"             # filter by test name
npx playwright test --headed --project=chromium     # watch a run in a real browser
npx playwright test --debug          # step through with the Playwright Inspector

npx playwright show-report           # open the HTML report from the last run
npx playwright codegen $BASE_URL     # record a flow to bootstrap a new test
```

## Configuration

All environment-specific values are read from `.env` via `dotenv` (loaded at the top of `playwright.config.ts`). Never hardcode URLs or credentials in specs.

Expected variables (mirror these in `.env.example`):

| Var | Purpose | Default for public demo |
| --- | --- | --- |
| `BASE_URL` | Web UI base, used by `page.goto()` | `https://parabank.parasoft.com/parabank` |
| `API_BASE_URL` | REST base for API tests | `https://parabank.parasoft.com/parabank/services_proxy/bank` |
| `TEST_USERNAME` / `TEST_PASSWORD` | Credentials for a pre-registered test user | — |

`.env` must be gitignored. To target a different environment (local Docker, staging), swap the file — no code changes required.

## Architecture

Two parallel test trees that share fixtures and helpers:

```
tests/
  ui/        # Playwright browser tests, one spec per user flow
  api/       # REST tests using the `request` fixture
pages/       # Page Object Models — one class per Parabank screen
api/         # Typed wrappers around Parabank REST endpoints
fixtures/    # Custom Playwright fixtures (auth, seeded user, API client)
utils/       # Pure helpers (data builders, formatters)
playwright.config.ts
.env.example
```

Key conventions to maintain as the project grows:

- **Page Object Model for UI.** Each page class owns its selectors and exposes user-intent methods (`login(user, pass)`, `transferFunds(from, to, amount)`) — specs should read like user stories, not click sequences.
- **API tests use Playwright's `request` fixture**, not a separate HTTP library. Wrap endpoints in `api/` modules with typed request/response shapes so call sites stay terse.
- **Auth via fixtures, not per-test login.** Use Playwright's [storage state](https://playwright.dev/docs/auth) so most tests start authenticated; reserve explicit login flows for tests that exercise the login screen itself.
- **Treat the public demo as shared mutable state.** The hosted Parabank instance is reset on its own schedule and may be used by others. Tests must be independent and idempotent — generate unique data (timestamps, UUIDs) instead of relying on fixed account IDs, and never assume a clean slate.
- **UI selectors prefer roles/labels** (`getByRole`, `getByLabel`) over CSS/XPath for resilience.

## CI notes

When CI is added, expose the `.env` vars as repo secrets and ensure `npx playwright install --with-deps` runs before the test step. Upload `playwright-report/` as a build artifact for failure triage.
