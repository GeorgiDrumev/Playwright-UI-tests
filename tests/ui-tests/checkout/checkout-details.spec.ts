import { test } from "@fixtures/base-ui-test";
import { checkoutInformation } from "@data/test-data";
import { expectedProducts } from "@data/test-data/product-data";

test.describe("Checkout Details (Overview) Tests", () => {
  test.beforeEach(async ({ productsPage, checkoutFlow }) => {
    await productsPage.goto();
    await checkoutFlow.addProductsAndNavigateToCart([expectedProducts[0]]);
    await checkoutFlow.navigateToCheckoutDetails(checkoutInformation.validInfo);
  });

  test(
    "should display order summary correctly",
    { tag: ["@checkout", "@positive"] },
    async ({ checkoutDetailsPage }) => {
      await test.step("Given", async () => {});

      await test.step("When", async () => {});

      await test.step("Then", async () => {
        await checkoutDetailsPage.validator.expectPageLoaded();
        await checkoutDetailsPage.validator.expectItemCount(1);
        await checkoutDetailsPage.validator.expectOrderSummaryDisplayed();
      });
    },
  );

  test(
    "should calculate totals correctly",
    { tag: ["@checkout", "@positive"] },
    async ({ checkoutDetailsPage }) => {
      await test.step("Given", async () => {});

      await test.step("When", async () => {});

      await test.step("Then", async () => {
        await checkoutDetailsPage.validator.expectPageLoaded();
        await checkoutDetailsPage.validator.expectTotalsCalculation([
          expectedProducts[0],
        ]);
      });
    },
  );

  test(
    "should cancel from overview page and return to products",
    { tag: ["@checkout", "@positive"] },
    async ({ checkoutDetailsPage, productsPage }) => {
      await test.step("Given", async () => {
        await checkoutDetailsPage.validator.expectPageLoaded();
      });

      await test.step("When", async () => {
        await checkoutDetailsPage.clickCancel();
      });

      await test.step("Then", async () => {
        await productsPage.validator.expectPageLoaded();
      });
    },
  );

  test(
    "should calculate correct totals with multiple items",
    { tag: ["@checkout", "@positive"] },
    async ({ productsPage, checkoutDetailsPage, checkoutFlow }) => {
      await test.step("Given", async () => {
        await checkoutDetailsPage.clickCancel();
        await productsPage.addProductToCart(expectedProducts[1].name);
        await productsPage.addProductToCart(expectedProducts[2].name);
        await productsPage.navigateToCart();
        await checkoutFlow.navigateToCheckoutDetails(
          checkoutInformation.validInfo,
        );
      });

      await test.step("When", async () => {});

      await test.step("Then", async () => {
        await checkoutDetailsPage.validator.expectPageLoaded();
        await checkoutDetailsPage.validator.expectItemCount(3);
        await checkoutDetailsPage.validator.expectTotalsCalculation([
          expectedProducts[0],
          expectedProducts[1],
          expectedProducts[2],
        ]);
      });
    },
  );

  test(
    "should proceed to success page when finishing order",
    { tag: ["@checkout", "@positive"] },
    async ({ checkoutDetailsPage, checkoutSuccessPage }) => {
      await test.step("Given", async () => {
        await checkoutDetailsPage.validator.expectPageLoaded();
      });

      await test.step("When", async () => {
        await checkoutDetailsPage.clickFinish();
      });

      await test.step("Then", async () => {
        await checkoutSuccessPage.validator.expectPageLoaded();
        await checkoutSuccessPage.validator.expectOrderComplete();
      });
    },
  );
});
