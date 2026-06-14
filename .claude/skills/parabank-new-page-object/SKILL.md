---
name: parabank-new-page-object
description: Use when creating a new page object file in the parabank_automation project — BasePage inheritance, locator strategy, fluent methods, access modifiers, goto decision, and combination methods.
---

# Parabank: New Page Object

## Overview

Page objects own locators and expose user-intent methods. They contain no logic — no conditionals, no data generation, no assertions beyond returning visibility/text.

## Checklist

Complete in order before writing any code:

1. **Scan existing pages** — does a sibling page already declare a locator you need? Inherit or scope from it.
2. **Map every element** — list all inputs, buttons, links, and error/display nodes the tests will need.
3. **Choose a locator strategy** for each (see priority table below).
4. **Write Basic Methods** — one action or one getter per method.
5. **Write Combination Methods** — only for sequences with a clear user-intent name.

## Class Template

```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class XxxPage extends BasePage {
    readonly page: Page;                           // re-declared for type access — always present
    private readonly someInput: Locator;           // all Locators: private readonly
    private readonly someButton: Locator;
    private readonly someError: Locator;
    private readonly url: string = '/path';        // only if page is directly navigable

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.someInput  = this.page.getByLabel('Label');
        this.someButton = this.page.getByRole('button', { name: 'Action' });
        this.someError  = this.page.locator('#error-element-id');
    }

    // Basic Methods

    async goto() {                                 // only include if url field exists
        await this.navigate(this.url);
        return this;
    }

    async fillSomeInput(value: string) {
        await this.someInput.fill(value);
        return this;
    }

    async clickSomeButton() {
        await this.someButton.click();
        return this;
    }

    async isSomeErrorVisible(): Promise<boolean> {
        return await this.someError.isVisible();
    }

    async getSomeError(): Promise<string> {
        return await this.someError.innerText();
    }

    // Combination Methods

    async doMeaningfulAction(value: string) {      // only when sequence has a semantic name
        await this.fillSomeInput(value);
        await this.clickSomeButton();
        return this;
    }
}
```

## Access Modifiers

| Field | Modifier | Why |
|-------|----------|-----|
| `page: Page` | `readonly` | Re-declared for type access; BasePage holds the value |
| Every `Locator` | `private readonly` | Locators are implementation detail; only methods expose them |
| `url: string` | `private readonly` | Same encapsulation rule |

## Locator Priority

Stop at the first strategy that uniquely identifies the element:

| Priority | Strategy | When to use |
|----------|----------|-------------|
| 1 | `getByRole('button', { name: 'X' })` | Interactive elements with accessible roles |
| 2 | `getByLabel('X')` | Form inputs with an associated `<label>` |
| 3 | `getByPlaceholder('X')` | Inputs without a label |
| 4 | `getByText('X')` | Read-only display text (errors, headings, status messages) |
| 5 | `locator('#id')` | Elements with a stable HTML id |
| 6 | `locator('[data-testid="x"]')` | Team-controlled data attributes |
| 7 | `locator('.class')` | Last resort — fragile to styling changes |

**Never use `.nth()`** — disambiguate by filtering with `.filter({ hasText: '...' })` or by scoping within a parent locator.

## `goto()` Decision

| Situation | Decision |
|-----------|----------|
| Page has its own URL (navigable directly) | Add `private readonly url` and `async goto()` |
| Page is reached by clicking through another page | No `goto()` — leave navigation to the referring page object |

## Combination Methods

Create a Combination Method **only** when:
- Two or more Basic Methods are always called together for one user-visible action
- The combined sequence has a clear, intent-expressing name (e.g., `login()`, `submitTransfer()`)

One or two combination methods is typical. If you feel the urge to create more, each should still pass the "single user intent" test.

## Common Mistakes

| Mistake | Correct pattern |
|---------|-----------------|
| `readonly someInput: Locator` | `private readonly someInput: Locator` |
| Forgetting `return this` in fluent methods | Every non-getter method must `return this` |
| Adding `if`/`else` or data logic inside a method | No logic — move it to the test or a fixture |
| Using `.nth(0)` to target a repeated element | Filter by content: `.filter({ hasText: 'Savings' })` |
| Adding `goto()` for a page reached via sidebar | Only add `goto()` when the page has its own direct URL |
| Hardcoding an error string in the locator AND a data model | Locator uses the string directly; data model is for test assertions |
