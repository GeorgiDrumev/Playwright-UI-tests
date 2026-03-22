import { test } from "@fixtures/base-ui-test";
import { test as unauthTest } from "@fixtures/base-unauth-ui-test";
import { INVALID_PRODUCT_ID } from "@data/test-data/product-data";

test.describe("Products Edge Cases", () => {
  unauthTest.describe("Unauthenticated Access", () => {
    unauthTest(
      "should handle direct navigation to products without authentication",
      { tag: ["@products", "@edge-case"] },
      async ({ productsPage, loginPage }) => {
        await unauthTest.step("Given", async () => {});

        await unauthTest.step("When", async () => {
          await productsPage.goto();
        });

        await unauthTest.step("Then", async () => {
          await loginPage.validator.expectPageLoaded();
        });
      },
    );

    unauthTest(
      "should redirect to login when accessing product details without authentication",
      { tag: ["@products", "@edge-case"] },
      async ({ productDetailsPage, loginPage }) => {
        await unauthTest.step("Given", async () => {});

        await unauthTest.step("When", async () => {
          await productDetailsPage.goto(4);
        });

        await unauthTest.step("Then", async () => {
          await loginPage.validator.expectPageLoaded();
        });
      },
    );
  });

  test.describe("Authenticated Edge Cases", () => {
    test.beforeEach(async ({ productsPage }) => {
      await productsPage.goto();
      await productsPage.validator.expectPageLoaded();
    });

    test(
      "should handle invalid product ID in URL",
      { tag: ["@products", "@edge-case", "@known-issue"] },
      async ({ productDetailsPage }) => {
        await test.step("Given", async () => {});

        await test.step("When", async () => {
          await productDetailsPage.goto(INVALID_PRODUCT_ID);
        });

        await test.step("Then", async () => {
          await productDetailsPage.validator.expectPageNotLoaded();
        });
      },
    );
  });
});
