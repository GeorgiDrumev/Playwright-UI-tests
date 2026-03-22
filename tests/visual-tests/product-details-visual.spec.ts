import { test } from "@fixtures/base-ui-test";
import { expectedProducts } from "@data/test-data/product-data";

test.describe("Product Details Page Visual Tests", () => {
  test.beforeEach(async ({ productsPage }) => {
    await productsPage.goto();
    await productsPage.validator.expectPageLoaded();
  });

  test(
    "should match product details page",
    { tag: ["@products", "@visual"] },
    async ({ productsPage, productDetailsPage }) => {
      await productsPage.navigateToProductDetails(expectedProducts[0].name);
      await productDetailsPage.compareScreenshot("product-details-page");
    },
  );
  test(
    "should match product details page with item in cart",
    { tag: ["@products", "@visual"] },
    async ({ productsPage, productDetailsPage }) => {
      await productsPage.navigateToProductDetails(expectedProducts[0].name);
      await productDetailsPage.addToCart();
      await productDetailsPage.compareScreenshot(
        "product-details-page-item-in-cart",
      );
    },
  );
});
