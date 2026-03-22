import { test } from "@fixtures/base-ui-test";
import { expectedProducts } from "@data/test-data/product-data";

test.describe("Checkout User Information Page Visual Tests", () => {
  test.beforeEach(async ({ productsPage, checkoutFlow }) => {
    await productsPage.goto();
    await productsPage.validator.expectPageLoaded();
    await checkoutFlow.addProductsAndNavigateToCart([expectedProducts[0]]);
    await checkoutFlow.proceedToCheckoutInformation();
  });

  test(
    "should match checkout user information page",
    { tag: ["@checkout", "@visual"] },
    async ({ checkoutUserInformationPage }) => {
      await checkoutUserInformationPage.validator.expectPageLoaded();
      await checkoutUserInformationPage.compareScreenshot(
        "checkout-user-information-page",
      );
    },
  );
});
