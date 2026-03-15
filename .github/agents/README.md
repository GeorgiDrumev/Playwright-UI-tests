# Custom Agents for this repo

These agents are in preview format and live in `.github/agents/`.

## Expected project structure

The agents assume the following flat layout (no `src/` wrapper):

```
fixtures/     ← Playwright test fixtures (base-ui-test.ts, auth state)
flows/        ← Reusable multi-step user flows (checkout-flow.ts, etc.)
pages/        ← Page Object Models
types/        ← Shared TypeScript types and enums
utils/        ← Helpers (wait-utils, performance-utils, screenshot-utils, checkout-utils)
tests/        ← All test specs (ui-tests/, visual-tests/, performance/)
data/         ← Test data (user-data, product-data, error-messages)
```

## Agent responsibilities

| Agent | Scope | When to use |
|---|---|---|
| `@Planning Assistant` | Read-only | Before writing any code — get a file-level plan first |
| `@UI Test Builder` | Write code | Implement new tests or modify existing ones |
| `@Test Optimizer` | Improve existing code | Fix flaky, slow, or incorrect tests |

Agents have explicit scope guards — each one will redirect you to the right agent if you ask outside its scope.

## Files
- `planning.agent.md`
- `ui-test-builder.agent.md`
- `test-optimizer.agent.md`
- `code-reviewer.agent.md`

## Skills

Reusable multi-step capabilities that agents can invoke. Skills live in `.github/skills/`.

| Skill | Purpose | Used by |
|---|---|---|
| `run-and-verify` | Run a test file and surface failures with context | UI Test Builder, Test Optimizer |
| `selector-audit` | Scan for CSS class selectors and missing `data-test` attributes | Code Reviewer, Test Optimizer |
| `auth-pattern-check` | Detect forbidden `loginPage.goto()` / `loginPage.login()` patterns | Code Reviewer, Test Optimizer, UI Test Builder |

## How to use
1. Open Copilot Chat in Visual Studio Code.
2. Use the agent picker, or type `@` and choose one of the custom agents.
3. Prompt with a specific task, for example:
   - `@Planning Assistant Plan a new checkout UI test suite with risks and milestones.`
   - `@UI Test Builder Add a test for login lockout in tests/ui-tests/authentication.`
   - `@Test Optimizer Analyze flaky cart tests and reduce waits.`
   - `@Code Reviewer Review the changes in the current branch before merging.`

## Notes
- If tool names differ in your Visual Studio build, update the `tools` lists in each file.
- If model pinning is not supported in your environment, remove the `model` key and the selected chat model will be used.
- Skills require VS Code 1.99+ with agent mode enabled (`chat.agent.enabled`).
