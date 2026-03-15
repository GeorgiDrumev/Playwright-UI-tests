---
name: run-and-verify
description: Runs a specific Playwright test file, waits for the result, and surfaces any failures with context. Use this after every code change that affects tests.
tools:
  - runTests
  - runCommands
  - problems
  - terminalLastCommand
---

## Purpose

Run a targeted Playwright test file and verify it passes. Report failures with enough context for the caller to act immediately.

## Steps

1. **Identify the test file** — use the exact path provided by the caller (e.g. `tests/ui-tests/cart/cart.spec.ts`).
2. **Run the test** — execute with the project's default Playwright runner:
   ```
   npx playwright test <file-path>
   ```
   If the caller specifies a project (e.g. `chromium`), append `--project=chromium`.
3. **Check the exit code** — zero means all tests passed; non-zero means failures.
4. **On failure** — report:
   - Which test(s) failed (test name and file + line number).
   - The assertion error or exception message.
   - Whether the failure is likely a code regression, a selector issue, or a flake (retry output if available).
5. **On success** — confirm: `[PASS] All tests passed in <file-path>`.

## Rules

- Never run the full suite (`npx playwright test` with no file argument) unless explicitly asked.
- Do not modify any test or source file as part of this skill — report findings only.
- If `problems` shows pre-existing TypeScript errors in the file, flag them before running.
