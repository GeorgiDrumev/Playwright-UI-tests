import { test } from "@/fixtures/base-ui-test";
import { checkoutInformation } from "@data/test-data/checkout-data";
import { expectedProducts } from "@data/test-data/product-data";

test.describe("Checkout Success Tests", () => {
  test.beforeEach(async ({ productsPage, checkoutFlow }) => {
    await productsPage.goto();
    await productsPage.verifyPageLoaded();

    await checkoutFlow.completeCheckoutFlow(
      [expectedProducts[0]],
      checkoutInformation.validInfo,
    );
  });

  test(
    "should display order complete message",
    { tag: ["@checkout", "@positive"] },
    async ({ checkoutSuccessPage }) => {
      await checkoutSuccessPage.verifyPageLoaded();
      await checkoutSuccessPage.verifyOrderComplete();
    },
  );

  test(
    "should navigate back to products page",
    { tag: ["@checkout", "@positive"] },
    async ({ checkoutSuccessPage, productsPage }) => {
      await checkoutSuccessPage.verifyPageLoaded();

      await checkoutSuccessPage.clickBackHome();

      await productsPage.verifyPageLoaded();
    },
  );
});
