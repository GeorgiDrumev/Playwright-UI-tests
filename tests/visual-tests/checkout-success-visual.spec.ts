import { test } from "@fixtures/base-ui-test";
import { expectedProducts } from "@data/test-data/product-data";
import { checkoutInformation } from "@data/test-data/checkout-data";

test.describe("Checkout Success Page Visual Tests", () => {
  test.beforeEach(async ({ productsPage }) => {
    await productsPage.goto();
    await productsPage.validator.expectPageLoaded();
  });

  test(
    "should match checkout success page",
    { tag: ["@checkout", "@visual"] },
    async ({ checkoutFlow, checkoutSuccessPage }) => {
      await checkoutFlow.completeCheckoutFlow(
        [expectedProducts[0]],
        checkoutInformation.validInfo,
      );
      await checkoutSuccessPage.compareScreenshot("checkout-success-page");
    },
  );
});
