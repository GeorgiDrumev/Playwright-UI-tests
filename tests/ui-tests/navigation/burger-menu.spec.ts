import { test } from "@fixtures/base-ui-test";

test.describe("Burger Menu Tests", () => {
  test.beforeEach(async ({ productsPage }) => {
    await productsPage.goto();
  });

  test(
    "should open burger menu",
    { tag: ["@navigation", "@positive"] },
    async ({ productsPage }) => {
      await test.step("Given", async () => {});

      await test.step("When", async () => {
        await productsPage.burgerMenu.open();
      });

      await test.step("Then", async () => {
        await productsPage.burgerMenu.validator.expectMenuOpen();
        await productsPage.burgerMenu.validator.expectAllMenuItemsVisible();
      });
    },
  );

  test(
    "should close burger menu with X button",
    { tag: ["@navigation", "@positive"] },
    async ({ productsPage }) => {
      await test.step("Given", async () => {
        await productsPage.burgerMenu.open();
      });

      await test.step("When", async () => {
        await productsPage.burgerMenu.close();
      });

      await test.step("Then", async () => {
        await productsPage.burgerMenu.validator.expectMenuClosed();
      });
    },
  );

  test(
    "should navigate to All Items",
    { tag: ["@navigation", "@positive"] },
    async ({ productsPage }) => {
      await test.step("Given", async () => {
        await productsPage.navigateToProductDetailsByIndex(0);
        await productsPage.burgerMenu.open();
      });

      await test.step("When", async () => {
        await productsPage.burgerMenu.clickAllItems();
      });

      await test.step("Then", async () => {
        await productsPage.validator.expectPageLoaded();
      });
    },
  );

  test(
    "should navigate to About page",
    { tag: ["@navigation", "@positive"] },
    async ({ productsPage, page }) => {
      await test.step("Given", async () => {
        await productsPage.burgerMenu.open();
      });

      await test.step("When", async () => {
        await productsPage.burgerMenu.clickAbout();
      });

      await test.step("Then", async () => {
        await page.waitForURL(/saucelabs\.com/);
      });
    },
  );

  test(
    "should reset app state",
    { tag: ["@navigation", "@positive"] },
    async ({ productsPage }) => {
      await test.step("Given", async () => {
        await productsPage.addProductToCart("Sauce Labs Backpack");
      });

      await test.step("When", async () => {
        await productsPage.burgerMenu.open();
        await productsPage.burgerMenu.clickResetApp();
        await productsPage.burgerMenu.close();
      });

      await test.step("Then", async () => {
        await productsPage.validator.expectCartBadgeNotVisible();
      });
    },
  );

  test(
    "should navigate from cart to products page via All Items",
    { tag: ["@navigation", "@positive"] },
    async ({ productsPage, cartPage }) => {
      await test.step("Given", async () => {
        await productsPage.addProductToCart("Sauce Labs Backpack");
        await productsPage.navigateToCart();
        await cartPage.validator.expectPageLoaded();
      });

      await test.step("When", async () => {
        await cartPage.burgerMenu.open();
        await cartPage.burgerMenu.clickAllItems();
      });

      await test.step("Then", async () => {
        await productsPage.validator.expectPageLoaded();
      });
    },
  );
});
