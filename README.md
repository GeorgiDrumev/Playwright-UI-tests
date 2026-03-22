# Playwright Test Framework — SauceDemo

End-to-end test automation for [saucedemo.com](https://www.saucedemo.com) using Playwright and TypeScript.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev) | Browser automation & assertions |
| TypeScript | Type-safe test code |
| [@faker-js/faker](https://fakerjs.dev) | Randomised test data generation |
| Docker | Reproducible CI execution |
| Husky + lint-staged | Pre-commit formatting |
| Prettier | Code formatting |

---

## Quick Start

```bash
npm install
npx playwright install   # download browsers
npm test                 # all tests, headless
npm run test:headed      # headed, 4 workers
npm run test:ui          # Playwright UI mode
npm run report           # open last HTML report
```

### Docker

```bash
# requires Docker Desktop to be running
npm run docker:build
npm run docker:test      # results mounted to playwright-report/ and test-results/
```

---

## Project Structure

```
├── dtos/                   # Zod schemas + inferred TypeScript types
│   ├── user.dto.ts
│   ├── product.dto.ts
│   └── checkout.dto.ts
├── factories/              # Test data factories (faker-backed)
│   └── checkout.factory.ts
├── fixtures/               # Playwright test fixtures
│   ├── base-ui-test.ts     # Authenticated — page object DI for all UI tests
│   └── base-unauth-ui-test.ts  # Unauthenticated — for login-page tests
├── flows/                  # Reusable multi-step workflows
│   └── checkout-flow.ts
├── pages/                  # Page Object Models
│   ├── base-page.ts
│   ├── login-page.ts
│   ├── cart-page.ts
│   ├── components/
│   │   └── burger-menu.ts
│   ├── products/
│   │   ├── products-page.ts
│   │   └── product-details-page.ts
│   └── checkout/
│       ├── checkout-user-information-page.ts
│       ├── checkout-details-page.ts
│       └── checkout-success-page.ts
├── utils/                  # Shared test helpers
│   ├── wait-utils.ts
│   ├── performance-utils.ts
│   ├── checkout-utils.ts
│   └── screenshot-utils.ts
├── types/                  # Shared TypeScript types
│   └── sort-types.ts
├── data/                   # Test data repository
│   ├── test-data/
│   │   ├── user-data.ts
│   │   ├── product-data.ts
│   │   ├── error-messages.ts
│   │   └── checkout-data.ts
│   └── screenshots/        # Visual baseline images
├── tests/
│   ├── auth.setup.ts       # One-time session save → .auth/state.json
│   ├── ui-tests/
│   │   ├── authentication/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── products/
│   │   └── navigation/
│   ├── visual-tests/
│   └── performance/
├── .github/
│   ├── agents/             # Custom Copilot agents (see below)
│   └── skills/             # Custom Copilot skills (see below)
├── playwright.config.ts
└── tsconfig.json
```

**Path aliases** (defined in `tsconfig.json`):

| Alias | Resolves to |
|---|---|
| `@pages/*` | `pages/*` |
| `@fixtures/*` | `fixtures/*` |
| `@utils/*` | `utils/*` |
| `@flows/*` | `flows/*` |
| `@dtos/*` | `dtos/*` |
| `@factories/*` | `factories/*` |
| `@data/*` | `data/*` |

---

## Test Types

| Type | Location | Runs on |
|---|---|---|
| UI E2E | `tests/ui-tests/` | Chromium + Safari Mobile |
| Visual regression | `tests/visual-tests/` | Chromium + Safari Mobile |
| Performance | `tests/performance/` | Chromium only |

### Running subsets

```bash
npm run test:visual              # visual tests only
npm run test:visual:update       # regenerate visual baselines
npm run test:performance         # performance tests only
npx playwright test --grep @cart # by tag
npx playwright test tests/ui-tests/authentication  # by folder
```

---

## Authentication

`tests/auth.setup.ts` runs once before all test projects. It logs in and saves the browser session to `.auth/state.json`. Every test project loads that session via `storageState` — **all tests start already logged in**.

- For tests that require an unauthenticated browser (login-page tests, redirect checks), import `test` from `@fixtures/base-unauth-ui-test`.
- **Never** call `loginPage.goto()` or `loginPage.login()` inside a `beforeEach` — navigate directly to the page under test (e.g. `productsPage.goto()`).

---

## Test Tags

| Tag | Meaning |
|---|---|
| `@authentication`, `@cart`, `@checkout`, `@products`, `@navigation` | Feature area |
| `@positive`, `@negative`, `@edge-case` | Scenario type |
| `@visual`, `@performance` | Test category |
| `@known-issue` | Documents a real app bug; excluded from blocking CI |

`@known-issue` tests are excluded from the default `npm test` run via `--grep-invert @known-issue`.

---

## Design Patterns

### 1. Page Object Model

All locators, actions, and assertions live in `pages/`. Tests never use raw Playwright locators directly.

- `BasePage` provides `goto()` and `compareScreenshot()` via the template method pattern.
- Each page has a `readonly validator` property — assertions are accessed as `page.validator.expectPageLoaded()` rather than constructing validators in tests.
- Shared UI elements (burger menu) are extracted into `pages/components/`.

### 2. Validators via Page Objects

Every page object exposes a `validator` property typed to its dedicated `XxxValidator` class. Tests call `pom.validator.method()` — never `new XxxValidator(page)`:

```typescript
// ✅ correct
await productsPage.validator.expectPageLoaded();
await cartPage.burgerMenu.validator.expectMenuClosed();

// ❌ wrong — never instantiate validators in tests
const v = new ProductsValidator(page);
```

### 3. Fixture-based Dependency Injection

`fixtures/base-ui-test.ts` extends Playwright's `test` with typed page-object fixtures. Tests declare only what they need; setup and teardown are automatic.

```typescript
test("adds item to cart", async ({ productsPage, cartPage }) => { ... });
```

### 4. Flow Facade

`flows/checkout-flow.ts` wraps multi-step workflows that span multiple pages. Tests that aren't specifically about the checkout steps call a single flow method rather than repeating setup:

```typescript
await checkoutFlow.addProductsAndNavigateToCart([expectedProducts[0]]);
await checkoutFlow.proceedToCheckoutInformation();
```

### 5. DTOs & Factories

Data shapes are defined as plain TypeScript interfaces in `dtos/` and used as the contract between test data, factories, and page methods. Test data is generated by factories in `factories/` using `@faker-js/faker`:

```typescript
// dtos/checkout.dto.ts
export interface CheckoutInformation {
  firstName: string;
  lastName: string;
  postalCode: string;
}

// factories/checkout.factory.ts
export const CheckoutFactory = {
  build: (): CheckoutInformation => ({ firstName: faker.person.firstName(), ... }),
};
```

### 6. Data-driven Tests

Static test data is centralised in `data/test-data/`. Parameterised cases use `forEach` to avoid duplicating test logic:

```typescript
negativeTestCases.forEach(({ name, credentials, expectedError }) => {
  test(name, async ({ loginPage }) => {
    await loginPage.login(credentials);
    await loginPage.validator.expectErrorMessage(expectedError);
  });
});
```

### 7. Given / When / Then Steps

Each test wraps its phases in `test.step()` using a Given/When/Then structure:

```typescript
test("should add item to cart", async ({ productsPage, cartPage }) => {
  await test.step("Given I am on the products page", async () => {
    await productsPage.goto();
  });
  await test.step("When I add a product to the cart", async () => {
    await productsPage.addProductToCart(product.name);
  });
  await test.step("Then the cart badge shows 1", async () => {
    await cartPage.validator.expectCartCount(1);
  });
});
```

### 8. Utility Helpers

Stateless helpers in `utils/` cover:
- `WaitUtils` — `waitForDomContentLoaded()` for post-interaction stabilisation
- `PerformanceUtils` — wall-clock timer with `assertLoadTime()`
- `ScreenshotUtils` — configurable retry wrapper around `toHaveScreenshot()` with font-ready stabilisation
- `CheckoutUtils` — shared checkout data helpers

---

## Selector Strategy

Priority order enforced in all page objects:

1. `[data-test="…"]` attributes (most stable)
2. Role-based (`getByRole`)
3. CSS class selectors — legacy only, never used in new code

---

## Assertions

All `validator.expect*()` methods use Playwright's auto-retrying `expect()` API (`toBeVisible`, `toHaveText`, `toHaveCount`). No `waitForNetworkIdle` or `waitForTimeout` are used in page objects.

---

## Configuration

Key settings in `playwright.config.ts`:

| Setting | Value | Reason |
|---|---|---|
| `fullyParallel` | `true` | Each test gets an isolated context |
| `retries` | `1` (local) / `2` (CI) | Absorbs transient failures without masking real ones |
| `screenshot` | `only-on-failure` | Captured automatically without overhead |
| `trace` | `retain-on-failure` | Available on first failure without overhead |
| `timeout` | `15 000 ms` | Appropriate for a fast demo app |

**Projects:** Desktop Chromium (1280×720) and iPhone 14 Pro / Safari Mobile (393×852).

**Visual diff tolerance:** `maxDiffPixels: 100`, `threshold: 0.1%`.  
Baselines are stored under `data/screenshots/`. Visual tests are generated on Windows — run baseline updates on the same OS to avoid rendering differences.

---

## Code Quality

- **Prettier** — `npm run format` formats all `.ts` files
- **Husky** — runs Prettier automatically on staged files before every commit (enabled by `npm install` via the `prepare` script)
- **TypeScript strict mode** — all implicit `any` types are errors
- **Explicit access modifiers** — `public`/`private`/`readonly` on every class member

---

## Copilot Agents & Skills

Custom agents and skills for assisted development live in `.github/`:

### Agents (`.github/agents/`)

| Agent | Role | When to use |
|---|---|---|
| `@Planning Assistant` | Read-only architecture review | Before writing any code — get a file-level plan first |
| `@UI Test Builder` | Implement and modify tests | Writing new tests or editing existing specs |
| `@Test Optimizer` | Improve existing tests | Fix flaky, slow, or incorrect tests |

Each agent has explicit scope guards and will redirect to the correct agent when asked outside its scope.

### Skills (`.github/skills/`)

| Skill | Purpose |
|---|---|
| `auth-pattern-check` | Detects forbidden `loginPage.login()` calls in tests — enforces `storageState` convention |
| `run-and-verify` | Runs a specific test file and reports pass/fail with context after any code change |
| `selector-audit` | Audits page objects for non-`data-test` selectors and flags CSS class usage |

---

## Assumptions & Limitations

### Assumptions
- SauceDemo stores state in the browser only — no backend database; each test starts clean
- Product data, prices, and error messages are static (no dynamic API)
- Performance threshold of 2 000 ms is appropriate for the demo environment
- Visual baselines are generated on Windows; CI must also run on Windows to avoid rendering differences

### Limitations
- No API layer to set up state programmatically — all setup is done via the UI
- Visual tests cannot run on Linux/Mac CI without regenerating baselines
- Performance tests cover the products page only
- `@known-issue` tests document confirmed app bugs and are excluded from blocking CI


---

## Tech Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev) | Browser automation & assertions |
| TypeScript | Type-safe test code |
| Docker | Reproducible CI execution |
| Husky + lint-staged | Pre-commit formatting |
| Prettier | Code formatting |

---

## Quick Start

```bash
npm install
npm test                    # all tests, headless
npm run test:headed         # headed, 4 workers
npm run test:ui             # Playwright UI mode
npm run report              # open last HTML report
```

### Docker

```bash
# requires Docker Desktop to be running
npm run docker:build
npm run docker:test         # results mounted to playwright-report/ and test-results/
```

---

## Project Structure

```
├── fixtures/               # Playwright test fixtures
│   └── base-ui-test.ts     # Page object DI for all UI tests
├── flows/                  # Reusable multi-step workflows
│   └── checkout-flow.ts
├── pages/                  # Page Object Models
│   ├── base-page.ts
│   ├── login-page.ts
│   ├── cart-page.ts
│   ├── components/
│   │   └── burger-menu.ts
│   ├── products/
│   └── checkout/
├── utils/                  # Shared test helpers
│   ├── wait-utils.ts
│   ├── performance-utils.ts
│   ├── checkout-utils.ts
│   └── screenshot-utils.ts
├── types/                  # Shared TypeScript types
│   └── sort-types.ts
├── data/                   # Test data repository
│   ├── test-data/
│   │   ├── user-data.ts
│   │   ├── product-data.ts
│   │   ├── error-messages.ts
│   │   └── checkout-data.ts
│   └── screenshots/        # Visual baseline images
├── tests/
│   ├── ui-tests/
│   │   ├── authentication/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── products/
│   │   └── navigation/
│   ├── visual-tests/
│   └── performance/
├── .github/
│   ├── agents/             # Custom Copilot agents
│   └── workflows/
├── playwright.config.ts
└── tsconfig.json
```

**Path aliases** (defined in `tsconfig.json`):
- `@/*` → project root (e.g. `@/pages/login-page`)
- `@data/*` → `data/*`

---

## Test Types

| Type | Location | Runs on |
|---|---|---|
| UI E2E | `tests/ui-tests/` | Chromium + Safari Mobile |
| Visual regression | `tests/visual-tests/` | Chromium + Safari Mobile |
| Performance | `tests/performance/` | Chromium only |

### Running subsets

```bash
npm run test:visual              # visual tests only
npm run test:performance         # performance tests only
npx playwright test --grep @cart # by tag
npx playwright test tests/ui-tests/authentication  # by folder
```

---

## Test Tags

| Tag | Meaning |
|---|---|
| `@authentication`, `@cart`, `@checkout`, `@products`, `@navigation` | Feature area |
| `@positive`, `@negative`, `@edge-case` | Scenario type |
| `@visual`, `@performance` | Test category |
| `@known-issue` | Documents a real app bug; excluded from blocking CI |

---

## Design Patterns

### 1. Page Object Model
All locators, actions, and assertions live in `pages/`. Tests never use raw locators directly.
- `BasePage` provides `goto()` and `compareScreenshot()` via the template method pattern
- Shared UI elements (burger menu) are extracted into `pages/components/`

### 2. Fixture-based Dependency Injection
`fixtures/base-ui-test.ts` extends Playwright's `test` with typed page-object fixtures. Tests declare only what they need; setup and teardown are automatic.

### 3. Flow Facade
`flows/checkout-flow.ts` wraps multi-step workflows that span multiple pages. Tests that aren't about the checkout steps themselves call a single flow method rather than repeating the setup sequence.

### 4. Data-driven Tests
Test data is centralised in `data/test-data/`. Parameterised test cases use `forEach` loops to avoid duplicating test logic for every combination.

```typescript
negativeTestCases.forEach(({ name, credentials, expectedError }) => {
  test(name, async ({ loginPage }) => {
    await loginPage.login(credentials);
    await loginPage.verifyErrorMessageIsDisplayed(expectedError);
  });
});
```

### 5. Utility Helpers
Stateless helpers in `utils/` cover:
- `WaitUtils` — `waitForDomContentLoaded()` for post-interaction stabilisation
- `PerformanceUtils` — wall-clock timer with `assertLoadTime()`
- `ScreenshotUtils` — configurable retry wrapper around `toHaveScreenshot()` with font-ready stabilisation
- `CheckoutUtils` — shared checkout data helpers

---

## Selector Strategy

Priority order enforced in all page objects:

1. `[data-test="…"]` attributes (most stable)
2. Role-based (`getByRole`)
3. CSS class selectors (legacy only, not used in new code)

---

## Assertions

All `verify*()` methods use Playwright's auto-retrying `expect()` API (`toBeVisible`, `toHaveText`, `toHaveCount`). No `waitForNetworkIdle` or `waitForTimeout` are used in page objects.

---

## Configuration

Key settings in `playwright.config.ts`:

| Setting | Value | Reason |
|---|---|---|
| `fullyParallel` | `true` | Each test gets an isolated context |
| `retries` | `0` (local) | Set to `1` in CI for transient failures |
| `screenshot` | `on` | Change to `only-on-failure` for faster local runs |
| `trace` | `retain-on-failure` | Available on first failure without overhead |
| `timeout` | `15000ms` | Appropriate for a fast demo app |

Projects: **Desktop Chromium** (1280×720) and **iPhone 14 Pro / Safari Mobile** (393×852).

---

## Code Quality

- **Prettier** — `npm run format` formats all `.ts` files
- **Husky** — runs Prettier automatically on staged files before every commit (`npm install` enables hooks via the `prepare` script)
- **TypeScript strict mode** — all implicit `any` types are errors
- **Explicit access modifiers** — `public`/`private` on every method

---

## Assumptions & Limitations

### Assumptions
- SauceDemo stores state in the browser only — no backend database; each test starts clean
- Product data, prices, and error messages are static (no dynamic API)
- Performance threshold of 2000ms is appropriate for the demo environment
- Visual baselines are generated on Windows; CI must also run on Windows to avoid rendering differences

### Limitations
- No API layer to set up state programmatically — all setup is done via the UI
- Visual tests cannot run on Linux/Mac CI without regenerating baselines
- Performance tests cover the products page only
- `@known-issue` tests document 6 confirmed app bugs and are excluded from blocking CI
