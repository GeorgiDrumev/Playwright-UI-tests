import { test } from "@fixtures/base-ui-test";

test.describe("Logout Tests", () => {
  test.beforeEach(async ({ productsPage }) => {
    await productsPage.goto();
  });

  test.describe("Positive Scenarios", () => {
    test(
      "should clear session after logout",
      { tag: ["@authentication", "@positive"] },
      async ({ productsPage, loginPage }) => {
        await test.step("Given", async () => {});

        await test.step("When", async () => {
          await productsPage.burgerMenu.open();
          await productsPage.burgerMenu.clickLogout();
        });

        await test.step("Then", async () => {
          await loginPage.validator.expectPageLoaded();

          await productsPage.goto();
          await loginPage.validator.expectPageLoaded();
        });
      },
    );
  });
});
