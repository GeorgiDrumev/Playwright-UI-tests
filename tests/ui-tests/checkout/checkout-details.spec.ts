import { test } from "@/fixtures/base-ui-test";
import { checkoutInformation } from "@data/test-data";
import { expectedProducts } from "@data/test-data/product-data";

test.describe("Checkout Details (Overview) Tests", () => {
  test.beforeEach(async ({ productsPage, checkoutFlow }) => {
    await productsPage.goto();
    await productsPage.verifyPageLoaded();

    await checkoutFlow.addProductsAndNavigateToCart([expectedProducts[0]]);
    await checkoutFlow.navigateToCheckoutDetails(checkoutInformation.validInfo);
  });

  test(
    "should display order summary correctly",
    { tag: ["@checkout", "@positive"] },
    async ({ checkoutDetailsPage }) => {
      await checkoutDetailsPage.verifyPageLoaded();
      await checkoutDetailsPage.verifyItemCount(1);
      await checkoutDetailsPage.verifyOrderSummaryDisplayed();
    },
  );

  test(
    "should calculate totals correctly",
    { tag: ["@checkout", "@positive"] },
    async ({ checkoutDetailsPage }) => {
      await checkoutDetailsPage.verifyPageLoaded();
      await checkoutDetailsPage.verifyTotalsCalculation([expectedProducts[0]]);
    },
  );

  test(
    "should cancel from overview page and return to products",
    { tag: ["@checkout", "@positive"] },
    async ({ checkoutDetailsPage, productsPage }) => {
      await checkoutDetailsPage.verifyPageLoaded();
      await checkoutDetailsPage.clickCancel();

      await productsPage.verifyPageLoaded();
    },
  );

  test(
    "should calculate correct totals with multiple items",
    { tag: ["@checkout", "@positive"] },
    async ({ checkoutDetailsPage, productsPage, checkoutFlow }) => {
      await checkoutDetailsPage.verifyPageLoaded();
      await checkoutDetailsPage.clickCancel();

      await productsPage.verifyPageLoaded();
      await productsPage.addProductToCart(expectedProducts[1].name);
      await productsPage.addProductToCart(expectedProducts[2].name);
      await productsPage.navigateToCart();

      await checkoutFlow.navigateToCheckoutDetails(
        checkoutInformation.validInfo,
      );

      await checkoutDetailsPage.verifyPageLoaded();
      await checkoutDetailsPage.verifyItemCount(3);
      await checkoutDetailsPage.verifyTotalsCalculation([
        expectedProducts[0],
        expectedProducts[1],
        expectedProducts[2],
      ]);
    },
  );

  test(
    "should proceed to success page when finishing order",
    { tag: ["@checkout", "@positive"] },
    async ({ checkoutDetailsPage, checkoutSuccessPage }) => {
      await checkoutDetailsPage.verifyPageLoaded();
      await checkoutDetailsPage.clickFinish();

      await checkoutSuccessPage.verifyPageLoaded();
      await checkoutSuccessPage.verifyOrderComplete();
    },
  );
});
