---
name: auth-pattern-check
description: Detects forbidden authentication patterns in test files — specifically loginPage.goto() or loginPage.login() calls inside beforeEach or test bodies. Session is pre-loaded via storageState; login steps are never needed.
tools:
  - codebase
  - search
  - findTestFiles
---

## Purpose

Enforce the project's authentication convention: session is saved once by `tests/auth.setup.ts` into `.auth/state.json` and loaded automatically via `storageState` in `playwright.config.ts`. No test should ever manually log in.

## What to scan

- `tests/**/*.spec.ts` — all test specs
- `flows/**/*.ts` — all reusable flows

## Forbidden patterns

### [CRITICAL] Must fix — manual login in test code

Any occurrence of the following inside a test file or flow:

| Pattern | Why it's wrong |
|---|---|
| `loginPage.goto()` | Login page navigation is unnecessary — session is pre-loaded |
| `loginPage.login(` | Calling `login()` will overwrite or conflict with the pre-loaded session |
| `page.goto(.*login)` | Navigating directly to the login URL inside a test body |
| `test.use({ storageState` | Overriding storageState inline instead of using `base-unauth-ui-test` fixture |

### [OK] Correct patterns (no action)

- Tests importing `test` from `@/fixtures/base-ui-test` and navigating directly to their start URL (e.g. `productsPage.goto()`).
- Tests for login/logout importing `test` from `@/fixtures/base-unauth-ui-test` — this is the correct way to get an unauthenticated context.

## Output format

```
Auth Pattern Check
==================

[CRITICAL] Forbidden auth patterns found (must fix before merge):
  tests/ui-tests/products/products.spec.ts:14   loginPage.login(user.standard)
  tests/ui-tests/cart/cart.spec.ts:9            loginPage.goto()

[OK] No forbidden auth patterns found  (shown only when clean)
```

For each finding, include:
- File path and line number
- The exact offending line
- A one-line fix suggestion (e.g. "Remove — session is pre-loaded. Navigate directly to `productsPage.goto()`.")

## Rules

- Report only; never modify files.
- If no issues are found, output `[PASS] Auth pattern check passed — no manual login steps found`.
