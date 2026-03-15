import { test } from "@/fixtures/base-ui-test";
import { checkoutInformation } from "@data/test-data/checkout-data";
import { expectedProducts } from "@data/test-data/product-data";

test.describe("Checkout Edge Cases", () => {
  test.describe("Information Page Edge Cases", () => {
    test.beforeEach(async ({ productsPage, checkoutFlow }) => {
      await productsPage.goto();
      await productsPage.verifyPageLoaded();

      await checkoutFlow.addProductsAndNavigateToCart([expectedProducts[0]]);
      await checkoutFlow.proceedToCheckoutInformation();
    });

    test(
      "should handle browser back navigation during checkout",
      { tag: ["@checkout", "@edge-case"] },
      async ({ checkoutUserInformationPage, checkoutDetailsPage, page }) => {
        await checkoutUserInformationPage.verifyPageLoaded();

        await checkoutUserInformationPage.fillCheckoutInformation(
          checkoutInformation.validInfo,
        );
        await checkoutUserInformationPage.clickContinue();
        await checkoutDetailsPage.verifyPageLoaded();
        await page.goBack();
        await checkoutUserInformationPage.verifyPageLoaded();

        await page.goForward();
        await checkoutDetailsPage.verifyPageLoaded();
      },
    );
  });

  test.describe("Details Page Edge Cases", () => {
    test(
      "should redirect to products page when navigating to details without items",
      { tag: ["@checkout", "@edge-case", "@known-issue"] },
      async ({ productsPage, checkoutDetailsPage }) => {
        await productsPage.goto();
        await productsPage.verifyPageLoaded();

        await checkoutDetailsPage.goto();

        await productsPage.verifyPageLoaded();
      },
    );
  });

  test.describe("Success Page Edge Cases", () => {
    test(
      "should redirect to products page when navigating to success page without completing checkout",
      { tag: ["@checkout", "@edge-case", "@known-issue"] },
      async ({ productsPage, checkoutSuccessPage }) => {
        await productsPage.goto();
        await productsPage.verifyPageLoaded();

        await checkoutSuccessPage.goto();

        await productsPage.verifyPageLoaded();
      },
    );
  });
});
