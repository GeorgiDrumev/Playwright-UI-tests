import { test } from "@/fixtures/base-ui-test";
import { expectedProducts } from "@data/test-data/product-data";

test.describe("Cart Tests", () => {
  test.beforeEach(async ({ productsPage }) => {
    await productsPage.goto();
    await productsPage.verifyPageLoaded();
  });

  test(
    "should display empty cart initially",
    { tag: ["@cart", "@positive"] },
    async ({ productsPage, cartPage }) => {
      await productsPage.navigateToCart();
      await cartPage.verifyPageLoaded();
      await cartPage.verifyCartIsEmpty();
    },
  );

  test(
    "should display products added to cart",
    { tag: ["@cart", "@positive"] },
    async ({ cartPage, checkoutFlow }) => {
      const product1 = expectedProducts[0];
      const product2 = expectedProducts[1];

      await checkoutFlow.addProductsAndNavigateToCart([product1, product2]);

      await cartPage.verifyProductsInCart([product1.name, product2.name]);
      await cartPage.verifyCartItemCount(2);
    },
  );

  test(
    "should remove product from cart",
    { tag: ["@cart", "@positive"] },
    async ({ cartPage, checkoutFlow }) => {
      const product = expectedProducts[0];

      await checkoutFlow.addProductsAndNavigateToCart([product]);
      await cartPage.verifyProductInCart(product.name);

      await cartPage.removeItemByName(product.name);
      await cartPage.verifyCartIsEmpty();
    },
  );

  test(
    "should remove multiple products from cart",
    { tag: ["@cart", "@positive"] },
    async ({ cartPage, checkoutFlow }) => {
      await checkoutFlow.addProductsAndNavigateToCart([
        expectedProducts[0],
        expectedProducts[1],
        expectedProducts[2],
      ]);

      await cartPage.verifyCartItemCount(3);

      await cartPage.removeItemByIndex(0);
      await cartPage.verifyCartItemCount(2);

      await cartPage.removeItemByIndex(0);
      await cartPage.verifyCartItemCount(1);

      await cartPage.removeItemByIndex(0);
      await cartPage.verifyCartIsEmpty();
    },
  );

  test(
    "should navigate back to products page via Continue Shopping",
    { tag: ["@cart", "@positive"] },
    async ({ productsPage, cartPage }) => {
      await productsPage.navigateToCart();
      await cartPage.verifyPageLoaded();

      await cartPage.clickContinueShopping();
      await productsPage.verifyPageLoaded();
    },
  );

  test(
    "should navigate to checkout page",
    { tag: ["@cart", "@positive"] },
    async ({ cartPage, checkoutUserInformationPage, checkoutFlow }) => {
      await checkoutFlow.addProductsAndNavigateToCart([expectedProducts[0]]);

      await cartPage.clickCheckout();
      await checkoutUserInformationPage.verifyPageLoaded();
    },
  );

  test(
    "should navigate to product details page when clicking item",
    { tag: ["@cart", "@positive", "@known-issue"] },
    async ({ cartPage, productDetailsPage, checkoutFlow }) => {
      const product = expectedProducts[0];

      await checkoutFlow.addProductsAndNavigateToCart([product]);

      await cartPage.clickItemByName(product.name);
      await productDetailsPage.verifyProductDetails(product);

      await productDetailsPage.clickBackButton();
      await cartPage.verifyPageLoaded();
    },
  );
});
