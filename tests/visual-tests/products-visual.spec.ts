import { test } from "@/fixtures/base-ui-test";
import { expectedProducts } from "@data/test-data/product-data";

test.describe("Products Page Visual Tests", () => {
  test.beforeEach(async ({ productsPage }) => {
    await productsPage.goto();
    await productsPage.verifyPageLoaded();
  });

  test(
    "should match products page",
    { tag: ["@products", "@visual"] },
    async ({ productsPage }) => {
      await productsPage.verifyPageLoaded();
      await productsPage.compareScreenshot("products-page");
    },
  );

  test(
    "should match products page with cart badge",
    { tag: ["@products", "@visual"] },
    async ({ productsPage }) => {
      await productsPage.verifyPageLoaded();
      await productsPage.addProductToCart(expectedProducts[0].name);
      await productsPage.addProductToCart(expectedProducts[1].name);
      await productsPage.compareScreenshot("products-page-with-cart-badge");
    },
  );
});
