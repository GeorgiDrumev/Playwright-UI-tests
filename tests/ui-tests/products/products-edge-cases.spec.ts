import { test } from "@/fixtures/base-ui-test";
import { test as unauthTest } from "@/fixtures/base-unauth-ui-test";
import { INVALID_PRODUCT_ID } from "@data/test-data/product-data";

test.describe("Products Edge Cases", () => {
  unauthTest.describe("Unauthenticated Access", () => {
    unauthTest(
      "should handle direct navigation to products without authentication",
      { tag: ["@products", "@edge-case"] },
      async ({ productsPage, loginPage }) => {
        await productsPage.goto();

        await loginPage.verifyPageLoaded();
      },
    );

    unauthTest(
      "should redirect to login when accessing product details without authentication",
      { tag: ["@products", "@edge-case"] },
      async ({ productDetailsPage, loginPage }) => {
        await productDetailsPage.goto(4);

        await loginPage.verifyPageLoaded();
      },
    );
  });

  test.describe("Authenticated Edge Cases", () => {
    test.beforeEach(async ({ productsPage }) => {
      await productsPage.goto();
      await productsPage.verifyPageLoaded();
    });

    test(
      "should handle invalid product ID in URL",
      // TODO: link bug tracker ticket for this known issue
      { tag: ["@products", "@edge-case", "@known-issue"] },
      async ({ productDetailsPage }) => {
        await productDetailsPage.goto(INVALID_PRODUCT_ID);

        await productDetailsPage.verifyPageNotLoaded();
      },
    );
  });
});
