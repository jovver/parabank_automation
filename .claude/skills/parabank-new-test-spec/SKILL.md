---
name: parabank-new-test-spec
description: Use when creating a new UI test spec (.spec.ts) in the parabank_automation project — custom fixture import, Arrange/Act/Assert structure, fluent .then chaining, no-locators-in-tests rule, data-driven assertions, and unique data for the shared demo.
---

# Parabank: New Test Spec

## Overview

Specs read like user stories: no locators, no raw `page` calls, no hardcoded expected strings. Tests drive the app through page-object methods only and assert through page-object getters. All interaction goes through the custom fixture — never `@playwright/test` directly.

## Checklist

Complete in order before writing the spec:

1. **Page object exists?** If the screen under test has no page object, create it first with the **parabank-new-page-object** skill.
2. **Fixture exists?** Confirm the page has a fixture in `fixtures/index.ts`. If not, add one (see Fixtures below). The fixture instantiates the page and calls `goto()`, so the spec never navigates.
3. **Expected strings exist?** Any text you assert against (error messages, labels) must live in `src/data/<page>Messages.ts`, typed by an interface in `utils/models/`. Add them there, not in the spec.
4. **Write the spec** at `tests/ui/<kebab-case>.spec.ts` following the template.
5. **Verify** — run the new file and `npm run typecheck`.

## Spec Template

```typescript
import { expect } from '@playwright/test';
import { homePageErrorMessages } from '../../src/data/homePageMessages';
import { test } from '../../fixtures/index';

test.describe(`<Page> <behaviour under test>`, () => {

    test(`should <human-readable expectation>`, async ({ homePage }) => {
        // Arrange
        // variable declarations and test-data setup only

        // Act
        await homePage.clickRegisterLink()
        .then((_) => _.fillFirstNameField('test'))
        .then((_) => _.clickRegisterButton());

        // Assert
        expect(await homePage.isFirstNameErrorVisible()).toBeFalsy();
    });
});
```

## Non-Obvious Conventions

| Convention | Rule |
|------------|------|
| Test runner import | `import { test } from '../../fixtures/index'` — **not** `@playwright/test`. The custom `test` provides auto-navigated page fixtures. `expect` still comes from `@playwright/test`. |
| Fixture destructure | Destructure the page fixture (`{ homePage }`), **never** `{ page }`. No raw `page.goto()` or `page.locator()` in specs. |
| Navigation | The fixture already called `goto()`. Specs start on the page — do not navigate. |
| Act chaining | First call `await homePage.method()`, then chain with `.then((_) => _.nextMethod())`. The fluent page methods return `this`. |
| Assertions | Booleans: `expect(await homePage.isXxxVisible()).toBeTruthy()`/`.toBeFalsy()`. Text: `expect(await homePage.getXxxError()).toBe(pageMessages.xxx)`. |
| Expected values | Compare against constants from `src/data/`, never string literals in the spec. |
| Comments | Always include the `// Arrange`, `// Act`, `// Assert` block markers, even when a section is empty. |
| File name | `tests/ui/<kebab-case>.spec.ts` (e.g. `transfer-funds.spec.ts`). |
| `describe` / test names | Backtick template strings; test names start with `should`. |

## Shared Demo State

The hosted Parabank instance is shared and reset on its own schedule. Tests must be independent and idempotent:

- Any flow that **creates or mutates** data (registration, transfers, bill pay) must generate **unique values** (timestamp/UUID-based usernames, etc.) — never reuse a fixed account or username.
- Never assume a clean slate or rely on data from another test.
- Validation-only tests (empty-field errors, format rejection) need no unique data — they submit nothing persistent.

## Fixtures

If the page has no fixture, add one to `fixtures/index.ts` so the spec starts authenticated/navigated:

```typescript
type Fixtures = {
    homePage: HomePage;
    accountsPage: AccountsPage;   // new entry
};

export const test = base.extend<Fixtures>({
    accountsPage: async ({ page }, use) => {
        const accountsPage = new AccountsPage(page);
        await accountsPage.goto();
        await use(accountsPage);
    },
});
```

## Common Mistakes

| Mistake | Correct pattern |
|---------|-----------------|
| `import { test } from '@playwright/test'` | `import { test } from '../../fixtures/index'` |
| `async ({ page }) =>` then `page.locator(...)` | `async ({ homePage }) =>` and call page-object methods |
| Calling `goto()` inside the test | The fixture already navigated — remove it |
| `expect(...).toBe('First name is required.')` | `.toBe(homePageErrorMessages.firstNameErrorMessage)` |
| Sequential `await` statements for each action | Fluent `.then((_) => _.nextMethod())` chain |
| Omitting the Arrange/Act/Assert comments | Keep all three markers, even if a section is empty |
| Fixed username for a registration test | Generate a unique value per run |
| `PascalCase` or `camelCase` spec filename | `kebab-case.spec.ts` |
