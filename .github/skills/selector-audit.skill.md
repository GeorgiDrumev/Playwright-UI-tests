---
name: selector-audit
description: Scans test and page-object files for forbidden CSS class selectors and missing data-test attributes, then reports findings by severity. Use before merging any change that touches selectors.
tools:
  - codebase
  - search
  - findTestFiles
---

## Purpose

Enforce the project's selector discipline: `data-test` attributes first, role-based second. CSS class selectors (`.some-class`) are forbidden in new code.

## What to scan

- `tests/**/*.spec.ts` — all test specs
- `pages/**/*.ts` — all Page Object Models
- `flows/**/*.ts` — all reusable flows

## Findings

### [CRITICAL] Forbidden — CSS class selectors

Flag any locator that uses a CSS class selector:
- `.locator('.some-class')`
- `page.$('.some-class')`
- `page.$$('.some-class')`
- Template-literal selectors containing a `.` followed by a word character: `/\.\w/`

Report: file path, line number, the offending selector string.

### [ADVISORY] Non-data-test selectors that could be fragile

Flag locators that do not use `data-test` and do not use a role-based strategy:
- `getByText(...)` with hard-coded strings
- `locator('input')` or other bare tag selectors
- XPath selectors

These are advisory — they may be acceptable depending on context, but warrant a comment.

### [OK] Compliant selectors (no action needed)

- `page.getByTestId(...)` — uses `data-testid` / `data-test`
- `page.getByRole(...)` — role-based
- `page.getByLabel(...)` — accessible label
- `page.getByPlaceholder(...)` — placeholder text

## Output format

```
Selector Audit Report
=====================

[CRITICAL] Forbidden CSS class selectors (must fix before merge):
  pages/cart-page.ts:34   .btn_action
  tests/ui-tests/cart/cart.spec.ts:12   .inventory_item

[ADVISORY] Potentially fragile selectors:
  pages/login-page.ts:18  getByText('Login')

[OK] No forbidden selectors found  (shown only when clean)
```

## Rules

- Report only; never modify files.
- If no issues are found, output `[PASS] Selector audit passed — no forbidden selectors found`.
