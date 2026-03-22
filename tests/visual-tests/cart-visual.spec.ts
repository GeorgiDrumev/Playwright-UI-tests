import { test } from "@fixtures/base-ui-test";
import { expectedProducts } from "@data/test-data/product-data";

test.describe("Cart Page Visual Tests", () => {
  test.beforeEach(async ({ productsPage }) => {
    await productsPage.goto();
    await productsPage.validator.expectPageLoaded();
  });

  test(
    "should match empty cart page",
    { tag: ["@cart", "@visual"] },
    async ({ productsPage, cartPage }) => {
      await productsPage.navigateToCart();
      await cartPage.validator.expectPageLoaded();
      await cartPage.compareScreenshot("cart-page-empty");
    },
  );

  test(
    "should match cart page with items",
    { tag: ["@cart", "@visual"] },
    async ({ productsPage, cartPage }) => {
      await productsPage.addProductToCart(expectedProducts[0].name);
      await productsPage.addProductToCart(expectedProducts[1].name);
      await productsPage.addProductToCart(expectedProducts[2].name);
      await productsPage.navigateToCart();
      await cartPage.validator.expectPageLoaded();
      await cartPage.compareScreenshot("cart-page-with-items");
    },
  );
});
