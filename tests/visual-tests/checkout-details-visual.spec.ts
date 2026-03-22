import { test } from "@fixtures/base-ui-test";
import { expectedProducts } from "@data/test-data/product-data";
import { checkoutInformation } from "@data/test-data/checkout-data";

test.describe("Checkout Details Page Visual Tests", () => {
  test.beforeEach(async ({ productsPage }) => {
    await productsPage.goto();
    await productsPage.validator.expectPageLoaded();
  });

  test(
    "should match checkout details page with single item",
    { tag: ["@checkout", "@visual"] },
    async ({ checkoutFlow, checkoutDetailsPage }) => {
      await checkoutFlow.addProductsAndNavigateToCart([expectedProducts[0]]);
      await checkoutFlow.navigateToCheckoutDetails(
        checkoutInformation.validInfo,
      );
      await checkoutDetailsPage.compareScreenshot(
        "checkout-details-page-single-item",
      );
    },
  );

  test(
    "should match checkout details page with multiple items",
    { tag: ["@checkout", "@visual"] },
    async ({ checkoutFlow, checkoutDetailsPage }) => {
      await checkoutFlow.addProductsAndNavigateToCart([
        expectedProducts[0],
        expectedProducts[1],
        expectedProducts[2],
      ]);
      await checkoutFlow.navigateToCheckoutDetails(
        checkoutInformation.validInfo,
      );
      await checkoutDetailsPage.compareScreenshot(
        "checkout-details-page-multiple-items",
      );
    },
  );
});
