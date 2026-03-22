import { test } from "@fixtures/base-ui-test";
import { expectedProducts } from "@data/test-data/product-data";

test.describe("Cart Tests", () => {
  test.beforeEach(async ({ productsPage }) => {
    await productsPage.goto();
  });

  test(
    "should display empty cart initially",
    { tag: ["@cart", "@positive"] },
    async ({ productsPage, cartPage }) => {
      await test.step("Given", async () => {});

      await test.step("When", async () => {
        await productsPage.navigateToCart();
      });

      await test.step("Then", async () => {
        await cartPage.validator.expectPageLoaded();
        await cartPage.validator.expectCartEmpty();
      });
    },
  );

  test(
    "should display products added to cart",
    { tag: ["@cart", "@positive"] },
    async ({ checkoutFlow, cartPage }) => {
      const product1 = expectedProducts[0];
      const product2 = expectedProducts[1];

      await test.step("Given", async () => {
        await checkoutFlow.addProductsAndNavigateToCart([product1, product2]);
      });

      await test.step("When", async () => {});

      await test.step("Then", async () => {
        await cartPage.validator.expectProductsInCart([
          product1.name,
          product2.name,
        ]);
        await cartPage.validator.expectCartItemCount(2);
      });
    },
  );

  test(
    "should remove product from cart",
    { tag: ["@cart", "@positive"] },
    async ({ cartPage, checkoutFlow }) => {
      const product = expectedProducts[0];

      await test.step("Given", async () => {
        await checkoutFlow.addProductsAndNavigateToCart([product]);
      });

      await test.step("When", async () => {
        await cartPage.removeItemByName(product.name);
      });

      await test.step("Then", async () => {
        await cartPage.validator.expectCartEmpty();
      });
    },
  );

  test(
    "should remove multiple products from cart",
    { tag: ["@cart", "@positive"] },
    async ({ cartPage, checkoutFlow }) => {
      await test.step("Given", async () => {
        await checkoutFlow.addProductsAndNavigateToCart([
          expectedProducts[0],
          expectedProducts[1],
          expectedProducts[2],
        ]);
      });

      await test.step("When", async () => {
        await cartPage.removeItemByIndex(0);
        await cartPage.removeItemByIndex(0);
        await cartPage.removeItemByIndex(0);
      });

      await test.step("Then", async () => {
        await cartPage.validator.expectCartEmpty();
      });
    },
  );

  test(
    "should navigate back to products page via Continue Shopping",
    { tag: ["@cart", "@positive"] },
    async ({ productsPage, cartPage }) => {
      await test.step("Given", async () => {
        await productsPage.navigateToCart();
      });

      await test.step("When", async () => {
        await cartPage.clickContinueShopping();
      });

      await test.step("Then", async () => {
        await productsPage.validator.expectPageLoaded();
      });
    },
  );

  test(
    "should navigate to checkout page",
    { tag: ["@cart", "@positive"] },
    async ({ cartPage, checkoutFlow, checkoutUserInformationPage }) => {
      await test.step("Given", async () => {
        await checkoutFlow.addProductsAndNavigateToCart([expectedProducts[0]]);
      });

      await test.step("When", async () => {
        await cartPage.clickCheckout();
      });

      await test.step("Then", async () => {
        await checkoutUserInformationPage.validator.expectPageLoaded();
      });
    },
  );

  test(
    "should navigate to product details page when clicking item",
    { tag: ["@cart", "@positive", "@known-issue"] },
    async ({ cartPage, checkoutFlow, productDetailsPage }) => {
      const product = expectedProducts[0];

      await test.step("Given", async () => {
        await checkoutFlow.addProductsAndNavigateToCart([product]);
      });

      await test.step("When", async () => {
        await cartPage.clickItemByName(product.name);
      });

      await test.step("Then", async () => {
        await productDetailsPage.validator.expectProductDetails(product);

        await cartPage.clickItemByName(product.name);
        await cartPage.validator.expectPageLoaded();
      });
    },
  );
});
