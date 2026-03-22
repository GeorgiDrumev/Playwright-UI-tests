import { test } from "@fixtures/base-ui-test";
import { checkoutInformation } from "@data/test-data/checkout-data";
import { expectedProducts } from "@data/test-data/product-data";

test.describe("Checkout Edge Cases", () => {
  test.describe("Information Page Edge Cases", () => {
    test.beforeEach(async ({ productsPage, checkoutFlow }) => {
      await productsPage.goto();
      await checkoutFlow.addProductsAndNavigateToCart([expectedProducts[0]]);
      await checkoutFlow.proceedToCheckoutInformation();
    });

    test(
      "should handle browser back navigation during checkout",
      { tag: ["@checkout", "@edge-case"] },
      async ({ checkoutUserInformationPage, checkoutDetailsPage, page }) => {
        await test.step("Given", async () => {
          await checkoutUserInformationPage.validator.expectPageLoaded();
          await checkoutUserInformationPage.fillCheckoutInformation(
            checkoutInformation.validInfo,
          );
          await checkoutUserInformationPage.clickContinue();
          await checkoutDetailsPage.validator.expectPageLoaded();
        });

        await test.step("When", async () => {
          await page.goBack();
        });

        await test.step("Then", async () => {
          await checkoutUserInformationPage.validator.expectPageLoaded();

          await page.goForward();
          await checkoutDetailsPage.validator.expectPageLoaded();
        });
      },
    );
  });

  test.describe("Details Page Edge Cases", () => {
    test(
      "should redirect to products page when navigating to details without items",
      { tag: ["@checkout", "@edge-case", "@known-issue"] },
      async ({ productsPage, checkoutDetailsPage }) => {
        await test.step("Given", async () => {
          await productsPage.goto();
          await productsPage.validator.expectPageLoaded();
        });

        await test.step("When", async () => {
          await checkoutDetailsPage.goto();
        });

        await test.step("Then", async () => {
          await productsPage.validator.expectPageLoaded();
        });
      },
    );
  });

  test.describe("Success Page Edge Cases", () => {
    test(
      "should redirect to products page when navigating to success page without completing checkout",
      { tag: ["@checkout", "@edge-case", "@known-issue"] },
      async ({ productsPage, checkoutSuccessPage }) => {
        await test.step("Given", async () => {
          await productsPage.goto();
          await productsPage.validator.expectPageLoaded();
        });

        await test.step("When", async () => {
          await checkoutSuccessPage.goto();
        });

        await test.step("Then", async () => {
          await productsPage.validator.expectPageLoaded();
        });
      },
    );
  });
});
