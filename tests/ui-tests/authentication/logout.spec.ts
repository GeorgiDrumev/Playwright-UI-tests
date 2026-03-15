import { test } from "@/fixtures/base-ui-test";

test.describe("Logout Tests", () => {
  test.beforeEach(async ({ productsPage }) => {
    await productsPage.goto();
    await productsPage.verifyPageLoaded();
  });

  test.describe("Positive Scenarios", () => {
    test(
      "should clear session after logout",
      { tag: ["@authentication", "@positive"] },
      async ({ productsPage, loginPage }) => {
        await productsPage.burgerMenu.open();
        await productsPage.burgerMenu.clickLogout();
        await loginPage.verifyPageLoaded();

        await productsPage.goto();
        await loginPage.verifyPageLoaded();
      },
    );
  });
});
