# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

End-to-end test automation for [Parabank](https://parabank.parasoft.com/parabank/index.htm), Parasoft's public demo banking application. Covers both browser-driven UI flows (login, account overview, transfers, bill pay, etc.) and the REST API exposed under `/parabank/services/bank/`.

## Stack

- **Runtime:** Node.js (LTS) + TypeScript
- **Test runner / browser automation:** [Playwright Test](https://playwright.dev/) (`@playwright/test`)
- **HTTP for API tests:** Playwright's built-in `request` fixture (no separate HTTP client needed)
- **Package manager:** npm
- **Config:** `dotenv` — environment-specific values live in `.env` (gitignored); commit a `.env.example` template

## Common commands

See Setup and Running tests in @README.md — the npm scripts in `package.json` are the canonical entry points (`npm test`, `npm run test:ui`, `npm run test:api`, `npm run typecheck`).

## Configuration

All environment-specific values are read from `.env` via `dotenv` (loaded at the top of `playwright.config.ts`). Never hardcode URLs or credentials in specs.

Expected variables (mirror these in `.env.example`):

| Var | Purpose |
| --- | --- |
| `BASE_URL` | Web UI base, used by `page.goto()` |
| `API_BASE_URL` | REST base for API tests |
| `TEST_USERNAME` / `TEST_PASSWORD` | Credentials for a pre-registered test user |

`.env` must be gitignored. To target a different environment (local Docker, staging), swap the file — no code changes required.

## Architecture

Two parallel test trees (UI + API) that share fixtures and helpers. See @README.md for the directory layout.

Key conventions to maintain as the project grows:

- **Page Object Model for UI.** Each page class owns its selectors and exposes user-intent methods (`login(user, pass)`, `transferFunds(from, to, amount)`) — specs should read like user stories, not click sequences.
- **API tests use Playwright's `request` fixture**, not a separate HTTP library. Wrap endpoints in `api/` modules with typed request/response shapes so call sites stay terse.
- **Auth via fixtures, not per-test login.** Use Playwright's [storage state](https://playwright.dev/docs/auth) so most tests start authenticated; reserve explicit login flows for tests that exercise the login screen itself.
- **Treat the public demo as shared mutable state.** The hosted Parabank instance is reset on its own schedule and may be used by others. Tests must be independent and idempotent — generate unique data (timestamps, UUIDs) instead of relying on fixed account IDs, and never assume a clean slate.
- **UI selectors prefer roles/labels** (`getByRole`, `getByLabel`) over CSS/XPath for resilience.

## CI notes

When CI is added, expose the `.env` vars as repo secrets and ensure `npx playwright install --with-deps` runs before the test step. Upload `playwright-report/` as a build artifact for failure triage.

## Coding standards

- **TypeScript strict mode** — no `any` types
- File naming (excluding test files): `PascalCase`
- Method or function naming: `camelCase`
- Test or spec file naming (**.spec.ts): `kebab-case` (e.g., `login-flow.spec.ts`)

### Page object models

No logic should be contained in the page object models. Page object models must only have the locators and the relevant page object methods.

Page object model files must follow the fluent implementation:

```typescript
async methodName(): Promise<this> {
  await this.locatorName.click();
  return this;
}
```

### Test files

No locators must be present in the test files. Similar to page objects, the fluent implementation is also applied. When creating tests, the following pattern is strictly adhered to, the Arrange, Act, Assert pattern:

```typescript
test.describe('Parabank - <Page name>', () => {
  test('should <human-readable expectation>', async ({ page }) => {
    // Arrange
    // Initial variable declarations and test data set-up are here
    const home = new HomePage(page);

    // Act
    // This is where the webpage gets called and interacted
    await home.methodName()
      .then((_) => _.anotherMethodName())
      .then((_) => _.yetAnotherMethodName());

    // Assert
    // This is where the assertions are set
    expect(await home.isAssertionMethod()).toBeTruthy();
  });
});
```
