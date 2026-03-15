import { test } from "@/fixtures/base-ui-test";
import { test as unauthTest } from "@/fixtures/base-unauth-ui-test";
import { expectedProducts } from "@data/test-data/product-data";

test.describe("Cart Edge Cases", () => {
  test.beforeEach(async ({ productsPage }) => {
    await productsPage.goto();
    await productsPage.verifyPageLoaded();
  });

  test(
    "should not allow checkout with empty cart",
    { tag: ["@cart", "@edge-case", "@known-issue"] },
    async ({ productsPage, cartPage }) => {
      await productsPage.navigateToCart();
      await cartPage.verifyPageLoaded();
      await cartPage.verifyCartIsEmpty();
      await cartPage.verifyCheckoutButtonNotVisible();
    },
  );

  test(
    "should prevent checkout after removing all items",
    { tag: ["@cart", "@edge-case", "@known-issue"] },
    async ({ checkoutFlow, cartPage, checkoutUserInformationPage }) => {
      await checkoutFlow.addProductsAndNavigateToCart([expectedProducts[0]]);
      await cartPage.clickCheckout();

      await checkoutUserInformationPage.verifyPageLoaded();
      await checkoutUserInformationPage.clickCancel();
      await cartPage.verifyPageLoaded();
      await cartPage.verifyCartItemCount(1);

      await cartPage.removeItemByIndex(0);
      await cartPage.verifyCartIsEmpty();

      await cartPage.verifyCheckoutButtonNotVisible();
    },
  );

  test(
    "should handle removing all items and then adding again",
    { tag: ["@cart", "@edge-case"] },
    async ({ productsPage, cartPage, checkoutFlow }) => {
      await checkoutFlow.addProductsAndNavigateToCart([expectedProducts[0]]);
      await cartPage.verifyCartItemCount(1);

      await cartPage.removeItemByIndex(0);
      await cartPage.verifyCartIsEmpty();

      await cartPage.clickContinueShopping();
      await productsPage.addProductToCart(expectedProducts[1].name);
      await productsPage.navigateToCart();
      await cartPage.verifyCartItemCount(1);
    },
  );

  test(
    "should handle browser back navigation from cart",
    { tag: ["@cart", "@edge-case"] },
    async ({ productsPage, cartPage, page, checkoutFlow }) => {
      await checkoutFlow.addProductsAndNavigateToCart([expectedProducts[0]]);

      await page.goBack();
      await productsPage.verifyPageLoaded();

      await page.goForward();
      await cartPage.verifyPageLoaded();
      await cartPage.verifyCartItemCount(1);
    },
  );

  test(
    "should handle concurrent cart modifications",
    { tag: ["@cart", "@edge-case"] },
    async ({ productsPage, cartPage, checkoutFlow }) => {
      await checkoutFlow.addProductsAndNavigateToCart([
        expectedProducts[0],
        expectedProducts[1],
        expectedProducts[2],
      ]);
      await cartPage.verifyCartItemCount(3);

      await cartPage.clickContinueShopping();
      await productsPage.removeProductFromCart(expectedProducts[0].name);
      await productsPage.addProductToCart(expectedProducts[3].name);

      await productsPage.navigateToCart();
      await cartPage.verifyCartItemCount(3);
      await cartPage.verifyProductsInCart([
        expectedProducts[1].name,
        expectedProducts[2].name,
        expectedProducts[3].name,
      ]);
    },
  );

  test(
    "should maintain cart state during session",
    { tag: ["@cart", "@edge-case"] },
    async ({ productsPage, cartPage, page }) => {
      await productsPage.addProductToCart(expectedProducts[0].name);
      await productsPage.addProductToCart(expectedProducts[1].name);

      await page.reload();
      await productsPage.verifyPageLoaded();
      await productsPage.verifyCartBadgeCount("2");

      await productsPage.navigateToCart();
      await cartPage.verifyCartItemCount(2);
    },
  );
});

unauthTest.describe("Cart Edge Cases - Unauthenticated Access", () => {
  unauthTest(
    "should redirect to login when accessing cart without authentication",
    { tag: ["@cart", "@edge-case"] },
    async ({ cartPage, loginPage }) => {
      await cartPage.goto();

      await loginPage.verifyPageLoaded();
    },
  );
});
