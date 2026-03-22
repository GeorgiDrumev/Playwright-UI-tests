import { test } from "@fixtures/base-ui-test";
import { checkoutInformation } from "@data/test-data/checkout-data";
import { expectedProducts } from "@data/test-data/product-data";

test.describe("Checkout Success Tests", () => {
  test.beforeEach(async ({ productsPage, checkoutFlow }) => {
    await productsPage.goto();
    await checkoutFlow.completeCheckoutFlow(
      [expectedProducts[0]],
      checkoutInformation.validInfo,
    );
  });

  test(
    "should display order complete message",
    { tag: ["@checkout", "@positive"] },
    async ({ checkoutSuccessPage }) => {
      await test.step("Given", async () => {});

      await test.step("When", async () => {});

      await test.step("Then", async () => {
        await checkoutSuccessPage.validator.expectPageLoaded();
        await checkoutSuccessPage.validator.expectOrderComplete();
      });
    },
  );

  test(
    "should navigate back to products page",
    { tag: ["@checkout", "@positive"] },
    async ({ checkoutSuccessPage, productsPage }) => {
      await test.step("Given", async () => {
        await checkoutSuccessPage.validator.expectPageLoaded();
      });

      await test.step("When", async () => {
        await checkoutSuccessPage.clickBackHome();
      });

      await test.step("Then", async () => {
        await productsPage.validator.expectPageLoaded();
      });
    },
  );
});
