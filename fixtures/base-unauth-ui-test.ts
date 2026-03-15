import { test as base } from "@/fixtures/base-ui-test";

/**
 * Use this fixture for tests that require an unauthenticated browser context.
 * Overrides the global storageState so no session cookie is loaded.
 */
export const test = base.extend({
  storageState: async ({}, use) => {
    await use({ cookies: [], origins: [] });
  },
});

export { expect } from "@playwright/test";
