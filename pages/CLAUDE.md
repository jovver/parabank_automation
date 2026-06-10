# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this /pages directory. Files contained in this directory are exclusively page object model files containing locators, locator methods, and assertion methods.

## Page Object Models

No logic should be contained in the page object models. Page object models must only have the locators, relevant locator methods, and assertion methods. Achieve the simplest implementation.

Page object model files must follow the fluent implementation:

```typescript
async methodName(): Promise<this> {
  await this.locatorName.click();
  return this;
}
```

Page object model pages must follow the following pattern in order to have clear separation of locators and methods. Everything under the Basic Methods are single action methods and simple assertion methods returning the correct data type. Everything under the Combination Methods are Basic Methods bundled together, only create combination methods if it would make the code readable in the test file:

```typescript
export abstract class BasePage {
  readonly page: Page;
  private readonly link: Locator;
  private readonly button: Locator;

  constructor(page: Page) {
    this.page = page;
    // Locators will be located here
    this.link = this.page.getByRole('link', { name: 'Link' });
    this.button = this.page.getByRole('button', { name: 'Button' });
  }

  // Basic Methods
  async clickLink() {
    await this.link.click();
    return this;
  }

  async clickButton() {
    await this.button.click();
    return this;
  }

  async isLinkVisible(): Promise<boolean> {
    return await this.link.isVisible();
  }

  // Combination Methods

  async clickLinkAndButton() {
    await this.clickLink();
    await this.clickButton();
    return this;
  }

}
```

### Inheriting other page object models

Prior to writing any new page object file, verify first for any similar locators already present in other page object files and inherit it. Else, create the new page object model.

## Locator Strategy

Choose locators in this priority order for resilience against UI changes:

1. **Role** — `page.getByRole('button', { name: 'Submit' })` — mirrors the accessibility tree; most resilient
2. **Label** — `page.getByLabel('Username')` — ideal for form inputs
3. **Placeholder / Text / Alt / Title** — for elements without a role or label
4. **Test ID** — `page.getByTestId('submit-btn')` — when `data-testid` is present in the markup
5. **CSS selector** — last resort; see below

### CSS fallback

Only use CSS when none of the semantic locators above apply. Prefer in this order:

```typescript
page.locator('#element-id')            // id — most stable CSS option
page.locator('[data-attribute="val"]') // data attribute — stable if team-controlled
page.locator('.class-name')            // class — fragile; avoid if anything else works
page.locator('tag > .child')           // structural — avoid; breaks on DOM changes
```

Avoid XPath entirely — use CSS if you must reach for a structural selector.

## Disambiguating Multiple Elements

When a page contains repeated elements (table rows, account cards, list items), **never use `.nth()`** to target one by position — index-based selection breaks whenever elements are added, removed, or reordered.

Instead, narrow down by content or structure:

```typescript
// Rows / repeated blocks — filter by visible text
const row = this.page.getByRole('row').filter({ hasText: 'Savings' });

// Filter by a child element's content
const card = this.page.locator('.account-card').filter({ has: this.page.getByText('$500.00') });

// Scope further — get a cell within the matched row
const balance = row.getByRole('cell').filter({ hasText: '$' });

// Named role match — when the element has an accessible name
const account = this.page.getByRole('listitem', { name: 'Checking' });

// Chain locators to scope within a parent element
const section = this.page.getByRole('region', { name: 'Transfer Funds' });
const amount = section.getByLabel('Amount');
```

If none of these produce a unique match, add a more specific ancestor scope or request a `data-testid` on the element rather than falling back to `.nth()`.
