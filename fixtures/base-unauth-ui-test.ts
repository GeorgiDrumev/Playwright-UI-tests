import { test as base } from "@fixtures/base-ui-test";

export const test = base.extend({
  storageState: async ({}, use) => {
    await use({ cookies: [], origins: [] });
  },
});

export { expect } from "@playwright/test";
