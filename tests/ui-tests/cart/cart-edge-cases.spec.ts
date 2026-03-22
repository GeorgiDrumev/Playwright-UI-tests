import { test } from "@fixtures/base-ui-test";
import { test as unauthTest } from "@fixtures/base-unauth-ui-test";
import { expectedProducts } from "@data/test-data/product-data";

test.describe("Cart Edge Cases", () => {
  test.beforeEach(async ({ productsPage }) => {
    await productsPage.goto();
  });

  test(
    "should not allow checkout with empty cart",
    { tag: ["@cart", "@edge-case", "@known-issue"] },
    async ({ productsPage, cartPage }) => {
      await test.step("Given", async () => {
        await productsPage.navigateToCart();
      });

      await test.step("When", async () => {});

      await test.step("Then", async () => {
        await cartPage.validator.expectPageLoaded();
        await cartPage.validator.expectCartEmpty();
        await cartPage.validator.expectCheckoutButtonNotVisible();
      });
    },
  );

  test(
    "should prevent checkout after removing all items",
    { tag: ["@cart", "@edge-case", "@known-issue"] },
    async ({ checkoutFlow, cartPage, checkoutUserInformationPage }) => {
      await test.step("Given", async () => {
        await checkoutFlow.addProductsAndNavigateToCart([expectedProducts[0]]);
        await cartPage.clickCheckout();
        await checkoutUserInformationPage.validator.expectPageLoaded();
      });

      await test.step("When", async () => {
        await cartPage.clickContinueShopping();
        await cartPage.removeItemByIndex(0);
      });

      await test.step("Then", async () => {
        await cartPage.validator.expectCartEmpty();
        await cartPage.validator.expectCheckoutButtonNotVisible();
      });
    },
  );

  test(
    "should handle removing all items and then adding again",
    { tag: ["@cart", "@edge-case"] },
    async ({ productsPage, cartPage, checkoutFlow }) => {
      await test.step("Given", async () => {
        await checkoutFlow.addProductsAndNavigateToCart([expectedProducts[0]]);
        await cartPage.removeItemByIndex(0);
      });

      await test.step("When", async () => {
        await cartPage.clickContinueShopping();
        await productsPage.addProductToCart(expectedProducts[1].name);
        await productsPage.navigateToCart();
      });

      await test.step("Then", async () => {
        await cartPage.validator.expectCartItemCount(1);
      });
    },
  );

  test(
    "should handle browser back navigation from cart",
    { tag: ["@cart", "@edge-case"] },
    async ({ productsPage, cartPage, checkoutFlow, page }) => {
      await test.step("Given", async () => {
        await checkoutFlow.addProductsAndNavigateToCart([expectedProducts[0]]);
      });

      await test.step("When", async () => {
        await page.goBack();
      });

      await test.step("Then", async () => {
        await productsPage.validator.expectPageLoaded();

        await page.goForward();
        await cartPage.validator.expectPageLoaded();
        await cartPage.validator.expectCartItemCount(1);
      });
    },
  );

  test(
    "should handle concurrent cart modifications",
    { tag: ["@cart", "@edge-case"] },
    async ({ productsPage, cartPage, checkoutFlow }) => {
      await test.step("Given", async () => {
        await checkoutFlow.addProductsAndNavigateToCart([
          expectedProducts[0],
          expectedProducts[1],
          expectedProducts[2],
        ]);
      });

      await test.step("When", async () => {
        await cartPage.clickContinueShopping();
        await productsPage.removeProductFromCart(expectedProducts[0].name);
        await productsPage.addProductToCart(expectedProducts[3].name);
        await productsPage.navigateToCart();
      });

      await test.step("Then", async () => {
        await cartPage.validator.expectCartItemCount(3);
        await cartPage.validator.expectProductsInCart([
          expectedProducts[1].name,
          expectedProducts[2].name,
          expectedProducts[3].name,
        ]);
      });
    },
  );

  test(
    "should maintain cart state during session",
    { tag: ["@cart", "@edge-case"] },
    async ({ productsPage, cartPage, page }) => {
      await test.step("Given", async () => {
        await productsPage.addProductToCart(expectedProducts[0].name);
        await productsPage.addProductToCart(expectedProducts[1].name);
      });

      await test.step("When", async () => {
        await page.reload();
      });

      await test.step("Then", async () => {
        await productsPage.validator.expectCartBadgeCount("2");

        await productsPage.navigateToCart();
        await cartPage.validator.expectCartItemCount(2);
      });
    },
  );
});

unauthTest.describe("Cart Edge Cases - Unauthenticated Access", () => {
  unauthTest(
    "should redirect to login when accessing cart without authentication",
    { tag: ["@cart", "@edge-case"] },
    async ({ cartPage, loginPage }) => {
      await unauthTest.step("Given", async () => {});

      await unauthTest.step("When", async () => {
        await cartPage.goto();
      });

      await unauthTest.step("Then", async () => {
        await loginPage.validator.expectPageLoaded();
      });
    },
  );
});
