# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this /tests directory. Files contained in this directory are test spec files organised into three subdirectories: `ui/` for browser-driven specs, `api/` for REST API specs, and `data/` for CSV test data files.

## UI Test files

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
